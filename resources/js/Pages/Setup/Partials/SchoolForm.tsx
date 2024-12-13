import React, { useState } from 'react';
import { ArrowRight, Plus, School } from 'lucide-react';
import AddSchool from './AddSchool';

interface SchoolFormProps {
    onSubmit: (schoolData: { id: string }) => void;
    schools: Array<{ id: string; name: string }>;
}

export default function SchoolForm({ onSubmit, schools }: Readonly<SchoolFormProps>) {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [formData, setFormData] = useState({
        id: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.id) {
            onSubmit({ id: formData.id });
        }
    };

    const handleAddSchool = (schoolData: any) => {
        setFormData({ id: schoolData.id });
        setIsFormOpen(false);
    }

    return (
        <>
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-blue-50 rounded-lg">
                        <School className="w-6 h-6 text-blue-600" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900">School Details</h2>
                </div>
                <button
                    onClick={() => setIsFormOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    Add School
                </button>
            </div>

            {isFormOpen && (
                <AddSchool
                    onClose={() => setIsFormOpen(false)}
                    onSubmit={handleAddSchool}
                />
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <p className="text-sm font-medium my-2 text-gray-600">
                        To get started, please select the school you want to setup.<br />
                        If the school is not listed, click the "Add School" button above to add a new school.
                    </p>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="school">
                        Select School
                    </label>
                    <select
                        id="school"
                        required
                        className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        value={formData.id}
                        onChange={e => setFormData({ id: e.target.value })}
                    >
                        <option value="">Select School</option>
                        {schools.map(school => (
                            <option key={school.id} value={school.id}>
                                {school.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={!formData.id}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Next
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </form>
        </>
    );
}
