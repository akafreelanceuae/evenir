
import React, { useState } from 'react';
import { Vendor } from '../types';
import { SERVICE_CATEGORIES } from '../constants';
import StarRating from '../components/StarRating';
import { LocationMarkerIcon, SearchIcon } from '../components/Icons';

interface VendorListPageProps {
  vendors: Vendor[];
  onSelectVendor: (vendor: Vendor) => void;
  initialCategory: string;
  initialSearchTerm: string;
  onFilterChange: (term: string, category: string) => void;
}

const VendorCard: React.FC<{ vendor: Vendor; onSelect: () => void; }> = ({ vendor, onSelect }) => {
    return (
        <div onClick={onSelect} className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group">
            <div className="relative">
                <img className="h-48 w-full object-cover" src={vendor.portfolio[0]} alt={vendor.name} />
                 <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-gray-800">{vendor.category}</div>
            </div>
            <div className="p-6">
                <div className="flex items-center space-x-4">
                     <img className="h-16 w-16 rounded-full object-cover ring-2 ring-white" src={vendor.profileImage} alt={`${vendor.name} profile`} />
                    <div>
                        <div className="uppercase tracking-wide text-sm text-indigo-600 font-semibold">{vendor.name}</div>
                        <div className="flex items-center mt-1">
                            <StarRating rating={vendor.rating} className="h-4 w-4" />
                            <span className="text-xs text-gray-500 ml-2">{vendor.rating.toFixed(1)} ({vendor.reviews.length} reviews)</span>
                        </div>
                    </div>
                </div>
                <p className="mt-4 text-gray-500 text-sm leading-relaxed">{vendor.bio}</p>
                <div className="mt-4 flex items-center text-sm text-gray-500">
                    <LocationMarkerIcon className="h-4 w-4 mr-1 text-gray-400" />
                    {vendor.location}
                </div>
            </div>
        </div>
    );
};


const VendorListPage: React.FC<VendorListPageProps> = ({ vendors, onSelectVendor, initialCategory, initialSearchTerm, onFilterChange }) => {
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [activeCategory, setActiveCategory] = useState(initialCategory);

  const handleFilterChange = (term: string, category: string) => {
    setSearchTerm(term);
    setActiveCategory(category);
    onFilterChange(term, category);
  }

  return (
    <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
      {/* Filters Sidebar */}
      <aside className="w-full md:w-1/4 lg:w-1/5">
        <h2 className="text-xl font-bold mb-4">Filters</h2>
        <div className="space-y-6">
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-700">Search</label>
            <div className="mt-1 relative">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                    type="text" 
                    id="search"
                    placeholder="Keywords..."
                    value={searchTerm}
                    onChange={(e) => handleFilterChange(e.target.value, activeCategory)}
                    className="w-full border-gray-300 rounded-md shadow-sm pl-10 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                />
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">Category</h3>
            <ul className="mt-2 space-y-1">
              {['All', ...SERVICE_CATEGORIES.map(c => c.name)].map(category => (
                <li key={category}>
                  <button
                    onClick={() => handleFilterChange(searchTerm, category)}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${activeCategory === category ? 'bg-indigo-100 text-indigo-700 font-semibold' : 'text-gray-600 hover:bg-gray-100'}`}
                  >
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </aside>

      {/* Vendor List */}
      <main className="flex-1">
        <h1 className="text-3xl font-bold mb-6">
            {activeCategory === 'All' ? 'All Vendors' : activeCategory} 
            {searchTerm && <span className="text-gray-500 font-normal"> for "{searchTerm}"</span>}
        </h1>
        {vendors.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                {vendors.map(vendor => (
                <VendorCard key={vendor.id} vendor={vendor} onSelect={() => onSelectVendor(vendor)} />
                ))}
            </div>
        ) : (
            <div className="text-center py-16 px-6 bg-gray-100 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-800">No Vendors Found</h3>
                <p className="text-gray-500 mt-2">Try adjusting your search or filters to find what you're looking for.</p>
            </div>
        )}
      </main>
    </div>
  );
};

export default VendorListPage;
