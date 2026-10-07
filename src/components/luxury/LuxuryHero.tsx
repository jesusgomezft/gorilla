import React, { useState, useRef } from 'react';
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

  const heroImageSrc = theme === 'dark' 
    ? '/images/Dark/alakazam_hero.jpg.png' 
    : '/images/alakazam_hero.png';

  // 3D Tilt & Specular Physics
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);
  const [showHotspots, setShowHotspots] = useState(true);
  const slabRef = useRef<HTMLDivElement>(null);

  const hotspots: Hotspot[] = [
    {
      id: 'centering',
      x: 34,
      y: 48,
      category: language === 'es' ? 'CENTRADO' : 'CENTERING',
      title: language === 'es' ? 'Centrado Óptico' : 'Optical Centering',
      metric: language === 'es' ? 'Simetría Perimetral' : 'Perimeter Symmetry',
      desc: language === 'es' 
        ? 'Medición dimensional que evalúa la simetría entre el corte exterior y el marco artístico.' 
        : 'Dimensional measurement evaluating symmetry between outer boundary and inner artwork.'
    },
    {
      id: 'corner',
      x: 37,
      y: 20,
      category: language === 'es' ? 'ESQUINAS' : 'CORNERS',
      title: language === 'es' ? 'Inspección de Esquinas' : 'Corner Inspection',
      metric: language === 'es' ? 'Magnificación Óptica' : 'Optical Magnification',
      desc: language === 'es' 
        ? 'Inspección de vértices para verificar ausencia de desgaste, rebabas o blanqueamiento.' 
        : 'Inspection of vertices to verify absence of wear, burrs, or fiber whitening.'
    },
    {
      id: 'sonic',
      x: 78,
      y: 75,
      category: language === 'es' ? 'ENCAPSULADO' : 'SLAB SEAL',
      title: language === 'es' ? 'Sellado Ultrasónico' : 'Ultrasonic Seal',
      metric: language === 'es' ? 'Sellado Hermético' : 'Hermetic Seal',
      desc: language === 'es' 
        ? 'Encapsulado estanco sin adhesivos químicos, aislando la pieza contra el polvo y la humedad.' 
        : 'Hermetic encapsulation without chemical glues, isolating the card from dust and humidity.'
    },
    {
      id: 'uv',
      x: 62,
      y: 35,
      category: language === 'es' ? 'PROTECCIÓN UV' : 'UV PROTECTION',
      title: language === 'es' ? 'Barrera Ultravioleta' : 'Ultraviolet Barrier',
      metric: language === 'es' ? 'Polímero Óptico' : 'Optical Polymer',
      desc: language === 'es' 
        ? 'Acrílico de alta transparencia que previene la degradación de colores y brillo por luz.' 
        : 'High-transparency acrylic preventing color and foil degradation from ambient light.'
    }
  ];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
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
    setRotateX(0);
    setRotateY(0);
    setGlarePosition({ x: 50, y: 50 });
  };

  return (
    <section 
      id="hero"
      className="relative w-full flex items-center overflow-hidden bg-transparent text-white pt-10 sm:pt-14 pb-12 sm:pb-16 select-none"
    >
      
      {/* Background Architectural Lights - Gentle luxury depth without muddy green wash */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="hidden lg:block absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-[#48C765]/15 blur-[150px] rounded-full" />
        <div className={`absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t ${
          isLight 
            ? 'from-[#FAF9F6] via-[#FAF9F6]/80 to-transparent' 
            : 'from-[#060806] via-[#060806]/80 to-transparent'
        } z-10`} />
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
            <span className={`font-mono text-[11px] sm:text-xs font-bold tracking-[0.25em] uppercase select-none ${
              isLight ? 'text-[#15803D]' : 'text-[#22C55E]'
            }`}>
              {t('ref.hero.eyebrow')}
            </span>
          </motion.div>

          {/* Monumental 3D Sculpted Display Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="font-['Montserrat'] font-[900] text-4xl sm:text-5xl md:text-6xl lg:text-[62px] xl:text-[68px] leading-[0.98] tracking-[-0.03em] mb-6 sm:mb-8 uppercase select-none"
          >
            {/* First Line: PRECISIÓN / PRECISION */}
            <span 
              className="block"
              style={{
                color: isLight ? '#111827' : '#FFFFFF',
                textShadow: isLight
                  ? '0 1px 0 #E2E8F0, 0 2px 0 #CBD5E1'
                  : '0 1px 0 #E2E8F0, 0 2px 0 #94A3B8, 0 3px 0 #475569'
              }}
            >
              {t('ref.hero.title1')}
            </span>

            {/* Second Line: QUE DA / GIVES + VALOR / VALUE */}
            <span className="block mt-1 sm:mt-1.5">
              <span 
                style={{
                  color: isLight ? '#111827' : '#FFFFFF',
                  textShadow: isLight
                    ? '0 1px 0 #E2E8F0, 0 2px 0 #CBD5E1'
                    : '0 1px 0 #E2E8F0, 0 2px 0 #94A3B8, 0 3px 0 #475569'
                }}
              >
                {t('ref.hero.title2')}
              </span>
              <span 
                style={{
                  color: isLight ? '#16A34A' : '#48C765',
                  textShadow: isLight
                    ? '0 1px 0 #86EFAC, 0 2px 0 #15803D'
                    : '0 1px 0 #86EFAC, 0 2px 0 #22C55E, 0 3px 0 #15803D'
                }}
              >
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
              <span className="font-['Montserrat'] font-extrabold text-xs tracking-[0.12em] uppercase">
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
              <span className="font-['Montserrat'] text-xs font-bold tracking-[0.08em] uppercase">
                {t('ref.hero.ctaSecondary')}
              </span>
              <div className="flex items-center justify-center pl-[2px] transition-transform duration-300 group-hover:translate-y-0.5">
                <svg className="w-2.5 h-2.5 text-gray-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7 10l5 5 5-5z" />
                </svg>
              </div>
            </a>
          </motion.div>

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
        <div className="lg:col-span-6 xl:col-span-6 flex flex-col items-center justify-center relative lg:-translate-x-6 xl:-translate-x-10">
          
          {/* Inspector Controls Ribbon */}
          <div className="w-full max-w-[460px] flex items-center justify-between mb-3 px-2 font-mono text-[10px] text-gray-400">
            <div className="flex items-center gap-2">
              <Crosshair className={`w-3.5 h-3.5 animate-spin ${isLight ? 'text-[#15803D]' : 'text-emerald-400'}`} style={{ animationDuration: '8s' }} />
              <span className={`uppercase tracking-widest font-bold ${isLight ? 'text-[#15803D]' : 'text-emerald-400/90'}`}>SLAB INSPECTOR 3D</span>
            </div>

            <button
              type="button"
              onClick={() => setShowHotspots(!showHotspots)}
              className="hover:text-white underline uppercase tracking-wider cursor-pointer"
            >
              {showHotspots ? (language === 'es' ? 'Ocultar Puntos' : 'Hide Hotspots') : (language === 'es' ? 'Mostrar Puntos' : 'Show Hotspots')}
            </button>
          </div>

          {/* 3D Slab Interactive Viewport */}
          <div
            ref={slabRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ perspective: 1200 }}
            className="relative w-full max-w-[420px] sm:max-w-[480px] aspect-[1/1.3] flex items-center justify-center cursor-crosshair bg-transparent select-none"
          >
            {/* Ambient Back Atmosphere - Zero square footprint */}
            <div className={`absolute inset-8 rounded-full pointer-events-none transition-opacity duration-700 ${
              isLight ? 'opacity-0' : 'bg-[#16A34A]/10 blur-3xl opacity-40'
            }`} />

            {/* 3D Tilting Slab Wrapper - Pure transparent floating stage */}
            <div
              style={{
                transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
                transition: 'transform 0.12s ease-out',
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

              {/* Interactive Inspection Hotspots */}
              {showHotspots && hotspots.map((spot) => {
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
                      left: `${Math.min(Math.max(activeHotspot.x, 20), 75)}%`,
                      top: `${activeHotspot.y > 60 ? activeHotspot.y - 25 : activeHotspot.y + 12}%`,
                      transform: 'translate(-50%, 0) translateZ(60px)'
                    }}
                    className={`absolute z-40 w-64 p-3.5 border backdrop-blur-xl text-left font-mono pointer-events-auto shadow-2xl ${
                      isLight 
                        ? 'border-gray-300 bg-white/95 text-gray-900 shadow-xl' 
                        : 'border-[#48C765]/60 bg-[#121613]/95 text-white shadow-[0_15px_35px_rgba(0,0,0,0.9)]'
                    }`}
                  >
                    <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-current/10">
                      <span className={`text-[9px] uppercase tracking-widest font-bold ${
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

                    <div className={`font-['Oswald'] text-sm uppercase font-bold mb-0.5 ${
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
            {language === 'es' ? 'Mueve el cursor sobre el slab para inspeccionar reflejos y puntos forenses' : 'Move cursor over the slab to inspect dynamic glare & forensic hotspots'}
          </div>

        </div>

      </div>

    </section>
  );
};
