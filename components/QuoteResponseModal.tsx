import React, { useState } from 'react';
import { Vendor, QuoteRequest, QuoteResponse } from '../types';

interface QuoteResponseModalProps {
  request: QuoteRequest;
  vendor: Vendor;
  onClose: () => void;
  onSubmit: (requestId: string, responseDetails: Omit<QuoteResponse, 'id' | 'vendorId' | 'timestamp'>) => void;
}

const QuoteResponseModal: React.FC<QuoteResponseModalProps> = ({ request, vendor, onClose, onSubmit }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
      priceProposal: '',
      message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.priceProposal || !formData.message) {
        alert("Please fill out both price and message.");
        return;
    }
    onSubmit(request.id, {
        priceProposal: parseInt(formData.priceProposal, 10),
        message: formData.message,
    });
    setSubmitted(true);
    setTimeout(() => {
        onClose();
    }, 3000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg max-h-full overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Respond to Request</h2>
              <p className="text-gray-500 mt-1">For event: <span className="font-semibold text-indigo-600">{request.eventType}</span></p>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {submitted ? (
             <div className="text-center py-16">
                <svg className="mx-auto h-12 w-12 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="mt-4 text-xl font-semibold text-gray-800">Response Sent!</h3>
                <p className="mt-2 text-gray-600">The organizer has been notified of your quote.</p>
             </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label htmlFor="priceProposal" className="block text-sm font-medium text-gray-700">Your Price Quote (AED)</label>
                <input 
                    type="number" 
                    id="priceProposal" 
                    name="priceProposal" 
                    value={formData.priceProposal} 
                    onChange={handleChange} 
                    placeholder="e.g., 2500" 
                    required 
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message to Organizer</label>
                <textarea 
                    id="message" 
                    name="message" 
                    rows={5} 
                    value={formData.message} 
                    onChange={handleChange} 
                    placeholder="Hi! I'm available for your event. My package includes..." 
                    required 
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                ></textarea>
              </div>
               <div className="pt-4 flex justify-end space-x-3">
                <button type="button" onClick={onClose} className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Cancel
                </button>
                <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Send Response
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuoteResponseModal;