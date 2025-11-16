import React from 'react';
import { VENDOR_CATEGORIES } from '../../constants';
import type { VendorCategory } from '../../types';

export interface VendorFilters {
  category: VendorCategory | 'ALL';
  query: string;
  location: string;
}

interface VendorFilterBarProps {
  filters: VendorFilters;
  onFiltersChange: (filters: VendorFilters) => void;
}

const VendorFilterBar: React.FC<VendorFilterBarProps> = ({ filters, onFiltersChange }) => {
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    onFiltersChange({ ...filters, [name]: value } as VendorFilters);
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="flex flex-wrap gap-2">
        <button
          className={`rounded-full px-4 py-2 text-sm ${filters.category === 'ALL' ? 'bg-teal-400 text-[#050507]' : 'bg-white/5'}`}
          onClick={() => onFiltersChange({ ...filters, category: 'ALL' })}
        >
          All
        </button>
        {VENDOR_CATEGORIES.map(category => (
          <button
            key={category.id}
            className={`rounded-full px-4 py-2 text-sm ${filters.category === category.id ? 'bg-teal-400 text-[#050507]' : 'bg-white/5'}`}
            onClick={() => onFiltersChange({ ...filters, category: category.id })}
          >
            {category.label}
          </button>
        ))}
      </div>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <input
          className="rounded-2xl border border-white/15 bg-transparent px-4 py-3"
          name="query"
          onChange={handleInput}
          placeholder="Search by name or keyword"
          value={filters.query}
        />
        <input
          className="rounded-2xl border border-white/15 bg-transparent px-4 py-3"
          name="location"
          onChange={handleInput}
          placeholder="Preferred area"
          value={filters.location}
        />
      </div>
    </div>
  );
};

export default VendorFilterBar;
