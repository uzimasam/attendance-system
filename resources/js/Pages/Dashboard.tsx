import React from 'react';
import { Clock, MapPin, Calendar, Users, BookOpen, BarChart3 } from 'lucide-react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Schedule } from '@/types';
import { Head, Link } from '@inertiajs/react';

interface AuthProps {
    readonly auth: {
        readonly user: {
            readonly name: string;
        };
    };
    readonly newStudentCount: number;
    readonly studentCount: number;
    readonly todayScheduleCount: number;
    readonly unitCount: number;
    readonly upcomingSchedules: Schedule[];
    readonly doneSchedules: Schedule[];
    readonly missedSchedules: Schedule[];
    readonly yesterdayScheduleCount: number;
}

interface Unit {
    readonly id: number;
    readonly name: string;
    readonly code: string;
    readonly slug: string;
    readonly schoolId: number;
    readonly status: string;
}

function App({
    yesterdayScheduleCount,
    upcomingSchedules,
    doneSchedules,
    missedSchedules,
    unitCount,
    todayScheduleCount,
    studentCount,
    newStudentCount,
    auth
}: AuthProps) {
    // get the difference between today's and yesterday's schedule count
    const scheduleTrend = todayScheduleCount - yesterdayScheduleCount;
    let scheduleTrendText;
    let scheduleTrendColor;
    if (scheduleTrend === 0) {
        scheduleTrendText = "No change";
        scheduleTrendColor = "text-gray-600";
    } else if (scheduleTrend < 0) {
        scheduleTrendText = `${scheduleTrend} from yesterday`;
        scheduleTrendColor = "text-red-600";
    } else {
        scheduleTrendText = `+${scheduleTrend} from yesterday`;
        scheduleTrendColor = "text-green-600";
    }
    let studentTrendText;
    let studentTrendColor;
    // get the difference between newStudentCount and studentCount
    if (newStudentCount === 0) {
        studentTrendText = "No new students";
        studentTrendColor = "text-gray-600";
    } else {
        studentTrendText = `+${newStudentCount} new students`;
        studentTrendColor = "text-green-600";
    }
    return (
        <>
            <Head title="Dashboard" />
            <AuthenticatedLayout fullName={auth.user.name}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                    <DashboardCard
                        title="Today's Classes"
                        value={todayScheduleCount.toString()}
                        icon={<Calendar className="w-6 h-6 text-blue-600" />}
                        trend={scheduleTrendText}
                        trendColor={scheduleTrendColor}
                    />
                    <DashboardCard
                        title="Total Students"
                        value={studentCount.toString()}
                        icon={<Users className="w-6 h-6 text-green-600" />}
                        trend={studentTrendText}
                        trendColor={studentTrendColor}
                    />
                    <DashboardCard
                        title="Active Units"
                        value={unitCount.toString()}
                        icon={<BookOpen className="w-6 h-6 text-purple-600" />}
                        trend="2 completing soon"
                        trendColor='text-gray-600'
                    />
                    <DashboardCard
                        title="Avg. Attendance"
                        value="87%"
                        icon={<BarChart3 className="w-6 h-6 text-orange-600" />}
                        trend="+2.5% this week"
                        trendColor='text-gray-600'
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <UpcomingClasses upcomingSchedules={upcomingSchedules} />
                    <RecentAttendance doneSchedules={doneSchedules} />
                    <MissedAttendance missedSchedules={missedSchedules} />
                </div>
            </AuthenticatedLayout>
        </>
    );
}

interface DashboardCardProps {
    title: string;
    value: string;
    icon: React.ReactNode;
    trend: string;
    trendColor?: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, value, icon, trend, trendColor }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-start">
            <div>
                <p className="text-sm font-medium text-gray-600">{title}</p>
                <h3 className="text-2xl font-semibold text-gray-900 mt-2">{value}</h3>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
                {icon}
            </div>
        </div>
        <p className={`text-sm ${trendColor}`}>{trend}</p>
    </div>
);

