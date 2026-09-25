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
    { id: 'panini', name: 'Panini', component: <PaniniLogo className="h-10 sm:h-14 scale-[1.3] sm:scale-[1.5]" /> },
    { id: 'topps', name: 'Topps', component: <img src="/images/logos/Topps.png" alt="Topps" className="h-5 sm:h-7 object-contain" /> },
    { id: 'dragonball', name: 'Dragon Ball', component: <img src="/images/logos/DragonBall.png" alt="Dragon Ball" className="h-6 sm:h-8 object-contain" /> },
    { id: 'digimon', name: 'Digimon', component: <img src="/images/logos/DigimonCard.png" alt="Digimon" className="h-6 sm:h-8 object-contain" /> },
    { id: 'fleshblood', name: 'Flesh and Blood', component: <img src="/images/logos/FleshBlood.png" alt="Flesh and Blood" className="h-6 sm:h-8 object-contain" /> },
    { id: 'gundam', name: 'Gundam', component: <img src="/images/logos/Gundam.png" alt="Gundam" className="h-6 sm:h-8 object-contain" /> },
    { id: 'cyberpunk', name: 'Cyberpunk', component: <img src="/images/logos/cyberpunk.png" alt="Cyberpunk" className="h-6 sm:h-8 object-contain" /> },
    { id: 'finalfantasy', name: 'Final Fantasy', component: <img src="/images/logos/finalFantasy.png" alt="Final Fantasy" className="h-6 sm:h-8 object-contain" /> },
    { id: 'force', name: 'Force', component: <img src="/images/logos/force.png" alt="Force" className="h-6 sm:h-8 object-contain" /> },
    { id: 'vanguard', name: 'Vanguard', component: <img src="/images/logos/vanguar.png" alt="Vanguard" className="h-6 sm:h-8 object-contain" /> },
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
