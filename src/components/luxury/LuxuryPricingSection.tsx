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

  if (isHome) {
    const popularTier = tiers.find(t => t.id === 'standard')!;
    
    return (
      <section id="pricing" className="w-full bg-transparent text-white py-16 lg:py-20 px-6 lg:px-12 select-none relative flex flex-col items-center z-20">
        
        <div className="mb-10 flex items-center justify-center gap-6 w-full opacity-80">
          <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-[#48C765]/50" />
          <h2 className="font-mono text-xs sm:text-sm tracking-[0.4em] text-white uppercase text-center font-semibold">
            {language === 'es' ? 'NUESTRO SERVICIO ESTRELLA' : 'FEATURED SERVICE'}
          </h2>
          <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-[#48C765]/50" />
        </div>

        {/* Larger & Improved Horizontal Ticket Design */}
        <div className="w-full max-w-[1000px] relative group cursor-pointer transition-transform duration-700 hover:scale-[1.01]" onClick={() => onNavigate && onNavigate('/submit')}>
          
          {/* Enhanced Outer Glow */}
          <div className="absolute -inset-2 bg-gradient-to-r from-[#48C765]/0 via-[#48C765]/15 to-[#48C765]/0 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

          {/* Ticket Body - Color blends with background (#454545) */}
          <div className="relative w-full bg-[#525252]/80 backdrop-blur-xl border border-white/10 shadow-2xl flex flex-col md:flex-row items-stretch overflow-hidden rounded-sm group-hover:border-[#48C765]/40 transition-colors duration-500">
            
            {/* Left Accent Bar */}
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-[#48C765] to-[#1F552B]" />

            {/* Section 1: Title & Badge */}
            <div className="p-8 md:p-10 md:w-[35%] border-b md:border-b-0 md:border-r border-white/10 flex flex-col justify-center relative bg-[url('/images/noise.png')] bg-repeat opacity-95">
              <div className="absolute top-0 right-0 p-3 opacity-30">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 22h20L12 2zm0 4.5l6.5 13h-13l6.5-13z"/></svg>
              </div>
              <div className="flex items-center gap-3 self-start mb-6 opacity-90">
                {/* Abstract Industrial Barcode */}
                <div className="flex gap-[2px] h-5 items-end">
                  <div className="w-[4px] h-full bg-[#48C765]"></div>
                  <div className="w-[1px] h-[70%] bg-[#48C765]/60"></div>
                  <div className="w-[2px] h-[90%] bg-[#48C765]/80"></div>
                  <div className="w-[1px] h-[50%] bg-[#48C765]/40"></div>
                  <div className="w-[3px] h-full bg-[#48C765]/90"></div>
                </div>
                
                {/* Tech Readout Text */}
                <div className="flex flex-col justify-end h-full">
                  <span className="font-mono text-[7px] text-[#A4ACA1] tracking-[0.3em] uppercase leading-none mb-[3px]">
                    {language === 'es' ? 'RCDM.01' : 'REC.01'}
                  </span>
                  <span className="font-mono text-[11px] font-bold uppercase tracking-[0.3em] text-white leading-none">
                    {popularTier.badge}
                  </span>
                </div>
              </div>
              <h3 className="font-['Oswald'] text-3xl lg:text-4xl uppercase tracking-wide text-white mb-3 leading-tight drop-shadow-md">
                {popularTier.name}
              </h3>
              <p className="text-xs text-[#EAEAEA] font-sans leading-relaxed">
                {popularTier.tagline}
              </p>
            </div>

            {/* Section 2: Features & Turnaround */}
            <div className="p-8 md:p-10 md:w-[45%] flex flex-col justify-center bg-white/[0.02]">
              <div className="grid grid-cols-1 gap-6">
                <div className="flex flex-col">
                   <p className="font-mono text-[10px] text-[#A4ACA1] uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                     <svg className="w-4 h-4 text-[#48C765]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                     {language === 'es' ? 'Plazo Estimado' : 'Estimated Turnaround'}
                   </p>
                   <p className="font-sans text-base text-white font-semibold">{popularTier.turnaround}</p>
                </div>
                
                <div>
                   <p className="font-mono text-[10px] text-[#A4ACA1] uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                     <svg className="w-4 h-4 text-[#48C765]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                     {language === 'es' ? 'Incluye' : 'Includes'}
                   </p>
                   <div className="flex flex-wrap gap-x-6 gap-y-3">
                     {popularTier.features.map((feature, idx) => (
                       <div key={idx} className="flex items-center gap-2">
                         <div className="w-1.5 h-1.5 bg-[#48C765] shadow-[0_0_8px_rgba(72,199,101,0.8)]" />
                         <span className="font-sans text-xs text-[#EAEAEA] font-medium">{feature}</span>
                       </div>
                     ))}
                   </div>
                </div>
              </div>
            </div>

            {/* Section 3: Price & Action */}
            <div className="p-8 md:p-10 md:w-[20%] border-t md:border-t-0 md:border-l border-white/10 bg-[#48C765]/[0.03] flex flex-row md:flex-col items-center justify-between md:justify-center gap-6 group-hover:bg-[#48C765]/[0.08] transition-colors">
              <div className="flex items-start md:items-baseline gap-1">
                <span className="font-mono text-lg text-[#A4ACA1] mt-1 md:mt-0">€</span>
                <span className="font-['Oswald'] font-[700] text-5xl lg:text-6xl text-white group-hover:text-[#48C765] transition-colors drop-shadow-lg">
                  {popularTier.price}
                </span>
              </div>
              
              <div className="w-14 h-14 rounded-full border border-[#48C765]/50 flex items-center justify-center group-hover:border-[#48C765] group-hover:bg-[#48C765] transition-all duration-300 shadow-[0_0_15px_rgba(72,199,101,0.15)] group-hover:shadow-[0_0_25px_rgba(72,199,101,0.5)]">
                <svg className="w-6 h-6 text-[#48C765] group-hover:text-[#111] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
              </div>
            </div>
            
          </div>
        </div>

        <div className="mt-8">
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
    <section id="pricing" className="w-full bg-[#454545] text-white py-16 lg:py-24 px-6 lg:px-12 border-b border-white/[0.04] select-none relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#48C765]/[0.02] blur-[150px] pointer-events-none" />

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
            
            return (
              <div
                key={tier.id}
                onClick={() => setSelectedTier(tier.id)}
                className={`group flex flex-col cursor-pointer transition-all duration-500 relative border overflow-hidden ${
                  isSelected 
                    ? 'bg-white/[0.03] border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.15)]' 
                    : 'bg-transparent border-white/[0.04] hover:border-white/10 hover:bg-white/[0.01]'
                }`}
              >
                {/* Active Left Border Accent */}
                <div className={`absolute left-0 top-0 bottom-0 w-[3px] transition-colors duration-500 ${isSelected ? 'bg-[#48C765]' : 'bg-transparent'}`} />

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
                            <span className={`font-mono text-[9px] px-2 py-0.5 uppercase tracking-wider font-bold ${
                              isSelected ? 'bg-[#48C765] text-[#111]' : 'bg-white/10 text-white'
                            }`}>
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
                      <span className={`font-['Oswald'] font-[700] text-2xl transition-colors ${isSelected ? 'text-[#48C765]' : 'text-white'}`}>
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
                              <div className="w-1 h-1 rounded-full bg-[#48C765]" />
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
            onClick={() => onNavigate && onNavigate('/submit')}
            className="shrink-0 bg-[#3A9F50] hover:bg-[#48C765] text-white px-8 py-3 text-sm font-bold tracking-widest uppercase transition-all duration-300"
          >
            {language === 'es' ? 'CONTINUAR' : 'CONTINUE'}
          </button>
          
        </div>

      </div>
    </section>
  );
};
