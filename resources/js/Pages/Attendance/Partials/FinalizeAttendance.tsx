import React, { useState } from 'react';
import { X, AlertCircle } from 'lucide-react';
import { Student, Attendance } from '@/types';

interface FinalizeAttendanceProps {
    students: Student[];
    attendance: Attendance[];
    onClose: () => void;
    onFinalize: (excusedStudents: string[]) => void;
}

export default function FinalizeAttendance({
    students,
    attendance,
    onClose,
    onFinalize,
}: FinalizeAttendanceProps) {
    const [excusedStudents, setExcusedStudents] = useState<string[]>([]);

    const unmarkedStudents = students.filter(
        student => !attendance.some(a => a.cohort_student_id === student.id)
    );

    const handleExcuseToggle = (studentId: string) => {
        setExcusedStudents(prev =>
            prev.includes(studentId)
                ? prev.filter(id => id !== studentId)
                : [...prev, studentId]
        );
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-lg mx-4">
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-900">Finalize Attendance</h2>
                    <button
                        onClick={onClose}
                        className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6">
                    <div className="flex items-center gap-2 p-4 bg-amber-50 text-amber-800 rounded-lg mb-4">
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                        <p className="text-sm">
                            {unmarkedStudents.length} students haven't been marked. Select students with valid excuses before marking the rest as absent.
                        </p>
                    </div>

                    <div className="max-h-96 overflow-y-auto">
                        {unmarkedStudents.map(student => (
                            <div
                                key={student.id}
                                className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
                            >
                                <div>
                                    <h3 className="font-medium text-gray-900">{student.first_name} {student.last_name}</h3>
                                    <p className="text-sm text-gray-600">{student.registration_number}</p>
                                </div>
                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={excusedStudents.includes(student.id.toString())}
                                        onChange={() => handleExcuseToggle(student.id.toString())}
                                        className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                                    />
                                    <span className="text-sm text-gray-600">Excused</span>
                                </label>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-end gap-3 mt-6">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => onFinalize(excusedStudents)}
                            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Finalize Attendance
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
