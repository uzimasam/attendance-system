import React, { useState } from 'react';
import { ChevronRight, Users, BookOpen } from 'lucide-react';

interface UnitListProps {
  units: Array<{
    id: string;
    code: string;
    name: string;
    credits: number;
    semester: number;
    year: number;
    cohorts: Array<{
      id: string;
      name: string;
      studentCount: number;
    }>;
  }>;
}

export default function UnitList({ units }: UnitListProps) {
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedSemester, setSelectedSemester] = useState<number | null>(null);

  const years = Array.from(new Set(units.map(unit => unit.year))).sort();
  const semesters = Array.from(new Set(units.map(unit => unit.semester))).sort();

  const filteredUnits = units.filter(unit =>
    (selectedYear === null || unit.year === selectedYear) &&
    (selectedSemester === null || unit.semester === selectedSemester)
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Units</h2>
          <div className="flex gap-3">
            <select
              value={selectedYear || ''}
              onChange={(e) => setSelectedYear(e.target.value ? Number(e.target.value) : null)}
              className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Years</option>
              {years.map(year => (
                <option key={year} value={year}>Year {year}</option>
              ))}
            </select>
            <select
              value={selectedSemester || ''}
              onChange={(e) => setSelectedSemester(e.target.value ? Number(e.target.value) : null)}
              className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Semesters</option>
              {semesters.map(semester => (
                <option key={semester} value={semester}>Semester {semester}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="divide-y divide-gray-100">
        {filteredUnits.map(unit => (
          <div
            key={unit.id}
            className="p-6 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-gray-900">{unit.name}</h3>
                    <span className="px-2 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded-lg">
                      {unit.code}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Year {unit.year}, Semester {unit.semester} • {unit.credits} Credits
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    {unit.cohorts.reduce((sum, c) => sum + c.studentCount, 0)} Students
                  </span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              {unit.cohorts.map(cohort => (
                <span
                  key={cohort.id}
                  className="px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-lg"
                >
                  {cohort.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
