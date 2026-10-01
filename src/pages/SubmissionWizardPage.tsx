import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { MOCK_SERVICES } from '../data/mockServices';
import { OrderItem, ServiceTier } from '../types';
import { Plus, Trash2, CheckCircle2 } from 'lucide-react';
import { BlueprintScanner, BlueprintCaliper, BlueprintMagnifier, BlueprintBriefcase } from '../components/luxury/LuxuryPricingSection';

interface SubmissionWizardPageProps {
  onNavigate: (path: string) => void;
}

export const SubmissionWizardPage: React.FC<SubmissionWizardPageProps> = ({ onNavigate }) => {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('tier') ? 2 : 1;
  });
  const [selectedTier, setSelectedTier] = useState<ServiceTier | null>(() => {
    const params = new URLSearchParams(window.location.search);
    const tierId = params.get('tier');
    if (tierId) {
      const found = MOCK_SERVICES.find(s => s.id === tierId);
      if (found) return found;
    }
    return null;
  }); 
  
  const [items, setItems] = useState<OrderItem[]>([]);
  const [newCardGame, setNewCardGame] = useState('Pokemon');
  const [newCardYear, setNewCardYear] = useState('');
  const [newCardSet, setNewCardSet] = useState('');
  const [newCardName, setNewCardName] = useState('');
  const [newCardLanguage, setNewCardLanguage] = useState('English');
  const [newCardRarity, setNewCardRarity] = useState('');
  const [newDeclaredValue, setNewDeclaredValue] = useState('');
  const [newCardQuantity, setNewCardQuantity] = useState('1');

  const [shippingMethod, setShippingMethod] = useState<'COURIER_INSURED' | 'CARD_SHOW_DROPOFF'>('COURIER_INSURED');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [generatedSubmissionId, setGeneratedSubmissionId] = useState('');

  // Totals Calculation
  const subtotalGrading = items.length * (selectedTier?.priceEur || 0);
  const totalDeclaredValue = items.reduce((sum, item) => sum + (Number(item.declaredValue) || 0), 0);
  const insuranceFee = Math.max(8.00, totalDeclaredValue * 0.008);
  const shippingFee = shippingMethod === 'CARD_SHOW_DROPOFF' ? 0.00 : 14.50;
  const totalEstimatedCost = subtotalGrading + (shippingMethod === 'COURIER_INSURED' ? insuranceFee + shippingFee : 0);

  const handleAddCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCardName.trim()) return;

    const quantity = Math.max(1, parseInt(newCardQuantity) || 1);
    const newItems: OrderItem[] = [];
    
    for (let i = 0; i < quantity; i++) {
      newItems.push({
        id: `item-${Date.now()}-${i}`,
        cardName: newCardName,
        game: newCardGame,
        set: newCardSet || 'Unknown',
        declaredValue: Number(newDeclaredValue) || 100,
        serviceTierId: selectedTier?.id || 'standard',
        notes: '',
        frontImagePreview: 'https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?auto=format&fit=crop&w=400&q=80'
      });
    }

    setItems([...items, ...newItems]);
    setNewCardName('');
    setNewCardSet('');
    setNewCardYear('');
    setNewCardRarity('');
    setNewDeclaredValue('');
    setNewCardQuantity('1');
  };

  const handleRemoveCard = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleFinalSubmit = () => {
    if (items.length === 0) return;
    const randomSubId = `GG-SUB-${Math.floor(100000 + Math.random() * 900000)}`;
    setGeneratedSubmissionId(randomSubId);
    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const stepsList = [
    { num: 1, label: language === 'es' ? 'SERVICIO' : 'SERVICE' },
    { num: 2, label: language === 'es' ? 'CARTAS' : 'CARDS' },
    { num: 3, label: language === 'es' ? 'DATOS' : 'DETAILS' },
    { num: 4, label: language === 'es' ? 'RESUMEN' : 'SUMMARY' }
  ];

  if (isSubmitted) {
    return (
      <div className={`max-w-3xl mx-auto px-4 py-24 text-center ${isLight ? 'text-[#1C201D]' : 'text-white'}`}>
        <div className={`w-20 h-20 rounded-none flex items-center justify-center mx-auto mb-8 border ${
          isLight ? 'bg-[#2D9A46]/10 text-[#2D9A46] border-[#2D9A46]/30' : 'bg-[#48C765]/20 text-[#48C765] border-[#48C765]/50'
        }`}>
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h1 className="text-2xl font-['Oswald'] uppercase tracking-wide mb-4">
          {language === 'es' ? 'Pedido Confirmado' : 'Order Confirmed'}
        </h1>
        <p className={`mb-8 font-sans ${isLight ? 'text-[#656E63]' : 'text-[#A4ACA1]'}`}>
          {language === 'es' 
            ? `Tu número de envío es #${generatedSubmissionId}. Recibirás las etiquetas por correo electrónico en breve.`
            : `Your submission ID is #${generatedSubmissionId}. You will receive shipping labels via email shortly.`}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => onNavigate('/account')}
            className={`w-full sm:w-auto px-8 py-3 rounded-none font-mono text-xs font-bold uppercase tracking-widest transition-all ${
              isLight 
                ? 'bg-[#2D9A46] hover:bg-[#25823a] text-white shadow-lg shadow-[#2D9A46]/20' 
                : 'bg-[#48C765] hover:bg-[#3ca352] text-black shadow-lg shadow-[#48C765]/20'
            }`}
          >
            {language === 'es' ? 'VER MIS PEDIDOS' : 'VIEW MY ORDERS'}
          </button>
          <button
            onClick={() => onNavigate('/')}
            className={`w-full sm:w-auto px-8 py-3 rounded-none font-mono text-xs uppercase tracking-widest border transition-all ${
              isLight
                ? 'bg-white hover:bg-[#FAF7F2] text-[#1C201D] border-[#DCD5C3]'
                : 'bg-white/5 hover:bg-white/10 text-white border-white/10'
            }`}
          >
            {language === 'es' ? 'VOLVER AL INICIO' : 'BACK TO HOME'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full min-h-screen pt-24 pb-32 transition-colors duration-300 ${isLight ? 'bg-[#F3EFE6] text-[#1A1D1A]' : 'bg-[#454545] text-white'}`}>
      <div className="max-w-[1000px] mx-auto px-6 lg:px-12">
        
        {/* Breadcrumb & Header */}
        <div className={`mb-6 font-mono text-[10px] uppercase tracking-widest flex items-center gap-2 ${isLight ? 'text-[#6B7268]' : 'text-[#A4ACA1]'}`}>
          <span className={`cursor-pointer transition-colors ${isLight ? 'hover:text-[#1C201D]' : 'hover:text-white'}`} onClick={() => onNavigate('/')}>
            {language === 'es' ? 'INICIO' : 'HOME'}
          </span> 
          <span>/</span> 
          <span className={isLight ? 'text-[#1C201D] font-bold' : 'text-white'}>{language === 'es' ? 'ENVIAR CARTAS' : 'SUBMIT CARDS'}</span>
        </div>

        <h1 className={`font-['Oswald'] text-2xl uppercase tracking-wide mb-3 ${isLight ? 'text-[#1C201D]' : 'text-white'}`}>
          {language === 'es' ? 'Centro de envíos' : 'Submission Center'}
        </h1>
        <p className={`font-sans text-sm max-w-xl mb-12 ${isLight ? 'text-[#656E63]' : 'text-[#A4ACA1]'}`}>
          {language === 'es'
            ? 'Configura tu pedido en cuatro pasos. Al terminar recibirás el albarán y la etiqueta de transporte por correo. Nada se cobra hasta que las cartas llegan y se verifican.'
            : 'Configure your order in four steps. Once finished, you will receive your packing slip and transport label by email. Nothing is charged until your cards arrive and are verified.'}
        </p>

        {/* Minimalist Horizontal Step Indicator */}
        <div className={`flex w-full border rounded mb-12 overflow-hidden transition-colors ${
          isLight ? 'border-[#E2DCce] bg-[#EAE4D7]' : 'border-[#2A2E2A] bg-[#2B302B]'
        }`}>
          {stepsList.map((step) => {
            const isCurrent = currentStep === step.num;
            const isPast = currentStep > step.num;
            return (
              <div 
                key={step.num}
                onClick={() => isPast && setCurrentStep(step.num as any)}
                className={`flex-1 p-3 sm:px-6 sm:py-4 transition-all ${
                  isLight ? 'border-r border-[#DCD5C3] last:border-r-0' : 'border-r border-[#2A2E2A] last:border-r-0'
                } ${isPast ? (isLight ? 'cursor-pointer hover:bg-white/40' : 'cursor-pointer hover:bg-white/[0.05]') : ''} ${
                  isCurrent ? (isLight ? 'bg-white/80 border-b-2 border-b-[#2D9A46]' : 'bg-black/20 border-b-2 border-b-[#48C765]') : ''
                }`}
              >
                <div className="flex flex-col">
                  <span className={`font-mono text-[11px] font-bold ${
                    isCurrent 
                      ? (isLight ? 'text-[#2D9A46]' : 'text-[#48C765]') 
                      : isPast 
                        ? (isLight ? 'text-[#1C201D]' : 'text-white') 
                        : (isLight ? 'text-[#8A9388]' : 'text-[#A4ACA1]')
                  }`}>
                    0{step.num}
                  </span>
                  <span className={`font-mono text-[10px] uppercase tracking-widest mt-1 ${
                    isCurrent 
                      ? (isLight ? 'text-[#1C201D] font-bold' : 'text-white') 
                      : (isLight ? 'text-[#8A9388]' : 'text-[#A4ACA1]')
                  }`}>
                    {step.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* ==============================================================
            STEP 1: SERVICIO
        ============================================================== */}
        {currentStep === 1 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className={`font-['Oswald'] text-xl uppercase tracking-wide mb-2 ${isLight ? 'text-[#1C201D]' : 'text-white'}`}>
              {language === 'es' ? 'Elige el servicio' : 'Select Service'}
            </h2>
            <p className={`text-xs font-sans mb-8 ${isLight ? 'text-[#656E63]' : 'text-[#A4ACA1]'}`}>
              {language === 'es' 
                ? 'El plazo cuenta desde que las cartas entran en nuestro sistema, no desde que las envías.'
                : 'Turnaround starts when cards enter our system, not when shipped.'}
            </p>

            <div className="flex flex-col gap-6 sm:gap-8">
              {MOCK_SERVICES.map((tier) => {
                const isSelected = selectedTier?.id === tier.id;
                
                let color = isLight ? '#2D9A46' : '#48C765';
                let shortName = 'STANDARD';
                let code = 'RCDM.01';
                let badge: string | null = language === 'es' ? 'MÁS ELEGIDO' : 'MOST POPULAR';
                let features = language === 'es' ? ['Subgrados detallados', 'Escaneo 4K HD', 'Registro público'] : ['Detailed Subgrades', '4K HD Scan', 'Public Registry'];
                let Blueprint = BlueprintCaliper;
                let cornerGradient = 'radial-gradient(circle at 100% 0%, rgba(45, 154, 70, 0.22) 0%, transparent 60%), #FFFFFF';
                let borderColor = 'rgba(45, 154, 70, 0.2)';
                
                switch(tier.id) {
                  case 'regular': 
                    color = isLight ? '#8B5CF6' : '#8CA5B8';
                    shortName = 'REGULAR';
                    code = 'RCDM.00';
                    badge = isLight ? '#8B5CF6' : null;
                    Blueprint = BlueprintScanner;
                    cornerGradient = 'radial-gradient(circle at 100% 0%, rgba(139, 92, 246, 0.22) 0%, transparent 60%), #FFFFFF';
                    borderColor = 'rgba(139, 92, 246, 0.2)';
                    features = language === 'es' ? ['Carcasa Premium', 'Chip NFC', 'Escaneo Básico'] : ['Premium Slab', 'NFC Chip', 'Basic Scan'];
                    break;
                  case 'standard': 
                    color = isLight ? '#2D9A46' : '#48C765';
                    shortName = 'STANDARD';
                    code = 'RCDM.01'; 
                    badge = language === 'es' ? 'MÁS ELEGIDO' : 'MOST POPULAR';
                    Blueprint = BlueprintCaliper;
                    cornerGradient = 'radial-gradient(circle at 100% 0%, rgba(45, 154, 70, 0.22) 0%, transparent 60%), #FFFFFF';
                    borderColor = 'rgba(45, 154, 70, 0.2)';
                    features = language === 'es' ? ['Subgrados detallados', 'Escaneo 4K HD', 'Registro público'] : ['Detailed Subgrades', '4K HD Scan', 'Public Registry'];
                    break;
                  case 'express': 
                    color = isLight ? '#EA580C' : '#F97316';
                    shortName = 'EXPRESS';
                    code = 'RCDM.02';
                    badge = language === 'es' ? 'PRIORIDAD' : 'PRIORITY';
                    Blueprint = BlueprintMagnifier;
                    cornerGradient = 'radial-gradient(circle at 100% 0%, rgba(249, 115, 22, 0.65) 0%, rgba(249, 115, 22, 0.32) 35%, rgba(249, 115, 22, 0.08) 60%, transparent 75%), #FFFFFF';
                    borderColor = 'rgba(249, 115, 22, 0.35)';
                    features = language === 'es' ? ['Acelerado', 'Soporte Directo', 'Fila Preferente'] : ['Fast-Track', 'Direct Support', 'Priority Queue'];
                    break;
                  case 'walkthrough': 
                    color = '#D4AF37';
                    shortName = 'WALK-THROUGH';
                    code = 'RCDM.MASTER';
                    badge = language === 'es' ? 'GUANTE BLANCO' : 'WHITE GLOVE';
                    Blueprint = BlueprintBriefcase;
                    cornerGradient = 'radial-gradient(circle at 100% 0%, rgba(212, 175, 55, 0.25) 0%, transparent 60%), #FFFFFF';
                    borderColor = 'rgba(212, 175, 55, 0.25)';
                    features = language === 'es' ? ['Doble Auditoría', 'Maletín Blindado', 'Master Grader Asignado'] : ['Dual Audit', 'Armored Case', 'Assigned Master Grader'];
                    break;
                }

                return (
                  <div 
                    key={tier.id}
                    className={`relative w-full overflow-hidden rounded-2xl transition-all duration-500 cursor-pointer group/card hover:scale-[1.01] ${
                      isLight 
                        ? `border shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)] ${isSelected ? 'ring-2 ring-[#2D9A46]' : ''}`
                        : `border shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8)] hover:ring-2 hover:ring-white/20 ${isSelected ? 'ring-2 ring-white/50' : ''}`
                    }`}
                    style={isLight ? { 
                      background: cornerGradient,
                      borderColor: borderColor
                    } : { 
                      background: `linear-gradient(160deg, #161A17 0%, #0A0D0B 100%)`,
                      borderColor: `${color}40`,
                    }}
                    onClick={() => {
                      setSelectedTier(tier);
                      setCurrentStep(2);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  >
                    
                    {/* Massive Typography Watermark */}
                    <div 
                      className={`absolute -right-2 -bottom-4 text-[70px] sm:text-[90px] font-black pointer-events-none select-none tracking-tighter leading-none whitespace-nowrap transition-all duration-700 font-['Oswald'] ${
                        isLight ? 'opacity-[0.035]' : 'opacity-[0.03]'
                      }`}
                      style={{ color: color }}
                    >
                      {shortName}
                    </div>

                    {/* Glowing Orb inside the card (Dark Mode only) */}
                    {!isLight && (
                      <div 
                        className="absolute top-0 right-0 w-[200px] h-[200px] blur-[60px] rounded-full pointer-events-none opacity-20 transition-colors duration-700 translate-x-1/3 -translate-y-1/3"
                        style={{ backgroundColor: color }}
                      />
                    )}

                    {/* Noise Texture Overlay */}
                    <div className={`absolute inset-0 bg-[url('/images/noise.png')] pointer-events-none z-0 ${
                      isLight ? 'opacity-5 mix-blend-multiply' : 'opacity-20 mix-blend-overlay'
                    }`} />

                    {/* Glass Reflection Sheen */}
                    <div className={`absolute inset-0 bg-gradient-to-tr from-transparent to-transparent translate-x-[-150%] group-hover/card:translate-x-[150%] transition-transform duration-[1200ms] ease-in-out pointer-events-none z-20 ${
                      isLight ? 'via-black/[0.03]' : 'via-white/[0.07]'
                    }`} />

                    <div className="w-full flex flex-col md:flex-row relative z-10 h-full">
                      
                      {/* Left Side: Info */}
                      <div className="flex-1 p-5 sm:p-7 flex flex-col justify-center">
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          {isLight ? (
                            <>
                              {tier.id === 'regular' && (
                                <div className="px-2.5 py-0.5 text-[9.5px] font-mono font-bold tracking-wider uppercase rounded bg-[#8B5CF6] shadow-sm" style={{ color: '#FFFFFF' }}>
                                  #8B5CF6
                                </div>
                              )}
                              {tier.id === 'standard' && (
                                <>
                                  <div className="px-2 py-0.5 text-[9.5px] font-mono font-bold tracking-wider uppercase rounded border border-[#2D9A46]/40 bg-[#2D9A46]/10 text-[#2D9A46]">
                                    {code}
                                  </div>
                                  <div className="px-2 py-0.5 text-[9.5px] font-mono font-bold tracking-wider uppercase rounded border border-neutral-300 bg-white text-neutral-900 shadow-sm">
                                    {badge}
                                  </div>
                                </>
                              )}
                              {tier.id === 'express' && (
                                <>
                                  <div className="px-2 py-0.5 text-[9.5px] font-mono font-bold tracking-wider uppercase rounded bg-neutral-900 shadow-sm" style={{ color: '#FFFFFF' }}>
                                    {code}
                                  </div>
                                  <div className="px-2 py-0.5 text-[9.5px] font-mono font-bold tracking-wider uppercase rounded bg-[#F97316] shadow-sm" style={{ color: '#FFFFFF' }}>
                                    {badge}
                                  </div>
                                </>
                              )}
                              {tier.id === 'walkthrough' && (
                                <>
                                  <div className="px-2 py-0.5 text-[9.5px] font-mono font-bold tracking-wider uppercase rounded bg-neutral-900 shadow-sm" style={{ color: '#FFFFFF' }}>
                                    {code}
                                  </div>
                                  <div className="px-2 py-0.5 text-[9.5px] font-mono font-bold tracking-wider uppercase rounded bg-[#D4AF37] shadow-sm" style={{ color: '#FFFFFF' }}>
                                    {badge}
                                  </div>
                                </>
                              )}
                            </>
                          ) : (
                            <>
                              <div className="px-2 py-0.5 text-[9px] font-mono font-bold tracking-[0.2em] uppercase rounded-sm border backdrop-blur-sm"
                                   style={{ backgroundColor: `${color}10`, color: color, borderColor: `${color}30` }}>
                                {code}
                              </div>
                              {badge && (
                                <div className="px-2 py-0.5 text-[9px] font-mono font-bold tracking-[0.2em] uppercase bg-white text-black rounded-sm shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                                  {badge}
                                </div>
                              )}
                            </>
                          )}
                        </div>
                        
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <h3 className={`font-['Oswald'] text-2xl sm:text-3xl uppercase tracking-wide leading-[1.1] mb-2 ${
                              isLight ? 'text-neutral-900 font-bold' : 'text-white drop-shadow-lg'
                            }`}>
                              {tier.name}
                            </h3>
                            
                            <p className={`text-xs sm:text-[13px] font-sans leading-relaxed max-w-[95%] mb-4 ${
                              isLight ? 'text-neutral-600' : 'text-[#A4ACA1]'
                            }`}>
                              {tier.tagline}
                            </p>
                          </div>

                          {/* Animated Blueprint Graphic */}
                          <div className="hidden sm:flex w-20 h-16 sm:w-24 sm:h-20 items-center justify-center shrink-0 my-auto group-hover/card:scale-105 transition-transform duration-500">
                            <Blueprint color={color} isLight={isLight} />
                          </div>
                        </div>

                        <div className="flex flex-col gap-2 mt-auto">
                          {features.map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              {isLight ? (
                                <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: color }} />
                              ) : (
                                <div className="w-1 h-1 rounded-full shadow-[0_0_8px_currentColor]" style={{ backgroundColor: color, color: color }} />
                              )}
                              <span className={`font-sans text-xs sm:text-[13px] font-medium tracking-wide ${
                                isLight ? 'text-neutral-800' : 'text-[#EAEAEA]'
                              }`}>
                                {feature}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Right Side: Price & CTA */}
                      <div className={`w-full md:w-[30%] lg:w-[25%] p-5 sm:p-7 flex flex-col justify-center items-start md:items-end border-t md:border-t-0 md:border-l ${
                        isLight 
                          ? 'border-neutral-200/80 bg-neutral-50/60' 
                          : 'border-white/10 backdrop-blur-md bg-black/20'
                      }`}>
                        
                        <div className="flex flex-col items-start md:items-end w-full mb-4">
                          <span className={`font-mono text-[9px] uppercase tracking-[0.2em] mb-1 ${
                            isLight ? 'text-neutral-400' : 'text-[#A4ACA1]'
                          }`}>
                            {language === 'es' ? 'PRECIO BASE' : 'BASE PRICE'}
                          </span>
                          <div className="flex items-start mb-2">
                            <span className={`font-mono text-base mt-1 mr-1 ${
                              isLight ? 'text-neutral-400' : 'text-white/40'
                            }`}>€</span>
                            <span className={`font-['Oswald'] font-[700] text-4xl sm:text-5xl leading-none tracking-tighter ${
                              isLight ? 'text-neutral-900' : 'text-white'
                            }`} style={!isLight ? { textShadow: `0 0 40px ${color}40` } : {}}>
                              {tier.priceEur}
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-1.5 text-right">
                            <svg className="w-3.5 h-3.5 opacity-80" style={{ color: color }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                            <span className={`font-sans text-[10px] sm:text-[11px] font-medium ${
                              isLight ? 'text-neutral-600' : 'text-[#A4ACA1]'
                            }`}>
                              {tier.turnaroundLabel}
                            </span>
                          </div>
                        </div>

                        <div className="mt-auto w-full pt-3">
                          <div 
                            className={`w-full py-2.5 text-center text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-300 border rounded-sm ${
                              isLight
                                ? (isSelected ? 'bg-[#2D9A46] text-white border-[#2D9A46] shadow-sm' : 'border-[#2D9A46] text-[#2D9A46] hover:bg-[#2D9A46]/10')
                                : (isSelected ? 'bg-[#48C765] text-black border-[#48C765]' : 'border-[currentColor] hover:bg-white/5')
                            }`}
                            style={!isLight ? (isSelected ? { backgroundColor: color, borderColor: color, color: '#000' } : { borderColor: color, color: color, boxShadow: `inset 0 0 20px ${color}00` }) : {}}
                          >
                            {isSelected ? (language === 'es' ? 'SELECCIONADO' : 'SELECTED') : (language === 'es' ? 'ELEGIR' : 'SELECT')}
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>

            <div className={`mt-8 p-5 rounded-r-lg shadow-sm border-l-4 ${
              isLight 
                ? 'bg-white border border-[#E5DEC9] border-l-[#2D9A46]' 
                : 'bg-[#454545] border border-white/[0.06] border-l-[#48C765] shadow-lg'
            }`}>
              <p className={`font-sans text-sm ${isLight ? 'text-[#3E453E]' : 'text-[#A2B5A5]'}`}>
                <strong className={`font-semibold ${isLight ? 'text-[#1C201D]' : 'text-white'}`}>
                  {language === 'es' ? 'Valor declarado. ' : 'Declared value. '}
                </strong>
                {language === 'es' 
                  ? 'Cada nivel tiene un tope de valor por carta. Si alguna lo supera, tendrás que subirla al servicio siguiente; es lo que determina la cobertura del seguro.'
                  : 'Each tier has a maximum value limit per card. If a card exceeds this, it must be bumped to the next tier.'}
              </p>
            </div>
          </div>
        )}

        {/* ==============================================================
            STEP 2: CARTAS
        ============================================================== */}
        {currentStep === 2 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className={`font-['Oswald'] text-xl uppercase tracking-wide mb-2 ${isLight ? 'text-[#1C201D]' : 'text-white'}`}>
              {language === 'es' ? 'Suma tus cartas' : 'Add your cards'}
            </h2>
            <p className={`text-xs font-sans mb-8 ${isLight ? 'text-[#656E63]' : 'text-[#A4ACA1]'}`}>
              {language === 'es' 
                ? 'Agrega una foto o escribe el nombre y valor de cada carta. Podrás añadir más después.'
                : 'Add a photo or type the name and value of each card.'}
            </p>

            {/* Professional Mini-Form */}
            <form onSubmit={handleAddCard} className={`w-full p-6 mb-8 flex flex-col gap-6 rounded-xl border ${
              isLight ? 'bg-white border-[#E5DEC9] shadow-sm' : 'bg-[#383838] border-[#2A2E2A] shadow-inner'
            }`}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                
                {/* TCG / Collection */}
                <div className="flex flex-col gap-1">
                  <label className={`text-[10px] uppercase font-mono tracking-widest ${isLight ? 'text-[#6B7268]' : 'text-[#A4ACA1]'}`}>
                    {language === 'es' ? 'Colección / TCG' : 'TCG / Collection'}
                  </label>
                  <select 
                    value={newCardGame}
                    onChange={e => setNewCardGame(e.target.value)}
                    className={`w-full px-3 py-2 text-sm rounded-none transition-colors focus:outline-none ${
                      isLight 
                        ? 'bg-[#FAF7F2] border border-[#DCD5C3] text-[#1C201D] focus:border-[#2D9A46] focus:bg-white' 
                        : 'bg-[#2B302B] border border-white/5 text-white focus:border-[#48C765]'
                    }`}
                  >
                    <option value="Pokemon">Pokémon TCG</option>
                    <option value="Magic">Magic: The Gathering</option>
                    <option value="Yu-Gi-Oh!">Yu-Gi-Oh!</option>
                    <option value="Sports">Sports Cards</option>
                    <option value="One Piece">One Piece TCG</option>
                    <option value="Lorcana">Disney Lorcana</option>
                    <option value="Other">Other / Misc</option>
                  </select>
                </div>

                {/* Year */}
                <div className="flex flex-col gap-1">
                  <label className={`text-[10px] uppercase font-mono tracking-widest ${isLight ? 'text-[#6B7268]' : 'text-[#A4ACA1]'}`}>
                    {language === 'es' ? 'Año' : 'Year'}
                  </label>
                  <input 
                    type="number" 
                    placeholder="e.g. 1999" 
                    value={newCardYear}
                    onChange={e => setNewCardYear(e.target.value)}
                    className={`w-full px-3 py-2 text-sm rounded-none transition-colors focus:outline-none ${
                      isLight 
                        ? 'bg-[#FAF7F2] border border-[#DCD5C3] text-[#1C201D] placeholder:text-[#9A9E96] focus:border-[#2D9A46] focus:bg-white' 
                        : 'bg-[#2B302B] border border-white/5 text-white focus:border-[#48C765]'
                    }`}
                  />
                </div>

                {/* Set / Edition */}
                <div className="flex flex-col gap-1 lg:col-span-2">
                  <label className={`text-[10px] uppercase font-mono tracking-widest ${isLight ? 'text-[#6B7268]' : 'text-[#A4ACA1]'}`}>
                    {language === 'es' ? 'Nombre del Set / Expansión' : 'Set / Expansion Name'}
                  </label>
                  <input 
                    type="text" 
                    placeholder="e.g. Base Set" 
                    value={newCardSet}
                    onChange={e => setNewCardSet(e.target.value)}
                    className={`w-full px-3 py-2 text-sm rounded-none transition-colors focus:outline-none ${
                      isLight 
                        ? 'bg-[#FAF7F2] border border-[#DCD5C3] text-[#1C201D] placeholder:text-[#9A9E96] focus:border-[#2D9A46] focus:bg-white' 
                        : 'bg-[#2B302B] border border-white/5 text-white focus:border-[#48C765]'
                    }`}
                  />
                </div>

                {/* Card Name */}
                <div className="flex flex-col gap-1 lg:col-span-2">
                  <label className={`text-[10px] uppercase font-mono tracking-widest ${isLight ? 'text-[#6B7268]' : 'text-[#A4ACA1]'}`}>
                    {language === 'es' ? 'Nombre de la carta' : 'Card Name'}
                  </label>
                  <input 
                    type="text" 
                    placeholder="e.g. Charizard Holo 1st Edition" 
                    value={newCardName}
                    onChange={e => setNewCardName(e.target.value)}
                    className={`w-full px-3 py-2 text-sm rounded-none transition-colors focus:outline-none ${
                      isLight 
                        ? 'bg-[#FAF7F2] border border-[#DCD5C3] text-[#1C201D] placeholder:text-[#9A9E96] focus:border-[#2D9A46] focus:bg-white' 
                        : 'bg-[#2B302B] border border-white/5 text-white focus:border-[#48C765]'
                    }`}
                    required
                  />
                </div>

                {/* Rarity / Variant */}
                <div className="flex flex-col gap-1">
                  <label className={`text-[10px] uppercase font-mono tracking-widest ${isLight ? 'text-[#6B7268]' : 'text-[#A4ACA1]'}`}>
                    {language === 'es' ? 'Rareza / Variante' : 'Rarity / Variant'}
                  </label>
                  <input 
                    type="text" 
                    placeholder="e.g. Secret Rare, Holo" 
                    value={newCardRarity}
                    onChange={e => setNewCardRarity(e.target.value)}
                    className={`w-full px-3 py-2 text-sm rounded-none transition-colors focus:outline-none ${
                      isLight 
                        ? 'bg-[#FAF7F2] border border-[#DCD5C3] text-[#1C201D] placeholder:text-[#9A9E96] focus:border-[#2D9A46] focus:bg-white' 
                        : 'bg-[#2B302B] border border-white/5 text-white focus:border-[#48C765]'
                    }`}
                  />
                </div>

                {/* Quantity */}
                <div className="flex flex-col gap-1">
                  <label className={`text-[10px] uppercase font-mono tracking-widest ${isLight ? 'text-[#6B7268]' : 'text-[#A4ACA1]'}`}>
                    {language === 'es' ? 'Cantidad' : 'Quantity'}
                  </label>
                  <input 
                    type="number" 
                    min="1"
                    placeholder="1" 
                    value={newCardQuantity}
                    onChange={e => setNewCardQuantity(e.target.value)}
                    className={`w-full px-3 py-2 text-sm rounded-none transition-colors focus:outline-none ${
                      isLight 
                        ? 'bg-[#FAF7F2] border border-[#DCD5C3] text-[#1C201D] focus:border-[#2D9A46] focus:bg-white' 
                        : 'bg-[#2B302B] border border-white/5 text-white focus:border-[#48C765]'
                    }`}
                  />
                </div>

                {/* Declared Value */}
                <div className="flex flex-col gap-1">
                  <label className={`text-[10px] uppercase font-mono tracking-widest ${isLight ? 'text-[#6B7268]' : 'text-[#A4ACA1]'}`}>
                    {language === 'es' ? 'Valor Declarado ud. (€)' : 'Declared Value ea. (€)'}
                  </label>
                  <div className="relative">
                    <span className={`absolute left-3 top-2 text-sm ${isLight ? 'text-[#6B7268]' : 'text-[#A4ACA1]'}`}>€</span>
                    <input 
                      type="number" 
                      placeholder="e.g. 500" 
                      value={newDeclaredValue}
                      onChange={e => setNewDeclaredValue(e.target.value)}
                      className={`w-full pl-7 pr-3 py-2 text-sm rounded-none transition-colors focus:outline-none ${
                        isLight 
                          ? 'bg-[#FAF7F2] border border-[#DCD5C3] text-[#1C201D] placeholder:text-[#9A9E96] focus:border-[#2D9A46] focus:bg-white' 
                          : 'bg-[#2B302B] border border-white/5 text-white focus:border-[#48C765]'
                      }`}
                      required
                    />
                  </div>
                </div>

              </div>
              
              <div className={`flex justify-end pt-3 border-t mt-2 ${isLight ? 'border-[#E5DEC9]' : 'border-white/5'}`}>
                <button 
                  type="submit" 
                  className={`px-6 py-2.5 text-xs font-bold uppercase tracking-widest transition-all flex items-center gap-2 rounded-sm ${
                    isLight 
                      ? 'bg-[#2D9A46] hover:bg-[#25823a] text-white shadow-md shadow-[#2D9A46]/20' 
                      : 'bg-[#48C765] hover:bg-[#3ca352] text-black'
                  }`}
                >
                  <Plus className="w-4 h-4" />
                  {language === 'es' ? 'Añadir a la orden' : 'Add to Order'}
                </button>
              </div>
            </form>

            {/* Horizontal Card Gallery */}
            {items.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {items.map((item, idx) => (
                  <div 
                    key={item.id} 
                    className={`rounded-xl p-3 flex flex-col justify-between relative group h-28 border transition-all ${
                      isLight 
                        ? 'bg-white border-[#E5DEC9] shadow-sm' 
                        : 'bg-[#454545] border-[#2A2E2A]'
                    }`}
                  >
                    <div className={`text-xs font-semibold truncate pr-6 ${isLight ? 'text-[#1C201D]' : 'text-white'}`}>
                      {item.cardName}
                    </div>
                    <div className={`text-[10px] font-mono mt-auto ${isLight ? 'text-[#656E63]' : 'text-[#A4ACA1]'}`}>
                      ID: GG-{1000 + idx}
                      <br/>€{item.declaredValue}
                    </div>
                    <button 
                      onClick={() => handleRemoveCard(item.id)}
                      className={`absolute bottom-3 right-3 transition-colors ${
                        isLight ? 'text-[#8A9388] hover:text-red-500' : 'text-[#A4ACA1] hover:text-red-400'
                      }`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
            
            {items.length === 0 && (
              <div className={`text-center font-mono text-[10px] uppercase tracking-widest mt-8 ${
                isLight ? 'text-[#8A9388]' : 'text-[#A4ACA1]'
              }`}>
                {language === 'es' ? 'AÚN NO HAS AÑADIDO CARTAS' : 'NO CARDS ADDED YET'}
              </div>
            )}
          </div>
        )}

        {/* ==============================================================
            STEP 3: DATOS
        ============================================================== */}
        {currentStep === 3 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className={`font-['Oswald'] text-xl uppercase tracking-wide mb-2 ${isLight ? 'text-[#1C201D]' : 'text-white'}`}>
              {language === 'es' ? 'Tus Datos de Envío' : 'Your Shipping Details'}
            </h2>
            <p className={`text-xs font-sans mb-8 ${isLight ? 'text-[#656E63]' : 'text-[#A4ACA1]'}`}>
              {language === 'es' 
                ? 'Introduce tus datos para que el servicio de mensajería blindada recoja tus cartas.'
                : 'Enter your details for the armored courier pickup.'}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input 
                type="text" 
                placeholder={language === 'es' ? 'Nombre Completo' : 'Full Name'} 
                className={`w-full p-4 rounded-xl text-sm focus:outline-none transition-colors border ${
                  isLight 
                    ? 'bg-white border-[#DCD5C3] text-[#1C201D] placeholder:text-[#9A9E96] focus:border-[#2D9A46]' 
                    : 'bg-[#454545] border-[#2A2E2A] text-white focus:border-[#48C765]'
                }`} 
              />
              <input 
                type="email" 
                placeholder={language === 'es' ? 'Correo Electrónico' : 'Email Address'} 
                className={`w-full p-4 rounded-xl text-sm focus:outline-none transition-colors border ${
                  isLight 
                    ? 'bg-white border-[#DCD5C3] text-[#1C201D] placeholder:text-[#9A9E96] focus:border-[#2D9A46]' 
                    : 'bg-[#454545] border-[#2A2E2A] text-white focus:border-[#48C765]'
                }`} 
              />
              <input 
                type="text" 
                placeholder={language === 'es' ? 'Dirección' : 'Street Address'} 
                className={`w-full p-4 rounded-xl text-sm focus:outline-none transition-colors border md:col-span-2 ${
                  isLight 
                    ? 'bg-white border-[#DCD5C3] text-[#1C201D] placeholder:text-[#9A9E96] focus:border-[#2D9A46]' 
                    : 'bg-[#454545] border-[#2A2E2A] text-white focus:border-[#48C765]'
                }`} 
              />
              <input 
                type="text" 
                placeholder={language === 'es' ? 'Ciudad' : 'City'} 
                className={`w-full p-4 rounded-xl text-sm focus:outline-none transition-colors border ${
                  isLight 
                    ? 'bg-white border-[#DCD5C3] text-[#1C201D] placeholder:text-[#9A9E96] focus:border-[#2D9A46]' 
                    : 'bg-[#454545] border-[#2A2E2A] text-white focus:border-[#48C765]'
                }`} 
              />
              <input 
                type="text" 
                placeholder={language === 'es' ? 'Código Postal' : 'Postal Code'} 
                className={`w-full p-4 rounded-xl text-sm focus:outline-none transition-colors border ${
                  isLight 
                    ? 'bg-white border-[#DCD5C3] text-[#1C201D] placeholder:text-[#9A9E96] focus:border-[#2D9A46]' 
                    : 'bg-[#454545] border-[#2A2E2A] text-white focus:border-[#48C765]'
                }`} 
              />
            </div>
          </div>
        )}

        {/* ==============================================================
            STEP 4: RESUMEN
        ============================================================== */}
        {currentStep === 4 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className={`font-['Oswald'] text-xl uppercase tracking-wide mb-2 ${isLight ? 'text-[#1C201D]' : 'text-white'}`}>
              {language === 'es' ? 'Resumen Final' : 'Final Review'}
            </h2>
            <p className={`text-xs font-sans mb-8 ${isLight ? 'text-[#656E63]' : 'text-[#A4ACA1]'}`}>
              {language === 'es' 
                ? 'Comprueba que todo esté correcto. Al confirmar, emitiremos tu etiqueta de envío encriptada.'
                : 'Verify all details. Upon confirmation, your encrypted shipping label will be issued.'}
            </p>

            <div className={`rounded-xl p-6 font-mono text-sm space-y-4 border ${
              isLight 
                ? 'bg-white border-[#E5DEC9] shadow-sm text-[#1C201D]' 
                : 'bg-[#454545] border-[#2A2E2A] text-white'
            }`}>
              <div className={`flex justify-between pb-3 border-b ${isLight ? 'border-[#E5DEC9]' : 'border-[#2A2E2A]'}`}>
                <span className={isLight ? 'text-[#656E63]' : 'text-white'}>{language === 'es' ? 'Servicio Seleccionado' : 'Selected Service'}</span>
                <span className={`font-bold ${isLight ? 'text-[#2D9A46]' : 'text-[#48C765]'}`}>{selectedTier?.name || ''}</span>
              </div>
              <div className={`flex justify-between pb-3 border-b ${isLight ? 'border-[#E5DEC9]' : 'border-[#2A2E2A]'}`}>
                <span className={isLight ? 'text-[#656E63]' : 'text-white'}>{language === 'es' ? 'Total de Cartas' : 'Total Cards'}</span>
                <span className="font-bold">{items.length}</span>
              </div>
              <div className={`flex justify-between pb-3 border-b ${isLight ? 'border-[#E5DEC9]' : 'border-[#2A2E2A]'}`}>
                <span className={isLight ? 'text-[#656E63]' : 'text-white'}>{language === 'es' ? 'Valor Declarado Total' : 'Total Declared Value'}</span>
                <span className="font-bold">€{totalDeclaredValue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-2">
                <span>TOTAL APROX.</span>
                <span className={isLight ? 'text-[#2D9A46]' : 'text-[#48C765]'}>€{totalEstimatedCost.toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}

        {/* ==============================================================
            BOTTOM NAVIGATION BAR
        ============================================================== */}
        <div className={`mt-16 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-6 border-t ${
          isLight ? 'border-[#E5DEC9]' : 'border-[#2A2E2A]'
        }`}>
          {currentStep > 1 ? (
            <button
              onClick={() => setCurrentStep((currentStep - 1) as any)}
              className={`w-full sm:w-auto px-6 sm:px-8 py-3.5 rounded text-[11px] sm:text-xs font-bold tracking-widest uppercase transition-colors border ${
                isLight 
                  ? 'bg-white hover:bg-[#FAF7F2] text-[#1C201D] border-[#DCD5C3]' 
                  : 'bg-[#454545] hover:bg-[#1A221C] text-white border-[#2A2E2A]'
              }`}
            >
              {language === 'es' ? 'ATRÁS' : 'BACK'}
            </button>
          ) : <div className="hidden sm:block" />}
          
          {currentStep > 1 && (
            <button
              onClick={() => {
                if (currentStep === 2 && items.length > 0) setCurrentStep(3);
                else if (currentStep === 2 && items.length === 0) alert(language === 'es' ? 'Añade al menos una carta' : 'Add at least one card');
                else if (currentStep === 3) setCurrentStep(4);
                else if (currentStep === 4) handleFinalSubmit();
              }}
              className={`w-full sm:w-auto px-6 sm:px-10 py-3.5 rounded text-[11px] sm:text-xs font-bold tracking-widest uppercase transition-colors flex items-center justify-center gap-2 sm:gap-4 ${
                isLight 
                  ? 'bg-[#2D9A46] hover:bg-[#25823a] text-white shadow-lg shadow-[#2D9A46]/20' 
                  : 'bg-[#3A9F50] hover:bg-[#48C765] text-black shadow-lg shadow-[#48C765]/10'
              }`}
            >
              <span>{language === 'es' ? (currentStep === 4 ? 'ENVIAR PEDIDO' : 'CONTINUAR') : (currentStep === 4 ? 'SUBMIT ORDER' : 'CONTINUE')}</span>
              
              {/* Show dynamic total price on the button */}
              {items.length > 0 && currentStep > 1 && (
                <span className={`px-2 py-0.5 rounded-none shrink-0 truncate ${
                  isLight ? 'bg-white/20 text-white' : 'bg-black/20 text-black'
                }`}>
                  €{totalEstimatedCost.toFixed(2)}
                </span>
              )}
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
