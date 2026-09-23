import React, { useState } from 'react';
import { LuxuryHero } from '../components/luxury/LuxuryHero';
import { BrandEcosystemRibbon } from '../components/luxury/BrandEcosystemRibbon';
import { HomeTechnologySection } from '../components/luxury/HomeTechnologySection';
import { TechnologySection } from '../components/luxury/TechnologySection';
import { CardAnalysisPillars } from '../components/luxury/CardAnalysisPillars';
import { LuxuryPricingSection } from '../components/luxury/LuxuryPricingSection';
import { LuxuryAboutSection } from '../components/luxury/LuxuryAboutSection';
import { MissionBanner } from '../components/luxury/MissionBanner';
import { TechDetailModal } from '../components/luxury/TechDetailModal';

interface LuxuryReferenceHomePageProps {
  onNavigate: (path: string) => void;
}

export const LuxuryReferenceHomePage: React.FC<LuxuryReferenceHomePageProps> = ({ onNavigate }) => {
  const [isTechModalOpen, setIsTechModalOpen] = useState(false);

  return (
    <div className="w-full min-h-screen bg-[#454545] text-white flex flex-col selection:bg-[#48C765] selection:text-[#14170F]">
      
      {/* 1. Hero Section (Ultra-High-Fidelity Reference Composition) */}
      <LuxuryHero 
        onNavigate={onNavigate} 
        onOpenTechModal={() => setIsTechModalOpen(true)}
      />

      {/* 2. Brand Ecosystem Ribbon */}
      <BrandEcosystemRibbon />

      {/* 2.5 Technology Teaser Section */}
      <HomeTechnologySection onNavigate={onNavigate} />


      {/* Interactive Technology Detail Explorer Modal */}
      <TechDetailModal
        isOpen={isTechModalOpen}
        onClose={() => setIsTechModalOpen(false)}
        onNavigate={onNavigate}
      />

    </div>
  );
};
