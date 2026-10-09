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

        /* 2. Fase Superior: Aparece cuando el láser está arriba (dura 4 segundos: 4% a 26% del ciclo) */
        @keyframes scanSnippetPhaseTop {
          0%, 3% {
            opacity: 0;
            transform: translateY(6px);
          }
          6% {
            opacity: 1;
            transform: translateY(0px);
          }
          22% {
            opacity: 1;
            transform: translateY(0px);
          }
          26%, 100% {
            opacity: 0;
            transform: translateY(-6px);
          }
        }

        /* 3. Fase Media: Aparece cuando el láser cruza la mitad (dura 4 segundos: 32% a 54% del ciclo) */
        @keyframes scanSnippetPhaseMid {
          0%, 31% {
            opacity: 0;
            transform: translateY(6px);
          }
          34% {
            opacity: 1;
            transform: translateY(0px);
          }
          50% {
            opacity: 1;
            transform: translateY(0px);
          }
          54%, 100% {
            opacity: 0;
            transform: translateY(-6px);
          }
        }

        /* 4. Fase Inferior: Aparece cuando el láser llega abajo (dura 4 segundos: 60% a 82% del ciclo) */
        @keyframes scanSnippetPhaseBottom {
          0%, 59% {
            opacity: 0;
            transform: translateY(6px);
          }
          62% {
            opacity: 1;
            transform: translateY(0px);
          }
          78% {
            opacity: 1;
            transform: translateY(0px);
          }
          82%, 100% {
            opacity: 0;
            transform: translateY(-6px);
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

          {/* Filamento Láser Ultrafino (1px) con indicadores en los extremos exteriores */}
          <div className="relative w-full flex items-center">
            {/* Indicador extremo izquierdo - Pegado al margen exterior */}
            <div className="absolute left-3 sm:left-8 flex items-center opacity-60 select-none">
              <span className="font-mono text-[7px] sm:text-[8px] tracking-[0.20em] text-[#16A34A] dark:text-[#4ADE80] font-bold uppercase">
                [ ⌖ SCAN: 1200 DPI ]
              </span>
            </div>

            {/* Línea láser central de precisión (Cero texto en el centro, nunca choca con la losa) */}
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

            {/* Indicador extremo derecho - Pegado al margen exterior */}
            <div className="absolute right-3 sm:right-8 flex items-center opacity-60 select-none">
              <span className="font-mono text-[7px] sm:text-[8px] tracking-[0.20em] text-[#16A34A] dark:text-emerald-400 font-bold uppercase">
                [ RES: 0.03mm · λ: 532nm ]
              </span>
            </div>
          </div>
        </div>

        {/* =================================================================== */}
        {/* TELEMETRÍA DINÁMICA DEL ESCÁNER: APARECE EN DISTINTAS PARTES (4s)   */}
        {/* Se activan según el láser va bajando, duran 4 segundos y se van     */}
        {/* =================================================================== */}

        {/* FASE 1 (SUPERIOR - 4 SEGUNDOS): Aparece cuando el láser inicia arriba */}
        <div 
          className="absolute top-[18vh] left-3 sm:left-8 lg:left-12 pointer-events-none select-none z-10"
          style={{ animation: 'scanSnippetPhaseTop 18s cubic-bezier(0.4, 0, 0.2, 1) infinite' }}
        >
          <div className={`font-mono text-[8.5px] sm:text-[9.5px] tracking-[0.16em] uppercase font-bold ${
            isLight ? 'text-[#065F46] drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]' : 'text-[#34D399] drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]'
          }`}>
            {language === 'es' ? '[ ⌖ CALIBRANDO MATRIZ ÓPTICA 1200 DPI ]' : '[ ⌖ CALIBRATING 1200 DPI OPTICAL MATRIX ]'}
          </div>
          <div className={`mt-0.5 font-mono text-[7.5px] sm:text-[8.5px] tracking-[0.12em] uppercase font-medium ${
            isLight ? 'text-[#1E293B]' : 'text-[#CBD5E1]'
          }`}>
            {language === 'es' ? 'ESPECTRO LITOGRÁFICO · TOLERANCIA ACTIVA' : 'LITHOGRAPHIC ROSETTE · ACTIVE TOLERANCE'}
          </div>
        </div>

        <div 
          className="absolute top-[20vh] right-3 sm:right-8 lg:right-12 pointer-events-none select-none z-10 text-right"
          style={{ animation: 'scanSnippetPhaseTop 18s cubic-bezier(0.4, 0, 0.2, 1) infinite' }}
        >
          <div className={`font-mono text-[8.5px] sm:text-[9.5px] tracking-[0.16em] uppercase font-bold ${
            isLight ? 'text-[#065F46] drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]' : 'text-[#34D399] drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]'
          }`}>
            {language === 'es' ? '[ ⌖ ESPECTROMETRÍA LÁSER λ: 532nm ]' : '[ ⌖ LASER SPECTROMETRY λ: 532nm ]'}
          </div>
          <div className={`mt-0.5 font-mono text-[7.5px] sm:text-[8.5px] tracking-[0.12em] uppercase font-medium ${
            isLight ? 'text-[#1E293B]' : 'text-[#CBD5E1]'
          }`}>
            {language === 'es' ? 'FONDO ULTRAVIOLETA · VERIFICACIÓN ACTIVA' : 'UV METROLOGY · CALIBRATION ACTIVE'}
          </div>
        </div>

        {/* FASE 2 (MEDIA - 4 SEGUNDOS): Aparece cuando el láser cruza la mitad */}
        <div 
          className="absolute top-[48vh] left-3 sm:left-6 lg:left-10 pointer-events-none select-none z-10"
          style={{ animation: 'scanSnippetPhaseMid 18s cubic-bezier(0.4, 0, 0.2, 1) infinite' }}
        >
          <div className={`font-mono text-[8.5px] sm:text-[9.5px] tracking-[0.16em] uppercase font-bold ${
            isLight ? 'text-[#065F46] drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]' : 'text-[#34D399] drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]'
          }`}>
            {language === 'es' ? '[ ⌖ ANÁLISIS DE CENTRADO SUB-PÍXEL ]' : '[ ⌖ SUB-PIXEL CENTERING ANALYSIS ]'}
          </div>
          <div className={`mt-0.5 font-mono text-[7.5px] sm:text-[8.5px] tracking-[0.12em] uppercase font-medium ${
            isLight ? 'text-[#1E293B]' : 'text-[#CBD5E1]'
          }`}>
            {language === 'es' ? 'CENTRADO 50/50 · SIMETRÍA ±0.01mm' : '50/50 CENTERING · ±0.01mm SYMMETRY'}
          </div>
        </div>

        <div 
          className="absolute top-[52vh] right-3 sm:right-6 lg:right-10 pointer-events-none select-none z-10 text-right"
          style={{ animation: 'scanSnippetPhaseMid 18s cubic-bezier(0.4, 0, 0.2, 1) infinite' }}
        >
          <div className={`font-mono text-[8.5px] sm:text-[9.5px] tracking-[0.16em] uppercase font-bold ${
            isLight ? 'text-[#065F46] drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]' : 'text-[#34D399] drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]'
          }`}>
            {language === 'es' ? '[ ⌖ ESCANEO DE SUPERFICIE 0.03mm ]' : '[ ⌖ SURFACE DEFECT SCAN 0.03mm ]'}
          </div>
          <div className={`mt-0.5 font-mono text-[7.5px] sm:text-[8.5px] tracking-[0.12em] uppercase font-medium ${
            isLight ? 'text-[#1E293B]' : 'text-[#CBD5E1]'
          }`}>
            {language === 'es' ? 'DETECCIÓN MICRO-DEFECTOS · GEM MINT' : 'MICRO-DEFECT DETECTION · GEM MINT'}
          </div>
        </div>

        {/* FASE 3 (INFERIOR - 4 SEGUNDOS): Aparece cuando el láser llega abajo */}
        <div 
          className="absolute top-[78vh] left-3 sm:left-8 lg:left-12 pointer-events-none select-none z-10"
          style={{ animation: 'scanSnippetPhaseBottom 18s cubic-bezier(0.4, 0, 0.2, 1) infinite' }}
        >
          <div className={`font-mono text-[8.5px] sm:text-[9.5px] tracking-[0.16em] uppercase font-bold ${
            isLight ? 'text-[#065F46] drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]' : 'text-[#34D399] drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]'
          }`}>
            {language === 'es' ? '[ ⌖ FUSIÓN MOLECULAR DE CANTO ]' : '[ ⌖ MOLECULAR EDGE FUSION ]'}
          </div>
          <div className={`mt-0.5 font-mono text-[7.5px] sm:text-[8.5px] tracking-[0.12em] uppercase font-medium ${
            isLight ? 'text-[#1E293B]' : 'text-[#CBD5E1]'
          }`}>
            {language === 'es' ? 'SELLADO ULTRASÓNICO 100% HERMÉTICO' : 'ULTRASONIC WELD: 100% AIRTIGHT'}
          </div>
        </div>

        <div 
          className="absolute top-[80vh] right-3 sm:right-8 lg:right-12 pointer-events-none select-none z-10 text-right"
          style={{ animation: 'scanSnippetPhaseBottom 18s cubic-bezier(0.4, 0, 0.2, 1) infinite' }}
        >
          <div className={`font-mono text-[8.5px] sm:text-[9.5px] tracking-[0.16em] uppercase font-bold ${
            isLight ? 'text-[#065F46] drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]' : 'text-[#34D399] drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]'
          }`}>
            {language === 'es' ? '[ ⌖ AUDITORÍA CRIPTOGRÁFICA LEDGER ]' : '[ ⌖ CRYPTOGRAPHIC LEDGER AUDIT ]'}
          </div>
          <div className={`mt-0.5 font-mono text-[7.5px] sm:text-[8.5px] tracking-[0.12em] uppercase font-medium ${
            isLight ? 'text-[#1E293B]' : 'text-[#CBD5E1]'
          }`}>
            {language === 'es' ? 'REGISTRO BLOCKCHAIN #GG-10 VERIFICADO' : 'BLOCKCHAIN CERTIFICATE #GG-10 OK'}
          </div>
        </div>

      </div>

      {/* ═════════════════════════════════════════════════════════════════════
          6. COORDENADAS DISCRETAS EN ESQUINA (Puro Texto Sin Caja Ni Círculos)
          ═════════════════════════════════════════════════════════════════════ */}
      <div className="hidden sm:flex absolute bottom-3 right-6 pointer-events-none items-center gap-2 font-mono text-[7px] tracking-widest text-emerald-500/40 uppercase">
        <span>GORILLA FORENSIC SCANNER</span>
        {mousePos.x !== -1000 && (
          <>
            <span className="opacity-30">·</span>
            <span>X:{Math.round(mousePos.x)} Y:{Math.round(mousePos.y)}</span>
          </>
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



