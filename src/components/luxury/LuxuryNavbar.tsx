import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';

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
        
        {/* Brand Logo & Name */}
        <div 
          onClick={() => onNavigate && onNavigate('/')}
          className="flex flex-col items-center justify-center cursor-pointer group"
        >
          <img
            src="/brand/logo-green.png"
            alt="Gorilla Grading Shield"
            className="h-8 sm:h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
          <div className="flex flex-col items-center leading-none mt-1">
            <span className="font-display font-extrabold tracking-tight text-[15px] sm:text-[17px] uppercase text-[#F0F1F2]">
              GORILLA
            </span>
            <span className="font-display font-bold text-[#61B663] tracking-[0.25em] text-[7px] sm:text-[8px] uppercase mt-[2px]">
              GRADING
            </span>
          </div>
        </div>

        {/* Center Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-10">
          <button 
            onClick={() => onNavigate && onNavigate('/technology')}
            className="text-sm font-medium text-[#A4ACA1] hover:text-[#F4F6F0] transition-colors tracking-wide cursor-pointer"
          >
            {language === 'es' ? 'Tecnología' : 'Technology'}
          </button>
          <button 
            onClick={() => onNavigate && onNavigate('/about')}
            className="text-sm font-medium text-[#A4ACA1] hover:text-[#F4F6F0] transition-colors tracking-wide cursor-pointer"
          >
            {language === 'es' ? 'Nosotros' : 'About Us'}
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
            onClick={() => onNavigate && onNavigate('/track')}
            className="text-sm font-medium text-[#A4ACA1] hover:text-[#F4F6F0] transition-colors tracking-wide cursor-pointer"
          >
            {language === 'es' ? 'Seguimiento' : 'Live Tracking'}
          </button>
        </nav>

        {/* Right Tools & CTAs */}
        <div className="flex items-center gap-1 sm:gap-5">
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
                  <span className="whitespace-nowrap mr-1">{language === 'es' ? 'Verifica tu carta' : 'Verify your card'}</span>
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

          {/* Account/Dashboard Button — Theme-Aware Standalone Icon */}
          <button
            onClick={() => onNavigate && onNavigate('/account')}
            className="hidden sm:flex p-2 navbar-account-btn transition-all duration-300 hover:scale-110 items-center justify-center cursor-pointer group"
            title={language === 'es' ? 'Bóveda del Coleccionista' : 'Collector Vault'}
            aria-label="Account"
          >
            <svg 
              className="w-5 h-5 transition-all" 
              viewBox="0 0 24 24" 
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle 
                cx="12" 
                cy="7" 
                r="4" 
              />
              <path 
                d="M4 21v-1.5C4 16.2 7.6 13.8 12 13.8C16.4 13.8 20 16.2 20 19.5V21" 
              />
            </svg>
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

      {/* Mobile Menu Overlay - Full Screen Takeover */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed top-20 left-0 w-full h-[calc(100vh-5rem)] bg-[#2B302B] flex flex-col py-6 px-8 gap-4 z-40 animate-crossfade-up overflow-y-auto">
          <button 
            onClick={() => { setIsMobileMenuOpen(false); onNavigate && onNavigate('/technology'); }}
            className="text-left text-base font-medium text-white hover:text-[#48C765] transition-colors py-4 border-b border-white/5"
          >
            {language === 'es' ? 'Tecnología' : 'Technology'}
          </button>
          <button 
            onClick={() => { setIsMobileMenuOpen(false); onNavigate && onNavigate('/about'); }}
            className="text-left text-base font-medium text-white hover:text-[#48C765] transition-colors py-4 border-b border-white/5"
          >
            {language === 'es' ? 'Nosotros' : 'About Us'}
          </button>
          <button 
            onClick={() => { setIsMobileMenuOpen(false); onNavigate && onNavigate('/verify'); }}
            className="text-left text-base font-medium text-white hover:text-[#48C765] transition-colors py-4 border-b border-white/5"
          >
            {language === 'es' ? 'Verificar Certificado' : 'Verify Certificate'}
          </button>
          <button 
            onClick={() => { setIsMobileMenuOpen(false); onNavigate && onNavigate('/pricing'); }}
            className="text-left text-base font-medium text-white hover:text-[#48C765] transition-colors py-4 border-b border-white/5"
          >
            {language === 'es' ? 'Precios y Niveles' : 'Pricing & Tiers'}
          </button>
          <button 
            onClick={() => { setIsMobileMenuOpen(false); onNavigate && onNavigate('/track'); }}
            className="text-left text-base font-medium text-white hover:text-[#48C765] transition-colors py-4 border-b border-white/5"
          >
            {language === 'es' ? 'Seguimiento' : 'Live Tracking'}
          </button>
          <button 
            onClick={() => { setIsMobileMenuOpen(false); onNavigate && onNavigate('/account'); }}
            className="text-left text-base font-medium text-[#48C765] hover:text-white transition-colors py-4 border-b border-white/5"
          >
            {language === 'es' ? 'Iniciar Sesión' : 'Login'}
          </button>

          <div className="flex items-center gap-4 py-4 border-b border-white/5">
            <span className="text-white/50 text-sm font-medium">{language === 'es' ? 'Idioma:' : 'Language:'}</span>
            <button onClick={() => setLanguage('en')} className={`text-sm font-bold ${language === 'en' ? 'text-[#48C765]' : 'text-white'}`}>EN</button>
            <span className="text-white/20">|</span>
            <button onClick={() => setLanguage('es')} className={`text-sm font-bold ${language === 'es' ? 'text-[#48C765]' : 'text-white'}`}>ES</button>
          </div>
          
          <div className="mt-8">
            <button
              onClick={() => { setIsMobileMenuOpen(false); onNavigate && onNavigate('/submit'); }}
              className="w-full inline-flex items-center justify-center px-8 py-4 rounded-none border border-[#48C765]/50 bg-[#48C765]/10 text-white font-semibold tracking-wide uppercase transition-all shadow-[0_0_15px_rgba(72,199,101,0.15)]"
            >
              {t('ref.nav.submit')}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
