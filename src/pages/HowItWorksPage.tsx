import React from 'react';
import { useLanguage } from '../context/LanguageContext';

interface HowItWorksPageProps {
  onNavigate: (path: string) => void;
}

export const HowItWorksPage: React.FC<HowItWorksPageProps> = ({ onNavigate }) => {
  const { t, language } = useLanguage();

  const steps = [
    {
      num: t('how.step1.num'),
      title: t('how.step1.title'),
      sub: t('how.step1.sub'),
      desc: t('how.step1.desc'),
      tag: language === 'es' ? 'FASE 01 · CÁMARA ACORAZADA' : 'PHASE 01 · SECURE VAULT'
    },
    {
      num: t('how.step2.num'),
      title: t('how.step2.title'),
      sub: t('how.step2.sub'),
      desc: t('how.step2.desc'),
      tag: language === 'es' ? 'FASE 02 · SALA LIMPIA ISO' : 'PHASE 02 · ISO CLEANROOM'
    },
    {
      num: t('how.step3.num'),
      title: t('how.step3.title'),
      sub: t('how.step3.sub'),
      desc: t('how.step3.desc'),
      tag: language === 'es' ? 'FASE 03 · ESPECTROMETRÍA' : 'PHASE 03 · SPECTROMETRY'
    },
    {
      num: t('how.step4.num'),
      title: t('how.step4.title'),
      sub: t('how.step4.sub'),
      desc: t('how.step4.desc'),
      tag: language === 'es' ? 'FASE 04 · CALIBRE LÁSER' : 'PHASE 04 · LASER CALIPER'
    },
    {
      num: t('how.step5.num'),
      title: t('how.step5.title'),
      sub: t('how.step5.sub'),
      desc: t('how.step5.desc'),
      tag: language === 'es' ? 'FASE 05 · CAMPO OSCURO 40X' : 'PHASE 05 · 40X DARKFIELD'
    },
    {
      num: t('how.step6.num'),
      title: t('how.step6.title'),
      sub: t('how.step6.sub'),
      desc: t('how.step6.desc'),
      tag: language === 'es' ? 'FASE 06 · FUSIÓN 35 KHZ' : 'PHASE 06 · 35 KHZ FUSION'
    }
  ];

  const labSpecs = [
    {
      title: language === 'es' ? 'Ambiente Sala Limpia ISO 7' : 'ISO Class 7 Cleanroom Environment',
      spec: '< 10.000 part/m³',
      desc: language === 'es' 
        ? 'Filtración de aire continua HEPA 99.97% para evitar que partículas microscópicas de polvo queden atrapadas en el slab.'
        : 'Continuous 99.97% HEPA air filtration ensuring zero airborne particulates are trapped inside the sealed holder.'
    },
    {
      title: language === 'es' ? 'Acrílico Óptico Virgen Libre de Ácido' : 'Virgin Optical-Grade Acid-Free Acrylic',
      spec: '99.4% Filtro UV',
      desc: language === 'es'
        ? 'Polímero numismático puro sin plastificantes volátiles ni vapores químicos que puedan desteñir la tinta original.'
        : 'Pure archival polymer formulated without volatile plasticizers or harmful vapors that degrade original cardstock.'
    },
    {
      title: language === 'es' ? 'Calibre Láser Multieje Submilimétrico' : 'Sub-Millimeter Multi-Axis Laser Caliper',
      spec: '±0.01 mm',
      desc: language === 'es'
        ? 'Medición geométrica automatizada de márgenes frontales y posteriores con cálculo de ratio de centrado exacto.'
        : 'Automated geometric scanning of front and back margins calculating mathematically accurate border ratios.'
    },
    {
      title: language === 'es' ? 'Soldadura Molecular Ultrasónica' : 'Ultrasonic Molecular Hermetic Fusion',
      spec: '35 kHz',
      desc: language === 'es'
        ? 'Sellado molecular sin pegamentos químicos ni solventes orgánicos. Creación de una barrera hermética contra humedad.'
        : 'Adhesive-free molecular fusion eliminating chemical glues. Yields a permanent hermetic barrier against moisture.'
    }
  ];

  return (
    <div className="w-full min-h-screen bg-[#454545] text-white py-16 px-6 lg:px-12 select-none">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Top Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-none bg-white/[0.04] border border-white/10 text-[#48C765] font-mono text-[11px] font-bold tracking-[0.25em] uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-none bg-[#48C765]" />
            <span>{t('how.kicker')}</span>
          </div>

          <h1 className="font-['Oswald'] font-[700] text-4xl sm:text-5xl text-white uppercase tracking-[0.01em] leading-[0.94] mb-5">
            {language === 'es' ? 'EL VIAJE DESDE CARTA CRUDA HASTA ' : 'THE JOURNEY FROM RAW CARD TO '}
            <span className="text-[#48C765]">{language === 'es' ? 'SLAB CERTIFICADO' : 'CERTIFIED SLAB'}</span>
          </h1>

          <p className="font-sans text-base text-[#A4ACA1] max-w-2xl mx-auto leading-relaxed font-normal">
            {t('how.desc')}
          </p>
        </div>

        {/* 6-Step Visual Timeline */}
        <div className="space-y-6 mb-20">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="p-8 rounded-none bg-[#454545] border border-white/[0.08] hover:border-[#48C765]/40 shadow-xl flex flex-col md:flex-row items-start md:items-center gap-8 transition-all duration-300 hover:bg-[#151B16] group"
            >
              {/* Numeric Indicator */}
              <div className="flex items-center gap-4 shrink-0">
                <span className="font-['Oswald'] font-[700] text-lg text-[#48C765] tracking-tight group-hover:scale-105 transition-transform">
                  {step.num}
                </span>
                <span className="font-mono text-[10px] font-bold tracking-[0.2em] text-[#A4ACA1] uppercase px-3 py-1 rounded bg-white/[0.04] border border-white/5">
                  {step.tag}
                </span>
              </div>

              {/* Text Info */}
              <div className="flex-1 space-y-1.5">
                <h3 className="font-['Oswald'] font-[700] text-lg text-white uppercase tracking-[0.01em] group-hover:text-[#48C765] transition-colors">
                  {step.title}
                </h3>
                <h4 className="font-mono text-xs text-[#A2B5A5] font-medium leading-snug">
                  {step.sub}
                </h4>
                <p className="text-xs sm:text-sm text-[#A4ACA1] leading-relaxed font-normal pt-1">
                  {step.desc}
                </p>
              </div>

              {/* Telemetry Badge */}
              <div className="shrink-0 self-center md:self-auto hidden lg:flex flex-col items-end text-right font-mono text-[10px] text-[#A4ACA1] border-l border-white/[0.06] pl-6 py-2">
                <span className="text-[#A4ACA1] font-semibold">{language === 'es' ? 'AUDITORÍA ÓPTICA' : 'OPTICAL AUDIT'}</span>
                <span className="text-[#48C765] font-bold">100% REPRODUCIBLE</span>
              </div>
            </div>
          ))}
        </div>

        {/* Technical Lab Specifications Matrix */}
        <div className="rounded-none bg-[#0E130F] border border-white/[0.08] p-8 lg:p-12 mb-20">
          <div className="mb-10">
            <span className="font-mono text-xs font-bold tracking-[0.25em] text-[#48C765] uppercase block mb-2">
              {language === 'es' ? 'ESPECIFICACIONES DEL LABORATORIO' : 'LABORATORY SPECIFICATIONS'}
            </span>
            <h2 className="font-['Oswald'] font-[700] text-3xl sm:text-4xl text-white uppercase tracking-tight">
              {language === 'es' ? 'Ingeniería y Parámetros Numismáticos' : 'Engineering & Numismatic Parameters'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {labSpecs.map((spec, idx) => (
              <div key={idx} className="bg-[#454545] p-6 rounded-none border border-white/[0.05] flex flex-col justify-between">
                <div>
                  <span className="font-mono text-xs text-[#48C765] font-bold block mb-2 tracking-wider">
                    {spec.spec}
                  </span>
                  <h4 className="font-['Oswald'] font-[700] text-lg text-white uppercase tracking-wide mb-3">
                    {spec.title}
                  </h4>
                  <p className="text-xs text-[#A4ACA1] leading-relaxed">
                    {spec.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Institutional Mission & Founders Ethos */}
        <div className="rounded-none bg-gradient-to-r from-[#121E15] via-[#0E1611] to-[#121E15] border border-[#48C765]/30 p-8 lg:p-12 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl">
            <span className="font-mono text-xs font-bold tracking-[0.25em] text-[#48C765] uppercase mb-2 block">
              {language === 'es' ? 'MISIÓN INSTITUCIONAL' : 'INSTITUTIONAL ETHOS'}
            </span>
            <h3 className="font-['Oswald'] font-[700] text-lg text-white uppercase tracking-tight mb-3">
              {language === 'es' 
                ? 'Nuestra Misión: Erradicar la Subjetividad Ocular en Europa' 
                : 'Our Mission: Eliminating Ocular Subjectivity in Europe'}
            </h3>
            <p className="font-sans text-xs sm:text-sm text-[#A4ACA1] leading-relaxed mb-4">
              {language === 'es'
                ? 'Durante décadas, los coleccionistas europeos han dependido de empresas transatlánticas con aranceles aduaneros abusivos, meses de espera y criterios de graduación opacos e irreproducibles. Gorilla Grading nace para ofrecer la certeza científica de la óptica de precisión con soberanía logística europea.'
                : 'For decades, European collectors have endured punitive customs duties, months of carrier delays, and opaque, subjective grading criteria. Gorilla Grading was founded to deliver scientific certainty via optical metrology backed by seamless European logistics.'}
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-4">
            <button
              onClick={() => onNavigate('/services')}
              className="px-6 py-4 rounded-none border border-white/20 hover:border-[#48C765] text-white hover:text-[#48C765] font-mono text-xs font-bold tracking-[0.2em] uppercase transition-all bg-white/[0.03] hover:bg-[#48C765]/10 cursor-pointer"
            >
              {language === 'es' ? 'VER TARIFAS' : 'VIEW PRICING'}
            </button>
            <button
              onClick={() => onNavigate('/submit')}
              className="px-8 py-4 rounded-none bg-[#48C765] hover:bg-[#38B554] text-[#14170F] font-mono text-xs font-bold tracking-[0.2em] uppercase transition-all shadow-[0_4px_20px_rgba(72,199,101,0.35)] cursor-pointer"
            >
              {language === 'es' ? 'ENVIAR CARTAS' : 'SUBMIT CARDS'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
