import { useState } from 'react';
import { Shield, Users, Key, Database, Bell, Download } from 'lucide-react';

export function Settings() {
  const [selectedTab, setSelectedTab] = useState<'roles' | 'data' | 'security' | 'notifications'>('roles');

  const roles = [
    { name: '교과교사', users: 45, permissions: ['학생 관리', 'AI 작성', '근거 라이브러리', '과목/평가', '리뷰/승인(제출만)'] },
    { name: '담임교사', users: 12, permissions: ['학생 관리', 'AI 작성', '리뷰/승인(결재권)', '활동/봉사/동아리'] },
    { name: '부장/관리자', users: 3, permissions: ['전체 접근', '최종 승인', '템플릿 관리', '품질 분석', '설정 관리'] },
    { name: '학생/학부모', users: 856, permissions: ['활동 제출', '타임라인 조회', '초안 미리보기'] },
  ];

  const auditLogs = [
    { user: '김선생', action: 'AI 작성 - 세특 생성', target: '1학년 1반 김민지', time: '2024-11-05 14:30:22' },
    { user: '이부장', action: '리뷰 승인', target: '1학년 2반 이서준', time: '2024-11-05 14:25:18' },
    { user: '박선생', action: '근거 업로드', target: '수학탐구보고서.pdf', time: '2024-11-05 14:20:45' },
    { user: '최선생', action: '내보내기', target: '1학년 전체 NEIS 형식', time: '2024-11-05 14:15:30' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">설정 & 권한</h1>
        <p className="mt-1 text-sm text-gray-500">
          시스템 설정 및 사용자 권한을 관리합니다
        </p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex gap-2">
          <button
            onClick={() => setSelectedTab('roles')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
              selectedTab === 'roles'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Users className="w-4 h-4" />
            역할 & 권한
          </button>
          <button
            onClick={() => setSelectedTab('data')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
              selectedTab === 'data'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Database className="w-4 h-4" />
            데이터 정책
          </button>
          <button
            onClick={() => setSelectedTab('security')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
              selectedTab === 'security'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Shield className="w-4 h-4" />
            보안
          </button>
          <button
            onClick={() => setSelectedTab('notifications')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
              selectedTab === 'notifications'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Bell className="w-4 h-4" />
            알림 설정
          </button>
        </div>
      </div>

      {/* Roles Tab */}
      {selectedTab === 'roles' && (
        <div className="space-y-4">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="font-semibold text-gray-900 mb-4">역할별 권한 관리</h3>
            <div className="space-y-4">
              {roles.map((role, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-medium text-gray-900">{role.name}</h4>
                      <p className="text-sm text-gray-600">{role.users}명 사용자</p>
                    </div>
                    <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                      권한 수정
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {role.permissions.map((perm, idx) => (
                      <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                        {perm}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SSO Configuration */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="font-semibold text-gray-900 mb-4">SSO 연동</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Key className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="font-medium text-gray-900">Google Workspace</p>
                    <p className="text-sm text-gray-600">구글 계정으로 로그인</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Key className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="font-medium text-gray-900">Microsoft 365</p>
                    <p className="text-sm text-gray-600">마이크로소프트 계정으로 로그인</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Data Policy Tab */}
      {selectedTab === 'data' && (
        <div className="space-y-4">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="font-semibold text-gray-900 mb-4">데이터 보존 정책</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">생기부 데이터 보존 기간</p>
                  <p className="text-sm text-gray-600">졸업 후 보존 기간 설정</p>
                </div>
                <select className="px-3 py-2 border border-gray-300 rounded-lg">
                  <option>3년</option>
                  <option>5년</option>
                  <option>10년</option>
                  <option>영구 보존</option>
                </select>
              </div>
              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">임시 파일 자동 삭제</p>
                  <p className="text-sm text-gray-600">미승인 임시 작성 파일 삭제 기간</p>
                </div>
                <select className="px-3 py-2 border border-gray-300 rounded-lg">
                  <option>30일</option>
                  <option>60일</option>
                  <option>90일</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="font-semibold text-gray-900 mb-4">개인정보 마스킹</h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer">
                <input type="checkbox" defaultChecked className="w-4 h-4" />
                <div>
                  <p className="font-medium text-gray-900">학생 연락처 마스킹</p>
                  <p className="text-sm text-gray-600">010-****-1234 형식으로 표시</p>
                </div>
              </label>
              <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer">
                <input type="checkbox" defaultChecked className="w-4 h-4" />
                <div>
                  <p className="font-medium text-gray-900">주소 일부 마스킹</p>
                  <p className="text-sm text-gray-600">상세 주소 숨김 처리</p>
                </div>
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Security Tab */}
      {selectedTab === 'security' && (
        <div className="space-y-4">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="font-semibold text-gray-900 mb-4">보안 설정</h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer">
                <input type="checkbox" defaultChecked className="w-4 h-4" />
                <div>
                  <p className="font-medium text-gray-900">접근 알림</p>
                  <p className="text-sm text-gray-600">새로운 기기에서 접속 시 알림</p>
                </div>
              </label>
              <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer">
                <input type="checkbox" defaultChecked className="w-4 h-4" />
                <div>
                  <p className="font-medium text-gray-900">다운로드 제한</p>
                  <p className="text-sm text-gray-600">내보내기 파일 워터마크 추가</p>
                </div>
              </label>
              <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer">
                <input type="checkbox" className="w-4 h-4" />
                <div>
                  <p className="font-medium text-gray-900">공유 링크 만료</p>
                  <p className="text-sm text-gray-600">7일 후 자동 만료</p>
                </div>
              </label>
            </div>
          </div>

          {/* Audit Log */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">감사 로그</h3>
              <button className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center gap-2">
                <Download className="w-4 h-4" />
                전체 다운로드
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">사용자</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">작업</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">대상</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">시간</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {auditLogs.map((log, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900">{log.user}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{log.action}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{log.target}</td>
                      <td className="px-4 py-3 text-sm text-gray-500">{log.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Notifications Tab */}
      {selectedTab === 'notifications' && (
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h3 className="font-semibold text-gray-900 mb-4">알림 설정</h3>
          <div className="space-y-3">
            <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer">
              <input type="checkbox" defaultChecked className="w-4 h-4" />
              <div>
                <p className="font-medium text-gray-900">마감 임박 알림</p>
                <p className="text-sm text-gray-600">마감 3일 전 알림</p>
              </div>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer">
              <input type="checkbox" defaultChecked className="w-4 h-4" />
              <div>
                <p className="font-medium text-gray-900">반려 발생 알림</p>
                <p className="text-sm text-gray-600">제출한 생기부가 반려된 경우</p>
              </div>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer">
              <input type="checkbox" className="w-4 h-4" />
              <div>
                <p className="font-medium text-gray-900">학생 제출 알림</p>
                <p className="text-sm text-gray-600">학생이 활동을 제출한 경우</p>
              </div>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer">
              <input type="checkbox" className="w-4 h-4" />
              <div>
                <p className="font-medium text-gray-900">연동 오류 알림</p>
                <p className="text-sm text-gray-600">LMS 연동 실패 시 알림</p>
              </div>
            </label>
          </div>
        </div>
      )}
    </div>
  );
}
