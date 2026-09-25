import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
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

  const brands = [
    { id: 'pokemon', name: 'Pokémon', component: <PokemonLogo className="h-6 sm:h-8" /> },
    { id: 'magic', name: 'Magic: The Gathering', component: <MagicLogo className="h-6 sm:h-8" /> },
    { id: 'onepiece', name: 'One Piece Card Game', component: <OnePieceLogo className="h-6 sm:h-8" /> },
    { id: 'lorcana', name: 'Disney Lorcana', component: <LorcanaLogo className="h-6 sm:h-8" /> },
    { id: 'yugioh', name: 'Yu-Gi-Oh!', component: <YuGiOhLogo className="h-6 sm:h-8" /> },
    { id: 'panini', name: 'Panini', component: <PaniniLogo className="h-5 sm:h-7 scale-[1.2] sm:scale-[1.4]" /> },
  ];

  // Duplicate the array multiple times to create a seamless infinite scroll effect
  const marqueeBrands = [...brands, ...brands, ...brands, ...brands];

  return (
    <section className="w-full bg-[#2F3430] text-[#EAE8E3] select-none border-b border-black/20 py-8 overflow-hidden">
      <div className="flex flex-col gap-5">
        
        {/* Top Kicker Label */}
        <div className="px-6 lg:px-12 max-w-[1400px] mx-auto w-full">
          <span className="font-mono text-[10px] sm:text-[11px] font-bold tracking-[0.22em] text-[#A69F93] uppercase">
            {t('ref.ribbon.title')}
          </span>
        </div>

        {/* Infinite Scrolling Marquee */}
        <div className="relative flex overflow-x-hidden pt-4 mask-edges group">
          <div className="animate-marquee whitespace-nowrap flex w-max items-center gap-16 sm:gap-24 px-8 shrink-0">
            {marqueeBrands.map((brand, idx) => (
              <div 
                key={`${brand.id}-${idx}`}
                className="flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity duration-200 cursor-pointer drop-shadow-md shrink-0"
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
