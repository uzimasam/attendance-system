import React from 'react';
import { ArrowLeft, Users, Calendar, Clock, GraduationCap, BookOpen, ChevronRight } from 'lucide-react';
import UnitStats from './UnitStats';
import CohortList from './CohortList';
import ScheduleTimeline from './ScheduleTimeline';

export default function UnitPage() {
  // Mock data - in a real app, this would come from an API
  const unit = {
    id: '1',
    code: 'CSC 101',
    name: 'Programming 101',
    description: 'Introduction to programming concepts using Python',
    lecturer: 'Dr. Jane Smith',
    credits: 4,
    cohorts: [
      { id: '1', name: 'Year 1 2024', studentCount: 45, attendanceRate: 92 },
      { id: '2', name: 'Year 2 2023', studentCount: 38, attendanceRate: 88 },
    ],
    schedules: [
      {
        id: '1',
        cohortId: '1',
        date: '2024-03-21',
        startTime: '10:00',
        endTime: '12:00',
        venue: 'Lab 2B',
        attendanceRate: 95,
      },
      {
        id: '2',
        cohortId: '1',
        date: '2024-03-19',
        startTime: '14:00',
        endTime: '16:00',
        venue: 'Room 15',
        attendanceRate: 89,
      },
    ],
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => window.history.back()}
          className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-semibold text-gray-900">{unit.name}</h1>
            <span className="px-2 py-1 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg">
              {unit.code}
            </span>
          </div>
          <p className="text-sm text-gray-600">{unit.description}</p>
        </div>
      </div>

      {/* Unit Stats */}
      <UnitStats unit={unit} />

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cohorts Section */}
        <div className="lg:col-span-2">
          <CohortList cohorts={unit.cohorts} />
        </div>

        {/* Recent Activity */}
        <div>
          <ScheduleTimeline schedules={unit.schedules} />
        </div>
      </div>
    </div>
  );
}
