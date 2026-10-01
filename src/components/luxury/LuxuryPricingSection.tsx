import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { Box, Cpu, Scan, BarChart, Link, Zap, Headset, ListOrdered, ShieldCheck, Briefcase, Crown } from 'lucide-react';

const BlueprintScanner = ({ color, isLight }: { color: string; isLight?: boolean }) => {
  const lineStroke = isLight ? color : 'rgba(255, 255, 255, 0.8)';
  const subStroke = isLight ? `${color}99` : 'rgba(255, 255, 255, 0.6)';
  const dimStroke = isLight ? `${color}40` : 'rgba(255, 255, 255, 0.3)';

  return (
    <svg viewBox="0 0 100 120" className="w-full h-full overflow-visible" fill="none" stroke="currentColor" strokeWidth="1.5">
      <g>
        <animateTransform attributeName="transform" type="translate" values="0,0; 0,8; 0,0" dur="4s" repeatCount="indefinite" />
        <rect x="25" y="10" width="50" height="8" rx="2" stroke={lineStroke} />
        <line x1="50" y1="2" x2="50" y2="10" stroke={lineStroke} />
        <text x="50" y="8" fill={color} fontSize="5" fontFamily="monospace" textAnchor="middle" stroke="none">365 nm</text>
        <polygon points="30,18 70,18 85,60 15,60" fill={`${color}15`} stroke="none">
          <animate attributeName="points" values="30,18 70,18 85,60 15,60; 30,18 70,18 75,50 25,50; 30,18 70,18 85,60 15,60" dur="2s" repeatCount="indefinite" />
        </polygon>
        <line x1="30" y1="18" x2="15" y2="60" stroke={color} strokeWidth="0.5" opacity="0.4">
          <animate attributeName="x2" values="15; 25; 15" dur="2s" repeatCount="indefinite" />
          <animate attributeName="y2" values="60; 50; 60" dur="2s" repeatCount="indefinite" />
        </line>
        <line x1="70" y1="18" x2="85" y2="60" stroke={color} strokeWidth="0.5" opacity="0.4">
          <animate attributeName="x2" values="85; 75; 85" dur="2s" repeatCount="indefinite" />
          <animate attributeName="y2" values="60; 50; 60" dur="2s" repeatCount="indefinite" />
        </line>
      </g>
      <rect x="30" y="30" width="40" height="55" rx="3" stroke={lineStroke} />
      <rect x="35" y="35" width="30" height="7" stroke={subStroke} />
      <rect x="35" y="45" width="30" height="25" stroke={subStroke} />
      <circle cx="50" cy="57.5" r="7" stroke={subStroke} />
      <line x1="35" y1="45" x2="65" y2="70" stroke={dimStroke} strokeWidth="0.5" />
      <line x1="65" y1="45" x2="35" y2="70" stroke={dimStroke} strokeWidth="0.5" />
      <rect x="35" y="73" width="30" height="4" stroke={subStroke} />
      <line x1="35" y1="80" x2="55" y2="80" stroke={subStroke} />
      <line x1="35" y1="83" x2="65" y2="83" stroke={subStroke} />
    </svg>
  );
};

const BlueprintCaliper = ({ color, isLight }: { color: string; isLight?: boolean }) => {
  const lineStroke = isLight ? color : 'rgba(255, 255, 255, 0.8)';
  const subStroke = isLight ? `${color}80` : 'rgba(255, 255, 255, 0.5)';

  return (
    <svg viewBox="0 0 120 100" className="w-full h-full overflow-visible" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="30" y="35" width="60" height="20" rx="1" stroke={lineStroke} />
      <rect x="20" y="60" width="80" height="8" rx="1" stroke={lineStroke} />
      <path d="M20 60 V30 H25 V60" stroke={lineStroke} />
      <line x1="30" y1="60" x2="30" y2="64" stroke={subStroke} />
      <line x1="40" y1="60" x2="40" y2="64" stroke={subStroke} />
      <line x1="50" y1="60" x2="50" y2="65" stroke={lineStroke} />
      <line x1="60" y1="60" x2="60" y2="64" stroke={subStroke} />
      <line x1="70" y1="60" x2="70" y2="64" stroke={subStroke} />
      <line x1="80" y1="60" x2="80" y2="65" stroke={lineStroke} />
      <g>
        <animateTransform attributeName="transform" type="translate" values="4,0; -4,0; 4,0" dur="5s" repeatCount="indefinite" />
        <path d="M90 68 V30 H95 V68 H102 V75 H90 Z" stroke={lineStroke} />
        <text x="50" y="25" fill={color} fontSize="6" fontFamily="monospace" textAnchor="middle" stroke="none">7.82 mm</text>
        <line x1="50" y1="27" x2="50" y2="35" stroke={color} strokeWidth="0.5" />
      </g>
    </svg>
  );
};

const BlueprintMagnifier = ({ color, isLight }: { color: string; isLight?: boolean }) => {
  const lineStroke = isLight ? color : 'rgba(255, 255, 255, 0.9)';
  const subStroke = isLight ? `${color}80` : 'rgba(255, 255, 255, 0.5)';
  const dimStroke = isLight ? `${color}40` : 'rgba(255, 255, 255, 0.3)';

  return (
    <svg viewBox="0 0 100 120" className="w-full h-full overflow-visible" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M20 60 V20 H60" stroke={subStroke} />
      <path d="M25 60 V25 H60" stroke={dimStroke} />
      <g>
        <animateTransform attributeName="transform" type="translate" values="0,0; -6,-6; 0,0" dur="6s" repeatCount="indefinite" />
        <circle cx="50" cy="50" r="25" stroke={lineStroke} />
        <circle cx="50" cy="50" r="23" stroke={dimStroke} />
        <line x1="68" y1="68" x2="85" y2="85" strokeWidth="3" strokeLinecap="round" stroke={lineStroke} />
        <line x1="68" y1="68" x2="85" y2="85" strokeWidth="1" strokeLinecap="round" stroke={isLight ? '#FFFFFF' : '#454545'} />
        <circle cx="50" cy="50" r="1.5" fill={color} stroke="none">
          <animate attributeName="opacity" values="1; 0.2; 1" dur="2s" repeatCount="indefinite" />
        </circle>
        <path d="M50 45 A 5 5 0 0 1 55 50" stroke={color} strokeWidth="1" />
        <line x1="35" y1="50" x2="55" y2="50" stroke={color} strokeWidth="1" />
        <line x1="50" y1="35" x2="50" y2="60" stroke={color} strokeWidth="1" />
        <text x="60" y="55" fill={color} fontSize="6" fontFamily="monospace" stroke="none">89.94°</text>
      </g>
    </svg>
  );
};

