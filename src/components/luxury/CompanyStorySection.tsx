import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

export const CompanyStorySection: React.FC = () => {
  const { language } = useLanguage();

  return (
    <section className="w-full bg-[#454545] text-white pt-24 pb-24 px-6 lg:px-12 relative overflow-hidden">
      
      {/* Background Subtle Elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#48C765]/[0.015] blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-white/[0.01] blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-[1200px] mx-auto relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-20 animate-fade-in-up">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-[1px] bg-[#48C765]"></span>
            <span className="font-mono text-[10px] font-bold tracking-[0.25em] text-[#48C765] uppercase">
              {language === 'es' ? 'NUESTRA HISTORIA' : 'OUR STORY'}
            </span>
            <span className="w-8 h-[1px] bg-[#48C765]"></span>
          </div>
          
          <h1 className="font-['Oswald'] font-[700] text-4xl sm:text-6xl uppercase tracking-wide leading-tight mb-8">
            {language === 'es' ? 'REDEFINIENDO EL ESTÁNDAR ' : 'REDEFINING THE STANDARD '}
            <br/>
            <span className="text-[#48C765]">{language === 'es' ? 'A NIVEL MUNDIAL' : 'GLOBALLY'}</span>
          </h1>
          
          <p className="font-sans text-sm sm:text-base text-[#A4ACA1] max-w-2xl leading-relaxed text-justify">
            {language === 'es' 
              ? 'Nacimos de la frustración de coleccionistas de todo el mundo cansados de servicios lentos y subjetivos. Gorilla Grading surge para ofrecer precisión óptica, velocidad y total transparencia a escala internacional.' 
              : 'Born from the frustration of collectors worldwide tired of slow and subjective services. Gorilla Grading emerged to offer optical precision, speed, and total transparency on an international scale.'}
          </p>
        </div>

        {/* The Grid / Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          
          {/* Pillar 1 */}
          <div className="bg-[#161B16]/50 border border-white/[0.04] p-8 md:p-10 flex flex-col items-start group hover:bg-[#161B16] transition-colors duration-500">
            <div className="mb-6 text-[#16A34A] dark:text-[#48C765] group-hover:scale-105 transition-transform duration-300">
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-['Oswald'] text-xl uppercase tracking-wide text-white mb-4">
              {language === 'es' ? 'ALCANCE GLOBAL' : 'GLOBAL REACH'}
            </h3>
            <p className="font-sans text-xs text-[#A4ACA1] leading-relaxed text-justify">
              {language === 'es' 
                ? 'Con laboratorios y logística optimizada, ofrecemos un servicio de graduación rápido y seguro para coleccionistas sin importar de dónde vengan, eliminando los tiempos de espera absurdos.' 
                : 'With optimized laboratories and logistics, we offer a fast and secure grading service for collectors no matter where they are from, eliminating absurd wait times.'}
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="bg-[#161B16]/50 border border-white/[0.04] p-8 md:p-10 flex flex-col items-start group hover:bg-[#161B16] transition-colors duration-500">
            <div className="mb-6 text-[#16A34A] dark:text-[#48C765] group-hover:scale-105 transition-transform duration-300">
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="font-['Oswald'] text-xl uppercase tracking-wide text-white mb-4">
              {language === 'es' ? 'VERDAD ABSOLUTA' : 'ABSOLUTE TRUTH'}
            </h3>
            <p className="font-sans text-xs text-[#A4ACA1] leading-relaxed text-justify">
              {language === 'es' 
                ? 'Se acabó el depender del "buen o mal día" de un graduador humano. Implementamos tecnología óptica y láser porque los números no mienten.' 
                : 'No more depending on a human grader\'s "good or bad day". We implemented optical and laser technology because numbers don\'t lie.'}
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="bg-[#161B16]/50 border border-white/[0.04] p-8 md:p-10 flex flex-col items-start group hover:bg-[#161B16] transition-colors duration-500">
            <div className="mb-6 text-[#16A34A] dark:text-[#48C765] group-hover:scale-105 transition-transform duration-300">
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3 className="font-['Oswald'] text-xl uppercase tracking-wide text-white mb-4">
              {language === 'es' ? 'PARA COLECCIONISTAS' : 'FOR COLLECTORS'}
            </h3>
            <p className="font-sans text-xs text-[#A4ACA1] leading-relaxed text-justify">
              {language === 'es' 
                ? 'No somos un fondo de inversión sin alma. Somos entusiastas de los TCG, diseñando el producto que siempre quisimos usar para nuestras propias colecciones.' 
                : 'We are not a soulless investment fund. We are TCG enthusiasts, building the exact product we always wanted to use for our own collections.'}
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
