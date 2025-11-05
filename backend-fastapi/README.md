# Python FastAPI + Claude Backend

생기부 포털의 Python/FastAPI + Anthropic Claude API 백엔드입니다.

## 설치 방법

```bash
pip install -r requirements.txt
```

## 환경 설정

`.env` 파일을 생성하고 다음 내용을 추가하세요:

```env
ANTHROPIC_API_KEY=your-claude-api-key-here
PORT=3002
```

## 실행 방법

```bash
python main.py
```

또는 uvicorn 직접 실행:

```bash
uvicorn main:app --reload --port 3002
```

## API 엔드포인트

### POST /api/generate

생기부 텍스트를 AI로 생성합니다.

**요청 예시:**
```json
{
  "studentName": "김민지",
  "subject": "수학",
  "recordType": "subject",
  "evidence": "수학 탐구보고서에서 함수의 개념을 이해하고 그래프를 그리는 활동에 적극적으로 참여함",
  "templateType": "basic"
}
```

**응답 예시:**
```json
{
  "success": true,
  "generatedText": "수학 교과에서 함수의 개념을 이해하고...",
  "warnings": null,
  "metadata": {
    "length": 345,
    "model": "claude-3-5-sonnet-20241022",
    "backend": "Python FastAPI + Claude",
    "tokens": {
      "input": 120,
      "output": 350
    }
  }
}
```

### POST /api/generate/batch

여러 학생의 생기부를 일괄 생성합니다.

## 모델

- 기본 모델: `claude-3-5-sonnet-20241022`
- 최대 토큰: 1500
- Temperature: 0.7

## 특징

- ✅ Anthropic Claude 3.5 Sonnet 사용
- ✅ 금칙어 자동 검사
- ✅ 4가지 기록 유형 지원 (세특, 창체, 담임종합, 진로)
- ✅ 배치 생성 지원
- ✅ CORS 설정 완료
- ✅ 토큰 사용량 추적
- ✅ FastAPI 자동 문서 (http://localhost:3002/docs)

## API 문서

서버 실행 후 다음 URL에서 자동 생성된 API 문서를 확인할 수 있습니다:
- Swagger UI: http://localhost:3002/docs
- ReDoc: http://localhost:3002/redoc
