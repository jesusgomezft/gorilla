import React, { useState } from 'react';
import { MOCK_GRADED_CARDS } from '../../data/mockCards';
import { SlabCard } from '../common/SlabCard';
import { DefectInspector } from '../common/DefectInspector';
import { MOCK_SERVICES } from '../../data/mockServices';
import { useLanguage } from '../../context/LanguageContext';
import { 
  Layers, 
  ShieldCheck, 
  Cpu, 
  ArrowRight, 
  Search, 
  Sparkles, 
  MapPin, 
  CheckCircle2, 
  Truck,
  ChevronRight
} from 'lucide-react';

interface HybridHomeProps {
  onNavigate: (path: string) => void;
}

export const HybridHome: React.FC<HybridHomeProps> = ({ onNavigate }) => {
  const { t } = useLanguage();
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const activeCard = MOCK_GRADED_CARDS[activeCardIndex];
  const [showInspectorModal, setShowInspectorModal] = useState(false);

  return (
    <div className="space-y-28 pb-28 text-slate-100">
      
      {/* 1. HERO SECTION: The Strategic European Hybrid */}
      <section className="relative pt-8 sm:pt-14 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Value Proposition */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-none bg-[#00DF81]/15 border border-[#00DF81]/40 text-[#00DF81] font-mono text-xs font-bold shadow-[0_0_15px_rgba(0,223,129,0.2)]">
                <Layers className="w-3.5 h-3.5" />
                <span>{t('hybrid.tag')}</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-lg font-display font-extrabold text-white tracking-tight leading-[1.08]">
                {t('hybrid.heroTitle')} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00DF81] via-emerald-300 to-teal-100">
                  {t('hybrid.heroSubtitle')}
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
                {t('hybrid.heroDesc')}
              </p>

              {/* Core Trust Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 pt-2 font-mono text-xs">
                <div className="p-3.5 rounded-none bg-white/[0.04] border border-white/10 backdrop-blur-md">
                  <div className="text-[#00DF81] font-extrabold mb-0.5">{t('hybrid.trustLaser')}</div>
                  <div className="text-slate-400 text-[10px]">{t('hybrid.trustLaserSub')}</div>
                </div>
                <div className="p-3.5 rounded-none bg-white/[0.04] border border-white/10 backdrop-blur-md">
                  <div className="text-[#00DF81] font-extrabold mb-0.5">{t('hybrid.trustInsured')}</div>
                  <div className="text-slate-400 text-[10px]">{t('hybrid.trustInsuredSub')}</div>
                </div>
                <div className="col-span-2 sm:col-span-1 p-3.5 rounded-none bg-white/[0.04] border border-white/10 backdrop-blur-md">
                  <div className="text-[#00DF81] font-extrabold mb-0.5">{t('hybrid.trustSonic')}</div>
                  <div className="text-slate-400 text-[10px]">{t('hybrid.trustSonicSub')}</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <button
                  onClick={() => onNavigate('/submit')}
                  className="btn-senior-primary"
                >
                  <span>{t('nav.submit')}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onNavigate('/verify')}
                  className="btn-senior-secondary"
                >
                  <Search className="w-4 h-4 text-gorilla-neon" />
                  <span>{t('nav.verify')}</span>
                </button>
              </div>

            </div>

            {/* Right Column: Hero 3D Interactive Slab */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <SlabCard 
                card={activeCard} 
                size="lg" 
                onInspect={() => setShowInspectorModal(true)} 
              />

              {/* Quick Card Selector */}
              <div className="mt-4 flex items-center gap-2 bg-[#0A0E14]/90 p-1.5 rounded-none border border-white/10 backdrop-blur-xl">
                {MOCK_GRADED_CARDS.map((c, idx) => (
                  <button
                    key={c.id}
                    onClick={() => setActiveCardIndex(idx)}
                    className={`px-3 py-1.5 rounded-none text-xs font-mono transition-colors ${
                      activeCardIndex === idx
                        ? 'bg-[#00DF81] text-[#07090C] font-bold shadow-md'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {c.name.split('—')[0].trim()}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. THE 4-PILLAR REASONING */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-2">
          <span className="font-mono text-xs text-gorilla-neon uppercase tracking-wider font-bold">
            Diseñado para la Confianza Absoluta
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white">
            Solución integral a las grandes fricciones del grading tradicional
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="senior-card p-6 space-y-3">
            <div className="w-11 h-11 rounded-none bg-[#00DF81]/15 text-[#00DF81] flex items-center justify-center font-bold">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="font-display font-bold text-lg text-white">Telemetría de Subnotas</h3>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              Centrado, esquinas, bordes y superficie desglosados en decimales con evidencia óptica nítida.
            </p>
          </div>

          <div className="senior-card p-6 space-y-3">
            <div className="w-11 h-11 rounded-none bg-[#00DF81]/15 text-[#00DF81] flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-display font-bold text-lg text-white">Acrílico Sónico UV</h3>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              Policarbonato óptico soldado a 35kHz. Filtra el 99.4% de radiación UV y aísla de humedad ambiental.
            </p>
          </div>

          <div className="senior-card p-6 space-y-3">
            <div className="w-11 h-11 rounded-none bg-[#00DF81]/15 text-[#00DF81] flex items-center justify-center font-bold">
              <Truck className="w-5 h-5" />
            </div>
            <h3 className="font-display font-bold text-lg text-white">Cadena de Custodia UE</h3>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              Laboratorios en Madrid y Lisboa. Envíos 100% asegurados sin riesgos de trámites aduaneros intercontinentales.
            </p>
          </div>

          <div className="senior-card p-6 space-y-3">
            <div className="w-11 h-11 rounded-none bg-[#00DF81]/15 text-[#00DF81] flex items-center justify-center font-bold">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="font-display font-bold text-lg text-white">Entrega en Card Shows</h3>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              Entrega tus cartas en mano a nuestro equipo en las principales convenciones ibéricas y europeas.
            </p>
          </div>

        </div>
      </section>

      {/* 3. INTERACTIVE DEFECT INSPECTION STAGE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <DefectInspector card={activeCard} />
      </section>

      {/* 4. TRANSPARENT PRICING GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="font-mono text-xs text-gorilla-neon uppercase tracking-wider font-bold">
            Tarifas Claras & Predecibles
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white">
            Niveles de Servicio & Plazos
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MOCK_SERVICES.slice(0, 3).map((tier) => (
            <div
              key={tier.id}
              className={`senior-card p-7 sm:p-8 flex flex-col justify-between border transition-all ${
                tier.badge ? 'border-[#00DF81]/60 shadow-[0_0_30px_rgba(0,223,129,0.15)] ring-1 ring-[#00DF81]/30' : ''
              }`}
            >
              <div>
                {tier.badge && (
                  <span className="px-3 py-1 rounded-none bg-[#00DF81] text-[#07090C] font-mono text-[10px] font-bold uppercase mb-3 inline-block">
                    {tier.badge}
                  </span>
                )}
                <h3 className="font-display font-bold text-lg text-white mb-1">{tier.name}</h3>
                <p className="text-xs text-slate-400 mb-6">{tier.tagline}</p>

                <div className="flex items-baseline gap-2 mb-6 pb-6 border-b border-white/10">
                  <span className="text-lg font-display font-extrabold text-white">€{tier.priceEur.toFixed(2)}</span>
                  <span className="text-xs text-slate-400 font-mono">/ carta</span>
                </div>

                <div className="space-y-3 text-xs text-slate-300 font-mono mb-6">
                  <div className="flex items-center gap-2">✓ Plazo: <strong>{tier.turnaroundLabel}</strong></div>
                  <div className="flex items-center gap-2">✓ Cobertura máxima: €{tier.maxDeclaredValueEur.toLocaleString()}</div>
                  <div className="flex items-center gap-2">✓ Subnotas a 4 cuadrantes</div>
                  <div className="flex items-center gap-2">✓ NFC & Certificado digital</div>
                </div>
              </div>

              <button
                onClick={() => onNavigate('/submit')}
                className="w-full btn-senior-primary text-xs"
              >
                <span>Seleccionar {tier.name}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
