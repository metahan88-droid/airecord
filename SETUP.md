# 생기부 포털 - 설치 및 실행 가이드

이 프로젝트는 React 프론트엔드와 3가지 백엔드 옵션을 제공합니다.

## 목차

1. [프론트엔드 설정](#프론트엔드-설정)
2. [백엔드 옵션](#백엔드-옵션)
   - [Option 1: Node.js + OpenAI](#option-1-nodejs--openai)
   - [Option 2: Python FastAPI + Claude](#option-2-python-fastapi--claude)
   - [Option 3: Flask + OpenAI/Claude](#option-3-flask--openaiclaude)
3. [전체 시스템 실행](#전체-시스템-실행)

---

## 프론트엔드 설정

### 1. 의존성 설치

```bash
cd school-record-portal
npm install
```

### 2. 환경 변수 설정

`.env` 파일을 생성하고 사용할 백엔드를 선택하세요:

```bash
# .env.example을 복사
cp .env.example .env
```

`.env` 파일에서 원하는 백엔드 URL을 주석 해제:

```env
# Option 1: Node.js + OpenAI (기본값)
VITE_API_URL=http://localhost:3001

# Option 2: FastAPI + Claude
# VITE_API_URL=http://localhost:3002

# Option 3: Flask + OpenAI/Claude
# VITE_API_URL=http://localhost:5000
```

### 3. 개발 서버 실행

```bash
npm run dev
```

프론트엔드는 http://localhost:5175 에서 실행됩니다.

---

## 백엔드 옵션

### Option 1: Node.js + OpenAI

**위치**: `backend-node/`

#### 1. 의존성 설치

```bash
cd backend-node
npm install
```

#### 2. 환경 변수 설정

`.env` 파일 생성:

```bash
cp .env.example .env
```

`.env` 파일 편집:

```env
OPENAI_API_KEY=your-openai-api-key-here
PORT=3001
FRONTEND_URL=http://localhost:5175
```

#### 3. 서버 실행

```bash
node server.js
```

서버는 http://localhost:3001 에서 실행됩니다.

#### API 테스트

```bash
curl -X POST http://localhost:3001/api/generate \
  -H "Content-Type: application/json" \
  -d '{
    "studentName": "김민지",
    "recordType": "subject",
    "evidence": "수학 탐구보고서 작성",
    "subject": "수학"
  }'
```

---

### Option 2: Python FastAPI + Claude

**위치**: `backend-fastapi/`

#### 1. 의존성 설치

```bash
cd backend-fastapi
pip install -r requirements.txt
```

또는 가상 환경 사용:

```bash
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

#### 2. 환경 변수 설정

`.env` 파일 생성:

```bash
cp .env.example .env
```

`.env` 파일 편집:

```env
ANTHROPIC_API_KEY=your-claude-api-key-here
PORT=3002
FRONTEND_URL=http://localhost:5175
```

#### 3. 서버 실행

```bash
python main.py
```

또는:

```bash
uvicorn main:app --reload --port 3002
```

서버는 http://localhost:3002 에서 실행됩니다.

#### API 문서

- Swagger UI: http://localhost:3002/docs
- ReDoc: http://localhost:3002/redoc

#### API 테스트

```bash
curl -X POST http://localhost:3002/api/generate \
  -H "Content-Type: application/json" \
  -d '{
    "studentName": "이서준",
    "recordType": "activity",
    "evidence": "학급 자치활동에서 리더십 발휘"
  }'
```

---

### Option 3: Flask + OpenAI/Claude

**위치**: `../Schoolrecord/src/backend/`

이 옵션은 **OpenAI와 Claude 두 가지 모두**를 지원합니다.

#### 1. 의존성 설치

```bash
cd ../Schoolrecord/src/backend
pip install openai anthropic python-dotenv flask flask-cors
```

#### 2. 환경 변수 설정

`.env` 파일 생성:

```bash
cp .env.example .env
```

`.env` 파일 편집:

```env
# 둘 다 설정하면 요청 시 provider를 선택할 수 있습니다
OPENAI_API_KEY=your-openai-api-key-here
ANTHROPIC_API_KEY=your-claude-api-key-here

FLASK_ENV=development
FLASK_APP=app.py
PORT=5000
FRONTEND_URL=http://localhost:5175
```

#### 3-1. 독립 실행 (school_record_app.py)

```bash
python -m flask --app school_record_app run --port 5001
```

#### 3-2. 기존 Flask 앱에 통합

`app.py`에 다음 코드 추가:

```python
# 파일 상단
from school_record_routes import register_school_record_routes

# 라우트 등록
register_school_record_routes(app)
```

그 후 실행:

```bash
python app.py
```

#### API 테스트

OpenAI 사용:

```bash
curl -X POST http://localhost:5000/api/generate \
  -H "Content-Type: application/json" \
  -d '{
    "studentName": "박지우",
    "recordType": "subject",
    "evidence": "물리 실험에서 우수한 성과",
    "subject": "물리",
    "provider": "openai"
  }'
```

Claude 사용:

```bash
curl -X POST http://localhost:5000/api/generate \
  -H "Content-Type: application/json" \
  -d '{
    "studentName": "박지우",
    "recordType": "homeroom",
    "evidence": "학급 활동에 적극적으로 참여",
    "provider": "claude"
  }'
```

---

## 전체 시스템 실행

### 최소 구성 (프론트엔드 + 백엔드 1개)

**터미널 1** - 프론트엔드:
```bash
cd school-record-portal
npm run dev
```

**터미널 2** - 백엔드 (예: Node.js):
```bash
cd school-record-portal/backend-node
node server.js
```

### 모든 백엔드 동시 실행

**터미널 1** - 프론트엔드:
```bash
cd school-record-portal
npm run dev
```

**터미널 2** - Node.js + OpenAI:
```bash
cd school-record-portal/backend-node
node server.js
```

**터미널 3** - FastAPI + Claude:
```bash
cd school-record-portal/backend-fastapi
python main.py
```

**터미널 4** - Flask + OpenAI/Claude:
```bash
cd ../Schoolrecord/src/backend
python -m flask --app school_record_app run --port 5001
```

이제 프론트엔드의 `.env` 파일에서 `VITE_API_URL`을 변경하여 원하는 백엔드를 선택할 수 있습니다.

---

## API 엔드포인트

모든 백엔드는 동일한 API 구조를 제공합니다:

### POST /api/generate

단일 학생 기록 생성

**요청:**
```json
{
  "studentName": "학생이름",
  "recordType": "subject|activity|homeroom|career",
  "evidence": "근거 자료 텍스트",
  "subject": "과목명 (recordType이 subject일 때만)",
  "provider": "openai|claude (Flask 백엔드만)"
}
```

**응답:**
```json
{
  "success": true,
  "generatedText": "생성된 텍스트...",
  "warnings": {
    "forbiddenWords": ["발견된", "금칙어"],
    "message": "금칙어가 발견되었습니다."
  },
  "metadata": {
    "length": 345,
    "model": "gpt-4o-mini",
    "provider": "openai",
    "backend": "Node.js + openai",
    "tokens": {
      "input": 120,
      "output": 350,
      "total": 470
    }
  }
}
```

### POST /api/generate/batch

여러 학생 일괄 생성

### GET /api/providers (Flask만)

사용 가능한 AI 제공자 목록

### GET /health 또는 /health-ai

서비스 상태 확인

---

## 문제 해결

### 포트 충돌

포트가 이미 사용 중이라면 `.env` 파일에서 포트를 변경하세요.

### API 키 오류

- OpenAI: https://platform.openai.com/api-keys
- Claude: https://console.anthropic.com/settings/keys

에서 API 키를 발급받아 `.env` 파일에 설정하세요.

### CORS 오류

백엔드의 `.env` 파일에서 `FRONTEND_URL`이 올바른지 확인하세요.

### 의존성 오류

**Node.js:**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Python:**
```bash
pip install --upgrade pip
pip install -r requirements.txt
```

---

## 개발 가이드

### 프론트엔드에서 백엔드 변경하기

`src/pages/AIWriting.tsx` 파일의 `API_URL` 상수를 수정:

```typescript
const API_URL = 'http://localhost:3001/api/generate';  // Node.js
// const API_URL = 'http://localhost:3002/api/generate';  // FastAPI
// const API_URL = 'http://localhost:5000/api/generate';  // Flask
```

또는 `.env` 파일에서 `VITE_API_URL`을 설정하고 코드를 수정:

```typescript
const API_URL = `${import.meta.env.VITE_API_URL}/api/generate`;
```

### 새로운 기록 유형 추가

1. 백엔드의 프롬프트 템플릿에 새 유형 추가
2. 프론트엔드의 `recordTypes` 배열에 새 유형 추가
3. 금칙어 규칙 확인 및 업데이트

---

## 라이선스

MIT License

---

## 지원

문제가 발생하면 GitHub Issues를 통해 문의하세요.
