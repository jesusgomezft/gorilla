import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';

export const BrandEcosystemRibbon: React.FC = () => {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const brands = [
    { 
      id: 'pokemon', 
      name: 'Pokémon', 
      component: <img src="/images/logos/pokemon.png" alt="Pokémon" className="h-7 sm:h-8 max-w-[120px] sm:max-w-[130px] object-contain" /> 
    },
    { 
      id: 'magic', 
      name: 'Magic: The Gathering', 
      component: (
        <img 
          src="/images/logos/magic-logo.webp" 
          alt="Magic: The Gathering" 
          className={`h-6 sm:h-7 max-w-[120px] sm:max-w-[130px] object-contain transition-opacity ${
            isLight ? 'brightness-0 opacity-75' : 'opacity-90'
          }`} 
        />
      )
    },
    { 
      id: 'onepiece', 
      name: 'One Piece', 
      component: <img src="/images/logos/onepiece.png" alt="One Piece" className={`h-6 sm:h-7 max-w-[120px] sm:max-w-[130px] object-contain ${!isLight ? 'invert opacity-85' : ''}`} /> 
    },
    { 
      id: 'lorcana', 
      name: 'Lorcana', 
      component: <img src="/images/logos/lorcana.png" alt="Lorcana" className={`h-7 sm:h-8 max-w-[120px] sm:max-w-[130px] object-contain ${isLight ? 'brightness-0 opacity-70' : ''}`} /> 
    },
    { 
      id: 'yugioh', 
      name: 'Yu-Gi-Oh!', 
      component: <img src="/images/logos/You-Gi-OH.png" alt="Yu-Gi-Oh!" className="h-7 sm:h-8 max-w-[120px] sm:max-w-[130px] object-contain" /> 
    },
    { 
      id: 'panini', 
      name: 'Panini', 
      component: (
        <div className="h-7 sm:h-8 w-24 sm:w-28 overflow-hidden flex items-center justify-center shrink-0">
          <img 
            src="/images/logos/panini.png" 
            alt="Panini" 
            className="h-[125px] sm:h-[142px] max-w-none object-contain pointer-events-none" 
          />
        </div>
      )
    },
    { 
      id: 'dragonball', 
      name: 'Dragon Ball', 
      component: <img src="/images/logos/DragonBall.png" alt="Dragon Ball" className={`h-7 sm:h-8 max-w-[120px] sm:max-w-[130px] object-contain ${!isLight ? 'brightness-0 invert opacity-90' : ''}`} /> 
    },
    { 
      id: 'digimon', 
      name: 'Digimon', 
      component: <img src="/images/logos/DigimonCard.png" alt="Digimon" className="h-7 sm:h-8 max-w-[120px] sm:max-w-[130px] object-contain" /> 
    },
    { 
      id: 'fleshblood', 
      name: 'Flesh and Blood', 
      component: <img src="/images/logos/FleshBlood.png" alt="Flesh and Blood" className="h-7 sm:h-8 max-w-[120px] sm:max-w-[130px] object-contain" /> 
    },
    { 
      id: 'gundam', 
      name: 'Gundam', 
      component: (
        <img 
          src="/images/logos/Gundam.png" 
          alt="Gundam" 
          className={`h-7 sm:h-8 max-w-[120px] sm:max-w-[130px] object-contain ${
            isLight ? 'brightness-0 opacity-60' : 'opacity-80'
          }`} 
        />
      )
    },
    { 
      id: 'cyberpunk', 
      name: 'Cyberpunk', 
      component: <img src="/images/logos/cyberpunk.png" alt="Cyberpunk" className="h-6 sm:h-7 max-w-[120px] sm:max-w-[130px] object-contain" /> 
    },
    { 
      id: 'finalfantasy', 
      name: 'Final Fantasy', 
      component: <img src="/images/logos/finalFantasy.png" alt="Final Fantasy" className="h-6 sm:h-7 max-w-[120px] sm:max-w-[130px] object-contain" /> 
    },
    { 
      id: 'force', 
      name: 'Force of Will', 
      component: <img src="/images/logos/force.png" alt="Force of Will" className="h-6 sm:h-7 max-w-[120px] sm:max-w-[130px] object-contain" /> 
    },
    { 
      id: 'vanguard', 
      name: 'Cardfight!! Vanguard', 
      component: <img src="/images/logos/vanguar.png" alt="Cardfight!! Vanguard" className="h-6 sm:h-7 max-w-[120px] sm:max-w-[130px] object-contain" /> 
    },
    { 
      id: 'riftbound', 
      name: 'Riftbound', 
      component: <img src="/images/logos/fbf7fc57-3966-4943-afbe-16d3b649b314.png" alt="Riftbound" className="h-7 sm:h-8 max-w-[120px] sm:max-w-[130px] object-contain" /> 
    },
  ];

  // Duplicate the array multiple times to create a seamless infinite scroll effect
  const marqueeBrands = [...brands, ...brands, ...brands, ...brands];

  return (
    <section 
      id="brands" 
      className="w-full select-none bg-transparent py-4 sm:py-5 overflow-hidden relative border-y border-black/[0.05] dark:border-white/[0.06]"
    >
      <div className="flex flex-col gap-4">
        
        {/* Top Kicker Label - Centered & Refined Typography */}
        <div className="px-6 max-w-[1400px] mx-auto w-full flex items-center justify-center">
          <span 
            className={`font-['Nunito',sans-serif] text-xs sm:text-sm font-[800] tracking-wider uppercase text-center select-none ${
              isLight ? 'text-gray-900' : 'text-white'
            }`}
          >
            {t('ref.ribbon.title')}
          </span>
        </div>

        {/* Infinite Scrolling Marquee with Edge Fade */}
        <div 
          className="relative flex overflow-x-hidden pt-3 sm:pt-4 group"
          style={{
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
            maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)'
          }}
        >
          <div className="animate-marquee transform-gpu will-change-transform whitespace-nowrap flex w-max items-center gap-14 sm:gap-20 px-8 shrink-0" style={{ animationDuration: '240s' }}>
            {marqueeBrands.map((brand, idx) => (
              <div 
                key={`${brand.id}-${idx}`}
                className="h-8 sm:h-9 flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity duration-200 cursor-pointer drop-shadow-xs shrink-0"
                title={brand.name}
              >
                {brand.component}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
