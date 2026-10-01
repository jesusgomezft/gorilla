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
  const [activeTab, setActiveTab] = useState<'overview' | 'submissions' | 'vault' | 'invoices'>('overview');
  const [filterGame, setFilterGame] = useState('ALL');
  const [showInvoiceModal, setShowInvoiceModal] = useState<string | null>(null);

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
    { id: 'submissions', label: language === 'es' ? 'PEDIDOS' : 'ORDERS' },
    { id: 'vault', label: language === 'es' ? 'CARTAS GRADUADAS' : 'GRADED CARDS' },
    { id: 'invoices', label: language === 'es' ? 'FACTURAS' : 'INVOICES' },
  ];

  return (
    <div className="min-h-screen bg-[#14170F] text-white selection:bg-[#48C765] selection:text-white pt-24 pb-20 relative overflow-hidden flex flex-col">
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#48C765]/[0.03] blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-white/[0.02] blur-[150px] pointer-events-none" />

      {/* Main Container */}
      <div className="max-w-[1400px] mx-auto w-full px-4 sm:px-6 lg:px-12 relative z-10 flex-1 flex flex-col lg:flex-row gap-8 lg:gap-12">
        
        {/* LEFT COLUMN: Sidebar Profile */}
        <aside className="lg:w-[320px] shrink-0 flex flex-col gap-6 lg:gap-8">
          
          {/* Profile Card */}
          <div className="bg-white/[0.02] border border-white/[0.05] p-5 sm:p-6 relative overflow-hidden group">
            <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-20 pointer-events-none mix-blend-overlay z-0" />
            {/* Accent Line */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#48C765] to-transparent opacity-70" />
            
            <div className="flex items-center gap-4 sm:gap-5 mb-6 sm:mb-8">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#2A2A2A] border border-white/[0.05] flex items-center justify-center relative shrink-0">
                <div className="absolute inset-0 bg-gradient-to-br from-[#48C765]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="font-['Oswald'] text-xl sm:text-2xl text-white tracking-widest relative z-10">CM</span>
              </div>
              <div className="flex flex-col z-10 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <div className="flex gap-[2px] h-2.5 items-end opacity-50 text-[#48C765]">
                    <div className="w-[2px] h-full bg-current"></div>
                    <div className="w-[1px] h-[70%] bg-current"></div>
                    <div className="w-[1px] h-[100%] bg-current"></div>
                  </div>
                  <span className="font-mono text-[8px] text-[#48C765] uppercase tracking-[0.3em] leading-none truncate">
                    VIP COLLECTOR
                  </span>
                </div>
                <h1 className="font-['Oswald'] text-xl sm:text-2xl uppercase tracking-wide text-white leading-none truncate">
                  Carlos Mendes
                </h1>
              </div>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <div className="flex justify-between items-center border-b border-white/[0.05] pb-2.5 sm:pb-3">
                <span className="font-mono text-[10px] text-[#A4ACA1] uppercase tracking-widest">Client ID</span>
                <span className="font-mono text-xs text-white">#GOR-8821</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/[0.05] pb-2.5 sm:pb-3">
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
              className="mt-6 sm:mt-8 w-full relative z-10 bg-transparent border border-[#48C765]/30 hover:border-[#48C765] hover:bg-[#48C765]/5 text-[#48C765] font-mono text-[10px] font-bold tracking-[0.2em] uppercase py-3 sm:py-3.5 transition-all flex items-center justify-center gap-3 group"
            >
              <span>{language === 'es' ? 'NUEVO ENVÍO' : 'NEW SUBMISSION'}</span>
              <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>

          {/* Navigation Tabs */}
          <nav className="grid grid-cols-2 sm:grid-cols-4 lg:flex lg:flex-col gap-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center justify-center lg:justify-between p-3 sm:p-4 text-center lg:text-left border transition-all duration-300 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.15em] sm:tracking-[0.2em] ${
                  activeTab === tab.id 
                    ? 'bg-[#48C765]/10 border-[#48C765]/50 text-[#48C765] font-bold shadow-[0_0_15px_rgba(72,199,101,0.15)]' 
                    : 'bg-white/[0.02] border-white/[0.05] text-[#A4ACA1] hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                <span className="truncate">{tab.label}</span>
                {activeTab === tab.id && (
                  <svg className="hidden lg:block w-3.5 h-3.5 text-[#48C765] shrink-0 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
            <div className="space-y-8 animate-in fade-in duration-700">
              
              {/* Premium Greeting Banner */}
              <div className="relative overflow-hidden bg-black/40 border border-white/[0.05] p-8 sm:p-10 shadow-2xl group">
                <div className="absolute inset-0 bg-gradient-to-r from-[#48C765]/10 to-transparent opacity-50 mix-blend-overlay" />
                <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-20 pointer-events-none mix-blend-overlay" />
                <div className="absolute top-0 right-0 w-64 h-full bg-gradient-to-l from-black/80 to-transparent z-0" />
                
                <div className="relative z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
                  <div>
                    <div className="mb-4">
                      <span className="font-sans font-bold text-[10px] text-[#48C765] uppercase tracking-[0.3em]">
                        {language === 'es' ? 'SISTEMA ONLINE' : 'SYSTEM ONLINE'}
                      </span>
                    </div>
                    <h2 className="font-['Oswald'] text-3xl sm:text-4xl text-white uppercase tracking-wide leading-none mb-2">
                      {language === 'es' ? 'Bienvenido,' : 'Welcome,'} <span className="text-[#A4ACA1]">Carlos</span>
                    </h2>
                    <p className="font-sans text-sm text-[#A4ACA1] max-w-md">
                      {language === 'es' 
                        ? 'Tu bóveda digital está segura. Tienes 1 envío en proceso de autenticación óptica de alta precisión.' 
                        : 'Your digital vault is secure. You have 1 submission undergoing high-precision optical authentication.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Stat 1 */}
                <div className="bg-white/[0.02] border border-white/[0.05] p-6 flex flex-col justify-between relative overflow-hidden group/stat">
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#48C765]/0 group-hover/stat:border-[#48C765]/50 transition-colors duration-500" />
                  <span className="font-mono text-[9px] text-[#A4ACA1] uppercase tracking-[0.2em] mb-4">
                    {language === 'es' ? 'Cartas Certificadas' : 'Certified Slabs'}
                  </span>
                  <div className="flex items-end gap-2">
                    <span className="font-['Oswald'] text-4xl text-white leading-none">{userCards.length}</span>
                    <span className="font-mono text-[10px] text-[#48C765] mb-1">TOTAL</span>
                  </div>
                </div>

                {/* Stat 2 */}
                <div className="bg-white/[0.02] border border-white/[0.05] p-6 flex flex-col justify-between relative overflow-hidden group/stat">
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-white/0 group-hover/stat:border-white/[0.05] transition-colors duration-500" />
                  <span className="font-mono text-[9px] text-[#A4ACA1] uppercase tracking-[0.2em] mb-4">
                    {language === 'es' ? 'Pedidos Históricos' : 'Historical Orders'}
                  </span>
                  <div className="flex items-end gap-2">
                    <span className="font-['Oswald'] text-4xl text-white leading-none">{MOCK_ORDERS.length}</span>
                    <span className="font-mono text-[10px] text-[#A4ACA1] mb-1">ORDERS</span>
                  </div>
                </div>

                {/* Stat 3 */}
                <div className="bg-[#48C765]/5 border border-[#48C765]/20 p-6 flex flex-col justify-between relative overflow-hidden group/stat">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#48C765]/10 to-transparent opacity-0 group-hover/stat:opacity-100 transition-opacity duration-500" />
                  <span className="font-mono text-[9px] text-[#48C765] uppercase tracking-[0.2em] mb-4">
                    {language === 'es' ? 'Rango Coleccionista' : 'Collector Rank'}
                  </span>
                  <div className="flex items-end gap-2 relative z-10">
                    <span className="font-['Oswald'] text-2xl text-white leading-none mt-2">VIP ELITE</span>
                  </div>
                </div>
              </div>

              {/* Active Order Tracker */}
              {activeOrder && (
                <div className="bg-white/[0.02] border border-white/[0.05] p-6 md:p-8 relative">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="px-2 py-1 bg-[#48C765]/20 border border-[#48C765]/30 text-[#48C765] font-mono text-[9px] uppercase tracking-widest">
                          {language === 'es' ? 'EN PROCESO' : 'IN PROGRESS'}
                        </span>
                        <span className="font-mono text-xs text-[#A4ACA1]">ID: {activeOrder.id}</span>
                      </div>
                      <h3 className="font-['Oswald'] text-2xl text-white uppercase tracking-wide">
                        {activeOrder.items.length} {language === 'es' ? 'Cartas' : 'Cards'} - Optical Grading
                      </h3>
                    </div>
                    <button
                      onClick={() => onNavigate('/track')}
                      className="text-[#48C765] hover:text-white font-mono text-[10px] uppercase tracking-widest flex items-center gap-2 transition-colors"
                    >
                      {language === 'es' ? 'Rastreo en Vivo' : 'Live Tracking'}
                      <span>→</span>
                    </button>
                  </div>

                  {/* Progress Bar UI */}
                  <div className="overflow-x-auto pb-6 pt-6 -mx-2 px-2 scrollbar-none">
                    <div className="min-w-[460px] sm:min-w-full relative pt-4 pb-2">
                      {/* Background Track */}
                      <div className="absolute top-1/2 left-0 w-full h-[2px] bg-white/10 -translate-y-1/2" />
                      {/* Active Track */}
                      <div className="absolute top-1/2 left-0 w-[60%] h-[2px] bg-[#48C765] -translate-y-1/2 shadow-[0_0_10px_#48C765]" />
                      
                      {/* Steps */}
                      <div className="relative z-10 flex justify-between items-center px-1">
                        {['RECEIVED', 'CLEANROOM', 'SPECTROMETRY', 'GRADING', 'ENCAPSULATION'].map((step, idx) => {
                          const isActive = idx < 3; // Mock current step
                          const isCurrent = idx === 2;
                          return (
                            <div key={step} className="flex flex-col items-center gap-3 group/step relative">
                              <div className={`w-3 h-3 rotate-45 border transition-all duration-300 ${
                                isCurrent ? 'bg-[#48C765] border-[#48C765] shadow-[0_0_15px_#48C765] scale-150' 
                                : isActive ? 'bg-[#48C765] border-[#48C765]' 
                                : 'bg-[#454545] border-white/[0.05]'
                              }`} />
                              <span className={`absolute top-6 font-mono text-[8px] uppercase tracking-widest whitespace-nowrap ${
                                isCurrent ? 'text-[#48C765] font-bold' 
                                : isActive ? 'text-white' 
                                : 'text-[#A4ACA1]'
                              }`}>
                                {step}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Showcase / Highlight */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-[url('/images/step_3_spectrometry.jpg')] bg-cover bg-center border border-white/[0.05] relative overflow-hidden group min-h-[250px]">
                  <div className="absolute inset-0 bg-black/70 group-hover:bg-black/50 transition-colors duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                  
                  <div className="absolute bottom-6 left-6 right-6">
                    <span className="font-mono text-[9px] text-[#48C765] uppercase tracking-widest mb-2 block">
                      {language === 'es' ? 'Descubre la Tecnología' : 'Discover the Tech'}
                    </span>
                    <h3 className="font-['Oswald'] text-2xl text-white uppercase tracking-wide mb-4">
                      {language === 'es' ? 'Espectrometría en Detalle' : 'Spectrometry in Detail'}
                    </h3>
                    <button onClick={() => onNavigate('/technology')} className="text-white hover:text-[#48C765] font-mono text-[9px] uppercase tracking-widest flex items-center gap-2 transition-colors w-fit border-b border-white/[0.05] hover:border-[#48C765] pb-1">
                      {language === 'es' ? 'Leer Más' : 'Read More'} <span>→</span>
                    </button>
                  </div>
                </div>

                <div className="bg-[url('/images/preservar.png')] bg-cover bg-center border border-white/[0.05] relative overflow-hidden group min-h-[250px]">
                  <div className="absolute inset-0 bg-black/70 group-hover:bg-black/50 transition-colors duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                  
                  <div className="absolute bottom-6 left-6 right-6">
                    <span className="font-mono text-[9px] text-white/50 uppercase tracking-widest mb-2 block">
                      {language === 'es' ? 'Tu Colección' : 'Your Collection'}
                    </span>
                    <h3 className="font-['Oswald'] text-2xl text-white uppercase tracking-wide mb-4">
                      {language === 'es' ? 'Ver Cartas Graduadas' : 'View Graded Cards'}
                    </h3>
                    <button onClick={() => setActiveTab('vault')} className="text-white hover:text-[#48C765] font-mono text-[9px] uppercase tracking-widest flex items-center gap-2 transition-colors w-fit border-b border-white/[0.05] hover:border-[#48C765] pb-1">
                      {language === 'es' ? 'Ir a la Bóveda' : 'Go to Vault'} <span>→</span>
                    </button>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB: SUBMISSIONS */}
          {activeTab === 'submissions' && (
            <div className="space-y-8 sm:space-y-12 animate-in fade-in duration-700">
              
              <div>
                <h2 className="font-['Oswald'] text-2xl sm:text-3xl text-white uppercase tracking-wide mb-2">
                  {language === 'es' ? 'Historial de Envíos' : 'Submission History'}
                </h2>
                <p className="font-sans text-xs sm:text-sm text-[#A4ACA1]">
                  {language === 'es' ? 'Rastrea y revisa todos tus procesos.' : 'Track and review all your past and present submissions.'}
                </p>
              </div>

              {/* Mobile Card View (< md) */}
              <div className="flex flex-col gap-3.5 md:hidden">
                {[activeOrder, ...pastOrders].map((order, idx) => (
                  <div key={order.id} className="bg-white/[0.02] border border-white/[0.06] p-4 flex flex-col gap-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-white text-xs font-bold tracking-wider">{order.id}</span>
                      <span className={`inline-flex items-center px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest border ${
                        idx === 0 
                          ? 'border-[#48C765]/30 text-[#48C765] bg-[#48C765]/10' 
                          : 'border-white/[0.05] text-[#A4ACA1] bg-white/5'
                      }`}>
                        {order.status.replace('_', ' ')}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-[#A4ACA1] border-t border-b border-white/[0.04] py-2">
                      <span className="font-mono text-[11px]">{order.createdAt}</span>
                      <span className="text-white font-medium">{order.items.length} {language === 'es' ? 'cartas' : 'cards'}</span>
                    </div>
                    <div className="flex justify-end pt-0.5">
                      <button
                        onClick={() => onNavigate('/track')}
                        className="text-[#48C765] hover:text-white font-mono text-[10px] uppercase tracking-widest flex items-center gap-1.5 py-1"
                      >
                        <span>{language === 'es' ? 'Ver Seguimiento' : 'View Tracking'}</span>
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop Table View (>= md) */}
              <div className="hidden md:block bg-white/[0.02] border border-white/[0.05] overflow-x-auto">
                <table className="w-full text-left font-sans text-sm min-w-[620px] whitespace-nowrap">
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
                              : 'border-white/[0.05] text-[#A4ACA1] bg-white/5'
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

                <div className="flex items-center gap-2 border border-white/[0.05] p-1 bg-white/[0.02]">
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
                        className="w-8 h-8 flex items-center justify-center border border-white/[0.05] text-[#A4ACA1] hover:border-[#48C765] hover:text-[#48C765] rounded-full transition-colors"
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

          {/* TAB: INVOICES */}
          {activeTab === 'invoices' && (
            <div className="space-y-8 sm:space-y-12 animate-in fade-in duration-700">
              <div>
                <h2 className="font-['Oswald'] text-2xl sm:text-3xl text-white uppercase tracking-wide mb-2">
                  {language === 'es' ? 'Facturación' : 'Billing & Invoices'}
                </h2>
                <p className="font-sans text-xs sm:text-sm text-[#A4ACA1]">
                  {language === 'es' ? 'Historial de facturas asociadas a tus pedidos.' : 'History of invoices associated with your orders.'}
                </p>
              </div>

              {/* Mobile Card View (< md) */}
              <div className="flex flex-col gap-3.5 md:hidden">
                {[
                  { id: 'INV-2026-0892', date: 'Sep 15, 2026', orderRef: 'GG-ORD-88219', amount: '€45.00' },
                  { id: 'INV-2026-0741', date: 'Aug 02, 2026', orderRef: 'GG-ORD-88102', amount: '€120.00' },
                ].map((inv) => (
                  <div key={inv.id} className="bg-white/[0.02] border border-white/[0.06] p-4 flex flex-col gap-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-white text-xs font-bold tracking-wider">{inv.id}</span>
                      <span className="inline-flex items-center px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest border border-[#48C765]/30 text-[#48C765] bg-[#48C765]/10">
                        {language === 'es' ? 'PAGADO' : 'PAID'}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs border-t border-b border-white/[0.04] py-2.5">
                      <div className="flex flex-col gap-0.5">
                        <span className="font-mono text-[10px] text-[#A4ACA1] uppercase tracking-wider">{language === 'es' ? 'Fecha' : 'Date'}</span>
                        <span className="text-white text-xs font-mono">{inv.date}</span>
                      </div>
                      <div className="flex flex-col gap-0.5 items-center">
                        <span className="font-mono text-[10px] text-[#A4ACA1] uppercase tracking-wider">{language === 'es' ? 'Pedido' : 'Order'}</span>
                        <span className="text-[#A4ACA1] text-xs font-mono">{inv.orderRef}</span>
                      </div>
                      <div className="flex flex-col gap-0.5 items-end">
                        <span className="font-mono text-[10px] text-[#A4ACA1] uppercase tracking-wider">Total</span>
                        <span className="font-['Oswald'] text-base text-white">{inv.amount}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-0.5">
                      <button 
                        onClick={() => setShowInvoiceModal(inv.id)}
                        className="text-[#48C765] hover:text-white font-mono text-[10px] uppercase tracking-widest flex items-center gap-1.5 py-1"
                      >
                        <span>{language === 'es' ? 'Ver' : 'View'}</span>
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      <button className="text-[#A4ACA1] hover:text-white font-mono text-[10px] uppercase tracking-widest flex items-center gap-1.5 py-1">
                        <span>{language === 'es' ? 'Descargar' : 'Download'}</span>
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop Table View (>= md) */}
              <div className="hidden md:block bg-white/[0.02] border border-white/[0.05] overflow-x-auto">
                <table className="w-full text-left font-sans text-sm min-w-[650px] whitespace-nowrap">
                  <thead>
                    <tr className="border-b border-white/[0.05] bg-white/[0.01]">
                      <th className="px-6 py-4 font-mono text-[10px] text-[#A4ACA1] uppercase tracking-widest font-normal">
                        {language === 'es' ? 'Nº Factura' : 'Invoice ID'}
                      </th>
                      <th className="px-6 py-4 font-mono text-[10px] text-[#A4ACA1] uppercase tracking-widest font-normal">
                        {language === 'es' ? 'Fecha' : 'Date'}
                      </th>
                      <th className="px-6 py-4 font-mono text-[10px] text-[#A4ACA1] uppercase tracking-widest font-normal">
                        {language === 'es' ? 'Pedido Asociado' : 'Order Ref'}
                      </th>
                      <th className="px-6 py-4 font-mono text-[10px] text-[#A4ACA1] uppercase tracking-widest font-normal">
                        {language === 'es' ? 'Total' : 'Amount'}
                      </th>
                      <th className="px-6 py-4 font-mono text-[10px] text-[#A4ACA1] uppercase tracking-widest font-normal">
                        {language === 'es' ? 'Estado' : 'Status'}
                      </th>
                      <th className="px-6 py-4 font-mono text-[10px] text-[#A4ACA1] uppercase tracking-widest font-normal">
                        {language === 'es' ? 'Acción' : 'Action'}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.05]">
                    <tr className="hover:bg-white/[0.02] transition-colors group">
                      <td className="px-6 py-5 font-mono text-white text-xs">INV-2026-0892</td>
                      <td className="px-6 py-5 text-[#A4ACA1]">Sep 15, 2026</td>
                      <td className="px-6 py-5 font-mono text-[#A4ACA1] text-xs">GG-ORD-88219</td>
                      <td className="px-6 py-5 text-white font-['Oswald'] tracking-wide">€45.00</td>
                      <td className="px-6 py-5">
                        <span className="inline-flex items-center px-2 py-1 font-mono text-[9px] uppercase tracking-widest border border-[#48C765]/30 text-[#48C765] bg-[#48C765]/10">
                          {language === 'es' ? 'PAGADO' : 'PAID'}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-4">
                          <button 
                            onClick={() => setShowInvoiceModal('INV-2026-0892')}
                            className="text-[#48C765] hover:text-white font-mono text-[10px] uppercase tracking-widest flex items-center gap-1 opacity-70 group-hover:opacity-100 transition-opacity"
                          >
                            <span>{language === 'es' ? 'Ver' : 'View'}</span>
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                          </button>
                          <button className="text-[#48C765] hover:text-white font-mono text-[10px] uppercase tracking-widest flex items-center gap-1 opacity-50 group-hover:opacity-100 transition-opacity">
                            <span>{language === 'es' ? 'Descargar' : 'Download'}</span>
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr className="hover:bg-white/[0.02] transition-colors group">
                      <td className="px-6 py-5 font-mono text-white text-xs">INV-2026-0741</td>
                      <td className="px-6 py-5 text-[#A4ACA1]">Aug 02, 2026</td>
                      <td className="px-6 py-5 font-mono text-[#A4ACA1] text-xs">GG-ORD-88102</td>
                      <td className="px-6 py-5 text-white font-['Oswald'] tracking-wide">€120.00</td>
                      <td className="px-6 py-5">
                        <span className="inline-flex items-center px-2 py-1 font-mono text-[9px] uppercase tracking-widest border border-[#48C765]/30 text-[#48C765] bg-[#48C765]/10">
                          {language === 'es' ? 'PAGADO' : 'PAID'}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-4">
                          <button 
                            onClick={() => setShowInvoiceModal('INV-2026-0741')}
                            className="text-[#48C765] hover:text-white font-mono text-[10px] uppercase tracking-widest flex items-center gap-1 opacity-70 group-hover:opacity-100 transition-opacity"
                          >
                            <span>{language === 'es' ? 'Ver' : 'View'}</span>
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                          </button>
                          <button className="text-[#48C765] hover:text-white font-mono text-[10px] uppercase tracking-widest flex items-center gap-1 opacity-50 group-hover:opacity-100 transition-opacity">
                            <span>{language === 'es' ? 'Descargar' : 'Download'}</span>
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>

      </div>
      {/* Invoice Modal */}
      {showInvoiceModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4">
          <div className="absolute inset-0 bg-[#14170F]/90 backdrop-blur-sm" onClick={() => setShowInvoiceModal(null)} />
          <div className="relative bg-[#2B302B] border border-white/[0.05] shadow-2xl w-full max-w-3xl flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-200 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/[0.05]">
              <div>
                <h3 className="font-['Oswald'] text-xl sm:text-2xl uppercase tracking-wide">
                  {language === 'es' ? 'FACTURA' : 'INVOICE'} <span className="text-[#48C765]">{showInvoiceModal}</span>
                </h3>
                <p className="font-mono text-[10px] text-[#A4ACA1] uppercase tracking-widest mt-0.5 sm:mt-1">
                  Gorilla Grading Europe S.L.
                </p>
              </div>
              <button onClick={() => setShowInvoiceModal(null)} className="p-2 hover:bg-white/[0.05] transition-colors rounded-full text-[#A4ACA1] hover:text-white">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Content */}
            <div className="p-4 sm:p-6 md:p-8 overflow-y-auto">
              <div className="flex flex-col sm:flex-row justify-between mb-8 sm:mb-12 gap-6 sm:gap-8">
                <div>
                  <h4 className="font-sans text-[10px] font-bold text-[#A4ACA1] uppercase tracking-widest mb-2">{language === 'es' ? 'FACTURAR A:' : 'BILLED TO:'}</h4>
                  <p className="text-sm">Miguel García</p>
                  <p className="text-sm text-[#A4ACA1]">Calle Principal 123</p>
                  <p className="text-sm text-[#A4ACA1]">28001 Madrid, España</p>
                </div>
                <div className="sm:text-right">
                  <h4 className="font-sans text-[10px] font-bold text-[#A4ACA1] uppercase tracking-widest mb-2">{language === 'es' ? 'DETALLES:' : 'DETAILS:'}</h4>
                  <p className="text-sm"><span className="text-[#A4ACA1]">{language === 'es' ? 'Fecha:' : 'Date:'}</span> Sep 15, 2026</p>
                  <p className="text-sm"><span className="text-[#A4ACA1]">{language === 'es' ? 'Pedido:' : 'Order:'}</span> GG-ORD-88219</p>
                  <p className="text-sm"><span className="text-[#A4ACA1]">{language === 'es' ? 'Estado:' : 'Status:'}</span> <span className="text-[#48C765]">{language === 'es' ? 'PAGADO' : 'PAID'}</span></p>
                </div>
              </div>

              <div className="border border-white/[0.05] rounded-none overflow-x-auto mb-6 sm:mb-8">
                <table className="w-full text-left font-sans text-xs sm:text-sm min-w-[340px] sm:min-w-full">
                  <thead className="bg-white/[0.02] border-b border-white/[0.05]">
                    <tr>
                      <th className="px-3 sm:px-4 py-3 font-mono text-[10px] text-[#A4ACA1] uppercase tracking-widest font-normal">{language === 'es' ? 'Descripción' : 'Description'}</th>
                      <th className="px-3 sm:px-4 py-3 font-mono text-[10px] text-[#A4ACA1] uppercase tracking-widest font-normal text-center">{language === 'es' ? 'Cant.' : 'Qty'}</th>
                      <th className="px-3 sm:px-4 py-3 font-mono text-[10px] text-[#A4ACA1] uppercase tracking-widest font-normal text-right">{language === 'es' ? 'Precio' : 'Price'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.05]">
                    <tr>
                      <td className="px-3 sm:px-4 py-3 sm:py-4">Standard Grading Service (15 Days)</td>
                      <td className="px-3 sm:px-4 py-3 sm:py-4 text-center text-[#A4ACA1]">1</td>
                      <td className="px-3 sm:px-4 py-3 sm:py-4 text-right">€30.00</td>
                    </tr>
                    <tr>
                      <td className="px-3 sm:px-4 py-3 sm:py-4">Sub-Grades Addon</td>
                      <td className="px-3 sm:px-4 py-3 sm:py-4 text-center text-[#A4ACA1]">1</td>
                      <td className="px-3 sm:px-4 py-3 sm:py-4 text-right">€5.00</td>
                    </tr>
                    <tr>
                      <td className="px-3 sm:px-4 py-3 sm:py-4">Insured Return Shipping (EU)</td>
                      <td className="px-3 sm:px-4 py-3 sm:py-4 text-center text-[#A4ACA1]">1</td>
                      <td className="px-3 sm:px-4 py-3 sm:py-4 text-right">€10.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="flex justify-end">
                <div className="w-full max-w-[250px]">
                  <div className="flex justify-between py-2 border-b border-white/[0.05] text-sm text-[#A4ACA1]">
                    <span>Subtotal</span>
                    <span>€45.00</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/[0.05] text-sm text-[#A4ACA1]">
                    <span>IVA (21%)</span>
                    <span>€0.00</span>
                  </div>
                  <div className="flex justify-between py-3 sm:py-4 text-lg font-['Oswald'] tracking-wide text-white">
                    <span>Total</span>
                    <span className="text-[#48C765]">€45.00</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 sm:p-6 border-t border-white/[0.05] bg-white/[0.01] flex flex-col-reverse sm:flex-row sm:justify-end gap-3 sm:gap-4">
              <button 
                onClick={() => setShowInvoiceModal(null)}
                className="w-full sm:w-auto px-6 py-2.5 border border-white/[0.1] hover:bg-white/[0.05] text-white font-mono text-[10px] uppercase tracking-widest transition-colors text-center"
              >
                {language === 'es' ? 'Cerrar' : 'Close'}
              </button>
              <button className="w-full sm:w-auto justify-center px-6 py-2.5 bg-[#48C765] hover:bg-[#38B554] text-[#14170F] font-mono text-[10px] font-bold tracking-widest uppercase transition-colors flex items-center gap-2">
                <span>{language === 'es' ? 'Descargar PDF' : 'Download PDF'}</span>
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
