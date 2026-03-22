import type { EventRequest } from '../types';
import { DELAY_MS } from '../lib/constants';
import { eventRequestStorage } from '../lib/storage';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function createEventRequest(payload: Omit<EventRequest, 'id'>): Promise<EventRequest> {
  await delay(DELAY_MS.EXTRA_LONG);
  const request: EventRequest = {
    id: typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : `req-${Date.now()}`,
    ...payload
  };
  eventRequestStorage.add(request);
  return request;
}

export async function getRecentRequests(): Promise<EventRequest[]> {
  await delay(DELAY_MS.SHORT);
  const allRequests = eventRequestStorage.getAll();
  return allRequests.slice(0, 5);
}
