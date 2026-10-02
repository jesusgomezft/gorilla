import React, { useState } from 'react';
import { MOCK_ORDERS } from '../data/mockOrders';
import { ArrowRight, ScanLine } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

interface TrackingPageProps {
  onNavigate: (path: string) => void;
}

export const TrackingPage: React.FC<TrackingPageProps> = ({ onNavigate: _onNavigate }) => {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const [searchTracking, setSearchTracking] = useState('');
  const [activeOrder, setActiveOrder] = useState(MOCK_ORDERS[0]);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    const query = searchTracking.trim().toUpperCase();
    if (!query) return;

    const found = MOCK_ORDERS.find(
      o => o.trackingNumber.toUpperCase() === query || o.id.toUpperCase() === query
    );

    if (found) {
      setActiveOrder(found);
    } else {
      setErrorMsg(`No submission order found for "${query}".`);
    }
  };

  return (
    <div className={`w-full min-h-screen flex flex-col font-sans selection:bg-[#48C765] selection:text-[#14170F] transition-colors duration-300 ${
      isLight ? 'bg-[#F3EFE6] text-[#1C201D]' : 'bg-[#454545] text-white'
    }`}>
      
      {/* Editorial Search Section - Compact refined header */}
      <section className={`w-full pt-3.5 sm:pt-4 pb-3.5 px-6 lg:px-12 border-b transition-colors duration-300 ${
        isLight ? 'bg-[#F3EFE6] border-black/[0.06]' : 'bg-[#454545] border-white/[0.04]'
      }`}>
        <div className="w-full max-w-[1400px] mx-auto flex flex-col md:flex-row md:items-end justify-between gap-4 lg:gap-8">
          <div className="flex flex-col max-w-xl w-full">
            <div className={`flex items-center gap-2 font-mono text-[9px] tracking-[0.2em] uppercase mb-1 ${
              isLight ? 'text-[#2D9A46]' : 'text-[#48C765]'
            }`}>
              <ScanLine className="w-3.5 h-3.5" />
              <span>{language === 'es' ? 'Seguimiento de Custodia' : 'Chain of Custody Tracker'}</span>
            </div>
            <h1 className={`font-['Oswald'] text-base md:text-lg font-bold uppercase tracking-tight mb-2 ${
              isLight ? 'text-[#1C201D]' : 'text-white'
            }`}>
              {language === 'es' ? 'ESTADO EN TIEMPO REAL' : 'LIVE ORDER STATUS'}
            </h1>
          
            <form onSubmit={handleSearch} className="relative w-full max-w-md group">
              <input
                type="text"
                placeholder={language === 'es' ? 'INTRODUCE Nº SEGUIMIENTO O ID' : 'ENTER TRACKING # OR ORDER ID'}
                value={searchTracking}
                onChange={(e) => setSearchTracking(e.target.value)}
                className={`w-full bg-transparent border-b px-0 py-1 text-xs md:text-sm transition-colors font-mono uppercase tracking-widest pr-8 focus:outline-none ${
                  isLight 
                    ? 'border-black/20 text-[#1C201D] placeholder:text-[#1C201D]/40 focus:border-[#2D9A46]' 
                    : 'border-white/20 text-white placeholder-white/30 focus:border-[#48C765]'
                }`}
              />
              <button 
                type="submit"
                aria-label="Search"
                className={`absolute right-1 top-1/2 -translate-y-1/2 transition-colors cursor-pointer ${
                  isLight 
                    ? 'text-[#1C201D]/50 group-focus-within:text-[#2D9A46] hover:text-[#2D9A46]' 
                    : 'text-white/50 group-focus-within:text-[#48C765] hover:text-[#48C765]'
                }`}
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
            {errorMsg && (
              <span className="text-red-500 font-mono text-[9px] tracking-widest uppercase mt-1">
                {errorMsg}
              </span>
            )}
          </div>

          <div className={`flex flex-col gap-1 font-mono text-[9px] tracking-[0.15em] uppercase shrink-0 ${
            isLight ? 'text-[#1C201D]/60' : 'text-white/50'
          }`}>
            <span className={isLight ? 'text-[#1C201D]/50 font-bold' : 'text-white/40 font-bold'}>
              {language === 'es' ? 'Ejemplos de Búsqueda' : 'Sample Searches'}
            </span>
            <button
              type="button"
              onClick={() => { setSearchTracking('ES-GLS-9928174620'); setActiveOrder(MOCK_ORDERS[0]); setErrorMsg(''); }}
              className={`text-left transition-colors cursor-pointer ${
                isLight ? 'hover:text-[#2D9A46]' : 'hover:text-[#48C765]'
              }`}
            >
              ES-GLS-9928174620 (In Progress)
            </button>
            <button
              type="button"
              onClick={() => { setSearchTracking('PT-CTT-441029410'); setActiveOrder(MOCK_ORDERS[1]); setErrorMsg(''); }}
              className={`text-left transition-colors cursor-pointer ${
                isLight ? 'hover:text-[#2D9A46]' : 'hover:text-[#48C765]'
              }`}
            >
              PT-CTT-441029410 (Delivered)
            </button>
          </div>
        </div>
      </section>

      {/* Results - Exact original structural layout with compact vertical rhythm */}
      {activeOrder ? (
        <section className={`w-full flex-1 py-6 sm:py-8 px-6 lg:px-12 transition-colors duration-300 ${
          isLight ? 'bg-[#ECE5D8]' : 'bg-[#383838]'
        }`}>
          <div className="w-full max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-14 items-start">
            
            {/* Left Column: Order Data */}
            <div className="lg:col-span-4 flex flex-col gap-5">
              
              <div className={`flex flex-col pb-5 border-b ${isLight ? 'border-black/10' : 'border-white/10'}`}>
                <span className={`font-mono text-[10px] tracking-[0.2em] uppercase mb-2 font-bold ${
                  isLight ? 'text-[#2D9A46]' : 'text-[#48C765]'
                }`}>
                  STATUS // {activeOrder.status.replace('_', ' ')}
                </span>
                <h2 className={`font-['Oswald'] text-lg md:text-xl font-bold uppercase leading-[1.1] mb-3 ${
                  isLight ? 'text-[#1C201D]' : 'text-white'
                }`}>
                  ORDER #{activeOrder.id}
                </h2>

                <div className={`flex flex-col gap-2.5 font-mono text-[10px] tracking-[0.15em] uppercase ${
                  isLight ? 'text-[#4A5048]' : 'text-[#A4ACA1]'
                }`}>
                  <div className={`flex justify-between border-b pb-1.5 ${isLight ? 'border-black/5' : 'border-white/5'}`}>
                    <span className={isLight ? 'text-[#1C201D]/55 font-semibold' : 'text-white/40'}>Carrier</span>
                    <span className={`font-medium ${isLight ? 'text-[#1C201D]' : 'text-white'}`}>{activeOrder.carrier}</span>
                  </div>
                  <div className={`flex justify-between border-b pb-1.5 ${isLight ? 'border-black/5' : 'border-white/5'}`}>
                    <span className={isLight ? 'text-[#1C201D]/55 font-semibold' : 'text-white/40'}>Tracking</span>
                    <span className={`font-medium ${isLight ? 'text-[#1C201D]' : 'text-white'}`}>{activeOrder.trackingNumber}</span>
                  </div>
                  <div className={`flex justify-between border-b pb-1.5 ${isLight ? 'border-black/5' : 'border-white/5'}`}>
                    <span className={isLight ? 'text-[#1C201D]/55 font-semibold' : 'text-white/40'}>Placed</span>
                    <span className={`font-medium ${isLight ? 'text-[#1C201D]' : 'text-white'}`}>{activeOrder.createdAt}</span>
                  </div>
                  <div className={`flex justify-between border-b pb-1.5 ${isLight ? 'border-black/5' : 'border-white/5'}`}>
                    <span className={isLight ? 'text-[#1C201D]/55 font-semibold' : 'text-white/40'}>Completion Date</span>
                    <span className={`font-bold ${isLight ? 'text-[#2D9A46]' : 'text-[#48C765]'}`}>{activeOrder.estimatedCompletion}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col">
                <span className={`font-mono text-[10px] tracking-[0.2em] uppercase font-bold mb-4 ${
                  isLight ? 'text-[#1C201D]/60' : 'text-white/40'
                }`}>
                  {language === 'es' ? 'Cartas en Lote' : 'Cards in Batch'} ({activeOrder.items.length})
                </span>
                
                <div className="flex flex-col gap-4">
                  {activeOrder.items.map((item, idx) => (
                    <div key={item.id} className="flex items-center gap-4 group">
                      <span className={`font-mono text-[9px] w-4 ${isLight ? 'text-[#1C201D]/40' : 'text-white/30'}`}>{String(idx + 1).padStart(2, '0')}</span>
                      <div className={`w-12 h-16 border overflow-hidden shrink-0 ${isLight ? 'bg-white border-black/10' : 'bg-[#454545] border-white/10'}`}>
                        <img 
                          src={item.frontImagePreview} 
                          alt="" 
                          className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity grayscale group-hover:grayscale-0" 
                        />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className={`font-mono text-xs uppercase tracking-widest truncate max-w-[180px] font-semibold ${
                          isLight ? 'text-[#1C201D]' : 'text-white'
                        }`}>
                          {item.cardName}
                        </span>
                        <span className={`font-mono text-[9px] uppercase tracking-widest ${
                          isLight ? 'text-[#4A5048]' : 'text-[#A4ACA1]'
                        }`}>
                          {item.game} • {item.set}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column: Timeline (High-contrast, mobile-friendly design) */}
            <div className="lg:col-span-8 flex flex-col">
              <span className={`font-mono text-[10px] tracking-[0.2em] uppercase font-bold mb-5 ${
                isLight ? 'text-[#2D9A46]' : 'text-[#48C765]'
              }`}>
                {language === 'es' ? 'Línea de Tiempo de Custodia' : 'Chain of Custody Timeline'}
              </span>

              <div className={`flex flex-col relative border-l ml-2 ${
                isLight ? 'border-black/15' : 'border-white/10'
              }`}>
                {activeOrder.steps.map((step, idx) => {
                  const isLast = idx === activeOrder.steps.length - 1;
                  
                  return (
                    <div key={idx} className={`relative pl-8 sm:pl-10 group ${isLast ? 'pb-1' : 'pb-4 sm:pb-5'}`}>
                      {/* Node Marker */}
                      <div className={`absolute left-0 top-0.5 -translate-x-[50%] flex items-center justify-center w-4 h-4 ${
                        isLight ? 'bg-[#ECE5D8]' : 'bg-[#383838]'
                      }`}>
                        {step.completed ? (
                          <div className={`w-2 h-2 rounded-none ${
                            isLight ? 'bg-[#2D9A46] shadow-[0_0_8px_rgba(45,154,70,0.5)]' : 'bg-white shadow-[0_0_10px_white]'
                          }`} />
                        ) : step.current ? (
                          <div className="relative flex items-center justify-center w-full h-full">
                            <div className={`absolute w-3.5 h-3.5 border rounded-none animate-ping ${
                              isLight ? 'border-[#2D9A46]' : 'border-[#48C765]'
                            }`} />
                            <div className={`w-2 h-2 rounded-none ${
                              isLight ? 'bg-[#2D9A46] shadow-[0_0_10px_#2D9A46]' : 'bg-[#48C765] shadow-[0_0_10px_#48C765]'
                            }`} />
                          </div>
                        ) : (
                          <div className={`w-1.5 h-1.5 rounded-none ${
                            isLight ? 'bg-black/20' : 'bg-white/20'
                          }`} />
                        )}
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1">
                        <h4 className={`font-['Oswald'] text-base uppercase tracking-wide leading-tight font-bold ${
                          step.current 
                            ? (isLight ? 'text-[#2D9A46]' : 'text-[#48C765]') 
                            : step.completed 
                              ? (isLight ? 'text-[#1C201D]' : 'text-white') 
                              : (isLight ? 'text-[#1C201D]/40' : 'text-white/30')
                        }`}>
                          {step.label}
                        </h4>
                        {step.timestamp && (
                          <span className={`font-mono text-[9.5px] tracking-widest uppercase shrink-0 font-medium ${
                            isLight ? 'text-[#4A5048]' : 'text-[#A4ACA1]'
                          }`}>
                            {step.timestamp}
                          </span>
                        )}
                      </div>
                      
                      <p className={`font-sans text-xs leading-relaxed max-w-xl ${
                        step.completed || step.current 
                          ? (isLight ? 'text-[#4A5048]' : 'text-[#A4ACA1]') 
                          : (isLight ? 'text-[#1C201D]/40' : 'text-white/30')
                      }`}>
                        {step.description}
                      </p>

                      {/* Connecting line highlight for completed segments */}
                      {step.completed && !isLast && (
                        <div className={`absolute left-0 top-3 bottom-0 -translate-x-[50%] w-[1.5px] ${
                          isLight ? 'bg-[#2D9A46]/60' : 'bg-white/40'
                        }`} />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </section>
      ) : (
        <div className={`flex-1 ${isLight ? 'bg-[#ECE5D8]' : 'bg-[#383838]'}`} />
      )}
    </div>
  );
};

