import { CheckSquare } from 'lucide-react';
import { PagePlaceholder } from '../components/PagePlaceholder';

export function Surveys() {
  return (
    <PagePlaceholder
      title="설문·동의서"
      description="각종 설문조사 및 동의서를 관리합니다"
      icon={CheckSquare}
    />
  );
}
