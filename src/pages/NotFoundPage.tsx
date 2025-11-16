import React from 'react';
import Layout from '../components/layout/Layout';
import { Link } from '../lib/router';

const NotFoundPage: React.FC = () => (
  <Layout>
    <section className="text-center">
      <p className="text-sm uppercase tracking-[0.3em] text-white/60">404</p>
      <h1 className="mt-4 text-4xl font-semibold">This page is still being curated.</h1>
      <p className="mt-2 text-white/70">Head back home or explore the vendor marketplace.</p>
      <div className="mt-6 flex justify-center gap-4">
        <Link className="rounded-full bg-white px-6 py-3 font-semibold text-[#050507]" href="/">Back home</Link>
        <Link className="rounded-full border border-white/20 px-6 py-3 font-semibold" href="/find-vendor">Find vendors</Link>
      </div>
    </section>
  </Layout>
);

export default NotFoundPage;
