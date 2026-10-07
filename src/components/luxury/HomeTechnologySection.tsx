import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';

interface HomeTechnologySectionProps {
  onNavigate: (path: string) => void;
  onOpenTechModal?: () => void;
}

export const HomeTechnologySection: React.FC<HomeTechnologySectionProps> = ({ 
  onNavigate,
  onOpenTechModal 
}) => {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const containerRef = useRef<HTMLDivElement>(null);

  // Smooth Physics-Based 3D Tilt Values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring physics for natural, buttery-smooth reaction and return
  const springConfig = { damping: 25, stiffness: 140, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // 3D Rotations (Degrees)
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [7, -7]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-9, 9]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleExplore = () => {
    if (onOpenTechModal) {
      onOpenTechModal();
    } else {
      onNavigate('/technology');
    }
  };

  return (
    <section 
      id="technology-overview"
      className={`relative w-full overflow-hidden select-none transition-colors duration-500 py-16 sm:py-20 lg:py-24 border-b ${
        isLight 
          ? 'bg-[#ECE7DF] text-[#14170F] border-[#DDD5C7]' 
          : 'bg-[#414241] text-white border-white/10'
      }`}
    >
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Heading, Subtitle & Action Link */}
          <div className="lg:col-span-4 flex flex-col justify-center text-left">
            <h2 className={`font-['Oswald'] text-4xl sm:text-5xl lg:text-[46px] xl:text-[52px] font-bold uppercase tracking-[-0.01em] leading-[1.05] title-3d ${
              isLight ? 'text-[#14170F]' : 'text-white'
            }`}>
              {language === 'es' ? (
                <>
                  TECNOLOGÍA QUE<br />
                  REVELA<br />
                  LA HISTORIA REAL
                </>
              ) : (
                <>
                  TECHNOLOGY THAT<br />
                  REVEALS<br />
                  THE REAL STORY
                </>
              )}
            </h2>

            <p className={`mt-5 sm:mt-6 text-sm sm:text-base font-sans font-normal leading-relaxed max-w-sm ${
              isLight ? 'text-[#3E453B]' : 'text-[#D1D5DB]'
            }`}>
              {language === 'es'
                ? 'Imágenes de alta resolución y análisis avanzado donde cada detalle importa.'
                : 'High-resolution imaging and advanced analysis where every detail matters.'}
            </p>

            <div className="mt-8 sm:mt-10">
              <button
                type="button"
                onClick={handleExplore}
                className="inline-flex items-center gap-2.5 group cursor-pointer"
              >
                <span className={`font-mono text-xs sm:text-[13px] font-extrabold uppercase tracking-[0.16em] border-b-2 transition-colors pb-0.5 ${
                  isLight 
                    ? 'text-[#15803D] border-[#15803D] group-hover:text-[#166534] group-hover:border-[#166534]' 
                    : 'text-[#48C765] border-[#48C765] group-hover:text-white group-hover:border-white'
                }`}>
                  {language === 'es' ? 'EXPLORAR EL PROCESO' : 'EXPLORE THE PROCESS'}
                </span>
                <span className={`w-6 h-6 border flex items-center justify-center transition-all duration-200 group-hover:translate-x-1 ${
                  isLight 
                    ? 'border-[#15803D] text-[#15803D] group-hover:bg-[#15803D] group-hover:text-white' 
                    : 'border-[#48C765] text-[#48C765] group-hover:bg-[#48C765] group-hover:text-[#14170F]'
                }`}>
                  <span className="font-bold text-xs leading-none">→</span>
                </span>
              </button>
            </div>
          </div>

          {/* Right Column: Zero-Box Seamless Floating 3D Cards Stage */}
          <div className="lg:col-span-8 flex justify-center items-center">
            <div 
              ref={containerRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onClick={handleExplore}
              className="relative w-full max-w-[920px] cursor-pointer select-none bg-transparent"
              style={{ perspective: 1400 }}
              title={language === 'es' ? 'Haz clic para explorar el protocolo en detalle' : 'Click to explore full protocol'}
            >
              {/* Pure 3D Floating Stage - Zero rectangular boundaries, zero box footprint */}
              <motion.div
                style={{
                  rotateX,
                  rotateY,
                  transformStyle: 'preserve-3d',
                }}
                whileHover={{ scale: 1.015 }}
                transition={{ scale: { duration: 0.25, ease: 'easeOut' } }}
                className="relative w-full h-auto flex items-center justify-center bg-transparent pointer-events-auto"
              >
                {/* Seamless 4-Card Sequence Render - Perfectly matching section background */}
                <img 
                  src={isLight ? '/images/tecnologia_seamless.png' : '/images/Dark/tecnologia_seamless.png'} 
                  alt={language === 'es' ? 'Secuencia tecnológica Gorilla Grading: Escaneo, Análisis, Medición y Graduación' : 'Gorilla Grading Technology Sequence: Scan, Analyze, Measure, Grade'}
                  className="w-full h-auto object-contain pointer-events-none select-none bg-transparent"
                  loading="eager"
                />
              </motion.div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
