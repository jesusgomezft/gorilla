import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

interface MissionBannerProps {
  onNavigate?: (path: string) => void;
}

export const MissionBanner: React.FC<MissionBannerProps> = ({ onNavigate }) => {
  const { t } = useLanguage();

  return (
    <section className="relative w-full bg-[#454545] text-white overflow-hidden select-none min-h-[500px] flex items-center">
      
      {/* The Box Image - Positioned absolutely to the left */}
      <img 
        src="/images/ourmission.png?v=7" 
        alt="Gorilla Grading Box" 
        className="absolute left-0 top-0 h-full w-full lg:w-[50%] object-cover object-center lg:object-right opacity-90 z-0"
      />
      {/* Smooth fade from the image on the left to the solid background on the right */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[#454545]/85 lg:hidden" />
        <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-transparent via-[#454545]/80 to-[#454545]" />
      </div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-12 py-16 flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
        
        {/* Empty left half to reserve space for the absolute positioned image */}
        <div className="hidden lg:block lg:w-[45%] shrink-0"></div>

        {/* Text and buttons (always pushed to the right side on desktop, stacked on mobile) */}
        <div className="w-full lg:w-[35%] flex flex-col justify-center mt-8 lg:mt-0 z-10 bg-transparent p-0 rounded-none">
          <p className="font-mono text-[10px] tracking-[0.2em] text-[#A4ACA1] uppercase mb-4">
            {t('ref.mission.eyebrow')}
          </p>
          <h2 className="font-sans font-bold text-3xl sm:text-4xl lg:text-[40px] text-white uppercase leading-[1.1] mb-5 tracking-wide max-w-[500px]">
            {t('ref.mission.title2')}
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#C2C9C3] max-w-[480px] font-normal leading-relaxed mb-8">
            {t('ref.mission.desc2')}
          </p>
          
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => onNavigate && onNavigate('/about')}
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-none border border-white/20 hover:border-white/60 bg-[#454545]/50 lg:bg-transparent text-white text-sm font-medium transition-all group"
            >
              <span>{t('ref.mission.btn1')}</span>
              <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
            </button>
            <button
              onClick={() => onNavigate && onNavigate('/submit')}
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-none bg-[#75E28E] hover:bg-[#56E075] text-[#14170F] text-sm font-semibold transition-all group"
            >
              <span>{t('ref.mission.btn2')}</span>
              <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
            </button>
          </div>
        </div>

        {/* Right Menu/List */}
        <div className="w-full lg:w-[20%] flex flex-col justify-center pt-8 lg:pt-0">
          <div className="flex flex-col">
            
            <div className="flex items-center gap-5 py-4 border-b border-white/10 group cursor-default">
              <svg className="w-5 h-5 text-white opacity-80 group-hover:opacity-100 group-hover:text-[#48C765] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="font-sans text-[11px] font-bold tracking-[0.15em] uppercase text-white group-hover:text-[#48C765] transition-colors">{t('ref.mission.trust')}</span>
            </div>

            <div className="flex items-center gap-5 py-4 border-b border-white/10 group cursor-default">
              <svg className="w-5 h-5 text-white opacity-80 group-hover:opacity-100 group-hover:text-[#48C765] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <span className="font-sans text-[11px] font-bold tracking-[0.15em] uppercase text-white group-hover:text-[#48C765] transition-colors">{t('ref.mission.transparency')}</span>
            </div>

            <div className="flex items-center gap-5 py-4 border-b border-white/10 group cursor-default">
              <svg className="w-5 h-5 text-white opacity-80 group-hover:opacity-100 group-hover:text-[#48C765] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <span className="font-sans text-[11px] font-bold tracking-[0.15em] uppercase text-white group-hover:text-[#48C765] transition-colors">{t('ref.mission.innovation')}</span>
            </div>

            <div className="flex items-center gap-5 py-4 border-b border-white/10 group cursor-default">
              <svg className="w-5 h-5 text-white opacity-80 group-hover:opacity-100 group-hover:text-[#48C765] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="font-sans text-[11px] font-bold tracking-[0.15em] uppercase text-white group-hover:text-[#48C765] transition-colors">{t('ref.mission.community')}</span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
