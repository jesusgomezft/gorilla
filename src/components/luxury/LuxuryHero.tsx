import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';

interface LuxuryHeroProps {
  onNavigate?: (path: string) => void;
  onOpenTechModal?: () => void;
}

export const LuxuryHero: React.FC<LuxuryHeroProps> = ({ onNavigate, onOpenTechModal }) => {
  const { t } = useLanguage();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    setMousePos({ x, y });
  };

  return (
    <section 
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-[88vh] lg:min-h-[92vh] flex items-center overflow-hidden bg-[#454545] text-white pt-4 pb-0 select-none border-b border-black"
    >
      
      {/* 1. FULL BACKGROUND CINEMATIC ARTWORK (gorila.png in background) */}
      <div 
        className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
        style={{ perspective: '1000px' }}
      >
        <img 
          src={`/images/gorila.png?v=${Date.now()}`}
          alt="Gorilla Grading - Master Artwork" 
          className="w-full h-full object-cover object-[65%_center] lg:object-center transition-transform duration-[1200ms] ease-out will-change-transform"
          style={{
            transform: `scale(0.95) translate3d(${mousePos.x * -12}px, ${mousePos.y * -12}px, 0) rotateY(${mousePos.x * 2}deg) rotateX(${mousePos.y * -2}deg)`
          }}
        />
        
        {/* Editorial Text Readability Gradients: dark smoke on the left to ensure 100% text contrast without obscuring the gorilla */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#454545]/90 via-[#454545]/65 to-transparent w-full lg:w-[48%] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#454545] via-transparent to-transparent h-32 bottom-0 top-auto pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#454545]/80 via-transparent to-transparent h-24 pointer-events-none" />
      </div>

      {/* 2. FOREGROUND EDITORIAL CONTENT (Text on Left, Artwork Center/Right, Rail Far Right) */}
      <div className="relative z-10 max-w-[1440px] w-full mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 items-center min-h-[82vh]">
        
        {/* Left Column: Headlines, Copy, Buttons, Social Proof */}
        <div className="lg:col-span-7 xl:col-span-7 flex flex-col justify-center py-12 pl-4 sm:pl-8 lg:pl-16 xl:pl-24">
          
          {/* Technical Kicker */}
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-xs font-semibold tracking-[0.28em] text-[#A4ACA1] uppercase">
              {t('ref.hero.eyebrow')}
            </span>
          </div>

          {/* Monumental Display Headline (Architectural Senior Grotesque - Oswald 700) */}
          <h1 className="font-['Oswald'] font-[700] text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-6xl leading-[0.95] tracking-[0.01em] text-white mb-7 uppercase">
            {t('ref.hero.title1')}<br />
            {t('ref.hero.title2')}<span className="text-[#48C765]">{t('ref.hero.titleGreen')}</span>
          </h1>

          {/* Clear Editorial Description */}
          <div className="relative mb-9">
            <p className="relative font-sans text-base sm:text-lg text-[#C2C9C3] max-w-[490px] leading-relaxed font-normal">
              {t('ref.hero.desc')}
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-6 sm:gap-8 mb-12">
            {/* Primary Capsule Button */}
            <button
              onClick={() => onNavigate && onNavigate('/submit')}
              className="group relative inline-flex items-center gap-2 px-6 py-3 sm:px-8 sm:py-3 rounded-none bg-[#48C765] hover:bg-[#3A9F50] transition-all duration-300 cursor-pointer shadow-[0_0_20px_rgba(72,199,101,0.2)] hover:shadow-[0_0_30px_rgba(72,199,101,0.4)]"
            >
              <span className="relative z-10 font-sans font-bold text-xs tracking-widest text-[#14170F] uppercase select-none">
                {t('ref.hero.ctaPrimary')}
              </span>
              <span className="relative z-10 ml-1 transition-transform duration-300 group-hover:translate-x-1 text-[#14170F]">→</span>
            </button>

            {/* Secondary Action */}
            <a
              href="#technology"
              onClick={(e) => {
                if (onOpenTechModal) {
                  e.preventDefault();
                  onOpenTechModal();
                }
              }}
              className="group inline-flex items-center gap-2 px-5 py-3 sm:px-6 sm:py-3 rounded-none bg-[#454545]/60 hover:bg-[#454545] border border-[#48C765]/50 hover:border-[#48C765] transition-all duration-300 cursor-pointer"
            >
              <span className="text-xs font-semibold tracking-wide text-white select-none">
                {t('ref.hero.ctaSecondary')}
              </span>
              <div className="flex items-center justify-center pl-[2px] transition-transform duration-300 group-hover:scale-110">
                <svg className="w-2.5 h-2.5 text-[#48C765]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </a>
          </div>



          {/* Pricing & Turnaround Info + Technical Categories Ticker */}
          <div className="mt-8 flex flex-col gap-3">
            <div className="font-sans text-xs tracking-wide text-[#A0A7A1]">
              Planes desde <span className="text-white font-medium">15 €</span> <span className="mx-1.5 opacity-50">·</span> Plazos desde <span className="text-white font-medium">5 días</span>
            </div>
            <div className="font-mono text-[11px] tracking-[0.25em] text-[#A4ACA1] uppercase">
              {t('ref.hero.categories')}
            </div>
          </div>

        </div>

        {/* Right Editorial Rail (Matches Reference Image) */}
        <div className="hidden xl:flex xl:col-span-5 h-full items-center justify-end pr-2 pointer-events-none select-none">
          <div className="flex flex-col items-center justify-between h-[480px] text-right py-4">
            <div className="flex flex-col items-center gap-7">
              <span className="font-mono text-[10px] tracking-[0.38em] text-[#A4ACA1] uppercase [writing-mode:vertical-rl] rotate-180">
                MORE THAN A GRADE
              </span>
              <div className="w-[1px] h-20 bg-white/20" />
              <span className="font-mono text-[10px] tracking-[0.38em] text-[#A4ACA1] uppercase [writing-mode:vertical-rl] rotate-180">
                A HIGHER STANDARD
              </span>
            </div>
            
            {/* European Grading Standard Circular Seal */}
            <div className="relative w-16 h-16 flex items-center justify-center p-2 opacity-70">
              <svg className="w-full h-full text-[#A4ACA1] animate-[spin_60s_linear_infinite]" viewBox="0 0 100 100">
                <path id="sealPath" fill="transparent" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
                <text className="text-[7.5px] font-mono uppercase tracking-[0.22em] fill-white/70">
                  <textPath href="#sealPath">EUROPEAN GRADING STANDARD • COLLECT & TRUST •</textPath>
                </text>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-[#48C765]" />
              </div>
            </div>
          </div>
        </div>

      </div>

    </section>
  );
};
