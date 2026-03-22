import React from 'react';
import type { Vendor } from '../../types';

interface VendorCardProps {
  vendor: Vendor;
}

export const VendorCard: React.FC<VendorCardProps> = ({ vendor }) => {
  const {
    name,
    companyName,
    location,
    minPriceAED,
    rating,
    ratingCount,
    shortDescription,
    stockImageUrl,
    isVerified,
    categories
  } = vendor;

  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white">
      <div className="relative h-40 overflow-hidden">
        <img
          src={stockImageUrl}
          alt={name}
          className="h-full w-full object-cover"
          loading="lazy"
        />
        {isVerified && (
          <div className="absolute left-2 top-2 rounded-full bg-green-500/90 px-2.5 py-1 text-xs text-white">
            Verified
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1.5 p-3">
        <div className="text-sm font-semibold">{name}</div>
        {companyName && (
          <div className="text-xs text-gray-500">{companyName}</div>
        )}
        <div className="text-xs text-gray-500">
          {location} • {categories.join(', ')}
        </div>
        <div className="mt-1 text-xs text-gray-700">
          {shortDescription}
        </div>
        <div className="mt-2 flex items-center justify-between">
          <div className="text-xs font-medium">
            {minPriceAED ? `From AED ${minPriceAED}` : 'Pricing on request'}
          </div>
          {rating && (
            <div className="text-xs text-gray-500">
              ⭐ {rating.toFixed(1)} ({ratingCount ?? 0})
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
