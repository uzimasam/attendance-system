import React, { FormEventHandler, useState } from 'react';
import { X } from 'lucide-react';
import { School } from '@/types';
import { useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';

interface AddSchoolProps {
    readonly onClose: () => void;
    readonly onSubmit: (schedule: Omit<School, 'id'>) => void;
}

export default function AddSchool({ onClose, onSubmit }: AddSchoolProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        code: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('school.store'), {
            // clear form fields after submission and close the modal
            onFinish: () => {
                reset('name', 'code');
                onClose();
            },
        });
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-lg mx-4">
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-900">Add New School</h2>
                    <button
                        onClick={onClose}
                        className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={submit} className="p-6 space-y-4">
                    <div>
                        <InputLabel htmlFor="name">School Name</InputLabel>
                        <TextInput
                            id="name"
                            type="text"
                            name="name"
                            placeholder="e.g., School of Science, Engineering and Technology"
                            value={data.name}
                            className="mt-1 block w-full text-dark"
                            onChange={e => setData(prev => ({ ...prev, name: e.target.value }))}
                        />

                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div className="mb-4">
                        <InputLabel htmlFor="code">School Code</InputLabel>
                        <TextInput
                            id="code"
                            type="text"
                            name="code"
                            placeholder="e.g., SSET"
                            value={data.code}
                            className="mt-1 block w-full text-dark"
                            onChange={e => setData(prev => ({ ...prev, code: e.target.value }))}
                        />

                        <InputError message={errors.code} className="mt-2" />
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
                            Add School
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
