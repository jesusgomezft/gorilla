import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';

interface LuxuryPricingSectionProps {
  onNavigate?: (path: string) => void;
}

export const LuxuryPricingSection: React.FC<LuxuryPricingSectionProps> = ({ onNavigate }) => {
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
      features: language === 'es' ? 'Carcasa Premium • Chip NFC • Escaneo Básico' : 'Premium Slab • NFC Chip • Basic Scan'
    },
    {
      id: 'standard',
      name: 'Precision Standard',
      tagline: language === 'es' ? 'El equilibrio perfecto. Subnotas y registro público en alta definición.' : 'The perfect balance. Subgrades and HD public registry.',
      price: '28',
      turnaround: language === 'es' ? '10 días hábiles' : '10 business days',
      maxValue: '€1.000',
      badge: language === 'es' ? 'MÁS ELEGIDO' : 'MOST POPULAR',
      features: language === 'es' ? 'Subgrados • Escaneo 4K' : 'Subgrades • 4K Scan'
    },
    {
      id: 'express',
      name: 'Priority Express',
      tagline: language === 'es' ? 'Procesamiento acelerado en cola preferente para alta demanda.' : 'Accelerated processing in priority queue for high demand.',
      price: '65',
      turnaround: language === 'es' ? '5 días hábiles' : '5 business days',
      maxValue: '€5.000',
      badge: language === 'es' ? 'PRIORIDAD' : 'PRIORITY',
      features: language === 'es' ? 'Acelerado • Soporte Directo' : 'Fast-Track • Direct Support'
    },
    {
      id: 'walkthrough',
      name: 'Master Walk-Through',
      tagline: language === 'es' ? 'Tratamiento exclusivo de guante blanco para piezas históricas.' : 'Exclusive white-glove treatment for historic grails.',
      price: '140',
      turnaround: language === 'es' ? '48 horas' : '48 hours',
      maxValue: '€25.000',
      badge: language === 'es' ? 'GUANTE BLANCO' : 'WHITE GLOVE',
      features: language === 'es' ? 'Doble Auditoría • Maletín' : 'Dual Audit • Armored Case'
    }
  ];

  return (
    <section id="pricing" className="w-full bg-[#454545] text-white py-24 px-6 lg:px-12 border-b border-white/[0.04] select-none relative overflow-hidden">
      
      {/* Dynamic Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#48C765]/[0.02] blur-[150px] pointer-events-none" />

      <div className="max-w-[1000px] mx-auto relative z-10 flex flex-col">
        
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

        {/* Interactive Radio List (Ledger Style) */}
        <div className="flex flex-col bg-[#454545] border border-white/[0.06] rounded-none overflow-hidden shadow-2xl">
          {tiers.map((tier, index) => {
            const isSelected = selectedTier === tier.id;
            
            return (
              <div
                key={tier.id}
                onClick={() => setSelectedTier(tier.id)}
                className={`group flex flex-col p-6 sm:px-8 sm:py-7 cursor-pointer transition-all duration-300 relative border-b border-white/[0.04] last:border-b-0 ${
                  isSelected ? 'bg-white/[0.03]' : 'hover:bg-white/[0.01]'
                }`}
              >
                {/* Active Left Border Accent */}
                <div className={`absolute left-0 top-0 bottom-0 w-[4px] transition-colors duration-300 ${isSelected ? 'bg-[#48C765]' : 'bg-transparent'}`} />

                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start">
                  
                  {/* Radio Button */}
                  <div className="mt-1 shrink-0">
                    <div className={`w-5 h-5 rounded-none border-2 flex items-center justify-center transition-colors duration-300 ${
                      isSelected ? 'border-[#48C765]' : 'border-[#5B6154] group-hover:border-white/50'
                    }`}>
                      <div className={`w-2.5 h-2.5 rounded-none transition-transform duration-300 ${
                        isSelected ? 'bg-[#48C765] scale-100' : 'bg-transparent scale-0'
                      }`} />
                    </div>
                  </div>

                  {/* Tier Info */}
                  <div className="flex-1 w-full">
                    {/* Top row: Title and Price */}
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-3">
                        <h3 className={`font-['Oswald'] text-lg uppercase tracking-wide transition-colors ${isSelected ? 'text-[#48C765]' : 'text-white'}`}>
                          {tier.name}
                        </h3>
                        {tier.badge && (
                          <span className={`font-mono text-[9px] px-2 py-0.5 rounded-none uppercase tracking-wider ${
                            isSelected ? 'bg-[#48C765]/20 text-[#48C765]' : 'bg-white/10 text-white'
                          }`}>
                            {tier.badge}
                          </span>
                        )}
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span className={`font-['Oswald'] font-[700] text-lg ${isSelected ? 'text-white' : 'text-[#A4ACA1]'}`}>
                          {tier.price}
                        </span>
                        <span className="font-mono text-sm text-[#48C765]">€</span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-[#A4ACA1] font-sans mb-3">
                      {tier.tagline}
                    </p>

                    {/* Metadata Row */}
                    <div className="flex items-center gap-2 font-mono text-[11px] text-[#A4ACA1] uppercase tracking-wider">
                      <span className={isSelected ? 'text-white' : ''}>{tier.turnaround}</span>
                      <span className="w-1 h-1 rounded-none bg-[#5B6154] mx-1" />
                      <span>{language === 'es' ? `hasta ${tier.maxValue} por carta` : `up to ${tier.maxValue} per card`}</span>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Info Box & Continue Button */}
        <div className="mt-8 flex flex-col gap-8">
          
          <div className="bg-[#454545] border border-white/[0.06] border-l-4 border-l-[#48C765] p-5 rounded-r-lg shadow-lg">
            <p className="font-sans text-sm text-[#A2B5A5]">
              <strong className="text-white font-semibold">{language === 'es' ? 'Valor declarado. ' : 'Declared value. '}</strong>
              {language === 'es' 
                ? 'Cada nivel tiene un tope de valor por carta. Si alguna lo supera, tendrás que subirla al servicio siguiente; es lo que determina la cobertura del seguro.'
                : 'Each tier has a maximum value limit per card. If a card exceeds this, it must be bumped to the next tier; this determines insurance coverage.'}
            </p>
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => onNavigate && onNavigate('/submit')}
              className="bg-[#3A9F50] hover:bg-[#48C765] text-white px-10 py-3 rounded text-sm font-bold tracking-widest uppercase transition-colors shadow-lg shadow-[#48C765]/20"
            >
              {language === 'es' ? 'CONTINUAR' : 'CONTINUE'}
            </button>
          </div>
          
        </div>

      </div>
    </section>
  );
};
