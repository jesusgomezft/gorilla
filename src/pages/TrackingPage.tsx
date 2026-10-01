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
      setErrorMsg(language === 'es' ? `No se encontró pedido para "${query}".` : `No submission order found for "${query}".`);
    }
  };

  return (
    <div 
      className={`w-full min-h-screen flex flex-col font-sans transition-colors duration-500 select-none ${
        isLight ? 'bg-[#F4F1EA] text-[#1A1D1A]' : 'bg-[#14170F] text-white'
      }`}
    >
      
      {/* 1. Compact Header & Search Bar (Fits in ~80-100px) */}
      <section 
        className={`w-full pt-20 sm:pt-24 pb-3 sm:pb-4 px-4 sm:px-6 lg:px-12 border-b transition-colors ${
          isLight ? 'bg-white/60 border-black/[0.08]' : 'bg-[#181C15]/70 border-white/[0.08]'
        }`}
      >
        <div className="w-full max-w-[1400px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-6">
          
          {/* Title & Tracker Label */}
          <div className="flex flex-col shrink-0">
            <div className="flex items-center gap-2 text-[#16A34A] dark:text-[#48C765] font-mono text-[9px] sm:text-[10px] tracking-[0.2em] uppercase font-bold">
              <ScanLine className="w-3.5 h-3.5" />
              <span>{language === 'es' ? 'Seguimiento de Custodia' : 'Chain of Custody Tracker'}</span>
            </div>
            <h1 className="font-['Oswald'] text-lg sm:text-xl font-bold uppercase tracking-tight text-neutral-900 dark:text-white leading-tight">
              {language === 'es' ? 'ESTADO EN TIEMPO REAL' : 'LIVE ORDER STATUS'}
            </h1>
          </div>

          {/* Search Input Bar */}
          <div className="flex-1 max-w-lg w-full">
            <form onSubmit={handleSearch} className="relative w-full group">
              <input
                type="text"
                placeholder={language === 'es' ? 'Nº SEGUIMIENTO O ID PEDIDO' : 'ENTER TRACKING # OR ORDER ID'}
                value={searchTracking}
                onChange={(e) => setSearchTracking(e.target.value)}
                className={`w-full px-3.5 py-2 text-xs sm:text-sm font-mono uppercase tracking-wider rounded-lg border transition-all duration-200 pr-10 focus:outline-none ${
                  isLight 
                    ? 'bg-neutral-50/90 border-neutral-300 text-neutral-900 placeholder:text-neutral-400 focus:border-[#16A34A] focus:bg-white focus:ring-1 focus:ring-[#16A34A]' 
                    : 'bg-white/5 border-white/10 text-white placeholder-white/30 focus:border-[#48C765] focus:bg-white/[0.08]'
                }`}
              />
              <button 
                type="submit"
                aria-label="Search order"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-[#16A34A] dark:hover:text-[#48C765] transition-colors p-1"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
            {errorMsg && (
              <span className="text-red-500 font-mono text-[9px] tracking-wider uppercase block mt-1">
                {errorMsg}
              </span>
            )}
          </div>

          {/* Quick Demo Sample Pills */}
          <div className="flex items-center gap-1.5 shrink-0 flex-wrap">
            <span className="font-mono text-[9px] uppercase tracking-wider text-neutral-400 dark:text-white/40 mr-1 hidden lg:inline">
              {language === 'es' ? 'Muestras:' : 'Samples:'}
            </span>
            <button
              type="button"
              onClick={() => { setSearchTracking('ES-GLS-9928174620'); setActiveOrder(MOCK_ORDERS[0]); setErrorMsg(''); }}
              className={`font-mono text-[9px] px-2 py-1 rounded transition-colors uppercase font-medium border ${
                isLight 
                  ? 'border-neutral-200 bg-white hover:border-[#16A34A] text-neutral-700 hover:text-[#16A34A]' 
                  : 'border-white/10 bg-white/5 hover:border-[#48C765] text-white/70 hover:text-[#48C765]'
              }`}
            >
              ES-GLS (In Progress)
            </button>
            <button
              type="button"
              onClick={() => { setSearchTracking('PT-CTT-441029410'); setActiveOrder(MOCK_ORDERS[1]); setErrorMsg(''); }}
              className={`font-mono text-[9px] px-2 py-1 rounded transition-colors uppercase font-medium border ${
                isLight 
                  ? 'border-neutral-200 bg-white hover:border-[#16A34A] text-neutral-700 hover:text-[#16A34A]' 
                  : 'border-white/10 bg-white/5 hover:border-[#48C765] text-white/70 hover:text-[#48C765]'
              }`}
            >
              PT-CTT (Delivered)
            </button>
          </div>

        </div>
      </section>

      {/* 2. Compact Results Dashboard (Fits cleanly on screen) */}
      {activeOrder ? (
        <section className="w-full flex-1 py-4 sm:py-5 px-4 sm:px-6 lg:px-12 flex items-stretch">
          <div className="w-full max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-start">
            
            {/* Left Column: Compact Order Metadata & Card Batch */}
            <div className="lg:col-span-4 flex flex-col gap-3 sm:gap-4">
              
              {/* Order Info Card */}
              <div 
                className={`p-4 sm:p-5 rounded-xl border backdrop-blur-md transition-colors ${
                  isLight 
                    ? 'bg-white/85 border-neutral-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.03)]' 
                    : 'bg-black/40 border-white/[0.08] shadow-lg'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[9.5px] font-bold tracking-[0.2em] uppercase text-[#16A34A] dark:text-[#48C765]">
                    STATUS // {activeOrder.status.replace('_', ' ')}
                  </span>
                  <span className="font-mono text-[9px] px-2 py-0.5 rounded font-bold uppercase bg-[#16A34A]/10 text-[#15803D] dark:text-[#48C765]">
                    {language === 'es' ? 'ACTIVO' : 'ACTIVE'}
                  </span>
                </div>

                <h2 className="font-['Oswald'] text-lg sm:text-xl font-bold uppercase leading-tight text-neutral-900 dark:text-white mb-3">
                  ORDER #{activeOrder.id}
                </h2>

                {/* 2x2 Compact Metadata Grid */}
                <div className="grid grid-cols-2 gap-2 text-[10px] font-mono uppercase tracking-wider pt-2 border-t border-neutral-200 dark:border-white/10">
                  <div className="flex flex-col">
                    <span className="text-neutral-400 dark:text-white/40 text-[9px]">Carrier</span>
                    <span className="font-semibold text-neutral-800 dark:text-white truncate">{activeOrder.carrier}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-neutral-400 dark:text-white/40 text-[9px]">Tracking</span>
                    <span className="font-semibold text-neutral-800 dark:text-white truncate">{activeOrder.trackingNumber}</span>
                  </div>
                  <div className="flex flex-col mt-1">
                    <span className="text-neutral-400 dark:text-white/40 text-[9px]">Placed</span>
                    <span className="font-semibold text-neutral-800 dark:text-white">{activeOrder.createdAt}</span>
                  </div>
                  <div className="flex flex-col mt-1">
                    <span className="text-neutral-400 dark:text-white/40 text-[9px]">Completion</span>
                    <span className="font-bold text-[#16A34A] dark:text-[#48C765]">{activeOrder.estimatedCompletion}</span>
                  </div>
                </div>
              </div>

              {/* Cards in Batch (Compact Scrollable Row/List) */}
              <div 
                className={`p-3.5 sm:p-4 rounded-xl border backdrop-blur-md transition-colors ${
                  isLight 
                    ? 'bg-white/85 border-neutral-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.03)]' 
                    : 'bg-black/40 border-white/[0.08] shadow-lg'
                }`}
              >
                <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-neutral-200 dark:border-white/10">
                  <span className="font-mono text-[9.5px] tracking-[0.2em] uppercase font-semibold text-neutral-500 dark:text-white/50">
                    {language === 'es' ? 'Cartas en Lote' : 'Cards in Batch'}
                  </span>
                  <span className="font-mono text-[9px] font-bold text-[#16A34A] dark:text-[#48C765]">
                    {activeOrder.items.length} {language === 'es' ? 'items' : 'items'}
                  </span>
                </div>
                
                {/* Scrollable Mini Items */}
                <div className="flex flex-col gap-2 max-h-[140px] sm:max-h-[160px] overflow-y-auto pr-1">
                  {activeOrder.items.map((item, idx) => (
                    <div 
                      key={item.id} 
                      className={`flex items-center gap-2.5 p-1.5 rounded transition-colors group ${
                        isLight ? 'hover:bg-black/[0.03]' : 'hover:bg-white/[0.04]'
                      }`}
                    >
                      <span className="font-mono text-[9px] text-neutral-400 dark:text-white/40 w-3 shrink-0">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <div className="w-8 h-11 bg-neutral-200 dark:bg-white/10 rounded overflow-hidden shrink-0 border border-neutral-300 dark:border-white/10">
                        <img 
                          src={item.frontImagePreview} 
                          alt="" 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform" 
                        />
                      </div>
                      <div className="flex flex-col min-w-0 flex-1">
                        <span className="font-mono text-[11px] font-bold uppercase text-neutral-900 dark:text-white truncate">
                          {item.cardName}
                        </span>
                        <span className="font-mono text-[9px] text-neutral-500 dark:text-white/50 uppercase truncate">
                          {item.game} • {item.set}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column: Compact Timeline (Fits all 6 steps without scroll) */}
            <div 
              className={`lg:col-span-8 p-4 sm:p-5 rounded-xl border backdrop-blur-md transition-colors ${
                isLight 
                  ? 'bg-white/85 border-neutral-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.03)]' 
                  : 'bg-black/40 border-white/[0.08] shadow-lg'
              }`}
            >
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-neutral-200 dark:border-white/10">
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase font-bold text-neutral-600 dark:text-white/60">
                  {language === 'es' ? 'Línea de Custodia y Progreso' : 'Chain of Custody Timeline'}
                </span>
                <span className="font-mono text-[9px] uppercase tracking-wider text-[#16A34A] dark:text-[#48C765] font-semibold">
                  6 / 6 {language === 'es' ? 'Puntos de Control' : 'Checkpoints'}
                </span>
              </div>

              {/* Steps Vertical List */}
              <div className="flex flex-col relative border-l border-neutral-300 dark:border-white/15 ml-3 pl-5 sm:pl-6">
                {activeOrder.steps.map((step, idx) => {
                  const isLast = idx === activeOrder.steps.length - 1;
                  
                  return (
                    <div 
                      key={idx} 
                      className={`relative group ${isLast ? 'pb-1' : 'pb-3.5 sm:pb-4'}`}
                    >
                      {/* Node Marker on vertical border line */}
                      <div className="absolute -left-[27px] sm:-left-[31px] top-1 flex items-center justify-center w-4 h-4">
                        {step.completed ? (
                          <div className="w-2.5 h-2.5 rounded-full bg-[#16A34A] dark:bg-[#48C765] shadow-sm" />
                        ) : step.current ? (
                          <div className="relative flex items-center justify-center w-full h-full">
                            <div className="absolute w-3.5 h-3.5 rounded-full border-2 border-[#16A34A] dark:border-[#48C765] animate-ping opacity-75" />
                            <div className="w-2.5 h-2.5 rounded-full bg-[#16A34A] dark:bg-[#48C765] shadow-[0_0_8px_#16A34A]" />
                          </div>
                        ) : (
                          <div className="w-2 h-2 rounded-full bg-neutral-300 dark:bg-white/20" />
                        )}
                      </div>

                      {/* Step Header: Title & Timestamp */}
                      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-0.5">
                        <h4 
                          className={`font-['Oswald'] text-sm sm:text-base uppercase tracking-wide font-bold leading-tight ${
                            step.current 
                              ? 'text-[#16A34A] dark:text-[#48C765]' 
                              : step.completed 
                                ? 'text-neutral-900 dark:text-white' 
                                : 'text-neutral-400 dark:text-white/30'
                          }`}
                        >
                          {step.label}
                        </h4>
                        {step.timestamp && (
                          <span className="font-mono text-[9.5px] tracking-wider uppercase text-neutral-500 dark:text-[#A4ACA1] shrink-0 font-medium">
                            {step.timestamp}
                          </span>
                        )}
                      </div>
                      
                      {/* Step Description */}
                      <p 
                        className={`font-sans text-xs leading-snug max-w-2xl ${
                          step.current 
                            ? 'text-neutral-800 dark:text-neutral-200 font-medium' 
                            : step.completed 
                              ? 'text-neutral-600 dark:text-[#A4ACA1]' 
                              : 'text-neutral-400/80 dark:text-white/25'
                        }`}
                      >
                        {step.description}
                      </p>

                      {/* Connecting Line Accent */}
                      {step.completed && !isLast && (
                        <div className="absolute -left-[26px] sm:-left-[30px] top-3 bottom-0 w-[2px] bg-[#16A34A]/40 dark:bg-[#48C765]/40" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </section>
      ) : (
        <div className="flex-1" />
      )}
    </div>
  );
};

