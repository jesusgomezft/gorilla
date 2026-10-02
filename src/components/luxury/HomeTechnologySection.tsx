import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';

interface HomeTechnologySectionProps {
  onNavigate: (path: string) => void;
}

export const HomeTechnologySection: React.FC<HomeTechnologySectionProps> = ({ onNavigate }) => {
  const { t } = useLanguage();
  const { theme } = useTheme();

  const isLight = theme === 'light';

  return (
    <section className={`relative w-full py-20 lg:py-24 px-6 lg:px-12 border-b overflow-hidden select-none transition-colors duration-300 ${
      isLight ? 'bg-[#ECE7DF] text-[#1C201D] border-black/[0.06]' : 'bg-[#14170F] text-white border-white/[0.06]'
    }`}>
      
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-[#48C765]/10 blur-[130px] rounded-none" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          
          {/* COLUMN 1: Left Copy (Centered on mobile, left-aligned on desktop) */}
          <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left pr-0 lg:pr-2">
            <h2 className={`font-['Oswald'] font-[700] text-3xl sm:text-4xl lg:text-[38px] xl:text-[42px] tracking-[0.01em] uppercase leading-[1.05] mb-4 whitespace-pre-line text-center lg:text-left ${
              isLight ? 'text-[#1C201D]' : 'text-white'
            }`}>
              {t('ref.tech.title').replace(' QUE ', ' QUE\n').replace(' LA ', '\nLA ').replace('THAT REVEALS', 'THAT REVEALS\n')}
            </h2>
            <p className={`font-sans text-sm max-w-[360px] font-normal leading-relaxed mb-8 mx-auto lg:mx-0 text-center lg:text-left ${
              isLight ? 'text-[#555C54]' : 'text-[#A4ACA1]'
            }`}>
              {t('ref.tech.desc')}
            </p>
            
            <button
              onClick={() => onNavigate('/technology')}
              className={`inline-flex items-center justify-center gap-3 font-mono text-xs font-bold tracking-[0.2em] uppercase transition-colors group w-fit cursor-pointer bg-transparent border-none p-0 mx-auto lg:mx-0 self-center lg:self-start ${
                isLight ? 'text-[#2D9A46] hover:text-[#1C201D]' : 'text-[#48C765] hover:text-white'
              }`}
            >
              <span className={`border-b pb-0.5 ${isLight ? 'border-[#2D9A46]' : 'border-[#48C765]'}`}>{t('ref.tech.explore')}</span>
              <div className={`w-7 h-7 rounded-none border flex items-center justify-center transition-transform group-hover:translate-x-1 ${
                isLight ? 'border-[#2D9A46] group-hover:border-[#1C201D]' : 'border-[#48C765] group-hover:border-white'
              }`}>
                <svg className={`w-3 h-3 transition-colors ${isLight ? 'text-[#2D9A46] group-hover:text-[#1C201D]' : 'text-[#48C765] group-hover:text-white'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </button>
          </div>

          {/* COLUMN 2: Panoramic Artwork Sequence */}
          <div className="lg:col-span-8 flex items-center justify-end">
            <div className="relative w-full max-w-[880px]">
              <img 
                src={theme === 'dark' ? '/images/Dark/tecnologia.png' : '/images/tecnologia.png'} 
                alt="Gorilla Optical Technology Sequence"
                className="w-full h-auto object-contain scale-105 origin-right"
                style={{ 
                  WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%), linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
                  WebkitMaskComposite: 'source-in',
                  maskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%), linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
                  maskComposite: 'intersect'
                }}
              />
            </div>
          </div>

        </div>

      </div>

    </section>
  );
};
