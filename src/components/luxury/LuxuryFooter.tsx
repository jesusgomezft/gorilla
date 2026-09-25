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
          <div className="lg:col-span-3 flex flex-col items-start">
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

            <div className="flex items-center gap-4 font-mono text-[10px] text-[#5A6357] mb-6">
              <span>MADRID LAB</span>
              <span>•</span>
              <span>LISBON LAB</span>
            </div>

            {/* Social Media */}
            <div className="flex flex-col gap-3">
              <a href="https://instagram.com/gorillagradinginternational" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs text-[#A4ACA1] hover:text-white transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
                <span className="font-sans font-medium tracking-wide">@gorillagradinginternational</span>
              </a>
              <a href="https://tiktok.com/@gorillagrading" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs text-[#A4ACA1] hover:text-white transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.34 2.88 2.88 0 012.31-4.66 2.94 2.94 0 011.66.52V9.38a6.32 6.32 0 00-1.66-.22 6.35 6.35 0 00-6.35 6.35 6.35 6.35 0 0012.7 0v-8.62a8.3 8.3 0 005.76 2.33v-3.45a4.84 4.84 0 01-2-1.08z"/>
                </svg>
                <span className="font-sans font-medium tracking-wide">@gorillagrading</span>
              </a>
            </div>
          </div>

          {/* Quick Nav */}
          <div className="lg:col-span-2 flex flex-col gap-3">
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

          {/* Company & Support */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <span className="font-mono text-[10px] tracking-[0.2em] text-[#A4ACA1] uppercase font-semibold mb-2">
              {language === 'es' ? 'COMPAÑÍA' : 'COMPANY'}
            </span>
            <button onClick={() => onNavigate && onNavigate('/about')} className="text-left text-xs text-[#A4ACA1] hover:text-white transition-colors">
              {language === 'es' ? 'Sobre Nosotros' : 'About Us'}
            </button>
            <button onClick={() => onNavigate && onNavigate('/contact')} className="text-left text-xs text-[#A4ACA1] hover:text-white transition-colors">
              {language === 'es' ? 'Contacto' : 'Contact'}
            </button>
            <button onClick={() => onNavigate && onNavigate('/faq')} className="text-left text-xs text-[#A4ACA1] hover:text-white transition-colors">
              {language === 'es' ? 'Preguntas Frecuentes' : 'FAQ'}
            </button>
          </div>

          {/* Legal */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <span className="font-mono text-[10px] tracking-[0.2em] text-[#A4ACA1] uppercase font-semibold mb-2">
              {language === 'es' ? 'LEGAL' : 'LEGAL'}
            </span>
            <button onClick={() => onNavigate && onNavigate('/terms')} className="text-left text-xs text-[#A4ACA1] hover:text-white transition-colors">
              {language === 'es' ? 'Términos y Condiciones' : 'Terms & Conditions'}
            </button>
            <button onClick={() => onNavigate && onNavigate('/privacy')} className="text-left text-xs text-[#A4ACA1] hover:text-white transition-colors">
              {language === 'es' ? 'Política de Privacidad' : 'Privacy Policy'}
            </button>
            <button onClick={() => onNavigate && onNavigate('/refund')} className="text-left text-xs text-[#A4ACA1] hover:text-white transition-colors">
              {language === 'es' ? 'Política de Reembolso' : 'Refund Policy'}
            </button>
            <button onClick={() => onNavigate && onNavigate('/cookies')} className="text-left text-xs text-[#A4ACA1] hover:text-white transition-colors">
              {language === 'es' ? 'Política de Cookies' : 'Cookie Policy'}
            </button>
            <button onClick={() => onNavigate && onNavigate('/cookie-consent')} className="text-left text-xs text-[#A4ACA1] hover:text-white transition-colors">
              {language === 'es' ? 'Consentimiento de Cookies' : 'Cookie Consent'}
            </button>
          </div>

          {/* Standards & Certifications */}
          <div className="lg:col-span-3 flex flex-col gap-3">
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
            © 2026 GORILLA GRADING · {language === 'es' ? 'TODOS LOS DERECHOS RESERVADOS' : 'ALL RIGHTS RESERVED'}
          </div>

          <div className="flex items-center gap-6">
            <button 
              onClick={() => setLanguage(language === 'es' ? 'en' : 'es')} 
              className="hover:text-white transition-colors text-white font-bold flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {language === 'es' ? 'ES' : 'EN'}
            </button>
            <span className="hover:text-gray-300 transition-colors cursor-pointer">{language === 'es' ? 'PRIVACIDAD' : 'PRIVACY'}</span>
            <span className="hover:text-gray-300 transition-colors cursor-pointer">{language === 'es' ? 'TÉRMINOS' : 'TERMS'}</span>
            <span className="hover:text-gray-300 transition-colors cursor-pointer">{language === 'es' ? 'GARANTÍA' : 'WARRANTY'}</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
