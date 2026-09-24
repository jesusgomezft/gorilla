import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

export const TechnologySection: React.FC = () => {
  const { language } = useLanguage();
  const [isVisible, setIsVisible] = React.useState(false);
  const sectionRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  const steps = [
    {
      id: '01',
      title: language === 'es' ? 'SELECCIONA TU SERVICIO' : 'SELECT YOUR SERVICE',
      desc: language === 'es' ? 'Elige la tarifa de graduación para tus cartas.' : 'Choose the grading tier for your cards.'
    },
    {
      id: '02',
      title: language === 'es' ? 'PREPARA TUS CARTAS' : 'PREPARE YOUR CARDS',
      desc: language === 'es' ? 'Empaqueta tus cartas siguiendo nuestras guías de envío.' : 'Pack your cards following our submission guidelines.'
    },
    {
      id: '03',
      title: language === 'es' ? 'ENVÍA O ENTREGA' : 'SHIP OR DROP OFF',
      desc: language === 'es' ? 'Envía tus cartas o usa uno de nuestros eventos de recogida.' : 'Send your cards or use one of our pickup events.'
    },
    {
      id: '04',
      title: language === 'es' ? 'RASTREA TU PEDIDO' : 'TRACK YOUR ORDER',
      desc: language === 'es' ? 'Sigue tu envío a lo largo de todo el proceso.' : 'Follow your submission throughout the process.'
    },
    {
      id: '05',
      title: language === 'es' ? 'RECIBE TUS CARTAS' : 'RECEIVE YOUR GRADED CARDS',
      desc: language === 'es' ? 'Tus cartas regresan autenticadas, graduadas y protegidas.' : 'Your cards return authenticated, graded and protected.'
    }
  ];

  return (
    <section 
      id="how-it-works" 
      ref={sectionRef}
      className="relative w-full text-white overflow-hidden select-none"
    >
      {/* Full Width Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/tecnoSeccion.png?v=7')" }}
      />
      
      {/* Dark overlay to ensure text is readable */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[#454545]/85 lg:hidden" />
        <div className="hidden lg:flex w-full h-full">
          <div className="w-2/5 bg-gradient-to-r from-[#454545] via-[#454545]/90 to-transparent" />
          <div className="w-1/5" />
          <div className="w-2/5 bg-gradient-to-l from-[#454545] via-[#454545]/80 to-transparent" />
        </div>
      </div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-12 py-16 lg:py-24 min-h-[600px] flex items-center">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 w-full items-center">
          
          {/* Left Copy Overlay */}
          <div className={`lg:col-span-5 flex flex-col justify-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="font-mono text-[10px] tracking-[0.2em] text-[#A4ACA1] uppercase mb-4">
              {language === 'es' ? 'EL PROCESO' : 'SUBMISSION PROCESS'}
            </p>
            <h2 className="font-['Oswald'] font-[700] text-4xl sm:text-5xl lg:text-[46px] xl:text-[52px] tracking-[0.01em] text-white uppercase leading-[1.05] mb-5 whitespace-pre-line">
              {language === 'es' ? 'CÓMO FUNCIONA' : 'HOW IT WORKS'}
            </h2>
            <p className="font-sans text-sm sm:text-base text-[#A4ACA1] max-w-[360px] font-normal leading-relaxed mb-8">
              {language === 'es' 
                ? 'Un proceso de envío simple, seguro y transparente. Desde que empaquetas tus cartas hasta que vuelven encapsuladas.' 
                : 'A simple, secure, and transparent submission process. From packing your cards to receiving them fully encapsulated.'}
            </p>
            
            <a
              href="#pricing"
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-none border border-[#48C765] text-[#48C765] hover:bg-[#48C765] hover:text-[#14170F] text-sm font-medium transition-all group w-fit"
            >
              <span>{language === 'es' ? 'Empezar ahora' : 'Start Submission'}</span>
              <svg className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>

          {/* Empty spacer for center image focus */}
          <div className="hidden lg:block lg:col-span-3"></div>

          {/* Right Steps */}
          <div className="lg:col-span-4 flex flex-col justify-center lg:pl-10">
            <div className="flex flex-col border-l border-white/10 overflow-hidden">
              
              {steps.map((step, index) => (
                <div 
                  key={step.id} 
                  className={`flex gap-6 py-5 px-6 border-b border-white/5 relative transition-all duration-1000 ease-out transform ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                  } ${index === 0 ? 'bg-gradient-to-r from-white/[0.02] to-transparent' : 'bg-transparent hover:bg-gradient-to-r hover:from-white/[0.01] hover:to-transparent'}`}
                  style={{ transitionDelay: `${index * 400 + 400}ms` }}
                >
                  <div className={`absolute top-0 left-[-1px] w-[2px] h-full transition-all duration-1000 ${
                    isVisible 
                      ? (index === 0 ? 'bg-gradient-to-b from-[#48C765] to-transparent scale-y-100' : 'bg-transparent hover:bg-[#48C765]/50 scale-y-100')
                      : 'scale-y-0 bg-transparent'
                  }`}></div>
                  <span className="font-mono text-lg text-[#48C765] font-bold">{step.id}</span>
                  <div>
                    <h4 className="font-sans font-bold text-sm tracking-widest text-white uppercase mb-1">{step.title}</h4>
                    <p className="text-xs text-[#A4ACA1]">{step.desc}</p>
                  </div>
                </div>
              ))}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};


