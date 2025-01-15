import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

interface PageProps {
    readonly auth: {
        readonly user: {
            readonly name: string;
        };
    };
    readonly studWithCard: any;
    readonly studWithoutCard: any;
    readonly cards: any;
}

function App({
    cards,
    studWithCard,
    studWithoutCard,
    auth
}: PageProps) {
    return (
        <>
            <Head title="Dashboard" />
            <AuthenticatedLayout fullName={auth.user.name}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <StudentsWithCard studWithCard={studWithCard} availableCards={cards} />
                    <StudentsWithoutCard studWithoutCard={studWithoutCard} availableCards={cards} />
                </div>
            </AuthenticatedLayout>
        </>
    );
}

interface DashboardCardProps {
    title: string;
    value: string;
    icon: React.ReactNode;
    trend: string;
    trendColor?: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, value, icon, trend, trendColor }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-start">
            <div>
                <p className="text-sm font-medium text-gray-600">{title}</p>
                <h3 className="text-2xl font-semibold text-gray-900 mt-2">{value}</h3>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
                {icon}
            </div>
        </div>
        <p className={`text-sm ${trendColor}`}>{trend}</p>
    </div>
);

const StudentsWithCard = ({ studWithCard = [], availableCards }: { studWithCard: any[]; availableCards: any[] }) => {
    const [selectedCard, setSelectedCard] = useState<{ [key: string]: string }>({});
    const { post } = useForm();

    interface SelectedCardState {
        [key: string]: string;
    }

    const handleCardChange = (studentId: string, cardId: string) => {
        setSelectedCard((prevState: SelectedCardState) => ({
            ...prevState,
            [studentId]: cardId,
        }));
    };

    interface Student {
        id: string;
        name: string;
        email: string;
        registration_number: string;
    }

    interface Card {
        id: string;
        rfid_uid: string;
    }

    const handleSwapCard = (studentId: string) => {
        const cardId = selectedCard[studentId];
        if (cardId) {
            post(route('students.swapCard', { studentId, cardId }));
        }
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Students with Cards</h2>
            <div className="space-y-4">
                {studWithCard.length === 0 ? (
                    <div className="p-4 bg-blue-50 rounded-lg">
                        <h3 className="font-medium text-gray-600">No students have been set up with cards</h3>
                    </div>
                ) : (
                    studWithCard.map(student => (
                        <div key={`${student.id}`} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div>
                                <h3 className="font-medium text-gray-900">{student.name}</h3>
                                <p className="text-sm text-gray-600">{student.email}</p><select
                                    className="mt-2 px-2 py-1 text-sm font-medium bg-gray-200 rounded-lg text-gray-800"
                                    value={selectedCard[student.id] || ''}
                                    onChange={(e) => handleCardChange(student.id, e.target.value)}
                                >
                                    <option value="">Select Card</option>
                                    <option key={student.card.id} value={student.card.id} disabled>
                                        {student.card.rfid_uid}
                                    </option>
                                    {availableCards.map(card => (
                                        <option key={card.id} value={card.id}>
                                            {card.rfid_uid}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="text-right">
                                <p className="mb-2 text-sm font-medium text-gray-900">{student.registration_number}</p>
                                <button
                                    onClick={() => handleSwapCard(student.id)}
                                    className="mt-2 px-2 py-1 text-sm font-medium bg-gray-200 rounded-lg text-gray-800 hover:bg-gray-400 transition-colors"
                                >
                                    Swap Card
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

const StudentsWithoutCard = ({ studWithoutCard, availableCards }: { studWithoutCard: any[]; availableCards: any[] }) => {
    const [selectedCard, setSelectedCard] = useState<{ [key: string]: string }>({});
    const { post } = useForm();

    interface SelectedCardState {
        [key: string]: string;
    }

    const handleCardChange = (studentId: string, cardId: string) => {
        setSelectedCard((prevState: SelectedCardState) => ({
            ...prevState,
            [studentId]: cardId,
        }));
    };

    interface Student {
        id: string;
        name: string;
        email: string;
        registration_number: string;
    }

    interface Card {
        id: string;
        rfid_uid: string;
    }

    const handleAddCard = (studentId: string) => {
        const cardId = selectedCard[studentId];
        if (cardId) {
            post(route('students.addCard', { studentId, cardId }));
        }
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Students without Cards</h2>
            <div className="space-y-4">
                {studWithoutCard.length === 0 ? (
                    <div className="p-4 bg-blue-50 rounded-lg">
                        <h3 className="font-medium text-gray-900">All students have been set up with cards</h3>
                    </div>
                ) : (
                    studWithoutCard.map(student => (
                        <div key={`${student.id}`} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div>
                                <h3 className="font-medium text-gray-900">{student.name}</h3>
                                <p className="text-sm text-gray-600">{student.email}</p><select
                                    className="mt-2 px-2 py-1 text-sm font-medium bg-gray-200 rounded-lg text-gray-800"
                                    value={selectedCard[student.id] || ''}
                                    onChange={(e) => handleCardChange(student.id, e.target.value)}
                                >
                                    <option value="">Select Card</option>
                                    {availableCards.map(card => (
                                        <option key={card.id} value={card.id}>
                                            {card.rfid_uid}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="text-right">
                                <p className="mb-2 text-sm font-medium text-gray-900">{student.registration_number}</p>
                                <button
                                    onClick={() => handleAddCard(student.id)}
                                    className="mt-2 px-2 py-1 text-sm font-medium bg-gray-200 rounded-lg text-gray-800 hover:bg-gray-400 transition-colors"
                                >
                                    Add Card
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default App;
