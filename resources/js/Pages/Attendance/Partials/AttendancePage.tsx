import React, { useState, useEffect } from 'react';
import { ArrowLeft, UserCheck, Search } from 'lucide-react';
import { Student, Attendance, Schedule } from '@/types';
import StudentList from './StudentList';
import AttendanceStats from './AttendanceStats';
import ScannerInput from './ScannerInput';
import FinalizeAttendance from './FinalizeAttendance';
import axios from 'axios';

interface AttendancePageProps {
    readonly schedule: Schedule;
}

export default function AttendancePage({ schedule }: AttendancePageProps) {
    const [view, setView] = useState<'qr' | 'list'>('list');
    const [searchQuery, setSearchQuery] = useState('');
    const [showFinalize, setShowFinalize] = useState(false);
    const [attendances, setAttendances] = useState<Attendance[]>(schedule.attendances);
    const [markedAttendance, setMarkedAttendance] = useState<Attendance[]>([]);
    const [students, setStudents] = useState<Student[]>([]);

    useEffect(() => {
        if (attendances.length > 0) {
            setStudents(attendances.map((attendance: Attendance) => attendance.student));
        }
    }, [attendances]);

    const handleMarkAttendance = (studentId: number, status: 'present' | 'absent' | 'excused') => {
        setMarkedAttendance(prev => {
            const existing = prev.find(a => a.student_id === studentId);
            if (existing) {
                return prev.map(a =>
                    a.student_id === studentId
                        ? { ...a, attendance_status: status }
                        : a
                );
            }
            return [...prev, {
                id: prev.length + 1, // or any unique id generation logic
                schedule_id: schedule.id,
                student_id: studentId,
                attendance_status: status,
                student: students.find(s => s.id === studentId) as Student
            }];
        });
    };

    const handleScanComplete = (regNo: string) => {
        const student = students.find(s => s.registration_number === regNo);
        if (student) {
            handleMarkAttendance(student.id, 'present');
        }
    };

    const handleFinalize = async (excusedStudents: string[]) => {
        // Mark excused students
        excusedStudents.forEach(studentId => {
            handleMarkAttendance(Number(studentId), 'excused');
        });

        // Mark remaining unmarked students as absent
        students.forEach(student => {
            const hasAttendance = markedAttendance.some(a => a.student_id === student.id);
            if (!hasAttendance) {
                handleMarkAttendance(student.id, 'absent');
            }
        });

        setShowFinalize(false);
    };

    const submitAttendance = async () => {
        // ensure all students have been marked
        if (students.length !== markedAttendance.length) {
            // refetch marked attendance
            alert('Please mark attendance for all students');
        }
        // submit attendance to the server via route('attendances.store')
        try {
            console.log('Submitting attendance:', markedAttendance); // Debugging line
            await axios.post(route('attendances.store'), { attendances: markedAttendance });
            alert('Attendance marked successfully');
        } catch (error) {
            console.error('Error submitting attendance:', error);
            alert('Failed to mark attendance');
        }
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
                        <h1 className="text-2xl font-semibold text-gray-900">{schedule.unit.name}</h1>
                        <p className="text-sm text-gray-600">{formatDate(schedule.day, schedule.start_time, schedule.end_time)} • {schedule.venue}</p>
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
                total={attendances.length}
                present={markedAttendance.filter(a => a.attendance_status === 'present').length}
                absent={markedAttendance.filter(a => a.attendance_status === 'absent').length}
                excused={markedAttendance.filter(a => a.attendance_status === 'excused').length}
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
                            students={students}
                            attendance={markedAttendance}
                            searchQuery={searchQuery}
                            onMarkAttendance={handleMarkAttendance}
                        />
                    </div>
                )}

            </div>

            {showFinalize && (
                <FinalizeAttendance
                    students={students}
                    attendance={attendances}
                    markedAttendance={markedAttendance}
                    onClose={() => setShowFinalize(false)}
                    onFinalize={handleFinalize}
                />
            )}
        </div>
    );
}
