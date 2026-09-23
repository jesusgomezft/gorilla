import React from 'react';
import { useConcept } from '../../context/ConceptContext';
import { CONCEPTS_METADATA } from '../../data/mockConcepts';
import { ConceptType } from '../../types';
import { X, CheckCircle, ArrowRight, Shield, Sparkles, Activity, Landmark, Trees, Layers } from 'lucide-react';

export const ComparisonModal: React.FC = () => {
  const { isComparisonOpen, setIsComparisonOpen, concept, setConcept } = useConcept();

  if (!isComparisonOpen) return null;

  const conceptList: ConceptType[] = ['precision', 'gallery', 'jungle', 'hybrid'];

  const getIcon = (type: ConceptType) => {
    switch (type) {
      case 'precision': return <Activity className="w-5 h-5 text-emerald-400" />;
      case 'gallery': return <Landmark className="w-5 h-5 text-amber-500" />;
      case 'jungle': return <Trees className="w-5 h-5 text-green-400" />;
      case 'hybrid': return <Layers className="w-5 h-5 text-blue-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#454545]/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
      <div className="relative w-full max-w-6xl bg-charcoal-900 border border-slate-700 rounded-none p-6 sm:p-8 text-slate-100 shadow-2xl my-8">
        
        {/* Header */}
        <div className="flex items-start justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-none bg-gorilla-500/20 text-gorilla-400 font-mono text-xs font-semibold border border-gorilla-500/30">
                CEO STAKEHOLDER MATRIX
              </span>
              <span className="text-xs font-mono text-slate-400">Gorilla Grading Prototype Suite</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white">
              Executive Concept Comparison
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-3xl">
              Compare all four visual and product directions. Each model maintains distinct market positioning while keeping the collectible card as the central protagonist.
            </p>
          </div>

          <button
            onClick={() => setIsComparisonOpen(false)}
            className="p-2 rounded-none bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* 4-Column Concept Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-6">
          {conceptList.map((cId) => {
            const item = CONCEPTS_METADATA[cId];
            const isCurrent = concept === cId;

            return (
              <div
                key={cId}
                className={`rounded-none p-5 flex flex-col justify-between border transition-all duration-200 ${
                  isCurrent
                    ? 'bg-slate-800/80 border-gorilla-500 ring-2 ring-gorilla-500/30 shadow-xl'
                    : 'bg-charcoal-950/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2 rounded-none bg-slate-900 border border-slate-700">
                      {getIcon(cId)}
                    </div>
                    {isCurrent && (
                      <span className="px-2 py-0.5 rounded-none bg-gorilla-500 text-charcoal-950 font-bold text-[10px] font-mono">
                        ACTIVE
                      </span>
                    )}
                  </div>

                  <h3 className="font-display font-bold text-base text-white mb-1">
                    {item.name}
                  </h3>
                  <p className="text-xs font-mono text-gorilla-400 mb-3">
                    {item.themeStyle}
                  </p>

                  <div className="space-y-3 text-xs mb-4">
                    <div>
                      <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Target Persona</div>
                      <p className="text-slate-200 leading-snug mt-0.5">{item.targetPersona}</p>
                    </div>

                    <div>
                      <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Core Emotion</div>
                      <p className="text-slate-300 leading-snug mt-0.5">{item.coreEmotion}</p>
                    </div>

                    <div>
                      <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Signature Interaction</div>
                      <p className="text-slate-300 leading-snug mt-0.5">{item.signatureFeature}</p>
                    </div>

                    <div>
                      <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Banana Usage</div>
                      <p className="text-slate-300 leading-snug mt-0.5">{item.bananaUsage}</p>
                    </div>
                  </div>

                  {/* Key Strengths */}
                  <div className="border-t border-slate-800 pt-3 mb-4">
                    <div className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider mb-1.5">Key Advantage</div>
                    <ul className="space-y-1 text-[11px] text-slate-300">
                      {item.pros.slice(0, 2).map((pro, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <CheckCircle className="w-3 h-3 text-gorilla-400 shrink-0 mt-0.5" />
                          <span>{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setConcept(cId);
                    setIsComparisonOpen(false);
                  }}
                  className={`w-full py-2.5 rounded-none text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                    isCurrent
                      ? 'bg-gorilla-500 text-charcoal-950 shadow-md'
                      : 'bg-slate-800 hover:bg-slate-700 text-white'
                  }`}
                >
                  <span>{isCurrent ? 'Viewing Now' : 'Switch to Concept'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Strategic Recommendation Callout */}
        <div className="mt-6 p-4 rounded-none bg-emerald-950/30 border border-emerald-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-300">
          <div>
            <span className="font-bold text-emerald-400 font-mono">RECOMMENDED ROADMAP BASELINE: </span>
            <span>
              For the first European market rollout, <strong>Model 04 (Hybrid)</strong> is recommended as the baseline because it reconciles technical rigor (Model 01) with luxury slab aesthetics (Model 02) and community presence (Model 03).
            </span>
          </div>
          <button
            onClick={() => {
              setConcept('hybrid');
              setIsComparisonOpen(false);
            }}
            className="px-4 py-2 rounded-none bg-gorilla-500 text-charcoal-950 font-bold shrink-0 hover:bg-gorilla-400 transition-colors"
          >
            Apply Hybrid Baseline
          </button>
        </div>

      </div>
    </div>
  );
};
