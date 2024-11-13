import React from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';

interface ScheduleTimelineProps {
  schedules: Array<{
    id: string;
    date: string;
    startTime: string;
    endTime: string;
    venue: string;
    attendanceRate: number;
  }>;
}

export default function ScheduleTimeline({ schedules }: ScheduleTimelineProps) {
  const sortedSchedules = [...schedules].sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900">Recent Classes</h2>
      </div>
      <div className="p-6">
        <div className="space-y-6">
          {sortedSchedules.map((schedule, index) => (
            <div key={schedule.id} className="relative">
              {index !== sortedSchedules.length - 1 && (
                <div className="absolute top-8 left-4 bottom-0 w-px bg-gray-200" />
              )}
              <div className="relative flex gap-4">
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-4 h-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {new Date(schedule.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>{schedule.startTime} - {schedule.endTime}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>{schedule.venue}</span>
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-gray-900">Attendance</span>
                      <span className="font-medium text-blue-600">{schedule.attendanceRate}%</span>
                    </div>
                    <div className="mt-1 h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-600 rounded-full"
                        style={{ width: `${schedule.attendanceRate}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
