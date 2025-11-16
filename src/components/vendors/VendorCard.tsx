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
    <div
      className="vendor-card"
      style={{
        borderRadius: '12px',
        border: '1px solid #e5e7eb',
        overflow: 'hidden',
        backgroundColor: '#ffffff',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <div style={{ position: 'relative', height: 160, overflow: 'hidden' }}>
        <img
          src={stockImageUrl}
          alt={name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        {isVerified && (
          <div
            style={{
              position: 'absolute',
              top: 8,
              left: 8,
              backgroundColor: 'rgba(34, 197, 94, 0.9)',
              color: '#fff',
              borderRadius: '999px',
              padding: '4px 10px',
              fontSize: 12
            }}
          >
            Verified
          </div>
        )}
      </div>

      <div style={{ padding: '12px 14px', flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={{ fontWeight: 600, fontSize: 14 }}>{name}</div>
        {companyName && (
          <div style={{ fontSize: 12, color: '#6b7280' }}>{companyName}</div>
        )}
        <div style={{ fontSize: 12, color: '#6b7280' }}>
          {location} • {categories.join(', ')}
        </div>
        <div style={{ fontSize: 12, color: '#374151', marginTop: 4 }}>
          {shortDescription}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, alignItems: 'center' }}>
          <div style={{ fontSize: 12, fontWeight: 500 }}>
            {minPriceAED ? `From AED ${minPriceAED}` : 'Pricing on request'}
          </div>
          {rating && (
            <div style={{ fontSize: 12, color: '#6b7280' }}>
              ⭐ {rating.toFixed(1)} ({ratingCount ?? 0})
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
