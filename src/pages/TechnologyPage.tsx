import React from 'react';
import { TechnologySection } from '../components/luxury/TechnologySection';
import { CardAnalysisPillars } from '../components/luxury/CardAnalysisPillars';

export const TechnologyPage: React.FC = () => {
  return (
    <div className="w-full min-h-screen bg-[#454545] text-white flex flex-col">
      <TechnologySection />
      <CardAnalysisPillars onNavigate={() => {}} />
    </div>
  );
};

