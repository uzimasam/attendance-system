import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

interface PageProps {
    readonly auth: {
        readonly user: {
            readonly name: string;
        };
    };
    readonly lectWithCard: any;
    readonly lectWithoutCard: any;
    readonly cards: any;
}

function App({
    cards,
    lectWithCard,
    lectWithoutCard,
    auth
}: PageProps) {
    return (
        <>
            <Head title="Dashboard" />
            <AuthenticatedLayout fullName={auth.user.name}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <LecturersWithCard lectWithCard={lectWithCard} availableCards={cards} />
                    <LecturersWithoutCard lectWithoutCard={lectWithoutCard} availableCards={cards} />
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

const LecturersWithCard = ({ lectWithCard, availableCards }: { lectWithCard: any[]; availableCards: any[] }) => {
    const [selectedCard, setSelectedCard] = useState<{ [key: string]: string }>({});
    const { post } = useForm();

    interface SelectedCardState {
        [key: string]: string;
    }

    const handleCardChange = (lecturerId: string, cardId: string) => {
        setSelectedCard((prevState: SelectedCardState) => ({
            ...prevState,
            [lecturerId]: cardId,
        }));
    };

    interface Lecturer {
        id: string;
        name: string;
        email: string;
        staff_number: string;
    }

    interface Card {
        id: string;
    }

    const handleSwapCard = (lecturerId: string) => {
        const cardId = selectedCard[lecturerId];
        if (cardId) {
            post(route('lecturers.swapCard', { lecturerId, cardId }));
        }
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Lecturers with Cards</h2>
            <div className="space-y-4">
                {lectWithCard.length === 0 ? (
                    <div className="p-4 bg-blue-50 rounded-lg">
                        <h3 className="font-medium text-gray-600">No lecturers have been set up with cards</h3>
                    </div>
                ) : (
                    lectWithCard.map(lecturer => (
                        <div key={`${lecturer.id}`} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div>
                                <h3 className="font-medium text-gray-900">{lecturer.name}</h3>
                                <p className="text-sm text-gray-600">{lecturer.email}</p><select
                                    className="mt-2 px-2 py-1 text-sm font-medium bg-gray-200 rounded-lg text-gray-800"
                                    value={selectedCard[lecturer.id] || ''}
                                    onChange={(e) => handleCardChange(lecturer.id, e.target.value)}
                                >
                                    <option value="">Select Card</option>
                                    <option key={lecturer.card.id} value={lecturer.card.id} disabled>
                                        {lecturer.card.id}
                                    </option>
                                    {availableCards.map(card => (
                                        <option key={card.id} value={card.id}>
                                            {card.id}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="text-right">
                                <p className="mb-2 text-sm font-medium text-gray-900">{lecturer.staff_number}</p>
                                <button
                                    onClick={() => handleSwapCard(lecturer.id)}
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

const LecturersWithoutCard = ({ lectWithoutCard, availableCards }: { lectWithoutCard: any[]; availableCards: any[] }) => {
    const [selectedCard, setSelectedCard] = useState<{ [key: string]: string }>({});
    const { post } = useForm();

    interface SelectedCardState {
        [key: string]: string;
    }

    const handleCardChange = (lecturerId: string, cardId: string) => {
        setSelectedCard((prevState: SelectedCardState) => ({
            ...prevState,
            [lecturerId]: cardId,
        }));
    };

    interface Lecturer {
        id: string;
        name: string;
        email: string;
        staff_number: string;
    }

    interface Card {
        id: string;
    }

    const handleAddCard = (lecturerId: string) => {
        const cardId = selectedCard[lecturerId];
        if (cardId) {
            post(route('lecturers.addCard', { lecturerId, cardId }));
        }
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Lecturers without Cards</h2>
            <div className="space-y-4">
                {lectWithoutCard.length === 0 ? (
                    <div className="p-4 bg-blue-50 rounded-lg">
                        <h3 className="font-medium text-gray-900">All lecturers have been set up with cards</h3>
                    </div>
                ) : (
                    lectWithoutCard.map(lecturer => (
                        <div key={`${lecturer.id}`} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div>
                                <h3 className="font-medium text-gray-900">{lecturer.name}</h3>
                                <p className="text-sm text-gray-600">{lecturer.email}</p><select
                                    className="mt-2 px-2 py-1 text-sm font-medium bg-gray-200 rounded-lg text-gray-800"
                                    value={selectedCard[lecturer.id] || ''}
                                    onChange={(e) => handleCardChange(lecturer.id, e.target.value)}
                                >
                                    <option value="">Select Card</option>
                                    {availableCards.map(card => (
                                        <option key={card.id} value={card.id}>
                                            {card.id}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="text-right">
                                <p className="mb-2 text-sm font-medium text-gray-900">{lecturer.staff_number}</p>
                                <button
                                    onClick={() => handleAddCard(lecturer.id)}
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
