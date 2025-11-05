import { LucideIcon } from 'lucide-react';

interface PagePlaceholderProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

export function PagePlaceholder({ title, description, icon: Icon }: PagePlaceholderProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
        <p className="mt-1 text-sm text-gray-500">{description}</p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-12">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="bg-primary-100 p-6 rounded-full mb-4">
            <Icon className="w-12 h-12 text-primary-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {title} 페이지
          </h3>
          <p className="text-gray-500 max-w-md">
            이 페이지는 현재 개발 중입니다. 곧 완성될 예정입니다.
          </p>
        </div>
      </div>
    </div>
  );
}
