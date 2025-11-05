import { Bell } from 'lucide-react';
import { PagePlaceholder } from '../components/PagePlaceholder';

export function Notices() {
  return (
    <PagePlaceholder
      title="공지·가정통신문"
      description="학교 공지사항 및 가정통신문을 관리합니다"
      icon={Bell}
    />
  );
}
