import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { 
  ShieldCheck, 
  Crosshair, 
  Eye, 
  Sparkles, 
  CheckCircle2, 
  Layers, 
  Maximize2,
  Cpu,
  Zap
} from 'lucide-react';

interface LuxuryHeroProps {
  onNavigate?: (path: string) => void;
  onOpenTechModal?: () => void;
}

interface Hotspot {
  id: string;
  x: number; // percentage
  y: number; // percentage
  title: string;
  metric: string;
  desc: string;
  category: string;
}

export const LuxuryHero: React.FC<LuxuryHeroProps> = ({ onNavigate, onOpenTechModal }) => {
  const { t, language } = useLanguage();
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const heroImageSrc = '/images/alakazam_hero.png?v=3';

  // 10s Pure Cinematic Intro Animation (100% transparent, zero text, zero blinking circles)
  const [isIntroPlaying, setIsIntroPlaying] = useState(true);
  const [introProgress, setIntroProgress] = useState(0); // 0 to 100%
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);
  const [showHotspots, setShowHotspots] = useState(true);
  const slabRef = useRef<HTMLDivElement>(null);

  // 10-second automatic pure cinematic sequence on initial visit
  useEffect(() => {
    if (!isIntroPlaying) return;

    const startTime = Date.now();
    const duration = 10000; // Exactly 10.0 seconds

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min((elapsed / duration) * 100, 100);
      setIntroProgress(progress);

      const t = progress / 100;

      // Ultra-smooth continuous floating motion across the 3 slabs
      const angleY = Math.sin(t * Math.PI * 2) * -4.2 * (1 - t * 0.4);
      const angleX = Math.sin(t * Math.PI * 2.5) * 2.2 * (1 - t * 0.4);

      setRotateY(angleY);
      setRotateX(angleX);

      // Silky specular studio light gliding continuously across the acrylic faces
      setGlarePosition({
        x: Math.round(15 + t * 70),
        y: Math.round(32 + Math.sin(t * Math.PI * 2) * 16)
      });

      if (elapsed >= duration) {
        clearInterval(timer);
        setIsIntroPlaying(false);
        setRotateX(0);
        setRotateY(0);
        setGlarePosition({ x: 50, y: 50 });
      }
    }, 30);

    return () => clearInterval(timer);
  }, [isIntroPlaying]);

  const hotspots: Hotspot[] = [
    {
      id: 'centering',
      x: 21,
      y: 52,
      category: language === 'es' ? 'CENTRADO Y SUPERFICIE' : 'OPTICAL CENTERING & FOIL',
      title: language === 'es' ? 'Centrado Óptico Sub-Píxel' : 'Sub-Pixel Optical Centering',
      metric: language === 'es' ? 'Simetría 50/50 · Gem Mint' : '50/50 Symmetry · Gem Mint',
      desc: language === 'es' 
        ? 'Peritaje digital que verifica la simetría perimetral del marco y la ausencia de defectos en el foil.' 
        : 'Digital analysis confirming border perimeter symmetry and absence of foil anomalies.'
    },
    {
      id: 'corner',
      x: 21,
      y: 18,
      category: language === 'es' ? 'ETIQUETA OFICIAL GGI' : 'OFFICIAL GGI LABEL',
      title: language === 'es' ? 'Calificación 10 Gem Mint' : 'Grade 10 Gem Mint',
      metric: language === 'es' ? 'Holografía y Código Interno' : 'Holographic & Internal Code',
      desc: language === 'es' 
        ? 'Etiqueta de seguridad de alta resolución con metadatos oficiales y código único de certificación.' 
        : 'High-resolution security label with official metadata and unique certification registry code.'
    },
    {
      id: 'sonic',
      x: 48,
      y: 45,
      category: language === 'es' ? 'CIERRE HERMÉTICO SÓNICO' : 'ULTRASONIC FUSION',
      title: language === 'es' ? 'Sellado Ultrasónico de Cantos' : 'Ultrasonic Edge Fusion',
      metric: language === 'es' ? 'Cápsula 100% Estanca' : '100% Hermetic Acrylic Weld',
      desc: language === 'es' 
        ? 'Fusión molecular de acrílico sin adhesivos químicos, aislando la pieza contra el polvo y la humedad.' 
        : 'Molecular acoustic acrylic weld without glues, fully sealing the specimen against humidity.'
    },
    {
      id: 'uv',
      x: 77,
      y: 18,
      category: language === 'es' ? 'REVERSO Y REGISTRO QR' : 'BACK REVERSE & QR LEDGER',
      title: language === 'es' ? 'Verificación Criptográfica' : 'Cryptographic Verification',
      metric: language === 'es' ? 'NFC & Ledger Blockchain' : 'NFC & Blockchain Ledger',
      desc: language === 'es' 
        ? 'Dorso oficial con código QR vinculado al libro mayor público de autenticidad Gorilla Verify.' 
        : 'Official back label featuring QR code linked to the Gorilla Verify ledger of authenticity.'
    }
  ];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isIntroPlaying) {
      setIsIntroPlaying(false);
    }
    if (!slabRef.current) return;
    const rect = slabRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rX = ((y - centerY) / centerY) * -12;
    const rY = ((x - centerX) / centerX) * 14;

    setRotateX(rX);
    setRotateY(rY);
    setGlarePosition({
      x: Math.round((x / rect.width) * 100),
      y: Math.round((y / rect.height) * 100)
    });
  };

  const handleMouseLeave = () => {
    if (isIntroPlaying) return;
    setRotateX(0);
    setRotateY(0);
    setGlarePosition({ x: 50, y: 50 });
  };

  return (
    <section 
      id="hero"
      className="relative w-full flex items-center overflow-hidden bg-transparent text-white pt-10 sm:pt-14 pb-4 sm:pb-6 select-none"
    >
      
      {/* Background Architectural Lights - Gentle luxury depth without muddy green wash */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="hidden lg:block absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-[#48C765]/15 blur-[150px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-[1440px] w-full mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
        
        {/* Left Editorial Column */}
        <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center items-center lg:items-start text-center lg:text-left pt-4 lg:pt-6">
          
          {/* Refined Technical Kicker - Pure Floating Editorial Typography (Zero Generic Box) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex items-center justify-center lg:justify-start mb-4 sm:mb-6"
          >
            <span className={`font-['Nunito',sans-serif] text-xs font-bold tracking-normal uppercase select-none ${
              isLight ? 'text-[#15803D]' : 'text-[#22C55E]'
            }`}>
              {t('ref.hero.eyebrow')}
            </span>
          </motion.div>

          {/* Monumental Display Headline — Limpio, nítido y de alto impacto (sin efecto 3D) */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className={`font-['Nunito',sans-serif] font-[900] text-4xl sm:text-5xl md:text-6xl lg:text-[62px] xl:text-[68px] leading-[0.98] tracking-normal mb-6 sm:mb-8 uppercase select-none ${
              isLight ? 'text-[#0F172A]' : 'text-white'
            }`}
          >
            {/* First Line: PRECISIÓN / PRECISION */}
            <span className="block">
              {t('ref.hero.title1')}
            </span>

            {/* Second Line: QUE DA / GIVES + VALOR / VALUE */}
            <span className="block mt-1 sm:mt-1.5">
              <span>
                {t('ref.hero.title2')}
              </span>
              <span className={isLight ? 'text-[#16A34A]' : 'text-[#22C55E]'}>
                {t('ref.hero.titleGreen')}
              </span>
            </span>
          </motion.h1>

          {/* Clear Editorial Description */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="relative mb-6 sm:mb-9"
          >
            <p className="font-sans text-base sm:text-lg text-[#F4F6F0] max-w-[500px] leading-relaxed font-medium">
              {t('ref.hero.desc')}
            </p>
          </motion.div>

          {/* Action CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-6 mb-8 sm:mb-10 w-full sm:w-auto"
          >
            {/* Primary Capsule Button */}
            <button
              onClick={() => onNavigate && onNavigate('/submit')}
              className="btn-gorilla-pill w-full sm:w-auto px-8 py-4 gap-2.5 group"
            >
              <span className="font-['Nunito',sans-serif] font-bold text-xs tracking-normal uppercase">
                {t('ref.hero.ctaPrimary')}
              </span>
              <span className="ml-1 text-sm font-bold transition-transform duration-300 group-hover:translate-x-1.5">→</span>
            </button>

            {/* Secondary Action: Smooth Scroll to 3D Technology Overview Section */}
            <a
              href="#technology-overview"
              onClick={(e) => {
                e.preventDefault();
                const target = document.getElementById('technology-overview');
                if (target) {
                  target.scrollIntoView({ behavior: 'smooth' });
                } else if (onNavigate) {
                  onNavigate('/technology');
                }
              }}
              className="btn-gorilla-pill-secondary w-full sm:w-auto px-7 py-3.5 gap-2.5 group cursor-pointer"
            >
              <span className="font-['Nunito',sans-serif] text-xs font-bold tracking-normal uppercase">
                {t('ref.hero.ctaSecondary')}
              </span>
              <div className="flex items-center justify-center pl-[2px] transition-transform duration-300 group-hover:translate-y-0.5">
                <svg className="w-2.5 h-2.5 text-gray-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7 10l5 5 5-5z" />
                </svg>
              </div>
            </a>
          </motion.div>

          {/* Versión móvil: Letras del escáner del fondo justo debajo del botón 'SEE OUR TECHNOLOGY' */}
          <div 
            className="lg:hidden w-full flex flex-col items-center justify-center pointer-events-none select-none -mt-4 mb-5"
            style={{
              animation: 'heroMidScanResultReveal 18s cubic-bezier(0.4, 0, 0.2, 1) infinite',
            }}
          >
            {/* Línea 1: Detección corta y compacta (CERO CÍRCULOS) */}
            <div className="font-mono text-[7px] sm:text-[7.5px] tracking-[0.2em] uppercase text-center">
              <span className={isLight ? 'text-amber-800/90 font-bold' : 'text-amber-300/90 font-bold'}>
                {language === 'es' 
                  ? '[ ⌖ ESCÁNER: ERROR EN CARTA DETECTADO ]' 
                  : '[ ⌖ SCAN: CARD FLAW DETECTED ]'}
              </span>
            </div>

            {/* Línea 2: Sub-métrica compacta */}
            <div className="mt-0.5 font-mono text-[6.5px] sm:text-[7px] tracking-[0.16em] uppercase text-center opacity-65">
              <span className={isLight ? 'text-slate-600' : 'text-neutral-300'}>
                {language === 'es' 
                  ? 'DEFECTO SUPERFICIE 0.03mm · SUB-GRADE 8.5' 
                  : 'SURFACE DEFECT 0.03mm · SUB-GRADE 8.5'}
              </span>
            </div>
          </div>

          {/* 3 Scientific Rigor Badges */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            className={`w-full max-w-lg grid grid-cols-3 gap-2 sm:gap-3 pt-6 border-t ${
              isLight ? 'border-gray-300/80' : 'border-white/10'
            }`}
          >
            {/* Badge 1: Calibre Óptico */}
            <div className={`flex flex-col items-center sm:items-start p-3 border transition-all duration-200 ${
              isLight 
                ? 'bg-white/90 border-gray-200/80 shadow-xs hover:border-gray-400' 
                : 'bg-white/[0.03] border-white/10 hover:border-white/25 backdrop-blur-xs'
            }`}>
              <div className="flex items-center gap-1 mb-1">
                <span className={`font-mono text-xs sm:text-sm font-bold tracking-tight ${
                  isLight ? 'text-gray-950' : 'text-white'
                }`}>
                  0.01 mm
                </span>
              </div>
              <span className={`font-mono text-[9px] uppercase tracking-wider font-semibold ${
                isLight ? 'text-gray-700' : 'text-gray-300'
              }`}>
                {language === 'es' ? 'CALIBRE ÓPTICO' : 'OPTICAL CALIPER'}
              </span>
              <span className={`text-[8.5px] font-sans hidden sm:block ${
                isLight ? 'text-gray-500' : 'text-gray-400'
              }`}>
                {language === 'es' ? 'Centrado 4 cuadrantes' : '4-quadrant centering'}
              </span>
            </div>

            {/* Badge 2: Barrera UV Óptica */}
            <div className={`flex flex-col items-center sm:items-start p-3 border transition-all duration-200 ${
              isLight 
                ? 'bg-white/90 border-gray-200/80 shadow-xs hover:border-gray-400' 
                : 'bg-white/[0.03] border-white/10 hover:border-white/25 backdrop-blur-xs'
            }`}>
              <div className="flex items-center gap-1 mb-1">
                <span className={`font-mono text-xs sm:text-sm font-bold tracking-tight ${
                  isLight ? 'text-gray-950' : 'text-white'
                }`}>
                  {language === 'es' ? 'BARRERA UV' : 'UV SHIELD'}
                </span>
              </div>
              <span className={`font-mono text-[9px] uppercase tracking-wider font-semibold ${
                isLight ? 'text-gray-700' : 'text-gray-300'
              }`}>
                {language === 'es' ? 'POLÍMERO ÓPTICO' : 'OPTICAL POLYMER'}
              </span>
              <span className={`text-[8.5px] font-sans hidden sm:block ${
                isLight ? 'text-gray-500' : 'text-gray-400'
              }`}>
                {language === 'es' ? 'Protección espectral' : 'Spectral preservation'}
              </span>
            </div>

            {/* Badge 3: Cierre Hermético Sónico */}
            <div className={`flex flex-col items-center sm:items-start p-3 border transition-all duration-200 ${
              isLight 
                ? 'bg-white/90 border-gray-200/80 shadow-xs hover:border-gray-400' 
                : 'bg-white/[0.03] border-white/10 hover:border-white/25 backdrop-blur-xs'
            }`}>
              <div className="flex items-center gap-1 mb-1">
                <span className={`font-mono text-xs sm:text-sm font-bold tracking-tight ${
                  isLight ? 'text-gray-950' : 'text-white'
                }`}>
                  {language === 'es' ? 'HERMÉTICO' : 'HERMETIC'}
                </span>
              </div>
              <span className={`font-mono text-[9px] uppercase tracking-wider font-semibold ${
                isLight ? 'text-gray-700' : 'text-gray-300'
              }`}>
                {language === 'es' ? 'FUSIÓN SÓNICA' : 'SONIC FUSION'}
              </span>
              <span className={`text-[8.5px] font-sans hidden sm:block ${
                isLight ? 'text-gray-500' : 'text-gray-400'
              }`}>
                {language === 'es' ? 'Cápsula sin adhesivos' : 'Adhesive-free enclosure'}
              </span>
            </div>
          </motion.div>

        </div>

        {/* Right Column: 3D SLAB INSPECTOR HERO */}
        <div className="lg:col-span-6 xl:col-span-6 flex flex-col items-center justify-center relative">
          
          {/* Inspector Controls Ribbon */}
          <div className="w-full max-w-[540px] sm:max-w-[620px] lg:max-w-[700px] xl:max-w-[760px] flex items-center justify-between mb-3 px-2 font-mono text-[10px] text-gray-400">
            <div className="flex items-center gap-2">
              <Crosshair className={`w-3.5 h-3.5 animate-spin ${isLight ? 'text-[#15803D]' : 'text-emerald-400'}`} style={{ animationDuration: '8s' }} />
              <span className={`uppercase tracking-normal font-bold ${isLight ? 'text-[#15803D]' : 'text-emerald-400/90'}`}>
                SLAB INSPECTOR 3D
              </span>
            </div>

            <div className="flex items-center gap-3">
              {!isIntroPlaying && (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      setIntroProgress(0);
                      setActiveHotspot(null);
                      setIsIntroPlaying(true);
                    }}
                    className="hover:text-emerald-400 underline uppercase tracking-wider cursor-pointer transition-colors"
                  >
                    {language === 'es' ? '▶ Repetir Intro' : '▶ Replay Intro'}
                  </button>
                  <span className="text-gray-600">|</span>
                </>
              )}
              <button
                type="button"
                onClick={() => setShowHotspots(!showHotspots)}
                className="hover:text-white underline uppercase tracking-wider cursor-pointer transition-colors"
              >
                {showHotspots ? (language === 'es' ? 'Ocultar Puntos' : 'Hide Hotspots') : (language === 'es' ? 'Mostrar Puntos' : 'Show Hotspots')}
              </button>
            </div>
          </div>

          {/* 3D Slab Interactive Viewport */}
          <div
            ref={slabRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={() => {
              if (isIntroPlaying) setIsIntroPlaying(false);
            }}
            style={{ perspective: 1200 }}
            className="relative w-full max-w-[540px] sm:max-w-[620px] lg:max-w-[700px] xl:max-w-[760px] aspect-[1.48/1] flex items-center justify-center cursor-crosshair bg-transparent select-none"
          >
            {/* Ambient Back Atmosphere - Zero square footprint */}
            <div className={`absolute inset-8 rounded-full pointer-events-none transition-opacity duration-700 ${
              isLight ? 'opacity-0' : 'bg-[#16A34A]/10 blur-3xl opacity-40'
            }`} />

            {/* 3D Tilting Slab Wrapper - Pure transparent floating stage */}
            <div
              style={{
                transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${isIntroPlaying ? 1.025 : 1})`,
                transition: isIntroPlaying ? 'transform 0.2s ease-out' : 'transform 0.12s ease-out',
                transformStyle: 'preserve-3d'
              }}
              className="relative w-full h-full flex items-center justify-center bg-transparent pointer-events-auto"
            >
              {/* Slab Artwork Image - Floating with soft natural studio shadow, zero square box */}
              <img 
                src={heroImageSrc}
                alt="Gorilla Grading Certified Slab"
                className={`w-full h-full object-contain pointer-events-none transition-all duration-300 ${
                  isLight 
                    ? 'filter drop-shadow-[0_18px_28px_rgba(0,0,0,0.10)]' 
                    : 'filter drop-shadow-[0_25px_45px_rgba(0,0,0,0.65)]'
                }`}
              />

              {/* Dynamic Laser Metrology Scanning Line (during 10s intro) */}
              {isIntroPlaying && (
                <div
                  className="absolute top-[6%] bottom-[6%] w-[1.5px] pointer-events-none z-20"
                  style={{
                    left: `${14 + (introProgress / 100) * 72}%`,
                    background: 'linear-gradient(to bottom, transparent, rgba(72,199,101,0.85) 20%, #A7F3D0 50%, rgba(72,199,101,0.85) 80%, transparent)',
                    boxShadow: '0 0 12px rgba(72,199,101,0.9), 0 0 24px rgba(72,199,101,0.45)',
                    opacity: Math.sin((introProgress / 100) * Math.PI)
                  }}
                />
              )}

              {/* Prismatic Holographic Caustic Sheen Sweep (during 10s intro) */}
              {isIntroPlaying && (
                <div
                  className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl z-14"
                  style={{
                    opacity: Math.sin((introProgress / 100) * Math.PI) * 0.75,
                    mixBlendMode: 'screen'
                  }}
                >
                  <div
                    className="w-[180%] h-full"
                    style={{
                      background: 'linear-gradient(112deg, transparent 36%, rgba(255,255,255,0.18) 48%, rgba(134,239,172,0.24) 52%, rgba(251,191,36,0.16) 56%, transparent 68%)',
                      transform: `translateX(${-65 + (introProgress / 100) * 105}%)`,
                      transition: 'transform 0.05s linear'
                    }}
                  />
                </div>
              )}

              {/* Specular Light Flare Reflection Gliding Across Slabs */}
              <div 
                className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl z-15"
                style={{
                  background: `radial-gradient(ellipse 380px 380px at ${glarePosition.x}% ${glarePosition.y}%, rgba(255,255,255,0.15) 0%, rgba(72,199,101,0.07) 35%, transparent 70%)`,
                  mixBlendMode: 'screen',
                  transition: isIntroPlaying ? 'background 0.06s ease-out' : 'none'
                }}
              />

              {/* Interactive Inspection Hotspots */}
              {showHotspots && !isIntroPlaying && hotspots.map((spot) => {
                const isActive = activeHotspot?.id === spot.id;

                return (
                  <div
                    key={spot.id}
                    style={{
                      left: `${spot.x}%`,
                      top: `${spot.y}%`,
                      transform: 'translate(-50%, -50%) translateZ(40px)'
                    }}
                    className="absolute z-30"
                    onMouseEnter={() => setActiveHotspot(spot)}
                    onClick={() => setActiveHotspot(isActive ? null : spot)}
                  >
                    {/* Precision Metrology Reticle Node - Optical Glass Without Black Box */}
                    <div className="relative cursor-pointer group/node">
                      <div className={`w-6 h-6 flex items-center justify-center rounded-full border transition-all duration-200 ${
                        isActive 
                          ? 'border-amber-400 bg-amber-400/30 shadow-[0_0_15px_rgba(251,191,36,0.7)] scale-110' 
                          : (isLight 
                              ? 'border-[#16A34A] bg-white/70 backdrop-blur-md shadow-sm group-hover/node:border-black group-hover/node:scale-115' 
                              : 'border-[#48C765] bg-black/40 backdrop-blur-md group-hover/node:border-white group-hover/node:scale-115')
                      }`}>
                        <span className={`font-mono text-[11px] font-extrabold leading-none ${
                          isActive 
                            ? 'text-amber-500' 
                            : (isLight ? 'text-[#16A34A]' : 'text-[#48C765]')
                        }`}>
                          +
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Active Hotspot HUD Dossier Tooltip */}
              <AnimatePresence>
                {activeHotspot && (
                  <motion.div
                    key={activeHotspot.id}
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    style={{
                      left: activeHotspot.x > 65 ? 'auto' : activeHotspot.x < 35 ? '10px' : '50%',
                      right: activeHotspot.x > 65 ? '10px' : 'auto',
                      top: activeHotspot.y > 50 ? 'auto' : `${Math.min(activeHotspot.y + 6, 50)}%`,
                      bottom: activeHotspot.y > 50 ? `${Math.max(100 - activeHotspot.y + 6, 8)}%` : 'auto',
                      transform: activeHotspot.x >= 35 && activeHotspot.x <= 65 
                        ? 'translate(-50%, 0) translateZ(50px)' 
                        : 'translateZ(50px)'
                    }}
                    className={`absolute z-40 w-[240px] sm:w-64 max-w-[calc(100%-20px)] p-3 sm:p-3.5 border backdrop-blur-xl text-left font-mono pointer-events-auto shadow-2xl ${
                      isLight 
                        ? 'border-gray-300 bg-white/95 text-gray-900 shadow-xl' 
                        : 'border-[#48C765]/60 bg-[#121613]/95 text-white shadow-[0_15px_35px_rgba(0,0,0,0.9)]'
                    }`}
                  >
                    <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-current/10">
                      <span className={`text-[9px] uppercase tracking-normal font-bold ${
                        isLight ? 'text-[#16A34A]' : 'text-[#48C765]'
                      }`}>
                        {activeHotspot.category}
                      </span>
                      <button
                        onClick={(e) => { e.stopPropagation(); setActiveHotspot(null); }}
                        className={`text-xs px-1 ${isLight ? 'text-gray-400 hover:text-black' : 'text-gray-400 hover:text-white'}`}
                      >
                        ✕
                      </button>
                    </div>

                    <div className={`font-['Nunito',sans-serif] text-sm uppercase font-[900] tracking-normal mb-0.5 ${
                      isLight ? 'text-gray-950' : 'text-white'
                    }`}>
                      {activeHotspot.title}
                    </div>

                    <div className={`text-[11px] font-bold mb-1.5 ${
                      isLight ? 'text-amber-600' : 'text-amber-300'
                    }`}>
                      {activeHotspot.metric}
                    </div>

                    <p className={`font-sans text-[11px] leading-relaxed ${
                      isLight ? 'text-gray-600' : 'text-gray-300'
                    }`}>
                      {activeHotspot.desc}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>

          <div className={`mt-3 font-mono text-[10px] text-center ${
            isLight ? 'text-gray-500' : 'text-gray-400'
          }`}>
            {language === 'es' ? 'Toca o mueve el cursor sobre el slab para inspeccionar reflejos y puntos forenses' : 'Tap or move cursor over the slab to inspect dynamic glare & forensic hotspots'}
          </div>

        </div>

      </div>

    </section>
  );
};
