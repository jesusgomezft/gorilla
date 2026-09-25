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
import { InfluencerTestimonialsPlaceholder, SocialProofPlaceholder } from '../components/luxury/MarketingPlaceholders';
import { PromoCTA } from '../components/luxury/PromoCTA';
import { FAQSection } from '../components/luxury/FAQSection';
import { NewsletterSection } from '../components/luxury/NewsletterSection';
import { ScrollReveal } from '../components/luxury/ScrollReveal';

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
      <ScrollReveal direction="up" delay={0.1}>
        <BrandEcosystemRibbon />
      </ScrollReveal>

      {/* 3. Pricing & Services Recommendation */}
      <ScrollReveal direction="up" delay={0.1}>
        <LuxuryPricingSection onNavigate={onNavigate} isHome={true} />
      </ScrollReveal>

      {/* 4. Cognitive Reinforcement 1: Technology */}
      <ScrollReveal direction="up" delay={0.1}>
        <HomeTechnologySection onNavigate={onNavigate} />
      </ScrollReveal>

      {/* 5. Step by Step / Process */}
      <ScrollReveal direction="up" delay={0.1}>
        <TechnologySection />
      </ScrollReveal>

      {/* 7. Influencer Testimonials (Placeholder) */}
      <ScrollReveal direction="up" delay={0.1}>
        <InfluencerTestimonialsPlaceholder />
      </ScrollReveal>

      {/* 8. Call to Action / Promos */}
      <ScrollReveal direction="up" delay={0.1}>
        <PromoCTA onNavigate={onNavigate} />
      </ScrollReveal>

      {/* 9. FAQs */}
      <ScrollReveal direction="up" delay={0.1}>
        <FAQSection />
      </ScrollReveal>

      {/* 10. Social Proof Reinforcement (Placeholder) */}
      <ScrollReveal direction="up" delay={0.1}>
        <SocialProofPlaceholder />
      </ScrollReveal>

      {/* 11. Customer Promise / International Shipping */}
      <ScrollReveal direction="up" delay={0.1}>
        <MissionBanner onNavigate={onNavigate} />
      </ScrollReveal>

      {/* 12. Newsletter Subscription */}
      <ScrollReveal direction="up" delay={0.1}>
        <NewsletterSection />
      </ScrollReveal>

      {/* Interactive Technology Detail Explorer Modal */}
      <TechDetailModal
        isOpen={isTechModalOpen}
        onClose={() => setIsTechModalOpen(false)}
        onNavigate={onNavigate}
      />

    </div>
  );
};
