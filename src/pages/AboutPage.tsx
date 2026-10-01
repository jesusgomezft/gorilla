import React from 'react';
import { CompanyStorySection } from '../components/luxury/CompanyStorySection';
import { MissionBanner } from '../components/luxury/MissionBanner';
import { useLanguage } from '../context/LanguageContext';
import { ArrowLeft, ShieldCheck, Microscope, Award, Users } from 'lucide-react';

interface AboutPageProps {
  onNavigate?: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const { language } = useLanguage();

  return (
    <div className="w-full min-h-screen bg-[#454545] text-white flex flex-col selection:bg-[#48C765] selection:text-black">
      
      {/* Top Breadcrumb bar */}
      <div className="max-w-[1200px] w-full mx-auto px-6 lg:px-12 pt-10">
        <button 
          onClick={() => onNavigate && onNavigate('/')}
          className="text-[#A4ACA1] hover:text-white flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest transition-colors w-fit"
        >
          <ArrowLeft size={14} />
          {language === 'es' ? 'Volver al Inicio' : 'Back to Home'}
        </button>
      </div>

      {/* 1. Main Story Section */}
      <CompanyStorySection />

      {/* 2. Deep Dive: Precision, Philosophy & Laboratory Ethics */}
      <section className="w-full bg-[#2B302B] py-20 px-6 lg:px-12 border-y border-white/[0.06] relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto relative z-10">
          
          <div className="flex flex-col mb-16 text-center items-center">
            <span className="font-mono text-[10px] tracking-[0.25em] text-[#48C765] uppercase font-bold mb-3">
              {language === 'es' ? 'FILOSOFÍA & VALORES' : 'PHILOSOPHY & VALUES'}
            </span>
            <h2 className="font-['Oswald'] font-[700] text-3xl sm:text-5xl text-white uppercase tracking-wide leading-tight mb-6">
              {language === 'es' ? 'Nuestros Compromisos Fundamentales' : 'Our Fundamental Commitments'}
            </h2>
            <p className="font-sans text-sm sm:text-base text-[#A4ACA1] max-w-2xl text-justify leading-relaxed">
              {language === 'es'
                ? 'En Gorilla Grading entendemos que cada carta representa una inversión, una memoria o una joya histórica de colección. No aplicamos atajos ni juicios subjetivos: cada veredicto está respaldado por trazabilidad matemática y los más altos estándares éticos del mercado.'
                : 'At Gorilla Grading, we understand that every card represents an investment, a cherished memory, or a historic jewel of collecting. We apply no shortcuts and no subjective bias: each verdict is supported by mathematical traceability and the highest ethical standards in the market.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Box 1 */}
            <div className="bg-[#161B16] border border-white/[0.05] p-8 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-none bg-[#48C765]/10 border border-[#48C765]/30 flex items-center justify-center text-[#48C765]">
                  <Microscope size={20} />
                </div>
                <h3 className="font-['Oswald'] text-xl uppercase tracking-wide text-white">
                  {language === 'es' ? 'Precisión Nanométrica Imparcial' : 'Impartial Nanometric Precision'}
                </h3>
              </div>
              <p className="font-sans text-xs sm:text-sm text-[#A4ACA1] leading-relaxed text-justify">
                {language === 'es'
                  ? 'Eliminamos la fatiga del ojo humano mediante sistemas de visión computacional y fotogrametría de ultra-alta definición. Las dimensiones, el centrado exacto y la textura microscópica se calculan con tolerancias inferiores a 0.01 mm, garantizando que una carta calificada hoy reciba exactamente la misma nota si se evaluase dentro de diez años.'
                  : 'We eliminate human grader fatigue through advanced computer vision and ultra-high-definition photogrammetry. Centering ratios, physical dimensions, and microscopic surface textures are computed with tolerances under 0.01 mm, guaranteeing consistent grading repeatability.'}
              </p>
            </div>

            {/* Box 2 */}
            <div className="bg-[#161B16] border border-white/[0.05] p-8 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-none bg-[#48C765]/10 border border-[#48C765]/30 flex items-center justify-center text-[#48C765]">
                  <ShieldCheck size={20} />
                </div>
                <h3 className="font-['Oswald'] text-xl uppercase tracking-wide text-white">
                  {language === 'es' ? 'Cadena de Custodia Inviolable' : 'Tamper-Evident Chain of Custody'}
                </h3>
              </div>
              <p className="font-sans text-xs sm:text-sm text-[#A4ACA1] leading-relaxed text-justify">
                {language === 'es'
                  ? 'Desde que un paquete cruza el umbral de nuestras instalaciones acorazadas, se somete a un registro continuo mediante circuito cerrado con doble verificación de precinto. La encapsulación final mediante soldadura sónica de policarbonato con filtro UV asegura protección química, física y atmosférica de por vida.'
                  : 'From the moment a parcel enters our vault perimeter, it is tracked via continuous CCTV and dual-operator intake scanning. Final ultrasonic ballistic polycarbonate encapsulation seals the card permanently against atmospheric degradation and UV light.'}
              </p>
            </div>

            {/* Box 3 */}
            <div className="bg-[#161B16] border border-white/[0.05] p-8 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-none bg-[#48C765]/10 border border-[#48C765]/30 flex items-center justify-center text-[#48C765]">
                  <Award size={20} />
                </div>
                <h3 className="font-['Oswald'] text-xl uppercase tracking-wide text-white">
                  {language === 'es' ? 'Transparencia de Datos en Blockchain' : 'Verifiable Public Cert Registry'}
                </h3>
              </div>
              <p className="font-sans text-xs sm:text-sm text-[#A4ACA1] leading-relaxed text-justify">
                {language === 'es'
                  ? 'Cada certificación incluye un código QR único grabado en láser sobre placa metálica que da acceso instantáneo al informe completo de inspección: imágenes microscópicas en 12.000 DPI, desglose de subnotas y hash criptográfico de autenticidad accesible para cualquier comprador futuro en el mercado secundario.'
                  : 'Each certified holder features an engraved QR code linking directly to our public database: 12,000 DPI microscopic imagery, four-point sub-grade breakdowns, and cryptographic verification hashes readily accessible to any collector or marketplace buyer worldwide.'}
              </p>
            </div>

            {/* Box 4 */}
            <div className="bg-[#161B16] border border-white/[0.05] p-8 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-none bg-[#48C765]/10 border border-[#48C765]/30 flex items-center justify-center text-[#48C765]">
                  <Users size={20} />
                </div>
                <h3 className="font-['Oswald'] text-xl uppercase tracking-wide text-white">
                  {language === 'es' ? 'Construido por Coleccionistas Reales' : 'Built by Passionate Collectors'}
                </h3>
              </div>
              <p className="font-sans text-xs sm:text-sm text-[#A4ACA1] leading-relaxed text-justify">
                {language === 'es'
                  ? 'Nuestra sede y laboratorio nacen de la comunidad. No tratamos las cartas como meros activos financieros sin contexto: conocemos la historia de cada expansión, cada holo bleed y cada detalle de impresión, respetando el patrimonio cultural de los juegos de cartas coleccionables.'
                  : 'Our headquarters and laboratories were founded by collectors, for collectors. We do not view cards merely as speculative tokens: we know the history of print runs, foil patterns, and rarity nuances, honoring the cultural legacy of trading card games.'}
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 3. Mission Banner */}
      <MissionBanner onNavigate={onNavigate} />

      {/* 4. Quick Links Navigation */}
      <section className="w-full bg-[#454545] py-16 px-6 lg:px-12 border-t border-white/[0.04]">
        <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="font-sans text-xs text-[#A4ACA1] text-justify max-w-lg">
            {language === 'es'
              ? '¿Tienes dudas sobre cómo enviar tus cartas o necesitas hablar con nuestro equipo técnico? Explora nuestro centro de preguntas frecuentes o escríbenos directamente.'
              : 'Have questions about submitting or want to consult our technical team? Explore our FAQ hub or reach out via our contact form.'}
          </p>
          <div className="flex items-center gap-4 shrink-0">
            <button
              onClick={() => onNavigate && onNavigate('/faq')}
              className="px-6 py-3 bg-[#161B16] hover:bg-white/10 text-white font-mono text-xs uppercase tracking-widest border border-white/15 transition-all"
            >
              {language === 'es' ? 'Preguntas Frecuentes' : 'FAQ Hub'}
            </button>
            <button
              onClick={() => onNavigate && onNavigate('/contact')}
              className="px-6 py-3 bg-[#48C765] hover:bg-[#3A9F50] text-[#14170F] font-mono text-xs font-bold uppercase tracking-widest transition-all shadow-[0_0_15px_rgba(72,199,101,0.2)]"
            >
              {language === 'es' ? 'Formulario de Contacto' : 'Contact Us'}
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
