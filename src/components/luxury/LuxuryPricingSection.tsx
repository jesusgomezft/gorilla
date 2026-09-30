import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Box, Cpu, Scan, BarChart, Link, Zap, Headset, ListOrdered, ShieldCheck, Briefcase, Crown, CheckCircle2 } from 'lucide-react';

const BlueprintScanner = ({ color }: { color: string }) => (
  <svg viewBox="0 0 100 120" className="w-full h-full overflow-visible" fill="none" stroke="currentColor" strokeWidth="1.5">
    <g>
      <animateTransform attributeName="transform" type="translate" values="0,0; 0,10; 0,0" dur="4s" repeatCount="indefinite" />
      <rect x="25" y="10" width="50" height="8" rx="2" className="stroke-white/80" />
      <line x1="50" y1="2" x2="50" y2="10" className="stroke-white/80" />
      <text x="50" y="8" fill={color} fontSize="5" fontFamily="monospace" textAnchor="middle" stroke="none">365 nm</text>
      <polygon points="30,18 70,18 85,60 15,60" fill={`${color}10`} stroke="none">
        <animate attributeName="points" values="30,18 70,18 85,60 15,60; 30,18 70,18 75,50 25,50; 30,18 70,18 85,60 15,60" dur="2s" repeatCount="indefinite" />
      </polygon>
      <line x1="30" y1="18" x2="15" y2="60" stroke={color} strokeWidth="0.5" opacity="0.3">
        <animate attributeName="x2" values="15; 25; 15" dur="2s" repeatCount="indefinite" />
        <animate attributeName="y2" values="60; 50; 60" dur="2s" repeatCount="indefinite" />
      </line>
      <line x1="70" y1="18" x2="85" y2="60" stroke={color} strokeWidth="0.5" opacity="0.3">
        <animate attributeName="x2" values="85; 75; 85" dur="2s" repeatCount="indefinite" />
        <animate attributeName="y2" values="60; 50; 60" dur="2s" repeatCount="indefinite" />
      </line>
    </g>
    <rect x="30" y="30" width="40" height="55" rx="3" className="stroke-white/80" />
    <rect x="35" y="35" width="30" height="7" className="stroke-white/60" />
    <rect x="35" y="45" width="30" height="25" className="stroke-white/60" />
    <circle cx="50" cy="57.5" r="7" className="stroke-white/60" />
    <line x1="35" y1="45" x2="65" y2="70" className="stroke-white/30" strokeWidth="0.5" />
    <line x1="65" y1="45" x2="35" y2="70" className="stroke-white/30" strokeWidth="0.5" />
    <rect x="35" y="73" width="30" height="4" className="stroke-white/60" />
    <line x1="35" y1="80" x2="55" y2="80" className="stroke-white/60" />
    <line x1="35" y1="83" x2="65" y2="83" className="stroke-white/60" />
  </svg>
);

const BlueprintCaliper = ({ color }: { color: string }) => (
  <svg viewBox="0 0 120 100" className="w-full h-full overflow-visible" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="30" y="35" width="60" height="20" rx="1" className="stroke-white/80" />
    <rect x="20" y="60" width="80" height="8" rx="1" className="stroke-white/80" />
    <path d="M20 60 V30 H25 V60" className="stroke-white/80" />
    <line x1="30" y1="60" x2="30" y2="64" className="stroke-white/50" />
    <line x1="40" y1="60" x2="40" y2="64" className="stroke-white/50" />
    <line x1="50" y1="60" x2="50" y2="65" className="stroke-white/80" />
    <line x1="60" y1="60" x2="60" y2="64" className="stroke-white/50" />
    <line x1="70" y1="60" x2="70" y2="64" className="stroke-white/50" />
    <line x1="80" y1="60" x2="80" y2="65" className="stroke-white/80" />
    <g>
      <animateTransform attributeName="transform" type="translate" values="5,0; -5,0; 5,0" dur="5s" repeatCount="indefinite" />
      <path d="M90 68 V30 H95 V68 H102 V75 H90 Z" className="stroke-white/80" />
      <text x="50" y="25" fill={color} fontSize="6" fontFamily="monospace" textAnchor="middle" stroke="none">7.82 mm</text>
      <line x1="50" y1="27" x2="50" y2="35" stroke={color} strokeWidth="0.5" />
    </g>
  </svg>
);