const BlueprintBriefcase = ({ color, isLight }: { color: string; isLight?: boolean }) => {
  const lineStroke = isLight ? color : 'rgba(255, 255, 255, 0.8)';
  const subStroke = isLight ? `${color}80` : 'rgba(255, 255, 255, 0.4)';
  const dimStroke = isLight ? `${color}40` : 'rgba(255, 255, 255, 0.2)';

  return (
    <svg viewBox="0 0 120 100" className="w-full h-full overflow-visible" fill="none" stroke="currentColor" strokeWidth="1.5">
      <line x1="15" y1="30" x2="105" y2="30" stroke={color} strokeWidth="1" opacity="0.6">
        <animate attributeName="y1" values="30; 90; 30" dur="4s" repeatCount="indefinite" />
        <animate attributeName="y2" values="30; 90; 30" dur="4s" repeatCount="indefinite" />
      </line>
      <g>
        <animateTransform attributeName="transform" type="translate" values="0,0; 0,-1.5; 0,0" dur="3s" repeatCount="indefinite" />
        <path d="M45 35 V23 H75 V35" stroke={lineStroke} />
        <rect x="52" y="25" width="16" height="4" stroke={subStroke} />
      </g>
      <rect x="20" y="35" width="80" height="55" rx="4" stroke={lineStroke} />
      <rect x="26" y="41" width="68" height="43" rx="2" stroke={dimStroke} />
      <rect x="35" y="31" width="10" height="8" rx="1" stroke={lineStroke} />
      <rect x="75" y="31" width="10" height="8" rx="1" stroke={lineStroke} />
      <circle cx="40" cy="35" r="1.5" stroke={subStroke} />
      <circle cx="80" cy="35" r="1.5" stroke={subStroke} />
      <path d="M26 62.5 H94" stroke={dimStroke} strokeWidth="1" />
      <g stroke={color}>
        <path d="M60 47 L70 51 V59 C70 65 60 71 60 71 C60 71 50 65 50 59 V51 Z" strokeWidth="1.5" />
        <circle cx="60" cy="57" r="3" fill={color} stroke="none">
          <animate attributeName="opacity" values="0.3; 1; 0.3" dur="2s" repeatCount="indefinite" />
        </circle>
      </g>
      <text x="60" y="79" fill={color} fontSize="5" fontFamily="monospace" textAnchor="middle" stroke="none" opacity="0.8">LEVEL-5</text>
    </svg>
  );
};

interface LuxuryPricingSectionProps {
  onNavigate?: (path: string) => void;
  isHome?: boolean;
}

