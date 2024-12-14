import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, QrCode, UserCheck, UserX, Search, AlertCircle, XCircle, CheckCircle2 } from 'lucide-react';
import { Student, Attendance, Schedule } from '@/types';
import StudentList from './StudentList';
import AttendanceStats from './AttendanceStats';
import ScannerInput from './ScannerInput';
import FinalizeAttendance from './FinalizeAttendance';

interface AttendancePageProps {
    readonly schedule: Schedule;
}

export default function AttendancePage({ schedule }: AttendancePageProps) {
    const [view, setView] = useState<'qr' | 'list'>('qr');
    const [searchQuery, setSearchQuery] = useState('');
    const [showFinalize, setShowFinalize] = useState(false);
    const [attendance, setAttendance] = useState<Attendance[]>([
        { id: 1, cohort_student_id: 1, unit_id: 1, attendance_status: 'present', attendance_date: new Date().toISOString() },
        { id: 2, cohort_student_id: 2, unit_id: 1, attendance_status: 'absent', attendance_date: new Date().toISOString() },
    ]);

    // Mock data - in a real app, this would come from an API
    const mockStudents: Student[] = [
        { id: 1, registration_number: 'CS/MG/1578/09/21', first_name: 'Samuel', last_name: 'Uzima', email: 'samueluzima@kabarak.ac.kez', phone: '0712345678', status: 'active' },
        { id: 2, registration_number: 'BSCSF/MG/2137/09/21', first_name: 'Felix', last_name: 'Masigwa', email: 'bob@jik.com', phone: '0712345678', status: 'active' },
        { id: 3, registration_number: 'CS/003/2024', first_name: 'Charlie', last_name: 'Brown', email: 'browm@jik.com', phone: '0712345678', status: 'active' },
    ];

    const handleMarkAttendance = (studentId: number, status: 'present' | 'absent' | 'excused') => {
        setAttendance(prev => {
            const existing = prev.find(a => a.cohort_student_id === studentId);
            if (existing) {
                return prev.map(a =>
                    a.cohort_student_id === studentId
                        ? { ...a, attendance_status: status, attendance_date: new Date().toISOString() }
                        : a
                );
            }
            return [...prev, {
                id: Math.random(),
                cohort_student_id: studentId,
                unit_id: 1,
                attendance_status: status,
                attendance_date: new Date().toISOString()
            }];
        });
    };

    const handleScanComplete = (regNo: string) => {
        const student = mockStudents.find(s => s.registration_number === regNo);
        if (student) {
            handleMarkAttendance(student.id, 'present');
        }
    };

    const handleFinalize = (excusedStudents: string[]) => {
        // Mark excused students
        excusedStudents.forEach(studentId => {
            handleMarkAttendance(Number(studentId), 'excused');
        });

        // Mark remaining unmarked students as absent
        mockStudents.forEach(student => {
            const hasAttendance = attendance.some(a => a.cohort_student_id === student.id);
            if (!hasAttendance) {
                handleMarkAttendance(student.id, 'absent');
            }
        });

        setShowFinalize(false);
    };

    // format date custom function. It will accept schedule.day, schedule.start_time, schedule.end_time end return time in format "Thursday, 12th August 2021, 8:00 AM - 10:00 AM"
    const formatDate = (date: string, startTime: string, endTime: string) => {
        const day = new Date(date).toLocaleDateString('en-US', { weekday: 'long' });
        const month = new Date(date).toLocaleDateString('en-US', { month: 'long' });
        const dayNum = new Date(date).toLocaleDateString('en-US', { day: 'numeric' });
        const year = new Date(date).toLocaleDateString('en-US', { year: 'numeric' });
        const start = new Date(`${date} ${startTime}`).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
        const end = new Date(`${date} ${endTime}`).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
        return `${day}, ${dayNum} ${month} ${year}, ${start} - ${end}`;
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => window.history.back()}
                        className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">{ schedule.unit.name }</h1>
                        <p className="text-sm text-gray-600">{ formatDate(schedule.day, schedule.start_time, schedule.end_time) } • { schedule.venue }</p>
                    </div>
                </div>
                <button
                    onClick={() => setShowFinalize(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Finalize Attendance
                </button>
            </div>

            <AttendanceStats
                total={mockStudents.length}
                present={attendance.filter(a => a.attendance_status === 'present').length}
                absent={attendance.filter(a => a.attendance_status === 'absent').length}
                excused={attendance.filter(a => a.attendance_status === 'excused').length}
            />

            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="border-b border-gray-100">
                    <div className="flex gap-4 p-4">
                        <button
                            onClick={() => setView('list')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${view === 'list'
                                    ? 'bg-blue-600 text-white'
                                    : 'text-gray-600 hover:bg-gray-100'
                                }`}
                        >
                            <UserCheck className="w-5 h-5" />
                            Student List
                        </button>
                    </div>
                </div>

                <ScannerInput onScanComplete={handleScanComplete} />

                {view === 'list' && (
                    <div className="p-4">
                        <div className="relative mb-4">
                            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                                type="text"
                                placeholder="Search students..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <StudentList
                            students={mockStudents}
                            attendance={attendance}
                            searchQuery={searchQuery}
                            onMarkAttendance={handleMarkAttendance}
                        />
                    </div>
                )}
            </div>

            {showFinalize && (
                <FinalizeAttendance
                    students={mockStudents}
                    attendance={attendance}
                    onClose={() => setShowFinalize(false)}
                    onFinalize={handleFinalize}
                />
            )}
        </div>
    );
}
