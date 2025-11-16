import type { EventRequest } from '../types';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
const requestLog: EventRequest[] = [];

export async function createEventRequest(payload: Omit<EventRequest, 'id'>): Promise<EventRequest> {
  await delay(300);
  const request: EventRequest = {
    id: typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : `req-${Date.now()}`,
    ...payload
  };
  requestLog.unshift(request);
  return request;
}

export async function getRecentRequests(): Promise<EventRequest[]> {
  await delay(120);
  return requestLog.slice(0, 5);
}
