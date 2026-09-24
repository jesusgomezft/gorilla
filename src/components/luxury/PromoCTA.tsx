import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

interface PromoCTAProps {
  onNavigate?: (path: string) => void;
}

export const PromoCTA: React.FC<PromoCTAProps> = ({ onNavigate }) => {
  const { language } = useLanguage();

  return (
    <section className="w-full bg-[#2B302B] text-white py-14 lg:py-16 px-6 lg:px-12 relative overflow-hidden border-y border-white/[0.04]">
      {/* Background graphic */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#48C765]/20 to-transparent blur-3xl" />
      </div>

      <div className="max-w-[1000px] mx-auto relative z-10 flex flex-col items-center text-center">
        
        {/* Icon */}
        <svg className="w-10 h-10 text-[#48C765] mb-5 drop-shadow-[0_0_15px_rgba(72,199,101,0.3)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
        </svg>

        {/* Original Industrial Tech Badge */}
        <div className="flex items-center gap-3 mb-5 opacity-90">
          <div className="text-[#48C765]/60 font-mono text-[10px] leading-none">{'['}</div>
          <div className="flex items-center">
            <span className="font-mono text-[9px] sm:text-[10px] font-bold tracking-[0.3em] text-[#48C765] uppercase leading-none mt-0.5">
              {language === 'es' ? 'ENTREGA EN MANO' : 'PHYSICAL DROP-OFF'}
            </span>
          </div>
          <div className="text-[#48C765]/60 font-mono text-[10px] leading-none">{']'}</div>
        </div>
        
        <h2 className="font-['Oswald'] font-[700] text-3xl sm:text-4xl md:text-5xl text-white uppercase tracking-wide leading-tight mb-5">
          {language === 'es' 
            ? 'No necesitas pagar envío' 
            : "You don't need to pay for shipping"}
        </h2>
        
        <p className="font-sans text-sm md:text-base text-[#C2C9C3] mb-8 max-w-[600px] leading-relaxed">
          {language === 'es'
            ? 'Entrega tus cartas en mano en nuestro próximo Pickup Event.'
            : 'Hand deliver your cards at our next pickup event.'}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => onNavigate && onNavigate('/events')}
            className="group relative inline-flex items-center justify-center px-8 py-3 bg-[#48C765] hover:bg-[#3A9F50] text-[#14170F] font-bold text-xs tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(72,199,101,0.2)] hover:shadow-[0_0_30px_rgba(72,199,101,0.4)]"
          >
            <span>{language === 'es' ? 'Encuentra tu Evento' : 'Find Nearest Event'}</span>
            <svg className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
          
          <button
            onClick={() => onNavigate && onNavigate('/how-it-works')}
            className="inline-flex items-center justify-center px-8 py-3 border border-white/20 hover:border-white/60 bg-transparent text-white font-bold text-xs tracking-widest uppercase transition-all"
          >
            {language === 'es' ? 'Cómo Funciona la Entrega' : 'Drop-Off Info'}
          </button>
        </div>
      </div>
    </section>
  );
};
