import React from 'react';
import { LuxuryPricingSection } from '../components/luxury/LuxuryPricingSection';

interface PricingPageProps {
  onNavigate: (path: string) => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({ onNavigate }) => {
  return (
    <div className="w-full min-h-screen bg-[#454545] text-white flex flex-col">
      <LuxuryPricingSection onNavigate={onNavigate} />
    </div>
  );
};
