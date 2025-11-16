import type { VendorCategory } from '../types/concierge';

export const VENDOR_CATEGORIES: { id: VendorCategory; label: string; description: string }[] = [
  { id: 'DJ', label: 'DJ & Music', description: 'Resident DJs, live bands, and MCs' },
  { id: 'CATERING', label: 'Catering', description: 'Boutique menus, live stations, and premium desserts' },
  { id: 'PHOTOGRAPHY', label: 'Photography', description: 'Photographers, videographers, and content crews' },
  { id: 'DECOR', label: 'Décor & Styling', description: 'Stage builds, florals, props, and furniture' },
  { id: 'SOUND_LIGHTING', label: 'Sound & Lighting', description: 'Concert-level production and rentals' },
  { id: 'OTHER', label: 'Specialty Acts', description: 'Fire shows, magicians, immersive performers' }
];

export const HOMEPAGE_COPY = {
  heroTitle: 'Dubai’s curated marketplace for event talent.',
  heroSubtitle: 'Describe your event once. Evenir finds vetted vendors, negotiates quotes, and keeps every detail in one workspace.',
  ctaFindVendors: 'Find vendors',
  ctaJoinVendors: 'Join as a vendor'
};

export const HOW_IT_WORKS_STEPS = [
  {
    title: 'Share your brief',
    description: 'Tell the AI concierge the vibe, date, guest count, and ballpark budget.'
  },
  {
    title: 'Compare curated vendors',
    description: 'Get verified profiles, sample work, and transparent pricing in minutes.'
  },
  {
    title: 'Book with confidence',
    description: 'Secure contracts, track payments, and collaborate with your crew in one place.'
  }
];
