import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import ProgramPage from './Partials/ProgramPage';
import { Schedule, Student } from '@/types';

interface AuthProps {
    readonly auth: {
        readonly user: {
            readonly name: string;
        };
    };
    readonly averageAttendance: number;
    readonly program: {
        readonly id: number;
        readonly name: string;
        readonly code: string;
        readonly slug: string;
        readonly duration: number;
        readonly semesters: number;
        readonly status: string;
        readonly school: {
            readonly id: number;
            readonly name: string;
            readonly code: string;
            readonly slug: string;
            readonly status: string;
        };
        readonly units: {
            readonly id: number;
            readonly code: string;
            readonly name: string;
            readonly credits: number;
            readonly semester: number;
            readonly year: number;
            readonly status: string;
            readonly cohorts: {
                readonly id: number;
                readonly name: string;
                readonly status: string;
                readonly studentCount: number;
            }[];
        }[];
    };
    readonly students: Student[];
    readonly schedules: Schedule[];
}

function App({
    auth,
    averageAttendance,
    program,
    students,
    schedules,
}: AuthProps) {
    return (
        <>
            <Head title="Schedule" />
            <AuthenticatedLayout fullName={auth.user.name}>
                <ProgramPage program={program} averageAttendance={averageAttendance} students={students} schedules={schedules} />
            </AuthenticatedLayout>
        </>
    );
}

export default App;
