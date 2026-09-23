import React, { useState } from 'react';
import { MOCK_ORDERS } from '../data/mockOrders';
import { ArrowRight, Package, Check, ScanLine } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface TrackingPageProps {
  onNavigate: (path: string) => void;
}

export const TrackingPage: React.FC<TrackingPageProps> = ({ onNavigate }) => {
  const { language } = useLanguage();
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
    <div className="w-full min-h-screen bg-[#454545] text-white flex flex-col pt-32 pb-32 px-6 lg:px-12 font-sans selection:bg-[#48C765] selection:text-[#14170F]">
      
      {/* Editorial Search Section */}
      <div className="w-full max-w-[1400px] mx-auto mb-24 flex flex-col md:flex-row md:items-end justify-between gap-12 border-b border-white/10 pb-16">
        <div className="flex flex-col max-w-2xl w-full">
          <div className="flex items-center gap-3 text-[#48C765] font-mono text-[10px] tracking-[0.2em] uppercase mb-4">
            <ScanLine className="w-4 h-4" />
            <span>{language === 'es' ? 'Seguimiento de Custodia' : 'Chain of Custody Tracker'}</span>
          </div>
          <h1 className="font-['Oswald'] text-lg md:text-lg font-bold uppercase tracking-tight text-white mb-8">
            {language === 'es' ? 'ESTADO EN TIEMPO REAL' : 'LIVE ORDER STATUS'}
          </h1>
          
          <form onSubmit={handleSearch} className="relative w-full max-w-lg group">
            <input
              type="text"
              placeholder="ENTER TRACKING # OR ORDER ID"
              value={searchTracking}
              onChange={(e) => setSearchTracking(e.target.value)}
              className="w-full bg-transparent border-b-2 border-white/20 px-0 py-3 text-lg md:text-lg text-white placeholder-white/30 focus:outline-none focus:border-[#48C765] transition-colors font-mono uppercase tracking-widest pr-12"
            />
            <button 
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-white/50 group-focus-within:text-[#48C765] hover:text-[#48C765] transition-colors"
            >
              <ArrowRight className="w-6 h-6" />
            </button>
          </form>
          {errorMsg && (
            <span className="text-red-400 font-mono text-[10px] tracking-widest uppercase mt-4">
              {errorMsg}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-3 font-mono text-[10px] tracking-[0.2em] uppercase text-white/50">
          <span className="text-white/30">{language === 'es' ? 'Ejemplos de Búsqueda' : 'Sample Searches'}</span>
          <button
            onClick={() => { setSearchTracking('ES-GLS-9928174620'); setActiveOrder(MOCK_ORDERS[0]); setErrorMsg(''); }}
            className="text-left hover:text-[#48C765] transition-colors"
          >
            ES-GLS-9928174620 (In Progress)
          </button>
          <button
            onClick={() => { setSearchTracking('PT-CTT-441029410'); setActiveOrder(MOCK_ORDERS[1]); setErrorMsg(''); }}
            className="text-left hover:text-[#48C765] transition-colors"
          >
            PT-CTT-441029410 (Delivered)
          </button>
        </div>
      </div>

      {/* Results - Structural Layout */}
      {activeOrder && (
        <div className="w-full max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 xl:gap-24 items-start">
          
          {/* Left Column: Order Data */}
          <div className="lg:col-span-4 flex flex-col gap-12 sticky top-32">
            
            <div className="flex flex-col pb-12 border-b border-white/10">
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#48C765] mb-4">
                STATUS // {activeOrder.status.replace('_', ' ')}
              </span>
              <h2 className="font-['Oswald'] text-lg md:text-lg font-bold uppercase leading-[1.1] text-white mb-6">
                ORDER #{activeOrder.id}
              </h2>

              <div className="flex flex-col gap-6 font-mono text-[10px] tracking-[0.15em] uppercase text-[#A4ACA1]">
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-white/30">Carrier</span>
                  <span className="text-white">{activeOrder.carrier}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-white/30">Tracking</span>
                  <span className="text-white">{activeOrder.trackingNumber}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-white/30">Placed</span>
                  <span className="text-white">{activeOrder.createdAt}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-white/30">Completion Date</span>
                  <span className="text-[#48C765] font-bold">{activeOrder.estimatedCompletion}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col">
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/30 mb-6">
                {language === 'es' ? 'Cartas en Lote' : 'Cards in Batch'} ({activeOrder.items.length})
              </span>
              
              <div className="flex flex-col gap-4">
                {activeOrder.items.map((item, idx) => (
                  <div key={item.id} className="flex items-center gap-4 group">
                    <span className="font-mono text-[9px] text-white/30 w-4">{String(idx + 1).padStart(2, '0')}</span>
                    <div className="w-12 h-16 bg-[#454545] border border-white/10 overflow-hidden shrink-0">
                      <img src={item.frontImagePreview} alt="" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity grayscale group-hover:grayscale-0" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-mono text-xs uppercase text-white tracking-widest truncate max-w-[180px]">
                        {item.cardName}
                      </span>
                      <span className="font-mono text-[9px] text-[#A4ACA1] uppercase tracking-widest">
                        {item.game} • {item.set}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Timeline (Blueprint Style) */}
          <div className="lg:col-span-8 flex flex-col">
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/30 mb-12">
              {language === 'es' ? 'Línea de Tiempo de Custodia' : 'Chain of Custody Timeline'}
            </span>

            <div className="flex flex-col relative border-l border-white/10 ml-2">
              {activeOrder.steps.map((step, idx) => {
                const isLast = idx === activeOrder.steps.length - 1;
                
                return (
                  <div key={idx} className="relative pl-12 pb-12 group">
                    {/* Node Marker */}
                    <div className="absolute left-0 top-0 -translate-x-[50%] flex items-center justify-center w-5 h-5 bg-[#454545]">
                      {step.completed ? (
                        <div className="w-1.5 h-1.5 bg-white rounded-none shadow-[0_0_10px_white]" />
                      ) : step.current ? (
                        <div className="relative flex items-center justify-center w-full h-full">
                          <div className="absolute w-3 h-3 border border-[#48C765] rounded-none animate-ping" />
                          <div className="w-1.5 h-1.5 bg-[#48C765] rounded-none shadow-[0_0_10px_#48C765]" />
                        </div>
                      ) : (
                        <div className="w-1 h-1 bg-white/20 rounded-none" />
                      )}
                    </div>

                    <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2 mb-3">
                      <h4 className={`font-['Oswald'] text-lg uppercase tracking-wide ${step.current ? 'text-[#48C765]' : step.completed ? 'text-white' : 'text-white/30'}`}>
                        {step.label}
                      </h4>
                      {step.timestamp && (
                        <span className="font-mono text-[10px] tracking-widest uppercase text-[#A4ACA1] shrink-0">
                          {step.timestamp}
                        </span>
                      )}
                    </div>
                    
                    <p className={`font-sans text-sm leading-relaxed max-w-xl ${step.completed || step.current ? 'text-[#A4ACA1]' : 'text-white/20'}`}>
                      {step.description}
                    </p>

                    {/* Connecting line highlight for completed segments */}
                    {step.completed && !isLast && (
                      <div className="absolute left-0 top-5 bottom-0 -translate-x-[50%] w-[1px] bg-white/30" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
