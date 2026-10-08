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
          2. SOMBRA VERDE POSTERIOR QUE BAJA CON EL SCROLL POR TODO EL PROYECTO
             - Modo Claro: Se nota un poco más (más visible y viva)
             - Modo Oscuro: Menos visual / disminuye un poco lo verde, pero elegante
          ═════════════════════════════════════════════════════════════════════ */}
      
      {/* Desktop Spotlight 1: Sombra verde ambiental que desciende con el scroll */}
      <div 
        className="hidden lg:block absolute rounded-full pointer-events-none will-change-transform"
        style={{
          width: '920px',
          height: '920px',
          left: '68%',
          top: `${30 + scrollFraction * 48}%`,
          background: isLight
            ? 'radial-gradient(circle at center, rgba(34, 197, 94, 0.28) 0%, rgba(22, 163, 74, 0.15) 35%, rgba(16, 185, 129, 0.05) 60%, transparent 78%)'
            : 'radial-gradient(circle at center, rgba(34, 197, 94, 0.38) 0%, rgba(22, 163, 74, 0.20) 32%, rgba(16, 185, 129, 0.06) 58%, transparent 80%)',
          transform: `translate(-50%, calc(-50% + ${(scrollY % 600) * 0.12}px))`,
          filter: 'blur(95px)',
          opacity: isLight ? 0.76 : 0.58
        }}
      />

      {/* Desktop Spotlight 2: Continuidad de sombra verde en profundidad del proyecto */}
      <div 
        className="hidden lg:block absolute rounded-full pointer-events-none will-change-transform"
        style={{
          width: '850px',
          height: '850px',
          left: '46%',
          top: `${55 + scrollFraction * 35}%`,
          background: isLight
            ? 'radial-gradient(circle at center, rgba(34, 197, 94, 0.22) 0%, rgba(22, 163, 74, 0.10) 42%, transparent 75%)'
            : 'radial-gradient(circle at center, rgba(34, 197, 94, 0.28) 0%, rgba(22, 163, 74, 0.15) 38%, transparent 80%)',
          transform: 'translate(-50%, -50%)',
          filter: 'blur(100px)',
          opacity: isLight ? 0.68 : 0.52
        }}
      />

      {/* ═════════════════════════════════════════════════════════════════════
          3. SOMBRA VERDE MÓVIL
          ═════════════════════════════════════════════════════════════════════ */}
      <div 
        className="lg:hidden absolute rounded-full pointer-events-none will-change-transform"
        style={{
          width: '600px',
          height: '600px',
          left: '50%',
          top: `${24 + scrollFraction * 52}%`,
          background: isLight
            ? 'radial-gradient(circle at center, rgba(34, 197, 94, 0.26) 0%, rgba(22, 163, 74, 0.12) 40%, transparent 75%)'
            : 'radial-gradient(circle at center, rgba(34, 197, 94, 0.35) 0%, rgba(22, 163, 74, 0.18) 36%, transparent 80%)',
          transform: `translate(-50%, calc(-50% + ${(scrollY % 500) * 0.12}px))`,
          filter: 'blur(75px)',
          opacity: isLight ? 0.72 : 0.55
        }}
      />

      {/* ═════════════════════════════════════════════════════════════════════
          4. FONDO DE PUNTOS LITOGRÁFICOS SUTILES
          ═════════════════════════════════════════════════════════════════════ */}
      
      {/* Layer 4A: Puntos Litográficos Principales */}
      <div 
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          backgroundImage: isLight
            ? 'radial-gradient(circle, rgba(0, 0, 0, 0.10) 1.15px, transparent 1.25px)'
            : 'radial-gradient(circle, rgba(255, 255, 255, 0.14) 1.15px, transparent 1.25px)',
          backgroundSize: '9px 9px',
          mixBlendMode: isLight ? 'multiply' : 'screen',
          opacity: isLight ? 0.62 : 0.65
        }}
      />

      {/* Layer 4B: Puntos Rosette Escalonados (Efecto laboratorio auténtico) */}
      <div 
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          backgroundImage: isLight
            ? 'radial-gradient(circle, rgba(22, 101, 52, 0.05) 0.85px, transparent 0.95px)'
            : 'radial-gradient(circle, rgba(74, 222, 128, 0.10) 0.85px, transparent 0.95px)',
          backgroundSize: '9px 9px',
          backgroundPosition: '4.5px 4.5px',
          mixBlendMode: isLight ? 'multiply' : 'screen',
          opacity: 0.50
        }}
      />

      {/* Layer 4C: Iluminación interactiva suave con el cursor */}
      {mousePos.x !== -1000 && (
        <div 
          className="absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-500"
          style={{
            background: `radial-gradient(460px circle at ${mousePos.x}px ${mousePos.y}px, ${
              isLight ? 'rgba(34, 197, 94, 0.07)' : 'rgba(74, 222, 128, 0.08)'
            } 0%, transparent 80%)`,
          }}
        />
      )}

      {/* ═════════════════════════════════════════════════════════════════════
          5. ESCÁNER LÁSER QUE BAJA LENTO Y LANZA RESULTADO EN LA MITAD DEL HERO
          ═════════════════════════════════════════════════════════════════════ */}
      <style>{`
        /* 1. Haz Láser pausado (18s) que barre el Hero verticalmente */
        @keyframes heroLaserSweep {
          0% {
            top: 4vh;
            opacity: 0;
          }
          4% {
            opacity: 0.85;
          }
          92% {
            opacity: 0.85;
          }
          96% {
            top: 92vh;
            opacity: 0;
          }
          100% {
            top: 4vh;
            opacity: 0;
          }
        }

        /* 2. Revelación de resultados al pasar por la mitad del Hero (35% a 62% del ciclo) */
        @keyframes heroMidScanResultReveal {
          0%, 32% {
            opacity: 0;
            transform: translateY(8px);
          }
          40% {
            opacity: 0.72;
            transform: translateY(0px);
          }
          58% {
            opacity: 0.72;
            transform: translateY(0px);
          }
          66%, 100% {
            opacity: 0;
            transform: translateY(-8px);
          }
        }
      `}</style>

      {/* Scanner Assembly Container */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
        
        {/* =================================================================== */}
        {/* LÍNEA LÁSER DINÁMICA: BAJA LENTO POR EL HERO (18 SEGUNDOS)          */}
        {/* =================================================================== */}
        <div 
          className="w-full absolute left-0 right-0 pointer-events-none will-change-transform z-20"
          style={{
            animation: 'heroLaserSweep 18s cubic-bezier(0.4, 0, 0.2, 1) infinite',
          }}
        >
          {/* Estela luminosa sutil degradada */}
          <div 
            className="w-full -mt-14 h-14 pointer-events-none"
            style={{
              background: isLight
                ? 'linear-gradient(to top, rgba(34, 197, 94, 0.04) 0%, transparent 100%)'
                : 'linear-gradient(to top, rgba(74, 222, 128, 0.06) 0%, transparent 100%)',
              maskImage: 'linear-gradient(to top, black, transparent)',
              WebkitMaskImage: 'linear-gradient(to top, black, transparent)'
            }}
          />

          {/* Filamento Láser Ultrafino (1px) */}
          <div className="relative w-full flex items-center">
            {/* Indicador izquierdo sutil sin caja */}
            <div className="absolute left-4 sm:left-10 flex items-center gap-1.5 opacity-45">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80]" />
              <span className="font-mono text-[7px] sm:text-[7.5px] tracking-[0.2em] text-[#22C55E] uppercase">
                [ ⌖ 1200 DPI ]
              </span>
            </div>

            {/* Línea láser central de precisión */}
            <div 
              className="w-full h-[1px] opacity-70"
              style={{
                background: isLight
                  ? 'linear-gradient(90deg, transparent 0%, rgba(22, 163, 74, 0.12) 12%, #16A34A 50%, rgba(22, 163, 74, 0.12) 88%, transparent 100%)'
                  : 'linear-gradient(90deg, transparent 0%, rgba(74, 222, 128, 0.15) 12%, #4ADE80 50%, rgba(74, 222, 128, 0.15) 88%, transparent 100%)',
                boxShadow: isLight
                  ? '0 0 6px rgba(22, 163, 74, 0.3)'
                  : '0 0 8px rgba(74, 222, 128, 0.35)',
              }}
            />

            {/* Indicador derecho sutil sin caja */}
            <div className="absolute right-4 sm:right-10 flex items-center gap-1.5 opacity-45">
              <span className="font-mono text-[7px] sm:text-[7.5px] tracking-[0.2em] text-emerald-400 uppercase">
                [ λ: 532nm ]
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80]" />
            </div>
          </div>
        </div>

        {/* =================================================================== */}
        {/* RESULTADO DEL ESCÁNER: APARECE EN LA MITAD DEL HERO                 */}
        {/* Letras muy sutiles, muy de fondo, sin cuadros atrás, sin fondo      */}
        {/* =================================================================== */}
        <div 
          className="absolute top-[48vh] left-0 right-0 flex flex-col items-center justify-center pointer-events-none select-none z-10 px-4"
          style={{
            animation: 'heroMidScanResultReveal 18s cubic-bezier(0.4, 0, 0.2, 1) infinite',
          }}
        >
          {/* Línea 1: Estado y Detección de Error en la Carta */}
          <div className="flex items-center justify-center flex-wrap gap-2 font-mono text-[8px] sm:text-[9px] tracking-[0.22em] uppercase text-center">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400/90 animate-ping shrink-0" />
            
            <span className={isLight ? 'text-emerald-800/80 font-bold' : 'text-[#4ADE80]/85 font-semibold'}>
              {language === 'es' ? '[ RESULTADO DE ESCÁNER ÓPTICO ]' : '[ OPTICAL SCAN RESULT ]'}
            </span>

            <span className="opacity-30 text-gray-400">·</span>

            <span className={isLight ? 'text-amber-800/85 font-bold' : 'text-amber-300/90 font-bold'}>
              {language === 'es' 
                ? '⚠ ERROR EN CARTA DETECTADO: MICRO-DEFECTO DE IMPRESIÓN [0.03mm]' 
                : '⚠ CARD FLAW DETECTED: PRINT DEFECT [0.03mm]'}
            </span>
          </div>

          {/* Línea 2: Sub-métricas discretas de graduación y expediente forense */}
          <div className="mt-1 flex items-center justify-center flex-wrap gap-2.5 font-mono text-[7px] sm:text-[8px] tracking-[0.18em] uppercase text-center opacity-65">
            <span className={isLight ? 'text-slate-600' : 'text-neutral-300'}>
              {language === 'es' 
                ? 'DESVIACIÓN DE CENTRADO 58/42 · BORDES: 9.5 · SUB-GRADE: 8.5' 
                : 'CENTERING BIAS 58/42 · EDGES: 9.5 · SUB-GRADE: 8.5'}
            </span>

            <span className="opacity-30 text-gray-400">|</span>

            <span className={isLight ? 'text-emerald-700/80 font-medium' : 'text-[#22C55E]/80 font-medium'}>
              {language === 'es' 
                ? 'VERIFICACIÓN FORENSE GORILLA #GG-8849' 
                : 'GORILLA FORENSIC VERIFIED #GG-8849'}
            </span>
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



