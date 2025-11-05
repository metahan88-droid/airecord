import { useState } from 'react';
import { FileText, Plus, Edit, Trash2, AlertCircle, Search, Copy, Download, Upload } from 'lucide-react';

export function Templates() {
  const [selectedTab, setSelectedTab] = useState<'templates' | 'forbidden' | 'rules'>('templates');

  const templates = [
    { id: '1', name: '세특 기본형', type: '교과세특', usage: 156, description: '일반적인 교과 세부능력특기사항 템플릿' },
    { id: '2', name: '세특 상세형', type: '교과세특', usage: 89, description: '구체적이고 상세한 활동 내용 중심의 템플릿' },
    { id: '3', name: '창체 자율활동', type: '창체', usage: 124, description: '자율활동 상황 기록용 템플릿' },
    { id: '4', name: '진로 탐색형', type: '진로', usage: 67, description: '진로탐색활동 중심의 템플릿' },
  ];

  const forbiddenWords = [
    { id: '1', word: '우수하다', category: '과장표현', severity: 'high', reason: 'NEIS 금칙어' },
    { id: '2', word: '뛰어나다', category: '과장표현', severity: 'medium', reason: '상대평가 암시' },
    { id: '3', word: '1등', category: '서열화', severity: 'high', reason: '서열화 금지' },
    { id: '4', word: '꼴찌', category: '서열화', severity: 'high', reason: '부정적 평가 금지' },
    { id: '5', word: 'ADHD', category: '개인정보', severity: 'high', reason: '민감정보 포함 금지' },
  ];

  const lengthRules = [
    { grade: 1, type: '교과세특', min: 200, max: 500, recommended: 350 },
    { grade: 1, type: '창체', min: 100, max: 300, recommended: 200 },
    { grade: 1, type: '담임종합', min: 300, max: 700, recommended: 500 },
  ];

  const severityColors = {
    high: 'bg-red-100 text-red-700',
    medium: 'bg-orange-100 text-orange-700',
    low: 'bg-yellow-100 text-yellow-700',
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">템플릿 & 금칙어</h1>
          <p className="mt-1 text-sm text-gray-500">
            생기부 작성 템플릿 및 금칙어 사전을 관리합니다
          </p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
            <Upload className="w-4 h-4" />
            가져오기
          </button>
          <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 flex items-center gap-2">
            <Plus className="w-4 h-4" />
            {selectedTab === 'templates' ? '템플릿 추가' : selectedTab === 'forbidden' ? '금칙어 추가' : '규칙 추가'}
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-600">템플릿</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{templates.length}개</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-600">금칙어</p>
          <p className="text-2xl font-bold text-red-600 mt-1">{forbiddenWords.length}개</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-600">길이 규칙</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{lengthRules.length}개</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-600">이번 주 위반</p>
          <p className="text-2xl font-bold text-orange-600 mt-1">12건</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex gap-2">
          <button
            onClick={() => setSelectedTab('templates')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedTab === 'templates'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            프롬프트 템플릿
          </button>
          <button
            onClick={() => setSelectedTab('forbidden')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedTab === 'forbidden'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            금칙어 사전
          </button>
          <button
            onClick={() => setSelectedTab('rules')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedTab === 'rules'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            길이 규칙
          </button>
        </div>
      </div>

      {/* Templates Tab */}
      {selectedTab === 'templates' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {templates.map(template => (
            <div key={template.id} className="bg-white rounded-lg border border-gray-200 p-4 hover:border-primary-300 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900">{template.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{template.description}</p>
                </div>
                <div className="flex gap-1">
                  <button className="p-1.5 hover:bg-gray-100 rounded">
                    <Copy className="w-4 h-4 text-gray-600" />
                  </button>
                  <button className="p-1.5 hover:bg-gray-100 rounded">
                    <Edit className="w-4 h-4 text-gray-600" />
                  </button>
                  <button className="p-1.5 hover:bg-red-50 rounded">
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">{template.type}</span>
                <span className="text-gray-500">{template.usage}회 사용</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Forbidden Words Tab */}
      {selectedTab === 'forbidden' && (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">금칙어 목록</h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="금칙어 검색..."
                className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm w-64"
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">금칙어</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">분류</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">심각도</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">사유</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">액션</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {forbiddenWords.map(word => (
                  <tr key={word.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{word.word}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{word.category}</td>
                    <td className="px-4 py-3 text-sm">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${severityColors[word.severity as keyof typeof severityColors]}`}>
                        {word.severity === 'high' && '높음'}
                        {word.severity === 'medium' && '중간'}
                        {word.severity === 'low' && '낮음'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{word.reason}</td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex gap-2">
                        <button className="text-primary-600 hover:text-primary-700">수정</button>
                        <button className="text-red-600 hover:text-red-700">삭제</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Length Rules Tab */}
      {selectedTab === 'rules' && (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900">학년·유형별 길이 규칙</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">학년</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">유형</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">최소</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">최대</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">권장</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">액션</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {lengthRules.map((rule, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900">{rule.grade}학년</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{rule.type}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{rule.min}자</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{rule.max}자</td>
                    <td className="px-4 py-3 text-sm">
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                        {rule.recommended}자
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex gap-2">
                        <button className="text-primary-600 hover:text-primary-700">수정</button>
                        <button className="text-red-600 hover:text-red-700">삭제</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Warning */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex gap-3">
          <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-semibold text-yellow-800 mb-1">주의사항</h4>
            <p className="text-sm text-yellow-700">
              금칙어 및 규칙 변경 시 기존 작성된 생기부에는 소급 적용되지 않습니다. 새로 작성되는 내용부터 적용됩니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