const UpcomingClasses = ({ upcomingSchedules }: { upcomingSchedules: Schedule[] }) => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Classes</h2>
            <div className="space-y-4">
                {upcomingSchedules.length === 0 ? (
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <h3 className="font-medium text-gray-900 mb-2">No upcoming classes</h3>
                        <Link
                            href={route('schedule')}
                            className="mt-2 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                        >
                            View Schedule
                        </Link>
                    </div>
                ) : (
                    upcomingSchedules.map(schedule => (
                        <div
                            key={schedule.id}
                            className="p-4 rounded-lg border border-gray-100 hover:border-blue-100 transition-colors"
                        >
                            <div className="flex items-start justify-between mb-2">
                                <h3 className="font-medium text-gray-900">{schedule.unit?.name || 'No Unit'}</h3>
                                <span className="text-sm text-blue-600 font-medium">{schedule.unit?.code || 'N/A'}</span>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <Clock className="w-4 h-4" />
                                    <span>{schedule.day} {schedule.start_time} - {schedule.end_time}</span>
                                </div>

                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <MapPin className="w-4 h-4" />
                                    <span>{schedule.venue}</span>
                                </div>

                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <Users className="w-4 h-4" />
                                    <span>{schedule.cohort?.name || 'No Cohort'}</span>
                                </div>
                            </div>

                            <div className="flex flex-col items-center">
                                <Link
                                    href={route('attendance.portal', schedule.attendance_link)}
                                    className="mt-4 w-full px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                                >
                                    Start Attendance
                                </Link>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

const RecentAttendance = ({ doneSchedules }: { doneSchedules: Schedule[] }) => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Classes</h2>
            <div className="space-y-4">
                {doneSchedules.length === 0 ? (
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <h3 className="font-medium text-gray-900 mb-2">No Recent classes</h3>
                        <Link
                            href={route('schedule')}
                            className="mt-2 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                        >
                            View Schedule
                        </Link>
                    </div>
                ) : (
                    doneSchedules.map(schedule => (
                        <div
                            key={schedule.id}
                            className="p-4 rounded-lg border border-gray-100 hover:border-blue-100 transition-colors"
                        >
                            <div className="flex items-start justify-between mb-2">
                                <h3 className="font-medium text-gray-900">{schedule.unit?.name || 'No Unit'}</h3>
                                <span className="text-sm text-blue-600 font-medium">{schedule.unit?.code || 'N/A'}</span>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <Clock className="w-4 h-4" />
                                    <span>{schedule.day} {schedule.start_time} - {schedule.end_time}</span>
                                </div>

                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <MapPin className="w-4 h-4" />
                                    <span>{schedule.venue}</span>
                                </div>

                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <Users className="w-4 h-4" />
                                    <span>{schedule.cohort?.name || 'No Cohort'}</span>
                                </div>
                            </div>

                            <div className="flex flex-col items-center">
                                <Link
                                    href={route('attendance.portal', schedule.attendance_link)}
                                    className="mt-4 w-full px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                                >
                                    View Report
                                </Link>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

const MissedAttendance = ({ missedSchedules }: { missedSchedules: Schedule[] }) => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Missed Classes</h2>
            <div className="space-y-4">
                {missedSchedules.length === 0 ? (
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <h3 className="font-medium text-gray-900 mb-2">No Missed classes</h3>
                        <Link
                            href={route('schedule')}
                            className="mt-2 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                        >
                            View Schedule
                        </Link>
                    </div>
                ) : (
                    missedSchedules.map(schedule => (
                        <div
                            key={schedule.id}
                            className="p-4 rounded-lg border border-gray-100 hover:border-blue-100 transition-colors"
                        >
                            <div className="flex items-start justify-between mb-2">
                                <h3 className="font-medium text-gray-900">{schedule.unit?.name || 'No Unit'}</h3>
                                <span className="text-sm text-blue-600 font-medium">{schedule.unit?.code || 'N/A'}</span>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <Clock className="w-4 h-4" />
                                    <span>{schedule.day} {schedule.start_time} - {schedule.end_time}</span>
                                </div>

                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <MapPin className="w-4 h-4" />
                                    <span>{schedule.venue}</span>
                                </div>

                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <Users className="w-4 h-4" />
                                    <span>{schedule.cohort?.name || 'No Cohort'}</span>
                                </div>
                            </div>

                            <div className="flex flex-col items-center">
                                <Link
                                    href={route('attendance.portal', schedule.attendance_link)}
                                    className="mt-4 w-full px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                                >
                                    Reschedule
                                </Link>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default App;
