import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';

interface TechDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate?: (path: string) => void;
}

export const TechDetailModal: React.FC<TechDetailModalProps> = ({ isOpen, onClose, onNavigate }) => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'scan' | 'analyze' | 'measure' | 'grade'>('measure');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#454545]/85 backdrop-blur-xl animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-[#101411] border border-white/15 rounded-none shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between bg-[#141A15]">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded bg-[#48C765]/10 border border-[#48C765]/30 flex items-center justify-center">
              <span className="font-mono text-xs font-bold text-[#48C765]">GG</span>
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-white tracking-wide uppercase">
                {language === 'es' ? 'Protocolo Óptico de Telemetría Gorilla' : 'Gorilla Optical Telemetry Protocol'}
              </h3>
              <span className="font-mono text-[10px] text-[#A4ACA1]">
                SPEC V4.2 // CALIBRATION 0.01mm
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-none border border-white/10 flex items-center justify-center text-[#A4ACA1] hover:text-white hover:border-white/30 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-white/10 bg-[#0C100D] overflow-x-auto">
          {[
            { id: 'scan', label: language === 'es' ? '01. ESCANEO 1200 PPP' : '01. 1200 DPI SCAN' },
            { id: 'analyze', label: language === 'es' ? '02. ANÁLISIS FORENSE' : '02. FORENSIC ANALYSIS' },
            { id: 'measure', label: language === 'es' ? '03. MEDIDOR LÁSER 0.01mm' : '03. 0.01mm LASER CALIPER' },
            { id: 'grade', label: language === 'es' ? '04. SLAB SÓNICO & NOTA' : '04. SONIC SLAB & CERT' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-5 py-3 font-mono text-xs font-bold tracking-wider uppercase transition-all whitespace-nowrap border-b-2 ${
                activeTab === tab.id
                  ? 'border-[#48C765] text-[#48C765] bg-[#48C765]/5'
                  : 'border-transparent text-[#A4ACA1] hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {activeTab === 'scan' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="aspect-[4/3] rounded-none bg-[#080B09] border border-white/10 flex flex-col items-center justify-center p-4 relative overflow-hidden">
                <div className="w-32 h-44 rounded bg-gradient-to-b from-amber-600/30 to-red-900/40 border border-amber-400/40 relative flex items-center justify-center">
                  <div className="absolute inset-x-0 top-1/3 h-[2px] bg-white shadow-[0_0_12px_#FFFFFF] animate-pulse" />
                  <span className="font-mono text-[9px] text-amber-200">RAW SENSOR 1200 DPI</span>
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="font-display font-bold text-lg text-white">
                  {language === 'es' ? 'Captura Multiespectral en Cámara de Luz Balanceada' : 'Multispectral Capture in Calibrated Chamber'}
                </h4>
                <p className="text-xs text-[#A4ACA1] leading-relaxed">
                  {language === 'es'
                    ? 'Cada carta se digitaliza a 1200 puntos por pulgada bajo iluminación neutral continua de 5000K. Eliminamos reflejos parásitos con filtros polarizadores circulares.'
                    : 'Each card is scanned at 1200 DPI under continuous 5000K neutral light. Parasitic glare is removed via circular polarizer optics.'
                  }
                </p>
                <div className="bg-[#141A15] p-3.5 rounded-none border border-white/5 font-mono text-xs text-[#48C765] flex justify-between">
                  <span>RESOLUCIÓN NATIVA:</span>
                  <span>48 Megapíxeles</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'analyze' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="aspect-[4/3] rounded-none bg-[#080B09] border border-sky-400/20 flex flex-col items-center justify-center p-4 relative overflow-hidden">
                <div className="w-32 h-44 rounded bg-sky-950/30 border border-sky-400/50 flex flex-col justify-between p-2">
                  <span className="font-mono text-[8px] text-sky-300">UV 365nm PASS</span>
                  <div className="text-center font-mono text-[9px] text-sky-200 font-bold">ROSETTE MATCH 99.8%</div>
                  <span className="font-mono text-[8px] text-sky-400 text-right">NO TRACES</span>
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="font-display font-bold text-lg text-white">
                  {language === 'es' ? 'Detección Forense de Tintas y Microfibras' : 'Forensic Ink & Microfiber Verification'}
                </h4>
                <p className="text-xs text-[#A4ACA1] leading-relaxed">
                  {language === 'es'
                    ? 'Comparamos la trama de puntos de impresión offset original (CMYK) con la base de datos oficial. Detecta retoques con rotulador, reencolados de capas y cartas falsas en menos de 3 segundos.'
                    : 'We compare the original offset rosette pattern against our verified manufacturing archive. Instantly detects ink touch-ups, re-glued cardbacks, and counterfeits.'
                  }
                </p>
                <div className="bg-[#141A15] p-3.5 rounded-none border border-white/5 font-mono text-xs text-sky-400 flex justify-between">
                  <span>FORENSIC MATCH:</span>
                  <span>100% GENUINE</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'measure' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="aspect-[4/3] rounded-none bg-[#080B09] border border-[#48C765]/30 flex flex-col items-center justify-center p-4 relative overflow-hidden">
                <div className="w-36 h-48 rounded bg-[#0A180E] border-2 border-[#48C765] p-2 flex flex-col justify-between relative shadow-[0_0_25px_rgba(72,199,101,0.2)]">
                  <div className="absolute inset-x-0 top-1/2 h-[1px] bg-[#48C765] shadow-[0_0_6px_#48C765]" />
                  <div className="absolute inset-y-0 left-1/2 w-[1px] bg-[#48C765] shadow-[0_0_6px_#48C765]" />
                  <div className="flex justify-between font-mono text-[8px] text-[#48C765] font-bold">
                    <span>L: 1.05mm</span>
                    <span>R: 1.02mm</span>
                  </div>
                  <div className="text-center font-mono text-sm font-extrabold text-white">
                    50.7 / 49.3
                  </div>
                  <div className="flex justify-between font-mono text-[8px] text-[#48C765] font-bold">
                    <span>T: 1.04mm</span>
                    <span>B: 1.04mm</span>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="font-display font-bold text-lg text-white">
                  {language === 'es' ? 'Telemetría de Centrado al Centésimo de Milímetro' : 'Centering Telemetry Down to 0.01mm'}
                </h4>
                <p className="text-xs text-[#A4ACA1] leading-relaxed">
                  {language === 'es'
                    ? 'No usamos reglas manuales. Nuestro software calcula la distancia matemática entre el marco exterior de la carta y los bordes artísticos en 800 puntos por borde.'
                    : 'No manual subjective plastic rulers. Our software calculates the exact mathematical vector between the card edge and graphic artwork at 800 coordinate points per side.'
                  }
                </p>
                <div className="bg-[#141A15] p-3.5 rounded-none border border-white/5 font-mono text-xs text-[#48C765] flex justify-between">
                  <span>PRECISIÓN DE CALIBRE:</span>
                  <span>± 0.008 mm</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'grade' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="aspect-[4/3] rounded-none bg-[#080B09] border border-white/20 flex flex-col items-center justify-center p-4 relative overflow-hidden">
                <div className="w-32 h-44 rounded bg-[#18221A] border border-white/30 flex flex-col justify-between p-2.5 shadow-xl">
                  <div className="bg-[#101712] p-1 rounded flex justify-between items-center text-[8px] font-mono text-white">
                    <span>GG-892401</span>
                    <span className="text-[#48C765] font-bold">10 GEM</span>
                  </div>
                  <div className="text-center font-mono text-[9px] text-[#48C765] font-bold">
                    35kHz SONIC FUSED
                  </div>
                  <div className="text-center font-mono text-[7px] text-[#A4ACA1]">
                    NFC CRYPTO TAG
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="font-display font-bold text-lg text-white">
                  {language === 'es' ? 'Encapsulado Sónico Hermético y Certificación' : 'Hermetic Ultrasonic Encapsulation & Certification'}
                </h4>
                <p className="text-xs text-[#A4ACA1] leading-relaxed">
                  {language === 'es'
                    ? 'Soldadura acrílica a 35kHz sin pegamentos químicos volátiles. Protege tu pieza contra rayos ultravioleta, humedad relativa y decoloración.'
                    : '35kHz ultrasonic acrylic weld with zero chemical glue fumes. Shields your collectible against UV radiation, ambient humidity, and yellowing.'
                  }
                </p>
                <div className="bg-[#141A15] p-3.5 rounded-none border border-white/5 font-mono text-xs text-white flex justify-between">
                  <span>FILTRO UV:</span>
                  <span className="text-[#48C765] font-bold">99.4% BLOQUEO</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-white/10 bg-[#141A15] flex items-center justify-between">
          <button
            onClick={onClose}
            className="font-mono text-xs text-[#A4ACA1] hover:text-white uppercase transition-colors"
          >
            {language === 'es' ? 'Cerrar' : 'Close'}
          </button>

          <button
            onClick={() => {
              onClose();
              if (onNavigate) onNavigate('/submit');
            }}
            className="px-6 py-2.5 rounded-none bg-[#48C765] text-[#14170F] font-bold text-xs uppercase tracking-wider hover:bg-[#38B554] transition-colors"
          >
            {language === 'es' ? 'Iniciar Solicitud de Envío' : 'Start Card Submission'}
          </button>
        </div>

      </div>
    </div>
  );
};
