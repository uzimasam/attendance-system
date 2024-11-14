import React from 'react';
import { Student, Attendance } from '@/types';
import { CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

interface StudentListProps {
    students: Student[];
    attendance: Attendance[];
    searchQuery: string;
    onMarkAttendance: (studentId: number, status: 'present' | 'absent' | 'excused') => void;
}

export default function StudentList({
    students,
    attendance,
    searchQuery,
    onMarkAttendance,
}: StudentListProps) {
    const filteredStudents = students.filter(
        student =>
            student.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            student.registration_number.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getAttendanceStatus = (studentId: number) => {
        return attendance.find(a => a.cohort_student_id === Number(studentId))?.attendance_status;
    };

    return (
        <div className="divide-y divide-gray-100">
            {filteredStudents.map(student => {
                const status = getAttendanceStatus(student.id);

                return (
                    <div
                        key={student.id}
                        className="py-3 flex items-center justify-between"
                    >
                        <div>
                            <h3 className="font-medium text-gray-900">{student.first_name} {student.last_name}</h3>
                            <p className="text-sm text-gray-600">{student.registration_number}</p>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => onMarkAttendance(student.id, 'present')}
                                className={`p-2 rounded-lg transition-colors ${status === 'present'
                                        ? 'bg-green-100 text-green-600'
                                        : 'hover:bg-gray-100 text-gray-400'
                                    }`}
                            >
                                <CheckCircle2 className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => onMarkAttendance(student.id, 'excused')}
                                className={`p-2 rounded-lg transition-colors ${status === 'excused'
                                        ? 'bg-amber-100 text-amber-600'
                                        : 'hover:bg-gray-100 text-gray-400'
                                    }`}
                            >
                                <AlertCircle className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => onMarkAttendance(student.id, 'absent')}
                                className={`p-2 rounded-lg transition-colors ${status === 'absent'
                                        ? 'bg-red-100 text-red-600'
                                        : 'hover:bg-gray-100 text-gray-400'
                                    }`}
                            >
                                <XCircle className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
