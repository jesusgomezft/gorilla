import React, { useState } from 'react';
import { MOCK_GRADED_CARDS } from '../../data/mockCards';
import { SlabCard } from '../common/SlabCard';
import { MOCK_SERVICES } from '../../data/mockServices';
import { useLanguage } from '../../context/LanguageContext';
import { 
  Landmark, 
  Sparkles, 
  Shield, 
  Award, 
  ArrowRight, 
  Compass, 
  Gem,
  CheckCircle,
  Eye
} from 'lucide-react';

interface CollectorGalleryHomeProps {
  onNavigate: (path: string) => void;
}

export const CollectorGalleryHome: React.FC<CollectorGalleryHomeProps> = ({ onNavigate }) => {
  const { t } = useLanguage();
  const trophyCard = MOCK_GRADED_CARDS[1]; // Pikachu Illustrator Pristine 10
  const lotusCard = MOCK_GRADED_CARDS[2];  // Black Lotus Alpha
  const [activeExhibition, setActiveExhibition] = useState<'trophy' | 'lotus'>('trophy');

  const currentHeroCard = activeExhibition === 'trophy' ? trophyCard : lotusCard;

  return (
    <div className="space-y-28 pb-28 text-[#141210] gallery-paper-texture">
      
      {/* 1. HERO: The Museum of Collectible Treasures */}
      <section className="relative pt-12 sm:pt-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-none bg-[#E2DDD3]/80 border border-[#C5A880]/40 text-[#141210] font-serif text-xs">
              <Landmark className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>{t('gallery.tag')}</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#141210] tracking-tight leading-[1.12]">
              {t('gallery.heroTitle')} <br />
              <span className="italic font-normal text-stone-700">
                {t('gallery.heroSubtitle')}
              </span>
            </h1>

            <p className="text-base sm:text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed font-sans pt-2">
              {t('gallery.heroDesc')}
            </p>
          </div>

          {/* Centerpiece Hero Showcase */}
          <div className="relative max-w-4xl mx-auto p-7 sm:p-12 rounded-[2rem] bg-white border border-[#E2DDD3] shadow-[0_25px_60px_-15px_rgba(20,18,16,0.12)] flex flex-col md:flex-row items-center gap-8 lg:gap-14">
            
            {/* Card Protagonist */}
            <div className="shrink-0 flex justify-center">
              <SlabCard card={currentHeroCard} size="md" />
            </div>

            {/* Curatorial Card Provenance Plate */}
            <div className="flex-1 space-y-5">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-none bg-[#F2EFE9] text-[#141210] text-xs font-serif font-bold border border-[#E2DDD3]">
                  {t('gallery.plateTitle')}
                </span>
                <span className="font-mono text-xs text-stone-500">
                  REF: {currentHeroCard.certNumber}
                </span>
              </div>

              <h3 className="text-lg sm:text-lg font-serif font-bold text-[#141210]">
                {currentHeroCard.name}
              </h3>

              <div className="p-5 rounded-none bg-[#F8F6F0] border border-[#E2DDD3] font-sans text-xs space-y-2.5 text-stone-800">
                <div className="flex justify-between border-b border-[#E2DDD3] pb-2">
                  <span className="text-stone-500 font-serif">{t('gallery.originalRelease')}</span>
                  <span className="font-bold">{currentHeroCard.year} • {currentHeroCard.set}</span>
                </div>
                <div className="flex justify-between border-b border-[#E2DDD3] pb-2">
                  <span className="text-stone-500 font-serif">{t('gallery.preservationState')}</span>
                  <span className="font-bold text-emerald-800">{currentHeroCard.grade.toFixed(1)} / 10 ({currentHeroCard.gradeLabel})</span>
                </div>
                <div className="flex justify-between border-b border-[#E2DDD3] pb-2">
                  <span className="text-stone-500 font-serif">{t('gallery.archivalValue')}</span>
                  <span className="font-bold font-mono">€{currentHeroCard.declaredValueEur.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500 font-serif">{t('gallery.populationStatus')}</span>
                  <span className="font-mono">{currentHeroCard.population.higherCount === 0 ? 'Top 1 (Ninguna Superior)' : 'Nivel Superior'}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => onNavigate('/submit')}
                  className="px-6 py-3.5 rounded-none bg-[#141210] hover:bg-stone-800 text-white text-xs font-bold shadow-lg flex items-center gap-2 transition-transform hover:-translate-y-0.5"
                >
                  <span>{t('gallery.submitArchive')}</span>
                  <ArrowRight className="w-4 h-4 text-[#C5A880]" />
                </button>
                <button
                  onClick={() => setActiveExhibition(activeExhibition === 'trophy' ? 'lotus' : 'trophy')}
                  className="px-4 py-3.5 rounded-none bg-[#F2EFE9] hover:bg-[#E2DDD3] text-[#141210] text-xs font-semibold border border-[#E2DDD3] transition-colors"
                >
                  {t('gallery.switchHero')} ({activeExhibition === 'trophy' ? 'Lotus' : 'Pikachu'})
                </button>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 2. THE COLLECTOR'S JOURNEY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-2">
          <span className="text-xs font-serif uppercase tracking-widest text-stone-500 font-bold">
            El Proceso Archivístico
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#141210]">
            {t('gallery.journeyTitle')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="p-8 rounded-none bg-white border border-[#E2DDD3] shadow-md flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-none bg-[#F8F6F0] border border-[#E2DDD3] flex items-center justify-center text-[#C5A880] mb-6">
                <Compass className="w-6 h-6" />
              </div>
              <div className="text-xs font-mono text-stone-400 uppercase tracking-wider mb-1">Fase I</div>
              <h3 className="text-lg font-serif font-bold text-[#141210] mb-3">
                Evaluación Espectroscópica
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed font-sans">
                La espectrometría óptica analiza la densidad del papel y la saturación de tinta, descartando falsificaciones y registrando cada micra de la pieza.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#F2EFE9] text-[11px] font-mono text-emerald-800 font-bold">
              ✓ Verificación no invasiva
            </div>
          </div>

          <div className="p-8 rounded-none bg-white border border-[#E2DDD3] shadow-md flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-none bg-[#F8F6F0] border border-[#E2DDD3] flex items-center justify-center text-emerald-700 mb-6">
                <Shield className="w-6 h-6" />
              </div>
              <div className="text-xs font-mono text-stone-400 uppercase tracking-wider mb-1">Fase II</div>
              <h3 className="text-lg font-serif font-bold text-[#141210] mb-3">
                Sellado Hermético UV
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed font-sans">
                Acrílico al 99.4% anti-ultravioleta soldado por ultrasonidos a 35kHz, aislando la carta del oxígeno y la humedad de forma indefinida.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#F2EFE9] text-[11px] font-mono text-emerald-800 font-bold">
              ✓ Acrílico de grado museo
            </div>
          </div>

          <div className="p-8 rounded-none bg-white border border-[#E2DDD3] shadow-md flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-none bg-[#F8F6F0] border border-[#E2DDD3] flex items-center justify-center text-[#141210] mb-6">
                <Gem className="w-6 h-6" />
              </div>
              <div className="text-xs font-mono text-stone-400 uppercase tracking-wider mb-1">Fase III</div>
              <h3 className="text-lg font-serif font-bold text-[#141210] mb-3">
                Registro Criptográfico
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed font-sans">
                Un chip NFC integrado enlaza el slab físico con el expediente digital de procedencia en el registro europeo.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#F2EFE9] text-[11px] font-mono text-emerald-800 font-bold">
              ✓ Registro inmutable
            </div>
          </div>

        </div>
      </section>

      {/* 3. GALLERY PRICING */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-none bg-white border border-[#E2DDD3] shadow-xl">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="text-xs font-serif uppercase tracking-widest text-stone-500 font-bold">
              Servicios Curados
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#141210]">
              Tarifas de Preservación Archivística
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {MOCK_SERVICES.slice(0, 3).map((tier) => (
              <div
                key={tier.id}
                className="p-7 rounded-none bg-[#F8F6F0] border border-[#E2DDD3] hover:border-stone-400 transition-all flex flex-col justify-between"
              >
                <div>
                  <h4 className="font-serif font-bold text-lg text-[#141210] mb-1">{tier.name}</h4>
                  <p className="text-xs text-stone-500 mb-6">{tier.tagline}</p>
                  
                  <div className="text-lg font-serif font-bold text-[#141210] mb-6 pb-6 border-b border-[#E2DDD3]">
                    €{tier.priceEur.toFixed(2)}
                  </div>

                  <ul className="space-y-2.5 text-xs text-stone-700 mb-6 font-sans">
                    <li className="flex items-center gap-2">✓ Plazo de Entrega: {tier.turnaroundLabel}</li>
                    <li className="flex items-center gap-2">✓ Slab archivístico & sello de oro</li>
                    <li className="flex items-center gap-2">✓ Custodia asegurada en España/Portugal</li>
                  </ul>
                </div>

                <button
                  onClick={() => onNavigate('/submit')}
                  className="w-full py-3 rounded-none bg-[#141210] hover:bg-stone-800 text-white text-xs font-bold transition-colors"
                >
                  Seleccionar Servicio
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};
