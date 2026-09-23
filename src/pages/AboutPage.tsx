import React from 'react';
import { LuxuryAboutSection } from '../components/luxury/LuxuryAboutSection';
import { MissionBanner } from '../components/luxury/MissionBanner';

interface AboutPageProps {
  onNavigate?: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="w-full min-h-screen bg-[#454545] text-white flex flex-col">
      <LuxuryAboutSection />
      <MissionBanner onNavigate={onNavigate} />
    </div>
  );
};
