import React from 'react';
import { Clock, MapPin, Users } from 'lucide-react';
import { Schedule } from '@/types';
import { Link } from '@inertiajs/react';

interface ScheduleListProps {
    schedules: Schedule[];
    selectedDate: Date;
}

export default function ScheduleList({ schedules, selectedDate }: ScheduleListProps) {
    const selectedDateStr = selectedDate.toISOString().split('T')[0];
    const filteredSchedules = schedules.filter(s => s.day === selectedDateStr);

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Classes on {selectedDate.toLocaleDateString()}
            </h2>

            {filteredSchedules.length === 0 ? (
                <p className="text-gray-600 text-sm">No classes scheduled for this date.</p>
            ) : (
                <div className="space-y-4">
                    {filteredSchedules.map(schedule => (
                        <div
                            key={schedule.id}
                            className="p-4 rounded-lg border border-gray-100 hover:border-blue-100 transition-colors"
                        >
                            <div className="flex items-start justify-between mb-2">
                                <h3 className="font-medium text-gray-900">Programming 101</h3>
                                <span className="text-sm text-blue-600 font-medium">CSC 101</span>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <Clock className="w-4 h-4" />
                                    <span>{schedule.start_time} - {schedule.end_time}</span>
                                </div>

                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <MapPin className="w-4 h-4" />
                                    <span>{schedule.venue}</span>
                                </div>

                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <Users className="w-4 h-4" />
                                    <span>Year 1 2024</span>
                                </div>
                            </div>

                            <div className="flex flex-col items-center">
                                <Link
                                    href={route('attendance')}
                                    className="mt-4 w-full px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                                >
                                    Start Attendance
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
