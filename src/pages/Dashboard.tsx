import {
  BarChart3,
  Clock,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Users,
} from 'lucide-react';

export function Dashboard() {
  const stats = [
    {
      title: '전체 작성률',
      value: '87%',
      change: '+5%',
      trend: 'up',
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: '마감 D-Day',
      value: '15일',
      change: '11/20',
      trend: 'neutral',
      icon: Clock,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: '반려/대기',
      value: '12건',
      change: '-3건',
      trend: 'down',
      icon: AlertTriangle,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
    {
      title: '승인 완료',
      value: '145건',
      change: '+23건',
      trend: 'up',
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
  ];

  const recentActivities = [
    { type: '작성', user: '김선생', content: '3학년 2반 이지은 세특 작성', time: '5분 전' },
    { type: '승인', user: '박부장', content: '3학년 전체 창체 승인 완료', time: '1시간 전' },
    { type: '반려', user: '최교감', content: '2학년 5반 진로 반려 (금칙어 포함)', time: '2시간 전' },
    { type: '작성', user: '이선생', content: '1학년 3반 일괄 초안 생성', time: '3시간 전' },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">대시보드</h1>
        <p className="mt-1 text-sm text-gray-500">
          생기부 작성 현황을 한눈에 확인하세요
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.title}
              className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="mt-2 text-3xl font-bold text-gray-900">{stat.value}</p>
                  <p className={`mt-2 text-sm ${stat.color}`}>{stat.change}</p>
                </div>
                <div className={`${stat.bgColor} p-3 rounded-full`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts and Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Completion Rate Chart */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">학년별 작성률</h3>
            <BarChart3 className="w-5 h-5 text-gray-400" />
          </div>

          <div className="space-y-4">
            {[
              { grade: '1학년', rate: 92, students: 245 },
              { grade: '2학년', rate: 85, students: 238 },
              { grade: '3학년', rate: 79, students: 229 },
            ].map((item) => (
              <div key={item.grade}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">{item.grade}</span>
                  <span className="text-sm font-bold text-gray-900">{item.rate}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-primary-600 h-2 rounded-full transition-all"
                    style={{ width: `${item.rate}%` }}
                  ></div>
                </div>
                <p className="mt-1 text-xs text-gray-500">{item.students}명</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">최근 활동</h3>
            <Users className="w-5 h-5 text-gray-400" />
          </div>

          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0">
                <div className={`px-2 py-1 rounded text-xs font-medium ${
                  activity.type === '승인' ? 'bg-green-100 text-green-700' :
                  activity.type === '반려' ? 'bg-red-100 text-red-700' :
                  'bg-blue-100 text-blue-700'
                }`}>
                  {activity.type}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">{activity.content}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {activity.user} · {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">빠른 작업</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'AI 세특 작성', color: 'primary' },
            { label: '일괄 승인', color: 'green' },
            { label: 'NEIS 내보내기', color: 'blue' },
            { label: '품질 분석', color: 'purple' },
          ].map((action) => (
            <button
              key={action.label}
              className={`px-4 py-3 rounded-lg font-medium transition-colors
                ${action.color === 'primary' ? 'bg-primary-600 text-white hover:bg-primary-700' :
                  action.color === 'green' ? 'bg-green-600 text-white hover:bg-green-700' :
                  action.color === 'blue' ? 'bg-blue-600 text-white hover:bg-blue-700' :
                  'bg-purple-600 text-white hover:bg-purple-700'
                }`}
            >
              {action.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
