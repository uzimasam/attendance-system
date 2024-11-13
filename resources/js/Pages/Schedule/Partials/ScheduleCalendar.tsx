import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Schedule } from '@/types';

interface ScheduleCalendarProps {
  schedules: Schedule[];
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
}

export default function ScheduleCalendar({ schedules, selectedDate, onSelectDate }: ScheduleCalendarProps) {
  const daysInMonth = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth(),
    1
  ).getDay();

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const monthName = selectedDate.toLocaleString('default', { month: 'long' });

  const previousMonth = () => {
    onSelectDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    onSelectDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">
          {monthName} {selectedDate.getFullYear()}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={previousMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center text-sm font-medium text-gray-600">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {Array.from({ length: firstDayOfMonth }).map((_, index) => (
          <div key={`empty-${index}`} className="h-24 rounded-lg" />
        ))}
        {days.map(day => {
          const date = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day);
          const isSelected = date.toDateString() === selectedDate.toDateString();
          const hasSchedules = schedules.some(s => {
            const scheduleDate = new Date(s.day);
            return scheduleDate.toDateString() === date.toDateString();
          });

          return (
            <button
              key={day}
              onClick={() => onSelectDate(date)}
              className={`h-24 rounded-lg border transition-colors relative
                ${isSelected ? 'border-blue-600 bg-blue-50' : 'border-gray-100 hover:bg-gray-50'}
              `}
            >
              <span className={`absolute top-2 left-2 text-sm
                ${isSelected ? 'font-semibold text-blue-600' : 'text-gray-700'}
              `}>
                {day}
              </span>
              {hasSchedules && (
                <div className="absolute bottom-2 left-2 right-2">
                  <div className="h-1.5 rounded-full bg-blue-600"></div>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
