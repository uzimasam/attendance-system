import { GraduationCap, BookOpen, BarChart3, ArrowRight } from 'lucide-react';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/Components/ui/card';
import { Head, Link } from '@inertiajs/react';

export default function App() {
    return (
        <>
            <Head title="Welcome" />
            <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col">
                <div className="flex-grow">
                    {/* Hero Section */}
                    <div className="container mx-auto px-4 py-16 my-28">
                        <div className="text-center max-w-3xl mx-auto">
                            <img src='/images/favicon.png' alt="Logo" className="h-16 w-16 mx-auto mb-6" />
                            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl mb-6">
                                Smart Attendance Management
                            </h1>
                            <p className="text-lg leading-8 text-gray-600 mb-8">
                                Streamline your classroom attendance with our modern, efficient system designed for universities. Track attendance, generate reports, and manage your classes with ease.
                            </p>
                            <div className="flex gap-4 justify-center">
                                <Link
                                    href={route('dashboard')}
                                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-10 rounded-md px-8"
                                >
                                    Get Started
                                    <ArrowRight className="h-5 w-5" />
                                </Link>
                                <Button variant="outline" size="lg">
                                    Learn More
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Features Section */}
                    <div className="container mx-auto px-4 py-16">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <Card>
                                <CardHeader>
                                    <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                                        <GraduationCap className="h-6 w-6 text-blue-600" />
                                    </div>
                                    <CardTitle>Smart Tracking</CardTitle>
                                    <CardDescription>
                                        Effortlessly track attendance using barcode scanning technology
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-gray-500">
                                        Quickly mark attendance by scanning student ID cards, saving time and reducing errors.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                                        <BarChart3 className="h-6 w-6 text-green-600" />
                                    </div>
                                    <CardTitle>Detailed Analytics</CardTitle>
                                    <CardDescription>
                                        Generate comprehensive attendance reports
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-gray-500">
                                        Access detailed insights about attendance patterns and student participation.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                                        <BookOpen className="h-6 w-6 text-purple-600" />
                                    </div>
                                    <CardTitle>Course Management</CardTitle>
                                    <CardDescription>
                                        Organize courses and class schedules
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-gray-500">
                                        Easily manage multiple courses, units, and class schedules in one place.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Stats Section */}
                    <div className="container mx-auto px-4 py-16">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="text-center">
                                <div className="text-4xl font-bold text-gray-900 mb-2">10,000+</div>
                                <div className="text-sm text-gray-500">Students Tracked</div>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl font-bold text-gray-900 mb-2">500+</div>
                                <div className="text-sm text-gray-500">Active Lecturers</div>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl font-bold text-gray-900 mb-2">98%</div>
                                <div className="text-sm text-gray-500">Accuracy Rate</div>
                            </div>
                        </div>
                    </div>

                    {/* CTA Section */}
                    <div className="container mx-auto px-4 py-16">
                        <Card className="bg-primary text-primary-foreground">
                            <CardHeader className="text-center">
                                <CardTitle className="text-2xl">Ready to Get Started?</CardTitle>
                                <CardDescription className="text-primary-foreground/80">
                                    Join thousands of educators who are already using our system
                                </CardDescription>
                            </CardHeader>
                            <CardFooter className="justify-center">
                                <Link
                                    href={route('register')}
                                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 h-10 rounded-md px-8"
                                >
                                    Create Account
                                    <ArrowRight className="h-5 w-5" />
                                </Link>
                            </CardFooter>
                        </Card>
                    </div>
                </div>

                {/* Footer */}
                <footer className="text-gray-900">
                    <div className="container mx-auto px-4 py-6">
                        <div className="text-sm text-center">
                            <p>&copy; {new Date().getFullYear()} Attendance Management System. All rights reserved.</p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
