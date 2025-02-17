import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { DataTable } from './FlaggedStudents/DataTable';
import { columns } from './FlaggedStudents/Columns';

interface AnalyticsProps {
    readonly auth: {
        readonly user: {
            readonly name: string;
        };
    };
    readonly studentsData: any;
}

function App({
    studentsData,
    auth
}: AnalyticsProps) {
    return (
        <>
            <Head title={`Student Analytics`} />
            <AuthenticatedLayout fullName={auth.user.name}>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Students Data</h2>
                    <DataTable columns={columns} data={studentsData} />
                </div>
            </AuthenticatedLayout>
        </>
    );
}
export default App;
