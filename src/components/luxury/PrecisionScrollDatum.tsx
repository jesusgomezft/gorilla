import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';

export const PrecisionScrollDatum: React.FC = () => {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const { language = 'es' } = useLanguage();

  // Smooth scroll tracking across the entire page (0 to 1)
  const [scrollY, setScrollY] = useState(0);
  const [scrollFraction, setScrollFraction] = useState(0);

  // Interactive mouse position tracking for dynamic optical spotlight
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [scanTelemetryIndex, setScanTelemetryIndex] = useState(0);

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

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Cycling forensic scan telemetry status (synchronized with 18s scan cycle: top, middle, bottom)
  useEffect(() => {
    const interval = setInterval(() => {
      setScanTelemetryIndex((prev) => (prev + 1) % 3);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Clear any legacy localStorage theme override
  useEffect(() => {
    localStorage.removeItem('gorilla_bg_atmosphere');
  }, []);

  const telemetryData = {
    es: [
      {
        tag: 'CALIBRANDO MATRIZ ÓPTICA',
        title: 'INSPECCIÓN LITOGRÁFICA Y DE CENTRADO',
        flaw: 'RESOLUCIÓN 1200 DPI',
        code: 'λ: 532nm'
      },
      {
        tag: '⚠ ERROR EN CARTA DETECTADO',
        title: 'DEFECTO DE IMPRESIÓN [0.03mm] · SUPERFICIE',
        flaw: 'DESVIACIÓN DE CENTRADO 58/42 · SUB-GRADE: 8.5',
        code: 'ANOMALÍA #E-8849'
      },
      {
        tag: 'AUDITORÍA FORENSE COMPLETADA',
        title: 'AUTENTICIDAD CRIPTOGRÁFICA VERIFICADA',
        flaw: 'REGISTRO PÚBLICO #GG-99420',
        code: 'BLOCKCHAIN OK'
      }
    ],
    en: [
      {
        tag: 'CALIBRATING OPTICAL MATRIX',
        title: 'LITHO ROSETTE & CENTERING INSPECTION',
        flaw: 'RESOLUTION 1200 DPI',
        code: 'λ: 532nm'
      },
      {
        tag: '⚠ CARD FLAW DETECTED',
        title: 'PRINT DEFECT [0.03mm] · SURFACE ANOMALY',
        flaw: 'CENTERING BIAS 58/42 · SUB-GRADE: 8.5',
        code: 'ANOMALY #E-8849'
      },
      {
        tag: 'FORENSIC AUDIT COMPLETED',
        title: 'CRYPTOGRAPHIC AUTHENTICITY CONFIRMED',
        flaw: 'PUBLIC REGISTRY #GG-99420',
        code: 'BLOCKCHAIN OK'
      }
    ]
  };

  const currentTelemetry = (language === 'en' ? telemetryData.en : telemetryData.es)[scanTelemetryIndex];

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
          2. DESKTOP EMERALD SPOTLIGHTS (Subtle Ambient Glow)
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
            ? 'radial-gradient(circle at center, rgba(34, 197, 94, 0.20) 0%, rgba(22, 163, 74, 0.10) 35%, transparent 75%)'
            : 'radial-gradient(circle at center, rgba(34, 197, 94, 0.65) 0%, rgba(22, 163, 74, 0.38) 32%, rgba(16, 185, 129, 0.14) 58%, transparent 80%)',
          transform: `translate(-50%, calc(-50% + ${(scrollY % 600) * 0.15}px))`,
          filter: 'blur(95px)',
          opacity: isLight ? 0.60 : 0.82
        }}
      />

      {/* Desktop Spotlight 2: Mid-to-Lower Atmosphere */}
      <div 
        className="hidden lg:block absolute rounded-full pointer-events-none will-change-transform"
        style={{
          width: '850px',
          height: '850px',
          left: '45%',
          top: `${58 + scrollFraction * 30}%`,
          background: isLight
            ? 'radial-gradient(circle at center, rgba(34, 197, 94, 0.15) 0%, rgba(22, 163, 74, 0.06) 45%, transparent 75%)'
            : 'radial-gradient(circle at center, rgba(34, 197, 94, 0.45) 0%, rgba(22, 163, 74, 0.25) 38%, rgba(16, 185, 129, 0.09) 65%, transparent 80%)',
          transform: 'translate(-50%, -50%)',
          filter: 'blur(100px)',
          opacity: isLight ? 0.50 : 0.75
        }}
      />

      {/* ═════════════════════════════════════════════════════════════════════
          3. MOBILE DYNAMIC EMERALD SPOTLIGHTS
          ═════════════════════════════════════════════════════════════════════ */}
      <div 
        className="lg:hidden absolute rounded-full pointer-events-none will-change-transform"
        style={{
          width: '620px',
          height: '620px',
          left: '50%',
          top: `${26 + scrollFraction * 48}%`,
          background: isLight
            ? 'radial-gradient(circle at center, rgba(34, 197, 94, 0.20) 0%, rgba(22, 163, 74, 0.10) 40%, transparent 75%)'
            : 'radial-gradient(circle at center, rgba(34, 197, 94, 0.55) 0%, rgba(22, 163, 74, 0.32) 36%, rgba(16, 185, 129, 0.10) 62%, transparent 80%)',
          transform: `translate(-50%, calc(-50% + ${(scrollY % 500) * 0.16}px))`,
          filter: 'blur(75px)',
          opacity: isLight ? 0.58 : 0.78
        }}
      />

      {/* ═════════════════════════════════════════════════════════════════════
          4. FORENSIC HALFTONE DOT MATRIX BACKGROUND (PUNTOS SUTILES DE ANTES)
          ═════════════════════════════════════════════════════════════════════ */}
      
      {/* Layer 4A: Primary High-Density Litho Micro-Dots (Sutil y refinado) */}
      <div 
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          backgroundImage: isLight
            ? 'radial-gradient(circle, rgba(0, 0, 0, 0.11) 1.15px, transparent 1.25px)'
            : 'radial-gradient(circle, rgba(255, 255, 255, 0.16) 1.15px, transparent 1.25px)',
          backgroundSize: '9px 9px',
          mixBlendMode: isLight ? 'multiply' : 'screen',
          opacity: isLight ? 0.65 : 0.70
        }}
      />

      {/* Layer 4B: Rosette Staggered Offset Grid (Fondo de laboratorio sutil) */}
      <div 
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          backgroundImage: isLight
            ? 'radial-gradient(circle, rgba(22, 101, 52, 0.06) 0.85px, transparent 0.95px)'
            : 'radial-gradient(circle, rgba(74, 222, 128, 0.12) 0.85px, transparent 0.95px)',
          backgroundSize: '9px 9px',
          backgroundPosition: '4.5px 4.5px',
          mixBlendMode: isLight ? 'multiply' : 'screen',
          opacity: 0.55
        }}
      />

      {/* Layer 4C: Interactive Cursor Spotlight (Iluminación sutil interactiva) */}
      {mousePos.x !== -1000 && (
        <div 
          className="absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-500"
          style={{
            background: `radial-gradient(480px circle at ${mousePos.x}px ${mousePos.y}px, ${
              isLight ? 'rgba(34, 197, 94, 0.08)' : 'rgba(74, 222, 128, 0.10)'
            } 0%, transparent 80%)`,
          }}
        />
      )}

      {/* ═════════════════════════════════════════════════════════════════════
          5. SUTIL ESCÁNER LÁSER FORENSE CON LETRAS DISCRETAS SIN FONDO
          ═════════════════════════════════════════════════════════════════════ */}
      <style>{`
        /* Movimiento de escáner pausado y suave (18 segundos para no pasar rápido) */
        @keyframes laserOpticalSweep {
          0% {
            top: -40px;
            opacity: 0;
          }
          3% {
            opacity: 0.85;
          }
          95% {
            opacity: 0.85;
          }
          98% {
            top: 102vh;
            opacity: 0;
          }
          100% {
            top: -40px;
            opacity: 0;
          }
        }
      `}</style>

      {/* Scanner Assembly Container */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
        
        {/* Sweeping Laser Bar with Center Card Error Text — Sin cuadros, puro texto sutil */}
        <div 
          className="w-full absolute left-0 right-0 pointer-events-none will-change-transform z-20"
          style={{
            animation: 'laserOpticalSweep 18s cubic-bezier(0.4, 0, 0.2, 1) infinite',
          }}
        >
          {/* 1. Estela lumínica muy sutil degradada */}
          <div 
            className="w-full -mt-16 h-16 pointer-events-none"
            style={{
              background: isLight
                ? 'linear-gradient(to top, rgba(34, 197, 94, 0.05) 0%, transparent 100%)'
                : 'linear-gradient(to top, rgba(74, 222, 128, 0.08) 0%, transparent 100%)',
              maskImage: 'linear-gradient(to top, black, transparent)',
              WebkitMaskImage: 'linear-gradient(to top, black, transparent)'
            }}
          />

          {/* 2. Filamento Láser de Precisión Sutil y Delicado */}
          <div className="relative w-full flex items-center">
            {/* Indicador izquierdo sutil de calibración (sin caja) */}
            <div className="absolute left-4 sm:left-10 flex items-center gap-1.5 opacity-60">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80]" />
              <span className="font-mono text-[7px] sm:text-[8px] tracking-[0.2em] text-[#22C55E]/75 uppercase">
                [ ⌖ 1200 DPI ]
              </span>
            </div>

            {/* Línea láser fina y suave */}
            <div 
              className="w-full h-[1px] opacity-75"
              style={{
                background: isLight
                  ? 'linear-gradient(90deg, transparent 0%, rgba(22, 163, 74, 0.15) 12%, #16A34A 50%, rgba(22, 163, 74, 0.15) 88%, transparent 100%)'
                  : 'linear-gradient(90deg, transparent 0%, rgba(74, 222, 128, 0.20) 12%, #4ADE80 50%, rgba(74, 222, 128, 0.20) 88%, transparent 100%)',
                boxShadow: isLight
                  ? '0 0 6px rgba(22, 163, 74, 0.35)'
                  : '0 0 8px rgba(74, 222, 128, 0.45)',
              }}
            />

            {/* Indicador derecho sutil de longitud de onda (sin caja) */}
            <div className="absolute right-4 sm:right-10 flex items-center gap-1.5 opacity-60">
              <span className="font-mono text-[7px] sm:text-[8px] tracking-[0.2em] text-emerald-400/75 uppercase">
                [ λ: 532nm ]
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80]" />
            </div>
          </div>

          {/* 3. Letras Discretas Forenses SIN CUADRO / SIN FONDO (100% Pura Transparencia) */}
          <div className="w-full flex flex-col items-center justify-center mt-2 pointer-events-none select-none">
            
            {/* Línea principal: Detección y estado forense */}
            <div className="flex items-center gap-2 font-mono text-[8px] sm:text-[9px] tracking-[0.22em] uppercase transition-opacity duration-700">
              <span className={`w-1 h-1 rounded-full ${
                scanTelemetryIndex === 1 ? 'bg-amber-400/90 animate-ping' : 'bg-[#22C55E]/80 animate-pulse'
              }`} />
              
              <span className={
                scanTelemetryIndex === 1 
                  ? 'text-amber-400/90 font-bold drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]' 
                  : isLight ? 'text-emerald-800/80 font-bold' : 'text-[#4ADE80]/85 font-semibold drop-shadow-[0_0_8px_rgba(74,222,128,0.4)]'
              }>
                {currentTelemetry.tag}
              </span>

              <span className="opacity-30 text-gray-500">·</span>

              <span className={
                isLight ? 'text-slate-700/80 font-medium' : 'text-neutral-300/75 font-normal'
              }>
                {currentTelemetry.title}
              </span>
            </div>

            {/* Sub-línea discreta: Métricas y código de error */}
            <div className="mt-0.5 flex items-center gap-2 font-mono text-[7px] sm:text-[8px] tracking-[0.18em] uppercase opacity-65">
              <span className={scanTelemetryIndex === 1 ? 'text-amber-300/85' : isLight ? 'text-slate-500' : 'text-neutral-400'}>
                {currentTelemetry.flaw}
              </span>
              <span className="opacity-30 text-gray-500">|</span>
              <span className={isLight ? 'text-emerald-700/80 font-medium' : 'text-[#22C55E]/80 font-medium'}>
                {currentTelemetry.code}
              </span>
            </div>

          </div>

        </div>
      </div>

      {/* ═════════════════════════════════════════════════════════════════════
          6. COORDENADAS DISCRETAS EN ESQUINA (Puro Texto Sin Caja)
          ═════════════════════════════════════════════════════════════════════ */}
      <div className="hidden sm:flex absolute bottom-3 right-6 pointer-events-none items-center gap-2.5 font-mono text-[7.5px] tracking-widest text-emerald-500/40 uppercase">
        <span className="w-1 h-1 rounded-full bg-[#22C55E]/60 animate-pulse" />
        <span>GORILLA FORENSIC SCANNER</span>
        <span className="opacity-30">·</span>
        {mousePos.x !== -1000 && (
          <span>X:{Math.round(mousePos.x)} Y:{Math.round(mousePos.y)}</span>
        )}
      </div>

      {/* 7. Subtle Edge Vignette */}
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

export default PrecisionScrollDatum;


