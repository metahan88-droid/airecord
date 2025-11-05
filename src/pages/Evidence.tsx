import { FileText } from 'lucide-react';
import { PagePlaceholder } from '../components/PagePlaceholder';

export function Evidence() {
  return (
    <PagePlaceholder
      title="근거 라이브러리"
      description="생기부 작성을 위한 근거 자료를 관리합니다"
      icon={FileText}
    />
  );
}
