import React, { useState } from 'react';
import { Vendor, QuoteRequest } from '../types';
import StarRating from '../components/StarRating';
import { LocationMarkerIcon, ChevronLeftIcon } from '../components/Icons';
import QuoteRequestModal from '../components/QuoteRequestModal';

interface VendorProfilePageProps {
  vendor: Vendor;
  onBack: () => void;
  onQuoteRequest: (vendorId: string, details: Omit<QuoteRequest, 'id' | 'organizerId' | 'vendorId' | 'status' | 'responses'>) => void;
}

const VendorProfilePage: React.FC<VendorProfilePageProps> = ({ vendor, onBack, onQuoteRequest }) => {
    const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  return (
    <div>
      <button onClick={onBack} className="flex items-center text-sm text-gray-500 hover:text-gray-800 mb-6 font-medium">
        <ChevronLeftIcon className="w-5 h-5 mr-1" />
        Back to Results
      </button>

      {/* Header */}
      <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center space-x-5">
            <img 
                src={vendor.profileImage} 
                alt={vendor.name} 
                className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover shadow-lg border-4 border-white"
            />
            <div>
                <span className="text-sm font-semibold text-indigo-600 bg-indigo-100 px-3 py-1 rounded-full">{vendor.category}</span>
                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mt-2">{vendor.name}</h1>
                <div className="flex items-center mt-2 space-x-4">
                    <div className="flex items-center">
                        <StarRating rating={vendor.rating} />
                        <span className="ml-2 text-gray-600 font-semibold">{vendor.rating.toFixed(1)}</span>
                        <span className="ml-1 text-gray-500">({vendor.reviews.length} reviews)</span>
                    </div>
                    <div className="flex items-center text-gray-500">
                        <LocationMarkerIcon className="w-5 h-5 mr-1"/>
                        <span>{vendor.location}</span>
                    </div>
                </div>
            </div>
        </div>
        <div className="w-full md:w-auto flex-shrink-0">
            <button onClick={() => setIsQuoteModalOpen(true)} className="w-full bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-transform transform hover:scale-105 shadow-lg">
                Request a Quote
            </button>
            <p className="text-center text-xs text-gray-500 mt-2">Avg. Price: AED {vendor.pricingRange[0]} - {vendor.pricingRange[1]}</p>
        </div>
      </header>
      
      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <main className="lg:col-span-2 space-y-8">
            {/* About Section */}
            <section className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">About {vendor.name}</h2>
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">{vendor.longDescription}</p>
            </section>

            {/* Portfolio Section */}
            <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Portfolio</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {vendor.portfolio.map((img, index) => (
                        <div key={index} className="overflow-hidden rounded-lg shadow-md">
                            <img src={img} alt={`Portfolio ${index + 1}`} className="w-full h-full object-cover aspect-square transition-transform duration-300 hover:scale-110" />
                        </div>
                    ))}
                </div>
            </section>
        </main>
        
        {/* Reviews Sidebar */}
        <aside className="lg:col-span-1">
             <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 sticky top-28">
                 <h2 className="text-2xl font-bold text-gray-800 mb-4">Reviews</h2>
                 <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2">
                     {vendor.reviews.map(review => (
                         <div key={review.id} className="border-b border-gray-100 pb-4 last:border-b-0">
                             <div className="flex items-start space-x-3">
                                 <img src={review.avatar} alt={review.author} className="w-10 h-10 rounded-full object-cover" />
                                 <div>
                                     <p className="font-semibold text-gray-800">{review.author}</p>
                                     <div className="flex items-center space-x-2">
                                         <StarRating rating={review.rating} className="h-4 w-4"/>
                                         <span className="text-xs text-gray-400">{review.date}</span>
                                     </div>
                                 </div>
                             </div>
                             <p className="mt-2 text-gray-600 text-sm">{review.comment}</p>
                         </div>
                     ))}
                 </div>
             </div>
        </aside>
      </div>

      {isQuoteModalOpen && <QuoteRequestModal vendor={vendor} onClose={() => setIsQuoteModalOpen(false)} onSubmit={onQuoteRequest} />}
    </div>
  );
};

export default VendorProfilePage;
