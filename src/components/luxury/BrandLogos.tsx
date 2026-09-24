import React from 'react';

// 1. Pokémon Official Vector Wordmark (Unclipped, complete)
export const PokemonLogo: React.FC<{ className?: string }> = ({ className = "h-7" }) => (
  <svg viewBox="0 0 240 70" className={className} xmlns="http://www.w3.org/2000/svg">
    <text 
      x="0" 
      y="52" 
      fontFamily="'Montserrat', 'Arial Black', sans-serif" 
      fontSize="46" 
      fontWeight="900" 
      letterSpacing="-0.03em"
      fontStyle="italic"
      fill="#FFCB05"
      stroke="#2A75BB"
      strokeWidth="2.5"
    >
      Pokémon
    </text>
  </svg>
);

// 2. Magic: The Gathering Official Logo (Mythic spark + Serif typography)
export const MagicLogo: React.FC<{ className?: string }> = ({ className = "h-7" }) => (
  <svg viewBox="0 0 220 50" className={className} xmlns="http://www.w3.org/2000/svg">
    <g>
      {/* Mythic Planeswalker Icon */}
      <path d="M12 25l-5-9 5 2 2-8 3 7 5-4-2 12h-8zM2 25l8 2-3 5-4-2-1-5zm20 0l-8 2 3 5 4-2 1-5z" fill="#FF6B00"/>
      {/* MAGIC Typography */}
      <text x="34" y="27" fontFamily="'Cinzel', 'Trajan Pro', 'Georgia', serif" fontSize="22" fontWeight="900" letterSpacing="2.5" fill="#FFFFFF">
        MAGIC
      </text>
      <text x="35" y="39" fontFamily="'Inter', 'Arial', sans-serif" fontSize="6.5" fontWeight="800" letterSpacing="3.5" opacity="0.85" fill="#FFFFFF">
        THE GATHERING
      </text>
    </g>
  </svg>
);

// 3. One Piece Card Game Official Logo (Jolly Roger + Impact text)
export const OnePieceLogo: React.FC<{ className?: string }> = ({ className = "h-7" }) => (
  <svg viewBox="0 0 220 50" className={className} xmlns="http://www.w3.org/2000/svg">
    <g>
      {/* Skull Icon */}
      <circle cx="15" cy="22" r="10" fill="none" stroke="#FFFFFF" strokeWidth="2.5"/>
      <path d="M10 20a5 5 0 0 1 10 0c0 2.5-1.5 4-3.5 5h-3c-1.8-1-3.5-2.5-3.5-5z" fill="#FFFFFF"/>
      <circle cx="12.5" cy="19.5" r="1.5" fill="#E3000F"/>
      <circle cx="17.5" cy="19.5" r="1.5" fill="#E3000F"/>
      {/* Crossbones */}
      <path d="M6 13l18 18M24 13L6 31" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round"/>
      
      {/* ONE PIECE Text */}
      <text x="34" y="27" fontFamily="'Impact', 'Arial Black', sans-serif" fontSize="21" fontWeight="900" letterSpacing="1" fill="#E3000F" stroke="#FFFFFF" strokeWidth="0.5">
        ONE PIECE
      </text>
      <text x="35" y="40" fontFamily="'Inter', sans-serif" fontSize="7" fontWeight="900" letterSpacing="4.5" fill="#FFD100">
        CARD GAME
      </text>
    </g>
  </svg>
);

// 4. Disney Lorcana Official Logo (Script Disney + Serif Lorcana)
export const LorcanaLogo: React.FC<{ className?: string }> = ({ className = "h-7" }) => (
  <svg viewBox="0 0 210 50" className={className} xmlns="http://www.w3.org/2000/svg">
    <g>
      {/* Disney Script */}
      <text x="105" y="16" textAnchor="middle" fontFamily="'Brush Script MT', 'Dancing Script', cursive, serif" fontSize="17" fontStyle="italic" fontWeight="bold" fill="#FFFFFF">
        Disney
      </text>
      {/* LORCANA Serif */}
      <text x="105" y="38" textAnchor="middle" fontFamily="'Cinzel', 'Times New Roman', serif" fontSize="20" fontWeight="800" letterSpacing="5" fill="#D4AF37">
        LORCANA
      </text>
    </g>
  </svg>
);

// 5. Topps Classic Slanted Script Logo (Complete with 's')
export const ToppsLogo: React.FC<{ className?: string }> = ({ className = "h-7" }) => (
  <svg viewBox="0 0 160 50" className={className} xmlns="http://www.w3.org/2000/svg">
    <text 
      x="8" 
      y="38" 
      fontFamily="'Arial Black', 'Impact', sans-serif" 
      fontSize="38" 
      fontWeight="900" 
      fontStyle="italic" 
      letterSpacing="-0.02em"
      transform="skewX(-10)"
      fill="#E21836"
      stroke="#FFFFFF"
      strokeWidth="1"
    >
      Topps
    </text>
  </svg>
);

// 6. Panini Official Framed Block Logo
export const PaniniLogo: React.FC<{ className?: string }> = ({ className = "h-7" }) => (
  <svg viewBox="0 0 170 45" className={className} xmlns="http://www.w3.org/2000/svg">
    <g>
      {/* Outer Panini Border Frame */}
      <rect x="2" y="2" width="166" height="41" rx="4" fill="none" stroke="#FFE600" strokeWidth="3.5"/>
      {/* Panini Block Text */}
      <text x="85" y="30" textAnchor="middle" fontFamily="'Arial Black', 'Impact', sans-serif" fontSize="24" fontWeight="900" letterSpacing="4" fill="#FFFFFF">
        PANINI
      </text>
    </g>
  </svg>
);
