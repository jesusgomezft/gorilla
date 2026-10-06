import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { 
  PokemonLogo, 
  MagicLogo, 
  OnePieceLogo, 
  LorcanaLogo, 
  YuGiOhLogo, 
  PaniniLogo 
} from './BrandLogos';

export const BrandEcosystemRibbon: React.FC = () => {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const brands = [
    { id: 'pokemon', name: 'Pokémon', component: <img src="/images/logos/pokemon.png" alt="Pokémon" className="h-8 sm:h-10 object-contain" /> },
    { id: 'magic', name: 'Magic', component: <img src="/images/logos/magic-logo.webp" alt="Magic" className="h-8 sm:h-10 object-contain" /> },
    { id: 'onepiece', name: 'One Piece', component: <img src="/images/logos/onepiece.png" alt="One Piece" className="h-8 sm:h-10 object-contain" /> },
    { id: 'lorcana', name: 'Lorcana', component: <img src="/images/logos/lorcana.png" alt="Lorcana" className="h-8 sm:h-10 object-contain" /> },
    { id: 'yugioh', name: 'Yu-Gi-Oh!', component: <img src="/images/logos/You-Gi-OH.png" alt="Yu-Gi-Oh!" className="h-8 sm:h-10 object-contain" /> },
    { id: 'panini', name: 'Panini', component: <img src="/images/logos/panini.png" alt="Panini" className="h-16 sm:h-24 scale-125 object-contain" /> },
    { id: 'dragonball', name: 'Dragon Ball', component: <img src="/images/logos/DragonBall.png" alt="Dragon Ball" className="h-8 sm:h-10 object-contain" /> },
    { id: 'digimon', name: 'Digimon', component: <img src="/images/logos/DigimonCard.png" alt="Digimon" className="h-8 sm:h-10 object-contain" /> },
    { id: 'fleshblood', name: 'Flesh and Blood', component: <img src="/images/logos/FleshBlood.png" alt="Flesh and Blood" className="h-8 sm:h-10 object-contain" /> },
    { id: 'gundam', name: 'Gundam', component: <img src="/images/logos/Gundam.png" alt="Gundam" className="h-8 sm:h-10 object-contain" /> },
    { id: 'cyberpunk', name: 'Cyberpunk', component: <img src="/images/logos/cyberpunk.png" alt="Cyberpunk" className="h-8 sm:h-10 object-contain" /> },
    { id: 'finalfantasy', name: 'Final Fantasy', component: <img src="/images/logos/finalFantasy.png" alt="Final Fantasy" className="h-8 sm:h-10 object-contain" /> },
    { id: 'force', name: 'Force', component: <img src="/images/logos/force.png" alt="Force" className="h-8 sm:h-10 object-contain" /> },
    { id: 'vanguard', name: 'Vanguard', component: <img src="/images/logos/vanguar.png" alt="Vanguard" className="h-8 sm:h-10 object-contain" /> },
    { id: 'extra', name: 'Brand', component: <img src="/images/logos/fbf7fc57-3966-4943-afbe-16d3b649b314.png" alt="Brand" className="h-8 sm:h-10 object-contain" /> },
  ];

  // Duplicate the array multiple times to create a seamless infinite scroll effect
  const marqueeBrands = [...brands, ...brands, ...brands, ...brands];

  return (
    <section 
      id="brands" 
      className="w-full select-none border-y border-black/5 dark:border-white/5 py-7 overflow-hidden relative"
      style={{ 
        backgroundColor: isLight ? '#ECE7DF' : '#191C1A',
        backgroundImage: isLight 
          ? 'radial-gradient(circle, #D0C7B8 1.2px, transparent 1.2px)' 
          : 'radial-gradient(circle, rgba(255, 255, 255, 0.08) 1.2px, transparent 1.2px)',
        backgroundSize: '30px 30px',
      }}
    >
      <div className="flex flex-col gap-4">
        
        {/* Top Kicker Label - Centered & Refined Typography */}
        <div className="px-6 max-w-[1400px] mx-auto w-full flex items-center justify-center">
          <span 
            className="font-sans text-[11px] sm:text-xs font-semibold tracking-[0.24em] uppercase text-center select-none"
            style={{ color: isLight ? '#6A7067' : '#A69F93' }}
          >
            {t('ref.ribbon.title')}
          </span>
        </div>

        {/* Infinite Scrolling Marquee with Edge Fade */}
        <div 
          className="relative flex overflow-x-hidden pt-4 group"
          style={{
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
            maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)'
          }}
        >
          <div className="animate-marquee transform-gpu will-change-transform whitespace-nowrap flex w-max items-center gap-16 sm:gap-24 px-8 shrink-0" style={{ animationDuration: '240s' }}>
            {marqueeBrands.map((brand, idx) => (
              <div 
                key={`${brand.id}-${idx}`}
                className="flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity duration-200 cursor-pointer drop-shadow-sm shrink-0"
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
