import React from 'react';
import { Calendar, Users, BookOpen, BarChart3 } from 'lucide-react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
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
