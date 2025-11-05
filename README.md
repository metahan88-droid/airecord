# 생기부 포털 (School Record Portal)

AI 기반 생활기록부 작성 및 관리 시스템

![React](https://img.shields.io/badge/React-18.3-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue)
![Node.js](https://img.shields.io/badge/Node.js-Backend-green)
![Python](https://img.shields.io/badge/Python-Backend-green)
![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4o--mini-orange)
![Claude](https://img.shields.io/badge/Claude-3.5%20Sonnet-purple)

## 🚀 원클릭 배포

### 프론트엔드 (GitHub Pages)
이미 배포됨: [https://metahan88-droid.github.io/airecord/](https://metahan88-droid.github.io/airecord/)

### 백엔드 (Render)
[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/metahan88-droid/airecord)

**클릭 후 환경 변수 설정:**
- `GOOGLE_API_KEY`: 구글 Gemini API 키 입력

## 🎯 주요 기능

### 📱 12개 통합 페이지

#### 업무 흐름
- **대시보드** - 실시간 통계, 차트, 빠른 작업
- **학생 관리** - 학생 정보, 검색, 태그, 필터링
- **AI 작성** - GPT/Claude를 활용한 생기부 자동 생성
- **리뷰·승인** - 다단계 승인 워크플로우
- **내보내기** - NEIS/PDF/CSV 내보내기

#### 데이터 소스
- **근거 라이브러리** - OCR, 메타데이터, 활동 증거 관리
- **활동/봉사/동아리** - 창체 4영역 관리, 일정/타임라인 뷰
- **과목/평가** - 교과 평가, LMS 연동

#### 운영·지원
- **템플릿 & 금칙어** - 템플릿 관리, 금칙어 자동 검사
- **품질/분석** - 품질 분석, 교사/학급별 통계
- **설정 & 권한** - 역할 기반 접근 제어, SSO, 감사 로그
- **도움말/정책** - FAQ, 가이드, 변경 내역

### 🤖 AI 통합

- **3가지 백엔드 옵션** 지원:
  - Node.js + Express + OpenAI GPT-4o-mini
  - Python + FastAPI + Anthropic Claude 3.5 Sonnet
  - Flask + OpenAI/Claude (하이브리드)

- **4가지 기록 유형**:
  - 세특 (교과세부능력특기사항)
  - 창체 (창의적체험활동)
  - 담임종합 (담임종합의견)
  - 진로 (진로활동)

- **자동 검증**:
  - 금칙어 자동 검사 (우수하다, 뛰어나다, 등수 등)
  - 적정 글자 수 확인
  - 중복도 분석

## 🚀 빠른 시작

### 5분 안에 실행하기

```bash
# 1. 프론트엔드 실행
cd school-record-portal
npm install
npm run dev

# 2. 백엔드 실행 (새 터미널에서)
cd backend-node
npm install
cp .env.example .env
# .env 파일에 OPENAI_API_KEY 입력
node server.js
```

자세한 가이드: [QUICKSTART.md](./QUICKSTART.md)

## 📚 문서

- **[QUICKSTART.md](./QUICKSTART.md)** - 5분 빠른 시작 가이드
- **[SETUP.md](./SETUP.md)** - 전체 설치 및 설정 가이드
- **[backend-node/README.md](./backend-node/README.md)** - Node.js 백엔드
- **[backend-fastapi/README.md](./backend-fastapi/README.md)** - FastAPI 백엔드
- **[../Schoolrecord/src/backend/SCHOOL_RECORD_AI_SETUP.md](../Schoolrecord/src/backend/SCHOOL_RECORD_AI_SETUP.md)** - Flask 백엔드

## 🏗️ 프로젝트 구조

```
school-record-portal/
├── src/                        # React 프론트엔드
│   ├── pages/                  # 12개 페이지 컴포넌트
│   │   ├── Dashboard.tsx       # 대시보드
│   │   ├── Students.tsx        # 학생 관리
│   │   ├── AIWriting.tsx       # AI 작성 (★ 메인 기능)
│   │   ├── Review.tsx          # 리뷰·승인
│   │   ├── Export.tsx          # 내보내기
│   │   ├── EvidenceLibrary.tsx # 근거 라이브러리
│   │   ├── Activities.tsx      # 활동/봉사/동아리
│   │   ├── SubjectAssessment.tsx # 과목/평가
│   │   ├── Templates.tsx       # 템플릿 & 금칙어
│   │   ├── Quality.tsx         # 품질/분석
│   │   ├── Settings.tsx        # 설정 & 권한
│   │   └── Help.tsx            # 도움말/정책
│   ├── App.tsx                 # 메인 라우팅
│   └── vite-env.d.ts           # 환경 변수 타입 정의
│
├── backend-node/               # Node.js + OpenAI 백엔드
│   ├── server.js
│   ├── package.json
│   └── .env.example
│
├── backend-fastapi/            # Python FastAPI + Claude 백엔드
│   ├── main.py
│   ├── requirements.txt
│   └── .env.example
│
└── ../Schoolrecord/src/backend/  # Flask 하이브리드 백엔드
    ├── school_record_ai.py     # AI 생성 모듈
    ├── school_record_routes.py # Flask 라우트
    ├── school_record_app.py    # 독립 실행 앱
    └── .env.example
```

## 🛠️ 기술 스택

### 프론트엔드
- **React 18.3** - UI 프레임워크
- **TypeScript 5.7** - 타입 안전성
- **Vite 7.1** - 빌드 도구
- **TailwindCSS 3.4** - 스타일링
- **React Router v6** - 라우팅
- **Lucide React** - 아이콘
- **Recharts** - 차트

### 백엔드
- **Node.js + Express** - JavaScript 백엔드
- **Python + FastAPI** - 현대적인 Python 백엔드
- **Flask** - 경량 Python 백엔드
- **OpenAI API** - GPT-4o-mini
- **Anthropic API** - Claude 3.5 Sonnet

## 🔌 API 엔드포인트

모든 백엔드는 동일한 API 구조를 제공합니다:

### POST /api/generate
단일 학생 생기부 생성

```json
// 요청
{
  "studentName": "김민지",
  "recordType": "subject",
  "evidence": "수학 탐구보고서 작성",
  "subject": "수학"
}

// 응답
{
  "success": true,
  "generatedText": "수학 교과에서 함수의 개념을 이해하고...",
  "warnings": {
    "forbiddenWords": [],
    "message": null
  },
  "metadata": {
    "length": 345,
    "model": "gpt-4o-mini",
    "tokens": { "input": 120, "output": 350 }
  }
}
```

### POST /api/generate/batch
여러 학생 일괄 생성

### GET /api/providers
사용 가능한 AI 제공자 목록 (Flask만)

### GET /health
서비스 상태 확인

## 🎨 UI/UX 특징

- **3그룹 구조화된 사이드바** - 업무 흐름, 데이터 소스, 운영·지원
- **반응형 디자인** - 모바일부터 데스크톱까지 지원
- **다크 모드 준비** - 다크 모드 적용 가능
- **실시간 피드백** - 로딩 상태, 경고, 성공/실패 알림
- **접근성** - ARIA 라벨, 키보드 네비게이션
- **직관적인 아이콘** - Lucide React 아이콘 사용

## 🔒 보안 및 규정 준수

- **금칙어 자동 검사** - 교육부 지침 준수
- **역할 기반 접근 제어** (RBAC)
- **감사 로그** - 모든 작업 기록
- **SSO 통합** 준비
- **NEIS 호환** 형식

## 📊 프론트엔드 주요 컴포넌트

### AIWriting.tsx (메인 AI 생성 페이지)

```typescript
// 4가지 기록 유형 선택
const recordTypes = [
  { id: 'subject', label: '세특 (교과세특)' },
  { id: 'activity', label: '창체 (창의적체험활동)' },
  { id: 'homeroom', label: '담임종합' },
  { id: 'career', label: '진로' },
];

// API 호출 (환경 변수로 백엔드 선택)
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';
const response = await fetch(`${API_BASE}/api/generate`, {
  method: 'POST',
  body: JSON.stringify({ studentName, recordType, evidence, subject })
});
```

## 🧪 테스트

### 프론트엔드 테스트
```bash
npm run test
```

### 백엔드 API 테스트
```bash
# Node.js
curl -X POST http://localhost:3001/api/generate \
  -H "Content-Type: application/json" \
  -d '{"studentName":"김민지","recordType":"subject","evidence":"test"}'

# FastAPI
curl -X POST http://localhost:3002/api/generate \
  -H "Content-Type: application/json" \
  -d '{"studentName":"이서준","recordType":"activity","evidence":"test"}'

# Flask
curl -X POST http://localhost:5000/api/generate \
  -H "Content-Type: application/json" \
  -d '{"studentName":"박지우","recordType":"homeroom","evidence":"test","provider":"openai"}'
```

## 🚧 로드맵

- [ ] 실제 데이터베이스 통합 (PostgreSQL/MongoDB)
- [ ] 사용자 인증 및 권한 시스템
- [ ] NEIS API 직접 연동
- [ ] 실시간 협업 기능
- [ ] 모바일 앱 (React Native)
- [ ] AI 학습 피드백 루프
- [ ] 다국어 지원

## 🤝 기여

PR과 이슈를 환영합니다!

## 📄 라이선스

MIT License

## 👥 개발자

Claude Code로 개발되었습니다.

## 🆘 지원

- GitHub Issues
- Email: support@example.com
- 문서: [SETUP.md](./SETUP.md)

---

**⚡ 빠른 시작**: [QUICKSTART.md](./QUICKSTART.md)를 참고하세요!
