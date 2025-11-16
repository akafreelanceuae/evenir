import React, { useState } from 'react';
import { getConciergeSuggestions, type EventRequest } from '../../services/aiConciergeService';
import { getRecommendedVendorsByCategories } from '../../services/vendorService';
import type { ConciergeSuggestion, VendorCategory } from '../../types/concierge';
import type { Vendor } from '../../types/vendor';
import { VendorCard } from '../vendors/VendorCard';

interface CustomService {
  id: string;
  serviceTitle: string;
  description: string;
}

const AiConciergeSection: React.FC = () => {
  const [eventDescription, setEventDescription] = useState('');
  const [eventLocation, setEventLocation] = useState('Dubai, UAE');
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<ConciergeSuggestion[]>([]);
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [customServices, setCustomServices] = useState<CustomService[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    const trimmed = eventDescription.trim();
    if (!trimmed) {
      setError('Please describe your event first.');
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      const request: EventRequest = {
        description: trimmed,
        location: eventLocation
      };

      const aiSuggestions = await getConciergeSuggestions(request);
      setSuggestions(aiSuggestions);

      const categories: VendorCategory[] = Array.from(
        new Set(aiSuggestions.map(suggestion => suggestion.category))
      );

      const recommended = await getRecommendedVendorsByCategories(categories);
      setVendors(recommended);
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddCustomService = () => {
    const id = `custom-${Date.now()}`;
    setCustomServices(prev => [
      ...prev,
      {
        id,
        serviceTitle: '',
        description: ''
      }
    ]);
  };

  const handleCustomServiceChange = (id: string, field: keyof CustomService, value: string) => {
    setCustomServices(prev => prev.map(service => (service.id === id ? { ...service, [field]: value } : service)));
  };

  const handleRemoveCustomService = (id: string) => {
    setCustomServices(prev => prev.filter(service => service.id !== id));
  };

  return (
    <section style={{ padding: '32px 0' }}>
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 16px' }}>
        <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 8 }}>AI Event Concierge</h2>
        <p style={{ fontSize: 14, color: '#6b7280', marginBottom: 16 }}>
          Describe your event once — we’ll suggest all the key services you’ll likely need. You can then add or adjust services
          yourself.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
          <label style={{ fontSize: 13, fontWeight: 500 }}>Event description</label>
          <textarea
            value={eventDescription}
            onChange={event => setEventDescription(event.target.value)}
            placeholder="Example: Wedding for 120 guests in Dubai Marina, evening, modern style, want DJ, simple decor, and buffet catering."
            rows={3}
            style={{
              width: '100%',
              borderRadius: 8,
              border: '1px solid #d1d5db',
              padding: 10,
              fontSize: 14,
              resize: 'vertical'
            }}
          />

          <label style={{ fontSize: 13, fontWeight: 500 }}>Event location (city/area)</label>
          <input
            type="text"
            value={eventLocation}
            onChange={event => setEventLocation(event.target.value)}
            placeholder="Dubai, UAE"
            style={{
              width: '100%',
              borderRadius: 8,
              border: '1px solid #d1d5db',
              padding: 8,
              fontSize: 14
            }}
          />

          <button
            onClick={handleGenerate}
            disabled={isLoading}
            style={{
              marginTop: 8,
              alignSelf: 'flex-start',
              borderRadius: 999,
              padding: '8px 18px',
              border: 'none',
              cursor: 'pointer',
              backgroundColor: isLoading ? '#9ca3af' : '#111827',
              color: '#fff',
              fontSize: 14,
              fontWeight: 500
            }}
          >
            {isLoading ? 'Generating...' : 'Generate plan'}
          </button>

          {error && <div style={{ color: '#b91c1c', fontSize: 13, marginTop: 4 }}>{error}</div>}
        </div>

        {(suggestions.length > 0 || customServices.length > 0) && (
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: 12,
              border: '1px solid #e5e7eb',
              padding: 16,
              marginBottom: 24,
              boxShadow: '0 4px 10px rgba(15, 23, 42, 0.04)'
            }}
          >
            <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>Event Information Center</h3>
            <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 12 }}>
              Based on your request, here are the core services we recommend. Each item includes a short description, location,
              estimated price range, a sample vendor and rating, plus a stock image suggestion. You can also add your own custom services below.
            </p>

            {suggestions.map(suggestion => (
              <div
                key={suggestion.id}
                style={{
                  borderTop: '1px solid #e5e7eb',
                  paddingTop: 10,
                  marginTop: 10,
                  display: 'grid',
                  gridTemplateColumns: '2fr 1fr',
                  gap: 8
                }}
              >
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{suggestion.serviceTitle}</div>
                  <div style={{ fontSize: 13, color: '#4b5563', marginTop: 4 }}>{suggestion.description}</div>
                  <div
                    style={{
                      fontSize: 12,
                      color: '#6b7280',
                      marginTop: 6,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 2
                    }}
                  >
                    <span>Location: {suggestion.location}</span>
                    <span>Avg price: {suggestion.avgPriceRangeAED} (estimate)</span>
                    <span>
                      Vendor example: {suggestion.suggestedVendorName} • ⭐ {suggestion.rating.toFixed(1)} ({suggestion.ratingCount} reviews)
                    </span>
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 12, color: '#6b7280', fontWeight: 500 }}>Stock image suggestion</div>
                  <div style={{ fontSize: 12, color: '#4b5563', marginTop: 4 }}>{suggestion.stockImageDescription}</div>
                </div>
              </div>
            ))}

            {customServices.length > 0 && (
              <div style={{ marginTop: 12 }}>
                <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: 10, marginTop: 10 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 6 }}>Your custom services</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {customServices.map(service => (
                      <div
                        key={service.id}
                        style={{
                          padding: 8,
                          borderRadius: 8,
                          border: '1px dashed #d1d5db',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 6
                        }}
                      >
                        <input
                          type="text"
                          placeholder="Service title (e.g. Kids entertainer)"
                          value={service.serviceTitle}
                          onChange={event => handleCustomServiceChange(service.id, 'serviceTitle', event.target.value)}
                          style={{
                            borderRadius: 6,
                            border: '1px solid #d1d5db',
                            padding: 6,
                            fontSize: 13
                          }}
                        />
                        <textarea
                          placeholder="Short description of what this service will cover."
                          rows={2}
                          value={service.description}
                          onChange={event => handleCustomServiceChange(service.id, 'description', event.target.value)}
                          style={{
                            borderRadius: 6,
                            border: '1px solid #d1d5db',
                            padding: 6,
                            fontSize: 13,
                            resize: 'vertical'
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveCustomService(service.id)}
                          style={{
                            alignSelf: 'flex-start',
                            borderRadius: 999,
                            padding: '4px 10px',
                            border: 'none',
                            backgroundColor: '#f3f4f6',
                            color: '#6b7280',
                            fontSize: 12,
                            cursor: 'pointer'
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <button
              type="button"
              onClick={handleAddCustomService}
              style={{
                marginTop: 12,
                borderRadius: 999,
                padding: '6px 14px',
                border: '1px dashed #9ca3af',
                backgroundColor: '#f9fafb',
                fontSize: 13,
                cursor: 'pointer'
              }}
            >
              + Add service
            </button>
          </div>
        )}

        {vendors.length > 0 && (
          <div>
            <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>Recommended vendors for your event</h3>
            <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 12 }}>
              These vendors match the services suggested above. You can open each profile to see more details, pricing, and reviews.
            </p>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: 16
              }}
            >
              {vendors.map(vendor => (
                <VendorCard key={vendor.id} vendor={vendor} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default AiConciergeSection;
