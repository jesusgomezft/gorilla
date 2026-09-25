import React from 'react';

interface GorillaLogoProps {
  className?: string;
  shieldSize?: string;
}

export const GorillaLogo: React.FC<GorillaLogoProps> = ({ 
  className = '', 
}) => {
  return (
    <div className={`flex flex-col items-center select-none ${className}`}>
      <img 
        src="/images/vertical-claro.svg" 
        alt="Gorilla Grading Logo" 
        className="h-14 sm:h-16 object-contain shrink-0 transition-transform duration-200 group-hover:scale-105"
      />
      {/* Decorative green line matching brand identity */}
      <div className="w-10 h-[1px] bg-[#61B663] mt-2 rounded-full opacity-80 transition-all duration-300 group-hover:w-14 group-hover:opacity-100" />
    </div>
  );
};
