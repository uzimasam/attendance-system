import React from 'react';
import { Users, ChevronRight } from 'lucide-react';

interface CohortListProps {
    cohorts: Array<{
        id: string;
        name: string;
        studentCount: number;
        attendanceRate: number;
    }>;
}

export default function CohortList({ cohorts }: CohortListProps) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900">Cohorts</h2>
            </div>
            <div className="divide-y divide-gray-100">
                {cohorts.map(cohort => (
                    <div
                        key={cohort.id}
                        className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                        <div className="flex items-center gap-4">
                            <div className="p-2 bg-blue-50 rounded-lg">
                                <Users className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                                <h3 className="font-medium text-gray-900">{cohort.name}</h3>
                                <p className="text-sm text-gray-600">{cohort.studentCount} students</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="text-right">
                                <p className="text-sm font-medium text-gray-600">Attendance Rate</p>
                                <p className="text-lg font-semibold text-gray-900">{cohort.attendanceRate}%</p>
                            </div>
                            <ChevronRight className="w-5 h-5 text-gray-400" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
