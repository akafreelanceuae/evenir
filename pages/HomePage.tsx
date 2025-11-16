import React, { useState } from 'react';
import { ServiceCategory, Vendor, AiEventPlan } from '../types';
import { SERVICE_CATEGORIES, VENDORS } from '../constants';
import { SearchIcon, DocumentTextIcon, CheckBadgeIcon, MusicNoteIcon, CameraIcon, CakeIcon, LocationMarkerIcon, VideoCameraIcon, SparklesIcon } from '../components/Icons';
import { getAiEventPlan } from '../services/geminiService';
import StarRating from '../components/StarRating';

interface HomePageProps {
  onSearch: (term: string, category: string) => void;
  onSelectCategory: (category: ServiceCategory) => void;
  onJoinAsVendor: () => void;
  onSelectVendor: (vendor: Vendor) => void;
}

const getIconForService = (title: string) => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes('dj') || lowerTitle.includes('music')) return <MusicNoteIcon className="w-8 h-8 text-indigo-500" />;
    if (lowerTitle.includes('photo')) return <CameraIcon className="w-8 h-8 text-indigo-500" />;
    if (lowerTitle.includes('cater') || lowerTitle.includes('food')) return <CakeIcon className="w-8 h-8 text-indigo-500" />;
    if (lowerTitle.includes('venu')) return <LocationMarkerIcon className="w-8 h-8 text-indigo-500" />;
    if (lowerTitle.includes('video')) return <VideoCameraIcon className="w-8 h-8 text-indigo-500" />;
    if (lowerTitle.includes('plan') || lowerTitle.includes('decor')) return <SparklesIcon className="w-8 h-8 text-indigo-500" />;
    return <DocumentTextIcon className="w-8 h-8 text-indigo-500" />;
};


