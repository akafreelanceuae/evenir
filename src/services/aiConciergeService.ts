import type { ConciergeSuggestion, VendorCategory } from '../types/concierge';

export interface EventRequest {
  id?: string;
  description: string;
  location: string;
  guests?: number;
  budgetMinAED?: number;
  budgetMaxAED?: number;
}

function guessCategoriesFromText(text: string): VendorCategory[] {
  const lower = text.toLowerCase();
  const cats: VendorCategory[] = [];

  if (lower.includes('wedding') || lower.includes('dj') || lower.includes('music')) {
    cats.push('DJ', 'SOUND_LIGHTING');
  }
  if (lower.includes('food') || lower.includes('dinner') || lower.includes('catering')) {
    cats.push('CATERING');
  }
  if (lower.includes('photo') || lower.includes('camera')) {
    cats.push('PHOTOGRAPHY');
  }
  if (lower.includes('video') || lower.includes('film')) {
    cats.push('VIDEO');
  }
  if (lower.includes('decor') || lower.includes('flowers') || lower.includes('balloon')) {
    cats.push('DECOR');
  }

  if (cats.length === 0) cats.push('OTHER');

  return Array.from(new Set(cats));
}

export async function getConciergeSuggestions(
  request: EventRequest
): Promise<ConciergeSuggestion[]> {
  const categories = guessCategoriesFromText(request.description);
  const baseLocation = request.location || 'Dubai, UAE';

  const suggestions: ConciergeSuggestion[] = categories.map((category, index) => {
    const id = `${category}-${index}`;

    switch (category) {
      case 'DJ':
        return {
          id,
          category: 'DJ',
          serviceTitle: 'Professional DJ & MC',
          description: 'A professional DJ to handle your event music, announcements, and crowd energy from start to finish.',
          location: baseLocation,
          avgPriceRangeAED: 'AED 1,800–3,500',
          suggestedVendorName: 'Sample DJ Vendor',
          rating: 4.8,
          ratingCount: 56,
          stockImageDescription: 'DJ booth with colorful lights and dancing crowd in a modern venue.'
        };
      case 'CATERING':
        return {
          id,
          category: 'CATERING',
          serviceTitle: 'Full-Service Catering',
          description: 'Buffet or plated menu tailored to your guest count and dietary preferences.',
          location: baseLocation,
          avgPriceRangeAED: 'AED 120–220 per person',
          suggestedVendorName: 'Sample Catering Vendor',
          rating: 4.6,
          ratingCount: 42,
          stockImageDescription: 'Elegant buffet setup with chafing dishes and decorated tables.'
        };
      case 'PHOTOGRAPHY':
        return {
          id,
          category: 'PHOTOGRAPHY',
          serviceTitle: 'Event Photography',
          description: 'A professional photographer to capture key moments, group photos, and candid shots.',
          location: baseLocation,
          avgPriceRangeAED: 'AED 1,200–2,500',
          suggestedVendorName: 'Sample Photography Vendor',
          rating: 4.9,
          ratingCount: 73,
          stockImageDescription: 'Photographer taking photos at an indoor event with guests smiling.'
        };
      case 'DECOR':
        return {
          id,
          category: 'DECOR',
          serviceTitle: 'Event Decor & Styling',
          description: 'Decor, flowers, and styling matching your theme and colors, from backdrop to table settings.',
          location: baseLocation,
          avgPriceRangeAED: 'AED 2,000–4,500',
          suggestedVendorName: 'Sample Decor Vendor',
          rating: 4.7,
          ratingCount: 31,
          stockImageDescription: 'Decorated event venue with floral arrangements and elegant lighting.'
        };
      case 'SOUND_LIGHTING':
        return {
          id,
          category: 'SOUND_LIGHTING',
          serviceTitle: 'Sound & Lighting Setup',
          description: 'Professional sound system and lighting rig for speeches, music, and ambience.',
          location: baseLocation,
          avgPriceRangeAED: 'AED 1,500–3,000',
          suggestedVendorName: 'Sample AV Vendor',
          rating: 4.5,
          ratingCount: 24,
          stockImageDescription: 'Stage lighting and speakers setup at a medium-sized event.'
        };
      default:
        return {
          id,
          category: 'OTHER',
          serviceTitle: 'General Event Support',
          description: 'Extra staff or custom services to support your event operations.',
          location: baseLocation,
          avgPriceRangeAED: 'AED 800–2,000',
          suggestedVendorName: 'Sample Event Support Vendor',
          rating: 4.4,
          ratingCount: 18,
          stockImageDescription: 'Event staff helping guests inside a small venue.'
        };
    }
  });

  return suggestions;
}
