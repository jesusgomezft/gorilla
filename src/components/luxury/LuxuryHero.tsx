import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

interface LuxuryHeroProps {
  onNavigate?: (path: string) => void;
  onOpenTechModal?: () => void;
}

export const LuxuryHero: React.FC<LuxuryHeroProps> = ({ onNavigate, onOpenTechModal }) => {
  const { t } = useLanguage();

  return (
    <section 
      className="relative w-full flex items-center overflow-hidden bg-[#454545] text-white pt-12 pb-0 select-none"
    >
      
      {/* 1. FULL BACKGROUND CINEMATIC ARTWORK (card-solo-grey.jpg in background) */}
      <div 
        className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden flex justify-end items-center px-4 lg:px-12"
      >
        <motion.img 
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 0.95, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          src={`/images/alakazam_hero.png?v=${Date.now()}`}
          alt="Gorilla Grading - Master Artwork" 
          className="w-full md:w-[85%] lg:w-[60%] h-[85%] lg:h-[100%] object-contain object-right lg:object-center lg:mr-4 xl:mr-12 relative z-0"
        />
        
        <div className="absolute inset-y-0 left-0 w-full lg:w-[60%] bg-gradient-to-r from-[#454545] via-[#454545]/90 to-transparent pointer-events-none z-10" />
        <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-[#454545] to-transparent pointer-events-none z-10" />
        <div className="absolute inset-x-0 top-0 h-24 md:h-40 bg-gradient-to-b from-[#454545] to-transparent pointer-events-none z-10" />

        {/* Floor Reflection Stage */}
        <div className="absolute bottom-0 left-0 w-full flex pointer-events-none z-20">
          <motion.img 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.8, y: 0 }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
            src={`/images/floor-reflection.png?v=${Date.now()}`}
            alt="Glossy Floor Reflection"
            className="w-full h-24 sm:h-32 md:h-40 object-cover object-center mix-blend-screen"
            style={{ maskImage: 'linear-gradient(to top, black 20%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to top, black 20%, transparent 100%)' }}
          />
        </div>

        {/* Bottom Blend Gradient (z-30) to seamlessly merge into the next section */}
        <div className="absolute inset-x-0 bottom-0 h-16 md:h-24 bg-gradient-to-t from-[#2F3430] via-[#2F3430]/80 to-transparent pointer-events-none z-30" />
      </div>

      {/* 2. FOREGROUND EDITORIAL CONTENT (Text on Left, Artwork Center/Right, Rail Far Right) */}
      <div className="relative z-10 max-w-[1440px] w-full mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 items-center">
        
        {/* Left Column: Headlines, Copy, Buttons, Social Proof */}
        <div className="lg:col-span-7 xl:col-span-7 flex flex-col justify-center py-12 pl-4 sm:pl-8 lg:pl-28 xl:pl-40">
          
          {/* Technical Kicker */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="font-mono text-xs font-semibold tracking-[0.28em] text-[#A4ACA1] uppercase drop-shadow-md">
              {t('ref.hero.eyebrow')}
            </span>
          </motion.div>

          {/* Monumental Display Headline (Architectural Senior Grotesque - Oswald 700) */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="font-['Oswald'] font-[700] text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-6xl leading-[0.95] tracking-[0.01em] text-white mb-7 uppercase drop-shadow-lg"
          >
            {t('ref.hero.title1')}<br />
            {t('ref.hero.title2')}<span className="text-[#48C765]">{t('ref.hero.titleGreen')}</span>
          </motion.h1>

          {/* Clear Editorial Description */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="relative mb-9"
          >
            <p className="relative font-sans text-base sm:text-lg text-[#F4F6F0] max-w-[490px] leading-relaxed font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              {t('ref.hero.desc')}
            </p>
          </motion.div>

          {/* Action CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            className="flex flex-wrap items-center gap-6 sm:gap-8 mb-12"
          >
            {/* Primary Capsule Button */}
            <button
              onClick={() => onNavigate && onNavigate('/submit')}
              className="group relative inline-flex items-center gap-2 px-6 py-3 sm:px-8 sm:py-3 rounded-none bg-[#48C765] hover:bg-[#3A9F50] transition-all duration-300 cursor-pointer shadow-[0_0_20px_rgba(72,199,101,0.2)] hover:shadow-[0_0_30px_rgba(72,199,101,0.4)]"
            >
              <span className="relative z-10 font-sans font-bold text-xs tracking-widest text-[#14170F] uppercase select-none">
                {t('ref.hero.ctaPrimary')}
              </span>
              <span className="relative z-10 ml-1 transition-transform duration-300 group-hover:translate-x-1 text-[#14170F]">→</span>
            </button>

            {/* Secondary Action */}
            <a
              href="#technology"
              onClick={(e) => {
                if (onOpenTechModal) {
                  e.preventDefault();
                  onOpenTechModal();
                }
              }}
              className="group inline-flex items-center gap-2 px-5 py-3 sm:px-6 sm:py-3 rounded-none bg-[#454545]/60 hover:bg-[#454545] border border-[#48C765]/50 hover:border-[#48C765] transition-all duration-300 cursor-pointer"
            >
              <span className="text-xs font-semibold tracking-wide text-white select-none">
                {t('ref.hero.ctaSecondary')}
              </span>
              <div className="flex items-center justify-center pl-[2px] transition-transform duration-300 group-hover:scale-110">
                <svg className="w-2.5 h-2.5 text-[#48C765]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </a>
          </motion.div>



          {/* Pricing & Turnaround Info + Technical Categories Ticker */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            className="mt-8 flex flex-col gap-3"
          >
            <div className="font-sans text-xs tracking-wide text-[#A0A7A1]">
              Planes desde <span className="text-white font-medium">15 €</span> <span className="mx-1.5 opacity-50">·</span> Plazos desde <span className="text-white font-medium">5 días</span>
            </div>
            <div className="font-mono text-[11px] tracking-[0.25em] text-[#A4ACA1] uppercase">
              {t('ref.hero.categories')}
            </div>
          </motion.div>

        </div>

      </div>

    </section>
  );
};
