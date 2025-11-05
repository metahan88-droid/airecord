import { useState } from 'react';
import { Book, FileText, AlertCircle, Mail, MessageCircle, ChevronRight } from 'lucide-react';

export function Help() {
  const [selectedSection, setSelectedSection] = useState('guide');

  const guides = [
    { title: '시작하기', description: '생기부 포털 기본 사용법', icon: Book },
    { title: 'AI 작성 가이드', description: 'AI를 활용한 효과적인 생기부 작성', icon: FileText },
    { title: '금칙어 기준', description: 'NEIS 금칙어 및 작성 주의사항', icon: AlertCircle },
    { title: '승인 프로세스', description: '결재 흐름 및 권한 이해하기', icon: ChevronRight },
  ];

  const faqs = [
    {
      q: 'AI 작성으로 생성된 내용을 어떻게 수정하나요?',
      a: 'AI 작성 페이지에서 생성된 내용을 직접 편집하거나, "재생성" 버튼을 클릭하여 다른 버전을 생성할 수 있습니다. 수정 후 "승인 요청" 버튼을 눌러 제출하세요.'
    },
    {
      q: '금칙어 위반은 어떻게 확인하나요?',
      a: 'AI 작성 시 자동으로 금칙어 검사가 진행되며, 위반 사항이 있으면 경고 메시지가 표시됩니다. 템플릿 & 금칙어 메뉴에서 전체 금칙어 목록을 확인할 수 있습니다.'
    },
    {
      q: '근거 자료는 어떻게 연결하나요?',
      a: '근거 라이브러리에서 파일을 업로드한 후, AI 작성 페이지에서 해당 근거를 끌어다 놓아 연결할 수 있습니다. 자동 매핑 기능도 제공됩니다.'
    },
    {
      q: 'NEIS 형식으로 내보내기가 실패합니다',
      a: '내보내기 전 승인 완료 여부를 확인하세요. 승인되지 않은 기록은 내보내기에서 제외됩니다. 또한 금칙어 위반이나 길이 초과 항목이 없는지 확인하세요.'
    },
  ];

  const forbiddenExamples = [
    { word: '우수하다', reason: '과장 표현 및 상대 평가 암시', alternative: '~한 능력을 보임, ~에 참여함' },
    { word: '1등', reason: '서열화 금지', alternative: '높은 성취를 보임, 뛰어난 성과를 거둠' },
    { word: 'ADHD', reason: '민감 정보', alternative: '집중력 향상을 위해 노력함' },
  ];

  const changelog = [
    { version: 'v1.2.0', date: '2024-11-01', changes: ['활동/봉사/동아리 캘린더 뷰 추가', 'LMS 연동 기능 개선', '품질 분석 차트 추가'] },
    { version: 'v1.1.0', date: '2024-10-15', changes: ['근거 라이브러리 OCR 기능 추가', '템플릿 A/B 테스트 기능', '모바일 반응형 개선'] },
    { version: 'v1.0.0', date: '2024-10-01', changes: ['초기 릴리스', '기본 AI 작성 기능', '승인 워크플로우'] },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">도움말·정책</h1>
        <p className="mt-1 text-sm text-gray-500">
          시스템 사용법 및 가이드를 제공합니다
        </p>
      </div>

      {/* Section Tabs */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex gap-2">
          <button
            onClick={() => setSelectedSection('guide')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedSection === 'guide'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            작성 가이드
          </button>
          <button
            onClick={() => setSelectedSection('forbidden')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedSection === 'forbidden'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            금칙어 기준
          </button>
          <button
            onClick={() => setSelectedSection('faq')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedSection === 'faq'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            자주 묻는 질문
          </button>
          <button
            onClick={() => setSelectedSection('changelog')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedSection === 'changelog'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            변경 이력
          </button>
        </div>
      </div>

      {/* Guide Section */}
      {selectedSection === 'guide' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {guides.map((guide, index) => {
            const Icon = guide.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-lg border border-gray-200 p-6 hover:border-primary-300 transition-colors cursor-pointer"
              >
                <Icon className="w-10 h-10 text-primary-600 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">{guide.title}</h3>
                <p className="text-sm text-gray-600">{guide.description}</p>
              </div>
            );
          })}
        </div>
      )}

      {/* Forbidden Words Section */}
      {selectedSection === 'forbidden' && (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900">금칙어 예시 및 대체 표현</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">금칙어</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">사유</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">대체 표현</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {forbiddenExamples.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium text-red-600">{item.word}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{item.reason}</td>
                    <td className="px-4 py-3 text-sm text-green-600">{item.alternative}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 bg-yellow-50 border-t border-yellow-200">
            <p className="text-sm text-yellow-800">
              💡 전체 금칙어 목록은 "템플릿 & 금칙어" 메뉴에서 확인할 수 있습니다.
            </p>
          </div>
        </div>
      )}

      {/* FAQ Section */}
      {selectedSection === 'faq' && (
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-start gap-2">
                <span className="text-primary-600">Q.</span>
                {faq.q}
              </h3>
              <p className="text-sm text-gray-700 pl-6">
                <span className="text-green-600 font-medium">A.</span> {faq.a}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Changelog Section */}
      {selectedSection === 'changelog' && (
        <div className="space-y-4">
          {changelog.map((version, index) => (
            <div key={index} className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900 text-lg">{version.version}</h3>
                <span className="text-sm text-gray-500">{version.date}</span>
              </div>
              <ul className="space-y-2">
                {version.changes.map((change, idx) => (
                  <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                    <span className="text-green-600">•</span>
                    {change}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* Contact */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
            <Mail className="w-5 h-5" />
            이메일 문의
          </h3>
          <p className="text-sm text-blue-800 mb-2">support@school-record.com</p>
          <p className="text-xs text-blue-700">평일 09:00 - 18:00 응답</p>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <h3 className="font-semibold text-green-900 mb-3 flex items-center gap-2">
            <MessageCircle className="w-5 h-5" />
            실시간 채팅
          </h3>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium">
            채팅 시작하기
          </button>
        </div>
      </div>
    </div>
  );
}
