import React, { useState } from 'react';
import { X } from 'lucide-react';

interface AddCohortModalProps {
    onClose: () => void;
    onSubmit: (cohort: any) => void;
    units: Array<{
        id: string;
        name: string;
        code: string;
    }>;
}

export default function AddCohortModal({ onClose, onSubmit, units }: AddCohortModalProps) {
    const [formData, setFormData] = useState({
        name: '',
        year: new Date().getFullYear(),
        unitIds: [] as string[],
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const handleUnitToggle = (unitId: string) => {
        setFormData(prev => ({
            ...prev,
            unitIds: prev.unitIds.includes(unitId)
                ? prev.unitIds.filter(id => id !== unitId)
                : [...prev.unitIds, unitId],
        }));
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-lg mx-4">
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-900">Add New Cohort</h2>
                    <button
                        onClick={onClose}
                        className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Cohort Name
                        </label>
                        <input
                            type="text"
                            required
                            placeholder="e.g., Year 1 2024"
                            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            value={formData.name}
                            onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Academic Year
                        </label>
                        <input
                            type="number"
                            required
                            min="2000"
                            max="2100"
                            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            value={formData.year}
                            onChange={e => setFormData(prev => ({ ...prev, year: Number(e.target.value) }))}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Assign Units
                        </label>
                        <div className="max-h-48 overflow-y-auto border border-gray-200 rounded-lg divide-y">
                            {units.map(unit => (
                                <label
                                    key={unit.id}
                                    className="flex items-center p-3 hover:bg-gray-50 cursor-pointer"
                                >
                                    <input
                                        type="checkbox"
                                        checked={formData.unitIds.includes(unit.id)}
                                        onChange={() => handleUnitToggle(unit.id)}
                                        className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                                    />
                                    <div className="ml-3">
                                        <p className="font-medium text-gray-900">{unit.name}</p>
                                        <p className="text-sm text-gray-600">{unit.code}</p>
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 mt-6">
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
                            Add Cohort
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
