# Google Gemini API 연동 가이드

## 1. Google AI Studio에서 API 키 발급

1. **Google AI Studio 접속**
   - https://aistudio.google.com/app/apikey 접속
   - Google 계정으로 로그인

2. **API 키 생성**
   - "Get API key" 또는 "Create API key" 버튼 클릭
   - 기존 Google Cloud 프로젝트 선택 또는 새 프로젝트 생성
   - API 키가 생성됩니다 (예: AIzaSy...)

3. **API 키 복사**
   - 생성된 API 키를 복사하세요
   - 이 키는 나중에 다시 볼 수 없으므로 안전한 곳에 저장하세요

## 2. .env 파일에 API 키 추가

`backend-node/.env` 파일을 열고 다음 줄을 추가하세요:

```env
OPENAI_API_KEY=sk-proj-...기존키...
PORT=3001
FRONTEND_URL=http://localhost:5175
GOOGLE_API_KEY=AIzaSy여기에복사한API키입력
```

## 3. 백엔드 서버 재시작

```bash
cd backend-node
# Ctrl+C로 기존 서버 종료
node server.js
```

## 4. API 테스트

### Google Gemini 사용 (기본값)

```bash
curl -X POST http://localhost:3001/api/generate \
  -H "Content-Type: application/json" \
  -d '{
    "studentName": "김민지",
    "recordType": "subject",
    "evidence": "수학 탐구보고서 작성",
    "subject": "수학",
    "provider": "google"
  }'
```

### OpenAI 사용

```bash
curl -X POST http://localhost:3001/api/generate \
  -H "Content-Type: application/json" \
  -d '{
    "studentName": "김민지",
    "recordType": "subject",
    "evidence": "수학 탐구보고서 작성",
    "subject": "수학",
    "provider": "openai"
  }'
```

## 5. 헬스체크

```bash
curl http://localhost:3001/health
```

응답 예시:
```json
{
  "status": "ok",
  "service": "Node.js + AI (OpenAI & Google Gemini)",
  "providers": {
    "openai": true,
    "google": true
  }
}
```

## Google Gemini 무료 티어

- **모델**: gemini-1.5-flash
- **무료 한도**:
  - 분당 15 요청
  - 하루 1,500 요청
  - 월 100만 토큰
- **가격**: 무료 티어 초과 시 매우 저렴
  - 1M 입력 토큰당 $0.075
  - 1M 출력 토큰당 $0.30

## 장점

- ✅ **무료 티어** - 충분한 무료 사용량
- ✅ **빠른 속도** - gemini-1.5-flash는 매우 빠름
- ✅ **좋은 품질** - GPT-4o-mini와 비슷한 품질
- ✅ **한국어 지원** - 한국어 성능 우수
- ✅ **긴 컨텍스트** - 최대 1M 토큰 지원

## 프론트엔드에서 provider 선택

`src/pages/AIWriting.tsx`에서 provider를 변경할 수 있습니다:

```typescript
const response = await fetch(API_URL, {
  method: 'POST',
  body: JSON.stringify({
    studentName: selectedStudentData?.name,
    recordType: selectedType,
    evidence: evidenceText,
    subject: selectedType === 'subject' ? '수학' : undefined,
    provider: 'google'  // 또는 'openai'
  }),
});
```

기본값은 `google`로 설정되어 있습니다.

## 문제 해결

### API 키 오류
- API 키가 올바른지 확인하세요
- https://aistudio.google.com/app/apikey 에서 키 상태 확인

### 할당량 초과
- 무료 티어 한도를 초과했을 수 있습니다
- Google Cloud Console에서 결제 설정 추가

### 지역 제한
- 일부 국가에서는 Gemini API가 제한될 수 있습니다
- VPN 사용 또는 OpenAI로 전환

## 참고 링크

- Google AI Studio: https://aistudio.google.com/
- Gemini API 문서: https://ai.google.dev/docs
- 가격 정책: https://ai.google.dev/pricing
