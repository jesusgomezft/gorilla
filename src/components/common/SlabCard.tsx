import React, { useState, useRef } from 'react';
import { GradedCard } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { ShieldCheck, QrCode, Sparkles, RefreshCw, Eye, Award } from 'lucide-react';

interface SlabCardProps {
  card: GradedCard;
  interactive?: boolean;
  onInspect?: () => void;
  size?: 'sm' | 'md' | 'lg';
}

export const SlabCard: React.FC<SlabCardProps> = ({
  card,
  interactive = true,
  onInspect,
  size = 'md'
}) => {
  const { t } = useLanguage();
  const [isFlipped, setIsFlipped] = useState(false);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Parallax tilt angles
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rX = ((y - centerY) / centerY) * -14;
    const rY = ((x - centerX) / centerX) * 14;

    setRotateX(rX);
    setRotateY(rY);
    setGlarePosition({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100
    });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlarePosition({ x: 50, y: 50 });
  };

  const scaleClasses = {
    sm: 'w-64 max-w-full',
    md: 'w-80 sm:w-[370px] max-w-full',
    lg: 'w-96 sm:w-[420px] max-w-full'
  };

  const isPristine = card.grade === 10;
  const isGold = card.grade >= 9.5;

  return (
    <div className={`relative flex flex-col items-center select-none slab-perspective ${scaleClasses[size]}`}>
      
      {/* 3D Realistic Acrylic Slab Container */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        }}
        className="slab-container relative w-full rounded-[26px] p-3.5 sm:p-4 bg-gradient-to-b from-white/[0.22] via-white/[0.06] to-white/[0.12] backdrop-blur-2xl border border-white/40 shadow-slab transition-all duration-150 group"
      >
        {/* Optical Acrylic Bevel Border & Refraction */}
        <div className="absolute inset-0 rounded-[26px] pointer-events-none acrylic-edge-bevel" />
        
        {/* Dynamic Holographic Specular Glare */}
        <div
          className="absolute inset-0 rounded-[26px] pointer-events-none opacity-40 group-hover:opacity-85 transition-opacity duration-300 hologram-iridescent"
          style={{
            backgroundPosition: `${glarePosition.x}% ${glarePosition.y}%`,
            maskImage: 'radial-gradient(circle at center, black 60%, transparent 100%)'
          }}
        />

        {/* TOP SLAB METALLIC / HOLOGRAPHIC HEADER */}
        <div className={`relative mb-3.5 rounded-none p-3 sm:p-3.5 border shadow-xl overflow-hidden transition-colors ${
          isPristine
            ? 'bg-gradient-to-r from-[#062419] via-[#09151F] to-[#062419] border-[#00DF81]/60 text-white'
            : isGold
            ? 'bg-gradient-to-r from-[#141210] via-[#1F1B16] to-[#141210] border-amber-500/50 text-white'
            : 'bg-[#0B1017] border-white/20 text-white'
        }`}>
          
          {/* Metallic Micro-texture background */}
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:8px_8px] pointer-events-none" />

          <div className="flex items-start justify-between gap-3 relative z-10">
            {/* Card Information */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="px-2 py-0.5 rounded bg-[#00DF81]/20 text-[#00DF81] font-mono text-[9px] font-bold border border-[#00DF81]/40 tracking-wider">
                  GORILLA SONIC SLAB
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  #{card.certNumber}
                </span>
              </div>
              <h3 className="font-display font-extrabold text-xs sm:text-sm leading-snug truncate text-white tracking-tight">
                {card.name}
              </h3>
              <p className="text-[11px] text-slate-300 truncate font-sans">
                {card.year} • {card.set} • #{card.cardNumber}
              </p>
              <p className="text-[10px] text-slate-400 font-mono">
                {card.game} | {card.language} | {card.rarity}
              </p>
            </div>

            {/* Big Grade Box */}
            <div className="shrink-0 flex flex-col items-center justify-center px-3.5 py-1.5 rounded-none bg-[#07090C]/90 border border-[#00DF81]/60 shadow-[inset_0_0_12px_rgba(0,0,0,0.8)]">
              <div className="text-[9px] font-mono uppercase tracking-widest text-[#00DF81] font-bold">
                {card.gradeLabel.split(' ')[0]}
              </div>
              <div className="text-lg sm:text-lg font-display font-black text-white tracking-tighter leading-none my-0.5">
                {card.grade.toFixed(1)}
              </div>
              <div className="text-[8px] font-mono text-slate-400 tracking-wider">
                MAX 10.0
              </div>
            </div>
          </div>

          {/* Subgrades 4-Quadrant Row */}
          <div className="mt-3 pt-2.5 border-t border-white/10 grid grid-cols-4 gap-1 text-center font-mono relative z-10">
            <div className="bg-[#454545]/40 py-1 rounded-none px-1 border border-white/5">
              <div className="text-[8px] text-slate-400 uppercase tracking-wider">{t('verify.subCentering')}</div>
              <div className="text-xs font-bold text-[#00DF81]">{card.subgrades.centering.score.toFixed(1)}</div>
            </div>
            <div className="bg-[#454545]/40 py-1 rounded-none px-1 border border-white/5">
              <div className="text-[8px] text-slate-400 uppercase tracking-wider">{t('verify.subCorners')}</div>
              <div className="text-xs font-bold text-[#00DF81]">{card.subgrades.corners.score.toFixed(1)}</div>
            </div>
            <div className="bg-[#454545]/40 py-1 rounded-none px-1 border border-white/5">
              <div className="text-[8px] text-slate-400 uppercase tracking-wider">{t('verify.subEdges')}</div>
              <div className="text-xs font-bold text-[#00DF81]">{card.subgrades.edges.score.toFixed(1)}</div>
            </div>
            <div className="bg-[#454545]/40 py-1 rounded-none px-1 border border-white/5">
              <div className="text-[8px] text-slate-400 uppercase tracking-wider">{t('verify.subSurface')}</div>
              <div className="text-xs font-bold text-[#00DF81]">{card.subgrades.surface.score.toFixed(1)}</div>
            </div>
          </div>
        </div>

        {/* CARD PROTAGONIST RECESSED CRADLE */}
        <div className="relative rounded-none overflow-hidden bg-[#454545]/90 aspect-[2.5/3.5] border border-white/20 shadow-inner group-hover:border-[#00DF81]/50 transition-colors">
          
          <img
            src={isFlipped ? card.backImage : card.frontImage}
            alt={card.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            loading="lazy"
          />

          {/* Anti-reflective glare texture */}
          <div className="absolute inset-0 pointer-events-none opacity-25 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />

          {/* Interactive Hover Bar */}
          {interactive && (
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity bg-[#07090C]/90 backdrop-blur-md rounded-none p-2 border border-white/20 shadow-2xl">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsFlipped(!isFlipped);
                }}
                className="px-2.5 py-1.5 rounded-none bg-white/10 hover:bg-white/20 text-[11px] text-white flex items-center gap-1.5 font-mono transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>{isFlipped ? 'Anverso' : 'Reverso'}</span>
              </button>

              {onInspect && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onInspect();
                  }}
                  className="px-3 py-1.5 rounded-none bg-[#00DF81] hover:bg-[#10B981] text-[#07090C] text-[11px] font-bold flex items-center gap-1.5 transition-colors shadow-md"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>{t('btn.inspect')}</span>
                </button>
              )}
            </div>
          )}
        </div>

        {/* SLAB BASE: Cryptographic NFC & Barcode */}
        <div className="mt-3 flex items-center justify-between px-1 text-slate-400 text-[9px] font-mono">
          <div className="flex items-center gap-1.5 text-slate-300">
            <span className="w-1.5 h-1.5 rounded-none bg-gorilla-neon animate-pulse" />
            <span>NFC ENCRIPTADO</span>
          </div>
          <div className="flex items-center gap-1">
            <QrCode className="w-3 h-3 text-slate-400" />
            <span>EUROPEAN REGISTRY</span>
          </div>
        </div>

      </div>

      {/* Helper caption underneath */}
      {interactive && (
        <div className="mt-3 text-center text-slate-400 text-[11px] flex items-center gap-2 font-mono">
          <Sparkles className="w-3.5 h-3.5 text-gorilla-neon" />
          <span>Slab 3D Interactivo • Mueve el cursor para examinar refracción y brillo</span>
        </div>
      )}
    </div>
  );
};
