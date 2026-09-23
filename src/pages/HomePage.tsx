import React from 'react';
import { LuxuryReferenceHomePage } from './LuxuryReferenceHomePage';

interface HomePageProps {
  onNavigate: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return <LuxuryReferenceHomePage onNavigate={onNavigate} />;
};
