import React from 'react';
import { Users, BookOpen, CalendarCheck2, GraduationCap, ChartLine, Building2, Folders, Clock10 } from 'lucide-react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

interface AuthProps {
    readonly auth: {
        readonly user: {
            readonly name: string;
        };
    };
    readonly flaggedStudentCount: number;
    readonly studentCount: number;
    readonly todayScheduleCount: number;
    readonly unitCount: number;
    readonly schoolCount: number;
    readonly programCount: number;
    readonly yesterdayScheduleCount: number;
    readonly averageAttendance: number;
    readonly lecturerAverageAttendance: number;
    readonly lecturerCount: number;
    readonly activeScheduleCount: number;
    readonly rateOfChange: number;
}

function App({
    lecturerCount,
    lecturerAverageAttendance,
    averageAttendance,
    yesterdayScheduleCount,
    unitCount,
    todayScheduleCount,
    studentCount,
    schoolCount,
    programCount,
    flaggedStudentCount,
    activeScheduleCount,
    rateOfChange,
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
    if (flaggedStudentCount === 0) {
        studentTrendText = "No Flagged students";
        studentTrendColor = "text-gray-600";
    } else {
        studentTrendText = `${flaggedStudentCount} students Flagged 🚩`;
        studentTrendColor = "text-red-600";
    }
    let lecturerTrendText;
    let lecturerTrendColor;
    if (lecturerAverageAttendance < 75) {
        lecturerTrendText = `Average attendance is ${lecturerAverageAttendance}%`;
        lecturerTrendColor = "text-red-600";
    } else if (lecturerAverageAttendance >= 75 && lecturerAverageAttendance < 85) {
        lecturerTrendText = `Average attendance is ${lecturerAverageAttendance}%`;
        lecturerTrendColor = "text-yellow-600";
    } else {
        lecturerTrendText = `Average attendance is ${lecturerAverageAttendance}%`;
        lecturerTrendColor = "text-green-600";
    }
    return (
        <>
            <Head title="Analytics" />
            <AuthenticatedLayout fullName={auth.user.name}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                    <DashboardCard
                        title="Today's Classes"
                        value={todayScheduleCount.toString()}
                        icon={<CalendarCheck2 className="w-6 h-6 text-indigo-600" />}
                        trend={scheduleTrendText}
                        trendColor={scheduleTrendColor}
                    />
                    <DashboardCard
                        title="Total Lecturers"
                        value={lecturerCount.toString()}
                        icon={<GraduationCap className="w-6 h-6 text-emerald-600" />}
                        trend={lecturerTrendText}
                        trendColor={lecturerTrendColor}
                    />
                    <DashboardCard
                        title="Total Students"
                        value={studentCount.toString()}
                        icon={<Users className="w-6 h-6 text-blue-600" />}
                        trend={studentTrendText}
                        trendColor={studentTrendColor}
                    />
                    <DashboardCard
                        title="Avg. Attendance"
                        value={`${averageAttendance}%`}
                        icon={<ChartLine className="w-6 h-6 text-violet-600" />}
                        trend={`${rateOfChange}% from last week`}
                        trendColor='text-gray-600'
                    />
                    <DashboardCard
                        title="Total Schools"
                        value={schoolCount.toString()}
                        icon={<Building2 className="w-6 h-6 text-amber-600" />}
                        trend=''
                        trendColor={scheduleTrendColor}
                    />
                    <DashboardCard
                        title="Total Programs"
                        value={programCount.toString()}
                        icon={<Folders className="w-6 h-6 text-rose-600" />}
                        trend=''
                        trendColor='text-gray-600'
                    />
                    <DashboardCard
                        title="Total Units"
                        value={unitCount.toString()}
                        icon={<BookOpen className="w-6 h-6 text-teal-600" />}
                        trend=''
                        trendColor='text-gray-600'
                    />
                    <DashboardCard
                        title="Active Schedules"
                        value={`${activeScheduleCount}`}
                        icon={<Clock10 className="w-6 h-6 text-cyan-600" />}
                        trend=''
                        trendColor='text-gray-600'
                    />
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
export default App;
