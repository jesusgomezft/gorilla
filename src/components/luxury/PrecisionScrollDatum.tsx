import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';

export const PrecisionScrollDatum: React.FC = () => {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  // Smooth scroll tracking across the entire page (0 to 1)
  const [scrollY, setScrollY] = useState(0);
  const [scrollFraction, setScrollFraction] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const y = window.scrollY || document.documentElement.scrollTop || 0;
          const max = Math.max(
            document.documentElement.scrollHeight - window.innerHeight,
            1
          );
          setScrollY(y);
          setScrollFraction(Math.min(Math.max(y / max, 0), 1));
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  // Clear any legacy localStorage theme override
  useEffect(() => {
    localStorage.removeItem('gorilla_bg_atmosphere');
  }, []);

  return (
    <div 
      aria-hidden="true" 
      className={`fixed inset-0 pointer-events-none z-0 overflow-hidden select-none transition-colors duration-700 ${
        isLight ? 'bg-[#FAF9F6]' : 'bg-[#060806]'
      }`}
    >
      {/* 1. Underlying Deep Ambient Base */}
      <div 
        className="absolute inset-0"
        style={{
          background: isLight
            ? 'radial-gradient(ellipse at 50% 30%, #FFFFFF 0%, #FAF8F5 50%, #F3EFE9 100%)'
            : 'radial-gradient(ellipse at 50% 35%, #0B0E0B 0%, #060806 60%, #030403 100%)'
        }}
      />

      {/* ═════════════════════════════════════════════════════════════════════
          2. DESKTOP EMERALD SPOTLIGHTS (FULL INTENSITY + TRAVELS TO THE END)
          ═════════════════════════════════════════════════════════════════════ */}
      
      {/* Desktop Spotlight 1: Full-Power Gorilla Emerald behind Hero, descends smoothly with scroll */}
      <div 
        className="hidden lg:block absolute rounded-full pointer-events-none will-change-transform"
        style={{
          width: '950px',
          height: '950px',
          left: '69%',
          top: `${34 + scrollFraction * 42}%`,
          background: isLight
            ? 'radial-gradient(circle at center, rgba(34, 197, 94, 0.25) 0%, rgba(22, 163, 74, 0.14) 35%, rgba(16, 185, 129, 0.05) 60%, transparent 80%)'
            : 'radial-gradient(circle at center, rgba(34, 197, 94, 0.75) 0%, rgba(22, 163, 74, 0.45) 32%, rgba(16, 185, 129, 0.18) 58%, transparent 80%)',
          transform: `translate(-50%, calc(-50% + ${(scrollY % 600) * 0.15}px))`,
          filter: 'blur(90px)',
          opacity: isLight ? 0.70 : 0.90
        }}
      />

      {/* Desktop Spotlight 2: Mid-to-Lower Atmosphere (Guarantees green glow hasta el final) */}
      <div 
        className="hidden lg:block absolute rounded-full pointer-events-none will-change-transform"
        style={{
          width: '850px',
          height: '850px',
          left: '45%',
          top: `${58 + scrollFraction * 30}%`,
          background: isLight
            ? 'radial-gradient(circle at center, rgba(34, 197, 94, 0.18) 0%, rgba(22, 163, 74, 0.08) 45%, transparent 75%)'
            : 'radial-gradient(circle at center, rgba(34, 197, 94, 0.55) 0%, rgba(22, 163, 74, 0.32) 38%, rgba(16, 185, 129, 0.12) 65%, transparent 80%)',
          transform: 'translate(-50%, -50%)',
          filter: 'blur(95px)',
          opacity: isLight ? 0.60 : 0.85
        }}
      />


      {/* ═════════════════════════════════════════════════════════════════════
          3. MOBILE DYNAMIC EMERALD SPOTLIGHTS (VIBRANT + TRAVELS TO THE END)
          ═════════════════════════════════════════════════════════════════════ */}

      {/* Mobile Primary Spotlight: Prominent in Hero, descends with scroll */}
      <div 
        className="lg:hidden absolute rounded-full pointer-events-none will-change-transform"
        style={{
          width: '620px',
          height: '620px',
          left: '50%',
          top: `${26 + scrollFraction * 48}%`,
          background: isLight
            ? 'radial-gradient(circle at center, rgba(34, 197, 94, 0.24) 0%, rgba(22, 163, 74, 0.12) 40%, transparent 75%)'
            : 'radial-gradient(circle at center, rgba(34, 197, 94, 0.65) 0%, rgba(22, 163, 74, 0.40) 36%, rgba(16, 185, 129, 0.14) 62%, transparent 80%)',
          transform: `translate(-50%, calc(-50% + ${(scrollY % 500) * 0.16}px))`,
          filter: 'blur(72px)',
          opacity: isLight ? 0.68 : 0.86
        }}
      />

      {/* Mobile Secondary Spotlight: Follows deeper scroll all the way to footer (Hasta el final) */}
      <div 
        className="lg:hidden absolute rounded-full pointer-events-none will-change-transform"
        style={{
          width: '560px',
          height: '560px',
          left: '50%',
          top: `${55 + scrollFraction * 32}%`,
          background: isLight
            ? 'radial-gradient(circle at center, rgba(34, 197, 94, 0.18) 0%, rgba(22, 163, 74, 0.08) 45%, transparent 75%)'
            : 'radial-gradient(circle at center, rgba(34, 197, 94, 0.52) 0%, rgba(22, 163, 74, 0.28) 42%, rgba(16, 185, 129, 0.10) 65%, transparent 78%)',
          transform: 'translate(-50%, -50%)',
          filter: 'blur(80px)',
          opacity: isLight ? 0.55 : 0.78
        }}
      />


      {/* ═════════════════════════════════════════════════════════════════════
          4. FORENSIC HALFTONE DOT MATRIX (Reactive Litho Rosette Grid)
          ═════════════════════════════════════════════════════════════════════ */}
      {/* Layer 4A: Primary High-Density Litho Micro-Dots */}
      <div 
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          backgroundImage: isLight
            ? 'radial-gradient(circle, rgba(0, 0, 0, 0.18) 1.35px, transparent 1.45px)'
            : 'radial-gradient(circle, rgba(255, 255, 255, 0.30) 1.35px, transparent 1.45px)',
          backgroundSize: '8.5px 8.5px',
          mixBlendMode: isLight ? 'multiply' : 'screen',
          opacity: isLight ? 0.80 : 0.85
        }}
      />

      {/* Layer 4B: Rosette Staggered Offset Grid */}
      <div 
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          backgroundImage: isLight
            ? 'radial-gradient(circle, rgba(0, 0, 0, 0.08) 0.9px, transparent 1.0px)'
            : 'radial-gradient(circle, rgba(255, 255, 255, 0.15) 0.9px, transparent 1.0px)',
          backgroundSize: '8.5px 8.5px',
          backgroundPosition: '4.25px 4.25px',
          mixBlendMode: isLight ? 'multiply' : 'screen',
          opacity: 0.55
        }}
      />

      {/* 5. Precision Metrology Grid Rails */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(to right, ${isLight ? '#000000' : '#ffffff'} 1px, transparent 1px),
            linear-gradient(to bottom, ${isLight ? '#000000' : '#ffffff'} 1px, transparent 1px)
          `,
          backgroundSize: '160px 160px'
        }}
      />

      {/* 6. Subtle Edge Vignette */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isLight
            ? 'radial-gradient(ellipse at 50% 50%, transparent 68%, rgba(0,0,0,0.03) 100%)'
            : 'radial-gradient(ellipse at 50% 50%, transparent 55%, rgba(0,0,0,0.72) 100%)'
        }}
      />
    </div>
  );
};
