import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { MOCK_GRADED_CARDS, MOCK_POPULAR_SEARCHES } from '../data/mockCards';
import { GradedCard } from '../types';
import { SlabCard } from '../components/common/SlabCard';
import { DefectInspector } from '../components/common/DefectInspector';
import { Search, ShieldCheck, ArrowRight } from 'lucide-react';

interface VerificationPageProps {
  onNavigate: (path: string) => void;
}

export const VerificationPage: React.FC<VerificationPageProps> = ({ onNavigate }) => {
  const { t, language } = useLanguage();
  const [searchInput, setSearchInput] = useState('');
  const [activeCard, setActiveCard] = useState<GradedCard | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    const query = searchInput.trim().toUpperCase();

    if (!query) return;

    const found = MOCK_GRADED_CARDS.find(
      c => c.certNumber.toUpperCase() === query || c.name.toUpperCase().includes(query)
    );

    if (found) {
      setActiveCard(found);
    } else {
      setErrorMsg(`No certificate found matching "${query}".`);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#454545] text-white flex flex-col pt-32 pb-32 px-6 lg:px-12 font-sans selection:bg-[#48C765] selection:text-[#14170F]">
      
      {/* Editorial Search Section */}
      <div className="w-full max-w-[1400px] mx-auto mb-24 flex flex-col md:flex-row md:items-end justify-between gap-12 border-b border-white/10 pb-16">
        <div className="flex flex-col max-w-2xl w-full">
          <div className="flex items-center gap-3 text-[#48C765] font-mono text-[10px] tracking-[0.2em] uppercase mb-4">
            <ShieldCheck className="w-4 h-4" />
            <span>{language === 'es' ? 'Autenticación Internacional' : 'International Authentication'}</span>
          </div>
          <h1 className="font-['Nunito',sans-serif] text-2xl sm:text-3xl font-[900] uppercase tracking-normal text-white mb-8">
            {t('verify.title')}
          </h1>
          
          <form onSubmit={handleSearch} className="relative w-full max-w-lg group">
            <input
              type="text"
              placeholder="ENTER CERTIFICATE ID (e.g. GG-892401)"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full bg-transparent border-b-2 border-white/20 px-0 py-3 text-lg md:text-lg text-white placeholder-white/30 focus:outline-none focus:border-[#48C765] transition-colors font-mono uppercase tracking-widest pr-12"
            />
            <button 
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-white/50 group-focus-within:text-[#48C765] hover:text-[#48C765] transition-colors"
            >
              <ArrowRight className="w-6 h-6" />
            </button>
          </form>
          {errorMsg && (
            <span className="text-red-400 font-mono text-[10px] tracking-widest uppercase mt-4">
              {errorMsg}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-3 font-mono text-[10px] tracking-[0.2em] uppercase text-white/50">
          <span className="text-white/30">{language === 'es' ? 'Búsquedas Recientes' : 'Recent Searches'}</span>
          {MOCK_POPULAR_SEARCHES.map((cert) => (
            <button
              key={cert}
              onClick={() => {
                setSearchInput(cert);
                const found = MOCK_GRADED_CARDS.find(c => c.certNumber === cert);
                if (found) setActiveCard(found);
              }}
              className="text-left hover:text-[#48C765] transition-colors"
            >
              {cert}
            </button>
          ))}
        </div>
      </div>

      {/* Results - Split Layout */}
      {activeCard && (
        <div className="w-full max-w-[1300px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-12 items-start">
          
          {/* Left Column: The Slab (Hero of the page) */}
          <div className="lg:col-span-5 flex flex-col items-center gap-4 sticky top-24">
            <div className="w-full max-w-[340px] mx-auto relative group">
              {/* Subtle background glow */}
              <div className="absolute inset-0 bg-[#48C765]/5 blur-[80px] pointer-events-none opacity-40 group-hover:opacity-80 transition-opacity" />
              <div className="relative z-10 flex justify-center">
                <SlabCard card={activeCard} size="md" />
              </div>
            </div>
            
            <button 
              onClick={() => onNavigate('/certificates/demo')}
              className="btn-gorilla-square mx-auto mt-2 px-6 py-2.5 text-xs font-extrabold tracking-normal gap-2 shadow-md"
            >
              <span>{language === 'es' ? 'Ver Certificado Completo' : 'View Full Certificate'}</span>
              <span>→</span>
            </button>
          </div>

          {/* Right Column: Editorial Data Sheet */}
          <div className="lg:col-span-7 flex flex-col">
            
            {/* 1. Header Spec */}
            <div className="pb-5 border-b border-white/10">
              <div className="flex items-center gap-3 mb-2 font-mono text-[10px] tracking-[0.2em] uppercase text-[#48C765]">
                <span>CERT // {activeCard.certNumber}</span>
                <span className="w-1 h-1 bg-[#48C765]" />
                <span>{activeCard.game}</span>
              </div>
              
              <h2 className="font-['Nunito',sans-serif] text-xl md:text-2xl font-[900] uppercase leading-tight text-white mb-4">
                {activeCard.name}
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-3 font-mono text-[10px] tracking-[0.15em] uppercase text-[#A4ACA1]">
                <div className="flex flex-col gap-0.5">
                  <span className="text-white/30 text-[9px]">Year</span>
                  <span className="text-white text-xs">{activeCard.year}</span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-white/30 text-[9px]">Set</span>
                  <span className="text-white text-xs truncate" title={activeCard.set}>{activeCard.set}</span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-white/30 text-[9px]">Card No.</span>
                  <span className="text-white text-xs">{activeCard.cardNumber}</span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-white/30 text-[9px]">Rarity</span>
                  <div>
                    <span className="badge-rarity-gold text-[9px] px-2 py-0.5">
                      {activeCard.rarity}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. The Grade (Harmonious Typography) */}
            <div className="py-5 border-b border-white/10 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="flex flex-col">
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/30 mb-1">
                  {t('verify.officialGrade')}
                </span>
                <div className="font-['Nunito',sans-serif] text-5xl md:text-6xl lg:text-7xl leading-none text-white font-[900] tracking-tight">
                  {activeCard.grade.toFixed(1)}
                </div>
              </div>
              <div className="flex flex-col items-start md:items-end gap-1 pb-1">
                <span className="font-mono text-xs sm:text-sm tracking-[0.2em] uppercase text-[#48C765] font-bold">
                  {activeCard.gradeLabel}
                </span>
                <span className="font-mono text-[10px] tracking-[0.1em] text-[#A4ACA1] max-w-xs md:text-right">
                  Authenticated by {activeCard.verifier}
                </span>
              </div>
            </div>

            {/* 3. Subgrades (Editorial List) */}
            <div className="py-5 border-b border-white/10">
              <span className="block font-mono text-[10px] tracking-[0.2em] uppercase text-white/30 mb-3">
                {language === 'es' ? 'Análisis Óptico (Sub-Grados)' : 'Optical Analysis (Sub-Grades)'}
              </span>
              
              <div className="flex flex-col gap-2">
                {[
                  { label: t('verify.subCentering'), score: activeCard.subgrades.centering.score, desc: activeCard.subgrades.centering.frontRatio.split(',')[0] },
                  { label: t('verify.subCorners'), score: activeCard.subgrades.corners.score, desc: '90° DIE CUT' },
                  { label: t('verify.subEdges'), score: activeCard.subgrades.edges.score, desc: 'NO WHITENING' },
                  { label: t('verify.subSurface'), score: activeCard.subgrades.surface.score, desc: 'SPECULAR OK' }
                ].map((sub, i) => (
                  <div key={i} className="flex items-center justify-between py-1 group">
                    <div className="flex items-baseline gap-4 w-1/3">
                      <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-white">{sub.label}</span>
                    </div>
                    
                    <div className="hidden sm:block flex-1 border-b border-white/10 mx-6 border-dashed group-hover:border-[#48C765]/50 transition-colors" />
                    
                    <div className="flex items-center justify-end gap-6 w-1/2 sm:w-1/3">
                      <span className="font-mono text-[9px] tracking-widest uppercase text-[#A4ACA1] truncate text-right">
                        {sub.desc}
                      </span>
                      <span className="font-['Nunito',sans-serif] text-base text-white font-[900] w-10 text-right">
                        {sub.score.toFixed(1)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Population Census */}
            <div className="py-5 border-b border-white/10">
              <div className="grid grid-cols-3 gap-6">
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/30">Total Graded</span>
                  <span className="font-['Nunito',sans-serif] text-base text-white font-[900]">{activeCard.population.totalGraded}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/30">Higher Grade</span>
                  <span className="font-['Nunito',sans-serif] text-base text-white font-[900]">{activeCard.population.higherCount}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/30">Equal Grade</span>
                  <span className="font-['Nunito',sans-serif] text-base text-white font-[900]">{activeCard.population.equalCount}</span>
                </div>
              </div>
            </div>

            {/* 5. Defect Inspector (Full Width Module) */}
            <div className="mt-5">
              <DefectInspector card={activeCard} />
            </div>

          </div>
        </div>
      )}
    </div>
  );
};
