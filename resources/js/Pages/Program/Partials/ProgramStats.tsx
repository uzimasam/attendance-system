import React from 'react';
import { BookOpen, Users, Clock, GraduationCap } from 'lucide-react';

interface ProgramStatsProps {
    program: {
        units: Array<{
            cohorts: Array<{
                studentCount: number;
                name: string;
            }>;
        }>;
    };
}

export default function ProgramStats({ program }: ProgramStatsProps) {
    const totalUnits = program.units.length;
    const totalStudents = program.units.reduce(
        (sum, unit) => sum + unit.cohorts.reduce((s, c) => s + c.studentCount, 0),
        0
    );
    const activeYears = new Set(program.units.flatMap(unit =>
        unit.cohorts.map(cohort => cohort.name.split(' ')[1])
    )).size;

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 rounded-lg">
                        <BookOpen className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-600">Total Units</p>
                        <p className="text-2xl font-semibold text-gray-900">{totalUnits}</p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-50 rounded-lg">
                        <Users className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-600">Total Students</p>
                        <p className="text-2xl font-semibold text-gray-900">{totalStudents}</p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-50 rounded-lg">
                        <Clock className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-600">Duration</p>
                        <p className="text-2xl font-semibold text-gray-900">4 Years</p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-amber-50 rounded-lg">
                        <GraduationCap className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-600">Active Years</p>
                        <p className="text-2xl font-semibold text-gray-900">{activeYears}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
