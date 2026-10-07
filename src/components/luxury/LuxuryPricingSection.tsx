import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { 
  FileText, 
  Clock, 
  ShieldCheck, 
  ArrowRight, 
  Printer, 
  Download, 
  Package, 
  Check, 
  ChevronRight,
  HelpCircle,
  Building2,
  Info,
  Sliders,
  Shield,
  Sparkles,
  Lock,
  Camera,
  FileCheck,
  QrCode,
  Layers,
  Cpu,
  Award,
  Zap,
  CheckCircle2,
  Scan
} from 'lucide-react';

interface LuxuryPricingSectionProps {
  onNavigate?: (path: string) => void;
  isHome?: boolean;
}

// Backward-compatibility exports for legacy imports
export const BlueprintScanner: React.FC<{ className?: string; color?: string; isLight?: boolean }> = () => null;
export const BlueprintCaliper: React.FC<{ className?: string; color?: string; isLight?: boolean }> = () => null;
export const BlueprintMagnifier: React.FC<{ className?: string; color?: string; isLight?: boolean }> = () => null;
export const BlueprintBriefcase: React.FC<{ className?: string; color?: string; isLight?: boolean }> = () => null;

export const LuxuryPricingSection: React.FC<LuxuryPricingSectionProps> = ({ onNavigate, isHome = false }) => {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const isLight = theme === 'light';

  // Selected tier for the shipment manifest generator
  const [selectedTierId, setSelectedTierId] = useState<string>('standard');
  const [cardCount, setCardCount] = useState<number>(10);

  // Industrial Service Levels (Tariff Matrix Data)
  const serviceLevels = [
    {
      code: 'RCDM.00',
      id: 'regular',
      shortName: language === 'es' ? 'Regular' : 'Regular',
      name: language === 'es' ? 'COLECCIONISTA REGULAR' : 'REGULAR COLLECTOR',
      purpose: language === 'es' 
        ? 'Remesas de volumen, sets modernos y colecciones particulares.' 
        : 'Volume submissions, modern sets, and personal binder collections.',
      turnaround: language === 'es' ? '20 días hábiles' : '20 business days',
      maxInsurance: '250 €',
      maxInsuranceNum: 250,
      scope: language === 'es' 
        ? 'Encapsulado sónico 35 kHz · Chip NFC de seguridad · Escaneo maestro 1200 DPI' 
        : '35 kHz ultrasonic encapsulation · NFC security chip · 1200 DPI master scan',
      bullets: language === 'es'
        ? ['Encapsulado ultrasónico 35 kHz', 'Chip de seguridad criptográfica NFC', 'Escaneo digital forense 1200 DPI']
        : ['35 kHz ultrasonic encapsulation', 'NFC cryptographic security chip', '1200 DPI master digital scan'],
      price: 15,
      accentColor: '#3B82F6'
    },
    {
      code: 'RCDM.01',
      id: 'standard',
      shortName: language === 'es' ? 'Estándar' : 'Standard',
      name: language === 'es' ? 'PRECISIÓN ESTÁNDAR' : 'PRECISION STANDARD',
      purpose: language === 'es' 
        ? 'El estándar del mercado. Cartas de valor medio-alto con subgrados métricos.' 
        : 'The market standard. Mid-to-high value cards with micrometric subgrades.',
      turnaround: language === 'es' ? '10 días hábiles' : '10 business days',
      maxInsurance: '1.000 €',
      maxInsuranceNum: 1000,
      scope: language === 'es' 
        ? '4 Subgrados láser 0.01mm · Escaneo forense 4K · Registro público en blockchain' 
        : '4 Laser 0.01mm subgrades · 4K forensic scan · Blockchain public registry',
      bullets: language === 'es'
        ? ['4 Subgrados ópticos (Centrado, Esquinas, Bordes, Superficie)', 'Escaneo micro-fotométrico 4K UHD', 'Certificación pública en Blockchain']
        : ['4 Optical Subgrades (Centering, Corners, Edges, Surface)', '4K UHD micro-photometric scan', 'Public Blockchain certification registry'],
      price: 28,
      accentColor: '#16A34A',
      isPopular: true
    },
    {
      code: 'RCDM.02',
      id: 'express',
      shortName: language === 'es' ? 'Exprés' : 'Express',
      name: language === 'es' ? 'PRIORIDAD EXPRÉS' : 'PRIORITY EXPRESS',
      purpose: language === 'es' 
        ? 'Procesamiento en cola preferente para transacciones de mercado y eventos.' 
        : 'Priority queue routing for urgent transactions, market timing, and conventions.',
      turnaround: language === 'es' ? '5 días hábiles' : '5 business days',
      maxInsurance: '2.500 €',
      maxInsuranceNum: 2500,
      scope: language === 'es' 
        ? 'Cola preferente de laboratorio · Auditoría óptica doble · Canal directo de soporte' 
        : 'Priority lab queue · Dual optical audit · Direct laboratory support channel',
      bullets: language === 'es'
        ? ['Cola preferente acelerada (5 días)', 'Auditoría óptica doble por 2 inspectores', 'Canal directo de soporte prioritario']
        : ['Accelerated priority queue (5 days)', 'Dual optical audit by 2 senior graders', 'Direct laboratory priority support'],
      price: 65,
      accentColor: '#EA580C'
    },
    {
      code: 'RCDM.MASTER',
      id: 'walkthrough',
      shortName: language === 'es' ? 'Master' : 'Master',
      name: language === 'es' ? 'PASE MAESTRO (WALK-THROUGH)' : 'MASTER WALK-THROUGH',
      purpose: language === 'es' 
        ? 'Custodia acorazada y protocolo de guante blanco para piezas históricas y de museo.' 
        : 'Armored vault custody and white-glove protocol for historic museum grails.',
      turnaround: language === 'es' ? '48 horas' : '48 hours',
      maxInsurance: language === 'es' ? 'Ilimitado (hasta 25.000 €)' : 'Unlimited (up to 25,000 €)',
      maxInsuranceNum: 25000,
      scope: language === 'es' 
        ? 'Auditoría presencial por Master Grader · Maletín blindado · Seguro en tránsito VIP' 
        : 'In-person Master Grader audit · Armored case delivery · VIP transit insurance',
      bullets: language === 'es'
        ? ['Turnaround exprés 48h con Master Grader', 'Maletín hermético de seguridad incluido', 'Seguro de tránsito VIP hasta 25.000 €']
        : ['48h VIP turnaround with Master Grader', 'Hermetic security case included', 'VIP transit insurance up to 25,000 €'],
      price: 140,
      accentColor: '#CA8A04'
    }
  ];

  const currentLevel = serviceLevels.find(s => s.id === selectedTierId) || serviceLevels[1];

  // Bulk tier discounts for commercial volume
  const getBulkDiscountRate = (qty: number) => {
    if (qty >= 50) return 0.12; // 12%
    if (qty >= 25) return 0.08; // 8%
    if (qty >= 10) return 0.05; // 5%
    return 0;
  };

  const discountRate = getBulkDiscountRate(cardCount);
  const baseUnitPrice = currentLevel.price;
  const unitPrice = Math.round(baseUnitPrice * (1 - discountRate));
  const subtotal = baseUnitPrice * cardCount;
  const totalAmount = unitPrice * cardCount;
  const discountAmount = subtotal - totalAmount;
  const totalInsuredCoverage = currentLevel.maxInsuranceNum * cardCount;

  return (
    <section 
      id="pricing" 
      className={`relative w-full py-16 lg:py-24 px-5 lg:px-12 border-b select-none transition-colors duration-300 ${
        isLight 
          ? 'bg-transparent text-[#111827] border-[#E5E7EB]' 
          : 'bg-transparent text-white border-white/[0.08]'
      }`}
    >
      <div className="relative z-10 max-w-[1400px] mx-auto">
        
        {/* Institutional Header Banner (Theme-Responsive Light/Dark) */}
        <div className={`relative overflow-hidden border mb-6 sm:mb-8 transition-colors duration-300 ${
          isLight 
            ? 'bg-gradient-to-r from-[#F4F9F5] via-[#EAF4ED] to-[#F4F9F5] border-[#D1E3D6] shadow-sm' 
            : 'bg-[#04150A] border-white/10 shadow-2xl'
        }`}>
          {/* Dot-Matrix Texture */}
          <div 
            className="absolute inset-0 pointer-events-none transition-opacity"
            style={{
              backgroundImage: isLight 
                ? 'radial-gradient(#15803D 1.1px, transparent 1.1px)' 
                : 'radial-gradient(#4ADE80 1.2px, transparent 1.2px)',
              backgroundSize: '16px 16px',
              opacity: isLight ? 0.14 : 0.3
            }}
          />

          {/* Radial Glow Accent */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: isLight
                ? 'radial-gradient(ellipse at 50% 50%, rgba(34, 197, 94, 0.12) 0%, rgba(244, 249, 245, 0.95) 75%)'
                : 'radial-gradient(ellipse at 50% 50%, rgba(22, 101, 52, 0.45) 0%, rgba(4, 21, 10, 0.95) 75%)'
            }}
          />

          <div className="relative z-10 px-6 sm:px-10 lg:px-12 py-8 sm:py-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 lg:gap-10">
            {/* Left Column: Heading & Tagline */}
            <div className="max-w-2xl">
              <h2 className={`font-['Oswald'] text-2xl sm:text-4xl lg:text-[44px] font-bold tracking-[0.01em] uppercase leading-[1.08] title-3d ${
                isLight ? 'text-[#111827]' : 'text-white'
              }`}>
                {language === 'es' 
                  ? 'TARIFAS Y ESPECIFICACIONES DE SERVICIO' 
                  : 'LABORATORY RATES & SERVICE SPECIFICATIONS'}
              </h2>
              <p className={`mt-2.5 font-sans text-xs sm:text-sm leading-relaxed font-normal ${
                isLight ? 'text-[#4B5563]' : 'text-neutral-300'
              }`}>
                {language === 'es'
                  ? 'Sin suscripciones recurrentes, sin compromisos mensuales.'
                  : 'No recurring subscriptions, no monthly commitments.'}
              </p>
            </div>

            {/* Right Column: Official Tariff Schedule Card with Professional Down Arrow */}
            <div className={`shrink-0 flex items-stretch border shadow-lg max-w-md w-full lg:w-auto transition-colors ${
              isLight 
                ? 'bg-white/95 border-[#D0E2D6] shadow-sm' 
                : 'bg-[#0B150F]/90 border-white/15 backdrop-blur-md shadow-2xl'
            }`}>
              {/* Green Left Pillar with Professional Down Arrow */}
              <div className={`px-4 flex items-center justify-center shrink-0 border-r ${
                isLight 
                  ? 'bg-[#DCFCE7] border-[#BBF7D0]' 
                  : 'bg-[#122A1A] border-white/10'
              }`}>
                <svg 
                  className={`w-5 h-5 transition-transform duration-300 hover:translate-y-0.5 ${
                    isLight ? 'text-[#15803D]' : 'text-[#4ADE80]'
                  }`} 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2.4" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <polyline points="19 12 12 19 5 12" />
                </svg>
              </div>

              {/* Text Information */}
              <div className="p-4 sm:p-5 flex flex-col justify-center">
                <div className={`font-mono text-[10px] sm:text-[11px] font-bold tracking-wider uppercase ${
                  isLight ? 'text-[#111827]' : 'text-neutral-200'
                }`}>
                  {language === 'es' 
                    ? 'TABLA DE TARIFAS OFICIALES | LABORATORIO 2026' 
                    : 'OFFICIAL TARIFF SCHEDULE | LABORATORY 2026'}
                </div>
                <p className={`font-sans text-xs mt-1 leading-relaxed ${
                  isLight ? 'text-[#4B5563]' : 'text-neutral-400'
                }`}>
                  {language === 'es'
                    ? 'Tarifas fijas por carta según el plazo de retorno requerido y la cobertura asegurada declarada.'
                    : 'Fixed unit fees per card determined strictly by required laboratory turnaround and declared insurance coverage.'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 1. TECHNICAL TARIFF MATRIX (Tabla Oficial de Laboratorio - Desktop Only) */}
        <div className={`hidden lg:block w-full border overflow-hidden shadow-sm mb-8 sm:mb-14 ${
          isLight ? 'bg-white border-[#E5E7EB]' : 'bg-[#181B18] border-white/10'
        }`}>
          
          {/* Matrix Top Header Bar */}
          <div className={`px-4 sm:px-6 py-2.5 sm:py-3.5 border-b flex flex-wrap items-center justify-between gap-2 sm:gap-4 font-mono text-[11px] sm:text-xs ${
            isLight ? 'bg-gray-100 border-[#E5E7EB] text-gray-800' : 'bg-white/[0.05] border-white/10 text-gray-100'
          }`}>
            <span className="font-bold tracking-wider uppercase">
              {language === 'es' ? 'CUADRO REGULATORIO DE GRADUACIÓN ÓPTICA' : 'OPTICAL GRADING REGULATORY MATRIX'}
            </span>
            <div className="flex items-center gap-3 sm:gap-4 text-[10px] sm:text-[11px] font-semibold text-gray-600 dark:text-gray-300">
              <span>ISO-9001 CLEANROOM AUDITED</span>
              <span>/</span>
              <span>{language === 'es' ? 'CALIBRE LÁSER 0.01mm' : '0.01mm LASER CALIPER'}</span>
            </div>
          </div>

          {/* Desktop Table View */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className={`border-b font-mono text-[11px] uppercase tracking-wider font-bold ${
                  isLight ? 'bg-gray-100 text-gray-900 border-gray-300' : 'bg-black/40 text-gray-100 border-white/15'
                }`}>
                  <th className="py-3.5 px-6 font-bold">{language === 'es' ? 'CÓDIGO' : 'CODE'}</th>
                  <th className="py-3.5 px-6 font-bold">{language === 'es' ? 'NIVEL DE SERVICIO' : 'SERVICE TIER'}</th>
                  <th className="py-3.5 px-6 font-bold">{language === 'es' ? 'PLAZO DE RETORNO' : 'ESTIMATED TURNAROUND'}</th>
                  <th className="py-3.5 px-6 font-bold">{language === 'es' ? 'COBERTURA ASEGURADA' : 'INSURANCE COVERAGE'}</th>
                  <th className="py-3.5 px-6 font-bold">{language === 'es' ? 'ALCANCE TÉCNICO' : 'TECHNICAL SCOPE'}</th>
                  <th className="py-3.5 px-6 font-bold text-right">{language === 'es' ? 'TARIFA / CARTA' : 'RATE / CARD'}</th>
                  <th className="py-3.5 px-6 font-bold text-center">{language === 'es' ? 'ACCIÓN' : 'ACTION'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200/70 dark:divide-white/5 font-mono text-xs">
                {serviceLevels.map((lvl, index) => {
                  const isSelected = selectedTierId === lvl.id;
                  const isEven = index % 2 === 0;

                  // Alternating background shades: one darker than the other
                  const rowBg = isSelected 
                    ? (isLight ? 'bg-[#E7F6EA]' : 'bg-[#182B1B]') 
                    : (isEven 
                        ? (isLight ? 'bg-white' : 'bg-[#121612]') 
                        : (isLight ? 'bg-[#F2EFE8]' : 'bg-[#1B201B]'));

                  const hoverBg = isLight ? 'hover:bg-[#EBE5DA]' : 'hover:bg-[#232A23]';

                  return (
                    <tr 
                      key={lvl.id}
                      onClick={() => setSelectedTierId(lvl.id)}
                      className={`cursor-pointer transition-colors ${rowBg} ${hoverBg}`}
                    >
                      {/* Code */}
                      <td className="py-4 px-6 font-extrabold text-[13px]" style={{ color: lvl.accentColor }}>
                        {lvl.code}
                      </td>

                      {/* Name & Purpose */}
                      <td className="py-4 px-6">
                        <div className="font-['Oswald'] text-sm sm:text-base uppercase font-bold tracking-wide text-current">
                          {lvl.name}
                        </div>
                        <div className={`font-sans text-xs leading-relaxed max-w-xs mt-1 ${
                          isLight ? 'text-gray-800' : 'text-gray-100'
                        }`}>
                          {lvl.purpose}
                        </div>
                      </td>

                      {/* Turnaround */}
                      <td className={`py-4 px-6 font-extrabold ${isLight ? 'text-gray-900' : 'text-white'}`}>
                        <div className="flex items-center gap-2">
                          <Clock className={`w-3.5 h-3.5 ${isLight ? 'text-gray-700' : 'text-gray-300'}`} />
                          <span>{lvl.turnaround}</span>
                        </div>
                      </td>

                      {/* Max Insurance */}
                      <td className={`py-4 px-6 font-bold text-[13px] ${isLight ? 'text-gray-900' : 'text-gray-100'}`}>
                        {lvl.maxInsurance}
                      </td>

                      {/* Scope */}
                      <td className={`py-4 px-6 font-sans text-xs sm:text-[12.5px] leading-relaxed max-w-sm ${
                        isLight ? 'text-gray-800' : 'text-gray-100'
                      }`}>
                        {lvl.scope}
                      </td>

                      {/* Price */}
                      <td className="py-4 px-6 text-right font-['Oswald'] text-2xl font-bold">
                        {lvl.price} €
                        <span className={`block font-mono text-[9.5px] font-semibold mt-0.5 ${
                          isLight ? 'text-gray-600' : 'text-gray-300'
                        }`}>
                          {language === 'es' ? 'IVA INCLUIDO' : 'VAT INCLUDED'}
                        </span>
                      </td>

                      {/* Action */}
                      <td className="py-4 px-6 text-center">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedTierId(lvl.id);
                            if (onNavigate) {
                              onNavigate(`/submit?tier=${lvl.id}`);
                            } else {
                              window.location.href = `/submit?tier=${lvl.id}`;
                            }
                          }}
                          className={
                            isSelected
                              ? 'btn-gorilla-square px-4 py-2 text-[10px] font-extrabold tracking-wider'
                              : 'btn-gorilla-square-secondary px-4 py-2 text-[10px] font-bold tracking-wider'
                          }
                        >
                          {language === 'es'
                            ? (isSelected ? '✓ SELECCIONADO' : 'SELECCIONAR')
                            : (isSelected ? '✓ SELECTED' : 'SELECT')}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* 2. DEDICATED MOBILE SERVICE & PRICING SUITE (Zero Overload, Single-Screen Mobile Hub - Mobile Only) */}
        <div className="lg:hidden w-full mb-8">
          {/* 4-Pill Segmented Selector Bar */}
          <div className={`grid grid-cols-4 gap-1 p-1 rounded-xl mb-3 border ${
            isLight ? 'bg-gray-100/90 border-gray-200' : 'bg-black/40 border-white/10'
          }`}>
            {serviceLevels.map((lvl) => {
              const isActive = selectedTierId === lvl.id;
              return (
                <button
                  key={lvl.id}
                  type="button"
                  onClick={() => setSelectedTierId(lvl.id)}
                  className={`relative py-2 px-1 text-center rounded-lg transition-all cursor-pointer flex flex-col items-center justify-center ${
                    isActive
                      ? 'bg-[#16A34A] text-white shadow-md font-bold'
                      : isLight
                        ? 'text-gray-700 hover:text-black hover:bg-gray-200/60'
                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {lvl.isPopular && !isActive && (
                    <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#16A34A] ring-2 ring-white dark:ring-black" />
                  )}
                  <span className="font-['Oswald'] text-sm sm:text-base leading-tight">
                    {lvl.price} €
                  </span>
                  <span className={`font-mono text-[10px] tracking-tight truncate max-w-full ${
                    isActive ? 'text-emerald-100 font-semibold' : 'opacity-80'
                  }`}>
                    {lvl.shortName}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Tier Luxury Mobile Card */}
          <div className={`w-full rounded-2xl border overflow-hidden transition-all duration-300 ${
            isLight 
              ? 'bg-white border-gray-200/90 shadow-lg' 
              : 'bg-[#151915] border-white/10 shadow-2xl'
          }`}>
            {/* Top Color Accent Bar */}
            <div 
              className="h-1.5 w-full transition-colors duration-300"
              style={{ backgroundColor: currentLevel.accentColor }} 
            />

            <div className="p-4 sm:p-5">
              {/* Card Header: Code + Name + Unit Price */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span 
                      className="font-mono text-[10px] font-extrabold px-1.5 py-0.5 rounded"
                      style={{ 
                        color: currentLevel.accentColor, 
                        backgroundColor: `${currentLevel.accentColor}18` 
                      }}
                    >
                      {currentLevel.code}
                    </span>
                    {currentLevel.isPopular && (
                      <span className="font-mono text-[9.5px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25">
                        {language === 'es' ? '★ RECOMENDADO' : '★ RECOMMENDED'}
                      </span>
                    )}
                  </div>
                  <h3 className="font-['Oswald'] text-base sm:text-lg font-bold uppercase tracking-wide mt-1.5 text-current">
                    {currentLevel.name}
                  </h3>
                </div>

                <div className="text-right shrink-0">
                  <div className="font-['Oswald'] text-2xl font-bold leading-tight">
                    {currentLevel.price} €
                  </div>
                  <span className="font-mono text-[9px] font-semibold text-gray-700 dark:text-gray-300 block">
                    {language === 'es' ? 'c/u IVA inc.' : 'ea. incl. VAT'}
                  </span>
                </div>
              </div>

              {/* Two Side-by-Side Key Metric Chips (No text wrapping) */}
              <div className="grid grid-cols-2 gap-2 mt-3">
                <div className={`p-2.5 rounded-xl border flex items-center gap-2 ${
                  isLight ? 'bg-gray-50 border-gray-200' : 'bg-black/30 border-white/5'
                }`}>
                  <Clock className="w-4 h-4 text-emerald-500 shrink-0" />
                  <div className="min-w-0">
                    <span className="block font-mono text-[9px] uppercase tracking-wider text-gray-700 dark:text-gray-300">
                      {language === 'es' ? 'Plazo retorno' : 'Turnaround'}
                    </span>
                    <span className="block font-sans text-xs font-bold truncate text-current">
                      {currentLevel.turnaround}
                    </span>
                  </div>
                </div>

                <div className={`p-2.5 rounded-xl border flex items-center gap-2 ${
                  isLight ? 'bg-gray-50 border-gray-200' : 'bg-black/30 border-white/5'
                }`}>
                  <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                  <div className="min-w-0">
                    <span className="block font-mono text-[9px] uppercase tracking-wider text-gray-700 dark:text-gray-300">
                      {language === 'es' ? 'Seguro hasta' : 'Insurance up to'}
                    </span>
                    <span className="block font-sans text-xs font-bold truncate text-current">
                      {currentLevel.maxInsurance}
                    </span>
                  </div>
                </div>
              </div>

              {/* 3 Value Proposition Bullets (Clean, concise, zero walls of text) */}
              <div className={`my-3 py-2.5 px-3 rounded-xl border space-y-2 ${
                isLight ? 'bg-gray-50/70 border-gray-200/80' : 'bg-white/[0.02] border-white/5'
              }`}>
                {currentLevel.bullets.map((bullet, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                    <span className={`text-[11.5px] leading-tight font-medium ${
                      isLight ? 'text-gray-800' : 'text-gray-200'
                    }`}>
                      {bullet}
                    </span>
                  </div>
                ))}
              </div>

              {/* Integrated Volume Selector & Stepper */}
              <div className={`pt-3 border-t ${isLight ? 'border-gray-200' : 'border-white/10'}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className={`font-mono text-[10.5px] font-bold uppercase tracking-wider ${
                    isLight ? 'text-gray-700' : 'text-gray-300'
                  }`}>
                    {language === 'es' ? 'Cantidad de cartas:' : 'Number of cards:'}
                  </span>
                  {discountRate > 0 && (
                    <span className="font-mono text-[9.5px] font-extrabold px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                      {language === 'es' ? `-${Math.round(discountRate * 100)}% dto. lote` : `-${Math.round(discountRate * 100)}% bulk disc.`}
                    </span>
                  )}
                </div>

                {/* Quick Presets + Stepper in 1 line */}
                <div className="flex items-center gap-1.5">
                  {[1, 5, 10, 25, 50].map((qty) => {
                    const isQtyActive = cardCount === qty;
                    return (
                      <button
                        key={qty}
                        type="button"
                        onClick={() => setCardCount(qty)}
                        className={`flex-1 py-1.5 text-center font-mono text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                          isQtyActive
                            ? 'bg-[#16A34A] text-white border-[#16A34A] shadow-xs'
                            : isLight
                              ? 'bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200'
                              : 'bg-white/5 text-gray-300 border-white/10 hover:bg-white/10'
                        }`}
                      >
                        {qty}
                      </button>
                    );
                  })}

                  {/* Compact Stepper */}
                  <div className={`flex items-center border rounded-lg ${
                    isLight ? 'border-gray-300 bg-gray-50' : 'border-white/15 bg-white/5'
                  }`}>
                    <button
                      type="button"
                      onClick={() => setCardCount(Math.max(1, cardCount - 1))}
                      className="w-7 h-7 flex items-center justify-center font-mono font-bold text-sm text-gray-700 dark:text-gray-200 active:scale-95 cursor-pointer"
                    >
                      -
                    </button>
                    <span className="w-7 text-center font-mono text-xs font-bold text-current">
                      {cardCount}
                    </span>
                    <button
                      type="button"
                      onClick={() => setCardCount(Math.min(500, cardCount + 1))}
                      className="w-7 h-7 flex items-center justify-center font-mono font-bold text-sm text-gray-700 dark:text-gray-200 active:scale-95 cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Real-time price summary banner */}
                <div className={`mt-3 p-3 rounded-xl flex items-center justify-between ${
                  isLight ? 'bg-gray-50 border border-gray-200' : 'bg-black/30 border border-white/10'
                }`}>
                  <div>
                    <span className="font-mono text-[9.5px] uppercase tracking-wider text-gray-700 dark:text-gray-300 block font-semibold">
                      {language === 'es' ? 'Total remesa' : 'Estimated total'}
                    </span>
                    <span className="font-mono text-[11px] font-bold text-gray-800 dark:text-gray-200">
                      {unitPrice} € / {language === 'es' ? 'carta' : 'card'}
                      {discountRate > 0 && <span className="text-emerald-500 font-extrabold ml-1">(-{Math.round(discountRate * 100)}%)</span>}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="font-['Oswald'] text-2xl font-bold tracking-tight text-emerald-600 dark:text-emerald-400">
                      {totalAmount} €
                    </span>
                    <span className="block font-mono text-[9px] text-gray-700 dark:text-gray-300">
                      {language === 'es' ? 'IVA 21% y seguro inc.' : 'VAT 21% & insurance inc.'}
                    </span>
                  </div>
                </div>

                {/* Mobile Direct Action Button */}
                <button
                  type="button"
                  onClick={() => onNavigate && onNavigate(`/submit?tier=${selectedTierId}&qty=${cardCount}`)}
                  className="btn-gorilla-pill w-full mt-3 py-3 px-4 text-xs font-extrabold tracking-wider flex items-center justify-center gap-2 shadow-lg"
                >
                  <span>
                    {language === 'es' 
                      ? `CONFIGURAR ENVÍO (${cardCount} ${cardCount === 1 ? 'CARTA' : 'CARTAS'}) →` 
                      : `CONFIGURE SHIPMENT (${cardCount} ${cardCount === 1 ? 'CARD' : 'CARDS'}) →`}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 3. ESTIMACIÓN DE REMESA (Desktop Only Volume Calculator) */}
        <div className={`hidden lg:block w-full border p-4 sm:p-8 lg:p-10 mb-8 sm:mb-14 transition-colors ${
          isLight ? 'bg-white border-[#E5E7EB]' : 'bg-[#181B18] border-white/10'
        }`}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 pb-4 sm:pb-6 border-b border-gray-100 dark:border-white/5">
            <div>
              <h3 className="font-['Oswald'] text-lg sm:text-2xl font-bold uppercase tracking-wide">
                {language === 'es' ? 'CALCULAR TARIFA POR CANTIDAD DE CARTAS' : 'VOLUME ESTIMATION'}
              </h3>
              <p className={`mt-1 font-sans text-xs max-w-xl leading-relaxed ${
                isLight ? 'text-gray-700' : 'text-gray-200'
              }`}>
                {language === 'es'
                  ? 'Descuentos por volumen: 5% a partir de 10 cartas, 8% desde 25 cartas y 12% para más de 50 cartas.'
                  : 'Bulk discounts: 5% for 10+ cards, 8% for 25+ cards, and 12% for 50+ cards.'}
              </p>
            </div>

            {/* Service Level Switcher - Clean tabs without dots */}
            <div className={`p-1 border flex items-center gap-1 flex-wrap ${
              isLight ? 'bg-gray-50 border-gray-200' : 'bg-black/40 border-white/15'
            }`}>
              {serviceLevels.map((lvl) => {
                const isActive = selectedTierId === lvl.id;
                return (
                  <button
                    key={lvl.id}
                    type="button"
                    onClick={() => setSelectedTierId(lvl.id)}
                    className={`px-2.5 py-1 sm:px-3 sm:py-1.5 font-mono text-[11px] sm:text-xs transition-colors cursor-pointer ${
                      isActive
                        ? (isLight ? 'bg-white text-black font-bold shadow-xs border border-gray-200' : 'bg-white/20 text-white font-bold')
                        : (isLight ? 'text-gray-600 hover:text-black' : 'text-gray-300 hover:text-white')
                    }`}
                  >
                    {lvl.code}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main interactive area: Volume buttons & Real-time result */}
          <div className="pt-4 sm:pt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
            
            {/* Left: Volume selector buttons + custom input */}
            <div className="lg:col-span-7 space-y-3 sm:space-y-4">
              <span className={`font-mono text-[11px] sm:text-xs uppercase tracking-wider font-semibold block ${
                isLight ? 'text-gray-700' : 'text-gray-200'
              }`}>
                {language === 'es' ? 'Selecciona o introduce la cantidad de cartas:' : 'Select or enter number of cards:'}
              </span>

              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                {[1, 5, 10, 25, 50, 100].map((vol) => {
                  const isSelected = cardCount === vol;
                  return (
                    <button
                      key={vol}
                      type="button"
                      onClick={() => setCardCount(vol)}
                      className={`px-3 py-1.5 sm:px-4 sm:py-2 font-mono text-xs font-bold transition-colors cursor-pointer border ${
                        isSelected
                          ? 'border-[#16A34A] bg-[#16A34A] text-white'
                          : (isLight ? 'border-gray-300 bg-gray-50 text-gray-800 hover:border-gray-500' : 'border-white/15 bg-white/5 text-gray-100 hover:border-white/30')
                      }`}
                    >
                      {vol} {vol === 1 ? (language === 'es' ? 'carta' : 'card') : (language === 'es' ? 'cartas' : 'cards')}
                    </button>
                  );
                })}

                {/* Direct Stepper Input */}
                <div className={`flex items-center border ml-auto ${
                  isLight ? 'border-gray-300 bg-gray-50' : 'border-white/15 bg-white/5'
                }`}>
                  <button
                    type="button"
                    onClick={() => setCardCount(Math.max(1, cardCount - 1))}
                    className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center font-mono font-bold text-sm hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer text-white"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min={1}
                    max={1000}
                    value={cardCount}
                    onChange={(e) => setCardCount(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-12 sm:w-14 text-center font-mono text-xs sm:text-sm font-bold bg-transparent outline-none text-current"
                  />
                  <button
                    type="button"
                    onClick={() => setCardCount(Math.min(1000, cardCount + 1))}
                    className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center font-mono font-bold text-sm hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer text-white"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className={`font-mono text-[11px] sm:text-xs pt-2 flex flex-wrap items-center gap-2 sm:gap-3 ${
                isLight ? 'text-gray-700' : 'text-gray-200'
              }`}>
                <span className="font-semibold">{language === 'es' ? `Servicio: ${currentLevel.name}` : `Service: ${currentLevel.name}`}</span>
                <span className="text-gray-400">/</span>
                <span>{language === 'es' ? `Plazo: ${currentLevel.turnaround}` : `Turnaround: ${currentLevel.turnaround}`}</span>
                <span className="text-gray-400">/</span>
                <span>{language === 'es' ? `Cobertura: hasta ${totalInsuredCoverage.toLocaleString()} €` : `Insurance: up to ${totalInsuredCoverage.toLocaleString()} €`}</span>
              </div>
            </div>

            {/* Right: Clean Price Display & Action */}
            <div className={`lg:col-span-5 p-4 sm:p-6 border flex flex-col justify-between gap-4 ${
              isLight ? 'bg-gray-50/90 border-gray-200' : 'bg-black/40 border-white/15'
            }`}>
              <div className="flex items-baseline justify-between">
                <div>
                  <span className={`font-mono text-[10px] sm:text-[11px] uppercase tracking-wider block font-semibold ${
                    isLight ? 'text-gray-700' : 'text-gray-300'
                  }`}>
                    {language === 'es' ? 'Total estimado' : 'Estimated total'}
                  </span>
                  <span className={`font-mono text-xs font-semibold ${
                    isLight ? 'text-gray-800' : 'text-gray-200'
                  }`}>
                    {unitPrice} € / {language === 'es' ? 'carta' : 'card'} {discountRate > 0 && `(-${Math.round(discountRate * 100)}%)`}
                  </span>
                </div>

                <div className="text-right">
                  <span className="font-['Oswald'] text-3xl sm:text-5xl font-bold tracking-tight">
                    {totalAmount} €
                  </span>
                  <span className={`block font-mono text-[10px] font-medium mt-0.5 ${
                    isLight ? 'text-gray-700' : 'text-gray-300'
                  }`}>
                    {language === 'es' ? 'IVA 21% y seguro incluidos' : 'VAT 21% & insurance included'}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onNavigate && onNavigate(`/submit?tier=${selectedTierId}&qty=${cardCount}`)}
                className="btn-gorilla-pill w-full py-3.5 sm:py-4 px-6 sm:px-8 text-xs font-extrabold tracking-widest gap-2 shadow-lg"
              >
                <span>{language === 'es' ? `Configurar envío (${cardCount} ${cardCount === 1 ? 'carta' : 'cartas'}) →` : `Configure shipment (${cardCount} ${cardCount === 1 ? 'card' : 'cards'}) →`}</span>
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
