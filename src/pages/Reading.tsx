import { BookOpen } from 'lucide-react';
import { PagePlaceholder } from '../components/PagePlaceholder';

export function Reading() {
  return (
    <PagePlaceholder
      title="독서·포트폴리오"
      description="학생들의 독서 활동 및 포트폴리오를 관리합니다"
      icon={BookOpen}
    />
  );
}
