export type VendorCategory =
  | 'DJ'
  | 'CATERING'
  | 'PHOTOGRAPHY'
  | 'VIDEO'
  | 'DECOR'
  | 'SOUND_LIGHTING'
  | 'OTHER';

export interface ConciergeSuggestion {
  id: string;
  serviceTitle: string;
  description: string;
  location: string;
  avgPriceRangeAED: string;
  suggestedVendorName: string;
  rating: number;
  ratingCount: number;
  stockImageDescription: string;
  category: VendorCategory;
}
