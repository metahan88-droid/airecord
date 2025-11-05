import { useState } from 'react';
import { CheckCircle, XCircle, Clock, AlertCircle, Eye, MessageSquare } from 'lucide-react';

type ApprovalStatus = 'pending' | 'approved' | 'rejected' | 'revision';

interface Record {
  id: string;
  student: string;
  grade: number;
  class: number;
  type: string;
  subject?: string;
  content: string;
  status: ApprovalStatus;
  submittedBy: string;
  submittedAt: string;
  reviewer?: string;
  comments?: string;
}

export function Review() {
  const [filter, setFilter] = useState<ApprovalStatus | 'all'>('all');
  const [selectedRecord, setSelectedRecord] = useState<Record | null>(null);

  const records: Record[] = [
    {
      id: '1',
      student: '김민지',
      grade: 1,
      class: 1,
      type: '세특',
      subject: '수학',
      content: '수학 교과에서 함수의 개념을 이해하고 그래프를 그리는 활동에 적극적으로 참여함...',
      status: 'pending',
      submittedBy: '이선생',
      submittedAt: '2024-11-05 14:30',
    },
    {
      id: '2',
      student: '이서준',
      grade: 1,
      class: 1,
      type: '창체',
      content: '학급 자치활동에서 반장으로서 리더십을 발휘하여 학급 분위기 조성에 기여함...',
      status: 'pending',
      submittedBy: '박선생',
      submittedAt: '2024-11-05 13:20',
    },
    {
      id: '3',
      student: '박지우',
      grade: 1,
      class: 2,
      type: '세특',
      subject: '영어',
      content: '영어 독서 활동에 적극적으로 참여하며 다양한 영문 소설을 읽고 독후감을 작성함...',
      status: 'approved',
      submittedBy: '최선생',
      submittedAt: '2024-11-04 16:00',
      reviewer: '김부장',
    },
    {
      id: '4',
      student: '최하은',
      grade: 1,
      class: 2,
      type: '진로',
      content: '진로 탐색 활동에서 의료 분야에 대한 관심을 보이며...',
      status: 'revision',
      submittedBy: '정선생',
      submittedAt: '2024-11-04 10:15',
      reviewer: '김부장',
      comments: '구체적인 활동 내용을 추가해주세요',
    },
  ];

  const filteredRecords = filter === 'all'
    ? records
    : records.filter(r => r.status === filter);

  const statusConfig = {
    pending: { label: '대기중', color: 'bg-yellow-100 text-yellow-700', icon: Clock },
    approved: { label: '승인', color: 'bg-green-100 text-green-700', icon: CheckCircle },
    rejected: { label: '반려', color: 'bg-red-100 text-red-700', icon: XCircle },
    revision: { label: '수정요청', color: 'bg-orange-100 text-orange-700', icon: AlertCircle },
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">리뷰·승인</h1>
        <p className="mt-1 text-sm text-gray-500">
          작성된 생기부를 검토하고 승인합니다
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.entries(statusConfig).map(([status, config]) => {
          const count = records.filter(r => r.status === status).length;
          const Icon = config.icon;
          return (
            <div key={status} className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{config.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{count}건</p>
                </div>
                <Icon className="w-8 h-8 text-gray-400" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg font-medium ${
              filter === 'all'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            전체
          </button>
          {Object.entries(statusConfig).map(([status, config]) => (
            <button
              key={status}
              onClick={() => setFilter(status as ApprovalStatus)}
              className={`px-4 py-2 rounded-lg font-medium ${
                filter === status
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {config.label}
            </button>
          ))}
        </div>
      </div>

      {/* Records List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* List View */}
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-900">
            승인 대기 목록 ({filteredRecords.length}건)
          </h3>

          {filteredRecords.map((record) => {
            const config = statusConfig[record.status];

            return (
              <div
                key={record.id}
                onClick={() => setSelectedRecord(record)}
                className={`bg-white rounded-lg border-2 p-4 cursor-pointer transition-all ${
                  selectedRecord?.id === record.id
                    ? 'border-primary-500 shadow-lg'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-medium text-gray-900">
                      {record.grade}학년 {record.class}반 {record.student}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {record.type} {record.subject && `· ${record.subject}`}
                    </p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
                    {config.label}
                  </span>
                </div>

                <p className="text-sm text-gray-700 line-clamp-2 mb-3">
                  {record.content}
                </p>

                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>작성: {record.submittedBy}</span>
                  <span>{record.submittedAt}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Detail View */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-6">
          {selectedRecord ? (
            <>
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">상세 내용</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    statusConfig[selectedRecord.status].color
                  }`}>
                    {statusConfig[selectedRecord.status].label}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-600">학생:</span>
                    <span className="font-medium">
                      {selectedRecord.grade}학년 {selectedRecord.class}반 {selectedRecord.student}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-600">유형:</span>
                    <span className="font-medium">
                      {selectedRecord.type} {selectedRecord.subject && `(${selectedRecord.subject})`}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-600">작성자:</span>
                    <span className="font-medium">{selectedRecord.submittedBy}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-600">제출일:</span>
                    <span className="font-medium">{selectedRecord.submittedAt}</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h4 className="text-sm font-semibold text-gray-900 mb-2">내용</h4>
                <p className="text-sm text-gray-800 leading-relaxed">
                  {selectedRecord.content}
                </p>
                <div className="mt-3 text-xs text-gray-500">
                  {selectedRecord.content.replace(/\s/g, '').length}자
                </div>
              </div>

              {selectedRecord.comments && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                  <h4 className="text-sm font-semibold text-yellow-800 mb-2 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    검토 의견
                  </h4>
                  <p className="text-sm text-yellow-700">{selectedRecord.comments}</p>
                </div>
              )}

              {selectedRecord.status === 'pending' && (
                <>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      검토 의견 (선택사항)
                    </label>
                    <textarea
                      placeholder="검토 의견을 입력하세요..."
                      className="w-full h-24 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium">
                      승인
                    </button>
                    <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-medium">
                      수정요청
                    </button>
                    <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium">
                      반려
                    </button>
                  </div>
                </>
              )}

              {selectedRecord.status === 'approved' && selectedRecord.reviewer && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-sm text-green-700">
                    ✓ {selectedRecord.reviewer}님이 승인하였습니다
                  </p>
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <Eye className="w-12 h-12 text-gray-300 mb-4" />
              <p className="text-gray-500">
                왼쪽에서 항목을 선택하면<br />
                상세 내용을 확인할 수 있습니다
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
