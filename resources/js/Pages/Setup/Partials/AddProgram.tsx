import React, { FormEventHandler, useState } from 'react';
import { X } from 'lucide-react';
import { Program } from '@/types';
import { useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';

interface AddProgramProps {
    readonly onClose: () => void;
    readonly onSubmit: (schedule: Omit<Program, 'id'>) => void;
    readonly schools: any[];
}

export default function AddProgram({ onClose, onSubmit, schools }: AddProgramProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        code: '',
        duration: 4,
        semesters: 2,
        school_id: schools[0].id,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('program.store'), {
            // clear form fields after submission and close the modal
            onFinish: () => {
                reset('name', 'code', 'duration', 'semesters');
                onClose();
            },
        });
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-lg mx-4">
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-900">Add New Program</h2>
                    <button
                        onClick={onClose}
                        className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={submit} className="p-6 space-y-4">
                    <div>
                        <InputLabel htmlFor="name">Program Name</InputLabel>
                        <TextInput
                            id="name"
                            type="text"
                            name="name"
                            placeholder="e.g., Bachelor of Science in Computer Science"
                            value={data.name}
                            className="mt-1 block w-full text-dark"
                            onChange={e => setData(prev => ({ ...prev, name: e.target.value }))}
                        />

                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div className="mb-4">
                        <InputLabel htmlFor="code">Program Code</InputLabel>
                        <TextInput
                            id="code"
                            type="text"
                            name="code"
                            placeholder="e.g., CS"
                            value={data.code}
                            className="mt-1 block w-full text-dark"
                            onChange={e => setData(prev => ({ ...prev, code: e.target.value }))}
                        />

                        <InputError message={errors.code} className="mt-2" />
                    </div>

                    <div className='mb-4'>
                        <InputLabel htmlFor='duration'>Duration (Years)</InputLabel>
                        <select
                            required
                            className='w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
                            value={data.duration}
                            onChange={e => setData(prev => ({ ...prev, duration: Number(e.target.value) }))}
                        >
                            {[2, 3, 4, 5].map(years => (
                                <option key={years} value={years}>
                                    {years} Years
                                </option>
                            ))}
                        </select>

                        <InputError message={errors.duration} className="mt-2" />
                    </div>

                    <div className='mb-4'>
                        <InputLabel htmlFor='semesters'>Semesters (Per Year)</InputLabel>
                        <select
                            required
                            className='w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
                            value={data.semesters}
                            onChange={e => setData(prev => ({ ...prev, semesters: Number(e.target.value) }))}
                        >
                            {[1, 2, 3].map(semesters => (
                                <option key={semesters} value={semesters}>
                                    {semesters} Semesters
                                </option>
                            ))}
                        </select>
                        <InputError message={errors.semesters} className="mt-2" />
                    </div>

                    <div className='mb-4'>
                        <InputLabel htmlFor='school_id'>School</InputLabel>
                        <select
                            required
                            className='w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
                            value={data.school_id}
                            onChange={e => setData(prev => ({ ...prev, school_id: Number(e.target.value) }))}
                        >
                            {schools.map(school => (
                                <option key={school.id} value={school.id}>
                                    {school.name} - [{school.code}] {school.id}
                                </option>
                            ))}
                        </select>
                        <InputError message={errors.school_id} className="mt-2" />
                    </div>

                    <div className="flex justify-between gap-3 mt-6">
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
                            Add Program
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
