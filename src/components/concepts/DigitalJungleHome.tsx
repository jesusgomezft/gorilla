import React, { useState } from 'react';
import { MOCK_GRADED_CARDS } from '../../data/mockCards';
import { SlabCard } from '../common/SlabCard';
import { MOCK_SERVICES } from '../../data/mockServices';
import { useLanguage } from '../../context/LanguageContext';
import { 
  Trees, 
  Sparkles, 
  MapPin, 
  Scan, 
  ArrowRight, 
  Zap, 
  Radio, 
  Calendar,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

interface DigitalJungleHomeProps {
  onNavigate: (path: string) => void;
}

export const DigitalJungleHome: React.FC<DigitalJungleHomeProps> = ({ onNavigate }) => {
  const { t } = useLanguage();
  const mangaCard = MOCK_GRADED_CARDS[3]; // Shanks Manga Secret Rare
  const [activeStage, setActiveStage] = useState(1);
  const [bananaCheckInput, setBananaCheckInput] = useState('');
  const [bananaCheckResult, setBananaCheckResult] = useState<null | { estimate: string; tip: string }>(null);

  const stages = [
    { title: 'Recepción en Feria o Envío', subtitle: 'En Card Shows o mensajería asegurada' },
    { title: 'Diagnóstico Láser Multieje', subtitle: 'Escaneo espectral y centrado a 40x' },
    { title: 'Escudo Sónico Gorilla', subtitle: 'Fusión acrílica ultrasónica con chip NFC' },
    { title: 'Sincronización Inmediata', subtitle: 'Certificado digital activo en tu bóveda' }
  ];

  const handleBananaCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bananaCheckInput.trim()) return;
    setBananaCheckResult({
      estimate: 'Potencial Gem-Mint (9.5 – 10.0)',
      tip: 'Las tiradas japonesas modernas suelen mantener un centrado 50/50 excelente. ¡Asegúrate de retirar micro-polvo antes de enfundar!'
    });
  };

  return (
    <div className="space-y-28 pb-28 text-slate-100 jungle-grid-mesh">
      
      {/* 1. HERO: The Digital Gorilla Arena */}
      <section className="relative pt-8 sm:pt-14 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-none bg-[#00DF81]/15 border border-[#00DF81]/40 text-[#00DF81] font-mono text-xs font-bold shadow-[0_0_15px_rgba(0,223,129,0.2)]">
                <Trees className="w-3.5 h-3.5" />
                <span>{t('jungle.tag')}</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-lg font-display font-extrabold text-white tracking-tight leading-[1.08]">
                {t('jungle.heroTitle')} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00DF81] via-teal-300 to-emerald-200">
                  {t('jungle.heroSubtitle')}
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
                {t('jungle.heroDesc')}
              </p>

              {/* Show Presence Banner */}
              <div className="p-4 rounded-none bg-[#0B1A10]/90 border border-[#142E1D] flex items-center gap-4 text-xs shadow-lg">
                <div className="p-2.5 rounded-none bg-[#00DF81]/20 text-[#00DF81] shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-white flex items-center gap-2">
                    <span>{t('jungle.showPresence')}</span>
                    <span className="px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 text-[10px] font-mono font-bold">
                      {t('jungle.thisWeekend')}
                    </span>
                  </div>
                  <div className="text-slate-400 mt-0.5">
                    {t('jungle.showCities')}
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <button
                  onClick={() => onNavigate('/submit')}
                  className="btn-senior-primary"
                >
                  <span>{t('nav.submit')}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onNavigate('/track')}
                  className="btn-senior-secondary"
                >
                  <Radio className="w-4 h-4 text-gorilla-neon" />
                  <span>{t('nav.track')}</span>
                </button>
              </div>

            </div>

            {/* Right: Modern Slab Protagonist */}
            <div className="lg:col-span-5 flex justify-center">
              <SlabCard card={mangaCard} size="lg" />
            </div>

          </div>
        </div>
      </section>

      {/* 2. CARD JOURNEY ANIMATION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="senior-card p-8 sm:p-12">
          
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="font-mono text-xs text-gorilla-neon uppercase tracking-wider font-bold">
              El Viaje Físico y Digital
            </span>
            <h2 className="text-lg font-display font-bold text-white">
              De Carta Cruda a Slab Blindado
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stages.map((stage, idx) => {
              const isActive = activeStage === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setActiveStage(idx)}
                  className={`p-5 rounded-none cursor-pointer border transition-all ${
                    isActive
                      ? 'bg-[#00DF81]/15 border-[#00DF81] ring-2 ring-[#00DF81]/30 shadow-lg'
                      : 'bg-[#454545]/40 border-white/[0.08] hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded-none ${
                      isActive ? 'bg-[#00DF81] text-[#07090C]' : 'bg-white/10 text-slate-300'
                    }`}>
                      0{idx + 1}
                    </span>
                    {isActive && <Zap className="w-4 h-4 text-gorilla-neon" />}
                  </div>
                  <h4 className="font-display font-bold text-base text-white mb-1">
                    {stage.title}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed font-sans">
                    {stage.subtitle}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 3. INFORMAL "BANANA CHECK" SHOW BOOTH UTILITY */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-7 sm:p-10 rounded-none bg-gradient-to-r from-amber-950/30 via-[#0B1017] to-[#0B1A10] border border-amber-500/40 shadow-2xl">
          <div className="flex flex-col md:flex-row items-center gap-6">
            
            <div className="text-lg sm:text-lg select-none">🍌</div>

            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-none bg-amber-400/20 text-amber-300 font-mono text-[10px] font-bold uppercase tracking-wider mb-2 border border-amber-500/30">
                {t('jungle.bananaTag')}
              </div>
              <h3 className="font-display font-bold text-lg sm:text-lg text-white">
                {t('jungle.bananaTitle')}
              </h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                {t('jungle.bananaDesc')}
              </p>

              <form onSubmit={handleBananaCheck} className="mt-4 flex flex-col sm:flex-row gap-2.5">
                <input
                  type="text"
                  placeholder={t('jungle.bananaPlaceholder')}
                  value={bananaCheckInput}
                  onChange={(e) => setBananaCheckInput(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-none bg-[#454545]/60 border border-white/15 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 font-sans"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-none bg-amber-400 hover:bg-amber-300 text-[#07090C] font-bold text-xs transition-colors shadow-md shrink-0"
                >
                  {t('jungle.bananaBtn')}
                </button>
              </form>

              {bananaCheckResult && (
                <div className="mt-4 p-4 rounded-none bg-[#454545]/80 border border-amber-400/50 text-left text-xs space-y-1.5 shadow-inner">
                  <div className="font-bold text-amber-300 flex items-center gap-1.5">
                    <span>{bananaCheckResult.estimate}</span>
                  </div>
                  <p className="text-slate-300 text-[11px] leading-relaxed">{bananaCheckResult.tip}</p>
                  <p className="text-[10px] text-slate-500 font-mono italic">
                    *Las notas oficiales requieren análisis óptico láser en laboratorio.
                  </p>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};
