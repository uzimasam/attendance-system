import React, { useState } from 'react';
import { Plus, School } from 'lucide-react';
import AddSchool from './AddSchool';

interface SchoolFormProps {
    readonly onSubmit: (data: any) => void;
}

export default function SchoolForm({ onSubmit }: SchoolFormProps) {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        code: '',
        description: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ ...formData, id: Math.random().toString() });
    };

    const handleAddSchool = (schoolData: any) => {
        setFormData(schoolData);
        setIsFormOpen(false);
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="space-y-6">
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

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="school">
                        Select School
                    </label>
                    <select
                        required
                        className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        value={formData.name}
                        onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    >
                        <option value="">Select School</option>
                        <option value="1">School of Computing and Informatics</option>
                        <option value="2">School of Business and Economics</option>
                        <option value="3">School of Engineering</option>
                        <option value="4">School of Education</option>
                    </select>
                </div>
            </form>
            {isFormOpen && (
                <AddSchool
                    onClose={() => setIsFormOpen(false)}
                    onSubmit={handleAddSchool}
                />
            )}
        </>
    );
}
