import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Wand2,
  CheckSquare,
  Download,
  Calendar,
  Award,
  Activity,
  BookOpen,
  FileText,
  MessageSquare,
  Bell,
  Settings,
  HelpCircle,
} from 'lucide-react';

const navigationSections = [
  {
    title: '업무 흐름',
    items: [
      { id: 'dashboard', label: '대시보드', icon: LayoutDashboard, path: '/' },
      { id: 'students', label: '학생·학급 관리', icon: Users, path: '/students' },
      { id: 'ai-writing', label: 'AI 작성', icon: Wand2, path: '/ai-writing' },
      { id: 'review', label: '리뷰·승인', icon: CheckSquare, path: '/review' },
      { id: 'export', label: '내보내기', icon: Download, path: '/export' },
    ],
  },
  {
    title: '데이터 소스',
    items: [
      { id: 'attendance', label: '출결·상벌점', icon: Calendar, path: '/attendance' },
      { id: 'awards', label: '수상·자격/인증', icon: Award, path: '/awards' },
      { id: 'activities', label: '활동·봉사·동아리', icon: Activity, path: '/activities' },
      { id: 'subjects', label: '과목·평가', icon: BookOpen, path: '/subjects' },
      { id: 'reading', label: '독서·포트폴리오', icon: BookOpen, path: '/reading' },
      { id: 'counseling', label: '상담·생활지도', icon: MessageSquare, path: '/counseling' },
      { id: 'evidence', label: '근거 라이브러리', icon: FileText, path: '/evidence' },
    ],
  },
  {
    title: '커뮤니케이션',
    items: [
      { id: 'notices', label: '공지·가정통신문', icon: Bell, path: '/notices' },
      { id: 'messages', label: '메신저/알림장', icon: MessageSquare, path: '/messages' },
      { id: 'surveys', label: '설문·동의서', icon: CheckSquare, path: '/surveys' },
      { id: 'calendar', label: '캘린더', icon: Calendar, path: '/calendar' },
    ],
  },
  {
    title: '운영·품질',
    items: [
      { id: 'templates', label: '템플릿 & 금칙어', icon: FileText, path: '/templates' },
      { id: 'quality', label: '품질/분석', icon: Activity, path: '/quality' },
      { id: 'settings', label: '설정 & 권한', icon: Settings, path: '/settings' },
      { id: 'help', label: '도움말/가이드', icon: HelpCircle, path: '/help' },
    ],
  },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen overflow-y-auto">
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-xl font-bold text-primary-600">생기부 포털</h1>
        <p className="text-sm text-gray-500">학교생활기록부 통합 관리</p>
      </div>

      <nav className="p-4">
        {navigationSections.map((section) => (
          <div key={section.title} className="mb-6">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              {section.title}
            </h3>
            <ul className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;

                return (
                  <li key={item.id}>
                    <Link
                      to={item.path}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-primary-50 text-primary-700 font-medium'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-sm">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
