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

          <div className="w-full max-w-[1000px] relative mx-auto">
            {/* Enhanced Outer Glow */}
            <div 
              className="absolute -inset-2 blur-2xl transition-all duration-700 pointer-events-none opacity-40" 
              style={{ backgroundImage: `linear-gradient(to right, transparent, ${activeTier.color}20, transparent)` }}
            />

            {/* Ticket Body */}
            <div 
              className="relative w-full border shadow-2xl flex flex-col md:flex-row items-stretch overflow-hidden rounded-none transition-all duration-700 cursor-pointer hover:scale-[1.01]"
              style={{ 
                background: `linear-gradient(135deg, #121613 0%, ${activeTier.color}15 100%)`,
                borderColor: `${activeTier.color}40`,
                boxShadow: `0 20px 40px -10px ${activeTier.color}25`
              }}
              onClick={() => onNavigate && onNavigate(`/submit?tier=${activeTier.id}`)}
            >
              
              {/* Noise Texture Overlay */}
              <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-20 pointer-events-none mix-blend-overlay z-0" />

              {/* Left Accent Bar */}
              <div 
                className="absolute left-0 top-0 bottom-0 w-1 transition-colors duration-700 z-10" 
                style={{ backgroundImage: `linear-gradient(to bottom, ${activeTier.color}, transparent)` }}
              />

              <div key={activeTier.id} className="w-full flex flex-col p-6 sm:p-8 relative z-10 animate-crossfade-up">
                {/* Header: Title + Price side by side */}
                <div className="flex justify-between items-start mb-6">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex gap-[2px] h-3 items-end transition-colors duration-700" style={{ color: activeTier.color }}>
                        <div className="w-[2px] h-full bg-current"></div>
                        <div className="w-[1px] h-[70%] bg-current opacity-60"></div>
                        <div className="w-[1px] h-[100%] bg-current opacity-80"></div>
                      </div>
                      <span className="font-mono text-[8px] sm:text-[9px] font-bold uppercase tracking-[0.3em] text-[#A4ACA1] leading-none">
                        {activeTier.code} // {activeTier.shortName}
                      </span>
                    </div>
                    <h3 className="font-['Oswald'] text-2xl sm:text-3xl uppercase tracking-wide text-white leading-none">
                      {activeTier.name}
                    </h3>
                  </div>

                  {/* Price */}
                  <div className="flex items-start">
                    <span className="font-mono text-sm text-[#A4ACA1] mt-1 mr-0.5">€</span>
                    <span className="font-['Oswald'] font-[700] text-3xl sm:text-4xl text-white leading-none tracking-tight">
                      {activeTier.price}
                    </span>
                  </div>
                </div>

                <p className="text-[11px] sm:text-xs text-[#8A9388] font-sans leading-relaxed max-w-[85%] mb-6">
                  {activeTier.tagline}
                </p>

                {/* Tech Specs Block */}
                <div className="mt-auto flex flex-col bg-white/[0.02] border border-white/5 p-4 relative">
                  <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/20" />
                  <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/20" />
                  
                  <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-3">
                    <span className="font-mono text-[9px] text-[#A4ACA1] uppercase tracking-[0.2em]">{language === 'es' ? 'TIEMPO ESTIMADO' : 'TURNAROUND'}</span>
                    <span className="font-sans text-xs text-white font-medium" style={{ color: activeTier.color }}>{activeTier.turnaround}</span>
                  </div>

                  <div className="flex flex-col gap-2">
                    {activeTier.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <span className="font-mono text-[8px] opacity-50" style={{ color: activeTier.color }}>►</span>
                        <span className="font-sans text-[11px] text-[#EAEAEA]">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Subtle Action Arrow */}
                <div className="absolute bottom-0 right-0 p-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
                  <svg className="w-5 h-5" style={{ color: activeTier.color }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                  </svg>
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

        {/* Interactive Accordion List */}
        <div className="flex flex-col gap-3">
          {tiers.map((tier) => {
            const isSelected = selectedTier === tier.id;
            const tierWithTheme = tiersWithTheme.find(t => t.id === tier.id) || { ...tier, color: '#48C765', glow: false };
            
            return (
              <div
                key={tier.id}
                onClick={() => setSelectedTier(tier.id)}
                className={`group flex flex-col cursor-pointer transition-all duration-500 relative border overflow-hidden ${
                  isSelected 
                    ? 'border-white/10' 
                    : 'bg-transparent border-white/[0.04] hover:border-white/10 hover:bg-white/[0.01]'
                }`}
                style={isSelected ? {
                  background: `linear-gradient(90deg, ${tierWithTheme.color}15 0%, transparent 100%)`,
                  borderColor: `${tierWithTheme.color}40`,
                  boxShadow: `0 8px 30px ${tierWithTheme.color}15`
                } : {}}
              >
                {/* Active Left Border Accent */}
                <div className={`absolute left-0 top-0 bottom-0 w-[4px] transition-colors duration-500 ${isSelected ? 'opacity-100' : 'opacity-0'}`} style={{ backgroundColor: tierWithTheme.color }} />

                <div className="p-6 sm:px-8 sm:py-6">
                  <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4">
                    
                    {/* Left Info: Checkbox/Radio + Title */}
                    <div className="flex items-start gap-5 w-full sm:w-auto">
                      
                      {/* Custom Minimal Radio */}
                      <div className="mt-1 shrink-0 relative">
                        <div className={`w-5 h-5 rounded-full border transition-all duration-300 flex items-center justify-center ${
                          isSelected ? 'border-[#48C765]' : 'border-[#5B6154] group-hover:border-white/50'
                        }`}>
                          <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            isSelected ? 'bg-[#48C765] scale-100' : 'bg-transparent scale-0'
                          }`} />
                        </div>
                      </div>

                      <div className="flex flex-col">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className={`font-['Oswald'] text-xl uppercase tracking-wide transition-colors ${isSelected ? 'text-white' : 'text-[#C2C9C3] group-hover:text-white'}`}>
                            {tier.name}
                          </h3>
                          {tier.badge && (
                            <span className={`font-mono text-[9px] px-2 py-0.5 uppercase tracking-wider font-bold transition-colors duration-300 ${
                              isSelected ? 'text-[#111]' : 'bg-white/10 text-white'
                            }`}
                            style={isSelected ? { backgroundColor: tierWithTheme.color } : {}}>
                              {tier.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-[#8A9388] font-sans">
                          {tier.tagline}
                        </p>
                      </div>
                    </div>

                    {/* Right Info: Price */}
                    <div className="flex items-baseline gap-1 shrink-0">
                      <span className={`font-['Oswald'] font-[700] text-2xl transition-colors duration-500 ${isSelected ? '' : 'text-white'}`} style={isSelected ? { color: tierWithTheme.color } : {}}>
                        {tier.price}
                      </span>
                      <span className="font-mono text-sm text-[#8A9388]">€</span>
                    </div>

                  </div>

                  {/* Expandable Content (Features & Metadata) */}
                  <div className={`grid transition-all duration-500 ease-in-out ${
                    isSelected ? 'grid-rows-[1fr] opacity-100 mt-6' : 'grid-rows-[0fr] opacity-0'
                  }`}>
                    <div className="overflow-hidden pl-[40px] sm:pl-[44px]">
                      
                      <div className="flex flex-col sm:flex-row gap-8 pt-4 border-t border-white/[0.04]">
                        
                        {/* Features */}
                        <div className="flex-1 space-y-3">
                          <p className="font-mono text-[10px] text-[#A4ACA1] uppercase tracking-widest mb-2">
                            {language === 'es' ? 'Incluye' : 'Includes'}
                          </p>
                          {tier.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-3">
                              <div className="w-1 h-1 rounded-full transition-colors duration-500" style={{ backgroundColor: tierWithTheme.color }} />
                              <span className="font-sans text-sm text-[#EAEAEA]">{feature}</span>
                            </div>
                          ))}
                        </div>

                        {/* Metadata Details */}
                        <div className="flex-1 space-y-4">
                          <div>
                            <p className="font-mono text-[10px] text-[#A4ACA1] uppercase tracking-widest mb-1">
                              {language === 'es' ? 'Plazo Estimado' : 'Estimated Turnaround'}
                            </p>
                            <p className="font-sans text-sm text-white">{tier.turnaround}</p>
                          </div>
                          <div>
                            <p className="font-mono text-[10px] text-[#A4ACA1] uppercase tracking-widest mb-1">
                              {language === 'es' ? 'Valor Máximo Asegurado' : 'Max Insured Value'}
                            </p>
                            <p className="font-sans text-sm text-white">
                              {language === 'es' ? `Hasta ${tier.maxValue} por carta` : `Up to ${tier.maxValue} per card`}
                            </p>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Info Box & Continue Button */}
        <div className="mt-12 flex flex-col md:flex-row gap-6 justify-between items-center bg-white/[0.02] border border-white/[0.04] p-6">
          
          <div className="flex gap-4 items-start max-w-xl">
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

          <button
            onClick={() => onNavigate && onNavigate(`/submit?tier=${selectedTier}`)}
            className="shrink-0 text-white px-8 py-3 text-sm font-bold tracking-widest uppercase transition-all duration-500 hover:brightness-110 hover:shadow-lg"
            style={{ 
              backgroundColor: tiersWithTheme.find(t => t.id === selectedTier)?.color || '#48C765',
              boxShadow: `0 4px 20px ${tiersWithTheme.find(t => t.id === selectedTier)?.color}40`
            }}
          >
            {language === 'es' ? 'CONTINUAR' : 'CONTINUE'}
          </button>
          
        </div>

      </div>
    </section>
  );
};
