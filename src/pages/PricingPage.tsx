import React from 'react';
import { LuxuryPricingSection } from '../components/luxury/LuxuryPricingSection';
import { useTheme } from '../context/ThemeContext';

interface PricingPageProps {
  onNavigate: (path: string) => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({ onNavigate }) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  return (
    <div className={`w-full min-h-screen ${isLight ? 'bg-[#F3EFE6] text-[#1A1D1A]' : 'bg-[#454545] text-white'} flex flex-col transition-colors duration-300`}>
      <LuxuryPricingSection onNavigate={onNavigate} />
    </div>
  );
};

