import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import ScheduleForm from './ScheduleForm';
import ScheduleCalendar from './ScheduleCalendar';
import ScheduleList from './ScheduleList';
import { Schedule } from '@/types';

export default function SchedulePage({ units, schedules, cohorts }: any) {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());

    const handleScheduleCreate = (schedule: Omit<Schedule, 'id'>) => {
        // In a real app, this would make an API call
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
                        schedules={schedules}
                        selectedDate={selectedDate}
                        onSelectDate={setSelectedDate}
                    />
                </div>
                <div>
                    <ScheduleList schedules={schedules} selectedDate={selectedDate} />
                </div>
            </div>

            {isFormOpen && (
                <ScheduleForm
                    onClose={() => setIsFormOpen(false)}
                    onSubmit={handleScheduleCreate}
                    initialDate={selectedDate}
                    units={units}
                    cohorts={cohorts}
                />
            )}
        </div>
    );
}
