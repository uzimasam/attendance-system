import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import UnitPage from './Partials/UnitPage';

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
                <UnitPage />
            </AuthenticatedLayout>
        </>
    );
}

export default App;
