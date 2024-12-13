import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, BookOpen, Plus } from 'lucide-react';
import AddProgram from './AddProgram';

interface ProgramFormProps {
    readonly onSubmit: (programData: { id: string }) => void;
    readonly programs: any[];
    readonly schools: any[];
    readonly schoolId: string;
}

export default function ProgramForm({ onSubmit, programs, schools, schoolId }: Readonly<ProgramFormProps>) {
    programs = programs.filter(program => program.school_id === Number(schoolId));
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [formData, setFormData] = useState({
        id: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.id) {
            onSubmit({ id: formData.id });
        }
    };

    const handleAddProgram = (programData: any) => {
        setFormData({ id: programData.id });
        setIsFormOpen(false);
    }

    return (
        <>
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-blue-50 rounded-lg">
                        <BookOpen className="w-6 h-6 text-blue-600" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900">Program Details</h2>
                </div>
                <button
                    onClick={() => setIsFormOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    Add Program
                </button>
            </div>

            {isFormOpen && (
                <AddProgram
                    onClose={() => setIsFormOpen(false)}
                    onSubmit={handleAddProgram}
                    schools={schools}
                    schoolId={schoolId}
                />
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <p className="text-sm font-medium my-2 text-gray-600">To get started, please select the program you want to setup.<br /> If the program is not listed, click the "Add Program" button above to add a new program.</p>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="program">
                        Select Program
                    </label>
                    <select
                        required
                        className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        value={formData.id}
                        onChange={e => setFormData({ id: e.target.value })}
                    >
                        <option value="">Select Program</option>
                        {programs.map(program => (
                            <option key={program.id} value={program.id}>
                                {program.name} - {program.code}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-6">
                    <button
                        className={`flex items-center gap-2 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors`}
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back
                    </button>

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
