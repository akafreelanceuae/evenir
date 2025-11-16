import React from 'react';
import { User, QuoteRequest } from '../types';
import { VENDORS } from '../constants';

interface OrganizerDashboardProps {
    user: User;
    quoteRequests: QuoteRequest[];
    onStatusChange: (requestId: string, status: 'booked' | 'declined') => void;
    onViewChat: (requestId: string) => void;
}

const getStatusBadge = (status: QuoteRequest['status']) => {
    switch (status) {
        case 'pending':
            return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Pending</span>;
        case 'responded':
            return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">Responded</span>;
        case 'booked':
            return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Booked</span>;
        case 'declined':
             return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Declined</span>;
    }
}

const OrganizerDashboard: React.FC<OrganizerDashboardProps> = ({ user, quoteRequests, onStatusChange, onViewChat }) => {
    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800">Welcome back, {user.name.split(' ')[0]}!</h1>
            <p className="mt-1 text-gray-500">Here's an overview of your event planning activity.</p>

            <div className="mt-8">
                <h2 className="text-2xl font-bold text-gray-800">My Quote Requests</h2>
                <div className="mt-4 bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden">
                    <ul className="divide-y divide-gray-200">
                        {quoteRequests.length > 0 ? quoteRequests.map(request => {
                            const vendor = VENDORS.find(v => v.id === request.vendorId);
                            if (!vendor) return null;
                            return (
                                <li key={request.id} className="p-4 sm:p-6 hover:bg-gray-50 transition-colors duration-200">
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
                                        <div className="flex items-center">
                                            <img src={vendor.profileImage} alt={vendor.name} className="w-12 h-12 rounded-full hidden sm:block" />
                                            <div className="sm:ml-4">
                                                <p className="text-lg font-semibold text-indigo-600">{request.eventType}</p>
                                                <p className="text-sm text-gray-700">Request to: <span className="font-medium">{vendor.name}</span></p>
                                                <p className="text-sm text-gray-500">Date: {new Date(request.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                            </div>
                                        </div>
                                        <div className="mt-4 sm:mt-0 flex items-center space-x-4">
                                            {getStatusBadge(request.status)}
                                            {request.status !== 'pending' && (
                                                <button onClick={() => onViewChat(request.id)} className="text-sm font-medium text-indigo-600 hover:text-indigo-800">View Chat</button>
                                            )}
                                        </div>
                                    </div>
                                    {request.status === 'responded' && request.responses[0] && (
                                         <div className="mt-4 ml-0 sm:ml-16 p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                                            <p className="text-sm font-semibold text-blue-800">
                                                New Response from {vendor.name}:
                                                <span className="ml-2 font-bold">AED {request.responses[0].priceProposal.toLocaleString()}</span>
                                            </p>
                                            <p className="mt-1 text-sm text-blue-700 italic">"{request.responses[0].message}"</p>
                                            <div className="mt-3 flex items-center space-x-3">
                                                <button 
                                                    onClick={() => onStatusChange(request.id, 'booked')}
                                                    className="bg-green-500 text-white px-3 py-1 text-sm font-semibold rounded-md hover:bg-green-600 transition-colors"
                                                >
                                                    Accept
                                                </button>
                                                <button 
                                                    onClick={() => onStatusChange(request.id, 'declined')}
                                                    className="bg-gray-200 text-gray-700 px-3 py-1 text-sm font-semibold rounded-md hover:bg-gray-300 transition-colors"
                                                >
                                                    Decline
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </li>
                            )
                        }) : (
                             <li className="p-6 text-center text-gray-500">
                                You haven't sent any quote requests yet.
                             </li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default OrganizerDashboard;
