import React, { useState } from 'react';
import { Users } from 'lucide-react';

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
        name: '',
        year: new Date().getFullYear(),
        semester: 1,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ ...formData, id: Math.random().toString(), cohortId });
    };

    const handleUnitToggle = (unitId: string) => {
        setFormData(prev => ({
            ...prev,
            unitId,
        }));
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
                        value={formData.name}
                        onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    >
                        <option value="">Select Cohort</option>
                        {cohorts.map(cohort => (
                            <option key={cohort.id} value={cohort.name}>{cohort.name}</option>
                        ))}
                    </select>
                </div>
            </form>
        </>
    );
}
