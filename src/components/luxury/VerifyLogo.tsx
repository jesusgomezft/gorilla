import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';

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
  const { language = 'es' } = useLanguage();

  const [isHovered, setIsHovered] = useState(false);
  const [scanStep, setScanStep] = useState<number>(0);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Official 3D Shield Assets
  const shieldSrc = isLight 
    ? '/brand/gorilla-verify-light.png' 
    : '/brand/gorilla-verify-dark.png';

  // Dynamic Scan State cycling (simulates live optical forensic analysis)
  useEffect(() => {
    const interval = setInterval(() => {
      setScanStep((prev) => (prev + 1) % 3);
    }, 3600);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 16;
    setMouseOffset({ x, y });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMouseOffset({ x: 0, y: 0 });
  };

  // Forensic Telemetry data localized
  const telemetry = {
    es: [
      {
        status: 'ANALIZANDO MATRIZ ÓPTICA',
        detail: 'RESOLUCIÓN 1200 DPI · CAPA 2/4',
        flaw: 'CALIBRANDO RETÍCULA DE INSPECCIÓN',
        code: 'SCAN: 532nm · OK'
      },
      {
        status: '⚠ ERROR DETECTADO EN CARTA',
        detail: 'DEFECTO DE IMPRESIÓN [DOT 0.03mm] · SUPERFICIE',
        flaw: 'DESVIACIÓN DE CENTRADO: 58/42 · SUB-GRADE: 8.5',
        code: 'ANOMALY DETECTED · #E-8849'
      },
      {
        status: 'AUDITORÍA FORENSE GORILLA',
        detail: 'AUTENTICIDAD VERIFICADA · REGISTRO PÚBLICO',
        flaw: 'CERTIFICADO OFICIAL #GG-99420',
        code: 'BLOCKCHAIN HASH VALID'
      }
    ],
    en: [
      {
        status: 'ANALYZING OPTICAL MATRIX',
        detail: 'RESOLUTION 1200 DPI · LAYER 2/4',
        flaw: 'CALIBRATING INSPECTION RETICLE',
        code: 'SCAN: 532nm · OK'
      },
      {
        status: '⚠ CARD FLAW DETECTED',
        detail: 'PRINT ERROR DEFECT [0.03mm] · SURFACE FLAW',
        flaw: 'CENTERING OFF-AXIS: 58/42 · SUB-GRADE: 8.5',
        code: 'ANOMALY DETECTED · #E-8849'
      },
      {
        status: 'GORILLA FORENSIC AUDIT',
        detail: 'AUTHENTICITY VERIFIED · PUBLIC REGISTRY',
        flaw: 'OFFICIAL CERTIFICATE #GG-99420',
        code: 'BLOCKCHAIN HASH VALID'
      }
    ]
  };

  const currentTelemetry = (language === 'en' ? telemetry.en : telemetry.es)[scanStep];

  return (
    <div 
      className={`inline-flex flex-col items-center select-none ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      ref={containerRef}
    >
      <style>{`
        /* 1. Shield Floating Levitation */
        @keyframes gvShieldFloat {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        /* 2. Precision Laser Scanner Vertical Sweep */
        @keyframes gvLaserSweep {
          0% {
            top: 4%;
            opacity: 0;
          }
          8% {
            opacity: 1;
          }
          48% {
            opacity: 1;
          }
          50% {
            top: 92%;
            opacity: 1;
          }
          54% {
            opacity: 0.2;
          }
          58% {
            top: 92%;
            opacity: 0;
          }
          62% {
            top: 92%;
            opacity: 0.8;
          }
          92% {
            opacity: 1;
          }
          96% {
            top: 4%;
            opacity: 0.9;
          }
          100% {
            top: 4%;
            opacity: 0;
          }
        }

        /* 3. Laser Beam Wake / Sweep Cone */
        @keyframes gvLaserWake {
          0%, 100% {
            opacity: 0;
            transform: scaleY(0.2);
          }
          15%, 85% {
            opacity: 0.75;
            transform: scaleY(1);
          }
        }

        /* 4. Target Reticle Lock & Error Ping */
        @keyframes gvReticlePulse {
          0%, 100% {
            transform: scale(0.96);
            opacity: 0.7;
          }
          50% {
            transform: scale(1.04);
            opacity: 1;
          }
        }

        /* 5. Dot Matrix Radar Sweep Pulse */
        @keyframes gvRadarWave {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        /* 6. Clean Vector Blink for Checkmark (No shadows) */
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
          animation: gvShieldFloat 4.6s ease-in-out infinite;
        }

        .gv-laser-sweep {
          animation: gvLaserSweep 3.6s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }

        .gv-reticle-pulse {
          animation: gvReticlePulse 1.8s ease-in-out infinite;
        }

        .gv-radar-spin {
          animation: gvRadarWave 14s linear infinite;
        }

        .gv-check-pulse {
          animation: gvCheckBlink 2.2s ease-in-out infinite;
          transform-origin: center;
        }
      `}</style>

      {/* Hero 3D Shield Stage — Dot Matrix Background + Realistic Forensic Laser Scanner */}
      <div className="relative flex items-center justify-center cursor-pointer group">
        
        {/* ========================================================================= */}
        {/* HIGH-TECH DOT MATRIX BACKGROUND (Sin cortes cuadrados, fade radial suave) */}
        {/* ========================================================================= */}
        <div 
          className="absolute -inset-10 sm:-inset-14 lg:-inset-16 pointer-events-none flex items-center justify-center overflow-visible"
          style={{
            transform: `translate(${mouseOffset.x * 0.4}px, ${mouseOffset.y * 0.4}px)`,
            transition: 'transform 0.15s ease-out'
          }}
        >
          {/* Radial Dot Pattern with organic fading edge (mask-image circular) */}
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `radial-gradient(circle, ${isLight ? 'rgba(34, 197, 94, 0.28)' : 'rgba(74, 222, 128, 0.32)'} 1.25px, transparent 1.25px)`,
              backgroundSize: '16px 16px',
              maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 20%, rgba(0,0,0,0.55) 48%, transparent 72%)',
              WebkitMaskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 20%, rgba(0,0,0,0.55) 48%, transparent 72%)'
            }}
          />

          {/* Precision Concentric Calibration Rings (Radar Lines) */}
          <div 
            className={`absolute w-44 h-44 sm:w-56 sm:h-56 lg:w-64 lg:h-64 rounded-full border border-dashed transition-opacity duration-500 pointer-events-none ${
              isLight ? 'border-emerald-500/20' : 'border-[#22C55E]/25'
            } ${isHovered ? 'opacity-90' : 'opacity-40'}`} 
          />
          <div 
            className={`absolute w-60 h-60 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-full border border-emerald-500/10 pointer-events-none`} 
          />

          {/* Rotating Subtle Radar Scanner Sweep Sector */}
          <div 
            className="absolute w-52 h-52 sm:w-64 sm:h-64 lg:w-72 lg:h-72 rounded-full gv-radar-spin pointer-events-none opacity-20"
            style={{
              background: 'conic-gradient(from 0deg at 50% 50%, rgba(34, 197, 94, 0.25) 0deg, transparent 60deg, transparent 360deg)',
              maskImage: 'radial-gradient(circle, black 30%, transparent 70%)',
              WebkitMaskImage: 'radial-gradient(circle, black 30%, transparent 70%)'
            }}
          />
        </div>

        {/* ========================================================================= */}
        {/* FLOATING 3D SHIELD SCULPTURE + LASER BEAM + ERROR DETECTION HUD */}
        {/* ========================================================================= */}
        <div 
          className={`relative ${actualShieldSize} gv-shield-float transition-all duration-300 ease-out`}
          style={{
            transform: `perspective(700px) rotateX(${-mouseOffset.y * 0.8}deg) rotateY(${mouseOffset.x * 0.8}deg) ${isHovered ? 'scale(1.03)' : 'scale(1)'}`
          }}
        >
          {/* Main 3D Shield Sculpture Image (100% Pure Transparent) */}
          <img 
            src={shieldSrc}
            alt="Gorilla Verify Shield"
            className="w-full h-full object-contain pointer-events-none select-none drop-shadow-[0_12px_24px_rgba(0,0,0,0.35)]"
            draggable={false}
          />

          {/* ===================================================================== */}
          {/* REALISTIC HIGH-TECH FORENSIC LASER SCANNER BEAM */}
          {/* ===================================================================== */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[28px]">
            {/* The Scanning Beam Head Assembly */}
            <div className="absolute inset-x-1 gv-laser-sweep z-20 pointer-events-none">
              
              {/* Trailing Optical Laser Wake / Light Cone */}
              <div 
                className="h-10 sm:h-14 -mt-10 sm:-mt-14 w-full bg-gradient-to-t from-[#22C55E]/20 via-[#22C55E]/05 to-transparent pointer-events-none"
                style={{
                  maskImage: 'linear-gradient(to top, black, transparent)',
                  WebkitMaskImage: 'linear-gradient(to top, black, transparent)'
                }}
              />

              {/* Intense Glowing Core Laser Line */}
              <div className="relative flex items-center justify-between">
                {/* Left Optical Sensor Reticle */}
                <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80] shadow-[0_0_8px_#22C55E]" />

                {/* Main Laser Line with Intense Green Neon Glow */}
                <div className="flex-1 mx-0.5 h-[2.5px] bg-gradient-to-r from-transparent via-[#4ADE80] to-transparent shadow-[0_0_10px_#22C55E,0_0_20px_#4ADE80,0_0_30px_rgba(34,197,94,0.6)]" />

                {/* Right Optical Sensor Reticle */}
                <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80] shadow-[0_0_8px_#22C55E]" />
              </div>

              {/* Real-time Moving Coordinate Micro-Badge on Laser Head */}
              <div className="flex justify-between items-center px-2 mt-0.5 opacity-80">
                <span className="font-mono text-[7px] sm:text-[8px] tracking-wider text-[#22C55E] bg-black/60 px-1 py-0.2 rounded backdrop-blur-sm">
                  Y-AXIS 1200DPI
                </span>
                <span className="font-mono text-[7px] sm:text-[8px] tracking-wider text-emerald-300 bg-black/60 px-1 py-0.2 rounded backdrop-blur-sm">
                  λ: 532nm
                </span>
              </div>
            </div>

            {/* Target Reticle Crosshairs at Shield Center */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
              <div className="w-16 h-16 sm:w-20 sm:h-20 border border-emerald-500/25 rounded-lg gv-reticle-pulse relative">
                {/* Corner bracket reticles */}
                <div className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-[#4ADE80]" />
                <div className="absolute -top-1 -right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-[#4ADE80]" />
                <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-[#4ADE80]" />
                <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-[#4ADE80]" />

                {/* Pinpoint Target Center Dot */}
                <div className="absolute inset-0 m-auto w-1.5 h-1.5 rounded-full bg-[#22C55E] shadow-[0_0_6px_#22C55E]" />
              </div>
            </div>
          </div>

          {/* ===================================================================== */}
          {/* HOLOGRAPHIC FORENSIC MICRO-TEXT (ERROR EN CARTA / HUD TELEMETRY) */}
          {/* ===================================================================== */}
          <div 
            className="absolute -bottom-3 sm:-bottom-4 inset-x-0 mx-auto z-30 flex flex-col items-center pointer-events-none"
            style={{ width: 'max-content', maxWidth: '100%' }}
          >
            <div 
              className={`px-2.5 py-1 rounded-md backdrop-blur-md border transition-all duration-500 shadow-lg flex flex-col items-center text-center ${
                scanStep === 1
                  ? 'bg-black/85 border-amber-500/50 shadow-[0_0_14px_rgba(245,158,11,0.25)]'
                  : isLight
                    ? 'bg-white/90 border-emerald-500/40 shadow-[0_4px_12px_rgba(34,197,94,0.15)] text-slate-900'
                    : 'bg-black/80 border-[#22C55E]/40 shadow-[0_0_14px_rgba(34,197,94,0.2)] text-white'
              }`}
            >
              {/* Primary Header with Status Tag */}
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className={`w-1.5 h-1.5 rounded-full animate-ping ${
                  scanStep === 1 ? 'bg-amber-400' : 'bg-[#22C55E]'
                }`} />
                <span className={`font-mono text-[8px] sm:text-[9px] font-bold tracking-widest uppercase ${
                  scanStep === 1 
                    ? 'text-amber-400 font-extrabold' 
                    : isLight ? 'text-emerald-700' : 'text-[#4ADE80]'
                }`}>
                  {currentTelemetry.status}
                </span>
              </div>

              {/* Micro-Text Line: Flaw / Printing Detail */}
              <span className={`font-mono text-[7px] sm:text-[8px] tracking-wide leading-tight ${
                scanStep === 1
                  ? 'text-amber-200 font-medium'
                  : isLight ? 'text-slate-600' : 'text-emerald-200/80'
              }`}>
                {currentTelemetry.detail}
              </span>

              {/* Sub-Metric / Error Coordinate */}
              <div className="mt-0.5 flex items-center gap-2 font-mono text-[6.5px] sm:text-[7.5px] text-gray-400">
                <span className={scanStep === 1 ? 'text-amber-300 font-semibold' : ''}>
                  {currentTelemetry.flaw}
                </span>
                <span className="opacity-50">·</span>
                <span className="text-[#22C55E]">
                  {currentTelemetry.code}
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* SUB-BRAND TYPOGRAPHY: GORILLA + ✓ERIFY (Bold, Clean, No Shadows/Aura)    */}
      {/* ========================================================================= */}
      <div className={`mt-7 sm:mt-8 flex ${layout === 'stacked' ? 'flex-col items-center gap-1.5' : 'flex-row items-center gap-2.5 sm:gap-3.5'}`}>
        
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