const HomePage: React.FC<HomePageProps> = ({ onSearch, onSelectCategory, onJoinAsVendor, onSelectVendor }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiEventPlan, setAiEventPlan] = useState<AiEventPlan | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm, activeCategory);
  };
  
  const handleAiConcierge = async () => {
    if (!aiPrompt) return;
    setIsLoading(true);
    setAiEventPlan(null);

    const eventPlan = await getAiEventPlan(aiPrompt);
    setAiEventPlan(eventPlan);
    
    setIsLoading(false);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="text-center bg-white rounded-2xl shadow-lg p-8 md:p-16 mb-12 border border-gray-100">
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-800 tracking-tight">
          Find DJs, caterers, and event pros in Dubai.
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-500 max-w-2xl mx-auto">
          Discover and book top-rated vendors for your private party, wedding, or corporate event.
        </p>

        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="mt-8 max-w-2xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center bg-gray-100 rounded-full p-2 shadow-inner gap-2">
            <div className="relative flex-grow w-full">
              <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="What do you need? e.g., 'wedding photographer'"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-transparent border-none rounded-full py-3 pl-11 pr-4 text-gray-700 focus:ring-0"
              />
            </div>
            <button type="submit" className="w-full sm:w-auto bg-indigo-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105">
              Find a Vendor
            </button>
          </div>
        </form>
         <div className="mt-4">
            <button onClick={onJoinAsVendor} className="text-indigo-600 font-semibold hover:text-indigo-800 transition-colors">
              Are you a vendor? Join here
            </button>
          </div>
      </section>
      
      {/* AI Concierge Section */}
      <section className="mb-16">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 shadow-xl text-white text-center">
            <h2 className="text-3xl font-bold">AI Event Concierge</h2>
            <p className="mt-2 opacity-90 max-w-2xl mx-auto">
              Describe your event once — we’ll handle the basics for you. Our AI Information Center suggests all the key services you’ll need based on your request, including a short description, location, average price, vendor name, rating, and stock images. You’ll see a list of recommended vendors below, and you can always use the “+ Add service” button to add extra services or customize anything yourself.
            </p>
            <div className="mt-6 max-w-xl mx-auto flex flex-col sm:flex-row gap-2">
                <input
                    type="text"
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    placeholder="e.g., 'a birthday party for 50 people with music and food'"
                    className="w-full rounded-lg px-4 py-3 text-gray-800 bg-white focus:ring-2 focus:ring-purple-300 border-none"
                    disabled={isLoading}
                />
                <button 
                    onClick={handleAiConcierge}
                    disabled={isLoading || !aiPrompt}
                    className="bg-white text-indigo-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed flex items-center justify-center"
                >
                    {isLoading ? (
                        <svg className="animate-spin h-5 w-5 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    ) : 'Get Suggestions'}
                </button>
            </div>
        </div>
      </section>

      {/* AI Information Center Section */}
      {aiEventPlan && aiEventPlan.services.length > 0 && (
        <section className="mb-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800">AI Information Center</h2>
            <p className="mt-2 text-lg text-gray-500">Here's a suggested plan for your event. You can customize it as needed.</p>
          </div>
          <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {aiEventPlan.services.map((service, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 flex flex-col space-y-4 transition-all duration-300 hover:shadow-2xl hover:scale-105">
                <div className="flex items-center space-x-4">
                  <div className="bg-indigo-100 p-3 rounded-full">
                    {getIconForService(service.serviceTitle)}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{service.serviceTitle}</h3>
                    <div className="flex items-center text-xs mt-1">
                      <StarRating rating={service.rating} className="h-4 w-4" />
                      <span className="text-gray-500 ml-1.5">({service.rating}/5 est.)</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 flex-grow">{service.description}</p>
                <div className="text-sm space-y-2 pt-2 border-t border-gray-100">
                  <p><span className="font-semibold text-gray-700">Vendor:</span> {service.vendorName}</p>
                  <p><span className="font-semibold text-gray-700">Location:</span> {service.location}</p>
                  <p><span className="font-semibold text-gray-700">Est. Price:</span> AED {service.priceRangeAED[0]} - {service.priceRangeAED[1]}</p>
                </div>
                <button 
                  onClick={() => onSearch('', service.serviceTitle.replace(' Services', 's'))}
                  className="w-full mt-2 bg-indigo-50 text-indigo-700 px-4 py-2 rounded-md font-semibold hover:bg-indigo-100 transition-colors text-sm"
                >
                  Find {service.serviceTitle} &rarr;
                </button>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <button className="bg-indigo-100 text-indigo-700 font-semibold px-6 py-3 rounded-lg hover:bg-indigo-200 transition-colors">
              + Add service
            </button>
          </div>
        </section>
      )}

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 mb-12">
        <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800">How Evenir Works</h2>
            <p className="mt-2 text-lg text-gray-500">Your event, simplified in three easy steps.</p>
        </div>
        <div className="mt-12 grid md:grid-cols-3 gap-8 md:gap-12 max-w-5xl mx-auto">
            <div className="text-center p-6">
                <div className="flex items-center justify-center h-16 w-16 bg-indigo-100 rounded-full mx-auto">
                    <SearchIcon className="w-8 h-8 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold mt-6 text-gray-800">1. Tell Us What You Need</h3>
                <p className="text-gray-500 mt-2">Use our search to find the perfect vendors or post a general request to get multiple quotes.</p>
            </div>
            <div className="text-center p-6">
                <div className="flex items-center justify-center h-16 w-16 bg-indigo-100 rounded-full mx-auto">
                    <DocumentTextIcon className="w-8 h-8 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold mt-6 text-gray-800">2. Get Quotes from Vendors</h3>
                <p className="text-gray-500 mt-2">Receive custom quotes and messages directly from interested and available vendors.</p>
            </div>
            <div className="text-center p-6">
                 <div className="flex items-center justify-center h-16 w-16 bg-indigo-100 rounded-full mx-auto">
                    <CheckBadgeIcon className="w-8 h-8 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold mt-6 text-gray-800">3. Book and Review</h3>
                <p className="text-gray-500 mt-2">Compare offers, book the best fit, and leave a review after your event to help the community.</p>
            </div>
        </div>
      </section>

      {/* Categories Section */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-8">Browse by Category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICE_CATEGORIES.map((category) => {
            return (
                <div
                    key={category.id}
                    onClick={() => onSelectCategory(category)}
                    className={`group relative rounded-xl overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl`}
                >
                    <img src={category.image} alt={category.name} className="w-full h-64 object-cover" />
                    <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-60 transition-all duration-300"></div>
                    <div className="absolute bottom-0 left-0 p-6 text-white">
                        <category.icon className="w-8 h-8 opacity-80" />
                        <h3 className="text-2xl font-bold mt-2">{category.name}</h3>
                        <p className="opacity-90">{category.description}</p>
                    </div>
                </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default HomePage;