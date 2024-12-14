import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import SchedulePage from './Partials/SchedulePage';

interface ScheduleProps {
    readonly units: {
        readonly id: number;
        readonly name: string;
        readonly code: string;
        readonly slug: string;
        readonly schoolId: number;
        readonly status: string;
    }[];
    readonly schedules: {
        readonly id: number;
        readonly unitId: number;
        readonly cohortId: number;
        readonly day: string;
        readonly time: string;
        readonly venue: string;
        readonly status: string;
    }[];
    readonly cohorts: {
        readonly id: number;
        readonly name: string;
        readonly code: string;
        readonly programId: number;
        readonly status: string;
    }[];
    readonly auth: {
        readonly user: {
            readonly name: string;
        };
    };
}

function App({
    units,
    schedules,
    cohorts,
    auth
}: ScheduleProps) {
    return (
        <>
            <Head title="Schedule" />
            <AuthenticatedLayout fullName={auth.user.name}>
                <SchedulePage units={units} schedules={schedules} cohorts={cohorts} />
            </AuthenticatedLayout>
        </>
    );
}

export default App;
