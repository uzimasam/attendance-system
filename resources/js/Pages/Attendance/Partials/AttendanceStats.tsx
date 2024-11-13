import React from 'react';
import { UserCheck, UserX, Users, AlertCircle } from 'lucide-react';

interface AttendanceStatsProps {
  total: number;
  present: number;
  absent: number;
  excused: number;
}

export default function AttendanceStats({ total, present, absent, excused }: AttendanceStatsProps) {
  const presentPercentage = Math.round((present / total) * 100) || 0;
  const absentPercentage = Math.round((absent / total) * 100) || 0;
  const excusedPercentage = Math.round((excused / total) * 100) || 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gray-100 rounded-lg">
            <Users className="w-5 h-5 text-gray-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Total Students</p>
            <p className="text-2xl font-semibold text-gray-900">{total}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-100 rounded-lg">
            <UserCheck className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Present</p>
            <div className="flex items-baseline gap-2">
              <p className="text-2xl font-semibold text-gray-900">{present}</p>
              <p className="text-sm text-green-600">{presentPercentage}%</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-amber-100 rounded-lg">
            <AlertCircle className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Excused</p>
            <div className="flex items-baseline gap-2">
              <p className="text-2xl font-semibold text-gray-900">{excused}</p>
              <p className="text-sm text-amber-600">{excusedPercentage}%</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-red-100 rounded-lg">
            <UserX className="w-5 h-5 text-red-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Absent</p>
            <div className="flex items-baseline gap-2">
              <p className="text-2xl font-semibold text-gray-900">{absent}</p>
              <p className="text-sm text-red-600">{absentPercentage}%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
