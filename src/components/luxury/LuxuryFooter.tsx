import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { GorillaLogo } from './GorillaLogo';

interface LuxuryFooterProps {
  onNavigate?: (path: string) => void;
}

export const LuxuryFooter: React.FC<LuxuryFooterProps> = ({ onNavigate }) => {
  const { language, setLanguage } = useLanguage();

  return (
    <footer className="w-full bg-[#2B302B] text-white py-16 px-6 lg:px-12 border-t border-white/[0.06] select-none">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Top Footer Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-14 border-b border-white/[0.06]">
          
          {/* Brand Info */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <div 
              onClick={() => onNavigate && onNavigate('/')}
              className="cursor-pointer group mb-4"
            >
              <GorillaLogo />
            </div>
            
            <p className="text-xs text-[#A4ACA1] max-w-sm leading-relaxed mb-6 font-normal">
              {language === 'es'
                ? 'El estándar europeo de graduación óptica submilimétrica, autenticación forense multiespectral y encapsulado sónico hermético.'
                : 'The European standard for sub-millimeter optical grading, forensic multispectral authentication, and ultrasonic hermetic encapsulation.'
              }
            </p>

            <div className="flex items-center gap-4 font-mono text-[10px] text-[#5A6357]">
              <span>MADRID LAB</span>
              <span>•</span>
              <span>LISBON LAB</span>
            </div>
          </div>

          {/* Quick Nav */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <span className="font-mono text-[10px] tracking-[0.2em] text-[#A4ACA1] uppercase font-semibold mb-2">
              {language === 'es' ? 'SERVICIOS' : 'SERVICES'}
            </span>
            <button onClick={() => onNavigate && onNavigate('/submit')} className="text-left text-xs text-[#A4ACA1] hover:text-white transition-colors">
              {language === 'es' ? 'Enviar Cartas' : 'Submit Cards'}
            </button>
            <button onClick={() => onNavigate && onNavigate('/verify')} className="text-left text-xs text-[#A4ACA1] hover:text-white transition-colors">
              {language === 'es' ? 'Verificar Certificado' : 'Verify Certificate'}
            </button>
            <button onClick={() => onNavigate && onNavigate('/pricing')} className="text-left text-xs text-[#A4ACA1] hover:text-white transition-colors">
              {language === 'es' ? 'Tarifas & Plazos' : 'Pricing & Tiers'}
            </button>
            <button onClick={() => onNavigate && onNavigate('/track')} className="text-left text-xs text-[#A4ACA1] hover:text-white transition-colors">
              {language === 'es' ? 'Seguimiento en Vivo' : 'Live Tracking'}
            </button>
          </div>

          {/* Standards & Certifications */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            <span className="font-mono text-[10px] tracking-[0.2em] text-[#A4ACA1] uppercase font-semibold mb-2">
              {language === 'es' ? 'ESTÁNDARES ÓPTICOS' : 'OPTICAL STANDARDS'}
            </span>
            <div className="bg-transparent p-4 rounded-none border border-white/[0.07] flex flex-col gap-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-[#A4ACA1]">CALIBRE LÁSER:</span>
                <span className="text-[#48C765] font-bold">0.01 mm</span>
              </div>
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-[#A4ACA1]">FILTRACIÓN UV:</span>
                <span className="text-white font-bold">99.4% ACRÍLICO</span>
              </div>
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-[#A4ACA1]">SELLADO SÓNICO:</span>
                <span className="text-white font-bold">35 kHz HERMÉTICO</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#5A6357]">
          <div>
            © 2026 GORILLA GRADING · ALL RIGHTS RESERVED
          </div>

          <div className="flex items-center gap-6">
            <span className="hover:text-gray-300 transition-colors cursor-pointer">PRIVACY</span>
            <span className="hover:text-gray-300 transition-colors cursor-pointer">TERMS</span>
            <span className="hover:text-gray-300 transition-colors cursor-pointer">WARRANTY</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
