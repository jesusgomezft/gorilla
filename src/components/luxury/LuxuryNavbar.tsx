import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { GorillaLogo } from './GorillaLogo';

interface LuxuryNavbarProps {
  onNavigate?: (path: string) => void;
}

export const LuxuryNavbar: React.FC<LuxuryNavbarProps> = ({ onNavigate }) => {
  const { language, setLanguage, t } = useLanguage();
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSearchHint, setShowSearchHint] = useState(false);

  React.useEffect(() => {
    // Initial reveal after 2 seconds
    const initialTimeout = setTimeout(() => {
      setShowSearchHint(true);
      setTimeout(() => setShowSearchHint(false), 3000);
    }, 2000);

    // Loop every 5 seconds
    const interval = setInterval(() => {
      setShowSearchHint(true);
      setTimeout(() => setShowSearchHint(false), 3000);
    }, 5000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim() && onNavigate) {
      onNavigate(`/verify?id=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#454545]/85 backdrop-blur-xl border-b border-white/[0.06] transition-all">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
        
        {/* Brand Logo & Name (Authentic Original Project Logo) */}
        <div 
          onClick={() => onNavigate && onNavigate('/')}
          className="cursor-pointer group"
        >
          <GorillaLogo />
        </div>

        {/* Center Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-10">
          <button 
            onClick={() => onNavigate && onNavigate('/submit')}
            className="text-sm font-medium text-[#A4ACA1] hover:text-[#F4F6F0] transition-colors tracking-wide cursor-pointer"
          >
            {language === 'es' ? 'Enviar Cartas' : 'Submit Cards'}
          </button>
          <button 
            onClick={() => onNavigate && onNavigate('/verify')}
            className="text-sm font-medium text-[#A4ACA1] hover:text-[#F4F6F0] transition-colors tracking-wide cursor-pointer"
          >
            {language === 'es' ? 'Verificar Certificado' : 'Verify Certificate'}
          </button>
          <button 
            onClick={() => onNavigate && onNavigate('/pricing')}
            className="text-sm font-medium text-[#A4ACA1] hover:text-[#F4F6F0] transition-colors tracking-wide cursor-pointer"
          >
            {language === 'es' ? 'Precios y Niveles' : 'Pricing & Tiers'}
          </button>
          <button 
            onClick={() => onNavigate && onNavigate('/tracking')}
            className="text-sm font-medium text-[#A4ACA1] hover:text-[#F4F6F0] transition-colors tracking-wide cursor-pointer"
          >
            {language === 'es' ? 'Seguimiento' : 'Live Tracking'}
          </button>
        </nav>

        {/* Right Tools & CTAs */}
        <div className="flex items-center gap-5">
          {/* Quick Search Trigger */}
          <div className="relative flex items-center">
            {isSearchOpen ? (
              <form onSubmit={handleSearchSubmit} className="flex items-center">
                <input
                  type="text"
                  placeholder="GG-892401..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="bg-[#161B16] border border-[#48C765]/50 text-white text-xs px-3 py-1.5 rounded-none w-36 focus:outline-none focus:w-48 transition-all font-mono"
                />
                <button 
                  type="button" 
                  onClick={() => setIsSearchOpen(false)}
                  className="ml-2 text-xs text-[#A4ACA1] hover:text-white"
                >
                  ✕
                </button>
              </form>
            ) : (
              <div className="flex items-center">
                <span 
                  className={`absolute right-8 text-[8px] sm:text-[9px] uppercase font-mono tracking-widest text-[#48C765] pointer-events-none transition-all duration-1000 ease-in-out ${
                    showSearchHint ? 'opacity-100 translate-x-0 blur-none' : 'opacity-0 translate-x-4 blur-sm'
                  }`}
                >
                  <span className="sm:hidden flex flex-col items-end leading-[1.2] text-right mr-1">
                    <span>{language === 'es' ? 'Verifica' : 'Verify'}</span>
                    <span>{language === 'es' ? 'tu carta' : 'your card'}</span>
                  </span>
                  <span className="hidden sm:inline whitespace-nowrap">{language === 'es' ? 'Verifica tu carta' : 'Verify your card'}</span>
                </span>
                <button 
                  onClick={() => setIsSearchOpen(true)}
                  className="p-2 text-[#A4ACA1] hover:text-white transition-colors relative z-10"
                  title="Search Certificate"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            )}
          </div>

          {/* Language Toggle Dropdown */}
          <div className="relative">
          </div>

          {/* Submit a Card Button */}
          <button
            onClick={() => onNavigate && onNavigate('/submit')}
            className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 rounded-none border border-white/20 hover:border-[#48C765] text-white hover:text-[#48C765] text-xs font-semibold tracking-wide uppercase transition-all duration-200 hover:bg-[#48C765]/10"
          >
            {t('ref.nav.submit')}
          </button>

          {/* Mobile Menu Hamburger Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-[#A4ACA1] hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-[#2B302B] border-b border-white/10 flex flex-col py-4 px-6 gap-4 shadow-xl">
          <button 
            onClick={() => { setIsMobileMenuOpen(false); onNavigate && onNavigate('/submit'); }}
            className="text-left text-sm font-medium text-white hover:text-[#48C765] transition-colors py-2 border-b border-white/5"
          >
            {language === 'es' ? 'Enviar Cartas' : 'Submit Cards'}
          </button>
          <button 
            onClick={() => { setIsMobileMenuOpen(false); onNavigate && onNavigate('/verify'); }}
            className="text-left text-sm font-medium text-white hover:text-[#48C765] transition-colors py-2 border-b border-white/5"
          >
            {language === 'es' ? 'Verificar Certificado' : 'Verify Certificate'}
          </button>
          <button 
            onClick={() => { setIsMobileMenuOpen(false); onNavigate && onNavigate('/pricing'); }}
            className="text-left text-sm font-medium text-white hover:text-[#48C765] transition-colors py-2 border-b border-white/5"
          >
            {language === 'es' ? 'Precios y Niveles' : 'Pricing & Tiers'}
          </button>
          <button 
            onClick={() => { setIsMobileMenuOpen(false); onNavigate && onNavigate('/tracking'); }}
            className="text-left text-sm font-medium text-white hover:text-[#48C765] transition-colors py-2 border-b border-white/5"
          >
            {language === 'es' ? 'Seguimiento' : 'Live Tracking'}
          </button>
          <button
            onClick={() => { setIsMobileMenuOpen(false); onNavigate && onNavigate('/submit'); }}
            className="sm:hidden mt-2 inline-flex items-center justify-center px-5 py-3 rounded-none border border-[#48C765]/50 bg-[#48C765]/10 text-white font-semibold tracking-wide uppercase transition-all"
          >
            {t('ref.nav.submit')}
          </button>
        </div>
      )}
    </header>
  );
};
