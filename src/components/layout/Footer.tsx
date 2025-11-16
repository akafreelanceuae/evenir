import React from 'react';

const Footer: React.FC = () => (
  <footer className="bg-[#0f0f1a] px-6 py-10 text-sm text-white/70">
    <div className="flex flex-wrap items-center justify-between gap-4">
      <p>Evenir © {new Date().getFullYear()} — Built for Dubai’s event innovators.</p>
      <div className="flex gap-4">
        <a className="hover:text-white" href="mailto:team@evenir.io">team@evenir.io</a>
        <a className="hover:text-white" href="#privacy">Privacy</a>
        <a className="hover:text-white" href="#terms">Terms</a>
      </div>
    </div>
  </footer>
);

export default Footer;
