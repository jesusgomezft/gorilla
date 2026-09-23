import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { 
  PokemonLogo, 
  MagicLogo, 
  OnePieceLogo, 
  LorcanaLogo, 
  ToppsLogo, 
  PaniniLogo 
} from './BrandLogos';

export const BrandEcosystemRibbon: React.FC = () => {
  const { t } = useLanguage();

  const brands = [
    { id: 'pokemon', name: 'Pokémon', component: <PokemonLogo className="h-6 sm:h-7" /> },
    { id: 'magic', name: 'Magic: The Gathering', component: <MagicLogo className="h-6 sm:h-7" /> },
    { id: 'onepiece', name: 'One Piece Card Game', component: <OnePieceLogo className="h-6 sm:h-7" /> },
    { id: 'lorcana', name: 'Disney Lorcana', component: <LorcanaLogo className="h-6 sm:h-7" /> },
    { id: 'topps', name: 'Topps', component: <ToppsLogo className="h-5 sm:h-6" /> },
    { id: 'panini', name: 'Panini', component: <PaniniLogo className="h-5 sm:h-6" /> },
  ];

  return (
    <section className="w-full bg-[#454545] text-white select-none border-b border-white/[0.04] py-8 px-6 lg:px-12">
      <div className="max-w-[1400px] mx-auto flex flex-col gap-5">
        
        {/* Top Kicker Label */}
        <div className="flex items-center">
          <span className="font-mono text-[10px] sm:text-[11px] font-bold tracking-[0.22em] text-[#A4ACA1] uppercase">
            {t('ref.ribbon.title')}
          </span>
        </div>

        {/* Logos Flex Row */}
        <div className="w-full flex flex-wrap md:flex-nowrap items-center justify-between gap-6 lg:gap-8 pt-1">
          {brands.map((brand) => (
            <div 
              key={brand.id}
              className="flex items-center justify-center opacity-60 hover:opacity-80 transition-opacity duration-200 text-white cursor-pointer"
              title={brand.name}
            >
              {brand.component}
            </div>
          ))}

          {/* And More Link */}
          <div className="flex items-center gap-1.5 font-mono text-[11px] font-bold tracking-[0.18em] text-[#A4ACA1] hover:text-white uppercase cursor-pointer transition-colors group">
            <span>{t('ref.ribbon.andMore')}</span>
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </div>
        </div>

      </div>
    </section>
  );
};
