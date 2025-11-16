import React, { useState, useEffect, useRef } from 'react';
import { QuoteRequest, User, Vendor } from '../types';

interface ChatModalProps {
  request: QuoteRequest;
  currentUser: User;
  organizer: User;
  vendor: Vendor;
  onClose: () => void;
  onSendMessage: (requestId: string, text: string) => void;
}

const ChatModal: React.FC<ChatModalProps> = ({ request, currentUser, organizer, vendor, onClose, onSendMessage }) => {
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const otherParty = currentUser.role === 'organizer' ? vendor : organizer;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [request.messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      onSendMessage(request.id, newMessage.trim());
      setNewMessage('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg h-[70vh] flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex justify-between items-center flex-shrink-0">
          <div className="flex items-center space-x-3">
            {/* FIX: Use `profileImage` for Vendor and `profilePhoto` for User to fix type error. */}
            <img src={'profileImage' in otherParty ? otherParty.profileImage : otherParty.profilePhoto} alt={otherParty.name} className="w-10 h-10 rounded-full object-cover" />
            <div>
                <h2 className="font-bold text-gray-800">
                    Chat with {otherParty.name}
                </h2>
                <p className="text-sm text-gray-500">Regarding: {request.eventType}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className="flex-grow p-4 overflow-y-auto bg-gray-50">
          <div className="space-y-4">
            {request.messages.map((message, index) => {
              const isCurrentUser = message.senderId === currentUser.id;
              const sender = isCurrentUser ? currentUser : otherParty;
              // FIX: Use `profileImage` for Vendor and `profilePhoto` for User to fix type error.
              const senderPhoto = 'profileImage' in sender ? sender.profileImage : sender.profilePhoto;

              return (
                <div key={message.id} className={`flex items-start gap-3 ${isCurrentUser ? 'flex-row-reverse' : ''}`}>
                  <img src={senderPhoto} alt={sender.name} className="w-8 h-8 rounded-full object-cover" />
                  <div className={`p-3 rounded-lg max-w-xs md:max-w-md ${isCurrentUser ? 'bg-indigo-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
                    <p className="text-sm">{message.text}</p>
                    <p className={`text-xs mt-1 opacity-70 ${isCurrentUser ? 'text-indigo-100' : 'text-gray-500'} text-right`}>
                      {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              );
            })}
             <div ref={messagesEndRef} />
          </div>
        </div>
        
        {/* Input */}
        <div className="p-4 border-t border-gray-200 flex-shrink-0">
            <form onSubmit={handleSubmit} className="flex items-center space-x-3">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="w-full border-gray-300 rounded-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-4 py-2"
                />
                <button
                    type="submit"
                    className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                    </svg>
                </button>
            </form>
        </div>

      </div>
    </div>
  );
};

export default ChatModal;