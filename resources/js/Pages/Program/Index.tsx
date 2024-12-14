import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import ProgramPage from './Partials/ProgramPage';

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
                <ProgramPage />
            </AuthenticatedLayout>
        </>
    );
}

export default App;
