import React, { useState } from 'react';
import { School } from 'lucide-react';

interface SchoolFormProps {
  readonly onSubmit: (data: any) => void;
}

export default function SchoolForm({ onSubmit }: SchoolFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    description: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ ...formData, id: Math.random().toString() });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-50 rounded-lg">
          <School className="w-6 h-6 text-blue-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">School Details</h2>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">
          School Name
        </label>
        <input
          type="text"
          required
          placeholder="e.g., School of Computing and Informatics"
          className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          value={formData.name}
          onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="code">
          School Code
        </label>
        <input
          type="text"
          required
          placeholder="e.g., SCI"
          className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          value={formData.code}
          onChange={e => setFormData(prev => ({ ...prev, code: e.target.value }))}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="description">
          Description
        </label>
        <textarea
          rows={3}
          placeholder="Brief description of the school..."
          className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          value={formData.description}
          onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
        />
      </div>
    </form>
  );
}
