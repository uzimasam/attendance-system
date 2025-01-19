import React, { useState } from 'react';
import { Clock, MapPin, Users } from 'lucide-react';
import { Schedule } from '@/types';
import { Link } from '@inertiajs/react';
import RescheduleForm from './RescheduleForm';

interface ScheduleListProps {
    readonly schedules: Schedule[];
    readonly selectedDate: Date;
}

export default function ScheduleList({ schedules, selectedDate }: Readonly<ScheduleListProps>) {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(null);

    const openForm = (schedule: Schedule) => {
        setSelectedSchedule(schedule);
        setIsFormOpen(true);
    };

    const closeForm = () => {
        setIsFormOpen(false);
        setSelectedSchedule(null);
    };
    const getStatusComponent = (schedule: Schedule) => {
        const currentDate = new Date();
        const startTime = new Date(`${schedule.day}T${schedule.start_time}`);
        const endTime = new Date(`${schedule.day}T${schedule.end_time}`);
        switch (schedule.status) {
            case 'active':
                if (currentDate < startTime) {
                    // Upcoming class
                    return (
                        <button
                            onClick={() => openForm(schedule)}
                            className="mt-4 w-full px-4 py-2 text-sm font-medium text-amber-600 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors"
                        >
                            Upcoming Class: Reschedule
                        </button>
                    );
                } else if (currentDate > endTime) {
                    // Missed class
                    return (
                        <button
                            onClick={() => openForm(schedule)}
                            className="mt-4 w-full px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                        >
                            Missed Class: Reschedule
                        </button>
                    );
                } else if (currentDate >= startTime && currentDate <= endTime) {
                    // Class in progress
                    return (
                        <Link
                            href={route('attendance.portal', schedule.attendance_link)}
                            className="mt-4 w-full px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                        >
                            Start Attendance
                        </Link>
                    );
                }
                // Default case (should not be reached)
                return (
                    <span className="mt-4 text-sm text-red-600 font-medium">Invalid schedule</span>
                );
            case 'marking':
                return (
                    <Link
                        href={route('attendance.portal', schedule.attendance_link)}
                        className="mt-4 w-full px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                    >
                        Continue With Attendance
                    </Link>
                );
            case 'marked':
                return (
                    <Link
                        href={route('attendance.portal', schedule.attendance_link)}
                        className="mt-4 w-full px-4 py-2 text-sm font-medium text-green-600 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                    >
                        View Attendance Report
                    </Link>
                );
            default:
                return (
                    <span className="mt-4 text-sm text-red-600 font-medium">Attendance closed</span>
                );
        }
    };
    const formatDate = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    const selectedDateStr = formatDate(selectedDate);
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
                                <h3 className="font-medium text-gray-900">{schedule.unit.name}</h3>
                                <span className="text-sm text-blue-600 font-medium">{schedule.unit.code}</span>
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
                                    <span>{schedule.cohort.name}</span>
                                </div>
                            </div>

                            <div className="flex flex-col items-center">
                                {getStatusComponent(schedule)}
                            </div>
                        </div>
                    ))}
                </div>
            )}
            
            {selectedSchedule && (
                <RescheduleForm
                    isOpen={isFormOpen}
                    onClose={closeForm}
                    onSubmit={closeForm}
                    schedule={selectedSchedule}
                />
            )}
        </div>
    );
}
