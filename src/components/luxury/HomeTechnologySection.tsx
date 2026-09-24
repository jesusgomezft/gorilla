import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

interface HomeTechnologySectionProps {
  onNavigate: (path: string) => void;
}

export const HomeTechnologySection: React.FC<HomeTechnologySectionProps> = ({ onNavigate }) => {
  const { t } = useLanguage();

  return (
    <section className="relative w-full bg-[#454545] text-white py-20 lg:py-24 px-6 lg:px-12 border-b border-white/[0.06] overflow-hidden select-none">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-[#48C765]/10 blur-[130px] rounded-none" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          
          {/* COLUMN 1: Left Copy */}
          <div className="lg:col-span-4 flex flex-col justify-center pr-2">
            <h2 className="font-['Oswald'] font-[700] text-3xl sm:text-4xl lg:text-[38px] xl:text-[42px] tracking-[0.01em] text-white uppercase leading-[1] mb-4 whitespace-pre-line">
              {t('ref.tech.title').replace(' QUE ', ' QUE\n').replace(' LA ', '\nLA ').replace('THAT REVEALS', 'THAT REVEALS\n')}
            </h2>
            <p className="font-sans text-sm text-[#A4ACA1] max-w-[360px] font-normal leading-relaxed mb-8">
              {t('ref.tech.desc')}
            </p>
            
            <button
              onClick={() => onNavigate('/technology')}
              className="inline-flex items-center gap-3 font-mono text-xs font-bold tracking-[0.2em] text-[#48C765] hover:text-white uppercase transition-colors group w-fit cursor-pointer bg-transparent border-none p-0"
            >
              <span className="border-b border-[#48C765] pb-0.5">{t('ref.tech.explore')}</span>
              <div className="w-7 h-7 rounded-none border border-[#48C765] flex items-center justify-center transition-transform group-hover:translate-x-1 group-hover:border-white">
                <svg className="w-3 h-3 text-[#48C765] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </button>
          </div>

          {/* COLUMN 2: Panoramic Artwork Sequence */}
          <div className="lg:col-span-8 flex items-center justify-end">
            <div 
              className="relative w-full max-w-[880px] drop-shadow-[0_20px_45px_rgba(0,0,0,0.9)]"
              style={{
                WebkitMaskImage: 'radial-gradient(ellipse 95% 85% at 50% 50%, black 60%, transparent 100%)',
                maskImage: 'radial-gradient(ellipse 95% 85% at 50% 50%, black 60%, transparent 100%)'
              }}
            >
              <img 
                src="/images/tecnologia.png" 
                alt="Gorilla Optical Technology Sequence"
                className="w-full h-auto object-contain scale-105 origin-right"
              />
            </div>
          </div>

        </div>

      </div>

    </section>
  );
};
