import React, { FormEventHandler } from 'react';
import { X } from 'lucide-react';
import { Schedule } from '@/types';
import { useForm } from '@inertiajs/react';

interface RescheduleFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (schedule: Omit<Schedule, 'id'>) => void;
    schedule: Schedule;
}

export default function RescheduleForm({ isOpen, onClose, onSubmit, schedule }: Readonly<RescheduleFormProps>) {
    const { data, setData, post, reset } = useForm({
        schedule_id: schedule.id,
        day: schedule.day,
        start_time: schedule.start_time,
        end_time: schedule.end_time,
        venue: schedule.venue,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('schedule.reschedule'), {
            onFinish: () => {
                reset('schedule_id', 'day', 'start_time', 'end_time', 'venue');
                onClose();
            },
        });
    };
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-lg mx-4">
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-900">Reschedule {schedule.unit.name} Class</h2>
                    <button
                        onClick={onClose}
                        className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={submit} className="p-6">

                    <input type="hidden" name="schedule_id" value={data.schedule_id} />

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
                            Reschedule Class
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
