import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';

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
      case 'regular': return { ...t, color: '#8CA5B8', code: 'RCDM.00', shortName: 'REGULAR' };
      case 'standard': return { ...t, color: '#48C765', code: 'RCDM.01', shortName: 'STANDARD' };
      case 'express': return { ...t, color: '#F97316', code: 'RCDM.02', shortName: 'EXPRESS' };
      case 'walkthrough': return { ...t, color: '#D4AF37', code: 'RCDM.MASTER', shortName: 'WALK-THROUGH' };
      default: return { ...t, color: '#48C765', code: 'RCDM.XX', shortName: 'TIER' };
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
    const activeTier = tiersWithTheme[currentSlide];
    
    return (
      <section id="pricing" className="w-full bg-white/[0.03] border-b border-white/[0.05] text-white py-16 lg:py-20 px-6 lg:px-12 select-none relative flex flex-col items-center z-20">
        
        <div className="mb-10 flex items-center justify-center gap-6 w-full opacity-80">
          <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-white/30" />
          <h2 className="font-mono text-xs sm:text-sm tracking-[0.4em] text-white uppercase text-center font-semibold transition-colors duration-500" style={{ color: activeTier.color }}>
            {language === 'es' ? 'NUESTROS SERVICIOS' : 'OUR SERVICES'}
          </h2>
          <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-white/30" />
        </div>

        {/* Dynamic Slider Container */}
        <div className="w-full max-w-[1100px] relative flex items-center gap-4 group/slider">
          
          {/* Left Arrow */}
          <button 
            onClick={handlePrev}
            className="hidden md:flex items-center justify-center w-12 h-12 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:scale-110 transition-all text-white/50 hover:text-white z-30"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
          </button>

          <div className="w-full max-w-[950px] relative mx-auto">
            {/* Enhanced Outer Glow */}
            <div 
              className="absolute -inset-4 blur-[50px] transition-all duration-700 pointer-events-none opacity-30" 
              style={{ backgroundImage: `radial-gradient(circle at center, ${activeTier.color}, transparent 65%)` }}
            />

            {/* Ticket Body - Ultra Premium Design */}
            <div 
              className="relative w-full border shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] overflow-hidden rounded-2xl transition-all duration-700 cursor-pointer group/card hover:scale-[1.01]"
              style={{ 
                background: `linear-gradient(160deg, #161A17 0%, #0A0D0B 100%)`,
                borderColor: `${activeTier.color}40`,
              }}
              onClick={() => onNavigate && onNavigate(`/submit?tier=${activeTier.id}`)}
            >
              
              {/* Massive Typography Watermark */}
              <div 
                className="absolute -right-4 -bottom-6 text-[100px] sm:text-[140px] font-black opacity-[0.03] pointer-events-none select-none tracking-tighter leading-none whitespace-nowrap transition-all duration-700 font-['Oswald']" 
                style={{ color: activeTier.color }}
              >
                {activeTier.shortName}
              </div>

              {/* Glowing Orb inside the card */}
              <div 
                className="absolute top-0 right-0 w-[300px] h-[300px] blur-[80px] rounded-full pointer-events-none opacity-20 transition-colors duration-700 translate-x-1/3 -translate-y-1/3"
                style={{ backgroundColor: activeTier.color }}
              />

              {/* Noise Texture Overlay */}
              <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-20 pointer-events-none mix-blend-overlay z-0" />

              {/* Glass Reflection Sheen */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.07] to-transparent translate-x-[-150%] group-hover/card:translate-x-[150%] transition-transform duration-[1200ms] ease-in-out pointer-events-none z-20" />

              <div key={activeTier.id} className="w-full flex flex-col md:flex-row relative z-10 animate-crossfade-up h-full">
                
                {/* Left Side: Info */}
                <div className="flex-1 p-6 sm:p-10 flex flex-col justify-center">
                  <div className="flex flex-wrap items-center gap-3 mb-5">
                    <div className="px-3 py-1 text-[9px] sm:text-[10px] font-mono font-bold tracking-[0.2em] uppercase rounded-sm border backdrop-blur-sm"
                         style={{ backgroundColor: `${activeTier.color}10`, color: activeTier.color, borderColor: `${activeTier.color}30` }}>
                      {activeTier.code}
                    </div>
                    {activeTier.badge && (
                      <div className="px-3 py-1 text-[9px] sm:text-[10px] font-mono font-bold tracking-[0.2em] uppercase bg-white text-black rounded-sm shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                        {activeTier.badge}
                      </div>
                    )}
                  </div>
                  
                  <h3 className="font-['Oswald'] text-3xl sm:text-4xl lg:text-5xl uppercase tracking-wide text-white leading-[1.1] mb-3 drop-shadow-lg">
                    {activeTier.name}
                  </h3>
                  
                  <p className="text-[13px] sm:text-sm text-[#A4ACA1] font-sans leading-relaxed max-w-[95%] mb-6">
                    {activeTier.tagline}
                  </p>

                  <div className="flex flex-col gap-3 mt-auto">
                    {activeTier.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full shadow-[0_0_8px_currentColor]" style={{ backgroundColor: activeTier.color, color: activeTier.color }} />
                        <span className="font-sans text-[13px] sm:text-sm text-[#EAEAEA] font-medium tracking-wide">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Side: Price & CTA */}
                <div className="w-full md:w-[35%] lg:w-[30%] p-6 sm:p-10 flex flex-col justify-center items-start md:items-end border-t md:border-t-0 md:border-l border-white/10 backdrop-blur-md bg-black/20">
                  
                  <div className="flex flex-col items-start md:items-end w-full mb-6">
                    <span className="font-mono text-[9px] sm:text-[10px] text-[#A4ACA1] uppercase tracking-[0.2em] mb-2">
                      {language === 'es' ? 'PRECIO BASE' : 'BASE PRICE'}
                    </span>
                    <div className="flex items-start mb-3">
                      <span className="font-mono text-lg sm:text-xl text-white/40 mt-1 mr-1">€</span>
                      <span className="font-['Oswald'] font-[700] text-5xl sm:text-6xl lg:text-7xl text-white leading-none tracking-tighter" style={{ textShadow: `0 0 50px ${activeTier.color}40` }}>
                        {activeTier.price}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-right">
                      <svg className="w-4 h-4 opacity-80" style={{ color: activeTier.color }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                      <span className="font-sans text-[11px] sm:text-xs text-[#A4ACA1] font-medium">{activeTier.turnaround}</span>
                    </div>
                  </div>

                  <div className="mt-auto w-full pt-4">
                    <div className="w-full py-3.5 text-center text-[11px] font-bold tracking-[0.2em] uppercase transition-all duration-300 border rounded-sm hover:bg-white/5"
                         style={{ borderColor: activeTier.color, color: activeTier.color, boxShadow: `inset 0 0 20px ${activeTier.color}00` }}>
                      {language === 'es' ? 'ELEGIR SERVICIO' : 'SELECT TIER'}
                    </div>
                  </div>
                </div>

              </div>
            </div>
            
            {/* Dots Navigation */}
            <div className="flex justify-center gap-3 mt-8">
              {tiersWithTheme.map((tier, idx) => (
                <button
                  key={tier.id}
                  onClick={(e) => { e.stopPropagation(); setCurrentSlide(idx); }}
                  className={`h-1.5 rounded-full transition-all duration-500 ${currentSlide === idx ? 'w-8' : 'w-2 bg-white/20 hover:bg-white/40'}`}
                  style={currentSlide === idx ? { backgroundColor: tier.color, boxShadow: `0 0 8px ${tier.color}` } : {}}
                />
              ))}
            </div>

            {/* Mobile Arrows (Visible only on small screens below dots) */}
            <div className="flex md:hidden justify-center gap-6 mt-6">
              <button onClick={handlePrev} className="p-2 text-white/50 hover:text-white">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
              </button>
              <button onClick={handleNext} className="p-2 text-white/50 hover:text-white">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
              </button>
            </div>
          </div>

          {/* Right Arrow */}
          <button 
            onClick={handleNext}
            className="hidden md:flex items-center justify-center w-12 h-12 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:scale-110 transition-all text-white/50 hover:text-white z-30"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
          </button>

        </div>

        <div className="mt-6 md:mt-8">
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
