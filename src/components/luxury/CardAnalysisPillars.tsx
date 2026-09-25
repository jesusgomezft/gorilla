import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

interface CardAnalysisPillarsProps {
  onNavigate?: (path: string) => void;
}

export const CardAnalysisPillars: React.FC<CardAnalysisPillarsProps> = ({ onNavigate }) => {
  const { t } = useLanguage();

  const pillars = [
    {
      id: 'preserve',
      title: t('ref.pillar1.title'),
      desc: t('ref.pillar1.desc'),
      cta: t('ref.pillar1.cta'),
      route: '/how-it-works',
      imgSrc: '/images/preservar.png?v=7',
      imgAlt: 'Preserve - Hermetic acrylic slab protection'
    },
    {
      id: 'authenticate',
      title: t('ref.pillar2.title'),
      desc: t('ref.pillar2.desc'),
      cta: t('ref.pillar2.cta'),
      route: '/verify',
      imgSrc: '/images/autenticar.png?v=7',
      imgAlt: 'Authenticate - Advanced analysis against fakes'
    },
    {
      id: 'understand',
      title: t('ref.pillar3.title'),
      desc: t('ref.pillar3.desc'),
      cta: t('ref.pillar3.cta'),
      route: '/certificates/demo',
      imgSrc: '/images/comprender.png?v=7',
      imgAlt: 'Understand - Clear explanation for every grade'
    },
    {
      id: 'belong',
      title: t('ref.pillar4.title'),
      desc: t('ref.pillar4.desc'),
      cta: t('ref.pillar4.cta'),
      route: '/account',
      imgSrc: '/images/pertenecer.png?v=7',
      imgAlt: 'Belong - A growing community across Europe'
    }
  ];

  return (
    <section id="pillars" className="w-full bg-[#454545] text-white py-20 px-6 lg:px-12 border-b border-white/[0.06] select-none">
      <div className="max-w-[1400px] mx-auto">
        
        {/* 4 Pillars Grid with Real Macro Photography */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((p, idx) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.15, ease: "easeOut" }}
              onClick={() => onNavigate && onNavigate(p.route)}
              className="group bg-[#454545] rounded-none border border-white/[0.08] hover:border-[#48C765]/40 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)] cursor-pointer"
            >
              {/* Macro Photographic Image Area */}
              <div className="w-full h-48 sm:h-52 relative border-b border-white/[0.06] overflow-hidden bg-[#454545]">
                <img 
                  src={p.imgSrc} 
                  alt={p.imgAlt} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Editorial Pillar Body Content */}
              <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="font-display font-[800] text-lg text-white uppercase tracking-tight mb-2 group-hover:text-[#48C765] transition-colors">
                    {p.title}
                  </h3>
                  <p className="font-sans text-xs text-[#A4ACA1] leading-relaxed mb-6 font-normal">
                    {p.desc}
                  </p>
                </div>

                {/* Learn More Action Link */}
                <div className="flex items-center gap-2 font-mono text-[11px] font-bold tracking-[0.16em] text-[#48C765] uppercase group-hover:text-white transition-colors pt-3 border-t border-white/[0.05]">
                  <span>{p.cta}</span>
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
