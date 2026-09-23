import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';

export const FAQSection: React.FC = () => {
  const { language } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: language === 'es' ? '¿Cómo preparo mis cartas para enviarlas?' : 'How should I prepare my cards for shipping?',
      a: language === 'es' 
        ? 'Recomendamos usar un penny sleeve dentro de un toploader semirrígido (Card Saver). Evita usar celo o cinta adhesiva. Asegúrate de empacar todo en una caja resistente con plástico de burbujas.'
        : 'We recommend using a penny sleeve inside a semi-rigid toploader (Card Saver). Avoid using tape. Make sure to pack everything in a sturdy box with bubble wrap.'
    },
    {
      q: language === 'es' ? '¿Qué pasa si mi carta supera el valor declarado del nivel elegido?' : 'What if my card exceeds the declared value of the chosen tier?',
      a: language === 'es'
        ? 'Si nuestro equipo determina que el valor de mercado de tu carta excede el límite del servicio contratado, te notificaremos para actualizarla al siguiente nivel. Esto es crucial por motivos de seguro.'
        : 'If our team determines your card\'s market value exceeds the tier limit, we will notify you to upgrade it to the next tier. This is crucial for insurance purposes.'
    },
    {
      q: language === 'es' ? '¿Cuánto tardan los tiempos de respuesta (turnaround)?' : 'How long are the turnaround times?',
      a: language === 'es'
        ? 'El tiempo comienza a contar el día hábil en que procesamos tu paquete en nuestras oficinas, no cuando lo envías. Ofrecemos plazos desde 48 horas hasta 20 días hábiles según el paquete.'
        : 'Turnaround time starts on the business day we process your package at our facility, not when you ship it. We offer timeframes from 48 hours up to 20 business days.'
    },
    {
      q: language === 'es' ? '¿Puedo entregar mis cartas en persona?' : 'Can I drop off my cards in person?',
      a: language === 'es'
        ? 'Sí, organizamos "Pickup Events" regularmente y también contamos con puntos de entrega asociados. Revisa nuestra sección de Eventos para las próximas fechas.'
        : 'Yes, we regularly host "Pickup Events" and have partnered drop-off locations. Check our Events section for upcoming dates.'
    }
  ];

  return (
    <section className="w-full bg-[#454545] py-24 px-6 lg:px-12 border-b border-white/[0.04]">
      <div className="max-w-[1000px] mx-auto flex flex-col md:flex-row gap-12 lg:gap-20">
        
        {/* Left Col: Header */}
        <div className="md:w-1/3 flex flex-col">
          <p className="font-mono text-[10px] tracking-[0.2em] text-[#A4ACA1] uppercase mb-4">
            {language === 'es' ? 'SOPORTE AL CLIENTE' : 'CUSTOMER SUPPORT'}
          </p>
          <h2 className="font-['Oswald'] font-[700] text-4xl text-white uppercase leading-[1.1] mb-6">
            {language === 'es' ? 'Preguntas Frecuentes' : 'Frequently Asked Questions'}
          </h2>
          <p className="font-sans text-sm text-[#C2C9C3] mb-8">
            {language === 'es' 
              ? 'Encuentra respuestas rápidas a las consultas más comunes sobre el proceso de grading y envíos.' 
              : 'Find quick answers to common questions about the grading and shipping process.'}
          </p>
          <button className="text-[#48C765] hover:text-white font-mono text-xs tracking-wider uppercase flex items-center gap-2 transition-colors w-fit">
            <span>{language === 'es' ? 'Ir al Centro de Ayuda' : 'Go to Help Center'}</span>
            <span>→</span>
          </button>
        </div>

        {/* Right Col: Accordion */}
        <div className="md:w-2/3 flex flex-col border-t border-white/10">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className="border-b border-white/10">
                <button 
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full py-6 flex items-center justify-between text-left focus:outline-none group"
                >
                  <span className={`font-sans font-bold text-lg pr-8 transition-colors ${isOpen ? 'text-[#48C765]' : 'text-white group-hover:text-[#48C765]'}`}>
                    {faq.q}
                  </span>
                  <div className={`shrink-0 w-6 h-6 rounded-full border flex items-center justify-center transition-all ${isOpen ? 'border-[#48C765] bg-[#48C765]/10' : 'border-white/20'}`}>
                    <svg className={`w-3 h-3 transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#48C765]' : 'text-white'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-40 opacity-100 pb-6' : 'max-h-0 opacity-0'}`}
                >
                  <p className="font-sans text-[#A4ACA1] text-sm leading-relaxed pr-8">
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
