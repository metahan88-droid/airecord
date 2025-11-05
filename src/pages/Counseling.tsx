import { MessageSquare } from 'lucide-react';
import { PagePlaceholder } from '../components/PagePlaceholder';

export function Counseling() {
  return (
    <PagePlaceholder
      title="상담·생활지도"
      description="학생 상담 및 생활지도 기록을 관리합니다"
      icon={MessageSquare}
    />
  );
}
