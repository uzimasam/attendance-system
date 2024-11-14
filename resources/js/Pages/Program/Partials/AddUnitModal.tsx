import React, { useState } from 'react';
import { X } from 'lucide-react';

interface AddUnitModalProps {
    onClose: () => void;
    onSubmit: (unit: any) => void;
}

export default function AddUnitModal({ onClose, onSubmit }: AddUnitModalProps) {
    const [formData, setFormData] = useState({
        code: '',
        name: '',
        credits: 4,
        semester: 1,
        year: 1,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-lg mx-4">
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-900">Add New Unit</h2>
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
                            Unit Code
                        </label>
                        <input
                            type="text"
                            required
                            placeholder="e.g., CSC 101"
                            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            value={formData.code}
                            onChange={e => setFormData(prev => ({ ...prev, code: e.target.value }))}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Unit Name
                        </label>
                        <input
                            type="text"
                            required
                            placeholder="e.g., Programming 101"
                            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            value={formData.name}
                            onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Credits
                        </label>
                        <input
                            type="number"
                            required
                            min="1"
                            max="6"
                            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            value={formData.credits}
                            onChange={e => setFormData(prev => ({ ...prev, credits: Number(e.target.value) }))}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Year
                            </label>
                            <select
                                required
                                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                value={formData.year}
                                onChange={e => setFormData(prev => ({ ...prev, year: Number(e.target.value) }))}
                            >
                                {[1, 2, 3, 4].map(year => (
                                    <option key={year} value={year}>Year {year}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Semester
                            </label>
                            <select
                                required
                                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                value={formData.semester}
                                onChange={e => setFormData(prev => ({ ...prev, semester: Number(e.target.value) }))}
                            >
                                {[1, 2].map(semester => (
                                    <option key={semester} value={semester}>Semester {semester}</option>
                                ))}
                            </select>
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
                            Add Unit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
