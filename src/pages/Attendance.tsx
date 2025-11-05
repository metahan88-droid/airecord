import { Calendar } from 'lucide-react';
import { PagePlaceholder } from '../components/PagePlaceholder';

export function Attendance() {
  return (
    <PagePlaceholder
      title="출결·상벌점"
      description="출결 현황 및 상벌점 기록을 관리합니다"
      icon={Calendar}
    />
  );
}
