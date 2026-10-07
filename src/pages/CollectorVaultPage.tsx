import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { MOCK_GRADED_CARDS } from '../data/mockCards';
import { MOCK_ORDERS } from '../data/mockOrders';
import { SlabCard } from '../components/common/SlabCard';

interface CollectorVaultPageProps {
  onNavigate: (path: string) => void;
}

export const CollectorVaultPage: React.FC<CollectorVaultPageProps> = ({ onNavigate }) => {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const [activeTab, setActiveTab] = useState<'overview' | 'submissions' | 'vault' | 'invoices'>('overview');
  const [filterGame, setFilterGame] = useState('ALL');
  const [showInvoiceModal, setShowInvoiceModal] = useState<string | null>(null);
  const [showTierModal, setShowTierModal] = useState<boolean>(false);
  const [expandedInvoices, setExpandedInvoices] = useState<Record<string, boolean>>({});

  const toggleInvoice = (id: string) => {
    setExpandedInvoices(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const userCards = MOCK_GRADED_CARDS;
  const activeOrder = MOCK_ORDERS[0];
  const pastOrders = MOCK_ORDERS.slice(1);

  const totalVaultValue = userCards.reduce((acc, c) => acc + c.declaredValueEur, 0);

  const filteredCards = filterGame === 'ALL'
    ? userCards
    : userCards.filter(c => c.game.toUpperCase().includes(filterGame));

  // TABS
  const tabs = [
    { id: 'overview', index: '01', label: language === 'es' ? 'RESUMEN' : 'OVERVIEW', count: null },
    { id: 'submissions', index: '02', label: language === 'es' ? 'EXPEDIENTES' : 'ORDERS', count: `${[activeOrder, ...pastOrders].length}` },
    { id: 'vault', index: '03', label: language === 'es' ? 'BÓVEDA DIGITAL' : 'GRADED VAULT', count: `${userCards.length}` },
    { id: 'invoices', index: '04', label: language === 'es' ? 'FACTURACIÓN' : 'INVOICES', count: '2' },
  ];

  const renderOrderStatusBadge = (status: string, isActive: boolean) => {
    switch (status) {
      case 'OPTICAL_GRADING':
        return (
          <div className="flex items-start gap-2.5 select-none text-left py-1">
            {/* Metrological Status Line Bar */}
            <div className="w-1 self-stretch bg-[#15803D] dark:bg-[#48C765] shrink-0 mt-0.5" />
            
            <div className="flex flex-col min-w-0">
              {/* Technical Protocol Header */}
              <div className="flex items-center gap-2">
                <span className="font-mono text-[9px] font-extrabold uppercase tracking-[0.2em] text-[#15803D] dark:text-[#48C765] leading-none">
                  {language === 'es' ? 'FASE 03 · ACTIVO' : 'STAGE 03 · ACTIVE'}
                </span>
                <span className="font-mono text-[8px] px-1 py-0.2 border border-[#15803D]/30 text-[#15803D] dark:text-[#48C765] font-bold uppercase leading-none">
                  1200 DPI
                </span>
              </div>

              {/* Main Status Title */}
              <span className={`font-['Oswald'] text-sm sm:text-base font-bold tracking-wide uppercase mt-1 leading-tight ${
                isLight ? 'text-[#14170F]' : 'text-white'
              }`}>
                {language === 'es' ? 'Peritaje Óptico Espectral' : 'Spectral Optical Audit'}
              </span>

              {/* Detail Telemetry Footnote */}
              <span className={`font-mono text-[10px] mt-0.5 leading-tight ${
                isLight ? 'text-neutral-600' : 'text-[#A4ACA1]'
              }`}>
                {language === 'es' 
                  ? 'Calibre láser 4 cuadrantes en curso' 
                  : '4-quadrant micrometric laser active'}
              </span>
            </div>
          </div>
        );

      case 'DELIVERED':
        return (
          <div className="flex items-start gap-2.5 select-none text-left py-1">
            {/* Archival Vault Status Line Bar */}
            <div className={`w-1 self-stretch shrink-0 mt-0.5 ${
              isLight ? 'bg-[#52594F]' : 'bg-neutral-500'
            }`} />
            
            <div className="flex flex-col min-w-0">
              {/* Technical Protocol Header */}
              <div className="flex items-center gap-2">
                <span className={`font-mono text-[9px] font-extrabold uppercase tracking-[0.2em] leading-none ${
                  isLight ? 'text-[#3E443A]' : 'text-neutral-300'
                }`}>
                  {language === 'es' ? 'REGISTRO COMPLETADO' : 'PROTOCOL COMPLETED'}
                </span>
                <span className={`font-mono text-[8px] px-1 py-0.2 border font-bold uppercase leading-none ${
                  isLight 
                    ? 'border-[#3E443A]/40 text-[#252A22] bg-black/5' 
                    : 'border-neutral-500 text-neutral-200 bg-white/5'
                }`}>
                  {language === 'es' ? 'CUSTODIADO' : 'VAULTED'}
                </span>
              </div>

              {/* Main Status Title */}
              <span className={`font-['Oswald'] text-sm sm:text-base font-bold tracking-wide uppercase mt-1 leading-tight ${
                isLight ? 'text-[#14170F]' : 'text-white'
              }`}>
                {language === 'es' ? 'Entregado en Bóveda' : 'Vaulted & Secured'}
              </span>

              {/* Detail Telemetry Footnote */}
              <span className={`font-mono text-[10px] mt-0.5 leading-tight ${
                isLight ? 'text-neutral-600' : 'text-[#A4ACA1]'
              }`}>
                {language === 'es' 
                  ? 'Custodia blindada certificada' 
                  : 'Certified armored vault custody'}
              </span>
            </div>
          </div>
        );

      default:
        return (
          <div className="flex items-center gap-2 py-1 select-none">
            <div className="w-1 h-6 bg-neutral-400 shrink-0" />
            <span className={`font-['Oswald'] text-sm font-bold uppercase tracking-wider ${
              isLight ? 'text-[#14170F]' : 'text-white'
            }`}>
              {status.replace('_', ' ')}
            </span>
          </div>
        );
    }
  };

  const invoicesData: Record<string, {
    id: string;
    date: string;
    orderId: string;
    hash: string;
    clientName: string;
    clientAddress: string;
    clientCity: string;
    items: Array<{ code: string; title: string; subtitle: string; qty: number; unitPrice: number; total: number }>;
    baseNet: number;
    vatRate: number;
    vatAmount: number;
    total: number;
  }> = {
    'INV-2026-0892': {
      id: 'INV-2026-0892',
      date: language === 'es' ? '15 SEP 2026 · 14:32 CET' : 'SEP 15, 2026 · 14:32 CET',
      orderId: 'GG-ORD-88219',
      hash: 'SHA256: 7F4A·90E1·8829·003C',
      clientName: 'Carlos Mendes',
      clientAddress: 'Calle Serrano 120, 4ºB',
      clientCity: '28006 Madrid, España',
      items: [
        {
          code: 'SRV-STD-15D',
          title: language === 'es' ? 'Servicio de Graduación Standard (15 Días)' : 'Standard Grading Service (15 Days)',
          subtitle: language === 'es' ? 'Peritaje óptico 1200 DPI, cálculo centesimal y encapsulado sónico 35 kHz' : '1200 DPI multispectral imaging, centesimal centering & 35 kHz ultrasonic encapsulation',
          qty: 1,
          unitPrice: 30.00,
          total: 30.00
        },
        {
          code: 'OPT-SUB-4X',
          title: language === 'es' ? 'Suplemento Sub-Grados Ópticos Láser' : 'Sub-Grades Laser Optical Addon',
          subtitle: language === 'es' ? 'Telemetría de 4 cuadrantes con calibre láser de 0.01 mm (Centering, Corners, Edges, Surface)' : '4-quadrant micrometric laser telemetry (Centering, Corners, Edges, Surface)',
          qty: 1,
          unitPrice: 5.00,
          total: 5.00
        },
        {
          code: 'LOG-INS-EU',
          title: language === 'es' ? 'Custodia y Retorno Asegurado (UE)' : 'Insured Armored Return Shipping (EU)',
          subtitle: language === 'es' ? 'Tránsito blindado con seguro de valor real de reposición certificado' : 'Armored transit with certified full replacement market value insurance',
          qty: 1,
          unitPrice: 10.00,
          total: 10.00
        }
      ],
      baseNet: 37.19,
      vatRate: 21,
      vatAmount: 7.81,
      total: 45.00
    },
    'INV-2026-0741': {
      id: 'INV-2026-0741',
      date: language === 'es' ? '02 AGO 2026 · 11:15 CET' : 'AUG 02, 2026 · 11:15 CET',
      orderId: 'GG-ORD-88102',
      hash: 'SHA256: 9C3B·11D4·7702·884F',
      clientName: 'Carlos Mendes',
      clientAddress: 'Calle Serrano 120, 4ºB',
      clientCity: '28006 Madrid, España',
      items: [
        {
          code: 'SRV-EXP-05D',
          title: language === 'es' ? 'Servicio de Graduación Express Prioritario (5 Días)' : 'Express Priority Grading Service (5 Days)',
          subtitle: language === 'es' ? 'Admisión preferente en sala blanca ISO y doble peritaje óptico' : 'Priority ISO cleanroom admission & dual-operator optical audit',
          qty: 2,
          unitPrice: 50.00,
          total: 100.00
        },
        {
          code: 'LOG-PRI-EU',
          title: language === 'es' ? 'Transporte Retorno Blindado Express' : 'Express Armored Return Transit',
          subtitle: language === 'es' ? 'Entrega garantizada 24h con custodia con código de verificación' : 'Guaranteed 24h delivery with tamper-evident security custody',
          qty: 1,
          unitPrice: 20.00,
          total: 20.00
        }
      ],
      baseNet: 99.17,
      vatRate: 21,
      vatAmount: 20.83,
      total: 120.00
    }
  };

  return (
    <div className={`min-h-screen pt-24 pb-20 relative overflow-hidden flex flex-col transition-colors duration-300 ${
      isLight ? 'bg-[#F9F7F2] text-[#111827]' : 'bg-[#14170F] text-white'
    }`}>
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#48C765]/[0.03] blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-white/[0.02] blur-[150px] pointer-events-none" />

      {/* Main Container */}
      <div className="max-w-[1400px] mx-auto w-full px-4 sm:px-6 lg:px-12 relative z-10 flex-1 flex flex-col lg:flex-row gap-8 lg:gap-12">
        
        {/* LEFT COLUMN: Sidebar Profile */}
        {/* LEFT COLUMN: Sidebar Profile & Command Dossier */}
        <aside className="lg:w-[320px] shrink-0 flex flex-col gap-6 lg:gap-7">
          
          {/* Architectural Collector Credential Folio */}
          <div 
            className={`border relative overflow-hidden transition-all duration-300 shadow-sm p-5 sm:p-6 flex flex-col gap-5 ${
              isLight 
                ? 'bg-[#FAF8F5] border-[#D8D2C5] text-[#14170F]' 
                : 'bg-[#0E120F] border-white/10 text-white'
            }`}
            style={{
              backgroundImage: isLight 
                ? 'radial-gradient(circle, #D8D4CC 1px, transparent 1px)' 
                : 'radial-gradient(circle, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          >
            {/* Top Multi-Spectral Holographic Security Hairline */}
            <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-[#16A34A] via-[#38BDF8] via-[#A855F7] to-[#16A34A] opacity-90 z-20" />

            {/* Micro Corner Registry Marks */}
            <span className="absolute top-1.5 right-2 font-mono text-[7.5px] opacity-40 select-none pointer-events-none">[CREDENTIAL // G-8821] ┐</span>
            <span className="absolute bottom-1.5 right-2 font-mono text-[7.5px] opacity-40 select-none pointer-events-none">┘</span>

            {/* Profile Identity Lockup */}
            <div className="flex items-center gap-4 relative z-10">
              {/* Metrology Monogram Badge with Chip Indicator */}
              <div className={`w-14 h-14 sm:w-16 sm:h-16 border-2 flex flex-col items-center justify-center font-['Oswald'] shrink-0 relative shadow-sm ${
                isLight 
                  ? 'border-[#14170F] bg-[#14170F] text-white' 
                  : 'border-[#48C765] bg-[#48C765]/10 text-[#48C765]'
              }`}>
                <span className="text-xl sm:text-2xl font-bold leading-none">CM</span>
                {/* Micro Security Chip Holographic Tag */}
                <div className="flex items-center gap-0.5 mt-1 opacity-75">
                  <span className="w-1.5 h-1 bg-[#48C765] block" />
                  <span className="w-1 h-1 bg-amber-400 block" />
                  <span className="w-2 h-1 bg-sky-400 block" />
                </div>
              </div>

              <div className="flex flex-col min-w-0">
                {/* Laser Telemetry Rank Indicator */}
                <div className="flex items-center gap-1.5 mb-1">
                  <div className="flex gap-[2px] h-2.5 items-end text-[#16A34A] dark:text-[#48C765]">
                    <div className="w-[2px] h-full bg-current"></div>
                    <div className="w-[1.5px] h-[75%] bg-current"></div>
                    <div className="w-[2px] h-full bg-current"></div>
                  </div>
                  <span className="font-mono text-[8.5px] font-bold text-[#16A34A] dark:text-[#48C765] uppercase tracking-[0.26em] leading-none truncate">
                    VIP COLLECTOR // ARCHIVAL
                  </span>
                </div>
                
                <h1 className="font-['Oswald'] text-2xl uppercase tracking-wide leading-none truncate font-bold">
                  Carlos Mendes
                </h1>
                <span className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest mt-1">
                  AUTHENTICATED DOSSIER
                </span>
              </div>
            </div>

            {/* Metrological Telemetry Spec Matrix */}
            <div className={`space-y-2.5 border-t border-b border-current/10 py-3.5 font-mono text-xs relative z-10 ${
              isLight ? 'text-[#3E443A]' : 'text-[#A4ACA1]'
            }`}>
              <div className="flex justify-between items-center">
                <span className="text-[9.5px] uppercase tracking-wider text-neutral-400 font-normal">
                  {language === 'es' ? 'Expediente Cliente' : 'Client ID'}
                </span>
                <span className="font-bold text-current flex items-center gap-1.5">
                  <span>#GOR-8821</span>
                  <span className="text-[8px] px-1 py-0.2 border border-current/20 font-normal text-neutral-400">[CRC-88]</span>
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-[9.5px] uppercase tracking-wider text-neutral-400 font-normal">
                  {language === 'es' ? 'Acreditación' : 'Member Since'}
                </span>
                <span className="font-bold text-current">OCT 2025 · CERTIFICADO</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-[9.5px] uppercase tracking-wider text-neutral-400 font-normal">
                  {language === 'es' ? 'Jurisdicción' : 'Location'}
                </span>
                <span className="font-bold text-current">MADRID, ES (CLEANROOM 01)</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-[9.5px] uppercase tracking-wider text-neutral-400 font-normal">
                  {language === 'es' ? 'Bóveda Asignada' : 'Vault Tier'}
                </span>
                <span className="font-bold text-[#16A34A] dark:text-[#48C765]">VAULT-A // BIOMETRIC</span>
              </div>
            </div>

            {/* Signature Gorilla Grading Submission Action Button */}
            <button
              type="button"
              onClick={() => onNavigate('/submit')}
              className="btn-gorilla-square w-full py-3 px-4 text-[11px] font-extrabold tracking-[0.2em] uppercase flex items-center justify-center gap-3 cursor-pointer shadow-md group relative z-10"
            >
              <span>{language === 'es' ? 'NUEVO ENVÍO' : 'NEW SUBMISSION'}</span>
              <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>

          {/* Architectural Dossier Navigation Tabs */}
          <nav className="flex flex-col gap-2">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`group relative w-full p-3.5 sm:p-4 text-left border transition-all duration-200 font-mono flex items-center justify-between cursor-pointer select-none ${
                    isActive
                      ? (isLight 
                          ? 'bg-[#14170F] text-white border-[#14170F] shadow-sm' 
                          : 'bg-[#161F18] text-[#48C765] border-[#48C765]/60 shadow-[0_0_20px_rgba(72,199,101,0.12)]')
                      : (isLight 
                          ? 'bg-[#FAF8F5] hover:bg-[#F2EFE8] border-[#D8D2C5] text-[#14170F]' 
                          : 'bg-[#0E120F] hover:bg-white/[0.04] border-white/10 text-[#A4ACA1] hover:text-white')
                  }`}
                >
                  {/* Left Active Laser Notch Indicator */}
                  {isActive && (
                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#16A34A] dark:bg-[#48C765]" />
                  )}

                  <div className="flex items-center gap-3 pl-1">
                    <span className={`text-[9.5px] font-bold tracking-widest ${
                      isActive 
                        ? (isLight ? 'text-[#48C765]' : 'text-[#48C765]') 
                        : 'text-neutral-400'
                    }`}>
                      {tab.index}
                    </span>
                    <span className="text-[11px] font-bold uppercase tracking-[0.16em]">
                      {tab.label}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {tab.count && (
                      <span className={`text-[9px] font-mono px-2 py-0.5 border font-bold ${
                        isActive 
                          ? (isLight ? 'bg-white/10 text-white border-white/20' : 'bg-[#48C765]/20 text-[#48C765] border-[#48C765]/40')
                          : (isLight ? 'bg-neutral-200/60 text-neutral-600 border-neutral-300' : 'bg-white/[0.05] text-neutral-400 border-white/10')
                      }`}>
                        {tab.count}
                      </span>
                    )}
                    <svg 
                      className={`w-3.5 h-3.5 transition-transform ${
                        isActive 
                          ? 'translate-x-0 opacity-100 text-[#48C765]' 
                          : 'opacity-30 group-hover:opacity-70 group-hover:translate-x-0.5'
                      }`} 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>
              );
            })}
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
                    <h2 className="font-['Oswald'] text-3xl sm:text-4xl text-white uppercase tracking-wide leading-none mb-2 title-3d">
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

                {/* Stat 3: Collector Rank & Tier Dossier */}
                <div className={`p-6 flex flex-col justify-between relative overflow-hidden group/stat border transition-colors ${
                  isLight 
                    ? 'bg-white/80 border-[#D8D2C5] hover:border-[#14170F]/30' 
                    : 'bg-white/[0.02] border-white/[0.05] hover:border-white/15'
                }`}>
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-amber-400/0 group-hover/stat:border-amber-400/40 transition-colors duration-500 pointer-events-none" />
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className={`font-mono text-[9px] uppercase tracking-[0.2em] ${
                      isLight ? 'text-[#6B7268]' : 'text-[#A4ACA1]'
                    }`}>
                      {language === 'es' ? 'Rango Coleccionista' : 'Collector Rank'}
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowTierModal(true)}
                      className="font-mono text-[8.5px] text-[#16A34A] dark:text-[#48C765] hover:underline uppercase tracking-wider flex items-center gap-1 cursor-pointer transition-colors"
                      title={language === 'es' ? 'Ver criterios y beneficios del rango' : 'View tier criteria and benefits'}
                    >
                      <span>{language === 'es' ? 'Requisitos' : 'Criteria'}</span>
                      <span>→</span>
                    </button>
                  </div>

                  <div className="flex flex-col gap-2 relative z-10">
                    <div className="flex items-center gap-2.5">
                      <span className="badge-rarity-gold text-[10px] px-2.5 py-0.5 tracking-wider shadow-sm">
                        VIP ELITE
                      </span>
                      <span className="font-mono text-[9px] font-bold tracking-widest px-1.5 py-0.5 border border-amber-400/30 text-amber-300/90 bg-amber-400/5 uppercase">
                        TIER IV
                      </span>
                    </div>
                    <div className={`flex items-center justify-between text-[10px] font-mono mt-0.5 ${
                      isLight ? 'text-[#6B7268]' : 'text-[#A4ACA1]'
                    }`}>
                      <span className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A] dark:bg-[#48C765] animate-pulse" />
                        {language === 'es' ? '50+ Slabs · Master Grader' : '50+ Slabs · Master Grader'}
                      </span>
                      <span className="text-[#16A34A] dark:text-[#48C765] font-bold">
                        ★ TOP TIER
                      </span>
                    </div>
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
                <div className="bg-[url('/images/step_3_spectrometry.jpg')] bg-cover bg-center border border-black/20 relative overflow-hidden group min-h-[250px] rounded-none">
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

                <div className="bg-[url('/images/preservar.png')] bg-cover bg-center border border-black/20 relative overflow-hidden group min-h-[250px] rounded-none">
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
              
              {/* Telemetry Header */}
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.22em] text-[#16A34A] dark:text-[#48C765] font-bold mb-1.5">
                    <span>{language === 'es' ? '// REGISTRO METROLÓGICO DE EXPEDIENTES' : '// METROLOGICAL SUBMISSION REGISTRY'}</span>
                    <span className="text-neutral-400 font-normal">| G-LABS CADENA DE CUSTODIA</span>
                  </div>
                  <h2 className={`font-['Oswald'] text-2xl sm:text-3xl uppercase tracking-wide font-bold ${
                    isLight ? 'text-[#14170F]' : 'text-white'
                  }`}>
                    {language === 'es' ? 'Historial de Envíos & Seguimiento' : 'Submission History & Tracking'}
                  </h2>
                  <p className={`font-mono text-xs mt-1 max-w-xl ${
                    isLight ? 'text-neutral-600' : 'text-[#A4ACA1]'
                  }`}>
                    {language === 'es' 
                      ? 'Rastreo en tiempo real de lotes en laboratorio, admisión espectral y custodia blindada.' 
                      : 'Real-time telemetry and tracking for laboratory batches, spectral admission, and armored custody.'}
                  </p>
                </div>

                {/* Batch Metrics Plaque */}
                <div className={`px-4 py-2.5 border font-mono text-xs flex items-center gap-3 shrink-0 ${
                  isLight ? 'bg-white border-[#D8D2C5] shadow-sm text-[#14170F]' : 'bg-white/[0.03] border-white/10 text-white'
                }`}>
                  <span className="text-[9px] uppercase tracking-wider text-neutral-400">
                    {language === 'es' ? 'LOTES DECLARADOS' : 'DECLARED BATCHES'}
                  </span>
                  <span className="font-['Oswald'] text-base font-bold text-[#16A34A] dark:text-[#48C765]">
                    {[activeOrder, ...pastOrders].length} {language === 'es' ? 'EXPEDIENTES' : 'DOSSIERS'}
                  </span>
                </div>
              </div>

              {/* Mobile Card View (< md) with Alternating Zebra Rows */}
              <div className="flex flex-col gap-3.5 md:hidden">
                {[activeOrder, ...pastOrders].map((order, idx) => {
                  const isEven = idx % 2 === 0;
                  return (
                    <div 
                      key={order.id} 
                      className={`border p-4.5 flex flex-col gap-3.5 relative overflow-hidden transition-all duration-200 ${
                        isEven 
                          ? (isLight ? 'bg-[#FAF8F5] border-[#DCD5C7]' : 'bg-[#0E120F] border-white/10')
                          : (isLight ? 'bg-[#EFE9DE] border-[#D4CCA] shadow-inner' : 'bg-[#18201A] border-white/15')
                      }`}
                    >
                      {/* Left Status Marker */}
                      <div className={`absolute top-0 bottom-0 left-0 w-1 ${
                        idx === 0 ? 'bg-[#16A34A] dark:bg-[#48C765]' : 'bg-neutral-400/40'
                      }`} />

                      <div className="flex items-center justify-between gap-2 pl-2">
                        <div className="flex items-center gap-2">
                          <span className={`w-5 h-5 border flex items-center justify-center font-['Oswald'] text-[9px] font-bold ${
                            isLight ? 'border-[#14170F] text-[#14170F]' : 'border-white text-white'
                          }`}>
                            G
                          </span>
                          <span className={`font-['Oswald'] text-base font-bold tracking-wider ${
                            isLight ? 'text-[#14170F]' : 'text-white'
                          }`}>
                            {order.id}
                          </span>
                        </div>
                        {renderOrderStatusBadge(order.status, idx === 0)}
                      </div>

                      <div className={`flex items-center justify-between text-xs border-y py-2.5 px-2 ${
                        isLight ? 'border-current/10 text-[#4A5046]' : 'border-white/[0.06] text-[#A4ACA1]'
                      }`}>
                        <div className="flex flex-col">
                          <span className="font-mono text-[9px] uppercase tracking-wider text-neutral-400">{language === 'es' ? 'Fecha' : 'Date'}</span>
                          <span className="font-mono text-xs font-semibold">{order.createdAt}</span>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="font-mono text-[9px] uppercase tracking-wider text-neutral-400">{language === 'es' ? 'Volumen' : 'Volume'}</span>
                          <span className={`font-['Oswald'] text-sm font-bold ${isLight ? 'text-[#14170F]' : 'text-white'}`}>
                            {order.items.length} {language === 'es' ? 'CARTAS' : 'CARDS'}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pl-2 pt-0.5">
                        <span className="font-mono text-[9px] text-neutral-400">
                          {order.carrier || 'GLS Express EU'}
                        </span>
                        <button
                          onClick={() => onNavigate('/track')}
                          className={`font-mono text-[10px] uppercase tracking-widest font-bold py-1.5 px-3 border transition-all flex items-center gap-1.5 cursor-pointer ${
                            isLight 
                              ? 'bg-[#14170F] text-white border-[#14170F] hover:bg-[#2A3125]' 
                              : 'bg-white/[0.08] text-white border-white/20 hover:bg-[#48C765]/20 hover:text-[#48C765]'
                          }`}
                        >
                          <span>{language === 'es' ? 'Ver Telemetría' : 'Track Order'}</span>
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" /></svg>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Desktop Table View (>= md) with Alternating Zebra Rows */}
              <div className={`hidden md:block border relative overflow-hidden shadow-sm ${
                isLight 
                  ? 'border-[#D8D2C5]' 
                  : 'border-white/10'
              }`}>
                {/* Top Holographic Hairline Accent */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#16A34A] via-[#38BDF8] to-[#16A34A] opacity-80 z-20" />

                <div className="overflow-x-auto">
                  <table className="w-full text-left font-sans text-sm min-w-[760px] border-collapse">
                    <thead>
                      <tr className={`border-b font-mono text-[10px] uppercase tracking-[0.2em] select-none ${
                        isLight 
                          ? 'bg-[#E7E1D4] border-[#D8D0C0] text-[#4A5046]' 
                          : 'bg-[#151A16] border-white/10 text-[#A4ACA1]'
                      }`}>
                        <th className="px-6 py-4 font-bold">
                          {language === 'es' ? 'EXPEDIENTE / LOTE' : 'ORDER ID / BATCH'}
                        </th>
                        <th className="px-6 py-4 font-bold">
                          {language === 'es' ? 'FECHA DE ADMISIÓN' : 'ADMISSION DATE'}
                        </th>
                        <th className="px-6 py-4 font-bold">
                          {language === 'es' ? 'VOLUMEN' : 'ITEMS'}
                        </th>
                        <th className="px-6 py-4 font-bold">
                          {language === 'es' ? 'ESTADO DE PERITAJE' : 'LABORATORY STATUS'}
                        </th>
                        <th className="px-6 py-4 font-bold text-right">
                          {language === 'es' ? 'TELEMETRÍA' : 'ACTION'}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {[activeOrder, ...pastOrders].map((order, idx) => {
                        const isEven = idx % 2 === 0;
                        return (
                          <tr 
                            key={order.id} 
                            className={`border-b transition-colors duration-200 group ${
                              isLight 
                                ? (isEven 
                                    ? 'bg-[#FAF8F5] hover:bg-[#F3EEE3] border-[#E2DBD0]' 
                                    : 'bg-[#EFE9DE] hover:bg-[#E6E0D4] border-[#DCD5C8]')
                                : (isEven 
                                    ? 'bg-[#0E120F] hover:bg-[#141A15] border-white/[0.06]' 
                                    : 'bg-[#18201A] hover:bg-[#1F2921] border-white/[0.08]')
                            }`}
                          >
                            {/* Order ID & Carrier */}
                            <td className="px-6 py-5">
                              <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 border flex flex-col items-center justify-center font-['Oswald'] shrink-0 ${
                                  isLight 
                                    ? 'border-[#14170F] bg-[#14170F] text-white shadow-sm' 
                                    : 'border-[#48C765] bg-[#48C765]/10 text-[#48C765]'
                                }`}>
                                  <span className="text-xs font-bold leading-none">G</span>
                                  <span className="text-[4.5px] font-mono tracking-tighter opacity-80">LAB</span>
                                </div>
                                <div>
                                  <span className={`font-['Oswald'] text-base font-bold tracking-wider block ${
                                    isLight ? 'text-[#14170F]' : 'text-white'
                                  }`}>
                                    {order.id}
                                  </span>
                                  <span className="font-mono text-[10px] text-neutral-400 block mt-0.5">
                                    {order.carrier || 'GLS Express EU'} &bull; {order.trackingNumber || 'REF-STD'}
                                  </span>
                                </div>
                              </div>
                            </td>

                            {/* Date */}
                            <td className="px-6 py-5">
                              <div className="flex flex-col">
                                <span className={`font-mono text-xs font-semibold ${
                                  isLight ? 'text-[#14170F]' : 'text-white'
                                }`}>
                                  {order.createdAt}
                                </span>
                                <span className="font-mono text-[10px] text-neutral-400 mt-0.5">
                                  10:24 CET &bull; {language === 'es' ? 'AUDITADO' : 'AUDITED'}
                                </span>
                              </div>
                            </td>

                            {/* Items / Volume */}
                            <td className="px-6 py-5">
                              <div className="flex items-baseline gap-1.5">
                                <span className={`font-['Oswald'] text-lg font-bold ${
                                  isLight ? 'text-[#14170F]' : 'text-white'
                                }`}>
                                  {order.items.length}
                                </span>
                                <span className="font-mono text-xs text-neutral-400 uppercase font-medium">
                                  {language === 'es' ? 'cartas' : 'cards'}
                                </span>
                              </div>
                              <span className="font-mono text-[10px] text-neutral-400 block">
                                {order.items[0]?.cardName ? order.items[0].cardName.slice(0, 22) + '...' : 'TCG Collectibles'}
                              </span>
                            </td>

                            {/* Status */}
                            <td className="px-6 py-5">
                              {renderOrderStatusBadge(order.status, idx === 0)}
                            </td>

                            {/* Action Button */}
                            <td className="px-6 py-5 text-right">
                              <button
                                onClick={() => onNavigate('/track')}
                                className={`font-mono text-[10.5px] uppercase tracking-widest font-bold py-2 px-3.5 border transition-all inline-flex items-center gap-2 cursor-pointer shadow-sm ${
                                  isLight 
                                    ? 'bg-[#14170F] text-white border-[#14170F] hover:bg-[#2A3125] hover:shadow' 
                                    : 'bg-white/[0.06] text-white border-white/20 hover:bg-[#48C765]/20 hover:text-[#48C765] hover:border-[#48C765]/40'
                                }`}
                              >
                                <span>{language === 'es' ? 'Ver Telemetría' : 'Track Order'}</span>
                                <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                                </svg>
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
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
            <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-700">
              
              {/* Telemetry & Fiscal Archive Command Header */}
              <div className={`p-5 sm:p-6 border relative overflow-hidden transition-colors ${
                isLight 
                  ? 'bg-white border-[#D8D2C5] shadow-sm text-[#14170F]' 
                  : 'bg-white/[0.02] border-white/10 text-white'
              }`}>
                {/* Holographic Top Hairline */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#16A34A] via-[#38BDF8] to-[#16A34A] opacity-70" />
                
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div>
                    <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.22em] text-[#16A34A] dark:text-[#48C765] font-bold mb-1.5">
                      <span>{language === 'es' ? 'REGISTRO MERCANTIL & EXPEDIENTES TRIBUTARIOS' : 'COMMERCIAL REGISTRY & TAX ARCHIVES'}</span>
                      <span className="text-neutral-400 font-normal">| R.D. 1619/2012</span>
                    </div>
                    <h2 className={`font-['Oswald'] text-2xl sm:text-3xl uppercase tracking-wide font-bold ${
                      isLight ? 'text-[#14170F]' : 'text-white'
                    }`}>
                      {language === 'es' ? 'BÓVEDA DE FACTURACIÓN & PERITAJE FISCAL' : 'BILLING & VALUATION ARCHIVE'}
                    </h2>
                    <p className={`font-mono text-xs mt-1 max-w-xl ${
                      isLight ? 'text-neutral-600' : 'text-[#A4ACA1]'
                    }`}>
                      {language === 'es' 
                        ? 'Expedientes fiscales oficiales consolidados con telemetría de peritaje y sellado criptográfico VeriFactu.' 
                        : 'Official consolidated fiscal dossiers with optical metrology telemetry and VeriFactu cryptographic digital seal.'}
                    </p>
                  </div>

                  {/* Vault Telemetry Metrics Plaque & Master Accordion Toggle */}
                  <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
                    <div className={`px-4 py-2.5 border ${
                      isLight ? 'bg-[#F7F4EC] border-[#E0D9CB]' : 'bg-white/[0.03] border-white/10'
                    }`}>
                      <span className="block text-[8px] uppercase tracking-wider text-neutral-400">
                        {language === 'es' ? 'EJERCICIO 2026' : 'FISCAL YEAR 2026'}
                      </span>
                      <span className={`font-['Oswald'] text-base font-bold ${isLight ? 'text-[#14170F]' : 'text-white'}`}>
                        2 {language === 'es' ? 'EXPEDIENTES' : 'DOSSIERS'}
                      </span>
                    </div>

                    <div className={`px-4 py-2.5 border ${
                      isLight ? 'bg-[#F7F4EC] border-[#E0D9CB]' : 'bg-white/[0.03] border-white/10'
                    }`}>
                      <span className="block text-[8px] uppercase tracking-wider text-neutral-400">
                        {language === 'es' ? 'TOTAL CONCILIADO' : 'TOTAL SETTLED'}
                      </span>
                      <span className="font-['Oswald'] text-base font-bold text-[#16A34A] dark:text-[#48C765]">
                        €165.00 EUR
                      </span>
                    </div>

                    <div className={`px-4 py-2.5 border ${
                      isLight ? 'bg-[#F7F4EC] border-[#E0D9CB]' : 'bg-white/[0.03] border-white/10'
                    }`}>
                      <span className="block text-[8px] uppercase tracking-wider text-neutral-400">
                        {language === 'es' ? 'ESTADO' : 'STATUS'}
                      </span>
                      <span className="font-mono text-xs font-bold text-[#16A34A] dark:text-[#48C765]">
                        {language === 'es' ? 'REGULARIZADO' : 'SETTLED'}
                      </span>
                    </div>

                    {/* Master Expand/Collapse Toggle */}
                    <button
                      type="button"
                      onClick={() => {
                        const allExp = Object.values(invoicesData).every(inv => !!expandedInvoices[inv.id]);
                        const next: Record<string, boolean> = {};
                        Object.keys(invoicesData).forEach(id => {
                          next[id] = !allExp;
                        });
                        setExpandedInvoices(next);
                      }}
                      className={`px-3.5 py-2.5 border font-mono text-[10px] font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer select-none ${
                        isLight 
                          ? 'bg-white hover:bg-[#F2EFE8] border-[#D8D2C5] text-[#14170F]' 
                          : 'bg-white/[0.05] hover:bg-white/[0.09] border-white/15 text-white'
                      }`}
                      title={Object.values(invoicesData).every(inv => !!expandedInvoices[inv.id]) ? 'Reducir todos los cuadros' : 'Expandir todos los cuadros'}
                    >
                      <svg 
                        className={`w-3.5 h-3.5 transition-transform duration-300 ${
                          Object.values(invoicesData).every(inv => !!expandedInvoices[inv.id]) ? 'rotate-180' : 'rotate-0'
                        }`} 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                      </svg>
                      <span>
                        {Object.values(invoicesData).every(inv => !!expandedInvoices[inv.id])
                          ? (language === 'es' ? 'REDUCIR TODOS' : 'COLLAPSE ALL')
                          : (language === 'es' ? 'EXPANDIR TODOS' : 'EXPAND ALL')}
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Bespoke Archival Folio Cards Collection (Expandable / Collapsible) */}
              <div className="flex flex-col gap-4 sm:gap-5">
                {Object.values(invoicesData).map((inv) => {
                  const isExpanded = !!expandedInvoices[inv.id];
                  return (
                    <div 
                      key={inv.id} 
                      className={`border relative transition-all duration-300 group overflow-hidden ${
                        isLight 
                          ? 'bg-[#FAF9F5] border-[#D8D2C5] text-[#191D19] shadow-sm hover:border-[#16A34A]/80' 
                          : 'bg-[#111511] border-white/10 text-white hover:border-[#48C765]/80 hover:shadow-[0_0_30px_rgba(72,199,101,0.08)]'
                      }`}
                    >
                      {/* Left Holographic Authentication Accent Strip */}
                      <div className="absolute top-0 bottom-0 left-0 w-1.5 bg-gradient-to-b from-[#16A34A] via-[#38BDF8] via-[#A855F7] to-[#16A34A] opacity-80" />

                      {/* Corner Registration Markings (Architectural Metrology) */}
                      <span className="absolute top-1.5 right-2 font-mono text-[8px] opacity-35 select-none pointer-events-none">[ORIGINAL ARCHIVE] ┐</span>
                      <span className="absolute bottom-1.5 right-2 font-mono text-[8px] opacity-35 select-none pointer-events-none">┘</span>

                      {/* Document Paper Texture & Watermark */}
                      <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-10 pointer-events-none mix-blend-overlay z-0" />
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none select-none opacity-[0.025] dark:opacity-[0.03] font-['Oswald'] text-8xl font-bold uppercase tracking-widest hidden md:block">
                        {inv.id}
                      </div>

                      <div className="relative z-10 p-4 sm:p-6 pl-5 sm:pl-7 flex flex-col">
                        
                        {/* 1. Folio Identification Header (Click to Expand / Reduce) */}
                        <div 
                          onClick={() => toggleInvoice(inv.id)}
                          className={`flex flex-col lg:flex-row lg:items-center justify-between gap-4 cursor-pointer select-none transition-colors ${
                            isExpanded ? 'pb-4 border-b border-dashed border-current/15' : ''
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            {/* Architectural Monogram Plaque */}
                            <div className={`w-10 h-10 border-2 flex flex-col items-center justify-center font-['Oswald'] shrink-0 shadow-sm ${
                              isLight 
                                ? 'border-[#14170F] bg-[#14170F] text-white' 
                                : 'border-[#48C765] bg-[#48C765]/10 text-[#48C765]'
                            }`}>
                              <span className="text-lg font-bold leading-none">G</span>
                              <span className="text-[5.5px] font-mono tracking-tighter opacity-80">LABS</span>
                            </div>

                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-['Oswald'] text-lg sm:text-xl font-bold tracking-wide">
                                  {inv.id}
                                </span>
                                <span className="font-mono text-[9px] uppercase tracking-wider text-neutral-500 font-semibold">
                                  {language === 'es' ? '· FACTURA OFICIAL' : '· OFFICIAL INVOICE'}
                                </span>
                              </div>
                              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10px] text-neutral-500 mt-0.5">
                                <span>{language === 'es' ? 'Expediente Pedido:' : 'Order Ref:'} <strong className="text-current font-semibold">{inv.orderId}</strong></span>
                                <span>&bull;</span>
                                <span>{inv.date}</span>
                                <span>&bull;</span>
                                <span>{inv.items.length} {language === 'es' ? 'servicios' : 'services'}</span>
                              </div>
                            </div>
                          </div>

                          {/* Right Controls: Amount Summary + Status + Expand/Reduce Button */}
                          <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
                            {/* Total Amount Plaque */}
                            <div className={`px-3 py-1.5 border font-mono flex items-center gap-2 ${
                              isLight ? 'bg-white border-[#E0D9CB]' : 'bg-white/[0.04] border-white/10'
                            }`}>
                              <span className="text-[9px] uppercase tracking-wider text-neutral-400 font-normal">
                                {language === 'es' ? 'TOTAL:' : 'TOTAL:'}
                              </span>
                              <span className="font-['Oswald'] text-base font-bold tracking-tight text-[#16A34A] dark:text-[#48C765]">
                                €{inv.total.toFixed(2)}
                              </span>
                            </div>

                            {/* Status Typographic Endorsement */}
                            <div className="font-mono text-[10.5px] uppercase tracking-[0.16em]">
                              <span className="text-neutral-400 mr-1.5 font-normal hidden sm:inline">{language === 'es' ? 'ESTADO:' : 'STATUS:'}</span>
                              <span className="font-bold text-[#15803D] dark:text-[#48C765]">
                                [{language === 'es' ? 'LIQUIDADO · STRIPE' : 'SETTLED · STRIPE'}]
                              </span>
                            </div>

                            {/* Bespoke Expand / Reduce Toggle Button */}
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleInvoice(inv.id);
                              }}
                              className={`px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-widest border transition-all duration-200 flex items-center gap-2 cursor-pointer select-none shadow-sm ${
                                isExpanded
                                  ? (isLight ? 'bg-[#14170F] text-white border-[#14170F]' : 'bg-[#48C765]/20 text-[#48C765] border-[#48C765]/40')
                                  : (isLight ? 'bg-white hover:bg-neutral-100 text-[#14170F] border-[#D4CDC0]' : 'bg-white/[0.05] hover:bg-white/10 text-white border-white/20')
                              }`}
                            >
                              <span>
                                {isExpanded 
                                  ? (language === 'es' ? 'REDUCIR' : 'COLLAPSE') 
                                  : (language === 'es' ? 'EXPANDIR' : 'EXPAND')}
                              </span>
                              <svg 
                                className={`w-3.5 h-3.5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : 'rotate-0'}`} 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                              </svg>
                            </button>
                          </div>
                        </div>

                        {/* 2. Collapsible Services Breakdown & Financial Ledger Matrix */}
                        <div 
                          className={`transition-all duration-300 ease-in-out overflow-hidden ${
                            isExpanded 
                              ? 'max-h-[1400px] opacity-100 mt-5' 
                              : 'max-h-0 opacity-0 mt-0 pointer-events-none'
                          }`}
                        >
                          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
                            
                            {/* Left: Audited Services Telemetry (7 cols) */}
                            <div className="lg:col-span-7 space-y-2">
                              <span className="font-mono text-[9px] uppercase tracking-[0.18em] font-bold block text-[#16A34A] dark:text-[#48C765]">
                                // {language === 'es' ? 'SERVICIOS METROLÓGICOS FACTURADOS' : 'AUDITED SERVICES BREAKDOWN'}
                              </span>
                              <div className="space-y-1.5 font-mono text-xs">
                                {inv.items.map((it, idx) => (
                                  <div key={idx} className={`flex items-start justify-between gap-2 p-2 border ${
                                    isLight ? 'bg-white/80 border-[#E2DCce]' : 'bg-white/[0.02] border-white/5'
                                  }`}>
                                    <div className="flex items-start gap-2">
                                      <span className="font-bold text-[10px] text-[#16A34A] dark:text-[#48C765] shrink-0 mt-0.5">
                                        [{it.code}]
                                      </span>
                                      <div>
                                        <p className="font-sans font-medium text-xs leading-snug">
                                          {it.title}
                                        </p>
                                        <p className={`font-sans text-[10px] mt-0.5 leading-tight ${isLight ? 'text-neutral-500' : 'text-[#8E968B]'}`}>
                                          {it.subtitle}
                                        </p>
                                      </div>
                                    </div>
                                    <span className="font-bold text-xs shrink-0">
                                      €{it.total.toFixed(2)}
                                    </span>
                                  </div>
                                ))}
                              </div>
                              
                              <div className="flex items-center justify-between font-mono text-[9px] text-neutral-400 pt-1">
                                <span>HASH: {inv.hash}</span>
                                <span>{language === 'es' ? 'CENTRO: MADRID CLEANROOM 01' : 'FACILITY: MADRID CLEANROOM 01'}</span>
                              </div>
                            </div>

                            {/* Right: Accounting Summary Plaque & Custom Gorilla Buttons (5 cols) */}
                            <div className={`lg:col-span-5 p-4 border flex flex-col justify-between gap-4 font-mono ${
                              isLight 
                                ? 'bg-white border-[#D4CDC0] shadow-sm' 
                                : 'bg-white/[0.03] border-white/15'
                            }`}>
                              <div className="space-y-1.5 text-xs border-b border-current/10 pb-3">
                                <div className="flex justify-between">
                                  <span className="text-neutral-500">{language === 'es' ? 'Base Imponible:' : 'Net Base:'}</span>
                                  <span className="font-bold">€{inv.baseNet.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-neutral-500">{language === 'es' ? `IVA (${inv.vatRate}%):` : `VAT (${inv.vatRate}%):`}</span>
                                  <span className="font-bold">€{inv.vatAmount.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-baseline pt-2">
                                  <div>
                                    <span className="font-['Oswald'] text-sm uppercase tracking-wider font-bold block">
                                      TOTAL LIQUIDADO
                                    </span>
                                    <span className="text-[7.5px] text-[#16A34A] dark:text-[#48C765] block font-mono">
                                      EUR // R.D. 1619/2012
                                    </span>
                                  </div>
                                  <span className={`font-['Oswald'] text-2xl sm:text-3xl font-bold tracking-tight ${
                                    isLight ? 'text-[#16A34A]' : 'text-[#48C765]'
                                  }`}>
                                    €{inv.total.toFixed(2)}
                                  </span>
                                </div>
                              </div>

                              {/* Bespoke Gorilla Grading Action Buttons (Zero Generic Links) */}
                              <div className="flex flex-col sm:flex-row items-center gap-2.5">
                                <button 
                                  type="button"
                                  onClick={() => setShowInvoiceModal(inv.id)}
                                  className="btn-gorilla-square-secondary w-full sm:flex-1 py-2.5 px-4 text-[11px] font-bold tracking-wider flex items-center justify-center gap-2 cursor-pointer"
                                >
                                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                  </svg>
                                  <span>{language === 'es' ? 'Ver Expediente' : 'View Dossier'}</span>
                                </button>

                                <button 
                                  type="button"
                                  onClick={() => setShowInvoiceModal(inv.id)}
                                  className="btn-gorilla-square w-full sm:flex-1 py-2.5 px-4 text-[11px] font-extrabold tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md"
                                >
                                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                  </svg>
                                  <span>{language === 'es' ? 'Descargar PDF' : 'Download PDF'}</span>
                                </button>
                              </div>
                            </div>

                          </div>
                        </div>

                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          )}

        </div>

      </div>
      {/* Bespoke Architectural Laboratory Fiscal Dossier Modal */}
      {showInvoiceModal && (() => {
        const currentInvoice = invoicesData[showInvoiceModal] || invoicesData['INV-2026-0892'];

        return (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto">
            {/* Backdrop Blur Layer */}
            <div 
              className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity duration-300" 
              onClick={() => setShowInvoiceModal(null)} 
            />

            {/* Bespoke Physical Metrology Fiscal Dossier (Zero Generic Templates) */}
            <div 
              className={`relative w-full max-w-3xl my-auto flex flex-col max-h-[95vh] overflow-hidden border shadow-2xl transition-all duration-300 ${
                isLight 
                  ? 'bg-[#FCFBF8] border-[#D8D2C5] text-[#191D19] shadow-[0_30px_90px_rgba(0,0,0,0.30)]' 
                  : 'bg-[#0E120F] border-white/15 text-white shadow-[0_30px_90px_rgba(0,0,0,0.95)]'
              }`}
            >
              {/* 1. Holographic Top Security Strip */}
              <div className="h-1.5 w-full bg-gradient-to-r from-[#16A34A] via-[#38BDF8] via-[#A855F7] via-[#F59E0B] to-[#16A34A] opacity-90 relative overflow-hidden">
                <div className="absolute inset-0 bg-white/20 animate-pulse" />
              </div>

              {/* Archival Security Watermark Background Motif */}
              <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0 flex items-center justify-center opacity-[0.035] dark:opacity-[0.04]">
                <div className="font-['Oswald'] text-[120px] font-bold tracking-[0.2em] uppercase rotate-[-25deg] whitespace-nowrap">
                  GORILLA LABS
                </div>
              </div>

              {/* Technical Registration Crosshairs (Architectural Lab Detailing) */}
              <div className={`absolute top-3 left-3 font-mono text-[9px] pointer-events-none select-none z-20 ${
                isLight ? 'text-black/30' : 'text-white/25'
              }`}>┌ [METROLOGY LAB 01 · MADRID]</div>
              <div className={`absolute top-3 right-12 font-mono text-[9px] pointer-events-none select-none z-20 hidden sm:block ${
                isLight ? 'text-black/30' : 'text-white/25'
              }`}>[ISO-17025 ARCHIVE] ┐</div>

              {/* 2. Technical Ledger Header */}
              <div className={`shrink-0 px-5 sm:px-8 pt-5 pb-3.5 border-b relative z-10 ${
                isLight ? 'border-[#E2DCce] bg-white/80' : 'border-white/10 bg-white/[0.02]'
              }`}>
                {/* Security Micro-print Line */}
                <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-dashed border-current/15 font-mono text-[8.5px] uppercase tracking-[0.22em] text-[#16A34A] dark:text-[#48C765]">
                  <span>// GORILLA METROLOGY LEDGER // CERTIFICACIÓN FISCAL</span>
                  <span className="hidden sm:inline font-mono">HASH: {currentInvoice.hash}</span>
                  <span>R.D. 1619/2012 · VALIDEZ OFICIAL</span>
                </div>

                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    {/* Architectural Seal Monogram */}
                    <div className={`w-12 h-12 border-2 flex flex-col items-center justify-center font-['Oswald'] relative shrink-0 shadow-sm ${
                      isLight 
                        ? 'border-[#14170F] bg-[#14170F] text-white' 
                        : 'border-[#48C765] bg-[#48C765]/10 text-[#48C765] shadow-[0_0_15px_rgba(72,199,101,0.25)]'
                    }`}>
                      <span className="text-2xl font-bold leading-none">G</span>
                      <span className="text-[6px] font-mono tracking-widest opacity-80 uppercase">LABS</span>
                    </div>

                    <div>
                      <div className="flex flex-wrap items-baseline gap-2">
                        <h3 className={`font-['Oswald'] text-xl sm:text-2xl uppercase tracking-[0.05em] font-bold ${
                          isLight ? 'text-[#14170F]' : 'text-white'
                        }`}>
                          {language === 'es' ? 'FACTURA FISCAL DE CERTIFICACIÓN' : 'CERTIFICATION FISCAL INVOICE'}
                        </h3>
                        <span className="font-mono text-xs sm:text-sm font-bold text-[#16A34A] dark:text-[#48C765] tracking-wider">
                          [{currentInvoice.id}]
                        </span>
                      </div>
                      <p className={`font-mono text-[9px] uppercase tracking-wider mt-0.5 ${
                        isLight ? 'text-neutral-600' : 'text-[#A4ACA1]'
                      }`}>
                        Gorilla Grading International S.L. &bull; NIF: B-88291042 &bull; Registro Mercantil de Madrid Tomo 41208
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <div className="hidden sm:flex flex-col items-end font-mono text-[9.5px] uppercase tracking-wider">
                      <span className="font-bold text-[#15803D] dark:text-[#48C765]">
                        [{language === 'es' ? 'LIQUIDADO · STRIPE' : 'SETTLED · STRIPE'}]
                      </span>
                      <span className="text-[7.5px] text-neutral-400 mt-0.5 tracking-widest font-semibold">VERIFACTU REGISTRADO</span>
                    </div>

                    {/* Architectural Close Button */}
                    <button 
                      type="button"
                      onClick={() => setShowInvoiceModal(null)} 
                      className={`w-8 h-8 border flex items-center justify-center transition-all duration-200 cursor-pointer ${
                        isLight 
                          ? 'border-[#D4CDC0] text-neutral-600 hover:text-black hover:bg-black/5 hover:border-black' 
                          : 'border-white/20 text-[#A4ACA1] hover:text-white hover:bg-white/10 hover:border-white'
                      }`}
                      title={language === 'es' ? 'Cerrar documento' : 'Close document'}
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* 3. Scrollable Document Body */}
              <div className="flex-1 overflow-y-auto px-5 sm:px-8 py-4 sm:py-5 space-y-4 sm:space-y-5 relative z-10">
                
                {/* Architectural Metadata Grid (Hairline Rules, Zero Generic Boxes) */}
                <div className={`grid grid-cols-1 sm:grid-cols-2 border ${
                  isLight ? 'border-[#E2DCce] divide-y sm:divide-y-0 sm:divide-x divide-[#E2DCce] bg-white/70' : 'border-white/10 divide-y sm:divide-y-0 sm:divide-x divide-white/10 bg-white/[0.015]'
                }`}>
                  {/* Left: Recipient Data */}
                  <div className="p-3.5 sm:p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-[9px] uppercase tracking-[0.2em] font-bold text-[#16A34A] dark:text-[#48C765]">
                        // {language === 'es' ? 'TITULAR FISCAL / RECEPTOR' : 'TAX RECIPIENT'}
                      </span>
                      <span className="font-mono text-[8.5px] text-neutral-400">ID: GG-4091</span>
                    </div>
                    <p className={`font-['Montserrat'] text-sm font-bold tracking-tight ${
                      isLight ? 'text-[#14170F]' : 'text-white'
                    }`}>
                      {currentInvoice.clientName}
                    </p>
                    <p className={`text-xs mt-0.5 font-mono ${isLight ? 'text-neutral-600' : 'text-[#B8BFB5]'}`}>
                      {currentInvoice.clientAddress}
                    </p>
                    <p className={`text-xs font-mono ${isLight ? 'text-neutral-600' : 'text-[#B8BFB5]'}`}>
                      {currentInvoice.clientCity}
                    </p>
                    <div className="mt-2 pt-1.5 border-t border-dashed border-current/15 flex items-center justify-between font-mono text-[8.5px] text-neutral-400">
                      <span>DNI/NIF: ES-***3491-B</span>
                      <span className="text-[#16A34A] dark:text-[#48C765] font-semibold">✓ DOMICILIO FISCAL VERIFICADO</span>
                    </div>
                  </div>

                  {/* Right: Laboratory Order Metrics */}
                  <div className="p-3.5 sm:p-4">
                    <span className="font-mono text-[9px] uppercase tracking-[0.2em] font-bold block mb-2 text-[#16A34A] dark:text-[#48C765]">
                      // {language === 'es' ? 'TELEMETRÍA DE LA TRANSACCIÓN' : 'TRANSACTION METRICS'}
                    </span>
                    <div className="space-y-1.5 font-mono text-xs">
                      <div className="flex justify-between">
                        <span className={isLight ? 'text-neutral-500' : 'text-[#A4ACA1]'}>{language === 'es' ? 'Fecha de Emisión:' : 'Issue Date:'}</span>
                        <span className="font-semibold">{currentInvoice.date}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className={isLight ? 'text-neutral-500' : 'text-[#A4ACA1]'}>{language === 'es' ? 'Expediente Pedido:' : 'Order Ref:'}</span>
                        <span className="font-bold text-[#16A34A] dark:text-[#48C765]">{currentInvoice.orderId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className={isLight ? 'text-neutral-500' : 'text-[#A4ACA1]'}>{language === 'es' ? 'Canal Liquidación:' : 'Settlement:'}</span>
                        <span className="font-medium">Stripe SEPA Gateway (EUR)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className={isLight ? 'text-neutral-500' : 'text-[#A4ACA1]'}>{language === 'es' ? 'Centro de Peritaje:' : 'Facility:'}</span>
                        <span className="font-medium">Madrid Cleanroom Lab 01</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Technical Itemization Ledger Table */}
                <div className={`border overflow-hidden ${
                  isLight ? 'border-[#E2DCce] bg-white/90' : 'border-white/10 bg-white/[0.015]'
                }`}>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left font-sans text-xs sm:text-sm min-w-[520px]">
                      <thead>
                        <tr className={`border-b font-mono text-[9px] uppercase tracking-[0.16em] ${
                          isLight ? 'bg-[#F4EFE6] border-[#E2DCce] text-neutral-700' : 'bg-white/[0.04] border-white/10 text-[#A4ACA1]'
                        }`}>
                          <th className="px-4 py-2.5 font-bold">{language === 'es' ? 'Cód. Servicio' : 'Code'}</th>
                          <th className="px-4 py-2.5 font-bold">{language === 'es' ? 'Especificación Técnica del Peritaje' : 'Service Specification'}</th>
                          <th className="px-3 py-2.5 font-bold text-center">{language === 'es' ? 'Cant.' : 'Qty'}</th>
                          <th className="px-3 py-2.5 font-bold text-right">{language === 'es' ? 'Precio Ud.' : 'Unit'}</th>
                          <th className="px-4 py-2.5 font-bold text-right">{language === 'es' ? 'Base Neta' : 'Amount'}</th>
                        </tr>
                      </thead>
                      <tbody className={`divide-y font-mono ${isLight ? 'divide-[#EFE9DF]' : 'divide-white/5'}`}>
                        {currentInvoice.items.map((item, idx) => (
                          <tr key={idx} className={isLight ? 'hover:bg-black/[0.01]' : 'hover:bg-white/[0.02]'}>
                            <td className="px-4 py-3 font-bold text-[10px] text-[#16A34A] dark:text-[#48C765]">
                              [{item.code}]
                            </td>
                            <td className="px-4 py-3">
                              <p className={`font-sans font-bold text-xs ${isLight ? 'text-[#14170F]' : 'text-white'}`}>
                                {item.title}
                              </p>
                              <p className={`font-sans text-[10.5px] mt-0.5 leading-snug ${isLight ? 'text-neutral-500' : 'text-[#8E968B]'}`}>
                                {item.subtitle}
                              </p>
                            </td>
                            <td className={`px-3 py-3 text-center text-xs ${isLight ? 'text-neutral-600' : 'text-[#A4ACA1]'}`}>
                              {item.qty}
                            </td>
                            <td className={`px-3 py-3 text-right text-xs ${isLight ? 'text-neutral-600' : 'text-[#A4ACA1]'}`}>
                              €{item.unitPrice.toFixed(2)}
                            </td>
                            <td className={`px-4 py-3 text-right font-bold text-xs ${isLight ? 'text-[#14170F]' : 'text-white'}`}>
                              €{item.total.toFixed(2)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Bottom Verification Seal & Totals Plaque */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center pt-1">
                  
                  {/* Left: Official Digital Seal & Stamp Block */}
                  <div className="sm:col-span-7 flex items-center gap-4">
                    {/* Authentic Rotating Laboratory Wax/Ink Stamp */}
                    <div className="relative border-2 border-[#16A34A]/80 dark:border-[#48C765]/80 w-22 h-22 p-1 flex items-center justify-center text-center font-mono text-[7px] uppercase tracking-wider rotate-[-5deg] select-none shrink-0 opacity-90 shadow-sm">
                      <div className="w-full h-full border border-dashed border-[#16A34A]/60 dark:border-[#48C765]/60 flex flex-col items-center justify-center p-1 leading-tight">
                        <span className="font-bold text-[7.5px] tracking-widest text-[#16A34A] dark:text-[#48C765]">GORILLA LABS</span>
                        <span className="text-[6px] tracking-wider opacity-80">INTERNATIONAL</span>
                        <span className="font-['Oswald'] text-[11px] font-bold text-[#16A34A] dark:text-[#48C765] my-0.5">CERTIFIED</span>
                        <span className="text-[6px] tracking-tighter opacity-70">PROBATIVE VALUE</span>
                      </div>
                    </div>

                    <div className="space-y-1.5 font-mono text-[8.5px]">
                      <div className="flex items-center gap-2">
                        {/* Stylized Barcode */}
                        <div className="flex gap-[1.5px] h-6 items-end opacity-85 text-[#16A34A] dark:text-[#48C765]">
                          <div className="w-[2px] h-full bg-current"></div>
                          <div className="w-[1px] h-3/4 bg-current"></div>
                          <div className="w-[3px] h-full bg-current"></div>
                          <div className="w-[1px] h-1/2 bg-current"></div>
                          <div className="w-[2px] h-full bg-current"></div>
                          <div className="w-[4px] h-full bg-current"></div>
                          <div className="w-[1px] h-3/4 bg-current"></div>
                          <div className="w-[2px] h-current bg-current"></div>
                          <div className="w-[3px] h-2/3 bg-current"></div>
                          <div className="w-[1px] h-full bg-current"></div>
                          <div className="w-[3px] h-full bg-current"></div>
                        </div>
                        <div>
                          <span className="font-bold block tracking-wider text-[#16A34A] dark:text-[#48C765]">
                            {language === 'es' ? 'VERIFACTU // SELLO TRIBUTARIO' : 'VERIFACTU // TAX AUDIT SEAL'}
                          </span>
                          <span className="text-[7.5px] opacity-75">
                            {language === 'es' ? 'FIRMA ELECTRÓNICA V4.2 CONSOLIDADA' : 'CONSOLIDATED ELECTRONIC SIGNATURE V4.2'}
                          </span>
                        </div>
                      </div>
                      <p className={`text-[8px] leading-snug ${isLight ? 'text-neutral-500' : 'text-[#8E968B]'}`}>
                        {language === 'es'
                          ? 'Documento fiscal emitido por Gorilla Grading International S.L. con plena eficacia mercantil conforme al R.D. 1619/2012 y directivas de la Unión Europea.'
                          : 'Fiscal document issued by Gorilla Grading International S.L. with full commercial validity under R.D. 1619/2012 and EU directives.'}
                      </p>
                    </div>
                  </div>

                  {/* Right: Bespoke Totals Plaque (Guaranteed Full Visibility) */}
                  <div className={`sm:col-span-5 border p-3.5 font-mono ${
                    isLight 
                      ? 'border-[#D4CDC0] bg-white shadow-sm text-neutral-800' 
                      : 'border-white/15 bg-white/[0.03] text-white'
                  }`}>
                    <div className="flex justify-between py-1 text-xs border-b border-current/10">
                      <span className="text-neutral-500">{language === 'es' ? 'Base Imponible:' : 'Net Subtotal:'}</span>
                      <span className="font-bold">€{currentInvoice.baseNet.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between py-1 text-xs border-b border-current/10">
                      <span className="text-neutral-500">IVA ({currentInvoice.vatRate}%):</span>
                      <span className="font-bold">€{currentInvoice.vatAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-baseline pt-2 mt-1">
                      <div>
                        <span className="font-['Oswald'] text-xs sm:text-sm uppercase tracking-wider font-bold block">
                          TOTAL LIQUIDADO
                        </span>
                        <span className="text-[8px] text-[#16A34A] dark:text-[#48C765] block font-mono">
                          EUR // TOTAL FACTURA
                        </span>
                      </div>
                      <span className={`font-['Oswald'] text-2xl sm:text-3xl font-bold tracking-tight ${
                        isLight ? 'text-[#16A34A]' : 'text-[#48C765]'
                      }`}>
                        €{currentInvoice.total.toFixed(2)}
                      </span>
                    </div>
                  </div>

                </div>

              </div>

              {/* 4. Executive Action Footer (Gorilla Custom Square Buttons, Zero Templates) */}
              <div className={`shrink-0 px-5 sm:px-8 py-3.5 border-t flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3 relative z-10 ${
                isLight ? 'bg-[#F4EFE6] border-[#E2DCce]' : 'bg-[#0B0F0B] border-white/10'
              }`}>
                <div className="hidden sm:flex items-center gap-2 font-mono text-[9px] uppercase tracking-wider text-neutral-500">
                  <span>// REGISTRO OFICIAL // ACCESO PERMANENTE EN BÓVEDA</span>
                </div>

                <div className="flex items-center justify-end gap-3 w-full sm:w-auto">
                  <button 
                    type="button"
                    onClick={() => setShowInvoiceModal(null)}
                    className="btn-gorilla-square-secondary py-2.5 px-6 text-xs font-bold tracking-[0.14em]"
                  >
                    {language === 'es' ? 'Cerrar' : 'Close'}
                  </button>
                  <button 
                    type="button"
                    onClick={() => window.print()}
                    className="btn-gorilla-square py-2.5 px-7 text-xs font-extrabold tracking-[0.16em] flex items-center justify-center gap-2 shadow-lg"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    <span>{language === 'es' ? 'Descargar / Imprimir PDF' : 'Download / Print PDF'}</span>
                  </button>
                </div>
              </div>

            </div>
          </div>
        );
      })()}

      {/* Collector Tiers & Qualification Ladder Modal */}
      {showTierModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className={`w-full max-w-2xl border shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh] ${
            isLight ? 'bg-[#FAF8F5] border-[#D8D2C5] text-[#14170F]' : 'bg-[#0E120F] border-white/10 text-white'
          }`}>
            
            {/* Header */}
            <div className={`px-6 py-5 border-b flex items-center justify-between ${
              isLight ? 'bg-white border-[#E5E0D5]' : 'bg-white/[0.02] border-white/10'
            }`}>
              <div className="flex items-center gap-3">
                <span className="badge-rarity-gold text-[10px] px-2 py-0.5 tracking-wider">
                  TIER ARCHIVAL
                </span>
                <div>
                  <h3 className="font-['Oswald'] text-xl uppercase tracking-wide font-bold">
                    {language === 'es' ? 'Programa de Rangos Gorilla Vault' : 'Gorilla Vault Collector Tiers'}
                  </h3>
                  <span className="font-mono text-[9px] text-[#16A34A] dark:text-[#48C765] tracking-widest uppercase">
                    // CRITERIOS DE CLASIFICACIÓN Y BENEFICIOS EXCLUSIVOS
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowTierModal(false)}
                className={`p-2 font-mono text-sm hover:text-white transition-colors cursor-pointer ${
                  isLight ? 'text-neutral-500 hover:text-black' : 'text-neutral-400'
                }`}
              >
                ✕
              </button>
            </div>

            {/* Body: 4 Tiers Breakdown */}
            <div className="p-6 overflow-y-auto space-y-4">
              
              {/* Tier 1 */}
              <div className={`p-4 border ${
                isLight ? 'bg-white border-[#E5E0D5]' : 'bg-white/[0.02] border-white/10'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-['Oswald'] text-lg font-bold">TIER I · MEMBER</span>
                    <span className="text-[9px] font-mono px-1.5 py-0.2 border border-current/20 text-[#A4ACA1]">1 - 9 CARTAS</span>
                  </div>
                  <span className="font-mono text-[9px] text-[#A4ACA1]">REGISTRO INICIAL</span>
                </div>
                <p className={`text-xs font-sans leading-relaxed ${isLight ? 'text-[#4B5563]' : 'text-neutral-400'}`}>
                  {language === 'es'
                    ? 'Activado al certificar tu primera carta. Acceso a bóveda digital, visor 3D de alta resolución y hash criptográfico verificable.'
                    : 'Activated on certifying your first slab. Access to digital vault, high-res 3D viewer, and verifiable cryptographic hash.'}
                </p>
              </div>

              {/* Tier 2 */}
              <div className={`p-4 border ${
                isLight ? 'bg-white border-[#E5E0D5]' : 'bg-white/[0.02] border-white/10'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-['Oswald'] text-lg font-bold">TIER II · PRO VAULT</span>
                    <span className="text-[9px] font-mono px-1.5 py-0.2 border border-[#16A34A] text-[#16A34A] dark:text-[#48C765]">10 - 24 CARTAS</span>
                  </div>
                  <span className="font-mono text-[9px] text-[#16A34A] dark:text-[#48C765]">5% DESCUENTO</span>
                </div>
                <p className={`text-xs font-sans leading-relaxed ${isLight ? 'text-[#4B5563]' : 'text-neutral-400'}`}>
                  {language === 'es'
                    ? 'Desbloqueado a partir de 10 cartas graduadas. Incluye 5% de descuento en tarifas estándar y reportes microscópicos de subnotas detallados.'
                    : 'Unlocked upon grading 10 slabs. Includes 5% discount on standard rates and detailed microscopic subgrade reports.'}
                </p>
              </div>

              {/* Tier 3 */}
              <div className={`p-4 border ${
                isLight ? 'bg-white border-[#E5E0D5]' : 'bg-white/[0.02] border-white/10'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-['Oswald'] text-lg font-bold">TIER III · MASTER COLLECTOR</span>
                    <span className="text-[9px] font-mono px-1.5 py-0.2 border border-sky-400 text-sky-400">25 - 49 CARTAS</span>
                  </div>
                  <span className="font-mono text-[9px] text-sky-400">10% DTO + KITS GRATIS</span>
                </div>
                <p className={`text-xs font-sans leading-relaxed ${isLight ? 'text-[#4B5563]' : 'text-neutral-400'}`}>
                  {language === 'es'
                    ? 'Para coleccionistas serios y tiendas asociadas. 10% de descuento continuo, kits de envío asegurados gratuitos y turnaround preferente en laboratorio.'
                    : 'For advanced collectors and verified hobby shops. 10% ongoing discount, free insured submission kits, and expedited laboratory turnaround.'}
                </p>
              </div>

              {/* Tier 4: VIP Elite (Highlight) */}
              <div className={`p-5 border-2 relative overflow-hidden ${
                isLight 
                  ? 'bg-amber-500/[0.06] border-amber-500/40' 
                  : 'bg-gradient-to-br from-amber-500/10 via-black to-[#0E120F] border-amber-400/40'
              }`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="badge-rarity-gold text-xs px-2.5 py-1 tracking-wider shadow-sm">
                      TIER IV · VIP ELITE
                    </span>
                    <span className="text-[9px] font-mono font-bold text-amber-400 uppercase tracking-wider">
                      50+ CARTAS O SERVICIO WHITE GLOVE
                    </span>
                  </div>
                  <span className="font-mono text-[9px] text-[#16A34A] dark:text-[#48C765] font-bold">RANGO ACTUAL</span>
                </div>

                <div className={`text-xs font-sans space-y-2 leading-relaxed ${isLight ? 'text-[#1F2937]' : 'text-neutral-200'}`}>
                  <p className="font-bold text-amber-400 font-mono text-[11px] uppercase tracking-wide">
                    {language === 'es' ? '¿CÓMO SE OBTIENE ESTE RANGO?' : 'HOW IS THIS RANK ATTAINED?'}
                  </p>
                  <ul className="space-y-1.5 list-disc list-inside text-xs pl-1">
                    <li>
                      {language === 'es'
                        ? 'Acumular 50 o más cartas certificadas en tu bóveda digital, o'
                        : 'Accumulate 50 or more certified slabs in your vault, or'}
                    </li>
                    <li>
                      {language === 'es'
                        ? 'Realizar envíos con valor declarado superior a 10.000 €, o'
                        : 'Submit orders with total declared value exceeding €10,000, or'}
                    </li>
                    <li>
                      {language === 'es'
                        ? 'Contratar el servicio de Guante Blanco / Archival Vault.'
                        : 'Commission White Glove / Archival Vault curation services.'}
                    </li>
                  </ul>

                  <p className="font-bold text-emerald-400 font-mono text-[11px] uppercase tracking-wide pt-2">
                    {language === 'es' ? 'BENEFICIOS EXCLUSIVOS:' : 'EXCLUSIVE PRIVILEGES:'}
                  </p>
                  <ul className="space-y-1.5 list-disc list-inside text-xs pl-1">
                    <li>{language === 'es' ? 'Auditoría presencial directa por Master Grader sin cola de espera.' : 'Direct in-person Master Grader audit with zero lab queue.'}</li>
                    <li>{language === 'es' ? 'Retorno en maletín de seguridad hermético acorazado con precinto forense.' : 'Return dispatch in hermetic armored security case with forensic seals.'}</li>
                    <li>{language === 'es' ? 'Seguro de tránsito VIP bonificado hasta 25.000 €.' : 'Complimentary VIP transit insurance up to €25,000.'}</li>
                    <li>{language === 'es' ? 'Concierge personal dedicado y atención prioritaria directa.' : 'Dedicated personal concierge and direct priority attention.'}</li>
                  </ul>
                </div>
              </div>

            </div>

            {/* Footer */}
            <div className={`px-6 py-4 border-t flex justify-end ${
              isLight ? 'bg-[#F4EFE6] border-[#E2DCce]' : 'bg-[#0B0F0B] border-white/10'
            }`}>
              <button
                type="button"
                onClick={() => setShowTierModal(false)}
                className="btn-gorilla-square-secondary py-2 px-6 text-xs font-bold tracking-widest uppercase"
              >
                {language === 'es' ? 'Entendido' : 'Understood'}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
