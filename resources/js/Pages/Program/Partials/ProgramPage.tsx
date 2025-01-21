import React, { useState } from 'react';
import { ArrowLeft, Plus, Users, School } from 'lucide-react';
import ProgramStats from './ProgramStats';
import UnitList from './UnitList';
import AddUnitModal from './AddUnitModal';
import AddCohortModal from './AddCohortModal';

export default function ProgramPage({ program, averageAttendance, students, schedules }: any) {
    const [showAddUnit, setShowAddUnit] = useState(false);
    const [showAddCohort, setShowAddCohort] = useState(false);

    // Mock data - in a real app, this would come from an API
    const handleAddUnit = (unit: any) => {
        setShowAddUnit(false);
    };

    const handleAddCohort = (cohort: any) => {
        setShowAddCohort(false);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => window.history.back()}
                        className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div>
                        <div className="flex items-center gap-2">
                            <h1 className="text-2xl font-semibold text-gray-900">{program.name}</h1>
                            <span className="px-2 py-1 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg">
                                {program.code}
                            </span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                            <School className="w-4 h-4 text-gray-400" />
                            <p className="text-sm text-gray-600">{program.school.name}</p>
                        </div>
                    </div>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => setShowAddCohort(true)}
                        className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        <Users className="w-4 h-4" />
                        Add Cohort
                    </button>
                    <button
                        onClick={() => setShowAddUnit(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        Add Unit
                    </button>
                </div>
            </div>

            {/* Program Stats */}
            <ProgramStats program={program} averageAttendance={averageAttendance} students={students} schedules={schedules} />

            {/* Units List */}
            <UnitList units={program.units} />

            {/* Modals */}
            {showAddUnit && (
                <AddUnitModal onClose={() => setShowAddUnit(false)} onSubmit={handleAddUnit} />
            )}
            {showAddCohort && (
                <AddCohortModal
                    onClose={() => setShowAddCohort(false)}
                    onSubmit={handleAddCohort}
                    units={program.units}
                />
            )}
        </div>
    );
}
