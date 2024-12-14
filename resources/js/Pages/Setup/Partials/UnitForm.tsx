import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, BookOpen, Plus } from 'lucide-react';
import AddUnit from './AddUnit';

interface UnitFormProps {
    readonly onSubmit: (unitData: { id: string }) => void;
    readonly units: any[];
    readonly schools: any[];
    readonly schoolId: string;
}

export default function UnitForm({ onSubmit, units, schools, schoolId }: Readonly<UnitFormProps>) {
    units = units.filter(unit => unit.school_id === Number(schoolId));
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

    const handleAddUnit = (unitData: any) => {
        setFormData(unitData);
        setIsFormOpen(false);
    }

    return (
        <>
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-blue-50 rounded-lg">
                        <BookOpen className="w-6 h-6 text-blue-600" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900">Unit Details</h2>
                </div>
                <button
                    onClick={() => setIsFormOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    Add Unit
                </button>
            </div>

            {isFormOpen && (
                <AddUnit
                    onClose={() => setIsFormOpen(false)}
                    onSubmit={handleAddUnit}
                    schools={schools}
                    schoolId={schoolId}
                />
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <p className="text-sm font-medium my-2 text-gray-600">To get started, please select the unit you want to setup.<br /> If the unit is not listed, click the "Add Unit" button above to add a new unit.</p>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="unit">
                        Select Unit
                    </label>
                    <select
                        required
                        className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        value={formData.id}
                        onChange={e => setFormData({ id: e.target.value })}
                    >
                        <option value="">Select Unit</option>
                        {units.map(unit => (
                            <option key={unit.id} value={unit.id}>{unit.name} - {unit.code}</option>
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
