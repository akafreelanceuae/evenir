// Application constants
export const DELAY_MS = {
  SHORT: 120,
  MEDIUM: 150,
  LONG: 200,
  EXTRA_LONG: 300
} as const;

export const STORAGE_KEYS = {
  EVENT_REQUESTS: 'evenir_event_requests',
  VENDOR_SIGNUPS: 'evenir_vendor_signups'
} as const;

export const VALIDATION = {
  MIN_GUESTS: 1,
  MAX_GUESTS: 10000,
  MIN_BUDGET: 0,
  MAX_BUDGET: 1000000,
  MIN_NAME_LENGTH: 2,
  MAX_NAME_LENGTH: 100,
  MIN_DESCRIPTION_LENGTH: 10,
  MAX_DESCRIPTION_LENGTH: 1000
} as const;

