import React, { FormEventHandler } from 'react';
import { X } from 'lucide-react';
import { Schedule } from '@/types';
import SearchableSelect from '@/Components/SearchableSelect';
import { useForm } from '@inertiajs/react';

interface ScheduleFormProps {
    onClose: () => void;
    onSubmit: (schedule: Omit<Schedule, 'id'>) => void;
    initialDate: Date;
    units: any[];
    cohorts: any[];
}

export default function ScheduleForm({ onClose, onSubmit, initialDate, units, cohorts }: Readonly<ScheduleFormProps>) {
    initialDate.setHours(initialDate.getHours() + 3);
    initialDate.setMinutes(0);
    const { data, setData, post, reset } = useForm({
        topic: '',
        attendance_link: '',
        unit_id: 0,
        cohort_id: 0,
        day: new Date(initialDate.setHours(initialDate.getHours() + 1)).toISOString().split('T')[0],
        start_time: new Date(initialDate.setHours(initialDate.getHours() + 1)).toISOString().split('T')[1].slice(0, 5),
        end_time: new Date(initialDate.setHours(initialDate.getHours() + 2)).toISOString().split('T')[1].slice(0, 5),
        venue: '',
        status: 'active',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('schedule.store'), {
            onFinish: () => {
                reset('topic', 'attendance_link', 'unit_id', 'cohort_id', 'day', 'start_time', 'end_time', 'venue', 'status');
                onClose();
            },
        });
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-lg mx-4">
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-900">Schedule New Class</h2>
                    <button
                        onClick={onClose}
                        className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={submit} className="p-6 space-y-4">

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="topic">
                            Topic
                        </label>
                        <input
                            type="text"
                            required
                            placeholder="Enter Topic"
                            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            value={data.topic}
                            onChange={e => setData(prev => ({ ...prev, topic: e.target.value }))}
                        />
                    </div>
                    <SearchableSelect
                        label="Unit"
                        placeholder="Select a unit"
                        options={units.map(unit => ({
                            id: unit.id,
                            label: unit.name,
                            sublabel: unit.code,
                        }))}
                        value={data.unit_id}
                        onChange={(value) => setData(prev => ({ ...prev, unit_id: value }))}
                        required
                    />

                    <SearchableSelect
                        label="Cohort"
                        placeholder="Select a cohort"
                        options={cohorts.map(cohort => ({
                            id: cohort.id,
                            label: cohort.name,
                            sublabel: cohort.code,
                        }))}
                        value={data.cohort_id}
                        onChange={(value) => setData(prev => ({ ...prev, cohort_id: value }))}
                        required
                    />

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="day">
                            Date
                        </label>
                        <input
                            type="date"
                            required
                            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            value={data.day}
                            onChange={e => setData(prev => ({ ...prev, day: e.target.value }))}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="start_time">
                                Start Time
                            </label>
                            <input
                                type="time"
                                required
                                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                value={data.start_time}
                                onChange={e => setData(prev => ({ ...prev, start_time: e.target.value }))}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="end_time">
                                End Time
                            </label>
                            <input
                                type="time"
                                required
                                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                value={data.end_time}
                                onChange={e => setData(prev => ({ ...prev, end_time: e.target.value }))}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="venue">
                            Venue
                        </label>
                        <input
                            type="text"
                            required
                            placeholder="Enter venue"
                            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            value={data.venue}
                            onChange={e => setData(prev => ({ ...prev, venue: e.target.value }))}
                        />
                    </div>

                    <div className="flex justify-end gap-3 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Schedule Class
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
