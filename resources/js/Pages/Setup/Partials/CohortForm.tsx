import React, { useState } from 'react';
import { Users } from 'lucide-react';

interface CohortFormProps {
  readonly onSubmit: (data: any) => void;
  readonly programId: string;
  readonly units: ReadonlyArray<{
    id: string;
    name: string;
    code: string;
  }>;
}

export default function CohortForm({ onSubmit, programId, units }: CohortFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    year: new Date().getFullYear(),
    semester: 1,
    unitIds: [] as string[],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ ...formData, id: Math.random().toString(), programId });
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
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-50 rounded-lg">
          <Users className="w-6 h-6 text-blue-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">Create Cohort</h2>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">
          Cohort Name
        </label>
        <input
          type="text"
          required
          placeholder="e.g., September 2024 Intake"
          className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          value={formData.name}
          onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="year">
            Academic Year
          </label>
          <select
            required
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            value={formData.year}
            onChange={e => setFormData(prev => ({ ...prev, year: Number(e.target.value) }))}
          >
            {[0, 1, 2].map(offset => {
              const year = new Date().getFullYear() + offset;
              return (
                <option key={year} value={year}>
                  {year}
                </option>
              );
            })}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="semester">
            Semester
          </label>
          <select
            required
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            value={formData.semester}
            onChange={e => setFormData(prev => ({ ...prev, semester: Number(e.target.value) }))}
          >
            <option value={1}>Semester 1</option>
            <option value={2}>Semester 2</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="units">
          Assign Units
        </label>
        <div className="max-h-48 overflow-y-auto border border-gray-200 rounded-lg divide-y">
          {units.map(unit => (
            <div key={unit.id} className="flex items-center p-3 hover:bg-gray-50 cursor-pointer">
              <input
                type="checkbox"
                id={unit.id}
                checked={formData.unitIds.includes(unit.id)}
                onChange={() => handleUnitToggle(unit.id)}
                className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              />
              <label htmlFor={unit.id} className="ml-3">
                <p className="font-medium text-gray-900">{unit.name}</p>
                <p className="text-sm text-gray-600">{unit.code}</p>
              </label>
            </div>
          ))}
        </div>
      </div>
    </form>
  );
}
