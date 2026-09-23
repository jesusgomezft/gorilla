import React, { createContext, useContext, useState, useEffect } from 'react';
import { ConceptType } from '../types';
import { CONCEPTS_METADATA } from '../data/mockConcepts';

interface ConceptContextType {
  concept: ConceptType;
  setConcept: (concept: ConceptType) => void;
  metadata: typeof CONCEPTS_METADATA[ConceptType];
  isComparisonOpen: boolean;
  setIsComparisonOpen: (open: boolean) => void;
}

const ConceptContext = createContext<ConceptContextType | undefined>(undefined);

export const ConceptProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [concept, setConceptState] = useState<ConceptType>(() => {
    // Check URL parameters first
    const params = new URLSearchParams(window.location.search);
    const urlConcept = params.get('concept') as ConceptType;
    if (urlConcept && ['precision', 'gallery', 'jungle', 'hybrid'].includes(urlConcept)) {
      return urlConcept;
    }
    // Then check local storage
    const saved = localStorage.getItem('gorilla_concept') as ConceptType;
    if (saved && ['precision', 'gallery', 'jungle', 'hybrid'].includes(saved)) {
      return saved;
    }
    return 'hybrid'; // Default baseline
  });

  const [isComparisonOpen, setIsComparisonOpen] = useState(false);

  const setConcept = (newConcept: ConceptType) => {
    setConceptState(newConcept);
    localStorage.setItem('gorilla_concept', newConcept);
    
    // Update URL parameter without reload
    const url = new URL(window.location.href);
    url.searchParams.set('concept', newConcept);
    window.history.replaceState({}, '', url.toString());
  };

  useEffect(() => {
    // Update body theme attributes
    document.documentElement.setAttribute('data-concept', concept);
    if (concept === 'gallery') {
      document.body.classList.remove('bg-charcoal-950', 'bg-jungle-dark', 'bg-lab-bg');
      document.body.classList.add('bg-[#F9F8F6]', 'text-[#1C1917]');
    } else if (concept === 'precision') {
      document.body.classList.remove('bg-[#F9F8F6]', 'bg-jungle-dark', 'text-[#1C1917]');
      document.body.classList.add('bg-charcoal-950', 'text-slate-100');
    } else if (concept === 'jungle') {
      document.body.classList.remove('bg-[#F9F8F6]', 'bg-charcoal-950', 'text-[#1C1917]');
      document.body.classList.add('bg-[#0A130D]', 'text-slate-100');
    } else {
      document.body.classList.remove('bg-[#F9F8F6]', 'bg-jungle-dark', 'text-[#1C1917]');
      document.body.classList.add('bg-charcoal-950', 'text-slate-100');
    }
  }, [concept]);

  return (
    <ConceptContext.Provider
      value={{
        concept,
        setConcept,
        metadata: CONCEPTS_METADATA[concept],
        isComparisonOpen,
        setIsComparisonOpen,
      }}
    >
      {children}
    </ConceptContext.Provider>
  );
};

export const useConcept = () => {
  const context = useContext(ConceptContext);
  if (!context) {
    throw new Error('useConcept must be used within a ConceptProvider');
  }
  return context;
};