export const LuxuryPricingSection: React.FC<LuxuryPricingSectionProps> = ({ onNavigate, isHome = false }) => {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const [selectedTier, setSelectedTier] = useState<string>('standard');

  // ==========================================
  // 1. DARK MODE DATA (Exact Original Design)
  // ==========================================
  const darkTiers = [
    {
      id: 'regular',
      name: language === 'es' ? 'COLECCIONISTA REGULAR' : 'COLLECTOR REGULAR',
      tagline: language === 'es' 
        ? 'Volumen y sets modernos. Ideal para colecciones personales.' 
        : 'Volume & modern sets. Ideal for personal collections.',
      price: '15',
      turnaround: language === 'es' ? '20 días hábiles' : '20 business days',
      color: '#8CA5B8',
      glowColor: 'rgba(140, 165, 184, 0.12)',
      borderColor: 'rgba(255, 255, 255, 0.1)',
      code: 'RCDM.00',
      badge: null,
      watermark: 'REGULAR',
      Blueprint: BlueprintScanner,
      btnClass: 'border border-white/20 text-white/70 hover:border-white/40 hover:text-white bg-transparent',
      features: [
        { text: language === 'es' ? 'Carcasa Premium' : 'Premium Slab', icon: <Box className="w-3.5 h-3.5 text-white/50 shrink-0" /> },
        { text: language === 'es' ? 'Chip NFC' : 'NFC Chip', icon: <Cpu className="w-3.5 h-3.5 text-white/50 shrink-0" /> },
        { text: language === 'es' ? 'Escaneo Básico' : 'Basic Scan', icon: <Scan className="w-3.5 h-3.5 text-white/50 shrink-0" /> }
      ]
    },
    {
      id: 'standard',
      name: language === 'es' ? 'PRECISIÓN ESTÁNDAR' : 'PRECISION STANDARD',
      tagline: language === 'es' 
        ? 'El equilibrio perfecto. Subnotas y registro público en alta definición.' 
        : 'The perfect balance. Subgrades and HD public registry.',
      price: '28',
      turnaround: language === 'es' ? '10 días hábiles' : '10 business days',
      color: '#48C765',
      glowColor: 'rgba(72, 199, 101, 0.35)',
      borderColor: 'rgba(72, 199, 101, 0.4)',
      code: 'RCDM.01',
      badge: language === 'es' ? 'MÁS ELEGIDO' : 'MOST POPULAR',
      watermark: 'STANDARD',
      Blueprint: BlueprintCaliper,
      btnClass: 'border border-[#48C765] text-[#48C765] hover:bg-[#48C765] hover:text-black bg-transparent',
      features: [
        { text: language === 'es' ? 'Subgrados detallados' : 'Detailed Subgrades', icon: <BarChart className="w-3.5 h-3.5 text-[#48C765] shrink-0" /> },
        { text: language === 'es' ? 'Escaneo 4K HD' : '4K HD Scan', icon: <Scan className="w-3.5 h-3.5 text-[#48C765] shrink-0" /> },
        { text: language === 'es' ? 'Registro público en blockchain' : 'Blockchain Public Registry', icon: <Link className="w-3.5 h-3.5 text-[#48C765] shrink-0" /> }
      ]
    },
    {
      id: 'express',
      name: language === 'es' ? 'PRIORIDAD EXPRÉS' : 'PRIORITY EXPRESS',
      tagline: language === 'es' 
        ? 'Procesamiento acelerado en cola preferente para alta demanda.' 
        : 'Accelerated processing in priority queue for high demand.',
      price: '65',
      turnaround: language === 'es' ? '5 días hábiles' : '5 business days',
      color: '#F97316',
      glowColor: 'rgba(249, 115, 22, 0.35)',
      borderColor: 'rgba(249, 115, 22, 0.4)',
      code: 'RCDM.02',
      badge: language === 'es' ? 'PRIORIDAD' : 'PRIORITY',
      watermark: 'EXPRESS',
      Blueprint: BlueprintMagnifier,
      btnClass: 'border border-[#F97316] text-[#F97316] hover:bg-[#F97316] hover:text-white bg-transparent',
      features: [
        { text: language === 'es' ? 'Acelerado' : 'Fast-Track', icon: <Zap className="w-3.5 h-3.5 text-[#F97316] shrink-0" /> },
        { text: language === 'es' ? 'Soporte Directo' : 'Direct Support', icon: <Headset className="w-3.5 h-3.5 text-[#F97316] shrink-0" /> },
        { text: language === 'es' ? 'Fila Preferente' : 'Priority Queue', icon: <ListOrdered className="w-3.5 h-3.5 text-[#F97316] shrink-0" /> }
      ]
    },
    {
      id: 'walkthrough',
      name: language === 'es' ? 'PASE MAESTRO' : 'MASTER WALK-THROUGH',
      tagline: language === 'es' 
        ? 'Tratamiento exclusivo de guante blanco para piezas históricas.' 
        : 'Exclusive white-glove treatment for historic grails.',
      price: '140',
      turnaround: language === 'es' ? '48 horas' : '48 hours',
      color: '#D4AF37',
      glowColor: 'rgba(212, 175, 55, 0.35)',
      borderColor: 'rgba(212, 175, 55, 0.4)',
      code: 'RCDM.MASTER',
      badge: language === 'es' ? 'GUANTE BLANCO' : 'WHITE GLOVE',
      watermark: 'THROUGH',
      Blueprint: BlueprintBriefcase,
      btnClass: 'border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black bg-transparent',
      features: [
        { text: language === 'es' ? 'Doble Auditoría' : 'Dual Audit', icon: <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" /> },
        { text: language === 'es' ? 'Maletín Blindado' : 'Armored Case', icon: <Briefcase className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" /> },
        { text: language === 'es' ? 'Master Grader Asignado' : 'Assigned Master Grader', icon: <Crown className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" /> }
      ]
    }
  ];

  // ==========================================
  // ==========================================
  // 2. LIGHT MODE DATA (Clean Cards with Vivid Corner Glow & Blueprint SVGs)
  // ==========================================
  const lightTiers = [
    {
      id: 'regular',
      name: language === 'es' ? 'COLECCIONISTA REGULAR' : 'COLLECTOR REGULAR',
      tagline: language === 'es' 
        ? 'Volumen y sets modernos. Ideal para colecciones personales.' 
        : 'Volume & modern sets. Ideal for personal collections.',
      price: '15',
      turnaround: language === 'es' ? '20 días hábiles' : '20 business days',
      color: '#8B5CF6',
      cornerGradient: 'radial-gradient(circle at 100% 0%, rgba(139, 92, 246, 0.22) 0%, transparent 60%), #FFFFFF',
      borderColor: 'rgba(139, 92, 246, 0.2)',
      code: 'RCDM.00',
      badge: '#8B5CF6',
      Blueprint: BlueprintScanner,
      features: [
        { text: language === 'es' ? 'Carcasa Premium' : 'Premium Slab', icon: <Box className="w-3.5 h-3.5 text-[#8B5CF6] shrink-0" /> },
        { text: language === 'es' ? 'Chip NFC' : 'NFC Chip', icon: <Cpu className="w-3.5 h-3.5 text-[#8B5CF6] shrink-0" /> },
        { text: language === 'es' ? 'Escaneo Básico' : 'Basic Scan', icon: <Scan className="w-3.5 h-3.5 text-[#8B5CF6] shrink-0" /> }
      ]
    },
    {
      id: 'standard',
      name: language === 'es' ? 'PRECISIÓN ESTÁNDAR' : 'PRECISION STANDARD',
      tagline: language === 'es' 
        ? 'El equilibrio perfecto. Subnotas y registro público en alta definición.' 
        : 'The perfect balance. Subgrades and HD public registry.',
      price: '28',
      turnaround: language === 'es' ? '10 días hábiles' : '10 business days',
      color: '#2D9A46',
      cornerGradient: 'radial-gradient(circle at 100% 0%, rgba(45, 154, 70, 0.22) 0%, transparent 60%), #FFFFFF',
      borderColor: 'rgba(45, 154, 70, 0.2)',
      code: 'RCDM.01',
      badge: language === 'es' ? 'MÁS ELEGIDO' : 'MOST POPULAR',
      Blueprint: BlueprintCaliper,
      features: [
        { text: language === 'es' ? 'Subgrados detallados' : 'Detailed Subgrades', icon: <BarChart className="w-3.5 h-3.5 text-[#2D9A46] shrink-0" /> },
        { text: language === 'es' ? 'Escaneo 4K HD' : '4K HD Scan', icon: <Scan className="w-3.5 h-3.5 text-[#2D9A46] shrink-0" /> },
        { text: language === 'es' ? 'Registro público en blockchain' : 'Blockchain Public Registry', icon: <Link className="w-3.5 h-3.5 text-[#2D9A46] shrink-0" /> }
      ]
    },
    {
      id: 'express',
      name: language === 'es' ? 'PRIORIDAD EXPRÉS' : 'PRIORITY EXPRESS',
      tagline: language === 'es' 
        ? 'Procesamiento acelerado en cola preferente para alta demanda.' 
        : 'Accelerated processing in priority queue for high demand.',
      price: '65',
      turnaround: language === 'es' ? '5 días hábiles' : '5 business days',
      color: '#EA580C',
      cornerGradient: 'radial-gradient(circle at 100% 0%, rgba(249, 115, 22, 0.65) 0%, rgba(249, 115, 22, 0.32) 35%, rgba(249, 115, 22, 0.08) 60%, transparent 75%), #FFFFFF',
      borderColor: 'rgba(249, 115, 22, 0.35)',
      code: 'RCDM.02',
      badge: language === 'es' ? 'PRIORIDAD' : 'PRIORITY',
      Blueprint: BlueprintMagnifier,
      features: [
        { text: language === 'es' ? 'Acelerado' : 'Fast-Track', icon: <Zap className="w-3.5 h-3.5 text-[#EA580C] shrink-0" /> },
        { text: language === 'es' ? 'Soporte Directo' : 'Direct Support', icon: <Headset className="w-3.5 h-3.5 text-[#EA580C] shrink-0" /> },
        { text: language === 'es' ? 'Fila Preferente' : 'Priority Queue', icon: <ListOrdered className="w-3.5 h-3.5 text-[#EA580C] shrink-0" /> }
      ]
    },
    {
      id: 'walkthrough',
      name: language === 'es' ? 'PASE MAESTRO' : 'MASTER WALK-THROUGH',
      tagline: language === 'es' 
        ? 'Tratamiento exclusivo de guante blanco para piezas históricas.' 
        : 'Exclusive white-glove treatment for historic grails.',
      price: '140',
      turnaround: language === 'es' ? '48 horas' : '48 hours',
      color: '#D4AF37',
      cornerGradient: 'radial-gradient(circle at 100% 0%, rgba(212, 175, 55, 0.25) 0%, transparent 60%), #FFFFFF',
      borderColor: 'rgba(212, 175, 55, 0.25)',
      code: 'RCDM.MASTER',
      badge: language === 'es' ? 'GUANTE BLANCO' : 'WHITE GLOVE',
      Blueprint: BlueprintBriefcase,
      features: [
        { text: language === 'es' ? 'Doble Auditoría' : 'Dual Audit', icon: <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" /> },
        { text: language === 'es' ? 'Maletín Blindado' : 'Armored Case', icon: <Briefcase className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" /> },
        { text: language === 'es' ? 'Master Grader Asignado' : 'Assigned Master Grader', icon: <Crown className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" /> }
      ]
    }
  ];

  // ==========================================
  // HOME PAGE RENDER
  // ==========================================
  if (isHome) {
    // ------------------------------------------
    // A) DARK MODE (Compact Original Design)
    // ------------------------------------------
    if (!isLight) {
      return (
        <section 
          id="pricing" 
          className="w-full bg-[#454545] border-b border-white/[0.05] text-white py-12 lg:py-16 px-5 lg:px-8 select-none relative flex flex-col items-center z-20"
        >
          {/* Section Header */}
          <div className="mb-10 sm:mb-12 flex flex-col items-center justify-center text-center px-4">
            <div className="flex items-center justify-center gap-3 sm:gap-4 mb-2.5 opacity-90">
              <div className="h-[1px] w-8 sm:w-14 bg-gradient-to-r from-transparent to-[#48C765]" />
              <span className="font-mono text-[10px] sm:text-[11px] font-bold tracking-[0.28em] text-[#48C765] uppercase">
                {language === 'es' ? 'TARIFAS Y SERVICIOS' : 'TIERS & RATES'}
              </span>
              <div className="h-[1px] w-8 sm:w-14 bg-gradient-to-l from-transparent to-[#48C765]" />
            </div>
            <h2 className="font-['Oswald'] text-3xl sm:text-4xl md:text-5xl font-bold tracking-[0.03em] text-white uppercase">
              {language === 'es' ? 'NUESTROS SERVICIOS' : 'OUR SERVICES'}
            </h2>
            <p className="mt-2.5 text-xs sm:text-sm text-[#A4ACA1] max-w-[500px] leading-relaxed">
              {language === 'es' 
                ? 'Planes de certificación y encapsulado de alta precisión adaptados a cada nivel de colección.' 
                : 'Precision certification and gem-grade encapsulation tailored to every tier of collector.'}
            </p>
          </div>

          {/* 4-Column Grid for Dark Mode */}
          <div className="w-full max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6 relative items-stretch">
            {darkTiers.map((tier) => (
              <div 
                key={tier.id}
                className="relative w-full border overflow-hidden rounded-xl transition-all duration-300 cursor-pointer group/card hover:-translate-y-1.5 flex flex-col justify-between shadow-[0_16px_45px_-12px_rgba(0,0,0,0.7)]"
                style={{
                  background: `radial-gradient(circle at 100% 0%, ${tier.glowColor} 0%, transparent 60%), linear-gradient(160deg, #161A17 0%, #0A0D0B 100%)`,
                  borderColor: tier.borderColor,
                }}
                onClick={() => onNavigate && onNavigate(`/submit?tier=${tier.id}`)}
              >
                {/* Noise Texture Overlay */}
                <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-15 pointer-events-none mix-blend-overlay z-0" />

                {/* Glass Reflection Sheen */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.07] to-transparent translate-x-[-150%] group-hover/card:translate-x-[150%] transition-transform duration-[1200ms] ease-in-out pointer-events-none z-20" />

                {/* Watermark behind button at bottom */}
                <div 
                  className="absolute bottom-1 left-1/2 -translate-x-1/2 font-['Oswald'] font-black text-5xl lg:text-6xl uppercase tracking-tighter select-none pointer-events-none opacity-[0.04] whitespace-nowrap z-0 overflow-hidden w-full text-center"
                  style={{ color: tier.color }}
                >
                  {tier.watermark}
                </div>

                <div className="w-full flex flex-col relative z-10 h-full p-5 sm:p-5.5 justify-between">
                  {/* Info Top */}
                  <div className="flex flex-col">
                    {/* Top Badges */}
                    <div className="flex items-center gap-1.5 mb-2.5 min-h-[22px]">
                      <div 
                        className="px-2 py-0.5 text-[9.5px] font-mono tracking-wider uppercase rounded border font-semibold"
                        style={{ 
                          color: tier.color, 
                          borderColor: `${tier.color}40`,
                          backgroundColor: `${tier.color}15`
                        }}
                      >
                        {tier.code}
                      </div>
                      {tier.badge && (
                        <div className="px-2 py-0.5 text-[9.5px] font-mono font-bold tracking-wider uppercase rounded bg-white text-black shadow-[0_0_12px_rgba(255,255,255,0.7)]">
                          {tier.badge}
                        </div>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="font-['Oswald'] text-xl sm:text-2xl uppercase tracking-wide leading-tight font-bold text-white mb-1.5">
                      {tier.name}
                    </h3>

                    {/* Tagline */}
                    <p className="text-xs font-sans leading-snug text-white/60 mb-2 min-h-[30px]">
                      {tier.tagline}
                    </p>

                    {/* Blueprint SVG Graphic */}
                    <div className="w-full h-16 sm:h-20 flex items-center justify-center my-1 text-white/40 group-hover/card:scale-105 transition-transform duration-500">
                      <tier.Blueprint color={tier.color} isLight={false} />
                    </div>

                    {/* Features with Lucide Icons */}
                    <div className="flex flex-col gap-2 mt-2">
                      {tier.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-2.5">
                          {feat.icon}
                          <span className="font-sans text-xs font-medium tracking-wide text-white/80">
                            {feat.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Price & CTA Bottom */}
                  <div className="mt-5 pt-3.5 border-t border-white/10 flex flex-col items-center relative z-10">
                    <div className="flex flex-col items-center w-full mb-3">
                      <span className="font-mono text-[8.5px] uppercase tracking-[0.2em] text-white/50 mb-0.5">
                        {language === 'es' ? 'PRECIO BASE' : 'BASE PRICE'}
                      </span>
                      <div className="flex items-start mb-0.5">
                        <span className="font-mono text-sm text-white/50 mt-1 mr-1">€</span>
                        <span className="font-['Oswald'] font-bold text-3xl sm:text-4xl leading-none text-white tracking-tight">
                          {tier.price}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <svg className="w-3 h-3 opacity-90" style={{ color: tier.color }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        <span className="font-sans text-[11px] text-white/70">
                          {tier.turnaround}
                        </span>
                      </div>
                    </div>

                    <div className="w-full">
                      <div className={`w-full py-2.5 text-center text-[10.5px] font-bold tracking-[0.18em] uppercase rounded-md transition-all duration-300 ${tier.btnClass}`}>
                        {language === 'es' ? 'ELEGIR SERVICIO' : 'SELECT TIER'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 md:mt-10">
            <button
              onClick={() => onNavigate && onNavigate('/pricing')}
              className="group font-mono text-xs tracking-[0.2em] uppercase text-white/50 hover:text-white transition-colors flex items-center gap-2"
            >
              {language === 'es' ? 'Ver todas las tarifas' : 'View all services'}
              <svg className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
            </button>
          </div>
        </section>
      );
    }

    // ------------------------------------------
    // B) LIGHT MODE (Modern Clean Cards with Corner Glow & Blueprint SVGs)
    // ------------------------------------------
    return (
      <section 
        id="pricing" 
        className="w-full bg-[#F4F1EA] border-b border-black/[0.06] text-[#1A1D1A] py-12 lg:py-16 px-5 lg:px-8 select-none relative flex flex-col items-center z-20 transition-colors duration-500"
      >
        {/* Section Header */}
        <div className="mb-10 sm:mb-12 flex flex-col items-center justify-center text-center px-4">
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-2.5 opacity-90">
            <div className="h-[1px] w-8 sm:w-14 bg-gradient-to-r from-transparent to-[#16A34A]" />
            <span className="font-mono text-[10px] sm:text-[11px] font-bold tracking-[0.28em] text-[#16A34A] uppercase">
              {language === 'es' ? 'TARIFAS Y SERVICIOS' : 'TIERS & RATES'}
            </span>
            <div className="h-[1px] w-8 sm:w-14 bg-gradient-to-l from-transparent to-[#16A34A]" />
          </div>
          <h2 className="font-['Oswald'] text-3xl sm:text-4xl md:text-5xl font-bold tracking-[0.03em] text-[#1A1D1A] uppercase transition-colors duration-500">
            {language === 'es' ? 'NUESTROS SERVICIOS' : 'OUR SERVICES'}
          </h2>
          <p className="mt-2.5 text-xs sm:text-sm text-[#636A61] max-w-[500px] leading-relaxed">
            {language === 'es' 
              ? 'Planes de certificación y encapsulado de alta precisión adaptados a cada nivel de colección.' 
              : 'Precision certification and gem-grade encapsulation tailored to every tier of collector.'}
          </p>
        </div>

        {/* 4-Column Grid for Light Mode */}
        <div className="w-full max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6 relative items-stretch">
          {lightTiers.map((tier) => (
            <div 
              key={tier.id}
              className="relative w-full rounded-2xl overflow-hidden border shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1.5 transition-all duration-300 cursor-pointer flex flex-col justify-between"
              style={{
                background: tier.cornerGradient,
                borderColor: tier.borderColor
              }}
              onClick={() => onNavigate && onNavigate(`/submit?tier=${tier.id}`)}
            >
              <div className="w-full flex flex-col flex-1 p-5 sm:p-6 justify-between relative z-10">
                {/* Info Top */}
                <div className="flex flex-col">
                  {/* Badges */}
                  <div className="flex items-center gap-1.5 mb-2.5 min-h-[22px]">
                    {tier.id === 'regular' && (
                      <div className="px-2.5 py-0.5 text-[10px] font-mono font-bold tracking-wider uppercase rounded-md bg-[#8B5CF6] shadow-sm" style={{ color: '#FFFFFF' }}>
                        #8B5CF6
                      </div>
                    )}

                    {tier.id === 'standard' && (
                      <>
                        <div className="px-2 py-0.5 text-[9.5px] font-mono font-bold tracking-wider uppercase rounded-md border border-[#2D9A46]/40 bg-[#2D9A46]/10 text-[#2D9A46]">
                          {tier.code}
                        </div>
                        <div className="px-2 py-0.5 text-[9.5px] font-mono font-bold tracking-wider uppercase rounded-md border border-neutral-300 bg-white text-neutral-900 shadow-sm">
                          {tier.badge}
                        </div>
                      </>
                    )}

                    {tier.id === 'express' && (
                      <>
                        <div className="px-2 py-0.5 text-[9.5px] font-mono font-bold tracking-wider uppercase rounded-md bg-neutral-900 shadow-sm" style={{ color: '#FFFFFF' }}>
                          {tier.code}
                        </div>
                        <div className="px-2 py-0.5 text-[9.5px] font-mono font-bold tracking-wider uppercase rounded-md bg-[#F97316] shadow-sm" style={{ color: '#FFFFFF' }}>
                          {tier.badge}
                        </div>
                      </>
                    )}

                    {tier.id === 'walkthrough' && (
                      <>
                        <div className="px-2 py-0.5 text-[9.5px] font-mono font-bold tracking-wider uppercase rounded-md bg-neutral-900 shadow-sm" style={{ color: '#FFFFFF' }}>
                          {tier.code}
                        </div>
                        <div className="px-2 py-0.5 text-[9.5px] font-mono font-bold tracking-wider uppercase rounded-md bg-[#D4AF37] shadow-sm" style={{ color: '#FFFFFF' }}>
                          {tier.badge}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="font-['Oswald'] text-2xl sm:text-[26px] font-bold uppercase tracking-wide leading-tight text-neutral-900 mb-1.5">
                    {tier.name}
                  </h3>

                  {/* Tagline */}
                  <p className="text-xs font-sans text-neutral-500 leading-relaxed mb-2.5 min-h-[32px]">
                    {tier.tagline}
                  </p>

                  {/* Blueprint SVG Graphic */}
                  <div className="w-full h-16 sm:h-20 flex items-center justify-center my-2 text-neutral-400 group-hover/card:scale-105 transition-transform duration-500">
                    <tier.Blueprint color={tier.color} isLight={true} />
                  </div>

                  {/* Features with matching colored dots */}
                  <div className="flex flex-col gap-2.5 mt-2">
                    {tier.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2.5">
                        <span 
                          className="w-2 h-2 rounded-full shrink-0" 
                          style={{ backgroundColor: tier.color }} 
                        />
                        <span className="font-sans text-xs font-medium tracking-wide text-neutral-700">
                          {feat.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price & CTA Bottom */}
                <div className="mt-5 pt-4 border-t border-neutral-200/80 flex flex-col items-center">
                  <div className="flex flex-col items-center w-full mb-3">
                    <span className="font-mono text-[8.5px] uppercase tracking-[0.2em] text-neutral-400 mb-0.5">
                      {language === 'es' ? 'PRECIO BASE' : 'BASE PRICE'}
                    </span>
                    <div className="flex items-start mb-0.5">
                      <span className="font-mono text-sm text-neutral-400 mt-1 mr-1">€</span>
                      <span className="font-['Oswald'] font-bold text-3xl sm:text-4xl leading-none text-neutral-900 tracking-tight">
                        {tier.price}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <svg className="w-3.5 h-3.5" style={{ color: tier.color }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                      <span className="font-sans text-[11px] text-neutral-500">
                        {tier.turnaround}
                      </span>
                    </div>
                  </div>

                  {/* Button: Light, matching card background */}
                  <div className="w-full">
                    <div className="w-full py-2.5 text-center text-[10.5px] font-bold tracking-[0.18em] uppercase rounded-lg border border-neutral-300 bg-white text-neutral-900 hover:border-neutral-900 hover:bg-neutral-50 transition-all duration-300 shadow-sm cursor-pointer">
                      {language === 'es' ? 'ELEGIR SERVICIO' : 'SELECT TIER'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 md:mt-10">
          <button
            onClick={() => onNavigate && onNavigate('/pricing')}
            className="group font-mono text-xs tracking-[0.2em] uppercase text-black/50 hover:text-black transition-colors flex items-center gap-2"
          >
            {language === 'es' ? 'Ver todas las tarifas' : 'View all services'}
            <svg className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
          </button>
        </div>
      </section>
    );
  }

  // ==========================================
  // PRICING PAGE (Vertical Ticket Stack)
  // ==========================================
  if (!isLight) {
    // Dark mode ticket stack
    return (
      <section 
        id="pricing" 
        className="w-full bg-[#454545] text-white py-12 lg:py-16 px-5 lg:px-8 border-b border-brand-border/50 select-none relative overflow-hidden transition-colors duration-700"
      >
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] blur-[150px] pointer-events-none opacity-20" 
          style={{ backgroundColor: darkTiers.find(t => t.id === selectedTier)?.color || '#48C765' }}
        />

        <div className="max-w-[850px] mx-auto relative z-10 flex flex-col">
          <div className="mb-8 text-center lg:text-left">
            <h2 className="font-['Oswald'] font-[700] text-3xl sm:text-4xl uppercase tracking-wide leading-tight mb-2 text-white">
              {language === 'es' ? 'Elige el servicio' : 'Select a service'}
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[#A4ACA1]">
              {language === 'es' 
                ? 'El plazo cuenta desde que las cartas entran en nuestro sistema, no desde que las envías.'
                : 'Turnaround time starts when cards enter our system, not when shipped.'}
            </p>
          </div>

          <div className="flex flex-col gap-6">
            {darkTiers.map((tier) => (
              <div 
                key={tier.id}
                className="relative w-full border overflow-hidden rounded-xl transition-all duration-300 cursor-pointer group/card hover:scale-[1.01] dark-card shadow-[0_12px_35px_-10px_rgba(0,0,0,0.7)]"
                style={{
                  background: `radial-gradient(circle at 100% 0%, ${tier.glowColor} 0%, transparent 60%), linear-gradient(160deg, #161A17 0%, #0A0D0B 100%)`,
                  borderColor: tier.borderColor,
                }}
                onClick={() => {
                  setSelectedTier(tier.id);
                  onNavigate && onNavigate(`/submit?tier=${tier.id}`);
                }}
              >
                <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-15 pointer-events-none mix-blend-overlay z-0" />
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.07] to-transparent translate-x-[-150%] group-hover/card:translate-x-[150%] transition-transform duration-[1200ms] ease-in-out pointer-events-none z-20" />

                <div className="w-full flex flex-col md:flex-row relative z-10 h-full">
                  <div className="flex-1 p-5 sm:p-6 flex flex-col justify-center">
                    <div className="flex items-center gap-1.5 mb-2.5">
                      <div 
                        className="px-2 py-0.5 text-[9.5px] font-mono tracking-wider uppercase rounded border font-semibold"
                        style={{ 
                          color: tier.color, 
                          borderColor: `${tier.color}40`,
                          backgroundColor: `${tier.color}15`
                        }}
                      >
                        {tier.code}
                      </div>
                      {tier.badge && (
                        <div className="px-2 py-0.5 text-[9.5px] font-mono font-bold tracking-wider uppercase rounded bg-white text-black shadow-[0_0_12px_rgba(255,255,255,0.7)]">
                          {tier.badge}
                        </div>
                      )}
                    </div>
                    
                    <h3 className="font-['Oswald'] text-xl sm:text-2xl uppercase tracking-wide leading-tight mb-1.5 font-bold text-white">
                      {tier.name}
                    </h3>
                    
                    <p className="text-xs font-sans leading-relaxed max-w-[95%] mb-3 text-[#C8D1C5]">
                      {tier.tagline}
                    </p>

                    <div className="flex flex-col gap-2 mt-auto">
                      {tier.features.map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          {feat.icon}
                          <span className="font-sans text-xs font-medium tracking-wide text-white/80">
                            {feat.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="w-full md:w-[30%] lg:w-[26%] p-5 sm:p-6 flex flex-col justify-center items-start md:items-end border-t md:border-t-0 md:border-l border-white/10 bg-black/30">
                    <div className="flex flex-col items-start md:items-end w-full mb-3">
                      <span className="font-mono text-[8.5px] uppercase tracking-[0.2em] mb-1 text-white/50">
                        {language === 'es' ? 'PRECIO BASE' : 'BASE PRICE'}
                      </span>
                      <div className="flex items-start mb-0.5">
                        <span className="font-mono text-sm mt-1 mr-1 text-white/50">€</span>
                        <span className="font-['Oswald'] font-[700] text-3xl sm:text-4xl leading-none tracking-tight text-white">
                          {tier.price}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-1.5 text-right mt-0.5">
                        <svg className="w-3 h-3 opacity-90" style={{ color: tier.color }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        <span className="font-sans text-[11px] font-medium text-white/80">
                          {tier.turnaround}
                        </span>
                      </div>
                    </div>

                    <div className="mt-auto w-full pt-1">
                      <div className={`w-full py-2.5 text-center text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-300 rounded-md ${tier.btnClass}`}>
                        {language === 'es' ? 'ELEGIR' : 'SELECT'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex gap-3.5 items-start max-w-2xl p-5 mx-auto rounded-xl bg-white/[0.02] border border-white/[0.04]">
            <svg className="w-4 h-4 text-[#48C765] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="font-sans text-xs leading-relaxed text-[#A4ACA1]">
              <strong className="font-semibold text-white">
                {language === 'es' ? 'Valor declarado. ' : 'Declared value. '}
              </strong>
              {language === 'es' 
                ? 'Si una carta supera el límite del nivel elegido, se ajustará automáticamente al nivel correspondiente para asegurar la cobertura correcta.'
                : 'If a card exceeds the chosen tier limit, it will automatically be bumped to the appropriate tier to ensure proper coverage.'}
            </p>
          </div>
        </div>
      </section>
    );
  }

  // Light Mode ticket stack
  return (
    <section 
      id="pricing" 
      className="w-full bg-[#F8F9FA] text-[#1A1D1A] py-12 lg:py-16 px-5 lg:px-8 border-b border-black/[0.06] select-none relative overflow-hidden transition-colors duration-700"
    >
      <div className="max-w-[850px] mx-auto relative z-10 flex flex-col">
        <div className="mb-8 text-center lg:text-left">
          <h2 className="font-['Oswald'] font-[700] text-3xl sm:text-4xl uppercase tracking-wide leading-tight mb-2 text-[#1A1D1A]">
            {language === 'es' ? 'Elige el servicio' : 'Select a service'}
          </h2>
          <p className="font-sans text-xs sm:text-sm text-[#4A5048]">
            {language === 'es' 
              ? 'El plazo cuenta desde que las cartas entran en nuestro sistema, no desde que las envías.'
              : 'Turnaround time starts when cards enter our system, not when shipped.'}
          </p>
        </div>

        <div className="flex flex-col gap-6">
          {lightTiers.map((tier) => (
            <div 
              key={tier.id}
              className="relative w-full rounded-2xl overflow-hidden border shadow-[0_3px_15px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_25px_rgba(0,0,0,0.07)] hover:scale-[1.01] transition-all duration-300 cursor-pointer"
              style={{
                background: tier.cornerGradient,
                borderColor: tier.borderColor
              }}
              onClick={() => {
                setSelectedTier(tier.id);
                onNavigate && onNavigate(`/submit?tier=${tier.id}`);
              }}
            >
              <div className="w-full flex flex-col md:flex-row relative z-10 h-full">
                {/* Left Side: Info */}
                <div className="flex-1 p-5 sm:p-6 flex flex-col justify-center">
                  <div className="flex flex-wrap items-center gap-1.5 mb-2.5">
                    {tier.id === 'regular' && (
                      <div className="px-2.5 py-0.5 text-[10px] font-mono font-bold tracking-wider uppercase rounded-md bg-[#8B5CF6] shadow-sm" style={{ color: '#FFFFFF' }}>
                        #8B5CF6
                      </div>
                    )}
                    {tier.id === 'standard' && (
                      <>
                        <div className="px-2 py-0.5 text-[9.5px] font-mono font-bold tracking-wider uppercase rounded-md border border-[#2D9A46]/40 bg-[#2D9A46]/10 text-[#2D9A46]">
                          {tier.code}
                        </div>
                        <div className="px-2 py-0.5 text-[9.5px] font-mono font-bold tracking-wider uppercase rounded-md border border-neutral-300 bg-white text-neutral-900 shadow-sm">
                          {tier.badge}
                        </div>
                      </>
                    )}
                    {tier.id === 'express' && (
                      <>
                        <div className="px-2 py-0.5 text-[9.5px] font-mono font-bold tracking-wider uppercase rounded-md bg-neutral-900 shadow-sm" style={{ color: '#FFFFFF' }}>
                          {tier.code}
                        </div>
                        <div className="px-2 py-0.5 text-[9.5px] font-mono font-bold tracking-wider uppercase rounded-md bg-[#F97316] shadow-sm" style={{ color: '#FFFFFF' }}>
                          {tier.badge}
                        </div>
                      </>
                    )}
                    {tier.id === 'walkthrough' && (
                      <>
                        <div className="px-2 py-0.5 text-[9.5px] font-mono font-bold tracking-wider uppercase rounded-md bg-neutral-900 shadow-sm" style={{ color: '#FFFFFF' }}>
                          {tier.code}
                        </div>
                        <div className="px-2 py-0.5 text-[9.5px] font-mono font-bold tracking-wider uppercase rounded-md bg-[#D4AF37] shadow-sm" style={{ color: '#FFFFFF' }}>
                          {tier.badge}
                        </div>
                      </>
                    )}
                  </div>
                  
                  <h3 className="font-['Oswald'] text-xl sm:text-2xl uppercase tracking-wide leading-tight mb-1.5 font-bold text-neutral-900">
                    {tier.name}
                  </h3>

                  <p className="text-xs font-sans text-neutral-500 leading-relaxed mb-3">
                    {tier.tagline}
                  </p>

                  <div className="flex flex-col gap-2 mt-auto">
                    {tier.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2.5">
                        <span 
                          className="w-2 h-2 rounded-full shrink-0" 
                          style={{ backgroundColor: tier.color }} 
                        />
                        <span className="font-sans text-xs font-medium tracking-wide text-neutral-700">
                          {feat.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Side: Price & CTA (Ticket Stub Style) */}
                <div className="w-full md:w-[30%] lg:w-[26%] p-5 sm:p-6 flex flex-col justify-center items-start md:items-end border-t md:border-t-0 md:border-l border-neutral-200/80 bg-neutral-50/50">
                  <div className="flex flex-col items-start md:items-end w-full mb-3">
                    <span className="font-mono text-[8.5px] uppercase tracking-[0.2em] mb-1 text-neutral-400">
                      {language === 'es' ? 'PRECIO BASE' : 'BASE PRICE'}
                    </span>
                    <div className="flex items-start mb-0.5">
                      <span className="font-mono text-sm mt-1 mr-1 text-neutral-400">€</span>
                      <span className="font-['Oswald'] font-[700] text-3xl sm:text-4xl leading-none tracking-tight text-neutral-900">
                        {tier.price}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-1.5 text-right mt-0.5">
                      <svg className="w-3.5 h-3.5" style={{ color: tier.color }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                      <span className="font-sans text-[11px] font-medium text-neutral-500">
                        {tier.turnaround}
                      </span>
                    </div>
                  </div>

                  <div className="mt-auto w-full pt-1">
                    <div className="w-full py-2.5 text-center text-[10.5px] font-bold tracking-[0.18em] uppercase rounded-lg border border-neutral-300 bg-white text-neutral-900 hover:border-neutral-900 hover:bg-neutral-50 transition-all duration-300 shadow-sm cursor-pointer">
                      {language === 'es' ? 'ELEGIR' : 'SELECT'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex gap-3.5 items-start max-w-2xl p-5 mx-auto rounded-xl bg-white border border-[#DDD6C9] shadow-sm">
          <svg className="w-4 h-4 text-[#1E7E4E] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="font-sans text-xs leading-relaxed text-[#4A5048]">
            <strong className="font-semibold text-[#1A1D1A]">
              {language === 'es' ? 'Valor declarado. ' : 'Declared value. '}
            </strong>
            {language === 'es' 
              ? 'Si una carta supera el límite del nivel elegido, se ajustará automáticamente al nivel correspondiente para asegurar la cobertura correcta.'
              : 'If a card exceeds the chosen tier limit, it will automatically be bumped to the appropriate tier to ensure proper coverage.'}
          </p>
        </div>
      </div>
    </section>
  );
};
