import { MessageSquare } from 'lucide-react';
import { PagePlaceholder } from '../components/PagePlaceholder';

export function Messages() {
  return (
    <PagePlaceholder
      title="메신저/알림장"
      description="실시간 메시지 및 알림장 기능을 제공합니다"
      icon={MessageSquare}
    />
  );
}
