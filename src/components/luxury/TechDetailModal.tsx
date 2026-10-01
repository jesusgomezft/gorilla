import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';

interface TechDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate?: (path: string) => void;
}

export const TechDetailModal: React.FC<TechDetailModalProps> = ({ isOpen, onClose, onNavigate }) => {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const [activeTab, setActiveTab] = useState<'scan' | 'analyze' | 'measure' | 'grade'>('measure');

  React.useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const tabs = [
    {
      id: 'scan' as const,
      num: '01',
      label: language === 'es' ? 'ESCANEO 1200 PPP' : '1200 DPI SCAN',
      shortLabel: '1200 DPI',
    },
    {
      id: 'analyze' as const,
      num: '02',
      label: language === 'es' ? 'ANÁLISIS FORENSE' : 'FORENSIC ANALYSIS',
      shortLabel: language === 'es' ? 'FORENSE' : 'FORENSIC',
    },
    {
      id: 'measure' as const,
      num: '03',
      label: language === 'es' ? 'MEDIDOR LÁSER 0.01mm' : '0.01mm LASER CALIPER',
      shortLabel: '0.01mm',
    },
    {
      id: 'grade' as const,
      num: '04',
      label: language === 'es' ? 'SLAB SÓNICO & CERT' : 'SONIC SLAB & CERT',
      shortLabel: 'SLAB & NFC',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/75 backdrop-blur-md animate-fadeIn">
      <div 
        className={`relative w-full max-w-5xl rounded-none shadow-2xl overflow-hidden flex flex-col max-h-[90vh] border transition-colors duration-300 ${
          isLight 
            ? 'bg-[#FAF8F5] border-[#DDD6C9] text-[#1A1D1A]' 
            : 'bg-[#121613] border-white/10 text-white'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* ── 1. MODAL HEADER ── */}
        <div className={`shrink-0 px-4 sm:px-6 py-2.5 sm:py-4 border-b flex items-center justify-between transition-colors ${
          isLight 
            ? 'bg-[#ECE5D8] border-[#DDD6C9]' 
            : 'bg-[#181E19] border-white/10'
        }`}>
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-none border flex items-center justify-center shrink-0 ${
              isLight 
                ? 'bg-[#2D9A46]/10 border-[#2D9A46]/40 text-[#2D9A46]' 
                : 'bg-[#48C765]/10 border-[#48C765]/30 text-[#48C765]'
            }`}>
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5zm0 2.18l7 3.89v4.93c0 4.54-3.14 8.79-7 9.92-3.86-1.13-7-5.38-7-9.92V8.07l7-3.89z" />
              </svg>
            </div>
            <div className="min-w-0">
              <h3 className={`font-['Oswald'] font-bold text-xs sm:text-base tracking-wide uppercase truncate ${
                isLight ? 'text-[#1A1D1A]' : 'text-white'
              }`}>
                {language === 'es' ? 'Protocolo Óptico Gorilla' : 'Gorilla Optical Protocol'}
              </h3>
              <div className="hidden sm:flex items-center gap-2 mt-0.5">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#48C765] animate-pulse" />
                <span className={`font-mono text-[10px] tracking-wider uppercase truncate ${
                  isLight ? 'text-[#6B7268]' : 'text-[#A4ACA1]'
                }`}>
                  SPEC V4.2 // CALIBRACIÓN 0.01mm // ISO-17025 LAB
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-none border flex items-center justify-center text-xs sm:text-sm transition-colors shrink-0 ml-2 sm:ml-3 ${
              isLight 
                ? 'border-[#DDD6C9] text-[#6B7268] hover:text-[#1A1D1A] hover:border-[#1A1D1A] hover:bg-black/5' 
                : 'border-white/10 text-[#A4ACA1] hover:text-white hover:border-white/30 hover:bg-white/5'
            }`}
            aria-label="Cerrar modal"
          >
            ✕
          </button>
        </div>

        {/* ── 2. NAVIGATION TABS (Responsive) ── */}
        <div className={`shrink-0 border-b transition-colors overflow-x-auto scrollbar-none ${
          isLight 
            ? 'bg-[#F3EFE6] border-[#DDD6C9]' 
            : 'bg-[#0E120F] border-white/10'
        }`}>
          <div className="flex min-w-max sm:min-w-0 w-full">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 px-3 sm:px-5 py-2.5 sm:py-3.5 font-mono text-[10px] sm:text-xs font-bold tracking-wider uppercase transition-all whitespace-nowrap border-b-2 flex items-center justify-center gap-1 sm:gap-2 ${
                    isActive
                      ? isLight
                        ? 'border-[#2D9A46] text-[#2D9A46] bg-[#2D9A46]/10'
                        : 'border-[#48C765] text-[#48C765] bg-[#48C765]/10 shadow-[inset_0_-2px_6px_rgba(72,199,101,0.2)]'
                      : isLight
                        ? 'border-transparent text-[#6B7268] hover:text-[#1A1D1A] hover:bg-black/[0.02]'
                        : 'border-transparent text-[#A4ACA1] hover:text-white hover:bg-white/[0.02]'
                  }`}
                >
                  <span className={`text-[8px] sm:text-[10px] opacity-60 font-normal`}>{tab.num}.</span>
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.shortLabel}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── 3. CONTENT AREA ── */}
        <div className="p-4 sm:p-6 md:p-8 overflow-y-auto space-y-6 flex-1 min-h-0">
          <AnimatePresence mode="wait">
            
            {/* ── TAB 01: 1200 DPI SCAN ── */}
            {activeTab === 'scan' && (
              <motion.div
                key="scan"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center"
              >
                {/* HUD Viewport (Left) */}
                <div className="dark-hud lg:col-span-6 bg-[#080C09] border border-[#48C765]/20 p-4 sm:p-5 relative overflow-hidden shadow-2xl flex flex-col justify-between min-h-[250px] sm:min-h-[350px]">
                  {/* Subtle Grid Matrix Background */}
                  <div className="absolute inset-0 bg-[radial-gradient(#48C765_1px,transparent_1px)] [background-size:16px_16px] opacity-15 pointer-events-none" />
                  
                  {/* Top HUD Telemetry Bar */}
                  <div className="flex items-center justify-between text-[9px] font-mono text-[#A4ACA1] border-b border-white/10 pb-2 relative z-10">
                    <span className="flex items-center gap-1.5 text-[#48C765]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#48C765] animate-ping" />
                      ESCANEO MULTIESPECTRAL
                    </span>
                    <span className="text-white/60">CHAMBER #01 // 5000K</span>
                  </div>

                  {/* Main Scanner Centerpiece */}
                  <div className="my-auto py-4 flex flex-col items-center justify-center relative">
                    <div className="relative w-36 sm:w-44 h-52 sm:h-60 border-2 border-[#48C765]/40 bg-[#0F1611] p-1.5 shadow-[0_0_30px_rgba(72,199,101,0.15)] flex flex-col justify-between overflow-hidden">
                      {/* Real Card Graphic */}
                      <img 
                        src="/images/alakazam_hero.png" 
                        alt="Card Scanning Simulation"
                        className="w-full h-full object-contain filter contrast-125"
                      />

                      {/* Animated Laser Sweep Line */}
                      <motion.div 
                        animate={{ top: ['0%', '98%', '0%'] }}
                        transition={{ repeat: Infinity, duration: 3.2, ease: "linear" }}
                        className="absolute inset-x-0 h-[2px] bg-[#48C765] shadow-[0_0_15px_#48C765,0_0_5px_#FFFFFF] z-20 pointer-events-none"
                      >
                        <div className="absolute right-0 -top-3 px-1 bg-[#48C765] text-[#14170F] font-mono text-[7px] font-bold">
                          1200 DPI
                        </div>
                      </motion.div>

                      {/* Optical Corner Crosshairs */}
                      <div className="absolute top-1 left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-[#48C765] z-10" />
                      <div className="absolute top-1 right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-[#48C765] z-10" />
                      <div className="absolute bottom-1 left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-[#48C765] z-10" />
                      <div className="absolute bottom-1 right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-[#48C765] z-10" />
                    </div>
                  </div>

                  {/* Bottom Telemetry Metrics Bar */}
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10 text-[9px] font-mono relative z-10">
                    <div className="flex justify-between bg-black/40 px-2 py-1 border border-white/5">
                      <span className="text-[#A4ACA1]">SENSOR:</span>
                      <span className="text-[#48C765] font-bold">48.2 MP SONY CMOS</span>
                    </div>
                    <div className="flex justify-between bg-black/40 px-2 py-1 border border-white/5">
                      <span className="text-[#A4ACA1]">FILTRO:</span>
                      <span className="text-white font-bold">POLARIZADOR CPL</span>
                    </div>
                  </div>
                </div>

                {/* Technical Specifications (Right) */}
                <div className="lg:col-span-6 space-y-4">
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[#48C765]/10 border border-[#48C765]/30 text-[#48C765] font-mono text-[10px] font-bold tracking-widest uppercase">
                    ETAPA 01 // CAPTURA INDUSTRIAL
                  </div>

                  <h4 className={`font-['Oswald'] text-xl sm:text-2xl font-bold uppercase tracking-wide ${
                    isLight ? 'text-[#1A1D1A]' : 'text-white'
                  }`}>
                    {language === 'es' 
                      ? 'Captura Multiespectral en Cámara de Luz Balanceada' 
                      : 'Multispectral Capture in Calibrated Optical Chamber'}
                  </h4>

                  <p className={`font-['Nunito_Sans'] text-xs sm:text-sm leading-relaxed ${
                    isLight ? 'text-[#4A5048]' : 'text-[#A4ACA1]'
                  }`}>
                    {language === 'es'
                      ? 'Cada ejemplar se digitaliza a 1200 puntos por pulgada bajo iluminación neutral continua calibrada de 5000K (estándar D50). Ópticas polarizadoras circulares eliminan el 100% de reflejos parásitos, capturando microarañazos e imperfecciones con un sensor nativo de 48 Megapíxeles antes de cualquier contacto humano.'
                      : 'Every collectible is scanned at 1200 DPI under continuous 5000K neutral daylight (D50 standard) inside a climate-sealed chamber. Circular polarizing optics eradicate 100% of surface glare, revealing micro-scratches with a 48-Megapixel industrial sensor.'
                    }
                  </p>

                  {/* 4-Item Telemetry Grid */}
                  <div className="grid grid-cols-2 gap-2.5 pt-2">
                    <div className={`p-3 border flex flex-col justify-between ${
                      isLight ? 'bg-[#ECE5D8] border-[#DDD6C9]' : 'bg-[#181E19] border-white/5'
                    }`}>
                      <span className="font-mono text-[9px] uppercase tracking-wider text-[#A4ACA1]">RESOLUCIÓN NATIVA</span>
                      <span className="font-['Oswald'] text-sm sm:text-base font-bold text-[#48C765]">1200 PPP / 48 MP</span>
                    </div>

                    <div className={`p-3 border flex flex-col justify-between ${
                      isLight ? 'bg-[#ECE5D8] border-[#DDD6C9]' : 'bg-[#181E19] border-white/5'
                    }`}>
                      <span className="font-mono text-[9px] uppercase tracking-wider text-[#A4ACA1]">TEMPERATURA COLOR</span>
                      <span className={`font-['Oswald'] text-sm sm:text-base font-bold ${isLight ? 'text-[#1A1D1A]' : 'text-white'}`}>5000K NEUTRAL D50</span>
                    </div>

                    <div className={`p-3 border flex flex-col justify-between ${
                      isLight ? 'bg-[#ECE5D8] border-[#DDD6C9]' : 'bg-[#181E19] border-white/5'
                    }`}>
                      <span className="font-mono text-[9px] uppercase tracking-wider text-[#A4ACA1]">REFLEJOS PARÁSITOS</span>
                      <span className="font-['Oswald'] text-sm sm:text-base font-bold text-[#48C765]">0.0% (CPL OPTICS)</span>
                    </div>

                    <div className={`p-3 border flex flex-col justify-between ${
                      isLight ? 'bg-[#ECE5D8] border-[#DDD6C9]' : 'bg-[#181E19] border-white/5'
                    }`}>
                      <span className="font-mono text-[9px] uppercase tracking-wider text-[#A4ACA1]">TAMAÑO MATRIZ</span>
                      <span className={`font-['Oswald'] text-sm sm:text-base font-bold ${isLight ? 'text-[#1A1D1A]' : 'text-white'}`}>8160 x 5906 PX</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── TAB 02: FORENSIC ANALYSIS ── */}
            {activeTab === 'analyze' && (
              <motion.div
                key="analyze"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center"
              >
                {/* HUD Viewport (Left) with REAL 400x UV Rosette Halftone Photo */}
                <div className="dark-hud lg:col-span-6 bg-[#080C09] border border-cyan-500/30 p-4 sm:p-5 relative overflow-hidden shadow-2xl flex flex-col justify-between min-h-[250px] sm:min-h-[350px]">
                  {/* Top HUD Telemetry Bar */}
                  <div className="flex items-center justify-between text-[9px] font-mono text-[#A4ACA1] border-b border-white/10 pb-2 relative z-10">
                    <span className="flex items-center gap-1.5 text-cyan-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                      ESPECTROMETRÍA UV 365nm
                    </span>
                    <span className="text-white/60">400x MAGNIFICACIÓN</span>
                  </div>

                  {/* Real 400x Microscopic Rosette Photo */}
                  <div className="my-auto py-3 relative flex items-center justify-center">
                    <div className="relative w-full max-w-[280px] aspect-[4/3] border-2 border-cyan-400/50 shadow-[0_0_25px_rgba(6,182,212,0.2)] overflow-hidden bg-black">
                      <img 
                        src="/images/macro_authenticate.jpg" 
                        alt="400x Forensic Rosette Pattern" 
                        className="w-full h-full object-cover filter contrast-125 saturate-125"
                      />
                      
                      {/* Reticle Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-24 h-24 rounded-full border border-cyan-400/60 flex items-center justify-center">
                          <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_8px_#22D3EE]" />
                        </div>
                        <div className="absolute inset-x-4 top-1/2 h-[1px] bg-cyan-400/30" />
                        <div className="absolute inset-y-4 left-1/2 w-[1px] bg-cyan-400/30" />
                      </div>

                      {/* Rosette Match Tag */}
                      <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/80 border border-cyan-400/50 font-mono text-[8px] text-cyan-300 font-bold">
                        TRAMA ROSETTE CMYK: 99.8%
                      </div>
                    </div>
                  </div>

                  {/* Bottom Telemetry Metrics Bar */}
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10 text-[9px] font-mono relative z-10">
                    <div className="flex justify-between bg-black/40 px-2 py-1 border border-white/5">
                      <span className="text-[#A4ACA1]">PIGMENTO:</span>
                      <span className="text-cyan-400 font-bold">ORIGINAL OFFSET</span>
                    </div>
                    <div className="flex justify-between bg-black/40 px-2 py-1 border border-white/5">
                      <span className="text-[#A4ACA1]">VEREDICTO:</span>
                      <span className="text-[#48C765] font-bold">100% GENUINA</span>
                    </div>
                  </div>
                </div>

                {/* Technical Specifications (Right) */}
                <div className="lg:col-span-6 space-y-4">
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-[10px] font-bold tracking-widest uppercase">
                    ETAPA 02 // DETECCIÓN FORENSE
                  </div>

                  <h4 className={`font-['Oswald'] text-xl sm:text-2xl font-bold uppercase tracking-wide ${
                    isLight ? 'text-[#1A1D1A]' : 'text-white'
                  }`}>
                    {language === 'es' 
                      ? 'Detección Forense de Tintas y Microfibras' 
                      : 'Forensic Ink & Microfiber Verification'}
                  </h4>

                  <p className={`font-['Nunito_Sans'] text-xs sm:text-sm leading-relaxed ${
                    isLight ? 'text-[#4A5048]' : 'text-[#A4ACA1]'
                  }`}>
                    {language === 'es'
                      ? 'Examinamos a 400 aumentos la retícula de impresión offset original (trama de roseta estocástica) y la fluorescencia de las fibras celulósicas bajo luz ultravioleta de 365 nm. Nuestro algoritmo compara la firma química y densidad con el archivo de fábrica oficial, detectando repintados con rotulador, cartas reencoladas y falsificaciones de alta gama en segundos.'
                      : 'We examine the authentic offset rosette pattern and cellulosic microfiber fluorescence under 365nm ultraviolet wavelength at 400x magnification. The algorithm matches density against manufacturer archives, instantly identifying ink re-coloring, back re-gluing, and counterfeit stock.'
                    }
                  </p>

                  {/* 4-Item Telemetry Grid */}
                  <div className="grid grid-cols-2 gap-2.5 pt-2">
                    <div className={`p-3 border flex flex-col justify-between ${
                      isLight ? 'bg-[#ECE5D8] border-[#DDD6C9]' : 'bg-[#181E19] border-white/5'
                    }`}>
                      <span className="font-mono text-[9px] uppercase tracking-wider text-[#A4ACA1]">LONGITUD DE ONDA</span>
                      <span className="font-['Oswald'] text-sm sm:text-base font-bold text-cyan-400">UV 365 NM</span>
                    </div>

                    <div className={`p-3 border flex flex-col justify-between ${
                      isLight ? 'bg-[#ECE5D8] border-[#DDD6C9]' : 'bg-[#181E19] border-white/5'
                    }`}>
                      <span className="font-mono text-[9px] uppercase tracking-wider text-[#A4ACA1]">MAGNIFICACIÓN</span>
                      <span className={`font-['Oswald'] text-sm sm:text-base font-bold ${isLight ? 'text-[#1A1D1A]' : 'text-white'}`}>400X ULTRA-MACRO</span>
                    </div>

                    <div className={`p-3 border flex flex-col justify-between ${
                      isLight ? 'bg-[#ECE5D8] border-[#DDD6C9]' : 'bg-[#181E19] border-white/5'
                    }`}>
                      <span className="font-mono text-[9px] uppercase tracking-wider text-[#A4ACA1]">COINCIDENCIA ROSETTE</span>
                      <span className="font-['Oswald'] text-sm sm:text-base font-bold text-[#48C765]">99.8% ORIGINAL</span>
                    </div>

                    <div className={`p-3 border flex flex-col justify-between ${
                      isLight ? 'bg-[#ECE5D8] border-[#DDD6C9]' : 'bg-[#181E19] border-white/5'
                    }`}>
                      <span className="font-mono text-[9px] uppercase tracking-wider text-[#A4ACA1]">REINTENTOS / RETOQUES</span>
                      <span className="font-['Oswald'] text-sm sm:text-base font-bold text-[#48C765]">0 DETECTADOS</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── TAB 03: 0.01mm LASER CALIPER CENTERING ── */}
            {activeTab === 'measure' && (
              <motion.div
                key="measure"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center"
              >
                {/* HUD Viewport (Left) with REAL Caliper Telemetry Simulation */}
                <div className="dark-hud lg:col-span-6 bg-[#080C09] border border-[#48C765]/40 p-4 sm:p-5 relative overflow-hidden shadow-2xl flex flex-col justify-between min-h-[260px] sm:min-h-[360px]">
                  {/* Grid background */}
                  <div className="absolute inset-0 bg-[radial-gradient(#48C765_1px,transparent_1px)] [background-size:14px_14px] opacity-20 pointer-events-none" />

                  {/* Top HUD Telemetry Bar */}
                  <div className="flex items-center justify-between text-[9px] font-mono text-[#A4ACA1] border-b border-white/10 pb-2 relative z-10">
                    <span className="flex items-center gap-1.5 text-[#48C765]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#48C765] animate-pulse" />
                      TELEMETRÍA DE CENTRADO LÁSER
                    </span>
                    <span className="text-white/70">800 PTS/BORDE // TOL. ±0.008mm</span>
                  </div>

                  {/* Centering Caliper Card Visual */}
                  <div className="my-auto py-2 flex flex-col items-center justify-center relative">
                    <div className="relative w-40 sm:w-48 h-56 sm:h-64 border border-[#48C765]/80 bg-[#0C140E] p-2.5 shadow-[0_0_35px_rgba(72,199,101,0.25)] flex flex-col justify-between">
                      
                      {/* Inner Artwork Bounding Box */}
                      <div className="w-full h-full border border-dashed border-[#48C765]/60 relative flex flex-col justify-between overflow-hidden">
                        {/* Real Card Artwork in Background */}
                        <img 
                          src="/images/alakazam_hero.png" 
                          alt="Card Centering Measure" 
                          className="w-full h-full object-contain opacity-70 filter saturate-150"
                        />

                        {/* Coordinate Crosshairs */}
                        <div className="absolute inset-x-0 top-1/2 h-[1px] bg-[#48C765] shadow-[0_0_8px_#48C765]" />
                        <div className="absolute inset-y-0 left-1/2 w-[1px] bg-[#48C765] shadow-[0_0_8px_#48C765]" />

                        {/* Center Target Indicator */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full border border-[#48C765] flex items-center justify-center bg-black/60 shadow-[0_0_10px_#48C765]">
                          <span className="w-1 h-1 bg-[#48C765] rounded-full" />
                        </div>

                        {/* Live Measurement Badges On-Card */}
                        <div className="absolute top-1 inset-x-2 flex justify-between font-mono text-[8px] font-bold text-white bg-black/80 px-1 py-0.5 border border-[#48C765]/40 z-20">
                          <span className="text-[#48C765]">T: 1.04mm</span>
                          <span>RATIO 50.0%</span>
                        </div>

                        <div className="absolute bottom-1 inset-x-2 flex justify-between font-mono text-[8px] font-bold text-white bg-black/80 px-1 py-0.5 border border-[#48C765]/40 z-20">
                          <span className="text-[#48C765]">B: 1.04mm</span>
                          <span>RATIO 50.0%</span>
                        </div>
                      </div>

                      {/* Left & Right Caliper Dimension Arrows */}
                      <div className="absolute -left-1 top-1/2 -translate-y-1/2 -translate-x-full px-1.5 py-0.5 bg-black border border-[#48C765] font-mono text-[8px] font-bold text-[#48C765] shadow-lg">
                        L: 1.05mm
                      </div>
                      <div className="absolute -right-1 top-1/2 -translate-y-1/2 translate-x-full px-1.5 py-0.5 bg-black border border-[#48C765] font-mono text-[8px] font-bold text-[#48C765] shadow-lg">
                        R: 1.02mm
                      </div>
                    </div>
                  </div>

                  {/* Bottom Telemetry Metrics Bar */}
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10 text-[9px] font-mono relative z-10">
                    <div className="flex justify-between bg-black/40 px-2 py-1 border border-white/5">
                      <span className="text-[#A4ACA1]">BALANCE H:</span>
                      <span className="text-[#48C765] font-bold">50.7% / 49.3%</span>
                    </div>
                    <div className="flex justify-between bg-black/40 px-2 py-1 border border-white/5">
                      <span className="text-[#A4ACA1]">SUB-GRADE:</span>
                      <span className="text-[#48C765] font-bold">10 GEM MINT</span>
                    </div>
                  </div>
                </div>

                {/* Technical Specifications (Right) */}
                <div className="lg:col-span-6 space-y-4">
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[#48C765]/10 border border-[#48C765]/30 text-[#48C765] font-mono text-[10px] font-bold tracking-widest uppercase">
                    ETAPA 03 // MEDICIÓN VECTORIAL
                  </div>

                  <h4 className={`font-['Oswald'] text-xl sm:text-2xl font-bold uppercase tracking-wide ${
                    isLight ? 'text-[#1A1D1A]' : 'text-white'
                  }`}>
                    {language === 'es' 
                      ? 'Telemetría de Centrado al Centésimo de Milímetro' 
                      : 'Centering Telemetry Down to 0.01mm Precision'}
                  </h4>

                  <p className={`font-['Nunito_Sans'] text-xs sm:text-sm leading-relaxed ${
                    isLight ? 'text-[#4A5048]' : 'text-[#A4ACA1]'
                  }`}>
                    {language === 'es'
                      ? 'Sustituimos las reglas de plástico manuales y la subjetividad por cálculo vectorial asistido por ordenador. Nuestro software traza 800 puntos de coordenadas por cada borde de la carta, calculando la distancia matemática exacta entre el corte exterior y la retícula artística con una tolerancia de ± 0.008 mm.'
                      : 'No manual subjective plastic rulers. Our software calculates the exact mathematical vector between the card edge and graphic artwork at 800 coordinate points per side with an exacting calibration tolerance of ± 0.008 mm.'
                    }
                  </p>

                  {/* 4-Item Telemetry Grid */}
                  <div className="grid grid-cols-2 gap-2.5 pt-2">
                    <div className={`p-3 border flex flex-col justify-between ${
                      isLight ? 'bg-[#ECE5D8] border-[#DDD6C9]' : 'bg-[#181E19] border-white/5'
                    }`}>
                      <span className="font-mono text-[9px] uppercase tracking-wider text-[#A4ACA1]">PUNTOS DE MUESTREO</span>
                      <span className="font-['Oswald'] text-sm sm:text-base font-bold text-[#48C765]">3.200 VECTORES</span>
                    </div>

                    <div className={`p-3 border flex flex-col justify-between ${
                      isLight ? 'bg-[#ECE5D8] border-[#DDD6C9]' : 'bg-[#181E19] border-white/5'
                    }`}>
                      <span className="font-mono text-[9px] uppercase tracking-wider text-[#A4ACA1]">PRECISIÓN CALIBRE</span>
                      <span className={`font-['Oswald'] text-sm sm:text-base font-bold ${isLight ? 'text-[#1A1D1A]' : 'text-white'}`}>± 0.008 MM</span>
                    </div>

                    <div className={`p-3 border flex flex-col justify-between ${
                      isLight ? 'bg-[#ECE5D8] border-[#DDD6C9]' : 'bg-[#181E19] border-white/5'
                    }`}>
                      <span className="font-mono text-[9px] uppercase tracking-wider text-[#A4ACA1]">RATIO HORIZONTAL</span>
                      <span className="font-['Oswald'] text-sm sm:text-base font-bold text-[#48C765]">50.7 / 49.3 (10)</span>
                    </div>

                    <div className={`p-3 border flex flex-col justify-between ${
                      isLight ? 'bg-[#ECE5D8] border-[#DDD6C9]' : 'bg-[#181E19] border-white/5'
                    }`}>
                      <span className="font-mono text-[9px] uppercase tracking-wider text-[#A4ACA1]">RATIO VERTICAL</span>
                      <span className="font-['Oswald'] text-sm sm:text-base font-bold text-[#48C765]">50.0 / 50.0 (10)</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── TAB 04: SONIC SLAB & CERTIFICATION ── */}
            {activeTab === 'grade' && (
              <motion.div
                key="grade"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center"
              >
                {/* HUD Viewport (Left) with Real Macro Ultrasonic Slab Photo */}
                <div className="dark-hud lg:col-span-6 bg-[#080C09] border border-emerald-500/30 p-4 sm:p-5 relative overflow-hidden shadow-2xl flex flex-col justify-between min-h-[250px] sm:min-h-[350px]">
                  {/* Top HUD Telemetry Bar */}
                  <div className="flex items-center justify-between text-[9px] font-mono text-[#A4ACA1] border-b border-white/10 pb-2 relative z-10">
                    <span className="flex items-center gap-1.5 text-[#48C765]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#48C765] animate-ping" />
                      ENCAPSULADO SÓNICO 35 kHz
                    </span>
                    <span className="text-white/70">NFC CRYPTO TAG VERIFIED</span>
                  </div>

                  {/* Real Macro Acrylic Slab Photo */}
                  <div className="my-auto py-3 relative flex items-center justify-center">
                    <div className="relative w-full max-w-[280px] aspect-[4/3] border-2 border-[#48C765]/50 shadow-[0_0_30px_rgba(72,199,101,0.25)] overflow-hidden bg-black">
                      <img 
                        src="/images/macro_understand.jpg" 
                        alt="Ultrasonic Slab Edge" 
                        className="w-full h-full object-cover filter contrast-110"
                      />

                      {/* Acrylic Wave Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                      {/* Ultrasonic Seal Badge */}
                      <div className="absolute top-2 right-2 px-2 py-0.5 bg-[#48C765] text-[#14170F] font-mono text-[8px] font-bold shadow-md">
                        35 kHz MOLECULAR WELD
                      </div>

                      {/* Sub-Grades HUD overlay */}
                      <div className="absolute bottom-2 inset-x-2 bg-black/85 border border-white/10 p-1.5 flex justify-between items-center text-[8px] font-mono text-white">
                        <span>C: 10</span>
                        <span>CR: 10</span>
                        <span>ED: 9.5</span>
                        <span>SF: 10</span>
                        <span className="text-[#48C765] font-bold">10 GEM MINT</span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Telemetry Metrics Bar */}
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10 text-[9px] font-mono relative z-10">
                    <div className="flex justify-between bg-black/40 px-2 py-1 border border-white/5">
                      <span className="text-[#A4ACA1]">BARRERA UV:</span>
                      <span className="text-[#48C765] font-bold">99.4% BLOQUEO</span>
                    </div>
                    <div className="flex justify-between bg-black/40 px-2 py-1 border border-white/5">
                      <span className="text-[#A4ACA1]">CHIP SEGURIDAD:</span>
                      <span className="text-white font-bold">NFC CRYPTO TAG</span>
                    </div>
                  </div>
                </div>

                {/* Technical Specifications (Right) */}
                <div className="lg:col-span-6 space-y-4">
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[#48C765]/10 border border-[#48C765]/30 text-[#48C765] font-mono text-[10px] font-bold tracking-widest uppercase">
                    ETAPA 04 // PROTECCIÓN HERMÉTICA
                  </div>

                  <h4 className={`font-['Oswald'] text-xl sm:text-2xl font-bold uppercase tracking-wide ${
                    isLight ? 'text-[#1A1D1A]' : 'text-white'
                  }`}>
                    {language === 'es' 
                      ? 'Encapsulado Sónico Hermético y Certificación' 
                      : 'Hermetic Ultrasonic Encapsulation & Certification'}
                  </h4>

                  <p className={`font-['Nunito_Sans'] text-xs sm:text-sm leading-relaxed ${
                    isLight ? 'text-[#4A5048]' : 'text-[#A4ACA1]'
                  }`}>
                    {language === 'es'
                      ? 'Soldadura acrílica a 35 kHz sin disolventes ni pegamentos químicos volátiles. El polímero de grado museo bloquea el 99.4% de los rayos ultravioleta, sellando al vacío la pieza contra humedad, polvo y manipulación. Cada cápsula integra un microchip NFC inviolable con certificación criptográfica en cadena de bloques.'
                      : '35 kHz ultrasonic acrylic weld with zero solvent glues or volatile chemical fumes. Museum-grade optical polymer blocks 99.4% of UV rays, vacuum-sealing the card against humidity and tampering. An embedded NFC crypto chip guarantees immutable certification.'
                    }
                  </p>

                  {/* 4-Item Telemetry Grid */}
                  <div className="grid grid-cols-2 gap-2.5 pt-2">
                    <div className={`p-3 border flex flex-col justify-between ${
                      isLight ? 'bg-[#ECE5D8] border-[#DDD6C9]' : 'bg-[#181E19] border-white/5'
                    }`}>
                      <span className="font-mono text-[9px] uppercase tracking-wider text-[#A4ACA1]">FRECUENCIA SÓNICA</span>
                      <span className="font-['Oswald'] text-sm sm:text-base font-bold text-[#48C765]">35 kHz MOLECULAR</span>
                    </div>

                    <div className={`p-3 border flex flex-col justify-between ${
                      isLight ? 'bg-[#ECE5D8] border-[#DDD6C9]' : 'bg-[#181E19] border-white/5'
                    }`}>
                      <span className="font-mono text-[9px] uppercase tracking-wider text-[#A4ACA1]">FILTRO ULTRAVIOLETA</span>
                      <span className="font-['Oswald'] text-sm sm:text-base font-bold text-[#48C765]">99.4% BLOQUEO</span>
                    </div>

                    <div className={`p-3 border flex flex-col justify-between ${
                      isLight ? 'bg-[#ECE5D8] border-[#DDD6C9]' : 'bg-[#181E19] border-white/5'
                    }`}>
                      <span className="font-mono text-[9px] uppercase tracking-wider text-[#A4ACA1]">CHIP CRIPTOGRÁFICO</span>
                      <span className={`font-['Oswald'] text-sm sm:text-base font-bold ${isLight ? 'text-[#1A1D1A]' : 'text-white'}`}>NFC NTAG424 DNA</span>
                    </div>

                    <div className={`p-3 border flex flex-col justify-between ${
                      isLight ? 'bg-[#ECE5D8] border-[#DDD6C9]' : 'bg-[#181E19] border-white/5'
                    }`}>
                      <span className="font-mono text-[9px] uppercase tracking-wider text-[#A4ACA1]">PEGAMENTOS / VAPORES</span>
                      <span className="font-['Oswald'] text-sm sm:text-base font-bold text-[#48C765]">0.0% (ZERO GLUE)</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* ── 4. FOOTER ACTIONS (Mobile thumb-accessible) ── */}
        <div className={`shrink-0 px-4 sm:px-6 py-3 sm:py-4 border-t flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-3 transition-colors ${
          isLight 
            ? 'bg-[#ECE5D8] border-[#DDD6C9]' 
            : 'bg-[#181E19] border-white/10'
        }`}>
          <button
            onClick={onClose}
            className={`font-mono text-xs uppercase tracking-wider px-4 py-2.5 sm:py-2 border transition-colors text-center ${
              isLight 
                ? 'border-[#DDD6C9] text-[#4A5048] hover:text-[#1A1D1A] hover:bg-black/5' 
                : 'border-white/10 text-[#A4ACA1] hover:text-white hover:bg-white/5'
            }`}
          >
            {language === 'es' ? 'Cerrar' : 'Close'}
          </button>

          <button
            onClick={() => {
              onClose();
              if (onNavigate) onNavigate('/submit');
            }}
            className={`px-6 py-3 sm:py-2.5 rounded-none font-sans font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-lg ${
              isLight
                ? 'bg-[#2D9A46] hover:bg-[#248A3B] text-white shadow-[0_4px_15px_rgba(45,154,70,0.3)]'
                : 'bg-[#48C765] hover:bg-[#38B554] text-[#14170F] shadow-[0_0_20px_rgba(72,199,101,0.3)]'
            }`}
          >
            <span>{language === 'es' ? 'Iniciar Solicitud de Envío' : 'Start Card Submission'}</span>
            <span>→</span>
          </button>
        </div>

      </div>
    </div>
  );
};
