import { useState } from 'react';
import { BookOpen, Users, FileText, Download, Link as LinkIcon, Plus, Search, Filter } from 'lucide-react';

export function SubjectAssessment() {
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedClass, setSelectedClass] = useState('');

  const subjects = ['수학', '영어', '국어', '과학', '사회', '역사', '체육', '음악', '미술'];

  const assessments = [
    { id: '1', student: '김민지', midterm: 95, performance1: 'A', performance2: 'A', comment: '수학적 사고력이 뛰어나며 문제 해결 능력이 우수함' },
    { id: '2', student: '이서준', midterm: 88, performance1: 'B', performance2: 'A', comment: '꾸준한 학습 태도를 보이며 성적이 향상되고 있음' },
    { id: '3', student: '박지우', midterm: 92, performance1: 'A', performance2: 'B', comment: '논리적 사고력이 뛰어나며 복잡한 문제를 잘 해결함' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">과목·평가</h1>
          <p className="mt-1 text-sm text-gray-500">
            과목별 평가 기록 및 코멘트를 관리합니다
          </p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
            <LinkIcon className="w-4 h-4" />
            LMS 연동
          </button>
          <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 flex items-center gap-2">
            <Plus className="w-4 h-4" />
            평가 추가
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-600">전체 과목</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">9개</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-600">평가 완료</p>
          <p className="text-2xl font-bold text-green-600 mt-1">156건</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-600">코멘트 작성</p>
          <p className="text-2xl font-bold text-blue-600 mt-1">142건</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-600">LMS 연동</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">활성화</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-wrap gap-4">
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg"
          >
            <option value="">과목 선택</option>
            {subjects.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg"
          >
            <option value="">학급 선택</option>
            {[1, 2, 3, 4, 5, 6, 7, 8].map(c => <option key={c} value={c}>{c}반</option>)}
          </select>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
            <Filter className="w-4 h-4" />
            필터
          </button>
        </div>
      </div>

      {/* Assessment Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h3 className="font-semibold text-gray-900">평가 현황</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">학생</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">중간고사</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">수행평가1</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">수행평가2</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">코멘트</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">액션</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {assessments.map(a => (
                <tr key={a.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900">{a.student}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{a.midterm}점</td>
                  <td className="px-4 py-3 text-sm"><span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">{a.performance1}</span></td>
                  <td className="px-4 py-3 text-sm"><span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">{a.performance2}</span></td>
                  <td className="px-4 py-3 text-sm text-gray-600 max-w-md truncate">{a.comment}</td>
                  <td className="px-4 py-3 text-sm">
                    <button className="text-primary-600 hover:text-primary-700">세특 생성</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* LMS Integration Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="text-sm font-semibold text-blue-900 mb-2">LMS/구글클래스룸 연동</h4>
        <p className="text-sm text-blue-800">자동으로 성적과 코멘트를 불러옵니다. 마지막 동기화: 2024-11-05 14:30</p>
        <button className="mt-2 px-3 py-1.5 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">
          지금 동기화
        </button>
      </div>
    </div>
  );
}
