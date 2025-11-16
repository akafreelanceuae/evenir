import React, { useEffect, useState } from 'react';
import { getFeaturedVendors } from '../../services/vendorService';
import type { Vendor } from '../../types';
import { VendorCard } from '../vendors/VendorCard';

const FeaturedVendorsSection: React.FC = () => {
  const [vendors, setVendors] = useState<Vendor[]>([]);

  useEffect(() => {
    getFeaturedVendors().then(setVendors);
  }, []);

  return (
    <section>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Featured vendors</h2>
        <span className="text-sm text-white/60">Updated weekly by our curation team</span>
      </div>
      <div className="mt-6 grid gap-6 md:grid-cols-3">
        {vendors.map(vendor => (
          <VendorCard key={vendor.id} vendor={vendor} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedVendorsSection;
