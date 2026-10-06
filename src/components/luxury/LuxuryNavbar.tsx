import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';

interface LuxuryNavbarProps {
  onNavigate?: (path: string) => void;
}

export const LuxuryNavbar: React.FC<LuxuryNavbarProps> = ({ onNavigate }) => {
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === 'light';
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentPath, setCurrentPath] = useState<string>(
    typeof window !== 'undefined' ? window.location.pathname : '/'
  );

  // Track window scroll position to dynamically adapt navbar contrast
  React.useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
      setIsScrolled(currentScroll > 15);
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('popstate', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('popstate', handleScroll);
    };
  }, []);

  const go = (path: string) => {
    setCurrentPath(path);
    onNavigate && onNavigate(path);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim() && onNavigate) {
      go(`/verify?id=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
    }
  };

  // Navigation map (single source for desktop + mobile)
  const navLinks = [
    { path: '/technology', label: language === 'es' ? 'Tecnología' : 'Technology' },
    { path: '/about', label: language === 'es' ? 'El Laboratorio' : 'The Laboratory' },
    { path: '/verify', label: language === 'es' ? 'Verificar Certificado' : 'Verify Certificate' },
    { path: '/pricing', label: language === 'es' ? 'Tarifas' : 'Pricing & Tiers' },
    { path: '/track', label: language === 'es' ? 'Estado del Pedido' : 'Order Status' },
  ];

  // Executive nav link: Nunito Sans, tracked uppercase, senior aesthetic
  const navLinkClass = (active: boolean) =>
    `relative py-2 font-['Nunito_Sans','Nunito',sans-serif] text-[11px] lg:text-[12px] font-extrabold uppercase tracking-[0.16em] transition-colors cursor-pointer shrink-0
     after:absolute after:left-0 after:-bottom-0.5 after:h-[2px] after:transition-all after:duration-300
     ${isLight ? 'after:bg-[#111827]' : 'after:bg-[#48C765]'}
     ${active ? 'after:w-full' : 'after:w-0 hover:after:w-full'}
     ${active
       ? (isLight ? 'text-[#111827]' : 'text-white font-black')
       : (isLight ? 'text-[#374151] hover:text-[#111827]' : 'text-[#B8BFB5] hover:text-white')}`;

  const iconBtnClass = `p-2 transition-colors cursor-pointer shrink-0 ${
    isLight ? 'text-[#4B5563] hover:text-[#111827]' : 'text-[#B8BFB5] hover:text-white'
  }`;

  // Header background class
  const headerBgClass = !isScrolled
    ? (isLight 
        ? 'bg-[#EBF1EA]/90 backdrop-blur-md border-b border-[#D2DDD1] shadow-[0_4px_15px_rgba(0,0,0,0.03)]' 
        : 'bg-[#0A0D0A]/60 backdrop-blur-md border-b border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.3)]')
    : (isLight 
        ? 'bg-white border-b border-[#E5E7EB] text-[#111827] shadow-md backdrop-blur-xl' 
        : 'bg-[#080A08]/95 border-b border-white/10 text-white backdrop-blur-xl shadow-md');

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${headerBgClass}`}>
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 h-20 flex items-center justify-between gap-4">
        
        {/* Brand Logo & Name */}
        <div 
          onClick={() => go('/')}
          className="flex flex-col items-center justify-center cursor-pointer group shrink-0"
        >
          <img
            src="/brand/logo-green.png"
            alt="Gorilla Grading Shield"
            className="h-8 sm:h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
          <div className="flex flex-col items-center leading-none mt-1">
            <span className={`font-display font-extrabold tracking-tight text-[15px] sm:text-[17px] uppercase ${
              isLight ? 'text-[#111827]' : 'text-[#F0F1F2]'
            }`}>
              GORILLA
            </span>
            <span className="font-display font-bold text-[#16A34A] tracking-[0.25em] text-[7px] sm:text-[8px] uppercase mt-[2px]">
              GRADING
            </span>
          </div>
        </div>

        {/* Center Navigation Links — executive small caps with well-proportioned spacing */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-6 xl:gap-8">
          {navLinks.map((link) => (
            <button
              key={link.path}
              onClick={() => go(link.path)}
              className={navLinkClass(currentPath.startsWith(link.path))}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Right Tools & CTAs */}
        <div className="flex items-center gap-1 sm:gap-2 lg:gap-3 shrink-0">
          {/* Quick Search Trigger — clean icon without colliding pop-up text */}
          <div className="relative flex items-center">
            {isSearchOpen ? (
              <form onSubmit={handleSearchSubmit} className="flex items-center">
                <input
                  type="text"
                  placeholder="GG-892401..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className={`${isLight ? 'bg-white border border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-gray-900' : 'bg-[#161B16] border border-white/20 text-white focus:border-white'} text-xs px-3 py-1.5 rounded-none w-36 focus:outline-none focus:w-44 transition-all font-mono`}
                />
                <button 
                  type="button" 
                  onClick={() => setIsSearchOpen(false)}
                  className={`ml-2 text-xs ${isLight ? 'text-gray-500 hover:text-gray-900' : 'text-[#A4ACA1] hover:text-white'}`}
                >
                  ✕
                </button>
              </form>
            ) : (
              <button 
                onClick={() => setIsSearchOpen(true)}
                className={iconBtnClass}
                title={language === 'es' ? 'Buscar certificado' : 'Search Certificate'}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            )}
          </div>

          {/* Discreet EN / ES toggle */}
          <div className="hidden lg:flex items-center gap-1.5 px-1 font-mono text-[10px] tracking-[0.12em]">
            {(['en', 'es'] as const).map((lng, i) => (
              <React.Fragment key={lng}>
                {i === 1 && <span className={isLight ? 'text-gray-300' : 'text-white/20'}>/</span>}
                <button
                  onClick={() => setLanguage(lng)}
                  className={`uppercase cursor-pointer transition-colors ${
                    language === lng
                      ? (isLight ? 'text-[#111827] font-bold' : 'text-white font-bold')
                      : (isLight ? 'text-gray-400 hover:text-gray-900' : 'text-white/40 hover:text-white')
                  }`}
                >
                  {lng}
                </button>
              </React.Fragment>
            ))}
          </div>

          {/* Vertical hairline divider */}
          <span className={`hidden sm:block h-5 w-px mx-0.5 ${isLight ? 'bg-black/15' : 'bg-white/15'}`} />

          {/* Account / Collector Vault — neutral icon */}
          <button
            onClick={() => go('/account')}
            className={`hidden sm:flex items-center justify-center ${iconBtnClass}`}
            title={language === 'es' ? 'Bóveda del Coleccionista' : 'Collector Vault'}
            aria-label="Account"
          >
            <svg 
              className="w-[18px] h-[18px]" 
              viewBox="0 0 24 24" 
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="7" r="4" />
              <path d="M4 21v-1.5C4 16.2 7.6 13.8 12 13.8C16.4 13.8 20 16.2 20 19.5V21" />
            </svg>
          </button>

          {/* Submit a Card — High-end luxury outlined button */}
          <button
            onClick={() => go('/submit')}
            className={`hidden sm:inline-flex items-center justify-center gap-1.5 px-4 lg:px-5 py-2.5 rounded-none font-['Nunito_Sans','Nunito',sans-serif] text-[11px] font-extrabold tracking-[0.16em] uppercase transition-all duration-200 cursor-pointer ${
              isLight
                ? 'border border-gray-900 text-gray-900 bg-transparent hover:bg-gray-900 hover:!text-white shadow-2xs'
                : 'border border-white/25 text-white bg-transparent hover:border-white hover:bg-white/10'
            }`}
          >
            <span>{t('ref.nav.submit')}</span>
            <span aria-hidden="true" className="text-xs">→</span>
          </button>

          {/* Mobile Menu Hamburger Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden ${iconBtnClass}`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>

      </div>

      {/* Mobile Menu Overlay - Executive Luxury Takeover */}
      {isMobileMenuOpen && (
        <div className={`md:hidden fixed top-20 left-0 w-full h-[calc(100vh-5rem)] flex flex-col justify-between py-6 px-6 z-40 animate-crossfade-up overflow-y-auto ${
          isLight 
            ? 'bg-[#FAF9F6]/98 backdrop-blur-2xl text-gray-900 border-t border-[#E5E7EB] shadow-2xl' 
            : 'bg-[#0B0E0B]/98 backdrop-blur-2xl text-white border-t border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.9)]'
        }`}>
          {/* Top Section: Nav Links + Account */}
          <div className="flex flex-col w-full">
            
            {/* Header kicker inside drawer */}
            <div className="flex items-center justify-between pb-3 mb-2 border-b border-black/5 dark:border-white/5 font-mono text-[10px] tracking-[0.22em] text-gray-500 dark:text-gray-300 uppercase">
              <span>{language === 'es' ? 'DIRECTORIO DE SERVICIOS' : 'SERVICES DIRECTORY'}</span>
              <div className="flex items-center gap-1.5 text-emerald-500 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>{language === 'es' ? 'LAB ACTIVO' : 'LAB ONLINE'}</span>
              </div>
            </div>

            {/* Navigation links with Nunito Sans, index numbering & active highlight */}
            <nav className="flex flex-col divide-y divide-black/5 dark:divide-white/5">
              {navLinks.map((link, idx) => {
                const isActive = currentPath === link.path;
                const num = `0${idx + 1}`;

                return (
                  <button
                    key={link.path}
                    onClick={() => { setIsMobileMenuOpen(false); go(link.path); }}
                    className={`group flex items-center justify-between py-3.5 px-2.5 text-left transition-all duration-200 cursor-pointer ${
                      isActive 
                        ? (isLight ? 'bg-black/[0.04] border-l-2 border-l-[#16A34A] text-black font-black' : 'bg-white/[0.06] border-l-2 border-l-[#22C55E] text-white font-black') 
                        : (isLight ? 'text-gray-800 hover:text-black hover:bg-black/[0.02]' : 'text-gray-200 hover:text-white hover:bg-white/[0.03]')
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <span className={`font-mono text-[11px] font-bold ${
                        isActive 
                          ? 'text-emerald-500 font-extrabold' 
                          : 'text-gray-400 dark:text-gray-400'
                      }`}>
                        {num}
                      </span>
                      <span className={`font-['Nunito_Sans','Nunito',sans-serif] text-[13.5px] tracking-[0.16em] uppercase ${
                        isActive ? 'font-black' : 'font-extrabold'
                      }`}>
                        {link.label}
                      </span>
                    </div>

                    <span className={`font-mono text-xs transition-transform duration-200 ${
                      isActive 
                        ? 'text-emerald-500 translate-x-0 font-bold' 
                        : 'text-gray-400 dark:text-gray-400 group-hover:translate-x-1 group-hover:text-white'
                    }`}>
                      →
                    </span>
                  </button>
                );
              })}

              {/* Collector Vault / Login Row */}
              <button
                onClick={() => { setIsMobileMenuOpen(false); go('/account'); }}
                className={`group flex items-center justify-between py-3.5 px-2.5 text-left transition-all duration-200 cursor-pointer ${
                  currentPath === '/account'
                    ? (isLight ? 'bg-black/[0.04] border-l-2 border-l-[#16A34A] text-black font-black' : 'bg-white/[0.06] border-l-2 border-l-[#22C55E] text-white font-black')
                    : (isLight ? 'text-gray-800 hover:text-black hover:bg-black/[0.02]' : 'text-gray-200 hover:text-white hover:bg-white/[0.03]')
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <span className="font-mono text-[11px] text-gray-400 dark:text-gray-400 font-bold">
                    06
                  </span>
                  <span className="font-['Nunito_Sans','Nunito',sans-serif] text-[13.5px] font-extrabold tracking-[0.16em] uppercase">
                    {language === 'es' ? 'Bóveda del Coleccionista' : 'Collector Vault / Login'}
                  </span>
                </div>
                <span className="font-mono text-xs text-gray-400 dark:text-gray-400 group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </button>
            </nav>
          </div>

          {/* Bottom Section: Controls & Primary Action */}
          <div className="pt-5 border-t border-black/5 dark:border-white/5 space-y-4">
            
            {/* Preferences Switchers: Language & Theme */}
            <div className="flex items-center justify-between gap-3">
              
              {/* Language Pill Switch */}
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] uppercase tracking-widest text-gray-500 dark:text-gray-300 font-semibold">
                  {language === 'es' ? 'Idioma' : 'Lang'}:
                </span>
                <div className={`p-0.5 border flex items-center ${
                  isLight ? 'border-gray-300 bg-gray-100' : 'border-white/10 bg-white/5'
                }`}>
                  <button 
                    onClick={() => setLanguage('es')} 
                    className={`px-2.5 py-1 font-mono text-[11px] font-bold transition-colors cursor-pointer ${
                      language === 'es' 
                        ? (isLight ? 'bg-white text-black shadow-xs font-black' : 'bg-white/20 text-white font-black') 
                        : (isLight ? 'text-gray-600 hover:text-black' : 'text-gray-400 hover:text-white')
                    }`}
                  >
                    ES
                  </button>
                  <button 
                    onClick={() => setLanguage('en')} 
                    className={`px-2.5 py-1 font-mono text-[11px] font-bold transition-colors cursor-pointer ${
                      language === 'en' 
                        ? (isLight ? 'bg-white text-black shadow-xs font-black' : 'bg-white/20 text-white font-black') 
                        : (isLight ? 'text-gray-600 hover:text-black' : 'text-gray-400 hover:text-white')
                    }`}
                  >
                    EN
                  </button>
                </div>
              </div>

              {/* Theme Mode Toggle Button */}
              <button
                type="button"
                onClick={toggleTheme}
                className={`px-3 py-1 border flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider font-semibold transition-colors cursor-pointer ${
                  isLight 
                    ? 'border-gray-300 bg-gray-100 text-gray-800 hover:bg-gray-200' 
                    : 'border-white/10 bg-white/5 text-gray-200 hover:text-white hover:bg-white/10'
                }`}
              >
                <span>{isLight ? '☀ MODO CLARO' : '☾ MODO OSCURO'}</span>
              </button>
            </div>

            {/* Signature Gorilla 3D CTA Button */}
            <button
              onClick={() => { setIsMobileMenuOpen(false); go('/submit'); }}
              className="btn-gorilla-pill w-full py-4 px-6 gap-2 shadow-lg cursor-pointer"
            >
              <span className="font-['Nunito_Sans','Nunito',sans-serif] text-xs font-black tracking-[0.18em] uppercase text-white">
                {t('ref.nav.submit')}
              </span>
              <span className="text-white text-sm font-bold ml-1">→</span>
            </button>

            {/* Technical Laboratory Footer stamp */}
            <div className="text-center font-mono text-[9px] tracking-[0.2em] text-gray-400 dark:text-gray-400 uppercase">
              GORILLA OPTICAL LAB · ISO-9001 AUDITED
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
