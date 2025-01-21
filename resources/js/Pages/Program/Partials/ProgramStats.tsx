import React from 'react';
import { BookOpen, Users, Clock, BarChart3 } from 'lucide-react';
import { Schedule, Student } from '@/types';

interface ProgramStatsProps {
    readonly averageAttendance: number;
    readonly program: {
        readonly id: number;
        readonly name: string;
        readonly code: string;
        readonly slug: string;
        readonly duration: number;
        readonly semesters: number;
        readonly status: string;
        readonly school: {
            readonly id: number;
            readonly name: string;
            readonly code: string;
            readonly slug: string;
            readonly status: string;
        };
    };
    readonly students: Student[];
    readonly schedules: Schedule[];
}

export default function ProgramStats({ program, averageAttendance, students, schedules }: ProgramStatsProps) {
    const totalSchedules = schedules.length;
    const totalStudents = students.length;

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 rounded-lg">
                        <BookOpen className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-600">Classes Scheduled</p>
                        <p className="text-2xl font-semibold text-gray-900">{totalSchedules}</p>
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
                        <p className="text-2xl font-semibold text-gray-900">{program.duration} Years</p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-amber-50 rounded-lg">
                        <BarChart3 className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-600">Avg. Attendance</p>
                        <p className="text-2xl font-semibold text-gray-900">{averageAttendance}%</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
