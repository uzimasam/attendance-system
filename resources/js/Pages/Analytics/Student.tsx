import React from 'react';
import { CalendarCheck2, ChartLine, Folders, Clock10 } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, ReferenceLine, YAxis } from 'recharts';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '@/Components/ui/chart';
import { DataTable } from './FlaggedStudents/DataTable';
import { columns } from './StudentAttendance/Columns';

interface AnalyticsProps {
    readonly auth: {
        readonly user: {
            readonly name: string;
        };
    };
    readonly todayScheduleCount: number;
    readonly unitCount: number;
    readonly yesterdayScheduleCount: number;
    readonly averageAttendance: number;
    readonly activeScheduleCount: number;
    readonly rateOfChange: number;
    readonly student: any;
    readonly flaggedUnitCount: number;
    readonly unitComparisonChartData: any;
    readonly unitComparisonChartConfig: any;
    readonly scheduleData: any;
}

function App({
    averageAttendance,
    yesterdayScheduleCount,
    unitCount,
    todayScheduleCount,
    rateOfChange,
    student,
    activeScheduleCount,
    unitComparisonChartData,
    unitComparisonChartConfig,
    flaggedUnitCount,
    scheduleData,
    auth
}: AnalyticsProps) {
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
    let unitTrendText;
    let unitTrendColor;
    if (flaggedUnitCount === 0) {
        unitTrendText = "You're doing great!";
        unitTrendColor = "text-green-600";
    } else {
        unitTrendText = `${flaggedUnitCount} units need attention 🚩`;
        unitTrendColor = "text-red-600";
    }

    const chartData = unitComparisonChartData;

    const chartConfig = unitComparisonChartConfig satisfies ChartConfig;
    return (
        <>
            <Head title={`${student.name} Analytics`} />
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
                        title="Total Units"
                        value={unitCount.toString()}
                        icon={<Folders className="w-6 h-6 text-amber-600" />}
                        trend={unitTrendText}
                        trendColor={unitTrendColor}
                    />
                    <DashboardCard
                        title="Active Schedules"
                        value={activeScheduleCount.toString()}
                        icon={<Clock10 className="w-6 h-6 text-cyan-600" />}
                        trend={scheduleTrendText}
                        trendColor={scheduleTrendColor}
                    />
                    <DashboardCard
                        title="Avg. Attendance"
                        value={`${averageAttendance}%`}
                        icon={<ChartLine className="w-6 h-6 text-violet-600" />}
                        trend={`${rateOfChange}% from last week`}
                        trendColor='text-gray-600'
                    />
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Unit By Unit Attendance Comparison</h2>
                    <ChartContainer config={chartConfig} className='min-h[200-px] w-full'>
                        <BarChart accessibilityLayer data={chartData}>
                            <CartesianGrid vertical={false} />
                            <YAxis tickLine={false} axisLine={false} domain={[0, 100]} ticks={[0, 20, 40, 60, 80, 100]} />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <ChartLegend content={<ChartLegendContent />} />
                            {Object.keys(chartConfig).map((code) => (
                                <Bar key={code} dataKey={code} fill={chartConfig[code].color} radius={4} />
                            ))}
                            <ReferenceLine y={80} stroke="green" strokeDasharray="3 3" label={{ value: "80%", position: "insideTopRight", fill: "green", fontSize: 12 }} />
                            <ReferenceLine y={averageAttendance} stroke="grey" strokeDasharray="3 3" label={{ value: `${averageAttendance}%`, position: "insideTopRight", fill: "grey", fontSize: 12 }} />
                            <ReferenceLine y={60} stroke="red" label={{ value: "60%", position: "insideTopRight", fill: "red", fontSize: 12 }} />
                        </BarChart>
                    </ChartContainer>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Schedule Timeline</h2>
                    <DataTable columns={columns} data={scheduleData} />
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
