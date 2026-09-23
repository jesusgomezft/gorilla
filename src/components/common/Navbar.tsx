import React, { useState } from 'react';
import { useConcept } from '../../context/ConceptContext';
import { useLanguage } from '../../context/LanguageContext';
import { ShieldCheck, Search, Menu, X, ArrowRight, Sparkles, Globe } from 'lucide-react';

interface NavbarProps {
  currentPath?: string;
  onNavigate: (path: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath = '/', onNavigate }) => {
  const { concept, metadata } = useConcept();
  const { language, setLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isGallery = concept === 'gallery';
  const isLab = concept === 'precision';
  const isJungle = concept === 'jungle';

  const navLinks = [
    { name: t('nav.services'), path: '/services' },
    { name: t('nav.howItWorks'), path: '/how-it-works' },
    { name: t('nav.verify'), path: '/verify' },
    { name: t('nav.track'), path: '/track' },
    { name: t('nav.vault'), path: '/account' },
    { name: t('nav.compare'), path: '/concepts', highlight: true }
  ];

  const handleNav = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-300 border-b backdrop-blur-xl ${
        isGallery
          ? 'bg-[#F8F6F0]/90 border-[#E2DDD3] text-[#141210]'
          : isLab
          ? 'bg-[#06090D]/90 border-[#1B2636] text-[#F1F5F9]'
          : isJungle
          ? 'bg-[#060E08]/90 border-[#142E1D] text-[#F1F5F9]'
          : 'bg-[#07090C]/90 border-white/[0.08] text-[#F1F5F9]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo & Senior Monogram Lockup */}
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => handleNav('/')}>
            <div className="flex items-center gap-3 group">
              <div className="relative">
                <img
                  src={isGallery ? "/brand/logo-dark.png" : "/brand/logo-green.png"}
                  alt="Gorilla Grading"
                  className="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className={`font-display font-extrabold tracking-tight text-lg uppercase ${isGallery ? 'text-[#141210]' : 'text-white'}`}>
                    GORILLA
                  </span>
                  <span className="font-display font-bold text-gorilla-neon tracking-widest text-sm uppercase">
                    GRADING
                  </span>
                </div>
                <div className="text-[9px] tracking-[0.2em] uppercase font-mono text-slate-400">
                  {t('nav.registrySubtitle')}
                </div>
              </div>
            </div>

            {/* Concept Mode Pill */}
            <div className="hidden 2xl:flex items-center pl-3 border-l border-white/10">
              <span className="px-2.5 py-1 rounded-none text-[10px] font-mono tracking-wider bg-white/5 text-slate-300 border border-white/10">
                {metadata.name.split('—')[1]?.trim() || metadata.name}
              </span>
            </div>
          </div>

          {/* Senior Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = currentPath === link.path;
              return (
                <button
                  key={link.path}
                  onClick={() => handleNav(link.path)}
                  className={`px-3.5 py-2 rounded-none text-xs xl:text-[13px] font-medium transition-all duration-150 flex items-center gap-1.5 ${
                    isActive
                      ? isGallery
                        ? 'bg-[#E2DDD3] text-[#141210] font-bold shadow-sm'
                        : 'bg-[#00DF81]/15 text-[#00DF81] font-semibold border border-[#00DF81]/30 shadow-[0_0_15px_rgba(0,223,129,0.15)]'
                      : isGallery
                      ? 'text-stone-600 hover:text-[#141210] hover:bg-stone-200/60'
                      : 'text-slate-300 hover:text-white hover:bg-white/[0.06]'
                  } ${link.highlight ? 'border border-amber-500/40 text-amber-300 bg-amber-500/10' : ''}`}
                >
                  {link.highlight && <Sparkles className="w-3.5 h-3.5 text-amber-400" />}
                  {link.name}
                </button>
              );
            })}
          </nav>

          {/* Right Controls: Language Switcher & Submit CTA */}
          <div className="flex items-center gap-3">
            
            {/* Language Switcher ES / EN */}
            <div className="flex items-center p-1 rounded-none bg-white/[0.06] border border-white/10 text-[11px] font-mono">
              <button
                onClick={() => setLanguage('es')}
                className={`px-2.5 py-1 rounded-none transition-all font-bold ${
                  language === 'es'
                    ? 'bg-[#00DF81] text-[#07090C] shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Cambiar a Español"
              >
                ES
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-2.5 py-1 rounded-none transition-all font-bold ${
                  language === 'en'
                    ? 'bg-[#00DF81] text-[#07090C] shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Switch to English"
              >
                EN
              </button>
            </div>

            <button
              onClick={() => handleNav('/verify')}
              className={`hidden sm:flex items-center gap-1.5 px-3.5 py-2.5 rounded-none text-xs font-semibold border transition-all ${
                isGallery
                  ? 'border-stone-300 hover:bg-stone-100 text-stone-800'
                  : 'border-white/10 hover:border-white/25 bg-white/[0.03] hover:bg-white/[0.08] text-slate-200'
              }`}
            >
              <Search className="w-3.5 h-3.5 text-gorilla-neon" />
              <span>{t('nav.verify')}</span>
            </button>

            <button
              onClick={() => handleNav('/submit')}
              className="btn-senior-primary text-xs sm:text-[13px]"
            >
              <span>{t('nav.submit')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-none text-slate-400 hover:text-white bg-white/[0.04] border border-white/10"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className={`lg:hidden px-5 pt-4 pb-8 border-b ${
          isGallery ? 'bg-[#F8F6F0] border-[#E2DDD3]' : 'bg-[#080C10] border-white/10'
        }`}>
          <div className="space-y-1.5">
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => handleNav(link.path)}
                className={`w-full text-left px-4 py-3 rounded-none text-sm font-medium flex items-center justify-between ${
                  currentPath === link.path
                    ? 'bg-[#00DF81]/20 text-[#00DF81] font-bold'
                    : isGallery ? 'text-stone-800 hover:bg-stone-200' : 'text-slate-200 hover:bg-white/[0.05]'
                }`}
              >
                <span>{link.name}</span>
                <ArrowRight className="w-4 h-4 opacity-40" />
              </button>
            ))}
          </div>

          <div className="mt-5 pt-5 border-t border-white/10 flex flex-col gap-3">
            <div className="flex items-center justify-between px-2 text-xs font-mono text-slate-400">
              <span>Idioma / Language:</span>
              <div className="flex gap-2">
                <button
                  onClick={() => setLanguage('es')}
                  className={`px-3 py-1 rounded-none text-xs font-bold ${language === 'es' ? 'bg-[#00DF81] text-black' : 'bg-white/10 text-white'}`}
                >
                  Español
                </button>
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-3 py-1 rounded-none text-xs font-bold ${language === 'en' ? 'bg-[#00DF81] text-black' : 'bg-white/10 text-white'}`}
                >
                  English
                </button>
              </div>
            </div>

            <button
              onClick={() => handleNav('/submit')}
              className="w-full py-3.5 btn-senior-primary text-xs"
            >
              <span>{t('nav.submit')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
