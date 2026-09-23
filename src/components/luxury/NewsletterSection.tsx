import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';

export const NewsletterSection: React.FC = () => {
  const { language } = useLanguage();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <section className="w-full bg-[#454545] py-20 px-6 lg:px-12 border-b border-white/[0.04] flex justify-center">
      <div className="w-full max-w-[800px] bg-[#2B302B] border border-[#48C765]/20 p-8 md:p-12 relative overflow-hidden flex flex-col items-center text-center shadow-2xl">
        
        {/* Background Decorative Accents */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#48C765]/5 blur-[60px]" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#48C765]/5 blur-[60px]" />

        <div className="relative z-10 flex flex-col items-center w-full">
          <svg className="w-8 h-8 text-[#48C765] mb-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          
          <h2 className="font-['Oswald'] font-[700] text-3xl md:text-4xl text-white uppercase tracking-wide mb-3">
            {language === 'es' ? 'Únete al Inner Circle' : 'Join the Inner Circle'}
          </h2>
          
          <p className="font-sans text-sm text-[#A4ACA1] mb-8 max-w-[400px]">
            {language === 'es' 
              ? 'Suscríbete para recibir noticias, acceso anticipado a eventos y códigos de descuento exclusivos.' 
              : 'Subscribe to receive news, early access to events, and exclusive discount codes.'}
          </p>

          {subscribed ? (
            <div className="w-full max-w-[400px] py-3.5 px-4 bg-[#48C765]/10 border border-[#48C765]/30 text-[#48C765] font-mono text-xs uppercase tracking-widest">
              {language === 'es' ? '¡Suscripción exitosa!' : 'Successfully subscribed!'}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="w-full max-w-[400px] flex flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                required
                placeholder={language === 'es' ? 'tu@email.com' : 'your@email.com'}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-[#161B16] border border-white/10 focus:border-[#48C765]/50 px-4 py-3.5 text-white text-sm focus:outline-none transition-colors"
              />
              <button 
                type="submit"
                className="px-6 py-3.5 bg-[#48C765] hover:bg-[#3A9F50] text-[#14170F] font-bold text-xs uppercase tracking-widest transition-colors shrink-0"
              >
                {language === 'es' ? 'Suscribir' : 'Subscribe'}
              </button>
            </form>
          )}
          <span className="font-mono text-[9px] text-[#A4ACA1]/60 mt-4 uppercase tracking-widest">
            {language === 'es' ? 'NO ENVIAMOS SPAM. CANCELA CUANDO QUIERAS.' : 'NO SPAM. UNSUBSCRIBE ANYTIME.'}
          </span>
        </div>
      </div>
    </section>
  );
};
