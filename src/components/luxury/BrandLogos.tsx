import React from 'react';

export const PokemonLogo: React.FC<{ className?: string }> = ({ className = "h-7" }) => (
  <img src="/images/logos/pokemon.png" alt="Pokémon" className={`${className} object-contain`} />
);

export const MagicLogo: React.FC<{ className?: string }> = ({ className = "h-7" }) => (
  <img src="/images/logos/magic-logo.webp" alt="Magic: The Gathering" className={`${className} object-contain`} />
);

export const OnePieceLogo: React.FC<{ className?: string }> = ({ className = "h-7" }) => (
  <img src="/images/logos/onepiece.png" alt="One Piece Card Game" className={`${className} object-contain`} />
);

export const LorcanaLogo: React.FC<{ className?: string }> = ({ className = "h-7" }) => (
  <img src="/images/logos/lorcana.png" alt="Disney Lorcana" className={`${className} object-contain`} />
);

export const YuGiOhLogo: React.FC<{ className?: string }> = ({ className = "h-7" }) => (
  <img src="/images/logos/You-Gi-OH.png" alt="Yu-Gi-Oh!" className={`${className} object-contain`} />
);

export const PaniniLogo: React.FC<{ className?: string }> = ({ className = "h-7" }) => (
  <img src="/images/logos/panini.png" alt="Panini" className={`${className} object-contain`} />
);
