import React from 'react';

interface GorillaLogoProps {
  className?: string;
  shieldSize?: string;
}

export const GorillaLogo: React.FC<GorillaLogoProps> = ({ 
  className = '', 
  shieldSize = 'w-8 h-8 sm:w-9 sm:h-9'
}) => {
  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 select-none ${className}`}>
      {/* Freestanding Official Shield Emblem (No artificial grey rounded box) */}
      <img 
        src="/brand/logo-green.png" 
        alt="Gorilla Grading Shield" 
        className={`${shieldSize} object-contain shrink-0 transition-transform duration-200 group-hover:scale-105`}
      />

      {/* Official Project Typography: Stacked GORILLA / GRADING */}
      <div className="flex flex-col justify-center leading-none">
        <span className="font-['Space_Grotesk'] font-[800] text-[18px] sm:text-[20px] tracking-[0.03em] text-white uppercase leading-none group-hover:text-[#48C765] transition-colors">
          GORILLA
        </span>
        <span className="font-['Space_Grotesk'] font-bold text-[8.5px] sm:text-[9.5px] tracking-[0.34em] text-[#A4ACA1] uppercase leading-none mt-1 group-hover:text-white transition-colors">
          GRADING
        </span>
      </div>
    </div>
  );
};
