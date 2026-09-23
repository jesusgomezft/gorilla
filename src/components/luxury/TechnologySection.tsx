import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

export const TechnologySection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section 
      id="technology" 
      className="relative w-full text-white overflow-hidden select-none"
    >
      {/* Full Width Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/tecnoSeccion.png?v=7')" }}
      />
      
      {/* Dark overlay to ensure text is readable */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[#454545]/85 lg:hidden" />
        <div className="hidden lg:flex w-full h-full">
          <div className="w-2/5 bg-gradient-to-r from-[#454545] via-[#454545]/90 to-transparent" />
          <div className="w-1/5" />
          <div className="w-2/5 bg-gradient-to-l from-[#454545] via-[#454545]/80 to-transparent" />
        </div>
      </div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-12 py-16 lg:py-32 min-h-[600px] flex items-center">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 w-full items-center">
          
          {/* Left Copy Overlay */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <p className="font-mono text-[10px] tracking-[0.2em] text-[#A4ACA1] uppercase mb-4">OUR PROCESS</p>
            <h2 className="font-['Oswald'] font-[700] text-4xl sm:text-5xl lg:text-[46px] xl:text-[52px] tracking-[0.01em] text-white uppercase leading-[1.05] mb-5 whitespace-pre-line">
              {t('ref.tech.title2').replace('MEETS', '\nMEETS').replace('Y EXPERIENCIA', '\nY EXPERIENCIA')}
            </h2>
            <p className="font-sans text-sm sm:text-base text-[#A4ACA1] max-w-[360px] font-normal leading-relaxed mb-8">
              {t('ref.tech.desc2')}
            </p>
            
            <a
              href="#explore"
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-none border border-[#48C765] text-[#48C765] hover:bg-[#48C765] hover:text-[#14170F] text-sm font-medium transition-all group w-fit"
            >
              <span>{t('ref.tech.explore')}</span>
              <svg className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>

          {/* Empty spacer for center image focus */}
          <div className="hidden lg:block lg:col-span-3"></div>

          {/* Right Steps */}
          <div className="lg:col-span-4 flex flex-col justify-center lg:pl-10">
            <div className="flex flex-col border-l border-white/10">
              
              {/* Step 1 */}
              <div className="flex gap-6 py-6 px-6 border-b border-white/5 relative bg-gradient-to-r from-white/[0.02] to-transparent">
                <div className="absolute top-0 left-[-1px] w-[2px] h-full bg-gradient-to-b from-[#48C765] to-transparent"></div>
                <span className="font-mono text-lg text-[#48C765] font-bold">01</span>
                <div>
                  <h4 className="font-sans font-bold text-sm tracking-widest text-white uppercase mb-1">{t('ref.tech.step1')}</h4>
                  <p className="text-xs text-[#A4ACA1]">{t('ref.tech.step1Desc')}</p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-6 py-6 px-6 border-b border-white/5 relative">
                <div className="absolute top-0 left-[-1px] w-[2px] h-full bg-transparent hover:bg-gradient-to-b hover:from-[#48C765] hover:to-transparent transition-colors"></div>
                <span className="font-mono text-lg text-[#48C765] font-bold">02</span>
                <div>
                  <h4 className="font-sans font-bold text-sm tracking-widest text-white uppercase mb-1">{t('ref.tech.step2')}</h4>
                  <p className="text-xs text-[#A4ACA1]">{t('ref.tech.step2Desc')}</p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-6 py-6 px-6 border-b border-white/5 relative">
                <div className="absolute top-0 left-[-1px] w-[2px] h-full bg-transparent hover:bg-gradient-to-b hover:from-[#48C765] hover:to-transparent transition-colors"></div>
                <span className="font-mono text-lg text-[#48C765] font-bold">03</span>
                <div>
                  <h4 className="font-sans font-bold text-sm tracking-widest text-white uppercase mb-1">{t('ref.tech.step3')}</h4>
                  <p className="text-xs text-[#A4ACA1]">{t('ref.tech.step3Desc')}</p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex gap-6 py-6 px-6 border-b border-white/5 relative">
                <div className="absolute top-0 left-[-1px] w-[2px] h-full bg-transparent hover:bg-gradient-to-b hover:from-[#48C765] hover:to-transparent transition-colors"></div>
                <span className="font-mono text-lg text-[#48C765] font-bold">04</span>
                <div>
                  <h4 className="font-sans font-bold text-sm tracking-widest text-white uppercase mb-1">{t('ref.tech.step4')}</h4>
                  <p className="text-xs text-[#A4ACA1]">{t('ref.tech.step4Desc')}</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};


