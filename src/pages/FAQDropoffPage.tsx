import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

interface FAQDropoffPageProps {
  onNavigate: (path: string) => void;
}

export const FAQDropoffPage: React.FC<FAQDropoffPageProps> = ({ onNavigate }) => {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-[#14170F] text-white pt-24 pb-24 px-6 lg:px-12 selection:bg-[#48C765] selection:text-black relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#48C765]/[0.03] blur-[150px] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto relative z-10">
        <button 
          onClick={() => onNavigate('/')}
          className="mb-12 text-[#A4ACA1] hover:text-white flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest transition-colors"
        >
          <ArrowLeft size={14} />
          {language === 'es' ? 'Volver al Inicio' : 'Back to Home'}
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Text */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <span className="w-8 h-[1px] bg-[#48C765]"></span>
              <span className="font-mono text-[10px] font-bold tracking-[0.25em] text-[#48C765] uppercase">
                {language === 'es' ? 'SERVICIOS LOCALES' : 'LOCAL SERVICES'}
              </span>
            </div>

            <h1 className="font-['Nunito',sans-serif] font-[900] text-3xl sm:text-5xl uppercase tracking-normal leading-[1.05] mb-8 text-white">
              {language === 'es' ? '¿Puedo entregar mis cartas en persona?' : 'Can I drop off my cards in person?'}
            </h1>

            <div className="space-y-6 font-sans text-sm text-[#A4ACA1] leading-relaxed text-justify">
              <p>
                {language === 'es' 
                  ? 'Entendemos el valor emocional y económico de tu colección. Por eso, además del envío postal asegurado, ofrecemos la posibilidad de entregar tus cartas en mano.' 
                  : 'We understand the emotional and financial value of your collection. That\'s why, in addition to insured postal shipping, we offer the option to drop off your cards in person.'}
              </p>
              
              <div className="p-6 border border-white/[0.05] bg-white/[0.01]">
                <h3 className="font-[900] text-white mb-2 font-['Nunito',sans-serif] tracking-normal uppercase text-base sm:text-lg">{language === 'es' ? 'Pickup Events Oficiales' : 'Official Pickup Events'}</h3>
                <p>
                  {language === 'es' 
                    ? 'Organizamos eventos regulares en diferentes ciudades donde nuestro equipo recoge tus envíos directamente. Esto elimina el riesgo del transporte postal.'
                    : 'We host regular events in various cities where our team collects your submissions directly. This eliminates postal transit risk.'}
                </p>
              </div>

              <div className="p-6 border border-white/[0.05] bg-white/[0.01]">
                <h3 className="font-[900] text-white mb-2 font-['Nunito',sans-serif] tracking-normal uppercase text-base sm:text-lg">{language === 'es' ? 'Partners y Tiendas' : 'Partners & Stores'}</h3>
                <p>
                  {language === 'es' 
                    ? 'Contamos con una red selecta de tiendas especializadas (Partners) donde puedes dejar tus paquetes para que sean gestionados de forma segura.'
                    : 'We have a select network of specialized stores (Partners) where you can securely drop off your packages.'}
                </p>
              </div>

              <button 
                onClick={() => onNavigate('/')}
                className="mt-6 px-8 py-3.5 bg-transparent border border-white/[0.05] hover:border-[#48C765] hover:text-[#48C765] text-white font-mono text-[10px] font-bold tracking-[0.2em] uppercase transition-all flex items-center justify-center gap-2"
              >
                <span>{language === 'es' ? 'Ver Calendario de Eventos' : 'View Events Calendar'}</span>
                <span>→</span>
              </button>
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative aspect-square lg:aspect-[4/5] bg-[#14170F] overflow-hidden border border-white/[0.05] shadow-2xl"
          >
            <img 
              src="/images/step_1_vault.jpg" 
              alt="Dropoff en persona"
              className="absolute inset-0 w-full h-full object-cover mix-blend-luminosity opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#14170F] via-transparent to-[#48C765]/10 mix-blend-overlay z-10" />
            <div className="absolute inset-0 bg-[#48C765]/5 z-10" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};
