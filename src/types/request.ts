import type { VendorCategory } from './concierge';

export interface EventRequest {
  id: string;
  eventType: string;
  date?: string;
  guests?: number;
  budgetMinAED?: number;
  budgetMaxAED?: number;
  location: string;
  notes: string;
  categoriesNeeded: VendorCategory[];
}
