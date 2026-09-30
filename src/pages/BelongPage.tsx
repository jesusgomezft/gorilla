import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ArrowLeft } from 'lucide-react';

interface PageProps {
  onNavigate: (path: string) => void;
}

export const BelongPage: React.FC<PageProps> = ({ onNavigate }) => {
  const { t, language } = useLanguage();

  return (
    <div className="relative w-full min-h-[80vh] bg-[#14170F] text-white py-24 px-6 lg:px-12 select-none flex flex-col items-center justify-center overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#48C765]/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Back Button */}
      <button onClick={() => onNavigate('/')} className="absolute top-8 left-6 sm:left-12 flex items-center gap-3 text-white/40 hover:text-[#48C765] transition-colors group z-20">
        <div className="w-10 h-10 rounded-full border border-white/[0.05] flex items-center justify-center group-hover:border-[#48C765]/50 group-hover:bg-[#48C765]/10 transition-all">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        </div>
        <span className="font-mono text-[10px] font-bold tracking-[0.2em] uppercase mt-0.5">{language === 'es' ? 'Volver' : 'Back'}</span>
      </button>

      <div className="relative z-10 max-w-[1000px] mx-auto text-center space-y-10">
        
        {/* Tech/Luxury Badge */}
        <div className="inline-flex relative group">
          {/* Hover Glow */}
          <div className="absolute -inset-[1px] bg-gradient-to-r from-[#48C765]/0 via-[#48C765]/40 to-[#48C765]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-md" />
          
          <div className="relative px-8 py-3 bg-[#1A1E1C] border border-white/[0.05] flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:border-white/[0.05] group-hover:bg-[#1E2320]">
            {/* Tech accents (corners) */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#48C765]" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#48C765]" />
            
            {/* Subtle background line */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />

            <span className="relative z-10 font-mono text-[11px] font-bold tracking-[0.4em] text-[#F4F6F0] uppercase mt-0.5 group-hover:text-[#48C765] transition-colors duration-300">
              {t('ref.pillar4.title')}
            </span>
          </div>
        </div>
        
        <h1 className="font-['Oswald'] font-[700] text-5xl sm:text-6xl text-white uppercase tracking-[0.01em] leading-[0.94]">
          {language === 'es' ? 'ECOSISTEMA EUROPEO' : 'EUROPEAN ECOSYSTEM'}
        </h1>
        
        <p className="font-sans text-lg text-[#A4ACA1] max-w-2xl mx-auto leading-relaxed">
          {t('ref.pillar4.desc')}
        </p>

        <div className="mt-12 bg-[#14170F] border border-white/[0.05] p-8 rounded-none text-left">
          <h3 className="text-[#48C765] font-['Oswald'] font-bold text-2xl uppercase mb-4">
            {language === 'es' ? 'Ventajas del Mercado Unificado' : 'Unified Market Advantages'}
          </h3>
          <ul className="space-y-4 text-[#A4ACA1] font-mono text-sm">
            <li className="flex gap-4 items-center"><span className="text-white bg-[#14170F] px-2 py-1 rounded text-xs">01</span> {language === 'es' ? 'Cero aranceles transatlánticos (27 Estados Miembros)' : 'Zero transatlantic customs (27 Member States)'}</li>
            <li className="flex gap-4 items-center"><span className="text-white bg-[#14170F] px-2 py-1 rounded text-xs">02</span> {language === 'es' ? 'Liquidez de mercado y red de confianza' : 'Market liquidity and trust network'}</li>
            <li className="flex gap-4 items-center"><span className="text-white bg-[#14170F] px-2 py-1 rounded text-xs">03</span> {language === 'es' ? 'Tránsito blindado puerta a puerta asegurado' : 'Fully insured armored door-to-door transit'}</li>
            <li className="flex gap-4 items-center"><span className="text-white bg-[#14170F] px-2 py-1 rounded text-xs">04</span> {language === 'es' ? 'Cadena de custodia ininterrumpida' : 'Uninterrupted chain of custody'}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
