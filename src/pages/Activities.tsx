import { useState } from 'react';
import {
  Calendar,
  Clock,
  Users,
  Heart,
  Briefcase,
  Star,
  Upload,
  FileText,
  CheckCircle,
  XCircle,
  Download,
  Filter,
  Search,
  Plus
} from 'lucide-react';

type ActivityType = 'autonomy' | 'club' | 'volunteer' | 'career';
type ActivityStatus = 'pending' | 'approved' | 'rejected';

interface Activity {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  student: string;
  grade: number;
  class: number;
  date: string;
  hours: number;
  evidence?: string;
  status: ActivityStatus;
  submittedBy: 'teacher' | 'student';
  submittedAt: string;
}

export function Activities() {
  const [selectedType, setSelectedType] = useState<ActivityType | 'all'>('all');
  const [viewMode, setViewMode] = useState<'list' | 'calendar' | 'timeline'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);

  const activityTypes = [
    { id: 'all' as const, label: '전체', icon: Star, color: 'gray' },
    { id: 'autonomy' as const, label: '자율활동', icon: Users, color: 'blue' },
    { id: 'club' as const, label: '동아리', icon: Users, color: 'purple' },
    { id: 'volunteer' as const, label: '봉사활동', icon: Heart, color: 'green' },
    { id: 'career' as const, label: '진로활동', icon: Briefcase, color: 'orange' },
  ];

  const activities: Activity[] = [
    {
      id: '1',
      type: 'autonomy',
      title: '학급 자치회의',
      description: '1학기 학급운영 방안 논의 및 의결',
      student: '김민지',
      grade: 1,
      class: 1,
      date: '2024-10-15',
      hours: 2,
      status: 'approved',
      submittedBy: 'teacher',
      submittedAt: '2024-10-15 16:00'
    },
    {
      id: '2',
      type: 'volunteer',
      title: '지역아동센터 교육봉사',
      description: '초등학생 대상 수학 학습 지도',
      student: '이서준',
      grade: 1,
      class: 1,
      date: '2024-10-20',
      hours: 4,
      evidence: '봉사활동확인서.pdf',
      status: 'pending',
      submittedBy: 'student',
      submittedAt: '2024-10-21 10:30'
    },
    {
      id: '3',
      type: 'club',
      title: '과학탐구동아리 실험활동',
      description: '화학반응 실험 및 보고서 작성',
      student: '박지우',
      grade: 1,
      class: 1,
      date: '2024-10-18',
      hours: 3,
      evidence: '실험보고서.pdf',
      status: 'approved',
      submittedBy: 'teacher',
      submittedAt: '2024-10-18 15:00'
    },
    {
      id: '4',
      type: 'career',
      title: '진로탐색 특강 - 의학 분야',
      description: '현직 의사 초청 강연 및 질의응답',
      student: '최하은',
      grade: 1,
      class: 1,
      date: '2024-10-25',
      hours: 2,
      status: 'approved',
      submittedBy: 'teacher',
      submittedAt: '2024-10-25 17:00'
    },
    {
      id: '5',
      type: 'volunteer',
      title: '환경정화 봉사활동',
      description: '학교 주변 환경정화 활동',
      student: '정도윤',
      grade: 1,
      class: 1,
      date: '2024-10-22',
      hours: 3,
      evidence: '활동사진.jpg',
      status: 'rejected',
      submittedBy: 'student',
      submittedAt: '2024-10-23 09:00'
    }
  ];

  const filteredActivities = activities.filter(a => {
    const matchesType = selectedType === 'all' || a.type === selectedType;
    const matchesSearch = a.title.includes(searchQuery) ||
                          a.description.includes(searchQuery) ||
                          a.student.includes(searchQuery);
    return matchesType && matchesSearch;
  });

  const totalHours = filteredActivities.reduce((sum, a) => sum + a.hours, 0);
  const pendingCount = activities.filter(a => a.status === 'pending').length;
  const studentSubmissions = activities.filter(a => a.submittedBy === 'student').length;

  const statusConfig = {
    pending: { label: '대기중', color: 'bg-yellow-100 text-yellow-700', icon: Clock },
    approved: { label: '승인', color: 'bg-green-100 text-green-700', icon: CheckCircle },
    rejected: { label: '반려', color: 'bg-red-100 text-red-700', icon: XCircle },
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">활동·봉사·동아리</h1>
          <p className="mt-1 text-sm text-gray-500">
            창의적 체험활동 4영역을 관리합니다
          </p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
            <Upload className="w-4 h-4" />
            엑셀 일괄등록
          </button>
          <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 flex items-center gap-2">
            <Plus className="w-4 h-4" />
            활동 추가
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-600">전체 활동</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{activities.length}건</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-600">총 시간</p>
          <p className="text-2xl font-bold text-blue-600 mt-1">{totalHours}시간</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-600">승인 대기</p>
          <p className="text-2xl font-bold text-yellow-600 mt-1">{pendingCount}건</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-600">학생 제출</p>
          <p className="text-2xl font-bold text-purple-600 mt-1">{studentSubmissions}건</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-600">이번 주</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">8건</p>
        </div>
      </div>

      {/* Activity Type Tabs */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-wrap gap-2">
          {activityTypes.map(type => {
            const Icon = type.icon;
            return (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                  selectedType === type.id
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                {type.label}
              </button>
            );
          })}
        </div>

        {/* View Mode Toggle */}
        <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="활동, 학생 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm w-64"
              />
            </div>
            <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2 text-sm">
              <Filter className="w-4 h-4" />
              필터
            </button>
          </div>

          <div className="flex gap-2">
            {['list', 'calendar', 'timeline'].map(mode => (
              <button
                key={mode}
                onClick={() => setViewMode(mode as any)}
                className={`px-3 py-1.5 rounded text-sm font-medium ${
                  viewMode === mode
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {mode === 'list' && '목록'}
                {mode === 'calendar' && '캘린더'}
                {mode === 'timeline' && '타임라인'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Activity List */}
      {viewMode === 'list' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Activities */}
          <div className="lg:col-span-2 space-y-4">
            {filteredActivities.map((activity) => {
              const typeConfig = activityTypes.find(t => t.id === activity.type);
              const TypeIcon = typeConfig?.icon || Star;
              const statusConf = statusConfig[activity.status];
              const StatusIcon = statusConf.icon;

              return (
                <div
                  key={activity.id}
                  onClick={() => setSelectedActivity(activity)}
                  className={`bg-white rounded-lg border-2 p-4 cursor-pointer transition-all ${
                    selectedActivity?.id === activity.id
                      ? 'border-primary-500 shadow-lg'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className={`w-12 h-12 bg-${typeConfig?.color}-100 rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <TypeIcon className={`w-6 h-6 text-${typeConfig?.color}-600`} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-medium text-gray-900">{activity.title}</h4>
                          <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusConf.color} flex items-center gap-1`}>
                          <StatusIcon className="w-3 h-3" />
                          {statusConf.label}
                        </span>
                      </div>

                      {/* Meta */}
                      <div className="flex flex-wrap gap-3 text-xs text-gray-500 mb-2">
                        <span>{activity.grade}학년 {activity.class}반 {activity.student}</span>
                        <span>•</span>
                        <span>{activity.date}</span>
                        <span>•</span>
                        <span className="font-medium text-primary-600">{activity.hours}시간</span>
                      </div>

                      {/* Evidence & Submission Info */}
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          {activity.evidence && (
                            <span className="flex items-center gap-1 text-blue-600">
                              <FileText className="w-3 h-3" />
                              증빙 첨부
                            </span>
                          )}
                          <span className={`${
                            activity.submittedBy === 'student'
                              ? 'text-purple-600 font-medium'
                              : 'text-gray-500'
                          }`}>
                            {activity.submittedBy === 'student' ? '학생 제출' : '교사 등록'}
                          </span>
                        </div>
                        <span className="text-gray-500">{activity.submittedAt}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Detail Panel */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-6">
              {selectedActivity ? (
                <>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">활동 상세</h3>

                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">활동명</label>
                      <p className="text-sm text-gray-900 mt-1">{selectedActivity.title}</p>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700">설명</label>
                      <p className="text-sm text-gray-900 mt-1">{selectedActivity.description}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700">학생</label>
                        <p className="text-sm text-gray-900 mt-1">
                          {selectedActivity.grade}학년 {selectedActivity.class}반<br />
                          {selectedActivity.student}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">활동 시간</label>
                        <p className="text-sm text-gray-900 mt-1">{selectedActivity.hours}시간</p>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700">활동 날짜</label>
                      <p className="text-sm text-gray-900 mt-1">{selectedActivity.date}</p>
                    </div>

                    {selectedActivity.evidence && (
                      <div>
                        <label className="text-sm font-medium text-gray-700">증빙 자료</label>
                        <div className="mt-1 flex items-center gap-2">
                          <FileText className="w-4 h-4 text-gray-600" />
                          <span className="text-sm text-blue-600">{selectedActivity.evidence}</span>
                          <button className="ml-auto p-1 hover:bg-gray-100 rounded">
                            <Download className="w-4 h-4 text-gray-600" />
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Actions for pending student submissions */}
                    {selectedActivity.status === 'pending' && selectedActivity.submittedBy === 'student' && (
                      <div className="pt-4 border-t border-gray-200 space-y-2">
                        <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium flex items-center justify-center gap-2">
                          <CheckCircle className="w-4 h-4" />
                          승인
                        </button>
                        <button className="w-full px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 font-medium flex items-center justify-center gap-2">
                          <XCircle className="w-4 h-4" />
                          반려
                        </button>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-sm text-gray-500">
                    활동을 선택하면<br />상세 정보를 확인할 수 있습니다
                  </p>
                </div>
              )}
            </div>

            {/* Quick Stats */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-blue-900 mb-3">시간 합산</h4>
              <div className="space-y-2">
                {activityTypes.slice(1).map(type => {
                  const hours = activities
                    .filter(a => a.type === type.id)
                    .reduce((sum, a) => sum + a.hours, 0);
                  return (
                    <div key={type.id} className="flex items-center justify-between text-sm">
                      <span className="text-blue-800">{type.label}</span>
                      <span className="font-medium text-blue-900">{hours}시간</span>
                    </div>
                  );
                })}
                <div className="pt-2 border-t border-blue-300 flex items-center justify-between font-semibold">
                  <span className="text-blue-900">합계</span>
                  <span className="text-blue-900">{totalHours}시간</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Calendar View Placeholder */}
      {viewMode === 'calendar' && (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600">캘린더 뷰가 곧 제공됩니다</p>
        </div>
      )}

      {/* Timeline View Placeholder */}
      {viewMode === 'timeline' && (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <Clock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600">타임라인 뷰가 곧 제공됩니다</p>
        </div>
      )}
    </div>
  );
}
