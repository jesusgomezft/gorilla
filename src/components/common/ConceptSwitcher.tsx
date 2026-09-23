import React from 'react';
import { useConcept } from '../../context/ConceptContext';
import { useLanguage } from '../../context/LanguageContext';
import { ConceptType } from '../../types';
import { Sparkles, Activity, Landmark, Trees, Layers, CheckCircle } from 'lucide-react';

export const ConceptSwitcher: React.FC = () => {
  const { concept, setConcept, setIsComparisonOpen } = useConcept();
  const { t } = useLanguage();

  const concepts: { id: ConceptType; name: string; short: string; icon: React.ReactNode }[] = [
    {
      id: 'precision',
      name: '01. Precision Lab',
      short: 'Precision',
      icon: <Activity className="w-3.5 h-3.5" />
    },
    {
      id: 'gallery',
      name: '02. Collector Gallery',
      short: 'Gallery',
      icon: <Landmark className="w-3.5 h-3.5" />
    },
    {
      id: 'jungle',
      name: '03. Digital Jungle',
      short: 'Jungle',
      icon: <Trees className="w-3.5 h-3.5" />
    },
    {
      id: 'hybrid',
      name: '04. Hybrid Baseline',
      short: 'Hybrid',
      icon: <Layers className="w-3.5 h-3.5" />
    }
  ];

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 max-w-[96vw]">
      <div className="bg-[#0A0E14]/95 text-slate-100 backdrop-blur-2xl px-3 py-2 rounded-none border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex items-center gap-2 text-xs">
        
        <div className="hidden md:flex items-center gap-2 pl-2 pr-2 border-r border-white/10 text-slate-400 font-mono text-[11px]">
          <span className="w-2 h-2 rounded-none bg-gorilla-neon animate-pulse" />
          <span className="font-bold text-slate-200 tracking-wider">{t('switcher.prototype')}</span>
        </div>

        <div className="flex items-center gap-1 sm:gap-1.5">
          {concepts.map((item) => {
            const isActive = concept === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setConcept(item.id)}
                className={`px-3 py-1.5 rounded-none font-medium transition-all duration-200 flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-gorilla-neon text-[#07090C] font-bold shadow-[0_0_20px_rgba(0,223,129,0.35)] scale-[1.03]'
                    : 'text-slate-300 hover:text-white hover:bg-white/[0.08]'
                }`}
              >
                {item.icon}
                <span className="hidden sm:inline">{item.name}</span>
                <span className="sm:hidden">{item.short}</span>
                {isActive && <CheckCircle className="w-3 h-3 ml-0.5" />}
              </button>
            );
          })}
        </div>

        <div className="pl-1.5 border-l border-white/10">
          <button
            onClick={() => setIsComparisonOpen(true)}
            className="px-3 py-1.5 rounded-none bg-white/[0.08] hover:bg-white/[0.15] text-amber-300 font-semibold transition-colors flex items-center gap-1.5 text-[11px] border border-amber-500/30"
            title="Abrir matriz de comparación para CEO"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden lg:inline">{t('switcher.compareAll')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
