import { useState } from 'react';
import { BarChart3, TrendingUp, TrendingDown, AlertCircle, CheckCircle, Users } from 'lucide-react';

export function Quality() {
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  const qualityMetrics = [
    { label: '중복표현 비율', value: '8.3%', trend: 'down', change: '-2.1%', status: 'good' },
    { label: '근거 연결률', value: '87%', trend: 'up', change: '+5%', status: 'good' },
    { label: '금칙어 위반', value: '12건', trend: 'down', change: '-4건', status: 'warning' },
    { label: '생성→수정 비율', value: '1.8회', trend: 'down', change: '-0.3', status: 'good' },
    { label: '마감 준수율', value: '94%', trend: 'up', change: '+3%', status: 'good' },
    { label: '평균 작성 시간', value: '12분', trend: 'down', change: '-3분', status: 'good' },
  ];

  const teacherComparison = [
    { name: '김선생', records: 45, quality: 92, avgLength: 345, duplicates: 5 },
    { name: '이선생', records: 38, quality: 88, avgLength: 312, duplicates: 8 },
    { name: '박선생', records: 52, quality: 95, avgLength: 368, duplicates: 3 },
    { name: '최선생', records: 41, quality: 85, avgLength: 298, duplicates: 12 },
  ];

  const classComparison = [
    { class: '1-1', completion: 95, quality: 90, avgTime: 11 },
    { class: '1-2', completion: 88, quality: 87, avgTime: 14 },
    { class: '1-3', completion: 92, quality: 93, avgTime: 10 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">품질·분석</h1>
          <p className="mt-1 text-sm text-gray-500">
            생기부 작성 품질을 분석하고 개선점을 제시합니다
          </p>
        </div>
        <select
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg"
        >
          <option value="week">최근 1주</option>
          <option value="month">최근 1개월</option>
          <option value="quarter">최근 3개월</option>
          <option value="year">올해</option>
        </select>
      </div>

      {/* Quality Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {qualityMetrics.map((metric, index) => {
          const TrendIcon = metric.trend === 'up' ? TrendingUp : TrendingDown;
          const trendColor = metric.trend === 'up'
            ? (metric.status === 'good' ? 'text-green-600' : 'text-red-600')
            : (metric.status === 'good' ? 'text-green-600' : 'text-red-600');

          return (
            <div key={index} className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-600">{metric.label}</p>
                {metric.status === 'good' ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-orange-500" />
                )}
              </div>
              <div className="flex items-end justify-between">
                <p className="text-3xl font-bold text-gray-900">{metric.value}</p>
                <div className={`flex items-center gap-1 ${trendColor}`}>
                  <TrendIcon className="w-4 h-4" />
                  <span className="text-sm font-medium">{metric.change}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Teacher Comparison */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h3 className="font-semibold text-gray-900 flex items-center gap-2">
            <Users className="w-5 h-5" />
            교사별 비교
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">교사</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">작성 건수</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">품질 점수</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">평균 길이</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">중복표현</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {teacherComparison.map((teacher, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{teacher.name}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{teacher.records}건</td>
                  <td className="px-4 py-3 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-[100px]">
                        <div
                          className="bg-primary-600 h-2 rounded-full"
                          style={{ width: `${teacher.quality}%` }}
                        />
                      </div>
                      <span className="text-gray-900 font-medium">{teacher.quality}점</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">{teacher.avgLength}자</td>
                  <td className="px-4 py-3 text-sm">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      teacher.duplicates > 10 ? 'bg-red-100 text-red-700' :
                      teacher.duplicates > 5 ? 'bg-orange-100 text-orange-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {teacher.duplicates}건
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Class Comparison */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h3 className="font-semibold text-gray-900 flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            학급별 비교
          </h3>
        </div>
        <div className="p-4">
          <div className="space-y-4">
            {classComparison.map((cls, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-gray-900">{cls.class}</h4>
                  <span className="text-sm text-gray-600">평균 작성 시간: {cls.avgTime}분</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">완료율</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${cls.completion}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-900">{cls.completion}%</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">품질 점수</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-600 h-2 rounded-full"
                          style={{ width: `${cls.quality}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-900">{cls.quality}점</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Improvement Suggestions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="text-sm font-semibold text-blue-900 mb-3">💡 개선 제안</h4>
        <ul className="space-y-2 text-sm text-blue-800">
          <li>• 1-2반의 중복표현 비율이 높습니다. 표현 다양화를 권장합니다.</li>
          <li>• 최선생의 평균 길이가 권장 범위보다 짧습니다. 더 구체적인 기록을 권장합니다.</li>
          <li>• 이번 주 금칙어 위반이 전주 대비 증가했습니다. 템플릿 점검을 권장합니다.</li>
        </ul>
      </div>
    </div>
  );
}
