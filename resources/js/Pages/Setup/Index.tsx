import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import SetupPage from './Partials/SetupPage';

interface AuthProps {
  readonly auth: {
    readonly user: {
      readonly name: string;
    };
  };
}

function App({
    auth
}: AuthProps) {
  return (
    <>
    <Head title="Schedule" />
    <AuthenticatedLayout fullName={auth.user.name}>
        <SetupPage />
    </AuthenticatedLayout>
    </>
  );
}

interface DashboardCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, value, icon, trend }) => (
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
    <p className="text-sm text-gray-600 mt-2">{trend}</p>
  </div>
);

const UpcomingClasses = () => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
    <h2 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Classes</h2>
    <div className="space-y-4">
      {[
        {
            id: 1,
          unit: "Programming 101",
          time: "10:00 AM - 12:00 PM",
          venue: "Lab 2B",
          cohort: "Year 1 2024"
        },
        {
            id: 2,
          unit: "Data Structures",
          time: "2:00 PM - 4:00 PM",
          venue: "Room 15",
          cohort: "Year 2 2023"
        }
      ].map((session, index) => (
        <div key={`${session.id}`} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h3 className="font-medium text-gray-900">{session.unit}</h3>
            <p className="text-sm text-gray-600">{session.cohort}</p>
            <p className="text-sm text-gray-600">{session.venue}</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">{session.time}</p>
            <Link href={route('attendance')} className="mt-2 px-4 py-2 text-sm font-medium bg-gray-200 rounded-lg text-gray-800 hover:bg-gray-400 transition-colors">
                Start Attendance
            </Link>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const RecentAttendance = () => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
    <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Attendance</h2>
    <div className="space-y-4">
      {[
        {
            id: 1,
          unit: "Programming 101",
          date: "Today",
          attendance: "45/50",
          percentage: "90%"
        },
        {
            id: 2,
          unit: "Data Structures",
          date: "Yesterday",
          attendance: "38/42",
          percentage: "90.5%"
        }
      ].map((record) => (
        <div key={record.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h3 className="font-medium text-gray-900">{record.unit}</h3>
            <p className="text-sm text-gray-600">{record.date}</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">{record.attendance}</p>
            <p className="text-sm text-green-600">{record.percentage}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default App;
