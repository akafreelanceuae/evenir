export interface ServiceCategory {
  id: string;
  name: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  image: string;
  description: string;
}

export interface Review {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Vendor {
  id: string;
  name: string;
  category: string;
  bio: string;
  longDescription: string;
  location: string;
  pricingRange: [number, number];
  portfolio: string[];
  reviews: Review[];
  rating: number;
  profileImage: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string; // Made optional for safety, but required for login simulation
  role: 'organizer' | 'vendor';
  profilePhoto: string;
  vendorProfileId?: string; // Links to a Vendor ID if role is 'vendor'
}

export type NewUser = Omit<User, 'id'>;

export interface QuoteResponse {
  id: string;
  vendorId: string;
  priceProposal: number;
  message: string;
  timestamp: string;
}

export interface Message {
  id: string;
  senderId: string; // Will be a User ID
  text: string;
  timestamp: string;
}

export interface QuoteRequest {
  id: string;
  organizerId: string;
  vendorId: string;
  eventType: string;
  date: string;
  budget?: number;
  details: string;
  status: 'pending' | 'responded' | 'booked' | 'declined';
  responses: QuoteResponse[];
  messages: Message[];
}

export interface Booking {
  id: string;
  vendorId: string;
  organizerId: string;
  quoteRequestId: string;
  eventDate: string;
  status: 'confirmed' | 'completed' | 'cancelled';
  paymentStatus: 'pending' | 'paid';
}

export interface AiSuggestedService {
  serviceTitle: string;
  description: string;
  location: string;
  priceRangeAED: [number, number];
  vendorName: string; // Placeholder or real
  rating: number;
  imageSuggestion: string; // Description for a stock image
}

export interface AiEventPlan {
  services: AiSuggestedService[];
}
