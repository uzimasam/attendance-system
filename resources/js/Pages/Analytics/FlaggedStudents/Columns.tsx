import { Button } from "@/Components/ui/button";
import { Link } from "@inertiajs/react";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowBigRightDash, ArrowUpDown } from "lucide-react";

export type FlaggedStudent = {
    registration_number: string;
    student_name: string;
    school: string;
    program: string;
    cohort: string;
    attendance: string;
};

export const columns: ColumnDef<FlaggedStudent>[] = [
    {
        accessorKey: 'registration_number',
        header: ({ column }) => {
            return (
                <Button variant="ghost" size="sm" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Registration Number
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: 'name',
        header: ({ column }) => {
            return (
                <Button variant="ghost" size="sm" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: 'school',
        header: ({ column }) => {
            return (
                <Button variant="ghost" size="sm" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    School
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: 'program',
        header: ({ column }) => {
            return (
                <Button variant="ghost" size="sm" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Program
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: 'cohort',
        header: ({ column }) => {
            return (
                <Button variant="ghost" size="sm" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Cohort
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: 'attendance',
        header: ({ column }) => {
            return (
                <Button variant="ghost" size="sm" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Attendance
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => {
            const student = row.original;

            return (
                <Link
                    href={`/students/${student.registration_number}`}
                    className="flex items-center gap-2 px-3 py-1 text-sm font-medium text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                    View
                    <ArrowBigRightDash className="w-4 h-4" />
                </Link>
            )
        }
    }
];