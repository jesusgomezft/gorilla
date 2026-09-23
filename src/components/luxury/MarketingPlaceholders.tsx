import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

export const TiktokReviewsPlaceholder: React.FC = () => {
  const { language } = useLanguage();
  return (
    <section className="w-full bg-[#454545] py-20 px-6 lg:px-12 border-b border-white/[0.04]">
      <div className="max-w-[1400px] mx-auto flex flex-col items-center text-center">
        <h2 className="font-['Oswald'] font-[700] text-3xl sm:text-4xl text-white uppercase tracking-wide mb-3">
          {language === 'es' ? 'Comunidad en Acción' : 'Community in Action'}
        </h2>
        <p className="font-sans text-sm text-[#A4ACA1] mb-12 max-w-[500px]">
          {language === 'es' 
            ? 'Mira cómo otros coleccionistas confían en nosotros a través de TikTok y Reels.' 
            : 'See how other collectors trust us through TikTok and Reels.'}
        </p>
        
        {/* Placeholder Grid */}
        <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="aspect-[9/16] bg-[#2B302B] border border-white/5 flex flex-col items-center justify-center p-6 opacity-60 hover:opacity-100 transition-opacity">
              <div className="w-12 h-12 rounded-none bg-white/5 flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-[#48C765]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <span className="font-mono text-[10px] text-[#A4ACA1] uppercase tracking-wider">
                Video Space
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const InfluencerTestimonialsPlaceholder: React.FC = () => {
  const { language } = useLanguage();
  return (
    <section className="w-full bg-[#454545] py-20 px-6 lg:px-12 border-b border-white/[0.04]">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center gap-10">
        <div className="md:w-1/3 flex flex-col justify-center">
          <p className="font-mono text-[10px] tracking-[0.2em] text-[#A4ACA1] uppercase mb-4">
            {language === 'es' ? 'VERIFICADO POR EXPERTOS' : 'VERIFIED BY EXPERTS'}
          </p>
          <h2 className="font-['Oswald'] font-[700] text-4xl text-white uppercase leading-[1.1] mb-6">
            {language === 'es' ? 'Lo que dicen los pros' : 'What the pros say'}
          </h2>
          <div className="w-12 h-1 bg-[#48C765]" />
        </div>
        
        <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
          {[1, 2].map((item) => (
            <div key={item} className="bg-[#2B302B] p-8 border border-white/5 flex flex-col gap-4">
              <div className="flex text-[#48C765] gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                ))}
              </div>
              <p className="font-sans text-sm text-[#C2C9C3] italic">
                "Placeholder for a powerful quote from an influencer or professional grader about the speed and quality."
              </p>
              <div className="flex items-center gap-3 mt-4">
                <div className="w-10 h-10 rounded-full bg-white/10" />
                <div className="flex flex-col">
                  <span className="font-sans font-bold text-white text-xs">Name Placeholder</span>
                  <span className="font-mono text-[9px] text-[#A4ACA1] uppercase">Content Creator</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const SocialProofPlaceholder: React.FC = () => {
  return (
    <section className="w-full bg-[#454545] py-16 px-6 lg:px-12 border-b border-white/[0.04]">
      <div className="max-w-[1400px] mx-auto">
        <div className="w-full h-24 border border-dashed border-white/20 flex items-center justify-center bg-white/[0.01]">
          <span className="font-mono text-xs text-[#A4ACA1] tracking-widest uppercase">
            [ Social Media Widget Placeholder ]
          </span>
        </div>
      </div>
    </section>
  );
};
