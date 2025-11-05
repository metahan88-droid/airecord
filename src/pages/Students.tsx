import { useState } from 'react';
import { Search, Filter, Plus, Tag, Clock, Edit, Trash2 } from 'lucide-react';

interface Student {
  id: string;
  name: string;
  grade: number;
  class: number;
  number: number;
  tags: string[];
  photoUrl?: string;
}

export function Students() {
  const [selectedGrade, setSelectedGrade] = useState<number>(1);
  const [selectedClass, setSelectedClass] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState('');

  // 예시 학생 데이터
  const students: Student[] = [
    { id: '1', name: '김민지', grade: 1, class: 1, number: 1, tags: ['학급임원', '수학우수'] },
    { id: '2', name: '이서준', grade: 1, class: 1, number: 2, tags: ['체육특기', '리더십'] },
    { id: '3', name: '박지우', grade: 1, class: 1, number: 3, tags: ['예술재능', '봉사활동'] },
    { id: '4', name: '최하은', grade: 1, class: 1, number: 4, tags: ['과학탐구', '독서왕'] },
    { id: '5', name: '정도윤', grade: 1, class: 1, number: 5, tags: ['영어우수'] },
  ];

  const filteredStudents = students.filter(s =>
    s.grade === selectedGrade &&
    s.class === selectedClass &&
    s.name.includes(searchQuery)
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">학생·학급 관리</h1>
        <p className="mt-1 text-sm text-gray-500">
          학생 정보, 태그, 타임라인을 관리합니다
        </p>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-wrap gap-4 items-center">
          {/* Grade Selection */}
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">학년</label>
            <select
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(Number(e.target.value))}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value={1}>1학년</option>
              <option value={2}>2학년</option>
              <option value={3}>3학년</option>
            </select>
          </div>

          {/* Class Selection */}
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">반</label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(Number(e.target.value))}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map(c => (
                <option key={c} value={c}>{c}반</option>
              ))}
            </select>
          </div>

          {/* Search */}
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="학생 이름 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 flex items-center gap-2">
            <Plus className="w-4 h-4" />
            학생 추가
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
            <Filter className="w-4 h-4" />
            필터
          </button>
        </div>
      </div>

      {/* Student List */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h3 className="font-semibold text-gray-900">
            {selectedGrade}학년 {selectedClass}반 학생 목록 ({filteredStudents.length}명)
          </h3>
        </div>

        <div className="divide-y divide-gray-200">
          {filteredStudents.map((student) => (
            <div key={student.id} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {/* Avatar */}
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="text-primary-600 font-medium">
                      {student.name[0]}
                    </span>
                  </div>

                  {/* Student Info */}
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium text-gray-900">
                        {student.number}번 {student.name}
                      </h4>
                      <span className="text-sm text-gray-500">
                        {student.grade}학년 {student.class}반
                      </span>
                    </div>

                    {/* Tags */}
                    <div className="flex gap-2 mt-2">
                      {student.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <button className="p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg">
                    <Tag className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg">
                    <Clock className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg">
                    <Edit className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
