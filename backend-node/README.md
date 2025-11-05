# Node.js + OpenAI Backend

생기부 포털의 Node.js/Express + OpenAI API 백엔드입니다.

## 설치 방법

```bash
npm install
```

## 환경 설정

`.env` 파일을 생성하고 다음 내용을 추가하세요:

```env
OPENAI_API_KEY=your-openai-api-key-here
PORT=3001
```

## 실행 방법

```bash
npm start
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
    "model": "gpt-4o-mini",
    "backend": "Node.js + OpenAI"
  }
}
```

### POST /api/generate/batch

여러 학생의 생기부를 일괄 생성합니다.

**요청 예시:**
```json
{
  "students": [
    {
      "studentName": "김민지",
      "recordType": "subject",
      "evidence": "..."
    },
    {
      "studentName": "이서준",
      "recordType": "activity",
      "evidence": "..."
    }
  ]
}
```

## 모델

- 기본 모델: `gpt-4o-mini`
- 최대 토큰: 1000
- Temperature: 0.7

## 특징

- ✅ OpenAI GPT-4o-mini 사용
- ✅ 금칙어 자동 검사
- ✅ 4가지 기록 유형 지원 (세특, 창체, 담임종합, 진로)
- ✅ 배치 생성 지원
- ✅ CORS 설정 완료