const BlueprintMagnifier = ({ color }: { color: string }) => (
  <svg viewBox="0 0 100 120" className="w-full h-full overflow-visible" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M20 60 V20 H60" className="stroke-white/50" />
    <path d="M25 60 V25 H60" className="stroke-white/30" />
    <g>
      <animateTransform attributeName="transform" type="translate" values="0,0; -8,-8; 0,0" dur="6s" repeatCount="indefinite" />
      <circle cx="50" cy="50" r="25" className="stroke-white/90" />
      <circle cx="50" cy="50" r="23" className="stroke-white/30" />
      <line x1="68" y1="68" x2="85" y2="85" strokeWidth="3" strokeLinecap="round" className="stroke-white/80" />
      <line x1="68" y1="68" x2="85" y2="85" strokeWidth="1" strokeLinecap="round" className="stroke-[#454545]" />
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

const BlueprintBriefcase = ({ color }: { color: string }) => (
  <svg viewBox="0 0 120 100" className="w-full h-full overflow-visible" fill="none" stroke="currentColor" strokeWidth="1.5">
    {/* Security Scan Line */}
    <line x1="15" y1="30" x2="105" y2="30" stroke={color} strokeWidth="1" opacity="0.6">
      <animate attributeName="y1" values="30; 90; 30" dur="4s" repeatCount="indefinite" />
      <animate attributeName="y2" values="30; 90; 30" dur="4s" repeatCount="indefinite" />
    </line>
    
    <g>
      <animateTransform attributeName="transform" type="translate" values="0,0; 0,-1.5; 0,0" dur="3s" repeatCount="indefinite" />
      <path d="M45 35 V23 H75 V35" className="stroke-white/80" />
      <rect x="52" y="25" width="16" height="4" className="stroke-white/40" />
    </g>
    
    <rect x="20" y="35" width="80" height="55" rx="4" className="stroke-white/80" />
    <rect x="26" y="41" width="68" height="43" rx="2" className="stroke-white/30" />
    
    <rect x="35" y="31" width="10" height="8" rx="1" className="stroke-white/90" />
    <rect x="75" y="31" width="10" height="8" rx="1" className="stroke-white/90" />
    
    <circle cx="40" cy="35" r="1.5" className="stroke-white/50" />
    <circle cx="80" cy="35" r="1.5" className="stroke-white/50" />
    
    <path d="M26 62.5 H94" className="stroke-white/20" strokeWidth="1" />
    
    {/* Shield icon in the middle */}
    <g stroke={color}>
      <path d="M60 47 L70 51 V59 C70 65 60 71 60 71 C60 71 50 65 50 59 V51 Z" strokeWidth="1.5" />
      <circle cx="60" cy="57" r="3" fill={color} stroke="none">
        <animate attributeName="opacity" values="0.3; 1; 0.3" dur="2s" repeatCount="indefinite" />
      </circle>
    </g>
    <text x="60" y="79" fill={color} fontSize="5" fontFamily="monospace" textAnchor="middle" stroke="none" opacity="0.8">LEVEL-5</text>
  </svg>
);

const getFeatureIcon = (feature: string) => {
  const f = feature.toLowerCase();
  if (f.includes('slab') || f.includes('carcasa')) return Box;
  if (f.includes('nfc') || f.includes('chip')) return Cpu;
  if (f.includes('scan') || f.includes('escan')) return Scan;
  if (f.includes('subgrade') || f.includes('subgrado')) return BarChart;
  if (f.includes('blockchain') || f.includes('registr')) return Link;
  if (f.includes('fast') || f.includes('acelerad')) return Zap;
  if (f.includes('support') || f.includes('soporte')) return Headset;
  if (f.includes('queue') || f.includes('fila')) return ListOrdered;
  if (f.includes('audit')) return ShieldCheck;
  if (f.includes('armored') || f.includes('malet')) return Briefcase;
  if (f.includes('master') || f.includes('grader')) return Crown;
  return CheckCircle2;
};

interface LuxuryPricingSectionProps {
  onNavigate?: (path: string) => void;
  isHome?: boolean;
}

export const LuxuryPricingSection: React.FC<LuxuryPricingSectionProps> = ({ onNavigate, isHome = false }) => {
  const { language } = useLanguage();
  const [selectedTier, setSelectedTier] = useState<string>('standard');

  const tiers = [
    {
      id: 'regular',
      name: 'Collector Regular',
      tagline: language === 'es' ? 'Volumen y sets modernos. Ideal para colecciones personales.' : 'Volume & modern sets. Ideal for personal collections.',
      price: '15',
      turnaround: language === 'es' ? '20 días hábiles' : '20 business days',
      maxValue: '€250',
      badge: null,
      features: language === 'es' 
        ? ['Carcasa Premium', 'Chip NFC', 'Escaneo Básico'] 
        : ['Premium Slab', 'NFC Chip', 'Basic Scan']
    },
    {
      id: 'standard',
      name: 'Precision Standard',
      tagline: language === 'es' ? 'El equilibrio perfecto. Subnotas y registro público en alta definición.' : 'The perfect balance. Subgrades and HD public registry.',
      price: '28',
      turnaround: language === 'es' ? '10 días hábiles' : '10 business days',
      maxValue: '€1.000',
      badge: language === 'es' ? 'MÁS ELEGIDO' : 'MOST POPULAR',
      features: language === 'es' 
        ? ['Subgrados detallados', 'Escaneo 4K HD', 'Registro público en blockchain'] 
        : ['Detailed Subgrades', '4K HD Scan', 'Blockchain Public Registry']
    },
    {
      id: 'express',
      name: 'Priority Express',
      tagline: language === 'es' ? 'Procesamiento acelerado en cola preferente para alta demanda.' : 'Accelerated processing in priority queue for high demand.',
      price: '65',
      turnaround: language === 'es' ? '5 días hábiles' : '5 business days',
      maxValue: '€5.000',
      badge: language === 'es' ? 'PRIORIDAD' : 'PRIORITY',
      features: language === 'es' 
        ? ['Acelerado', 'Soporte Directo', 'Fila Preferente'] 
        : ['Fast-Track', 'Direct Support', 'Priority Queue']
    },
    {
      id: 'walkthrough',
      name: 'Master Walk-Through',
      tagline: language === 'es' ? 'Tratamiento exclusivo de guante blanco para piezas históricas.' : 'Exclusive white-glove treatment for historic grails.',
      price: '140',
      turnaround: language === 'es' ? '48 horas' : '48 hours',
      maxValue: '€25.000',
      badge: language === 'es' ? 'GUANTE BLANCO' : 'WHITE GLOVE',
      features: language === 'es' 
        ? ['Doble Auditoría', 'Maletín Blindado', 'Master Grader Asignado'] 
        : ['Dual Audit', 'Armored Case', 'Assigned Master Grader']
    }
  ];

  const tiersWithTheme = tiers.map(t => {
    switch(t.id) {
      case 'regular': return { ...t, color: '#8CA5B8', code: 'RCDM.00', shortName: 'REGULAR', Blueprint: BlueprintScanner };
      case 'standard': return { ...t, color: '#48C765', code: 'RCDM.01', shortName: 'STANDARD', Blueprint: BlueprintCaliper };
      case 'express': return { ...t, color: '#F97316', code: 'RCDM.02', shortName: 'EXPRESS', Blueprint: BlueprintMagnifier };
      case 'walkthrough': return { ...t, color: '#D4AF37', code: 'RCDM.MASTER', shortName: 'WALK-THROUGH', Blueprint: BlueprintBriefcase };
      default: return { ...t, color: '#48C765', code: 'RCDM.XX', shortName: 'TIER', Blueprint: BlueprintScanner };
    }
  });

  const [currentSlide, setCurrentSlide] = useState(1); // Start on standard

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev === 0 ? tiersWithTheme.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev + 1) % tiersWithTheme.length);
  };

  React.useEffect(() => {
    if (!isHome) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % tiersWithTheme.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isHome, tiersWithTheme.length]);

  if (isHome) {
    return (
      <section id="pricing" className="w-full bg-[#454545] border-b border-white/[0.05] text-white py-16 lg:py-20 px-6 lg:px-12 select-none relative flex flex-col items-center z-20">
        
        <div className="mb-12 flex items-center justify-center gap-6 w-full opacity-80">
          <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-white/30" />
          <h2 className="font-mono text-xs sm:text-sm tracking-[0.4em] text-white uppercase text-center font-semibold transition-colors duration-500">
            {language === 'es' ? 'NUESTROS SERVICIOS' : 'OUR SERVICES'}
          </h2>
          <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-white/30" />
        </div>

        {/* 4-Column Grid */}
        <div className="w-full max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8 relative">
          {tiersWithTheme.slice(0, 4).map((tier) => (
            <div 
              key={tier.id}
              className="relative w-full border shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] overflow-hidden rounded-2xl transition-all duration-700 cursor-pointer group/card hover:-translate-y-2 hover:shadow-[0_30px_70px_-15px_rgba(0,0,0,0.9)]"
              style={{ 
                background: `linear-gradient(160deg, #161A17 0%, #0A0D0B 100%)`,
                borderColor: `${tier.color}40`,
              }}
              onClick={() => onNavigate && onNavigate(`/submit?tier=${tier.id}`)}
            >
              
              {/* Massive Typography Watermark */}
              <div 
                className="absolute -right-4 -bottom-6 text-[80px] font-black opacity-[0.03] pointer-events-none select-none tracking-tighter leading-none whitespace-nowrap transition-all duration-700 font-['Oswald']" 
                style={{ color: tier.color }}
              >
                {tier.shortName}
              </div>

              {/* Glowing Orb inside the card */}
              <div 
                className="absolute top-0 right-0 w-[200px] h-[200px] blur-[60px] rounded-full pointer-events-none opacity-20 transition-colors duration-700 translate-x-1/3 -translate-y-1/3"
                style={{ backgroundColor: tier.color }}
              />

              {/* Noise Texture Overlay */}
              <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-20 pointer-events-none mix-blend-overlay z-0" />

              {/* Glass Reflection Sheen */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.07] to-transparent translate-x-[-150%] group-hover/card:translate-x-[150%] transition-transform duration-[1200ms] ease-in-out pointer-events-none z-20" />

              <div className="w-full flex flex-col relative z-10 h-full p-5 sm:p-6">

                {/* Info */}
                <div className="flex flex-col mb-4">
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <div className="px-2 py-1 text-[9px] font-mono font-bold tracking-[0.2em] uppercase rounded-sm border backdrop-blur-sm"
                         style={{ backgroundColor: `${tier.color}10`, color: tier.color, borderColor: `${tier.color}30` }}>
                      {tier.code}
                    </div>
                    {tier.badge && (
                      <div className="px-2 py-1 text-[9px] font-mono font-bold tracking-[0.2em] uppercase bg-white text-black rounded-sm shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                        {tier.badge}
                      </div>
                    )}
                  </div>
                  
                  <h3 className="font-['Oswald'] text-2xl sm:text-3xl uppercase tracking-wide text-white leading-[1.1] mb-2 drop-shadow-lg">
                    {tier.name}
                  </h3>
                  
                  <p className="text-[13px] text-[#A4ACA1] font-sans leading-relaxed mb-4 min-h-[40px]">
                    {tier.tagline}
                  </p>

                  <div className="w-full mb-4 flex justify-center h-20 opacity-40 group-hover/card:opacity-100 transition-opacity duration-700 pointer-events-none mix-blend-screen" style={{ filter: `drop-shadow(0 0 10px ${tier.color}30)` }}>
                    <tier.Blueprint color={tier.color} />
                  </div>

                  <div className="flex flex-col gap-3">
                    {tier.features.map((feature, fIdx) => {
                      const Icon = getFeatureIcon(feature);
                      return (
                        <div key={fIdx} className="flex items-center gap-3 group/item">
                          <Icon 
                            className="w-4 h-4 transition-transform duration-500 group-hover/item:scale-110 group-hover/item:rotate-[5deg]" 
                            style={{ color: tier.color }} 
                            strokeWidth={1.5}
                          />
                          <span className="font-sans text-[13px] text-[#EAEAEA] font-medium tracking-wide transition-colors group-hover/item:text-white">
                            {feature}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Price & CTA */}
                <div className="mt-auto pt-4 border-t border-white/10 flex flex-col items-center">
                  <div className="flex flex-col items-center w-full mb-4">
                    <span className="font-mono text-[9px] text-[#A4ACA1] uppercase tracking-[0.2em] mb-2">
                      {language === 'es' ? 'PRECIO BASE' : 'BASE PRICE'}
                    </span>
                    <div className="flex items-start mb-2">
                      <span className="font-mono text-base text-white/40 mt-1 mr-1">€</span>
                      <span className="font-['Oswald'] font-[700] text-5xl text-white leading-none tracking-tighter" style={{ textShadow: `0 0 30px ${tier.color}40` }}>
                        {tier.price}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 opacity-80" style={{ color: tier.color }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                      <span className="font-sans text-xs text-[#A4ACA1] font-medium">{tier.turnaround}</span>
                    </div>
                  </div>

                  <div className="w-full">
                    <div className="w-full py-3.5 text-center text-[11px] font-bold tracking-[0.2em] uppercase transition-all duration-300 border rounded-sm hover:bg-white/5"
                         style={{ borderColor: tier.color, color: tier.color, boxShadow: `inset 0 0 20px ${tier.color}00` }}>
                      {language === 'es' ? 'ELEGIR SERVICIO' : 'SELECT TIER'}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 md:mt-12">
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

  return (
    <section id="pricing" className="w-full text-white py-16 lg:py-24 px-6 lg:px-12 border-b border-brand-border/50 select-none relative overflow-hidden transition-colors duration-700">
      
      {/* Background Glow based on selected tier */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] blur-[150px] pointer-events-none transition-colors duration-700 opacity-20" 
        style={{ backgroundColor: tiersWithTheme.find(t => t.id === selectedTier)?.color || '#48C765' }}
      />

      <div className="max-w-[900px] mx-auto relative z-10 flex flex-col">
        
        {/* Header Section */}
        <div className="mb-12 text-center lg:text-left">
          <h2 className="font-['Oswald'] font-[700] text-4xl sm:text-5xl text-white uppercase tracking-wide leading-tight mb-4">
            {language === 'es' ? 'Elige el servicio' : 'Select a service'}
          </h2>
          <p className="font-sans text-sm text-[#A4ACA1]">
            {language === 'es' 
              ? 'El plazo cuenta desde que las cartas entran en nuestro sistema, no desde que las envías.'
              : 'Turnaround time starts when cards enter our system, not when shipped.'}
          </p>
        </div>

        {/* Vertical Stack of Premium Tickets */}
        <div className="flex flex-col gap-8">
          {tiersWithTheme.map((tier) => {
            const isSelected = selectedTier === tier.id;
            return (
            <div 
              key={tier.id}
              className={`relative w-full border shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8)] overflow-hidden rounded-xl transition-all duration-700 cursor-pointer group/card hover:scale-[1.01] hover:ring-2 hover:ring-white/20`}
              style={{ 
                background: `linear-gradient(160deg, #161A17 0%, #0A0D0B 100%)`,
                borderColor: `${tier.color}40`,
              }}
              onClick={() => onNavigate && onNavigate(`/submit?tier=${tier.id}`)}
            >
              
              {/* Massive Typography Watermark */}
              <div 
                className="absolute -right-2 -bottom-4 text-[70px] sm:text-[90px] font-black opacity-[0.03] pointer-events-none select-none tracking-tighter leading-none whitespace-nowrap transition-all duration-700 font-['Oswald']" 
                style={{ color: tier.color }}
              >
                {tier.shortName}
              </div>

              {/* Glowing Orb inside the card */}
              <div 
                className="absolute top-0 right-0 w-[200px] h-[200px] blur-[60px] rounded-full pointer-events-none opacity-20 transition-colors duration-700 translate-x-1/3 -translate-y-1/3"
                style={{ backgroundColor: tier.color }}
              />

              {/* Noise Texture Overlay */}
              <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-20 pointer-events-none mix-blend-overlay z-0" />

              {/* Glass Reflection Sheen */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.07] to-transparent translate-x-[-150%] group-hover/card:translate-x-[150%] transition-transform duration-[1200ms] ease-in-out pointer-events-none z-20" />

              <div className="w-full flex flex-col md:flex-row relative z-10 h-full">
                
                {/* Left Side: Info */}
                <div className="flex-1 p-5 sm:p-7 flex flex-col justify-center">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <div className="px-2 py-0.5 text-[9px] font-mono font-bold tracking-[0.2em] uppercase rounded-sm border backdrop-blur-sm"
                         style={{ backgroundColor: `${tier.color}10`, color: tier.color, borderColor: `${tier.color}30` }}>
                      {tier.code}
                    </div>
                    {tier.badge && (
                      <div className="px-2 py-0.5 text-[9px] font-mono font-bold tracking-[0.2em] uppercase bg-white text-black rounded-sm shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                        {tier.badge}
                      </div>
                    )}
                  </div>
                  
                  <h3 className="font-['Oswald'] text-2xl sm:text-3xl uppercase tracking-wide text-white leading-[1.1] mb-2 drop-shadow-lg">
                    {tier.name}
                  </h3>
                  
                  <p className="text-xs sm:text-[13px] text-[#A4ACA1] font-sans leading-relaxed max-w-[95%] mb-4">
                    {tier.tagline}
                  </p>

                  <div className="flex flex-col gap-2 mt-auto">
                    {tier.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full shadow-[0_0_8px_currentColor]" style={{ backgroundColor: tier.color, color: tier.color }} />
                        <span className="font-sans text-xs sm:text-[13px] text-[#EAEAEA] font-medium tracking-wide">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Side: Price & CTA */}
                <div className="w-full md:w-[30%] lg:w-[25%] p-5 sm:p-7 flex flex-col justify-center items-start md:items-end border-t md:border-t-0 md:border-l border-white/10 backdrop-blur-md bg-black/20">
                  
                  <div className="flex flex-col items-start md:items-end w-full mb-4">
                    <span className="font-mono text-[9px] text-[#A4ACA1] uppercase tracking-[0.2em] mb-1">
                      {language === 'es' ? 'PRECIO BASE' : 'BASE PRICE'}
                    </span>
                    <div className="flex items-start mb-2">
                      <span className="font-mono text-base text-white/40 mt-1 mr-1">€</span>
                      <span className="font-['Oswald'] font-[700] text-4xl sm:text-5xl text-white leading-none tracking-tighter" style={{ textShadow: `0 0 40px ${tier.color}40` }}>
                        {tier.price}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-1.5 text-right">
                      <svg className="w-3.5 h-3.5 opacity-80" style={{ color: tier.color }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                      <span className="font-sans text-[10px] sm:text-[11px] text-[#A4ACA1] font-medium">{tier.turnaround}</span>
                    </div>
                  </div>

                  <div className="mt-auto w-full pt-3">
                    <div className="w-full py-2.5 text-center text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-300 border rounded-sm hover:bg-white/5"
                         style={{ borderColor: tier.color, color: tier.color, boxShadow: `inset 0 0 20px ${tier.color}00` }}>
                      {language === 'es' ? 'ELEGIR' : 'SELECT'}
                    </div>
                  </div>
                </div>

              </div>
            </div>
            );
          })}
        </div>

        {/* Info Box */}
        <div className="mt-12 flex gap-4 items-start max-w-2xl bg-white/[0.02] border border-white/[0.04] p-6 mx-auto">
          <svg className="w-5 h-5 text-[#48C765] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="font-sans text-sm text-[#A4ACA1] leading-relaxed">
            <strong className="text-white font-semibold">{language === 'es' ? 'Valor declarado. ' : 'Declared value. '}</strong>
            {language === 'es' 
              ? 'Si una carta supera el límite del nivel elegido, se ajustará automáticamente al nivel correspondiente para asegurar la cobertura correcta.'
              : 'If a card exceeds the chosen tier limit, it will automatically be bumped to the appropriate tier to ensure proper coverage.'}
          </p>
        </div>

      </div>
    </section>
  );
};
