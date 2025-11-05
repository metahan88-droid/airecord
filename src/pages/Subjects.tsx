import { BookOpen } from 'lucide-react';
import { PagePlaceholder } from '../components/PagePlaceholder';

export function Subjects() {
  return (
    <PagePlaceholder
      title="과목·평가"
      description="교과목별 평가 및 세부능력특기사항을 관리합니다"
      icon={BookOpen}
    />
  );
}
