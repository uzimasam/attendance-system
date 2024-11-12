import { AccordionItem, AccordionTrigger, AccordionContent, Accordion } from "@/Components/ui/accordion";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/Components/ui/dropdown-menu";
import { Link } from "@inertiajs/react";

export function AppSidebar() {
    return (
        <nav className="w-64 bg-gray-800 text-white h-full p-4">
          <h2 className="text-2xl font-bold mb-6">Attendance System</h2>

          <ul className="space-y-4">
            {/* Dashboard */}
            <Link href="/dashboard" className="cursor-pointer p-2 rounded hover:bg-gray-700">
                Dashboard
            </Link>

            {/* Schedules */}
            <Link href="/schedules" className="cursor-pointer p-2 rounded hover:bg-gray-700">
                Schedules
            </Link>

            {/* Classes Accordion */}
            <Accordion
             type="multiple" className="w-full">
              <AccordionItem value="classes">
                <AccordionTrigger className="p-2 rounded hover:bg-gray-700">Classes</AccordionTrigger>
                <AccordionContent>
                  {/* Units Dropdown Menu */}
                  <DropdownMenu>
                    <DropdownMenuTrigger className="text-sm p-2 w-full text-left">Units</DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-gray-700">
                        {/* Replace these static items with dynamic unit names as needed */}
                        <DropdownMenuItem>Unit 1</DropdownMenuItem>
                        <DropdownMenuItem>Unit 2</DropdownMenuItem>
                        <DropdownMenuItem>Unit 3</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  {/* Cohorts Dropdown Menu */}
                  <DropdownMenu>
                    <DropdownMenuTrigger className="text-sm p-2 w-full text-left">Cohorts & Class Lists</DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-gray-700">
                      {/* Replace with dynamic cohort names */}
                      <DropdownMenuItem>Cohort 1</DropdownMenuItem>
                      <DropdownMenuItem>Cohort 2</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* Reports */}
            <Link href="/reports" className="cursor-pointer p-2 rounded hover:bg-gray-700">
                Reports
            </Link>

            {/* School Accordion */}
            <Accordion type="multiple" className="w-full">
              <AccordionItem value="school">
                <AccordionTrigger className="p-2 rounded hover:bg-gray-700">School</AccordionTrigger>
                <AccordionContent>
                  {/* Programs Dropdown Menu */}
                  <DropdownMenu>
                    <DropdownMenuTrigger className="text-sm p-2 w-full text-left">Programs</DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-gray-700">
                      {/* Replace with dynamic program names */}
                        <DropdownMenuItem>Program 1</DropdownMenuItem>
                        <DropdownMenuItem>Program 2</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* Profile */}
            <Link href="/profile" className="cursor-pointer p-2 rounded hover:bg-gray-700">
                Profile
            </Link>

            {/* Logout */}
            <Link href="/logout" className="cursor-pointer p-2 rounded hover:bg-gray-700">
                Logout
            </Link>
          </ul>
        </nav>
      );
}
