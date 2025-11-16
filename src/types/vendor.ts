import type { VendorCategory } from './concierge';

export interface Vendor {
  id: string;
  name: string;
  companyName?: string;
  categories: VendorCategory[];
  location: string;
  minPriceAED?: number;
  rating?: number;
  ratingCount?: number;
  shortDescription: string;
  stockImageUrl: string;
  isVerified: boolean;
}
