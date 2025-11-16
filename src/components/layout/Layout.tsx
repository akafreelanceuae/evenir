import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => (
  <div className="min-h-screen bg-[#050507] text-white">
    <Header />
    <main className="mx-auto flex max-w-6xl flex-col gap-16 px-6 py-12">
      {children}
    </main>
    <Footer />
  </div>
);

export default Layout;
