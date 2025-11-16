import React from 'react';
import type { EventRequest } from '../../types';

interface RequestSummaryProps {
  request: EventRequest;
}

const RequestSummary: React.FC<RequestSummaryProps> = ({ request }) => (
  <article className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/80">
    <p className="text-xs uppercase tracking-wide text-white/60">{request.eventType}</p>
    <p className="text-lg font-semibold">{request.location}</p>
    <p className="text-white/60">Guests: {request.guests ?? 'TBD'}</p>
    <p className="text-white/60">
      Budget: {request.budgetMinAED ? `AED ${request.budgetMinAED.toLocaleString()}` : 'Custom'} — {request.budgetMaxAED ? `AED ${request.budgetMaxAED.toLocaleString()}` : 'Custom'}
    </p>
    <p className="mt-2 text-white/60">{request.notes}</p>
  </article>
);

export default RequestSummary;
