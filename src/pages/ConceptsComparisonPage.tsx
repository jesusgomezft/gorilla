import React from 'react';
import { useConcept } from '../context/ConceptContext';
import { CONCEPTS_METADATA } from '../data/mockConcepts';
import { ConceptType } from '../types';
import { 
  Sparkles, 
  Activity, 
  Landmark, 
  Trees, 
  Layers, 
  CheckCircle, 
  ArrowRight, 
  ShieldCheck, 
  AlertTriangle,
  Lightbulb
} from 'lucide-react';

interface ConceptsComparisonPageProps {
  onNavigate: (path: string) => void;
}

export const ConceptsComparisonPage: React.FC<ConceptsComparisonPageProps> = ({ onNavigate }) => {
  const { concept, setConcept } = useConcept();
  const conceptKeys: ConceptType[] = ['precision', 'gallery', 'jungle', 'hybrid'];

  const getConceptIcon = (key: ConceptType) => {
    switch (key) {
      case 'precision': return <Activity className="w-6 h-6 text-emerald-400" />;
      case 'gallery': return <Landmark className="w-6 h-6 text-amber-500" />;
      case 'jungle': return <Trees className="w-6 h-6 text-green-400" />;
      case 'hybrid': return <Layers className="w-6 h-6 text-blue-400" />;
    }
  };

  const handleSelectConcept = (key: ConceptType) => {
    setConcept(key);
    onNavigate('/');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-none bg-gorilla-500/15 border border-gorilla-500/30 text-gorilla-400 font-mono text-xs">
          <Sparkles className="w-3.5 h-3.5" />
          <span>EXECUTIVE STAKEHOLDER MATRIX</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-white">
          Gorilla Grading Concept Models
        </h1>
        <p className="text-base text-slate-300 leading-relaxed">
          Four distinct visual and product architectures built from zero. Compare their target personas, visual rules, strategic trade-offs, and recommended launch vectors.
        </p>
      </div>

      {/* 4-Concept Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {conceptKeys.map((cKey) => {
          const item = CONCEPTS_METADATA[cKey];
          const isCurrent = concept === cKey;

          return (
            <div
              key={cKey}
              className={`rounded-none p-6 flex flex-col justify-between border transition-all duration-200 ${
                isCurrent
                  ? 'bg-slate-800/90 border-gorilla-500 ring-2 ring-gorilla-500/40 shadow-2xl'
                  : 'bg-charcoal-900/70 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                {/* Header Icon + Current Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-none bg-charcoal-950 border border-slate-700">
                    {getConceptIcon(cKey)}
                  </div>
                  {isCurrent && (
                    <span className="px-2.5 py-1 rounded-none bg-gorilla-500 text-charcoal-950 text-[10px] font-mono font-bold">
                      ACTIVE NOW
                    </span>
                  )}
                </div>

                <h3 className="font-display font-bold text-lg text-white mb-1">
                  {item.name}
                </h3>
                <p className="text-xs font-mono text-gorilla-400 mb-4 min-h-[32px]">
                  {item.tagline}
                </p>

                <div className="space-y-4 text-xs">
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                      Target Persona
                    </span>
                    <p className="text-slate-200 mt-0.5 leading-snug">{item.targetPersona}</p>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                      Core Emotion
                    </span>
                    <p className="text-slate-300 mt-0.5 leading-snug">{item.coreEmotion}</p>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                      Visual Palette
                    </span>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="w-5 h-5 rounded-none border border-white/20" style={{ backgroundColor: item.colorTokens.bg }} title="Background" />
                      <span className="w-5 h-5 rounded-none border border-white/20" style={{ backgroundColor: item.colorTokens.surface }} title="Surface" />
                      <span className="w-5 h-5 rounded-none border border-white/20" style={{ backgroundColor: item.colorTokens.accent }} title="Accent" />
                      <span className="text-[11px] font-mono text-slate-400 ml-1">{item.themeStyle.split('&')[0]}</span>
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                      Banana Strategy
                    </span>
                    <p className="text-slate-300 mt-0.5 leading-snug">{item.bananaUsage}</p>
                  </div>
                </div>

                {/* Pros list */}
                <div className="mt-5 pt-4 border-t border-slate-800">
                  <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider block mb-2">
                    Key Strengths
                  </span>
                  <ul className="space-y-1.5 text-[11px] text-slate-300">
                    {item.pros.map((p, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <CheckCircle className="w-3.5 h-3.5 text-gorilla-400 shrink-0 mt-0.5" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-6 pt-4 border-t border-slate-800">
                <button
                  onClick={() => handleSelectConcept(cKey)}
                  className={`w-full py-3 rounded-none text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                    isCurrent
                      ? 'bg-gorilla-500 text-charcoal-950 shadow-lg'
                      : 'bg-slate-800 hover:bg-slate-700 text-white'
                  }`}
                >
                  <span>{isCurrent ? 'Experience Active Concept' : 'Launch Full Prototype'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* Strategic Synthesis & Recommendation */}
      <div className="p-8 sm:p-10 rounded-none bg-charcoal-900 border border-slate-800 space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-none bg-amber-400/20 text-amber-300">
            <Lightbulb className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-display font-bold text-lg text-white">
              Strategic Evaluation & Recommendation for CEO Review
            </h3>
            <p className="text-xs text-slate-400 font-mono">
              Synthesized from Market Research, Competitor Analysis, and Persona Profiles
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-300 leading-relaxed font-sans">
          <div className="p-4 rounded-none bg-charcoal-950 border border-slate-800 space-y-2">
            <h4 className="font-bold text-sm text-emerald-400 font-mono">1. Technological Rigor (Model 01)</h4>
            <p>
              Provides essential justification for why Gorilla should be trusted over legacy US players. Giving collectors millimeter-accurate subgrades (50/50 centering) creates defensible transparency.
            </p>
          </div>

          <div className="p-4 rounded-none bg-charcoal-950 border border-slate-800 space-y-2">
            <h4 className="font-bold text-sm text-amber-400 font-mono">2. Premium Artifact (Model 02)</h4>
            <p>
              Ensures that high-ticket collectors feel pride in display. Slabs must look exquisite on shelves and in display cases, appealing directly to mature collectors (Mara).
            </p>
          </div>

          <div className="p-4 rounded-none bg-charcoal-950 border border-slate-800 space-y-2">
            <h4 className="font-bold text-sm text-green-400 font-mono">3. Show & Community (Model 03)</h4>
            <p>
              European grading thrives in physical conventions (Madrid, Lisbon, Barcelona). Having live drop-off and instant pre-checks addresses the shipping anxiety identified in market research.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-none bg-gorilla-500/10 border border-gorilla-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="text-slate-200">
            <strong className="text-gorilla-400 font-mono">CEO DECISION PATHWAY: </strong>
            Select <strong>Model 04 (Hybrid)</strong> as the core product architecture, utilizing the <strong>Defect Inspector</strong> from Model 01 and the <strong>Card Show Drop-off</strong> workflow from Model 03.
          </div>
          <button
            onClick={() => handleSelectConcept('hybrid')}
            className="px-6 py-2.5 rounded-none bg-gorilla-500 hover:bg-gorilla-400 text-charcoal-950 font-bold shrink-0 shadow-md"
          >
            Apply Recommended Baseline
          </button>
        </div>

      </div>

    </div>
  );
};
