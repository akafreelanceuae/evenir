import React from 'react';
import Layout from '../components/layout/Layout';
import HeroSection from '../components/home/HeroSection';
import CategoriesSection from '../components/home/CategoriesSection';
import AiConciergeSection from '../components/home/AiConciergeSection';
import HowItWorksSection from '../components/home/HowItWorksSection';
import FeaturedVendorsSection from '../components/home/FeaturedVendorsSection';

const HomePage: React.FC = () => (
  <Layout>
    <HeroSection />
    <CategoriesSection />
    <AiConciergeSection />
    <FeaturedVendorsSection />
    <HowItWorksSection />
  </Layout>
);

export default HomePage;
