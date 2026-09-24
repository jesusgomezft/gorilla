import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { MOCK_GRADED_CARDS } from '../data/mockCards';
import { MOCK_ORDERS } from '../data/mockOrders';
import { SlabCard } from '../components/common/SlabCard';

interface CollectorVaultPageProps {
  onNavigate: (path: string) => void;
}

export const CollectorVaultPage: React.FC<CollectorVaultPageProps> = ({ onNavigate }) => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'overview' | 'submissions' | 'vault'>('overview');
  const [filterGame, setFilterGame] = useState('ALL');

  const userCards = MOCK_GRADED_CARDS;
  const activeOrder = MOCK_ORDERS[0];
  const pastOrders = MOCK_ORDERS.slice(1);

  const totalVaultValue = userCards.reduce((acc, c) => acc + c.declaredValueEur, 0);

  const filteredCards = filterGame === 'ALL'
    ? userCards
    : userCards.filter(c => c.game.toUpperCase().includes(filterGame));

  // TABS
  const tabs = [
    { id: 'overview', label: language === 'es' ? 'RESUMEN' : 'OVERVIEW' },
    { id: 'submissions', label: language === 'es' ? 'ENVÍOS' : 'SUBMISSIONS' },
    { id: 'vault', label: language === 'es' ? 'MI BÓVEDA' : 'MY VAULT' },
  ];

  return (
    <div className="min-h-screen bg-[#454545] text-white selection:bg-[#48C765] selection:text-white pt-24 pb-20 relative overflow-hidden flex flex-col">
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#48C765]/[0.03] blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-black/20 blur-[150px] pointer-events-none" />

      {/* Main Container */}
      <div className="max-w-[1400px] mx-auto w-full px-6 lg:px-12 relative z-10 flex-1 flex flex-col lg:flex-row gap-12">
        
        {/* LEFT COLUMN: Sidebar Profile */}
        <aside className="lg:w-[320px] shrink-0 flex flex-col gap-8">
          
          {/* Profile Card */}
          <div className="bg-black/20 border border-white/5 p-6 relative overflow-hidden group">
            <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-20 pointer-events-none mix-blend-overlay z-0" />
            {/* Accent Line */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#48C765] to-transparent opacity-70" />
            
            <div className="flex items-center gap-5 mb-8">
              <div className="w-16 h-16 bg-[#2A2A2A] border border-white/10 flex items-center justify-center relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#48C765]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="font-['Oswald'] text-2xl text-white tracking-widest relative z-10">CM</span>
              </div>
              <div className="flex flex-col z-10">
                <div className="flex items-center gap-2 mb-1">
                  <div className="flex gap-[2px] h-2.5 items-end opacity-50 text-[#48C765]">
                    <div className="w-[2px] h-full bg-current"></div>
                    <div className="w-[1px] h-[70%] bg-current"></div>
                    <div className="w-[1px] h-[100%] bg-current"></div>
                  </div>
                  <span className="font-mono text-[8px] text-[#48C765] uppercase tracking-[0.3em] leading-none">
                    VIP COLLECTOR
                  </span>
                </div>
                <h1 className="font-['Oswald'] text-2xl uppercase tracking-wide text-white leading-none">
                  Carlos Mendes
                </h1>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-white/[0.05] pb-3">
                <span className="font-mono text-[10px] text-[#A4ACA1] uppercase tracking-widest">Client ID</span>
                <span className="font-mono text-xs text-white">#GOR-8821</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/[0.05] pb-3">
                <span className="font-mono text-[10px] text-[#A4ACA1] uppercase tracking-widest">Member Since</span>
                <span className="font-mono text-xs text-white">2025</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-mono text-[10px] text-[#A4ACA1] uppercase tracking-widest">Location</span>
                <span className="font-mono text-xs text-white">Madrid, ES</span>
              </div>
            </div>

            <button
              onClick={() => onNavigate('/submit')}
              className="mt-8 w-full relative z-10 bg-transparent border border-[#48C765]/30 hover:border-[#48C765] hover:bg-[#48C765]/5 text-[#48C765] font-mono text-[10px] font-bold tracking-[0.2em] uppercase py-3.5 transition-all flex items-center justify-center gap-3 group"
            >
              <span>{language === 'es' ? 'NUEVO ENVÍO' : 'NEW SUBMISSION'}</span>
              <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex flex-col gap-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center justify-between p-4 border transition-all duration-300 font-mono text-[11px] uppercase tracking-[0.2em] ${
                  activeTab === tab.id 
                    ? 'bg-white/[0.05] border-[#48C765]/30 text-white' 
                    : 'bg-transparent border-transparent text-[#A4ACA1] hover:text-white hover:bg-white/[0.02]'
                }`}
              >
                <span>{tab.label}</span>
                {activeTab === tab.id && (
                  <svg className="w-3.5 h-3.5 text-[#48C765]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                )}
              </button>
            ))}
          </nav>
        </aside>

        {/* RIGHT COLUMN: Content Area */}
        <div className="flex-1 min-w-0">
          
          {/* TAB: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-12 animate-in fade-in duration-700">
              
              {/* Header */}
              <div>
                <h2 className="font-['Oswald'] text-2xl sm:text-3xl text-white uppercase tracking-wide mb-2">
                  {language === 'es' ? 'Panel de Control' : 'Dashboard Overview'}
                </h2>
                <p className="font-sans text-xs sm:text-sm text-[#A4ACA1]">
                  {language === 'es' ? 'Métricas de tu colección certificada.' : 'Metrics for your certified collection.'}
                </p>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Value Card */}
                <div className="bg-black/20 border border-white/5 p-6 md:p-8 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-10 pointer-events-none mix-blend-overlay z-0" />
                  
                  <div className="absolute top-0 right-0 h-full w-[2px] bg-gradient-to-b from-[#48C765]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  
                  <p className="font-mono text-[9px] text-[#A4ACA1] uppercase tracking-[0.3em] mb-4 relative z-10 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#48C765]/50 rounded-sm"></span>
                    {language === 'es' ? 'Valor Total Estimado' : 'Total Portfolio Value'}
                  </p>
                  <div className="flex items-baseline gap-1 relative z-10">
                    <span className="font-mono text-xl text-[#48C765]">€</span>
                    <span className="font-['Oswald'] text-4xl sm:text-5xl text-white">{totalVaultValue.toLocaleString()}</span>
                  </div>
                </div>

                {/* Cards Card */}
                <div className="bg-black/20 border border-white/5 p-6 md:p-8 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-10 pointer-events-none mix-blend-overlay z-0" />
                  
                  <div className="absolute top-0 right-0 h-full w-[2px] bg-gradient-to-b from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                  <p className="font-mono text-[9px] text-[#A4ACA1] uppercase tracking-[0.3em] mb-4 relative z-10 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-white/30 rounded-sm"></span>
                    {language === 'es' ? 'Cartas Certificadas' : 'Certified Slabs'}
                  </p>
                  <div className="flex items-baseline gap-3 relative z-10">
                    <span className="font-['Oswald'] text-4xl sm:text-5xl text-white">{userCards.length}</span>
                    <span className="font-mono text-[10px] text-[#A4ACA1] tracking-[0.3em]">{language === 'es' ? 'UNIDADES' : 'UNITS'}</span>
                  </div>
                </div>

              </div>

              {/* Active Order Highlight */}
              {activeOrder && (
                <div className="bg-black/30 border border-white/5 relative overflow-hidden group flex flex-col sm:flex-row">
                  {/* Left Accent Bar */}
                  <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#48C765] to-[#48C765]/10" />
                  
                  {/* Noise Texture */}
                  <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-10 pointer-events-none mix-blend-overlay z-0" />
                  
                  {/* Content Left (Info) */}
                  <div className="p-6 md:p-8 relative z-10 flex-1 border-b sm:border-b-0 sm:border-r border-white/5">
                    <div className="flex items-center gap-4 mb-4">
                      {/* Tech indicator instead of blinking circle */}
                      <div className="flex gap-[2px] h-3 items-end text-[#48C765]">
                        <div className="w-[1px] h-[60%] bg-current"></div>
                        <div className="w-[2px] h-[100%] bg-current"></div>
                        <div className="w-[1px] h-[40%] bg-current"></div>
                      </div>
                      <span className="font-mono text-[9px] text-[#48C765] uppercase tracking-[0.3em] font-bold">
                        {language === 'es' ? 'Envío Activo' : 'Active Submission'}
                      </span>
                    </div>
                    
                    <h3 className="font-['Oswald'] text-2xl sm:text-3xl text-white tracking-wide uppercase mb-1 leading-none">
                      {activeOrder.items.length} {language === 'es' ? 'Cartas en Proceso' : 'Cards in Progress'}
                    </h3>
                    
                    <div className="flex items-center gap-3 mt-4">
                      <span className="font-mono text-[10px] text-[#A4ACA1] uppercase tracking-[0.2em] bg-white/5 px-2 py-1">
                        ID: {activeOrder.id}
                      </span>
                      <span className="font-mono text-[10px] text-white uppercase tracking-[0.2em] bg-[#48C765]/10 border border-[#48C765]/20 px-2 py-1">
                        {activeOrder.status.replace('_', ' ')}
                      </span>
                    </div>
                  </div>

                  {/* Content Right (Action) */}
                  <div className="p-6 md:p-8 relative z-10 sm:w-[30%] flex items-center justify-center bg-white/[0.01]">
                    <button
                      onClick={() => onNavigate('/track')}
                      className="w-full relative z-10 bg-transparent border border-white/10 hover:border-[#48C765] text-[#A4ACA1] hover:text-[#48C765] px-6 py-4 font-mono text-[10px] uppercase tracking-[0.3em] transition-colors flex items-center justify-center gap-3 group/btn"
                    >
                      <span>{language === 'es' ? 'Seguimiento' : 'Live Tracking'}</span>
                      <svg className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* TAB: SUBMISSIONS */}
          {activeTab === 'submissions' && (
            <div className="space-y-12 animate-in fade-in duration-700">
              
              <div>
                <h2 className="font-['Oswald'] text-2xl sm:text-3xl text-white uppercase tracking-wide mb-2">
                  {language === 'es' ? 'Historial de Envíos' : 'Submission History'}
                </h2>
                <p className="font-sans text-xs sm:text-sm text-[#A4ACA1]">
                  {language === 'es' ? 'Rastrea y revisa todos tus procesos.' : 'Track and review all your past and present submissions.'}
                </p>
              </div>

              <div className="bg-white/[0.02] border border-white/[0.05] overflow-hidden">
                <table className="w-full text-left font-sans text-sm">
                  <thead>
                    <tr className="border-b border-white/[0.05] bg-white/[0.01]">
                      <th className="px-6 py-4 font-mono text-[10px] text-[#A4ACA1] uppercase tracking-widest font-normal">Order ID</th>
                      <th className="px-6 py-4 font-mono text-[10px] text-[#A4ACA1] uppercase tracking-widest font-normal">Date</th>
                      <th className="px-6 py-4 font-mono text-[10px] text-[#A4ACA1] uppercase tracking-widest font-normal">Items</th>
                      <th className="px-6 py-4 font-mono text-[10px] text-[#A4ACA1] uppercase tracking-widest font-normal">Status</th>
                      <th className="px-6 py-4 font-mono text-[10px] text-[#A4ACA1] uppercase tracking-widest font-normal">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.05]">
                    {[activeOrder, ...pastOrders].map((order, idx) => (
                      <tr key={order.id} className="hover:bg-white/[0.02] transition-colors group">
                        <td className="px-6 py-5 font-mono text-white text-xs">{order.id}</td>
                        <td className="px-6 py-5 text-[#A4ACA1]">{order.createdAt}</td>
                        <td className="px-6 py-5 text-white">{order.items.length} <span className="text-[#A4ACA1] text-xs">cards</span></td>
                        <td className="px-6 py-5">
                          <span className={`inline-flex items-center px-2 py-1 font-mono text-[9px] uppercase tracking-widest border ${
                            idx === 0 
                              ? 'border-[#48C765]/30 text-[#48C765] bg-[#48C765]/10' 
                              : 'border-white/20 text-[#A4ACA1] bg-white/5'
                          }`}>
                            {order.status.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="px-6 py-5">
                          <button
                            onClick={() => onNavigate('/track')}
                            className="text-[#48C765] hover:text-white font-mono text-[10px] uppercase tracking-widest flex items-center gap-1 opacity-50 group-hover:opacity-100 transition-opacity"
                          >
                            <span>{language === 'es' ? 'Ver' : 'View'}</span>
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          )}

          {/* TAB: VAULT */}
          {activeTab === 'vault' && (
            <div className="space-y-12 animate-in fade-in duration-700">
              
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
                <div>
                  <h2 className="font-['Oswald'] text-2xl sm:text-3xl text-white uppercase tracking-wide mb-2">
                    {language === 'es' ? 'Bóveda Digital' : 'Digital Vault'}
                  </h2>
                  <p className="font-sans text-xs sm:text-sm text-[#A4ACA1] max-w-md">
                    {language === 'es' 
                      ? 'Explora tus cartas certificadas en 3D. Selecciona una carta para ver su reporte óptico detallado.' 
                      : 'Explore your certified cards in 3D. Select a card to view its detailed optical report.'}
                  </p>
                </div>

                <div className="flex items-center gap-2 border border-white/[0.1] p-1 bg-white/[0.02]">
                  {['ALL', 'POKEMON', 'MAGIC'].map(game => (
                    <button
                      key={game}
                      onClick={() => setFilterGame(game)}
                      className={`px-4 py-2 font-mono text-[10px] uppercase tracking-widest transition-colors ${
                        filterGame === game 
                          ? 'bg-white/10 text-white' 
                          : 'text-[#A4ACA1] hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {game}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                {filteredCards.map(card => (
                  <div key={card.id} className="flex flex-col items-center group">
                    <SlabCard
                      card={card}
                      size="sm"
                      onInspect={() => onNavigate('/certificates/demo')}
                    />
                    <div className="w-full mt-6 bg-white/[0.02] border border-white/[0.05] p-4 flex items-center justify-between opacity-80 group-hover:opacity-100 transition-opacity">
                      <div className="flex flex-col">
                        <span className="font-mono text-[9px] text-[#A4ACA1] uppercase tracking-widest mb-1">
                          {language === 'es' ? 'Valuación' : 'Valuation'}
                        </span>
                        <span className="font-['Oswald'] text-lg text-white">
                          €{card.declaredValueEur.toLocaleString()}
                        </span>
                      </div>
                      <button
                        onClick={() => onNavigate('/certificates/demo')}
                        className="w-8 h-8 flex items-center justify-center border border-white/20 text-[#A4ACA1] hover:border-[#48C765] hover:text-[#48C765] rounded-full transition-colors"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
