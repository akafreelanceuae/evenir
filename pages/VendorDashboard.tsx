import React from 'react';
import { User, Vendor, QuoteRequest } from '../types';
import { USERS } from '../constants';

interface VendorDashboardProps {
    user: User;
    vendor: Vendor;
    quoteRequests: QuoteRequest[];
    onRespondClick: (request: QuoteRequest) => void;
    onViewChat: (requestId: string) => void;
}

const getStatusBadge = (status: QuoteRequest['status']) => {
    switch (status) {
        case 'pending':
            return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">New Lead</span>;
        case 'responded':
            return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">Responded</span>;
        case 'booked':
            return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Booked</span>;
        case 'declined':
             return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Declined</span>;
    }
}

const VendorDashboard: React.FC<VendorDashboardProps> = ({ user, vendor, quoteRequests, onRespondClick, onViewChat }) => {
    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
            <p className="mt-1 text-gray-500">Welcome to your vendor dashboard, {user.name}.</p>

            <div className="mt-8">
                <h2 className="text-2xl font-bold text-gray-800">Incoming Leads</h2>
                <div className="mt-4 bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden">
                    <ul className="divide-y divide-gray-200">
                        {quoteRequests.length > 0 ? quoteRequests.map(request => {
                            const organizer = USERS.find(u => u.id === request.organizerId);
                            if (!organizer) return null;

                            return (
                                <li key={request.id} className="p-4 sm:p-6 hover:bg-gray-50 transition-colors duration-200">
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
                                        <div className="flex items-center">
                                            <img src={organizer.profilePhoto} alt={organizer.name} className="w-12 h-12 rounded-full hidden sm:block" />
                                            <div className="sm:ml-4">
                                                <p className="text-lg font-semibold text-indigo-600">{request.eventType}</p>
                                                <p className="text-sm text-gray-700">From: <span className="font-medium">{organizer.name}</span></p>
                                                <p className="text-sm text-gray-500">Event Date: {new Date(request.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                            </div>
                                        </div>
                                        <div className="mt-4 sm:mt-0 flex items-center space-x-4">
                                            {getStatusBadge(request.status)}
                                            {request.status === 'pending' ? (
                                                <button 
                                                    onClick={() => onRespondClick(request)}
                                                    className="text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 px-3 py-1 rounded-md transition-colors"
                                                >
                                                    Respond
                                                </button>
                                            ) : (
                                                <button onClick={() => onViewChat(request.id)} className="text-sm font-medium text-indigo-600 hover:text-indigo-800">View Chat</button>
                                            )}
                                        </div>
                                    </div>
                                    <div className="mt-4 ml-0 sm:ml-16 p-4 bg-gray-50 border-l-4 border-gray-300 rounded-r-lg">
                                        <p className="text-sm text-gray-800">
                                            <span className="font-semibold">Details: </span>
                                            {request.details}
                                        </p>
                                        {request.budget && (
                                            <p className="text-sm text-gray-600 mt-1">
                                                <span className="font-semibold">Organizer's Budget: </span>
                                                AED {request.budget.toLocaleString()}
                                            </p>
                                        )}
                                    </div>
                                </li>
                            );
                        }) : (
                             <li className="p-6 text-center text-gray-500">
                                You have no new leads at the moment.
                             </li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default VendorDashboard;
