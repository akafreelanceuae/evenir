import type { Vendor } from '../types/vendor';
import type { VendorCategory } from '../types/concierge';

const mockVendors: Vendor[] = [
  {
    id: 'v1',
    name: 'BeatWave DJ Services',
    companyName: 'BeatWave Events',
    categories: ['DJ', 'SOUND_LIGHTING'],
    location: 'Dubai Marina, Dubai',
    minPriceAED: 2000,
    rating: 4.8,
    ratingCount: 64,
    shortDescription: 'High-energy DJs for weddings, birthdays, and corporate events with full sound setup.',
    stockImageUrl: 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=900&q=80',
    isVerified: true
  },
  {
    id: 'v2',
    name: 'Golden Plate Catering',
    companyName: 'Golden Plate Catering LLC',
    categories: ['CATERING'],
    location: 'Business Bay, Dubai',
    minPriceAED: 150,
    rating: 4.6,
    ratingCount: 51,
    shortDescription: 'Buffet and plated menus for all occasions, including vegetarian and international cuisines.',
    stockImageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80',
    isVerified: true
  },
  {
    id: 'v3',
    name: 'LensCraft Photography',
    companyName: 'LensCraft Studio',
    categories: ['PHOTOGRAPHY'],
    location: 'Downtown Dubai, Dubai',
    minPriceAED: 1200,
    rating: 4.9,
    ratingCount: 72,
    shortDescription: 'Professional event photography capturing candid and posed moments.',
    stockImageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=80',
    isVerified: true
  },
  {
    id: 'v4',
    name: 'Light & Sound Pro',
    companyName: 'LSP Events',
    categories: ['SOUND_LIGHTING'],
    location: 'Al Barsha, Dubai',
    minPriceAED: 1800,
    rating: 4.5,
    ratingCount: 39,
    shortDescription: 'Audio and lighting solutions for small to medium events.',
    stockImageUrl: 'https://images.unsplash.com/photo-1470223991232-32aaa71f527a?auto=format&fit=crop&w=900&q=80',
    isVerified: true
  },
  {
    id: 'v5',
    name: 'Flora & Style Decor',
    companyName: 'Flora & Style',
    categories: ['DECOR'],
    location: 'Jumeirah, Dubai',
    minPriceAED: 2500,
    rating: 4.7,
    ratingCount: 28,
    shortDescription: 'Event decor and floral styling with custom themes.',
    stockImageUrl: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
    isVerified: true
  }
];

export interface VendorSearchFilters {
  category?: VendorCategory | 'ALL';
  query?: string;
  location?: string;
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function getRecommendedVendorsByCategories(
  categories: VendorCategory[],
  limitPerCategory = 2
): Promise<Vendor[]> {
  await delay(150);

  if (!categories.length) {
    return mockVendors.slice(0, 3);
  }

  const result: Vendor[] = [];

  categories.forEach(category => {
    const matches = mockVendors.filter(vendor => vendor.categories.includes(category));
    matches.slice(0, limitPerCategory).forEach(vendor => {
      if (!result.find(existing => existing.id === vendor.id)) {
        result.push(vendor);
      }
    });
  });

  return result;
}

export async function searchVendors(filters: VendorSearchFilters = {}): Promise<Vendor[]> {
  await delay(200);
  const normalizedQuery = filters.query?.toLowerCase() ?? '';
  const normalizedLocation = filters.location?.toLowerCase() ?? '';

  return mockVendors.filter(vendor => {
    const matchesCategory =
      !filters.category ||
      filters.category === 'ALL' ||
      vendor.categories.includes(filters.category);

    const matchesQuery = !normalizedQuery ||
      vendor.name.toLowerCase().includes(normalizedQuery) ||
      vendor.shortDescription.toLowerCase().includes(normalizedQuery);

    const matchesLocation = !normalizedLocation ||
      vendor.location.toLowerCase().includes(normalizedLocation);

    return matchesCategory && matchesQuery && matchesLocation;
  });
}

export async function getFeaturedVendors(): Promise<Vendor[]> {
  await delay(150);
  return mockVendors.slice(0, 3);
}

export async function getVendorById(id: string): Promise<Vendor | undefined> {
  await delay(150);
  return mockVendors.find(vendor => vendor.id === id);
}
