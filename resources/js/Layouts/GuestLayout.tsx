import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="flex min-h-screen flex-col items-center pt-6 sm:justify-center sm:pt-0">
            <div className="flex flex-col items-center">
                <Link href="/">
                    <ApplicationLogo />
                </Link>
                <h1 className="text-xl mt-2
                font-extrabold">Sign In</h1>
            </div>

            <div className="mt-2 w-full overflow-hidden px-6 py-4  sm:max-w-md sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
