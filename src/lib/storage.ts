import type { EventRequest } from '../types';
import { STORAGE_KEYS } from './constants';

// Storage utility functions with error handling
export const storage = {
  get: <T>(key: string, defaultValue: T): T => {
    try {
      if (typeof window === 'undefined') return defaultValue;
      const item = localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : defaultValue;
    } catch (error) {
      console.error(`Error reading from localStorage (${key}):`, error);
      return defaultValue;
    }
  },

  set: <T>(key: string, value: T): boolean => {
    try {
      if (typeof window === 'undefined') return false;
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Error writing to localStorage (${key}):`, error);
      return false;
    }
  },

  remove: (key: string): boolean => {
    try {
      if (typeof window === 'undefined') return false;
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing from localStorage (${key}):`, error);
      return false;
    }
  }
};

// Event requests persistence
export const eventRequestStorage = {
  getAll: (): EventRequest[] => {
    return storage.get<EventRequest[]>(STORAGE_KEYS.EVENT_REQUESTS, []);
  },

  add: (request: EventRequest): boolean => {
    const requests = eventRequestStorage.getAll();
    requests.unshift(request);
    // Keep only last 50 requests
    const limited = requests.slice(0, 50);
    return storage.set(STORAGE_KEYS.EVENT_REQUESTS, limited);
  },

  clear: (): boolean => {
    return storage.remove(STORAGE_KEYS.EVENT_REQUESTS);
  }
};

// Vendor signup persistence
export interface VendorSignup {
  id: string;
  name: string;
  company: string;
  email: string;
  services: string;
  averageBudget: string;
  certifications: string;
  submittedAt: string;
}

export const vendorSignupStorage = {
  getAll: (): VendorSignup[] => {
    return storage.get<VendorSignup[]>(STORAGE_KEYS.VENDOR_SIGNUPS, []);
  },

  add: (signup: Omit<VendorSignup, 'id' | 'submittedAt'>): boolean => {
    const signups = vendorSignupStorage.getAll();
    const newSignup: VendorSignup = {
      ...signup,
      id: typeof crypto !== 'undefined' && 'randomUUID' in crypto 
        ? crypto.randomUUID() 
        : `signup-${Date.now()}`,
      submittedAt: new Date().toISOString()
    };
    signups.unshift(newSignup);
    // Keep only last 100 signups
    const limited = signups.slice(0, 100);
    return storage.set(STORAGE_KEYS.VENDOR_SIGNUPS, limited);
  }
};

