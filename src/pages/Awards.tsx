import { Award } from 'lucide-react';
import { PagePlaceholder } from '../components/PagePlaceholder';

export function Awards() {
  return (
    <PagePlaceholder
      title="수상·자격/인증"
      description="학생들의 수상 실적과 자격증을 관리합니다"
      icon={Award}
    />
  );
}
