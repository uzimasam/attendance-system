import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import SetupPage from './Partials/SetupPage';

interface SetupProps {
    readonly auth: {
        readonly user: {
            readonly name: string;
        };
    };
    readonly schools: {
        readonly id: number;
        readonly name: string;
        readonly code: string;
        readonly slug: string;
        readonly status: string;
    }[];
    readonly units: {
        readonly id: number;
        readonly name: string;
        readonly code: string;
        readonly slug: string;
        readonly schoolId: number;
        readonly status: string;
    }[];
    readonly programs: {
        readonly id: number;
        readonly name: string;
        readonly code: string;
        readonly duration: number;
        readonly semesters: number;
        readonly status: string;
    }[];
    readonly cohorts: {
        readonly id: number;
        readonly name: string;
        readonly code: string;
        readonly programId: number;
        readonly status: string;
    }[];
}

function App({
    schools,
    programs,
    cohorts,
    units,
    auth
}: SetupProps) {

    return (
        <>
            <Head title="Schedule" />
            <AuthenticatedLayout fullName={auth.user.name}>
                <SetupPage schools={schools} programs={programs} cohorts={cohorts} units={units} />
            </AuthenticatedLayout>
        </>
    );
}

export default App;
