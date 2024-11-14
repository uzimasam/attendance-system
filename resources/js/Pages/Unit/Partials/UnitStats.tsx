import React from 'react';
import { Users, Calendar, Clock, GraduationCap } from 'lucide-react';

interface UnitStatsProps {
    unit: {
        cohorts: Array<{
            studentCount: number;
            attendanceRate: number;
        }>;
        credits: number;
        schedules: Array<any>;
    };
}

export default function UnitStats({ unit }: UnitStatsProps) {
    const totalStudents = unit.cohorts.reduce((sum, cohort) => sum + cohort.studentCount, 0);
    const averageAttendance = Math.round(
        unit.cohorts.reduce((sum, cohort) => sum + cohort.attendanceRate, 0) / unit.cohorts.length
    );
    const totalClasses = unit.schedules.length;

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 rounded-lg">
                        <Users className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-600">Total Students</p>
                        <p className="text-2xl font-semibold text-gray-900">{totalStudents}</p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-50 rounded-lg">
                        <Calendar className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-600">Total Classes</p>
                        <p className="text-2xl font-semibold text-gray-900">{totalClasses}</p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-50 rounded-lg">
                        <Clock className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-600">Credit Hours</p>
                        <p className="text-2xl font-semibold text-gray-900">{unit.credits}</p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-amber-50 rounded-lg">
                        <GraduationCap className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-600">Avg. Attendance</p>
                        <div className="flex items-baseline gap-2">
                            <p className="text-2xl font-semibold text-gray-900">{averageAttendance}</p>
                            <span className="text-sm text-amber-600">%</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
