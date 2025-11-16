import React, { useState } from 'react';
import { Vendor, QuoteRequest } from '../types';

interface QuoteRequestModalProps {
  vendor: Vendor;
  onClose: () => void;
  // FIX: The details object for a new quote request does not include `messages`, so it must be omitted from the type.
  onSubmit: (vendorId: string, details: Omit<QuoteRequest, 'id' | 'organizerId' | 'vendorId' | 'status' | 'responses' | 'messages'>) => void;
}

const QuoteRequestModal: React.FC<QuoteRequestModalProps> = ({ vendor, onClose, onSubmit }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
      eventType: '',
      date: '',
      budget: '',
      details: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const budgetNumber = formData.budget ? parseInt(formData.budget, 10) : undefined;
    onSubmit(vendor.id, {
        eventType: formData.eventType,
        date: formData.date,
        budget: budgetNumber,
        details: formData.details
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
              <h2 className="text-2xl font-bold text-gray-800">Request a Quote</h2>
              <p className="text-gray-500 mt-1">from <span className="font-semibold text-indigo-600">{vendor.name}</span></p>
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
                <h3 className="mt-4 text-xl font-semibold text-gray-800">Quote Request Sent!</h3>
                <p className="mt-2 text-gray-600">{vendor.name} will be notified and will get back to you shortly.</p>
             </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label htmlFor="eventType" className="block text-sm font-medium text-gray-700">Event Type</label>
                <input type="text" id="eventType" name="eventType" value={formData.eventType} onChange={handleChange} placeholder="e.g., Wedding, Birthday Party" required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white text-gray-900" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700">Event Date</label>
                  <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white text-gray-900" />
                </div>
                <div>
                  <label htmlFor="budget" className="block text-sm font-medium text-gray-700">Your Budget (AED)</label>
                  <input type="number" id="budget" name="budget" value={formData.budget} onChange={handleChange} placeholder="e.g., 5000" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white text-gray-900" />
                </div>
              </div>
              <div>
                <label htmlFor="details" className="block text-sm font-medium text-gray-700">Message</label>
                <textarea id="details" name="details" rows={4} value={formData.details} onChange={handleChange} placeholder="Tell us more about your event, number of guests, specific requests, etc." required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white text-gray-900"></textarea>
              </div>
               <div className="pt-4 flex justify-end space-x-3">
                <button type="button" onClick={onClose} className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Cancel
                </button>
                <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Send Request
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuoteRequestModal;