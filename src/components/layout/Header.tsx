import React from 'react';
import { Link, useRouter } from '../../lib/router';

const Header: React.FC = () => {
  const router = useRouter();
  return (
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 px-6 py-4 text-white bg-[#0f0f1a]">
      <div className="flex items-center gap-2">
        <span className="text-xl font-semibold">Evenir</span>
        <span className="rounded-full border border-white/20 px-2 text-xs uppercase tracking-wide">beta</span>
      </div>
      <nav className="flex gap-6 text-sm">
        <Link className={`hover:text-teal-300 ${router.path === '/' ? 'text-teal-300' : ''}`} href="/">Home</Link>
        <Link className={`hover:text-teal-300 ${router.path === '/find-vendor' ? 'text-teal-300' : ''}`} href="/find-vendor">Find a vendor</Link>
        <Link className={`hover:text-teal-300 ${router.path === '/join-vendor' ? 'text-teal-300' : ''}`} href="/join-vendor">Join as vendor</Link>
      </nav>
      <div className="flex gap-3">
        <Link className="rounded-full border border-white/30 px-4 py-1 text-sm" href="/find-vendor">Request talent</Link>
        <Link className="rounded-full bg-white px-4 py-1 text-sm font-semibold text-[#0f0f1a]" href="/join-vendor">List services</Link>
      </div>
    </header>
  );
};

export default Header;
