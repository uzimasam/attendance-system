import React, { useState } from 'react';
import { Menu, LayoutDashboard, Calendar, UserCircle, LogOut, School, BookOpen, Users, ChevronRight } from 'lucide-react';
import axios from 'axios';
import { Link } from '@inertiajs/react';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  hasDropdown?: boolean;
  onClick?: () => void;
}

const handleLogout = async () => {
    try {
        await axios.post(route('logout'));
        window.location.href = '/login'; // Redirect to login page after logout
    } catch (error) {
        console.error('Error logging out:', error);
    }
};

const NavItem: React.FC<NavItemProps> = ({ icon, label, active, hasDropdown, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors
      ${active
        ? 'bg-gray-200 text-gray-900'
        : 'text-gray-600 hover:bg-gray-200'}`}
  >
    {icon}
    <span className="flex-1 text-left">{label}</span>
    {hasDropdown && <ChevronRight className="w-4 h-4" />}
  </button>
);

export default function AuthenticatedLayout({ fullName, children }: { fullName: string; children: React.ReactNode }) {
    const userName = fullName;
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [activeSchool, setActiveSchool] = useState<string | null>(null);
  const [activeProgram, setActiveProgram] = useState<string | null>(null);

  // Mock data - in real app this would come from API
  const schools = [
    {
      id: '1',
      name: 'School of Computing',
      programs: [
        {
          id: '1',
          name: 'Computer Science',
          units: [
            { id: '1', name: 'Programming 101', cohorts: ['Year 1 2024', 'Year 2 2023'] },
            { id: '2', name: 'Data Structures', cohorts: ['Year 2 2023'] }
          ]
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(!isSidebarOpen)}
                className="p-2 text-gray-600 rounded-lg hover:bg-gray-100"
              >
                <Menu className="w-6 h-6" />
              </button>
              <h1 className="ml-4 text-xl font-semibold text-gray-800">
                Attendance
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">Welcome, {userName}</span>
              <img
                className="w-8 h-8 rounded-full"
                src="/images/favicon.png"
                alt="profile"
              />
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 z-40 w-64 h-screen pt-16 transition-transform
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        bg-white border-r border-gray-200`}>
        <div className="h-full px-3 py-4 overflow-y-auto">
          <NavItem icon={<LayoutDashboard className="w-5 h-5" />} label="Dashboard" active />
            <Link
                href={route('schedule')}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors text-gray-600 hover:bg-gray-200"
            >
                <Calendar className="w-5 h-5" />
                Schedule
            </Link>
            <Link
                href={route('profile.edit')}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors text-gray-600 hover:bg-gray-200"
            >
                <UserCircle className="w-5 h-5" />
                My Profile
            </Link>

          <div className="my-4 border-t border-gray-200"></div>

          {/* Schools Section */}
          {schools.map(school => (
            <div key={school.id}>
              <NavItem
                icon={<School className="w-5 h-5" />}
                label={school.name}
                hasDropdown
                active={activeSchool === school.id}
                onClick={() => setActiveSchool(activeSchool === school.id ? null : school.id)}
              />

              {activeSchool === school.id && (
                <div className="ml-4 mt-2 space-y-1">
                  {school.programs.map(program => (
                    <div key={program.id}>
                      <NavItem
                        icon={<BookOpen className="w-4 h-4" />}
                        label={program.name}
                        hasDropdown
                        active={activeProgram === program.id}
                        onClick={() => setActiveProgram(activeProgram === program.id ? null : program.id)}
                      />

                      {activeProgram === program.id && (
                        <div className="ml-4 mt-2 space-y-1">
                          {program.units.map(unit => (
                            <div key={unit.id}>
                              <NavItem
                                icon={<Users className="w-4 h-4" />}
                                label={unit.name}
                                hasDropdown
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          <div className="my-4 border-t border-gray-200"></div>

          <NavItem
            onClick={handleLogout}
            icon={<LogOut className="w-5 h-5" />}
            label="Logout"
            />
        </div>
      </aside>

      {/* Main Content */}
      <main className={`pt-16 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <div className="p-4 min-h-screen">
          {children}
        </div>
      </main>
    </div>
  );
}
