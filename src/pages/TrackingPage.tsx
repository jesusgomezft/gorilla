import React, { useState, useEffect } from 'react';
import { MOCK_ORDERS } from '../data/mockOrders';
import { ArrowRight, ScanLine } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { SlabTimelineIcon } from '../components/common/SlabTimelineIcon';
import { Order } from '../types';

interface TrackingPageProps {
  onNavigate: (path: string) => void;
}

export const TrackingPage: React.FC<TrackingPageProps> = ({ onNavigate: _onNavigate }) => {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const [searchTracking, setSearchTracking] = useState('');
  
  // Por defecto el estado inicia en null si no hay parámetro en URL
  const [activeOrder, setActiveOrder] = useState<Order | null>(() => {
    const params = new URLSearchParams(window.location.search);
    const trackingParam = params.get('id') || params.get('tracking');
    if (trackingParam) {
      return MOCK_ORDERS.find(
        o => o.trackingNumber.toUpperCase() === trackingParam.toUpperCase() || o.id.toUpperCase() === trackingParam.toUpperCase()
      ) || null;
    }
    return null;
  });

  const [errorMsg, setErrorMsg] = useState('');

  // Proceso dinámico interactivo de la cadena de custodia
  const [orderSteps, setOrderSteps] = useState(activeOrder ? activeOrder.steps : []);
  const [_activeStepIdx, setActiveStepIdx] = useState(() => {
    if (!activeOrder) return 0;
    const idx = activeOrder.steps.findIndex(s => s.current);
    return idx >= 0 ? idx : 0;
  });

  useEffect(() => {
    if (activeOrder) {
      setOrderSteps(activeOrder.steps);
      const idx = activeOrder.steps.findIndex(s => s.current);
      setActiveStepIdx(idx >= 0 ? idx : 0);
    } else {
      setOrderSteps([]);
      setActiveStepIdx(0);
    }
  }, [activeOrder]);

  const handleSelectStep = (idx: number) => {
    setActiveStepIdx(idx);
    setOrderSteps(prev => prev.map((s, i) => ({
      ...s,
      completed: i < idx,
      current: i === idx
    })));
  };

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
      
      {/* When activeOrder is present: Top compact search header + Order details & custody timeline */}
      {activeOrder ? (
        <>
          {/* Editorial Search Section - Compact header when viewing an order */}
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

          {/* Results: Order data + Custody Timeline */}
          <section className={`w-full flex-1 py-6 sm:py-8 px-6 lg:px-12 transition-colors duration-300 ${
            isLight ? 'bg-[#ECE5D8]' : 'bg-[#383838]'
          }`}>
            <div className="w-full max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-14 items-start">
              
              {/* Left Column: Order Data */}
              <div className="lg:col-span-4 flex flex-col gap-5">
                
                <div className={`flex flex-col pb-5 border-b ${isLight ? 'border-black/10' : 'border-white/10'}`}>
                  <button
                    type="button"
                    onClick={() => { setActiveOrder(null); setSearchTracking(''); }}
                    className={`font-mono text-[9px] uppercase tracking-wider mb-2 text-left flex items-center gap-1 transition-colors cursor-pointer ${
                      isLight ? 'text-gray-500 hover:text-[#16A34A]' : 'text-gray-400 hover:text-[#4ADE80]'
                    }`}
                  >
                    ← {language === 'es' ? 'CONSULTAR OTRO PEDIDO' : 'SEARCH ANOTHER ORDER'}
                  </button>

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
                  {orderSteps.map((step, idx) => {
                    const isLast = idx === orderSteps.length - 1;
                    const isFinalCompleted = isLast && (step.completed || activeOrder?.status === 'DELIVERED');
                    
                    return (
                      <div 
                        key={idx} 
                        onClick={() => handleSelectStep(idx)}
                        className={`relative pl-8 sm:pl-10 group cursor-pointer transition-all ${
                          isLast ? 'pb-1' : 'pb-6 sm:pb-7'
                        }`}
                      >
                        {/* Node Marker: Slab Card Icon con carta coleccionable y titileo activo */}
                        <div className={`absolute left-0 top-0.5 -translate-x-1/2 flex items-center justify-center p-0.5 z-10 ${
                          isLight ? 'bg-[#ECE5D8]' : 'bg-[#383838]'
                        }`}>
                          {/* Halo titilante en etapa intermedia activa (verde esmeralda) */}
                          {step.current && !isFinalCompleted && (
                            <div className="absolute -inset-1 border border-emerald-500/70 rounded-sm animate-ping pointer-events-none opacity-35" />
                          )}

                          {/* Halo titilante en el último paso indicativo de que el proceso FINALIZÓ (amarillo / oro) */}
                          {isFinalCompleted && (
                            <div className="absolute -inset-1 border-2 border-amber-400 rounded-sm animate-ping pointer-events-none opacity-60" />
                          )}

                          <SlabTimelineIcon
                            status={step.current ? 'current' : step.completed ? 'completed' : 'pending'}
                            isLight={isLight}
                            size="md"
                            isFinal={isFinalCompleted}
                          />
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1">
                          <h4 className={`font-['Oswald'] text-base uppercase tracking-wide leading-tight font-bold transition-colors ${
                            isFinalCompleted
                              ? (isLight ? 'text-amber-600' : 'text-amber-400')
                              : step.current 
                                ? (isLight ? 'text-[#16A34A]' : 'text-[#4ADE80]') 
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
                          <div className={`absolute left-0 top-7 bottom-0 -translate-x-[50%] w-[1.5px] ${
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
        </>
      ) : (
        /* Empty / Centered Search State - Clean, minimal, zero clutter */
        <section className={`w-full flex-1 flex flex-col items-center justify-center py-20 px-6 transition-colors duration-300 ${
          isLight ? 'bg-[#ECE5D8]' : 'bg-[#383838]'
        }`}>
          <div className="w-full max-w-lg mx-auto flex flex-col items-center text-center">
            
            <div className={`flex items-center gap-2 font-mono text-[10px] tracking-[0.25em] uppercase mb-3 ${
              isLight ? 'text-[#2D9A46]' : 'text-[#48C765]'
            }`}>
              <ScanLine className="w-4 h-4" />
              <span>{language === 'es' ? 'Seguimiento de Custodia' : 'Chain of Custody'}</span>
            </div>

            <h1 className={`font-['Oswald'] text-2xl sm:text-4xl font-bold uppercase tracking-tight mb-8 ${
              isLight ? 'text-[#1C201D]' : 'text-white'
            }`}>
              {language === 'es' ? 'SEGUIMIENTO EN TIEMPO REAL' : 'LIVE ORDER TRACKING'}
            </h1>

            <form onSubmit={handleSearch} className="relative w-full group mb-4">
              <input
                type="text"
                autoFocus
                placeholder={language === 'es' ? 'INTRODUCE Nº SEGUIMIENTO O ID' : 'ENTER TRACKING # OR ORDER ID'}
                value={searchTracking}
                onChange={(e) => setSearchTracking(e.target.value)}
                className={`w-full bg-transparent border-b-2 px-1 py-3 text-sm sm:text-base transition-colors font-mono uppercase tracking-widest pr-10 focus:outline-none ${
                  isLight 
                    ? 'border-black/30 text-[#1C201D] placeholder:text-[#1C201D]/40 focus:border-[#2D9A46]' 
                    : 'border-white/30 text-white placeholder-white/40 focus:border-[#48C765]'
                }`}
              />
              <button 
                type="submit"
                aria-label="Search"
                className={`absolute right-1 top-1/2 -translate-y-1/2 transition-colors cursor-pointer p-1 ${
                  isLight 
                    ? 'text-[#1C201D]/60 group-focus-within:text-[#2D9A46] hover:text-[#2D9A46]' 
                    : 'text-white/60 group-focus-within:text-[#48C765] hover:text-[#48C765]'
                }`}
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>

            {errorMsg && (
              <span className="text-red-500 font-mono text-[10px] tracking-widest uppercase mb-4">
                {errorMsg}
              </span>
            )}

            {/* Discreet sample search codes */}
            <div className={`flex flex-wrap items-center justify-center gap-2 font-mono text-[10px] tracking-[0.15em] uppercase mt-4 ${
              isLight ? 'text-[#1C201D]/50' : 'text-white/40'
            }`}>
              <span>{language === 'es' ? 'Ejemplos:' : 'Examples:'}</span>
              <button
                type="button"
                onClick={() => { setSearchTracking('ES-GLS-9928174620'); setActiveOrder(MOCK_ORDERS[0]); setErrorMsg(''); }}
                className={`underline underline-offset-4 transition-colors cursor-pointer ${
                  isLight ? 'hover:text-[#2D9A46]' : 'hover:text-[#48C765]'
                }`}
              >
                ES-GLS-9928174620
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => { setSearchTracking('PT-CTT-441029410'); setActiveOrder(MOCK_ORDERS[1]); setErrorMsg(''); }}
                className={`underline underline-offset-4 transition-colors cursor-pointer ${
                  isLight ? 'hover:text-[#2D9A46]' : 'hover:text-[#48C765]'
                }`}
              >
                PT-CTT-441029410
              </button>
            </div>

          </div>
        </section>
      )}
    </div>
  );
};

