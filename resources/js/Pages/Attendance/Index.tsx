import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import AttendancePage from './Partials/AttendancePage';
import { Schedule } from '@/types';

interface AuthProps {
    readonly schedule: Schedule;
    readonly auth: {
        readonly user: {
            readonly name: string;
        };
    };
}

function App({
    schedule,
    auth
}: AuthProps) {
    return (
        <>
            <Head title="Schedule" />
            <AuthenticatedLayout fullName={auth.user.name}>
                <AttendancePage schedule={schedule} />
            </AuthenticatedLayout>
        </>
    );
}

export default App;
