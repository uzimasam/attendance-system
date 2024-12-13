import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Users } from 'lucide-react';

interface CohortFormProps {
    readonly onSubmit: (data: any) => void;
    readonly cohortId: string;
    readonly cohorts: any[];
    readonly unit: string | null;
    readonly programId: string;
}

export default function CohortForm({ onSubmit, cohortId, cohorts, unit, programId }: CohortFormProps) {
    cohorts = cohorts.filter(cohort => cohort.program_id === Number(programId));
    const [formData, setFormData] = useState({
        id: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.id) {
            onSubmit({ id: formData.id });
        }
    };

    return (
        <>
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-50 rounded-lg">
                    <Users className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Select Cohort</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <p className="text-sm font-medium my-2 text-gray-600">To get started, please select the cohort you want to setup.<br /> If the cohort is not listed, click the "Add Cohort" button above to add a new cohort.</p>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="cohort">
                        Select Cohort
                    </label>
                    <select
                        required
                        className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        value={formData.id}
                        onChange={e => setFormData({ id: e.target.value })}
                    >
                        <option value="">Select Cohort</option>
                        {cohorts.map(cohort => (
                            <option key={cohort.id} value={cohort.id}>{cohort.name}</option>
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
