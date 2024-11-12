import { PropsWithChildren } from "react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/Components/ui/accordion";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/Components/ui/dropdown-menu";
import { router } from "@inertiajs/react";

interface AuthenticatedLayoutProps extends PropsWithChildren {}

export default function AuthenticatedLayout({ children }: AuthenticatedLayoutProps) {

  return (
    <div className="flex h-screen bg-gray-100 text-gray-800">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-800 text-white flex flex-col p-4">
            <h2 className="text-2xl font-bold mb-6">Attendance</h2>

            <ul className="space-y-4">
                {/* Dashboard */}
                <li onClick={() => route('/dashboard')} className="cursor-pointer p-2 rounded hover:bg-gray-700">
                    Dashboard
                </li>

                {/* Schedules */}
                <li onClick={() => route('/schedules')} className="cursor-pointer p-2 rounded hover:bg-gray-700">
                    Schedules
                </li>

                {/* Classes Accordion */}
                <Accordion type="multiple" className="w-full">
                    <AccordionItem value="classes">
                        <AccordionTrigger className="p-2 rounded hover:bg-gray-700">Classes</AccordionTrigger>
                        <AccordionContent>
                            <DropdownMenu>
                                <DropdownMenuTrigger className="text-sm p-2 w-full text-left">Units</DropdownMenuTrigger>
                                <DropdownMenuContent className="bg-gray-700">
                                    <DropdownMenuItem onClick={() => route('/units/1')}>Unit 1</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => route('/units/2')}>Unit 2</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>

                            <DropdownMenu>
                                <DropdownMenuTrigger className="text-sm p-2 w-full text-left">Cohorts & Class Lists</DropdownMenuTrigger>
                                <DropdownMenuContent className="bg-gray-700">
                                    <DropdownMenuItem onClick={() => route('/cohorts/1')}>Cohort 1</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => route('/cohorts/2')}>Cohort 2</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>

                {/* Reports */}
                <li onClick={() => route('/reports')} className="cursor-pointer p-2 rounded hover:bg-gray-700">
                    Reports
                </li>

                {/* School Accordion */}
                <Accordion type="multiple" className="w-full">
                    <AccordionItem value="school">
                        <AccordionTrigger className="p-2 rounded hover:bg-gray-700">School</AccordionTrigger>
                        <AccordionContent>
                            <DropdownMenu>
                                <DropdownMenuTrigger className="text-sm p-2 w-full text-left">Programs</DropdownMenuTrigger>
                                <DropdownMenuContent className="bg-gray-700">
                                    <DropdownMenuItem onClick={() => route('/programs/1')}>Program 1</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => route('/programs/2')}>Program 2</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>

                {/* Profile */}
                <li onClick={() => route('/profile')} className="cursor-pointer p-2 rounded hover:bg-gray-700">
                    My Profile
                </li>

                {/* Logout */}
                <li onClick={() => {
                    router.post('/logout')
                }} className="cursor-pointer p-2 rounded hover:bg-gray-700">
                    Logout
                </li>
            </ul>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
            {/* Top Navbar */}
            <header className="w-full bg-white p-4 shadow flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <img src="/images/favicon.png" alt="App Logo" className="h-8" />
                    <span className="font-semibold text-xl">Attendance</span>
                </div>

                {/* User Profile Menu */}
                <DropdownMenu>
                    <DropdownMenuTrigger className="cursor-pointer">
                        <img src="/images/avatar.png" alt="User Icon" className="h-8 rounded-full" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-gray-700">
                        <DropdownMenuItem onClick={() => route('/profile')}>Profile</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => {
                            router.post('/logout')
                        }}>Logout</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </header>

            {/* Page Content */}
            <main className="flex-1 overflow-y-auto p-6 bg-gray-100">
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-white p-4 shadow text-center text-gray-600">
                &copy; {new Date().getFullYear()} Attendance. All rights reserved.
            </footer>
        </div>
    </div>
  );
}
