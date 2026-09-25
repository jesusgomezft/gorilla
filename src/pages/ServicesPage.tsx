import React from 'react';
import { useLanguage } from '../context/LanguageContext';

interface ServicesPageProps {
  onNavigate: (path: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigate }) => {
  const { t, language } = useLanguage();

  const tiers = [
    {
      id: 'regular',
      name: language === 'es' ? 'Collector Regular' : 'Collector Regular',
      tagline: language === 'es'
        ? 'Diseñado para sets modernos de expansión, colecciones personales y envíos por volumen.'
        : 'Engineered for modern sets, expansion binders, and personal collections.',
      price: '15',
      turnaround: language === 'es' ? '20 Días Laborables' : '20 Business Days',
      maxValue: '€250',
      badge: null,
      featured: false,
      features: [
        t('pricing.feat.slab'),
        t('pricing.feat.nfc'),
        t('pricing.feat.insurance'),
        language === 'es' ? 'Centrado láser automatizado' : 'Automated laser centering',
        language === 'es' ? 'Escaneo digital de alta resolución' : 'High-resolution digital scan'
      ]
    },
    {
      id: 'standard',
      name: language === 'es' ? 'Precision Standard' : 'Precision Standard',
      tagline: language === 'es'
        ? 'El estándar recomendado para cartas de valor medio y piezas emblemáticas.'
        : 'The recommended standard for mid-to-high value cards and iconic holos.',
      price: '28',
      turnaround: language === 'es' ? '10 Días Laborables' : '10 Business Days',
      maxValue: '€1.000',
      badge: t('pricing.badgePopular'),
      featured: true,
      features: [
        t('pricing.feat.subgrades'),
        t('pricing.feat.scans'),
        t('pricing.feat.slab'),
        t('pricing.feat.nfc'),
        t('pricing.feat.insurance')
      ]
    },
    {
      id: 'express',
      name: language === 'es' ? 'Priority Express' : 'Priority Express',
      tagline: language === 'es'
        ? 'Procesamiento acelerado en cola preferente para torneos y grading de alta demanda.'
        : 'Accelerated queue in high-security vault for tournaments and urgent market liquidity.',
      price: '65',
      turnaround: language === 'es' ? '5 Días Laborables' : '5 Business Days',
      maxValue: '€5.000',
      badge: language === 'es' ? 'ALTA PRIORIDAD' : 'PRIORITY QUEUE',
      featured: false,
      features: [
        t('pricing.feat.subgrades'),
        t('pricing.feat.scans'),
        t('pricing.feat.slab'),
        t('pricing.feat.priority'),
        t('pricing.feat.insurance')
      ]
    },
    {
      id: 'walkthrough',
      name: language === 'es' ? 'Master Walk-Through' : 'Master Walk-Through',
      tagline: language === 'es'
        ? 'Tratamiento exclusivo de guante blanco para piezas históricas y vintage grails.'
        : 'Exclusive white-glove protocol for historic vintage grails and six-figure holy grails.',
      price: '140',
      turnaround: language === 'es' ? '48 Horas / Show Drop-Off' : '48 Hours / Show Drop-Off',
      maxValue: '€25.000',
      badge: t('pricing.badgeVip'),
      featured: false,
      features: [
        t('pricing.feat.dualAudit'),
        t('pricing.feat.subgrades'),
        t('pricing.feat.scans'),
        t('pricing.feat.slab'),
        language === 'es' ? 'Estuche blindado de transporte incluido' : 'Reinforced armored vault transport case'
      ]
    }
  ];

  const tiersWithTheme = tiers.map(t => {
    switch(t.id) {
      case 'regular': return { ...t, color: '#8CA5B8', shortName: 'REGULAR' };
      case 'standard': return { ...t, color: '#48C765', shortName: 'STANDARD' };
      case 'express': return { ...t, color: '#F97316', shortName: 'EXPRESS' };
      case 'walkthrough': return { ...t, color: '#D4AF37', shortName: 'MASTER' };
      default: return { ...t, color: '#48C765', shortName: 'TIER' };
    }
  });

  const comparisonRows = [
    {
      feature: language === 'es' ? 'Centrado por Calibre Láser (0.01 mm)' : 'Laser Caliper Centering (0.01mm)',
      regular: true, standard: true, express: true, walkthrough: true
    },
    {
      feature: language === 'es' ? '4 Sub-grados en décimas (Centrado, Esquinas, Bordes, Superficie)' : '4-Quadrant Subgrades (0.1 decimal scale)',
      regular: false, standard: true, express: true, walkthrough: true
    },
    {
      feature: language === 'es' ? 'Mapeo microscópico de defectos a 40x' : '40x Darkfield microscopic defect mapping',
      regular: false, standard: true, express: true, walkthrough: true
    },
    {
      feature: language === 'es' ? 'Encapsulado sónico hermético a 35 kHz (Acrílico UV 99.4%)' : '35kHz Ultrasonic Hermetic Seal (99.4% UV Acrylic)',
      regular: true, standard: true, express: true, walkthrough: true
    },
    {
      feature: language === 'es' ? 'Chip Criptográfico NFC con enlace al Registro Europeo' : 'Cryptographic NFC chip linked to European Registry',
      regular: true, standard: true, express: true, walkthrough: true
    },
    {
      feature: language === 'es' ? 'Cola preferente en cámara acorazada climatizada' : 'Priority queue in climate-controlled vault',
      regular: false, standard: false, express: true, walkthrough: true
    },
    {
      feature: language === 'es' ? 'Doble peritaje independiente por Conservador Jefe' : 'Independent dual audit by Senior Conservator',
      regular: false, standard: false, express: false, walkthrough: true
    },
    {
      feature: language === 'es' ? 'Seguro de transporte a todo riesgo incluido' : 'Full replacement transit insurance included',
      regular: true, standard: true, express: true, walkthrough: true
    }
  ];

  return (
    <div className="w-full min-h-screen bg-[#454545] text-white py-16 px-6 lg:px-12 select-none">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Header Banner */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-none bg-white/[0.04] border border-white/10 text-[#48C765] font-mono text-[11px] font-bold tracking-[0.25em] uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-none bg-[#48C765]" />
            <span>{t('pricing.kicker')}</span>
          </div>

          <h1 className="font-['Oswald'] font-[700] text-4xl sm:text-5xl text-white uppercase tracking-[0.01em] leading-[0.94] mb-5">
            {language === 'es' ? 'TARIFAS Y NIVELES DE ' : 'GRADING TIERS & '}
            <span className="text-[#48C765]">{language === 'es' ? 'SERVICIO' : 'PRICING'}</span>
          </h1>

          <p className="font-sans text-base text-[#A4ACA1] max-w-2xl mx-auto leading-relaxed font-normal">
            {t('pricing.desc')}
          </p>
        </div>

        {/* 4 Obsidian Tiers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch mb-20">
          {tiersWithTheme.map((tier) => (
            <div
              key={tier.id}
              className={`rounded-2xl flex flex-col justify-between transition-all duration-700 relative group/card cursor-pointer border hover:scale-[1.02] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] overflow-hidden ${
                tier.featured ? 'md:-translate-y-2' : ''
              }`}
              style={{
                background: `linear-gradient(160deg, #161A17 0%, #0A0D0B 100%)`,
                borderColor: `${tier.color}40`,
              }}
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

              <div className="p-7 flex flex-col justify-between h-full relative z-10">
                {/* Badge if present */}
                <div className="h-6 mb-3">
                  {tier.badge && (
                    <span className="inline-block font-mono text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-0.5 rounded-sm shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                      style={{ backgroundColor: tier.featured ? tier.color : 'rgba(255,255,255,0.1)', color: tier.featured ? '#14170F' : '#FFF', borderColor: 'rgba(255,255,255,0.15)', borderWidth: tier.featured ? 0 : 1 }}
                    >
                      {tier.badge}
                    </span>
                  )}
                </div>

              {/* Title & Tagline */}
              <div>
                <h3 className="font-['Oswald'] font-[700] text-lg text-white uppercase tracking-[0.02em] mb-2">
                  {tier.name}
                </h3>
                <p className="text-xs text-[#A4ACA1] font-sans leading-relaxed mb-6 min-h-[48px]">
                  {tier.tagline}
                </p>

                {/* Price Display */}
                <div className="flex items-baseline gap-1.5 pb-6 mb-6 border-b border-white/[0.08]">
                  <span className="font-mono text-xs text-[#A4ACA1] font-semibold">€</span>
                  <span className="font-['Oswald'] font-[700] text-lg text-white tracking-tight">{tier.price}</span>
                  <span className="font-mono text-xs text-[#A4ACA1] ml-1">{t('pricing.cardUnit')}</span>
                </div>

                {/* Key Telemetry Stats */}
                <div className="space-y-3 font-mono text-xs mb-8">
                  <div className="flex items-center justify-between py-1 border-b border-white/[0.04]">
                    <span className="text-[#A4ACA1] text-[11px] uppercase tracking-wider">{t('pricing.turnaroundPrefix')}</span>
                    <span className="text-white font-bold">{tier.turnaround}</span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-white/[0.04]">
                    <span className="text-[#A4ACA1] text-[11px] uppercase tracking-wider">{t('pricing.maxValuePrefix')}</span>
                    <span className="text-[#48C765] font-bold">{tier.maxValue}</span>
                  </div>
                </div>

                {/* Technical Features Checklist */}
                <ul className="space-y-2.5 text-xs text-[#A4ACA1] mb-8 font-sans">
                  {tier.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="text-[#48C765] shrink-0 font-bold mt-0.5">✓</span>
                      <span className="leading-snug">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Action */}
              <button
                onClick={() => onNavigate('/submit')}
                className="w-full py-3.5 px-4 rounded-sm font-mono text-xs font-bold tracking-[0.18em] uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer border"
                style={{
                  backgroundColor: tier.featured ? tier.color : 'rgba(255,255,255,0.06)',
                  borderColor: tier.featured ? tier.color : 'rgba(255,255,255,0.1)',
                  color: tier.featured ? '#14170F' : '#FFF',
                  boxShadow: tier.featured ? `0 4px 20px ${tier.color}40` : 'none'
                }}
              >
                <span>{t('pricing.submitCta')}</span>
                <span className="transition-transform group-hover/card:translate-x-1">→</span>
              </button>
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Technical Comparison Matrix */}
        <div className="rounded-none bg-[#0E130F] border border-white/[0.08] p-8 lg:p-10 mb-20">
          <div className="mb-8">
            <span className="font-mono text-xs font-bold tracking-[0.25em] text-[#48C765] uppercase block mb-2">
              {language === 'es' ? 'AUDITORÍA COMPARATIVA' : 'FEATURE COMPARISON MATRIX'}
            </span>
            <h2 className="font-['Oswald'] font-[700] text-lg text-white uppercase tracking-tight">
              {language === 'es' ? 'Desglose Técnico por Nivel de Graduación' : 'Technical Breakdown by Service Tier'}
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-sans text-xs">
              <thead>
                <tr className="border-b border-white/[0.08] text-mono text-[11px] tracking-wider text-[#A4ACA1] uppercase">
                  <th className="py-4 pr-6 font-semibold">{language === 'es' ? 'Especificación Técnica' : 'Technical Specification'}</th>
                  <th className="py-4 px-4 text-center">Collector</th>
                  <th className="py-4 px-4 text-center text-[#48C765]">Standard</th>
                  <th className="py-4 px-4 text-center">Express</th>
                  <th className="py-4 pl-4 text-center">Walk-Through</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {comparisonRows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 pr-6 text-[#E0E5DC] font-medium">{row.feature}</td>
                    <td className="py-4 px-4 text-center">{row.regular ? <span className="text-[#48C765] font-bold">✓</span> : <span className="text-gray-600">—</span>}</td>
                    <td className="py-4 px-4 text-center">{row.standard ? <span className="text-[#48C765] font-bold">✓</span> : <span className="text-gray-600">—</span>}</td>
                    <td className="py-4 px-4 text-center">{row.express ? <span className="text-[#48C765] font-bold">✓</span> : <span className="text-gray-600">—</span>}</td>
                    <td className="py-4 pl-4 text-center">{row.walkthrough ? <span className="text-[#48C765] font-bold">✓</span> : <span className="text-gray-600">—</span>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* European Customs & Armored Transit Strip */}
        <div className="rounded-none bg-gradient-to-r from-[#121E15] via-[#0E1611] to-[#121E15] border border-[#48C765]/30 p-8 lg:p-12 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl">
            <span className="font-mono text-xs font-bold tracking-[0.25em] text-[#48C765] uppercase mb-2 block">
              {language === 'es' ? 'GARANTÍA DE TRANSPORTE Y PROPIEDAD' : 'CHAIN OF CUSTODY GUARANTEE'}
            </span>
            <h3 className="font-['Oswald'] font-[700] text-lg text-white uppercase tracking-tight mb-3">
              {language === 'es' 
                ? 'Protección Integral Dentro del Espacio Económico Europeo' 
                : 'Comprehensive Protection Across the European Economic Area'}
            </h3>
            <p className="font-sans text-xs sm:text-sm text-[#A4ACA1] leading-relaxed">
              {language === 'es'
                ? 'Todos los envíos se gestionan mediante contratos directos con mensajería blindada (GLS Express / DHL Express) con firma obligatoria, seguro de reposición del 100% y sin intermediarios aduaneros.'
                : 'All shipments are managed under direct contracts with certified armored carriers (GLS / DHL Express) featuring mandatory signature, 100% replacement insurance, and zero customs paperwork.'}
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-4">
            <button
              onClick={() => onNavigate('/submit')}
              className="px-8 py-4 rounded-none bg-[#48C765] hover:bg-[#38B554] text-[#14170F] font-mono text-xs font-bold tracking-[0.2em] uppercase transition-all shadow-[0_4px_20px_rgba(72,199,101,0.35)] cursor-pointer"
            >
              {language === 'es' ? 'INICIAR SOLICITUD AHORA' : 'START SUBMISSION NOW'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
