import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import AttendancePage from './Partials/AttendancePage';

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
                <AttendancePage />
            </AuthenticatedLayout>
        </>
    );
}

export default App;
