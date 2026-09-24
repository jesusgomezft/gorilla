import React, { useState, useEffect } from 'react';
import { ConceptProvider } from './context/ConceptContext';
import { LanguageProvider } from './context/LanguageContext';
import { LuxuryNavbar } from './components/luxury/LuxuryNavbar';
import { LuxuryFooter } from './components/luxury/LuxuryFooter';

// Pages
import { HomePage } from './pages/HomePage';
import { ConceptsComparisonPage } from './pages/ConceptsComparisonPage';
import { ServicesPage } from './pages/ServicesPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { SubmissionWizardPage } from './pages/SubmissionWizardPage';
import { VerificationPage } from './pages/VerificationPage';
import { CertificateDetailPage } from './pages/CertificateDetailPage';
import { TrackingPage } from './pages/TrackingPage';
import { CollectorVaultPage } from './pages/CollectorVaultPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { TechnologyPage } from './pages/TechnologyPage';

import { PricingPage } from './pages/PricingPage';
import { AboutPage } from './pages/AboutPage';

export const AppContent: React.FC = () => {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });

  const handleNavigate = (path: string) => {
    const pathname = path.split('?')[0];
    setCurrentPath(pathname);
    window.history.pushState({}, '', path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const renderPage = () => {
    switch (currentPath) {
      case '/':
        return <HomePage onNavigate={handleNavigate} />;
      case '/technology':
        return <TechnologyPage />;

      case '/pricing':
        return <PricingPage onNavigate={handleNavigate} />;
      case '/about':
        return <AboutPage onNavigate={handleNavigate} />;
      case '/concepts':
        return <ConceptsComparisonPage onNavigate={handleNavigate} />;
      case '/services':
        return <ServicesPage onNavigate={handleNavigate} />;
      case '/how-it-works':
        return <HowItWorksPage onNavigate={handleNavigate} />;
      case '/submit':
        return <SubmissionWizardPage onNavigate={handleNavigate} />;
      case '/verify':
        return <VerificationPage onNavigate={handleNavigate} />;
      case '/certificates/demo':
        return <CertificateDetailPage onNavigate={handleNavigate} certId="GG-892401" />;
      case '/track':
        return <TrackingPage onNavigate={handleNavigate} />;
      case '/account':
        return <CollectorVaultPage onNavigate={handleNavigate} />;
      default:
        if (currentPath.startsWith('/certificates/')) {
          const certId = currentPath.replace('/certificates/', '');
          return <CertificateDetailPage onNavigate={handleNavigate} certId={certId} />;
        }
        return <NotFoundPage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans transition-colors duration-300 bg-[#454545] text-[#F4F6F0]">
      <LuxuryNavbar onNavigate={handleNavigate} />
      
      <main className="flex-1">
        {renderPage()}
      </main>

      <LuxuryFooter onNavigate={handleNavigate} />
    </div>
  );
};

export default function App() {
  return (
    <LanguageProvider>
      <ConceptProvider>
        <AppContent />
      </ConceptProvider>
    </LanguageProvider>
  );
}
