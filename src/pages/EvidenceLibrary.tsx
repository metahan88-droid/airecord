import { useState } from 'react';
import {
  Upload,
  FileText,
  Image,
  Link as LinkIcon,
  Tag,
  Filter,
  Search,
  Eye,
  Edit,
  Trash2,
  Download,
  Wand2,
  AlertCircle,
  Calendar,
  User,
  BookOpen
} from 'lucide-react';

interface Evidence {
  id: string;
  type: 'file' | 'image' | 'feedback' | 'competition' | 'link';
  title: string;
  description: string;
  student: string;
  subject?: string;
  activity?: string;
  tags: string[];
  uploadDate: string;
  extractedMeta?: {
    date?: string;
    organization?: string;
    duration?: string;
  };
  linkedSentences: number;
  thumbnailUrl?: string;
}

export function EvidenceLibrary() {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEvidence, setSelectedEvidence] = useState<Evidence | null>(null);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const evidenceTypes = [
    { id: 'all', label: '전체', icon: FileText },
    { id: 'file', label: '파일(OCR)', icon: FileText },
    { id: 'image', label: '사진', icon: Image },
    { id: 'feedback', label: '과제 피드백', icon: FileText },
    { id: 'competition', label: '대회 결과', icon: FileText },
    { id: 'link', label: '외부 링크', icon: LinkIcon },
  ];

  const evidences: Evidence[] = [
    {
      id: '1',
      type: 'file',
      title: '수학 탐구보고서_함수의 활용.pdf',
      description: '2차함수를 활용한 실생활 문제 해결 보고서',
      student: '김민지',
      subject: '수학',
      tags: ['함수', '탐구활동', '보고서'],
      uploadDate: '2024-11-01',
      extractedMeta: {
        date: '2024-10-25',
        organization: '1학년 1반',
        duration: '2주'
      },
      linkedSentences: 3
    },
    {
      id: '2',
      type: 'image',
      title: '과학실험_화학반응_사진.jpg',
      description: '산염기 중화반응 실험 장면',
      student: '이서준',
      subject: '과학',
      activity: '실험활동',
      tags: ['화학', '실험', '중화반응'],
      uploadDate: '2024-10-28',
      linkedSentences: 1
    },
    {
      id: '3',
      type: 'feedback',
      title: '영어 에세이 피드백',
      description: 'Environmental Protection 주제 에세이에 대한 교사 피드백',
      student: '박지우',
      subject: '영어',
      tags: ['작문', '환경', '피드백'],
      uploadDate: '2024-10-20',
      linkedSentences: 2
    },
    {
      id: '4',
      type: 'competition',
      title: '교내 수학경시대회 수상',
      description: '2024학년도 1학기 수학경시대회 금상 수상',
      student: '김민지',
      subject: '수학',
      tags: ['수상', '경시대회', '금상'],
      uploadDate: '2024-09-15',
      extractedMeta: {
        date: '2024-09-10',
        organization: '성당중학교',
      },
      linkedSentences: 0
    },
    {
      id: '5',
      type: 'link',
      title: '봉사활동 인증서 (1365자원봉사포털)',
      description: '지역아동센터 교육봉사 20시간',
      student: '최하은',
      activity: '봉사활동',
      tags: ['봉사', '교육봉사', '인증'],
      uploadDate: '2024-10-30',
      linkedSentences: 1
    }
  ];

  const filteredEvidences = evidences.filter(e => {
    const matchesType = selectedType === 'all' || e.type === selectedType;
    const matchesSearch = e.title.includes(searchQuery) ||
                          e.description.includes(searchQuery) ||
                          e.student.includes(searchQuery);
    return matchesType && matchesSearch;
  });

  const toggleSelection = (id: string) => {
    setSelectedItems(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const getTypeIcon = (type: string) => {
    const typeConfig = evidenceTypes.find(t => t.id === type);
    return typeConfig?.icon || FileText;
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">근거 라이브러리</h1>
          <p className="mt-1 text-sm text-gray-500">
            생기부 작성을 위한 근거 자료를 관리합니다
          </p>
        </div>
        <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 flex items-center gap-2">
          <Upload className="w-4 h-4" />
          근거 업로드
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-600">전체 근거</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{evidences.length}건</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-600">연결된 근거</p>
          <p className="text-2xl font-bold text-green-600 mt-1">
            {evidences.filter(e => e.linkedSentences > 0).length}건
          </p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-600">미연결 근거</p>
          <p className="text-2xl font-bold text-orange-600 mt-1">
            {evidences.filter(e => e.linkedSentences === 0).length}건
          </p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-600">이번 주 추가</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">12건</p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-wrap gap-4 items-center">
          {/* Type Filter */}
          <div className="flex gap-2">
            {evidenceTypes.map(type => (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  selectedType === type.id
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="제목, 학생, 내용 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
              />
            </div>
          </div>

          <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2 text-sm">
            <Filter className="w-4 h-4" />
            필터
          </button>
        </div>

        {/* Batch Actions */}
        {selectedItems.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between">
            <span className="text-sm text-gray-700">
              {selectedItems.length}개 선택됨
            </span>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 flex items-center gap-2 text-sm">
                <Wand2 className="w-4 h-4" />
                선택 근거로 초안 생성
              </button>
              <button className="px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
                태그 일괄 편집
              </button>
              <button className="px-3 py-1.5 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 text-sm">
                삭제
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Evidence Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Evidence Cards */}
        <div className="lg:col-span-2 space-y-4">
          {filteredEvidences.map((evidence) => {
            const TypeIcon = getTypeIcon(evidence.type);
            const isSelected = selectedItems.includes(evidence.id);

            return (
              <div
                key={evidence.id}
                className={`bg-white rounded-lg border-2 p-4 transition-all cursor-pointer ${
                  isSelected
                    ? 'border-primary-500 shadow-md'
                    : 'border-gray-200 hover:border-gray-300'
                } ${selectedEvidence?.id === evidence.id ? 'ring-2 ring-primary-200' : ''}`}
                onClick={() => setSelectedEvidence(evidence)}
              >
                <div className="flex items-start gap-4">
                  {/* Checkbox */}
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={(e) => {
                      e.stopPropagation();
                      toggleSelection(evidence.id);
                    }}
                    className="mt-1"
                  />

                  {/* Icon/Thumbnail */}
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <TypeIcon className="w-6 h-6 text-gray-600" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 truncate">
                          {evidence.title}
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">
                          {evidence.description}
                        </p>
                      </div>
                      {evidence.linkedSentences === 0 && (
                        <AlertCircle className="w-5 h-5 text-orange-500 flex-shrink-0 ml-2" />
                      )}
                    </div>

                    {/* Meta Info */}
                    <div className="flex flex-wrap gap-3 text-xs text-gray-500 mb-3">
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {evidence.student}
                      </span>
                      {evidence.subject && (
                        <span className="flex items-center gap-1">
                          <BookOpen className="w-3 h-3" />
                          {evidence.subject}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {evidence.uploadDate}
                      </span>
                      <span className="flex items-center gap-1">
                        <LinkIcon className="w-3 h-3" />
                        {evidence.linkedSentences}개 문장 연결
                      </span>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {evidence.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2">
                    <button className="p-1.5 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Extracted Meta */}
                {evidence.extractedMeta && (
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <span className="font-medium">OCR 추출 정보:</span>
                      {evidence.extractedMeta.date && (
                        <span>날짜: {evidence.extractedMeta.date}</span>
                      )}
                      {evidence.extractedMeta.organization && (
                        <span>기관: {evidence.extractedMeta.organization}</span>
                      )}
                      {evidence.extractedMeta.duration && (
                        <span>기간: {evidence.extractedMeta.duration}</span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Detail Panel */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-6">
            {selectedEvidence ? (
              <>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">상세 정보</h3>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">제목</label>
                    <p className="text-sm text-gray-900 mt-1">{selectedEvidence.title}</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">설명</label>
                    <p className="text-sm text-gray-900 mt-1">{selectedEvidence.description}</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">학생</label>
                    <p className="text-sm text-gray-900 mt-1">{selectedEvidence.student}</p>
                  </div>

                  {selectedEvidence.subject && (
                    <div>
                      <label className="text-sm font-medium text-gray-700">과목</label>
                      <p className="text-sm text-gray-900 mt-1">{selectedEvidence.subject}</p>
                    </div>
                  )}

                  <div>
                    <label className="text-sm font-medium text-gray-700">연결된 문장</label>
                    <p className="text-sm text-gray-900 mt-1">
                      {selectedEvidence.linkedSentences}개
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <button className="w-full px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 flex items-center justify-center gap-2 text-sm">
                      <Wand2 className="w-4 h-4" />
                      이 근거로 초안 생성
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-sm text-gray-500">
                  근거를 선택하면<br />상세 정보를 확인할 수 있습니다
                </p>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-blue-900 mb-3">빠른 작업</h4>
            <div className="space-y-2">
              <button className="w-full text-left px-3 py-2 text-sm text-blue-800 hover:bg-blue-100 rounded-lg">
                📝 근거 미연결 문장만 필터
              </button>
              <button className="w-full text-left px-3 py-2 text-sm text-blue-800 hover:bg-blue-100 rounded-lg">
                🔗 자동 매핑 제안
              </button>
              <button className="w-full text-left px-3 py-2 text-sm text-blue-800 hover:bg-blue-100 rounded-lg">
                📊 근거 연결 현황 보기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
