import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

interface FAQTurnaroundPageProps {
  onNavigate: (path: string) => void;
}

export const FAQTurnaroundPage: React.FC<FAQTurnaroundPageProps> = ({ onNavigate }) => {
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
                {language === 'es' ? 'VELOCIDAD DE SERVICIO' : 'SERVICE SPEED'}
              </span>
            </div>

            <h1 className="font-['Oswald'] font-[700] text-4xl sm:text-5xl uppercase tracking-wide leading-[1.1] mb-8">
              {language === 'es' ? '¿Cuánto tardan los tiempos de respuesta (turnaround)?' : 'How long are the turnaround times?'}
            </h1>

            <div className="space-y-6 font-sans text-sm text-[#A4ACA1] leading-relaxed text-justify">
              <p>
                {language === 'es' 
                  ? 'Nuestra promesa de marca es la transparencia. Los tiempos de respuesta estimados son estrictos e inician exclusivamente en el momento en que tu paquete es escaneado y registrado en nuestro sistema (fase de admisión).' 
                  : 'Our brand promise is transparency. Estimated turnaround times are strict and begin exclusively the moment your package is scanned and registered in our system (intake phase).'}
              </p>
              
              <div className="p-6 border border-white/[0.05] bg-white/[0.01]">
                <h3 className="font-bold text-white mb-2 font-['Oswald'] tracking-wide uppercase">{language === 'es' ? '¿Cuándo empieza a contar el tiempo?' : 'When does the clock start?'}</h3>
                <p>
                  {language === 'es' 
                    ? 'El día 1 es el siguiente día hábil después de que tu pedido entra en estado "Recibido". Los envíos en tránsito no cuentan hacia los días de procesamiento.'
                    : 'Day 1 is the next business day after your order enters "Received" status. Transit times do not count towards processing days.'}
                </p>
              </div>

              <div className="p-6 border border-[#48C765]/20 bg-[#48C765]/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-2 h-2 border-l border-b border-[#48C765]" />
                <h3 className="font-bold text-[#48C765] mb-2 font-['Oswald'] tracking-wide uppercase">{language === 'es' ? 'Días Hábiles' : 'Business Days'}</h3>
                <p className="text-[#C2C9C3]">
                  {language === 'es' 
                    ? 'Nuestros tiempos operativos (ej. 48h, 10 días, 20 días) se refieren a días laborables (Lunes a Viernes). No se procesan cartas durante fines de semana ni festivos nacionales.'
                    : 'Our operational times (e.g., 48h, 10 days, 20 days) refer to business days (Monday to Friday). Cards are not processed during weekends or national holidays.'}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative aspect-square lg:aspect-[4/5] bg-[#14170F] overflow-hidden border border-white/[0.05] shadow-2xl"
          >
            <div className="absolute top-4 left-4 w-2 h-2 border-t border-l border-[#48C765] z-20" />
            <div className="absolute bottom-4 right-4 w-2 h-2 border-b border-r border-[#48C765] z-20" />
            
            <img 
              src="/images/step_2_cleanroom.jpg" 
              alt="Tiempos de respuesta"
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
