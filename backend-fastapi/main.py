from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import anthropic
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="School Record Portal - FastAPI + Claude")

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:5174", "http://localhost:5175"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Claude client
client = anthropic.Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))

# Request models
class GenerateRequest(BaseModel):
    studentName: str
    subject: Optional[str] = None
    recordType: str
    evidence: str
    templateType: Optional[str] = "basic"

class BatchStudent(BaseModel):
    studentName: str
    subject: Optional[str] = None
    recordType: str
    evidence: str

class BatchGenerateRequest(BaseModel):
    students: List[BatchStudent]

# Health check
@app.get("/health")
async def health_check():
    return {"status": "ok", "service": "Python FastAPI + Claude"}

# AI Generation endpoint
@app.post("/api/generate")
async def generate(request: GenerateRequest):
    try:
        # Build prompt based on record type
        prompts = {
            "subject": f"""다음 학생의 교과 세부능력특기사항(세특)을 작성해주세요.

학생: {request.studentName}
과목: {request.subject or '해당 과목'}
근거 자료:
{request.evidence}

작성 규칙:
- 200-500자 분량으로 작성
- 구체적인 활동 내용과 성취를 기록
- 학생의 강점과 특징을 객관적으로 서술
- 금칙어 사용 금지 (우수하다, 뛰어나다, 1등 등)
- NEIS 업로드 가능한 형식으로 작성""",

            "activity": f"""다음 학생의 창의적 체험활동 기록을 작성해주세요.

학생: {request.studentName}
근거 자료:
{request.evidence}

작성 규칙:
- 100-300자 분량으로 작성
- 활동의 구체적인 과정과 결과를 기록
- 학생의 참여도와 태도를 객관적으로 서술
- 금칙어 사용 금지""",

            "homeroom": f"""다음 학생의 담임종합의견을 작성해주세요.

학생: {request.studentName}
근거 자료:
{request.evidence}

작성 규칙:
- 300-700자 분량으로 작성
- 학생의 전반적인 학교생활을 종합적으로 기술
- 성장 과정과 변화를 구체적으로 기록
- 긍정적이고 격려하는 톤으로 작성
- 금칙어 사용 금지""",

            "career": f"""다음 학생의 진로활동 기록을 작성해주세요.

학생: {request.studentName}
근거 자료:
{request.evidence}

작성 규칙:
- 200-400자 분량으로 작성
- 진로 탐색 활동과 관심 분야를 구체적으로 기록
- 학생의 진로 계획과 준비 과정을 서술
- 금칙어 사용 금지"""
        }

        prompt = prompts.get(request.recordType, prompts["subject"])

        # Call Claude API
        message = client.messages.create(
            model="claude-3-5-sonnet-20241022",
            max_tokens=1500,
            temperature=0.7,
            system="당신은 한국의 생활기록부(생기부) 작성 전문가입니다. NEIS 시스템에 업로드 가능한 형식으로 정확하고 객관적인 기록을 작성합니다. 금칙어를 절대 사용하지 않으며, 구체적이고 사실에 기반한 내용을 작성합니다.",
            messages=[
                {"role": "user", "content": prompt}
            ]
        )

        generated_text = message.content[0].text

        # Check for forbidden words
        forbidden_words = ['우수하다', '뛰어나다', '1등', '2등', '꼴찌', 'ADHD', 'ADD']
        found_forbidden = [word for word in forbidden_words if word in generated_text]

        response = {
            "success": True,
            "generatedText": generated_text,
            "warnings": {
                "forbiddenWords": found_forbidden,
                "message": "금칙어가 발견되었습니다. 수정이 필요합니다."
            } if found_forbidden else None,
            "metadata": {
                "length": len(generated_text.replace(" ", "").replace("\n", "")),
                "model": "claude-3-5-sonnet-20241022",
                "backend": "Python FastAPI + Claude",
                "tokens": {
                    "input": message.usage.input_tokens,
                    "output": message.usage.output_tokens
                }
            }
        }

        return response

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to generate text: {str(e)}")

# Batch generation endpoint
@app.post("/api/generate/batch")
async def batch_generate(request: BatchGenerateRequest):
    try:
        results = []

        for student in request.students:
            try:
                prompt = f"{student.studentName} 학생의 {student.recordType} 기록을 작성해주세요.\n근거: {student.evidence}"

                message = client.messages.create(
                    model="claude-3-5-sonnet-20241022",
                    max_tokens=1200,
                    temperature=0.7,
                    system="생활기록부 작성 전문가입니다.",
                    messages=[{"role": "user", "content": prompt}]
                )

                results.append({
                    "studentName": student.studentName,
                    "success": True,
                    "generatedText": message.content[0].text
                })
            except Exception as e:
                results.append({
                    "studentName": student.studentName,
                    "success": False,
                    "error": str(e)
                })

        return {
            "success": True,
            "results": results,
            "total": len(request.students),
            "successful": sum(1 for r in results if r["success"])
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Batch generation failed: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=int(os.getenv("PORT", 3002)))
