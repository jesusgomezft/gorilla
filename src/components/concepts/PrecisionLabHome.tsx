import React, { useState } from 'react';
import { MOCK_GRADED_CARDS } from '../../data/mockCards';
import { SlabCard } from '../common/SlabCard';
import { DefectInspector } from '../common/DefectInspector';
import { MOCK_SERVICES } from '../../data/mockServices';
import { useLanguage } from '../../context/LanguageContext';
import { 
  Activity, 
  Crosshair, 
  Cpu, 
  ShieldCheck, 
  ArrowRight, 
  Search, 
  Layers, 
  Scan, 
  ChevronRight,
  Sparkles
} from 'lucide-react';

interface PrecisionLabHomeProps {
  onNavigate: (path: string) => void;
}

export const PrecisionLabHome: React.FC<PrecisionLabHomeProps> = ({ onNavigate }) => {
  const { t } = useLanguage();
  const heroCard = MOCK_GRADED_CARDS[0]; // Charizard 1st Edition
  const [selectedCard, setSelectedCard] = useState(heroCard);

  return (
    <div className="space-y-24 pb-24 lab-grid-mesh">
      
      {/* 1. HERO SECTION: Precision Lab Optical Telemetry */}
      <section className="relative pt-8 sm:pt-14 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-none bg-[#00DF81]/15 border border-[#00DF81]/40 text-[#00DF81] font-mono text-xs font-bold shadow-[0_0_15px_rgba(0,223,129,0.2)]">
                <span className="w-2 h-2 rounded-none bg-[#00DF81] animate-pulse" />
                <span>{t('lab.tag')}</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-lg font-display font-extrabold text-white tracking-tight leading-[1.08]">
                {t('lab.heroTitle')} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00DF81] via-emerald-300 to-teal-100">
                  {t('lab.heroSubtitle')}
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
                {t('lab.heroDesc')}
              </p>

              {/* Telemetry Metrics Bar */}
              <div className="grid grid-cols-3 gap-3.5 pt-2 pb-2 max-w-xl font-mono">
                <div className="p-3.5 rounded-none bg-white/[0.04] border border-white/10 backdrop-blur-md">
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider">{t('lab.metricCentering')}</div>
                  <div className="text-lg font-extrabold text-[#00DF81] mt-0.5">{t('lab.metricCenteringVal')}</div>
                  <div className="text-[9px] text-slate-500">Telemetría Láser</div>
                </div>
                <div className="p-3.5 rounded-none bg-white/[0.04] border border-white/10 backdrop-blur-md">
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider">{t('lab.metricDarkfield')}</div>
                  <div className="text-lg font-extrabold text-[#00DF81] mt-0.5">{t('lab.metricDarkfieldVal')}</div>
                  <div className="text-[9px] text-slate-500">Aislamiento Defectos</div>
                </div>
                <div className="p-3.5 rounded-none bg-white/[0.04] border border-white/10 backdrop-blur-md">
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider">{t('lab.metricTurnaround')}</div>
                  <div className="text-lg font-extrabold text-[#00DF81] mt-0.5">{t('lab.metricTurnaroundVal')}</div>
                  <div className="text-[9px] text-slate-500">Sin Aduanas</div>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <button
                  onClick={() => onNavigate('/submit')}
                  className="btn-senior-primary"
                >
                  <span>{t('lab.ctaSubmit')}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onNavigate('/verify')}
                  className="btn-senior-secondary"
                >
                  <Search className="w-4 h-4 text-gorilla-neon" />
                  <span>{t('lab.ctaVerify')}</span>
                </button>
              </div>

            </div>

            {/* Right Column: 3D Slab Card Protagonist */}
            <div className="lg:col-span-5 flex justify-center">
              <SlabCard card={heroCard} size="lg" onInspect={() => setSelectedCard(heroCard)} />
            </div>

          </div>
        </div>
      </section>

      {/* 2. SIGNATURE INTERACTION: Interactive Optical Defect Inspector */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-none bg-white/[0.06] border border-white/10 text-gorilla-neon font-mono text-xs">
            <Activity className="w-3.5 h-3.5" />
            <span>ESTACIÓN DE AUDITORÍA ÓPTICA</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
            {t('lab.inspectorTitle')}
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            {t('lab.inspectorDesc')}
          </p>
        </div>

        {/* Card Switcher tabs */}
        <div className="flex items-center justify-center gap-2 mb-6 overflow-x-auto pb-2">
          {MOCK_GRADED_CARDS.map((card) => (
            <button
              key={card.id}
              onClick={() => setSelectedCard(card)}
              className={`px-4 py-2 rounded-none text-xs font-mono transition-all ${
                selectedCard.id === card.id
                  ? 'bg-[#00DF81] text-[#07090C] font-bold shadow-md'
                  : 'bg-white/[0.04] text-slate-300 hover:text-white border border-white/[0.08]'
              }`}
            >
              {card.name.split('—')[0]} ({card.grade.toFixed(1)})
            </button>
          ))}
        </div>

        <DefectInspector card={selectedCard} />
      </section>

      {/* 3. SCIENTIFIC 5-STAGE PROTOCOL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="senior-card p-8 sm:p-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-6 border-b border-white/[0.08]">
            <div>
              <span className="font-mono text-xs text-gorilla-neon uppercase tracking-wider font-bold">
                Estandarización & Rigor Científico
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mt-1">
                {t('lab.protocolTitle')}
              </h2>
            </div>
            <button
              onClick={() => onNavigate('/how-it-works')}
              className="text-xs font-mono text-gorilla-neon hover:underline flex items-center gap-1 font-semibold"
            >
              <span>Ver Guía Técnica Completa</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-5 font-mono text-xs">
            <div className="p-4 rounded-none bg-[#454545]/40 border border-white/[0.08] space-y-1.5">
              <div className="text-[#00DF81] font-bold text-xs">01. INGRESO</div>
              <h4 className="text-white font-sans font-bold text-sm">{t('lab.protocolP1Title')}</h4>
              <p className="text-slate-400 text-[11px] leading-relaxed font-sans">{t('lab.protocolP1Desc')}</p>
            </div>

            <div className="p-4 rounded-none bg-[#454545]/40 border border-white/[0.08] space-y-1.5">
              <div className="text-[#00DF81] font-bold text-xs">02. ESPECTRO</div>
              <h4 className="text-white font-sans font-bold text-sm">{t('lab.protocolP2Title')}</h4>
              <p className="text-slate-400 text-[11px] leading-relaxed font-sans">{t('lab.protocolP2Desc')}</p>
            </div>

            <div className="p-4 rounded-none bg-[#454545]/40 border border-white/[0.08] space-y-1.5">
              <div className="text-[#00DF81] font-bold text-xs">03. CALIBRE</div>
              <h4 className="text-white font-sans font-bold text-sm">{t('lab.protocolP3Title')}</h4>
              <p className="text-slate-400 text-[11px] leading-relaxed font-sans">{t('lab.protocolP3Desc')}</p>
            </div>

            <div className="p-4 rounded-none bg-[#454545]/40 border border-white/[0.08] space-y-1.5">
              <div className="text-[#00DF81] font-bold text-xs">04. CAMPO OSCURO</div>
              <h4 className="text-white font-sans font-bold text-sm">{t('lab.protocolP4Title')}</h4>
              <p className="text-slate-400 text-[11px] leading-relaxed font-sans">{t('lab.protocolP4Desc')}</p>
            </div>

            <div className="p-4 rounded-none bg-[#454545]/40 border border-white/[0.08] space-y-1.5">
              <div className="text-[#00DF81] font-bold text-xs">05. SELLADO</div>
              <h4 className="text-white font-sans font-bold text-sm">{t('lab.protocolP5Title')}</h4>
              <p className="text-slate-400 text-[11px] leading-relaxed font-sans">{t('lab.protocolP5Desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. TRANSPARENT PRICING TIERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
          <span className="font-mono text-xs text-gorilla-neon uppercase tracking-wider font-bold">
            Tarifas Transparentes en Euros
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white">
            Tiempos predecibles. Cero sorpresas arancelarias.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MOCK_SERVICES.slice(0, 3).map((tier) => (
            <div
              key={tier.id}
              className={`rounded-none p-7 flex flex-col justify-between border transition-all ${
                tier.badge
                  ? 'senior-card border-[#00DF81]/50 shadow-[0_0_30px_rgba(0,223,129,0.15)] ring-1 ring-[#00DF81]/30'
                  : 'senior-card'
              }`}
            >
              <div>
                {tier.badge && (
                  <span className="px-3 py-1 rounded-none bg-[#00DF81] text-[#07090C] font-mono text-[10px] font-bold uppercase mb-3 inline-block">
                    {tier.badge}
                  </span>
                )}
                <h3 className="font-display font-bold text-lg text-white mb-1">
                  {tier.name}
                </h3>
                <p className="text-xs text-slate-400 mb-6 min-h-[34px]">
                  {tier.tagline}
                </p>

                <div className="flex items-baseline gap-2 mb-6 pb-6 border-b border-white/10">
                  <span className="text-lg font-display font-extrabold text-white">€{tier.priceEur.toFixed(2)}</span>
                  <span className="text-xs font-mono text-slate-400">/ carta</span>
                </div>

                <div className="space-y-3 text-xs text-slate-300 font-mono mb-6">
                  <div className="flex items-center gap-2">
                    <span className="text-[#00DF81] font-bold">✓</span>
                    <span>Plazo: <strong>{tier.turnaroundLabel}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#00DF81] font-bold">✓</span>
                    <span>Valor máx: €{tier.maxDeclaredValueEur.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#00DF81] font-bold">✓</span>
                    <span>Subnotas de los 4 cuadrantes</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onNavigate('/submit')}
                className="w-full btn-senior-primary text-xs"
              >
                <span>Seleccionar {tier.name}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
