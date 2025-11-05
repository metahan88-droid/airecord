import { Calendar as CalendarIcon } from 'lucide-react';
import { PagePlaceholder } from '../components/PagePlaceholder';

export function Calendar() {
  return (
    <PagePlaceholder
      title="캘린더"
      description="학교 일정 및 생기부 마감일을 관리합니다"
      icon={CalendarIcon}
    />
  );
}
