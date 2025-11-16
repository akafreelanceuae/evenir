import React from 'react';
import type { Vendor } from '../../types';
import { VendorCard } from './VendorCard';

interface VendorListProps {
  vendors: Vendor[];
}

const VendorList: React.FC<VendorListProps> = ({ vendors }) => (
  <div className="grid gap-6 md:grid-cols-2">
    {vendors.map(vendor => (
      <VendorCard key={vendor.id} vendor={vendor} />
    ))}
    {vendors.length === 0 && (
      <p className="text-white/60">No vendors match your filters yet. Try another category.</p>
    )}
  </div>
);

export default VendorList;
