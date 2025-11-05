# 빠른 시작 가이드

생기부 포털을 5분 안에 실행하세요!

## 1️⃣ 프론트엔드 실행 (필수)

```bash
cd school-record-portal
npm install
npm run dev
```

프론트엔드가 http://localhost:5175 에서 실행됩니다.

## 2️⃣ 백엔드 선택 (하나만 선택)

### 옵션 A: Node.js + OpenAI (추천)

가장 간단하고 빠른 설정입니다.

```bash
# 터미널 새로 열기
cd school-record-portal/backend-node

# 환경 변수 설정
cp .env.example .env
# .env 파일을 열어서 OPENAI_API_KEY를 입력하세요

# 의존성 설치 및 실행
npm install
node server.js
```

✅ 서버가 http://localhost:3001 에서 실행됩니다.

### 옵션 B: Python FastAPI + Claude

Claude API를 사용하려면 이 옵션을 선택하세요.

```bash
# 터미널 새로 열기
cd school-record-portal/backend-fastapi

# 환경 변수 설정
cp .env.example .env
# .env 파일을 열어서 ANTHROPIC_API_KEY를 입력하세요

# 의존성 설치 및 실행
pip install -r requirements.txt
python main.py
```

✅ 서버가 http://localhost:3002 에서 실행됩니다.

### 옵션 C: Flask + OpenAI/Claude (양쪽 모두)

OpenAI와 Claude를 둘 다 사용하고 싶다면 이 옵션을 선택하세요.

```bash
# 터미널 새로 열기
cd ../Schoolrecord/src/backend

# 환경 변수 설정
cp .env.example .env
# .env 파일을 열어서 두 API 키를 모두 입력하세요

# 의존성 설치 및 실행
pip install openai anthropic python-dotenv flask flask-cors
python -m flask --app school_record_app run --port 5001
```

✅ 서버가 http://localhost:5001 에서 실행됩니다.

## 3️⃣ 프론트엔드에서 백엔드 연결

프로젝트 루트의 `.env` 파일을 생성:

```bash
cd school-record-portal
cp .env.example .env
```

선택한 백엔드에 맞게 `.env` 파일 수정:

```env
# 옵션 A를 선택했다면:
VITE_API_URL=http://localhost:3001

# 옵션 B를 선택했다면:
# VITE_API_URL=http://localhost:3002

# 옵션 C를 선택했다면:
# VITE_API_URL=http://localhost:5001
```

프론트엔드 개발 서버를 재시작하세요 (Ctrl+C 후 다시 `npm run dev`).

## 4️⃣ 테스트

1. 브라우저에서 http://localhost:5175 접속
2. 좌측 메뉴에서 "AI 작성" 클릭
3. 학생 선택, 근거 입력 후 "AI로 생성하기" 버튼 클릭
4. AI가 생성한 생기부 텍스트 확인!

## ⚠️ 문제 해결

### "API 키를 찾을 수 없음" 오류

- OpenAI API 키: https://platform.openai.com/api-keys
- Claude API 키: https://console.anthropic.com/settings/keys

에서 발급받아 `.env` 파일에 입력하세요.

### 백엔드 연결 실패

1. 백엔드 서버가 실행 중인지 확인
2. 프론트엔드 `.env` 파일의 `VITE_API_URL`이 올바른지 확인
3. 브라우저 콘솔(F12)에서 오류 메시지 확인

### 포트가 이미 사용 중

`.env` 파일에서 포트 번호를 변경하세요:

```env
# 백엔드 .env
PORT=다른포트번호

# 프론트엔드 .env
VITE_PORT=다른포트번호
```

## 📚 더 자세한 가이드

전체 설치 및 설정 가이드는 [SETUP.md](./SETUP.md)를 참고하세요.

## 🎯 다음 단계

- [ ] 실제 학생 데이터베이스 연동
- [ ] 템플릿 커스터마이징
- [ ] 금칙어 목록 관리
- [ ] 승인 워크플로우 설정
- [ ] NEIS 연동 설정

---

즐거운 개발 되세요! 🚀
