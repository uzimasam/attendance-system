import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, MapPin, Users, Plus } from 'lucide-react';
import ScheduleForm from './ScheduleForm';
import ScheduleCalendar from './ScheduleCalendar';
import ScheduleList from './ScheduleList';
import { Schedule } from '@/types';

export default function SchedulePage() {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());

    const mockSchedules: Schedule[] = [
        {
            id: 1,
            attendance_link: 'https://example.com/attendance/1',
            unit_id: 1,
            cohort_id: 1,
            day: '2024-12-13',
            start_time: '10:00',
            end_time: '12:00',
            venue: 'Lab 2B',
            status: 'active'
        },
        {
            id: 2,
            attendance_link: 'https://example.com/attendance/2',
            unit_id: 2,
            cohort_id: 2,
            day: '2024-12-13',
            start_time: '14:00',
            end_time: '16:00',
            venue: 'Lab 2B',
            status: 'active'
        },
        {
            id: 3,
            attendance_link: 'https://example.com/attendance/3',
            unit_id: 1,
            cohort_id: 1,
            day: '2024-12-14',
            start_time: '10:00',
            end_time: '12:00',
            venue: 'Lab 2B',
            status: 'active'
        }
    ];

    const handleScheduleCreate = (schedule: Omit<Schedule, 'id'>) => {
        // In a real app, this would make an API call
        console.log('Creating schedule:', schedule);
        setIsFormOpen(false);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-semibold text-gray-900">Schedule Management</h1>
                <button
                    onClick={() => setIsFormOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    Add Class Schedule
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <ScheduleCalendar
                        schedules={mockSchedules}
                        selectedDate={selectedDate}
                        onSelectDate={setSelectedDate}
                    />
                </div>
                <div>
                    <ScheduleList schedules={mockSchedules} selectedDate={selectedDate} />
                </div>
            </div>

            {isFormOpen && (
                <ScheduleForm
                    onClose={() => setIsFormOpen(false)}
                    onSubmit={handleScheduleCreate}
                    initialDate={selectedDate}
                />
            )}
        </div>
    );
}
