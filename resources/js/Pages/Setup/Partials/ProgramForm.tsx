import React, { useState } from 'react';
import { BookOpen } from 'lucide-react';

interface ProgramFormProps {
    readonly onSubmit: (data: any) => void;
    readonly schoolId: string;
}

export default function ProgramForm({ onSubmit, schoolId }: ProgramFormProps) {
    const [formData, setFormData] = useState({
        name: '',
        code: '',
        description: '',
        duration: 4,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ ...formData, id: Math.random().toString(), schoolId });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-50 rounded-lg">
                    <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Program Details</h2>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">
                    Program Name
                </label>
                <input
                    type="text"
                    required
                    placeholder="e.g., Bachelor of Science in Computer Science"
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    value={formData.name}
                    onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="code">
                    Program Code
                </label>
                <input
                    type="text"
                    required
                    placeholder="e.g., BSC-CS"
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    value={formData.code}
                    onChange={e => setFormData(prev => ({ ...prev, code: e.target.value }))}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="duration">
                    Duration (Years)
                </label>
                <select
                    required
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    value={formData.duration}
                    onChange={e => setFormData(prev => ({ ...prev, duration: Number(e.target.value) }))}
                >
                    {[2, 3, 4, 5].map(years => (
                        <option key={years} value={years}>
                            {years} Years
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="description">
                    Description
                </label>
                <textarea
                    rows={3}
                    placeholder="Brief description of the program..."
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    value={formData.description}
                    onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
                />
            </div>
        </form>
    );
}
