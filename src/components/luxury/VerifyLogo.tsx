import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';

interface VerifyLogoProps {
  className?: string;
  size?: string;
  shieldSize?: string;
  layout?: 'single-line' | 'stacked';
}

export const GorillaVerifyLogo: React.FC<VerifyLogoProps> = ({
  className = '',
  size,
  shieldSize = 'w-28 h-28 sm:w-36 sm:h-36 lg:w-40 lg:h-40',
  layout = 'single-line'
}) => {
  const actualShieldSize = size || shieldSize;
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const [isHovered, setIsHovered] = useState(false);

  // Official 3D Shield Assets
  const shieldSrc = isLight 
    ? '/brand/gorilla-verify-light.png' 
    : '/brand/gorilla-verify-dark.png';

  return (
    <div 
      className={`inline-flex flex-col items-center select-none ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <style>{`
        /* 1. Gentle Levitation of the Shield */
        @keyframes gvShieldFloat {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-6px);
          }
        }

        /* 2. Clean Vector Blink (Titileo limpio sin sombras ni destellos verdes) */
        @keyframes gvCheckBlink {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.3;
            transform: scale(0.92);
          }
        }

        .gv-shield-float {
          animation: gvShieldFloat 4.8s ease-in-out infinite;
        }

        .gv-check-pulse {
          animation: gvCheckBlink 2.2s ease-in-out infinite;
          transform-origin: center;
        }
      `}</style>

      {/* Hero 3D Shield Stage — Clean, Pure Transparency without Any Background Square */}
      <div className="relative flex items-center justify-center cursor-pointer group">
        {/* Floating 3D Shield Sculpture (Zero Square Background, Pure Floating Shield) */}
        <div className={`relative ${actualShieldSize} gv-shield-float transition-transform duration-500 ease-out group-hover:scale-105`}>
          {/* Main 3D Shield Image — Pure Transparency */}
          <img 
            src={shieldSrc}
            alt="Gorilla Verify Shield"
            className="w-full h-full object-contain pointer-events-none select-none transition-transform duration-500"
            draggable={false}
          />
        </div>
      </div>

      {/* Sub-Brand Typography: GORILLA + ✓ERIFY (Bold, Clean, No Micro-Text, Zero Blur) */}
      <div className={`mt-3.5 sm:mt-4 flex ${layout === 'stacked' ? 'flex-col items-center gap-1.5' : 'flex-row items-center gap-2.5 sm:gap-3.5'}`}>
        
        {/* GORILLA Parent Brand Mark */}
        <span className={`font-['Nunito',sans-serif] font-[900] tracking-wider uppercase text-lg sm:text-2xl lg:text-[28px] transition-colors duration-300 ${
          isLight 
            ? 'text-slate-900' 
            : 'text-white'
        }`}>
          GORILLA
        </span>

        {/* ✓ERIFY Sub-Brand Wordmark with Clean Blinking Verification Check */}
        <div className="inline-flex items-center">
          
          {/* Animated Clean Blinking Verification Checkmark Chevron */}
          <span className="gv-check-pulse inline-flex items-center justify-center mr-1 sm:mr-1.5">
            <svg 
              viewBox="0 0 32 32" 
              className="w-5 h-5 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-[#22C55E] dark:text-[#4ADE80] overflow-visible"
              fill="currentColor"
            >
              {/* Custom Aerodynamic Checkmark Chevron Vector */}
              <path 
                d="M4 17.5 L12 26.5 L28 4.5 L21.5 4.5 L11.2 19.5 L7 16 Z" 
              />
            </svg>
          </span>

          {/* ERIFY Bold Typography (Pure vector color, zero green shadow) */}
          <span className="font-['Nunito',sans-serif] font-[950] tracking-tight uppercase text-lg sm:text-2xl lg:text-[28px] text-[#22C55E] dark:text-[#4ADE80]">
            ERIFY
          </span>
        </div>

      </div>

    </div>
  );
};

export const VerifyLogo = GorillaVerifyLogo;
export default GorillaVerifyLogo;
