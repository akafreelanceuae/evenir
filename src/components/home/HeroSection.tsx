import React from 'react';
import { HOMEPAGE_COPY } from '../../constants';
import { Link } from '../../lib/router';

const HeroSection: React.FC = () => (
  <section className="rounded-3xl bg-gradient-to-br from-[#101026] via-[#1a1a3d] to-[#07070f] p-10 text-white">
    <p className="text-sm uppercase tracking-[0.3em] text-white/60">Dubai • Riyadh • Doha</p>
    <h1 className="mt-6 text-4xl font-semibold leading-tight md:text-5xl">
      {HOMEPAGE_COPY.heroTitle}
    </h1>
    <p className="mt-4 max-w-3xl text-lg text-white/80">{HOMEPAGE_COPY.heroSubtitle}</p>
    <div className="mt-8 flex flex-wrap gap-4">
      <Link className="rounded-full bg-teal-400 px-6 py-3 font-semibold text-[#050507]" href="/find-vendor">
        {HOMEPAGE_COPY.ctaFindVendors}
      </Link>
      <Link className="rounded-full border border-white/30 px-6 py-3 font-semibold" href="/join-vendor">
        {HOMEPAGE_COPY.ctaJoinVendors}
      </Link>
    </div>
  </section>
);

export default HeroSection;
