import { useState } from 'react';
import { Download, FileText, Table, CheckCircle } from 'lucide-react';

export function Export() {
  const [selectedGrade, setSelectedGrade] = useState<number>(1);
  const [selectedFormat, setSelectedFormat] = useState<'neis' | 'pdf' | 'csv'>('neis');
  const [selectedType, setSelectedType] = useState<string>('all');

  const exportFormats = [
    { id: 'neis', label: 'NEIS 형식', icon: FileText, description: 'NEIS에 직접 업로드 가능한 형식' },
    { id: 'pdf', label: 'PDF', icon: FileText, description: '출력 및 공유용 PDF 파일' },
    { id: 'csv', label: 'CSV/Excel', icon: Table, description: '엑셀 편집 가능한 형식' },
  ];

  const recordTypes = [
    { id: 'all', label: '전체' },
    { id: 'subject', label: '교과세특' },
    { id: 'activity', label: '창의적 체험활동' },
    { id: 'homeroom', label: '담임종합' },
    { id: 'career', label: '진로활동' },
    { id: 'awards', label: '수상경력' },
    { id: 'reading', label: '독서활동' },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">내보내기</h1>
        <p className="mt-1 text-sm text-gray-500">
          NEIS, PDF, CSV 형식으로 데이터를 내보냅니다
        </p>
      </div>

      {/* Export Format Selection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {exportFormats.map((format) => {
          const Icon = format.icon;
          const isActive = selectedFormat === format.id;
          return (
            <button
              key={format.id}
              onClick={() => setSelectedFormat(format.id as any)}
              className={`p-6 rounded-lg border-2 transition-all text-left ${
                isActive
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <Icon className={`w-10 h-10 mb-3 ${
                isActive ? 'text-primary-600' : 'text-gray-400'
              }`} />
              <h3 className="font-semibold text-gray-900 mb-1">{format.label}</h3>
              <p className="text-sm text-gray-600">{format.description}</p>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Configuration */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">내보내기 설정</h3>

            {/* Grade Selection */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                학년 선택
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3].map(grade => (
                  <button
                    key={grade}
                    onClick={() => setSelectedGrade(grade)}
                    className={`px-4 py-2 rounded-lg font-medium ${
                      selectedGrade === grade
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {grade}학년
                  </button>
                ))}
              </div>
            </div>

            {/* Class Selection */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                반 선택
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
                <option>전체</option>
                {[1, 2, 3, 4, 5, 6, 7, 8].map(c => (
                  <option key={c} value={c}>{c}반</option>
                ))}
              </select>
            </div>

            {/* Record Type Selection */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                포함할 기록 유형
              </label>
              <div className="grid grid-cols-2 gap-2">
                {recordTypes.map(type => (
                  <button
                    key={type.id}
                    onClick={() => setSelectedType(type.id)}
                    className={`px-4 py-2 rounded-lg font-medium text-sm ${
                      selectedType === type.id
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Additional Options */}
            <div className="border-t border-gray-200 pt-4 mt-4">
              <h4 className="text-sm font-semibold text-gray-900 mb-3">추가 옵션</h4>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span className="text-sm text-gray-700">승인된 기록만 포함</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm text-gray-700">학생별로 파일 분리</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm text-gray-700">첨부파일 포함</span>
                </label>
              </div>
            </div>

            {/* Export Button */}
            <div className="mt-6">
              <button className="w-full px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 flex items-center justify-center gap-2 font-medium text-lg">
                <Download className="w-5 h-5" />
                {selectedFormat.toUpperCase()} 파일로 내보내기
              </button>
            </div>
          </div>

          {/* Recent Exports */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">최근 내보내기 기록</h3>
            <div className="space-y-3">
              {[
                { date: '2024-11-05 15:30', type: 'NEIS', range: '1학년 전체', status: '완료' },
                { date: '2024-11-04 10:20', type: 'PDF', range: '2학년 3반', status: '완료' },
                { date: '2024-11-03 14:15', type: 'CSV', range: '3학년 전체', status: '완료' },
              ].map((record, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{record.range}</p>
                    <p className="text-xs text-gray-500">{record.date}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">
                      {record.type}
                    </span>
                    <span className="text-green-600 flex items-center gap-1 text-sm">
                      <CheckCircle className="w-4 h-4" />
                      {record.status}
                    </span>
                    <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                      다시 다운로드
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Preview/Info */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">미리보기</h3>
            <div className="bg-gray-50 rounded-lg p-4 min-h-[200px]">
              <p className="text-sm text-gray-600 mb-3">선택한 내용:</p>
              <ul className="text-sm text-gray-800 space-y-2">
                <li>• 학년: {selectedGrade}학년</li>
                <li>• 형식: {exportFormats.find(f => f.id === selectedFormat)?.label}</li>
                <li>• 기록 유형: {recordTypes.find(t => t.id === selectedType)?.label}</li>
                <li>• 예상 파일 수: 1개</li>
                <li>• 예상 파일 크기: 약 2.5MB</li>
              </ul>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-blue-900 mb-2">💡 도움말</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• NEIS 형식은 교육행정정보시스템에 바로 업로드할 수 있습니다</li>
              <li>• PDF는 인쇄물이나 학부모 공유용으로 적합합니다</li>
              <li>• CSV는 엑셀에서 추가 편집이 필요할 때 사용하세요</li>
            </ul>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-yellow-800 mb-2">⚠️ 주의사항</h4>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• 승인되지 않은 기록은 내보내기에서 제외됩니다</li>
              <li>• 개인정보 보호를 위해 파일을 안전하게 관리하세요</li>
              <li>• NEIS 업로드 전 반드시 최종 검토하세요</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
