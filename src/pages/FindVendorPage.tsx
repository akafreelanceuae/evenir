import React, { useEffect, useState } from 'react';
import Layout from '../components/layout/Layout';
import VendorFilterBar, { VendorFilters } from '../components/vendors/VendorFilterBar';
import VendorList from '../components/vendors/VendorList';
import RequestForm from '../components/requests/RequestForm';
import RequestSummary from '../components/requests/RequestSummary';
import { searchVendors } from '../services/vendorService';
import { getRecentRequests } from '../services/requestService';
import type { EventRequest, Vendor } from '../types';

const defaultFilters: VendorFilters = {
  category: 'ALL',
  query: '',
  location: ''
};

const FindVendorPage: React.FC = () => {
  const [filters, setFilters] = useState<VendorFilters>(defaultFilters);
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [recentRequests, setRecentRequests] = useState<EventRequest[]>([]);

  useEffect(() => {
    setIsLoading(true);
    searchVendors({
      category: filters.category === 'ALL' ? undefined : filters.category,
      query: filters.query,
      location: filters.location
    }).then(result => {
      setVendors(result);
      setIsLoading(false);
    });
  }, [filters]);

  useEffect(() => {
    getRecentRequests().then(setRecentRequests);
  }, []);

  const handleRequestSuccess = (request: EventRequest) => {
    setRecentRequests(prev => [request, ...prev].slice(0, 3));
  };

  return (
    <Layout>
      <section>
        <p className="text-sm uppercase tracking-[0.3em] text-white/60">Marketplace</p>
        <h1 className="mt-4 text-4xl font-semibold">Find verified event partners</h1>
        <p className="mt-2 text-white/70">Search curated vendors across entertainment, production, culinary, and décor verticals.</p>
      </section>
      <VendorFilterBar filters={filters} onFiltersChange={setFilters} />
      {isLoading ? (
        <p className="text-white/60">Loading vendors...</p>
      ) : (
        <VendorList vendors={vendors} />
      )}
      <section className="grid gap-8 rounded-3xl border border-white/10 bg-white/5 p-6 md:grid-cols-2">
        <div>
          <h2 className="text-2xl font-semibold">Submit a consolidated brief</h2>
          <p className="mt-2 text-white/70">We’ll route it to vendors that match your scope within hours.</p>
          <RequestForm onSuccess={handleRequestSuccess} />
        </div>
        <div>
          <h3 className="text-lg font-semibold">Recent requests</h3>
          <div className="mt-4 flex flex-col gap-4">
            {recentRequests.length === 0 && <p className="text-white/60">Your brief will appear here once submitted.</p>}
            {recentRequests.map(request => (
              <RequestSummary key={request.id} request={request} />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default FindVendorPage;
