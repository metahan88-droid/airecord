import { HashRouter, Routes, Route } from 'react-router-dom';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { Students } from './pages/Students';
import { AIWriting } from './pages/AIWriting';
import { Review } from './pages/Review';
import { Export } from './pages/Export';
import { EvidenceLibrary } from './pages/EvidenceLibrary';
import { Activities } from './pages/Activities';
import { SubjectAssessment } from './pages/SubjectAssessment';
import { Templates } from './pages/Templates';
import { Quality } from './pages/Quality';
import { Settings } from './pages/Settings';
import { Help } from './pages/Help';
import {
  LayoutDashboard,
  Users,
  Wand2,
  CheckCircle,
  Download,
  FolderOpen,
  Calendar,
  BookOpen,
  FileText,
  BarChart3,
  Shield,
  HelpCircle,
  Bell
} from 'lucide-react';

function MainLayout() {
  const location = useLocation();

  const menuGroups = [
    {
      title: '업무 흐름',
      items: [
        { path: '/', label: '대시보드', icon: LayoutDashboard, badge: null },
        { path: '/students', label: '학생 관리', icon: Users, badge: null },
        { path: '/ai-writing', label: 'AI 작성', icon: Wand2, badge: null },
        { path: '/review', label: '리뷰·승인', icon: CheckCircle, badge: 7 },
        { path: '/export', label: '내보내기', icon: Download, badge: null },
      ]
    },
    {
      title: '데이터 소스',
      items: [
        { path: '/evidence', label: '근거 라이브러리', icon: FolderOpen, badge: null },
        { path: '/activities', label: '활동·봉사·동아리', icon: Calendar, badge: null },
        { path: '/subjects', label: '과목·평가', icon: BookOpen, badge: null },
      ]
    },
    {
      title: '운영·지원',
      items: [
        { path: '/templates', label: '템플릿 & 금칙어', icon: FileText, badge: null },
        { path: '/quality', label: '품질·분석', icon: BarChart3, badge: null },
        { path: '/settings', label: '설정 & 권한', icon: Shield, badge: null },
        { path: '/help', label: '도움말·정책', icon: HelpCircle, badge: null },
      ]
    }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <aside className="w-64 bg-white border-r border-gray-200 overflow-y-auto">
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-bold text-primary-600">생기부 포털</h1>
          <p className="text-xs text-gray-500 mt-1">학생부 통합 관리 시스템</p>
        </div>

        <nav className="p-4">
          {menuGroups.map((group, groupIndex) => (
            <div key={groupIndex} className="mb-6">
              <h3 className="text-xs font-semibold text-gray-400 uppercase mb-2 px-3">
                {group.title}
              </h3>
              <ul className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path ||
                    (item.path !== '/' && location.pathname.startsWith(item.path));

                  return (
                    <li key={item.path}>
                      <Link
                        to={item.path}
                        className={`flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                          isActive
                            ? 'bg-primary-50 text-primary-700 font-medium'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="w-5 h-5" />
                          <span className="text-sm">{item.label}</span>
                        </div>
                        {item.badge && (
                          <span className="px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* Notifications at bottom */}
        <div className="p-4 border-t border-gray-200">
          <button className="w-full flex items-center justify-between px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5" />
              <span className="text-sm">알림</span>
            </div>
            <span className="px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">
              3
            </span>
          </button>
        </div>
      </aside>

      <div className="flex-1 overflow-y-auto p-6">
        <Outlet />
      </div>
    </div>
  );
}

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="students" element={<Students />} />
          <Route path="ai-writing" element={<AIWriting />} />
          <Route path="review" element={<Review />} />
          <Route path="export" element={<Export />} />
          <Route path="evidence" element={<EvidenceLibrary />} />
          <Route path="activities" element={<Activities />} />
          <Route path="subjects" element={<SubjectAssessment />} />
          <Route path="templates" element={<Templates />} />
          <Route path="quality" element={<Quality />} />
          <Route path="settings" element={<Settings />} />
          <Route path="help" element={<Help />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
