import { useState } from 'react';
import { Wand2, Sparkles, FileText, Copy, RotateCw, ThumbsUp, ThumbsDown } from 'lucide-react';

type RecordType = 'subject' | 'activity' | 'homeroom' | 'career';

export function AIWriting() {
  const [selectedType, setSelectedType] = useState<RecordType>('subject');
  const [selectedStudent, setSelectedStudent] = useState('');
  const [evidenceText, setEvidenceText] = useState('');
  const [generatedText, setGeneratedText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const recordTypes = [
    { id: 'subject' as RecordType, label: '세특 (교과세특)', icon: FileText, color: 'blue' },
    { id: 'activity' as RecordType, label: '창체 (창의적체험활동)', icon: Sparkles, color: 'purple' },
    { id: 'homeroom' as RecordType, label: '담임종합', icon: FileText, color: 'green' },
    { id: 'career' as RecordType, label: '진로', icon: FileText, color: 'orange' },
  ];

  const students = [
    { id: '1', name: '김민지', grade: 1, class: 1 },
    { id: '2', name: '이서준', grade: 1, class: 1 },
    { id: '3', name: '박지우', grade: 1, class: 1 },
  ];

  const handleGenerate = async () => {
    setIsGenerating(true);

    try {
      // 백엔드 API URL은 .env 파일에서 설정합니다
      // 옵션 1: Node.js/OpenAI - http://localhost:3001
      // 옵션 2: FastAPI/Claude - http://localhost:3002
      // 옵션 3: Flask - http://localhost:5000
      const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      const API_URL = `${API_BASE}/api/generate`;

      const selectedStudentData = students.find(s => s.id === selectedStudent);

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          studentName: selectedStudentData?.name || '학생',
          recordType: selectedType,
          evidence: evidenceText,
          subject: selectedType === 'subject' ? '수학' : undefined, // 실제로는 UI에서 선택
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        setGeneratedText(data.generatedText);

        // 금칙어 경고가 있다면 표시
        if (data.warnings && data.warnings.forbiddenWords.length > 0) {
          alert(`⚠️ 금칙어 발견: ${data.warnings.forbiddenWords.join(', ')}\n수정이 필요합니다.`);
        }
      } else {
        throw new Error(data.error || 'AI 생성 실패');
      }
    } catch (error) {
      console.error('AI 생성 오류:', error);
      alert(`오류가 발생했습니다: ${error instanceof Error ? error.message : '알 수 없는 오류'}\n\n백엔드 서버가 실행 중인지 확인하세요.`);

      // 실패 시 더미 데이터 표시
      setGeneratedText(
        `[백엔드 연결 실패 - 더미 데이터]\n\n수학 교과에서 함수의 개념을 이해하고 그래프를 그리는 활동에 적극적으로 참여함. 특히 이차함수의 그래프를 그릴 때 정확한 좌표를 계산하고 대칭축과 꼭짓점을 정확히 표시하는 능력을 보임. 모둠 활동에서 친구들이 어려워하는 부분을 설명해주며 리더십을 발휘함. 수학적 사고력을 보이며 문제 해결 과정을 논리적으로 설명함.`
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const activeType = recordTypes.find(t => t.id === selectedType);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">AI 작성</h1>
        <p className="mt-1 text-sm text-gray-500">
          AI를 활용하여 세특, 창체, 담임종합, 진로 기록을 작성합니다
        </p>
      </div>

      {/* Record Type Selection */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {recordTypes.map((type) => {
          const Icon = type.icon;
          const isActive = selectedType === type.id;
          return (
            <button
              key={type.id}
              onClick={() => setSelectedType(type.id)}
              className={`p-4 rounded-lg border-2 transition-all ${
                isActive
                  ? `border-${type.color}-500 bg-${type.color}-50`
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <Icon className={`w-8 h-8 mx-auto mb-2 ${
                isActive ? `text-${type.color}-600` : 'text-gray-400'
              }`} />
              <div className="text-sm font-medium text-center">{type.label}</div>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">입력 정보</h3>

            {/* Student Selection */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                학생 선택
              </label>
              <select
                value={selectedStudent}
                onChange={(e) => setSelectedStudent(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="">학생을 선택하세요</option>
                {students.map(s => (
                  <option key={s.id} value={s.id}>
                    {s.grade}학년 {s.class}반 {s.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Subject Selection (for subject type) */}
            {selectedType === 'subject' && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  과목 선택
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
                  <option>수학</option>
                  <option>영어</option>
                  <option>국어</option>
                  <option>과학</option>
                  <option>사회</option>
                </select>
              </div>
            )}

            {/* Evidence Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                근거 자료 입력
              </label>
              <textarea
                value={evidenceText}
                onChange={(e) => setEvidenceText(e.target.value)}
                placeholder="학생의 활동 내용, 특징, 성취 등을 입력하세요..."
                className="w-full h-40 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
              />
              <p className="mt-2 text-xs text-gray-500">
                {evidenceText.length} / 500자
              </p>
            </div>

            {/* Template Selection */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                템플릿 선택 (선택사항)
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
                <option value="">기본 템플릿</option>
                <option>상세형</option>
                <option>간략형</option>
                <option>역량 중심형</option>
              </select>
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={!selectedStudent || !evidenceText || isGenerating}
              className="w-full px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-medium"
            >
              {isGenerating ? (
                <>
                  <RotateCw className="w-5 h-5 animate-spin" />
                  AI 생성 중...
                </>
              ) : (
                <>
                  <Wand2 className="w-5 h-5" />
                  AI로 생성하기
                </>
              )}
            </button>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h4 className="text-sm font-semibold text-gray-900 mb-3">빠른 작업</h4>
            <div className="space-y-2">
              <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded">
                📚 근거 라이브러리에서 불러오기
              </button>
              <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded">
                📋 이전 작성 내용 참고
              </button>
              <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded">
                ⚙️ AI 설정 조정
              </button>
            </div>
          </div>
        </div>

        {/* Output Section */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">생성 결과</h3>
              {generatedText && (
                <div className="flex gap-2">
                  <button className="p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg">
                    <Copy className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg">
                    <RotateCw className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>

            {generatedText ? (
              <>
                <div className="bg-gray-50 rounded-lg p-4 mb-4 min-h-[300px]">
                  <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">
                    {generatedText}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    {generatedText.replace(/\s/g, '').length}자
                  </div>
                  <div className="flex gap-2">
                    <button className="px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2 text-sm">
                      <ThumbsUp className="w-4 h-4" />
                      좋아요
                    </button>
                    <button className="px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2 text-sm">
                      <ThumbsDown className="w-4 h-4" />
                      재생성
                    </button>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium">
                    승인 요청하기
                  </button>
                </div>
              </>
            ) : (
              <div className="bg-gray-50 rounded-lg p-12 text-center min-h-[300px] flex flex-col items-center justify-center">
                <Wand2 className="w-12 h-12 text-gray-300 mb-4" />
                <p className="text-gray-500">
                  왼쪽에서 정보를 입력하고<br />
                  'AI로 생성하기' 버튼을 클릭하세요
                </p>
              </div>
            )}
          </div>

          {/* Warnings */}
          {generatedText && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-yellow-800 mb-2">⚠️ 확인 사항</h4>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• 금칙어: 발견되지 않음</li>
                <li>• 적정 글자 수: 200-300자 권장 (현재: {generatedText.replace(/\s/g, '').length}자)</li>
                <li>• 중복도: 유사 문장 없음</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
