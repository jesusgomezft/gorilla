import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { MOCK_SERVICES } from '../data/mockServices';
import { OrderItem, ServiceTier } from '../types';
import { Plus, Trash2, CheckCircle2 } from 'lucide-react';

interface SubmissionWizardPageProps {
  onNavigate: (path: string) => void;
}

export const SubmissionWizardPage: React.FC<SubmissionWizardPageProps> = ({ onNavigate }) => {
  const { language } = useLanguage();
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('tier') ? 2 : 1;
  });
  const [selectedTier, setSelectedTier] = useState<ServiceTier>(() => {
    const params = new URLSearchParams(window.location.search);
    const tierId = params.get('tier');
    if (tierId) {
      const found = MOCK_SERVICES.find(s => s.id === tierId);
      if (found) return found;
    }
    return MOCK_SERVICES[0];
  }); 
  
  const [items, setItems] = useState<OrderItem[]>([]);
  const [newCardName, setNewCardName] = useState('');
  const [newDeclaredValue, setNewDeclaredValue] = useState('');

  const [shippingMethod, setShippingMethod] = useState<'COURIER_INSURED' | 'CARD_SHOW_DROPOFF'>('COURIER_INSURED');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [generatedSubmissionId, setGeneratedSubmissionId] = useState('');

  // Totals Calculation
  const subtotalGrading = items.length * selectedTier.priceEur;
  const totalDeclaredValue = items.reduce((sum, item) => sum + (Number(item.declaredValue) || 0), 0);
  const insuranceFee = Math.max(8.00, totalDeclaredValue * 0.008);
  const shippingFee = shippingMethod === 'CARD_SHOW_DROPOFF' ? 0.00 : 14.50;
  const totalEstimatedCost = subtotalGrading + (shippingMethod === 'COURIER_INSURED' ? insuranceFee + shippingFee : 0);

  const handleAddCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCardName.trim()) return;

    const newItem: OrderItem = {
      id: `item-${Date.now()}`,
      cardName: newCardName,
      game: 'Mixed',
      set: 'Unknown',
      declaredValue: Number(newDeclaredValue) || 100,
      serviceTierId: selectedTier.id,
      notes: '',
      frontImagePreview: 'https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?auto=format&fit=crop&w=400&q=80'
    };

    setItems([...items, newItem]);
    setNewCardName('');
    setNewDeclaredValue('');
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
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <div className="w-20 h-20 rounded-none bg-[#48C765]/20 text-[#48C765] border border-[#48C765]/50 flex items-center justify-center mx-auto mb-8">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h1 className="text-lg font-['Oswald'] text-white uppercase tracking-wide mb-4">
          {language === 'es' ? 'Pedido Confirmado' : 'Order Confirmed'}
        </h1>
        <p className="text-[#A4ACA1] mb-8 font-sans">
          {language === 'es' 
            ? `Tu número de envío es #${generatedSubmissionId}. Recibirás las etiquetas por correo electrónico en breve.`
            : `Your submission ID is #${generatedSubmissionId}. You will receive shipping labels via email shortly.`}
        </p>
        <button
          onClick={() => onNavigate('/')}
          className="bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-none font-mono text-xs uppercase tracking-widest border border-white/20 transition-all"
        >
          {language === 'es' ? 'VOLVER AL INICIO' : 'BACK TO HOME'}
        </button>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#454545] text-white pt-24 pb-32">
      <div className="max-w-[1000px] mx-auto px-6 lg:px-12">
        
        {/* Breadcrumb & Header */}
        <div className="mb-6 font-mono text-[10px] text-[#A4ACA1] uppercase tracking-widest flex items-center gap-2">
          <span className="hover:text-white cursor-pointer transition-colors" onClick={() => onNavigate('/')}>
            {language === 'es' ? 'INICIO' : 'HOME'}
          </span> 
          <span>/</span> 
          <span className="text-white">{language === 'es' ? 'ENVIAR CARTAS' : 'SUBMIT CARDS'}</span>
        </div>

        <h1 className="font-['Oswald'] text-lg text-white uppercase tracking-wide mb-3">
          {language === 'es' ? 'Centro de envíos' : 'Submission Center'}
        </h1>
        <p className="font-sans text-sm text-[#A4ACA1] max-w-xl mb-12">
          {language === 'es'
            ? 'Configura tu pedido en cuatro pasos. Al terminar recibirás el albarán y la etiqueta de transporte por correo. Nada se cobra hasta que las cartas llegan y se verifican.'
            : 'Configure your order in four steps. Once finished, you will receive your packing slip and transport label by email. Nothing is charged until your cards arrive and are verified.'}
        </p>

        {/* Minimalist Horizontal Step Indicator */}
        <div className="flex w-full border border-[#2A2E2A] rounded bg-[#2B302B] mb-12">
          {stepsList.map((step) => {
            const isCurrent = currentStep === step.num;
            const isPast = currentStep > step.num;
            return (
              <div 
                key={step.num}
                onClick={() => isPast && setCurrentStep(step.num as any)}
                className={`flex-1 p-3 sm:px-6 sm:py-4 border-r border-[#2A2E2A] last:border-r-0 transition-all ${isPast ? 'cursor-pointer hover:bg-white/[0.05]' : ''} ${isCurrent ? 'bg-black/20 border-b-2 border-b-[#48C765]' : ''}`}
              >
                <div className="flex flex-col">
                  <span className={`font-mono text-[11px] font-bold ${isCurrent ? 'text-[#48C765]' : isPast ? 'text-white' : 'text-[#A4ACA1]'}`}>
                    0{step.num}
                  </span>
                  <span className={`font-mono text-[10px] uppercase tracking-widest mt-1 ${isCurrent ? 'text-white' : 'text-[#A4ACA1]'}`}>
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
            <h2 className="font-['Oswald'] text-lg uppercase tracking-wide mb-2">
              {language === 'es' ? 'Elige el servicio' : 'Select Service'}
            </h2>
            <p className="text-xs text-[#A4ACA1] font-sans mb-8">
              {language === 'es' 
                ? 'El plazo cuenta desde que las cartas entran en nuestro sistema, no desde que las envías.'
                : 'Turnaround starts when cards enter our system, not when shipped.'}
            </p>

            <div className="flex flex-col bg-[#454545] border border-white/[0.06] rounded-none overflow-hidden shadow-2xl">
              {MOCK_SERVICES.map((tier) => {
                const isSelected = selectedTier.id === tier.id;
                
                let color = '#48C765';
                let shortName = 'TIER';
                switch(tier.id) {
                  case 'standard': color = '#48C765'; shortName = 'STANDARD'; break;
                  case 'express': color = '#F97316'; shortName = 'EXPRESS'; break;
                  case 'walkthrough': color = '#D4AF37'; shortName = 'MASTER'; break;
                  default: color = '#8CA5B8'; shortName = 'REGULAR';
                }

                return (
                  <div
                    key={tier.id}
                    onClick={() => setSelectedTier(tier)}
                    className={`group flex flex-col p-6 sm:px-8 sm:py-7 cursor-pointer transition-all duration-500 relative border-b border-white/[0.04] last:border-b-0 overflow-hidden ${
                      isSelected ? 'border-white/10' : 'hover:bg-white/[0.01]'
                    }`}
                    style={isSelected ? {
                      background: `linear-gradient(160deg, #161A17 0%, #0A0D0B 100%)`,
                      borderColor: `${color}40`,
                    } : {}}
                  >
                    <div className={`absolute left-0 top-0 bottom-0 w-[4px] transition-colors duration-300 z-30 ${isSelected ? 'opacity-100' : 'opacity-0'}`} style={{ backgroundColor: color }} />

                    {/* Ticket Styling Overlays (Only visible when selected) */}
                    <div className={`absolute inset-0 transition-opacity duration-700 pointer-events-none ${isSelected ? 'opacity-100' : 'opacity-0'}`}>
                      {/* Massive Typography Watermark */}
                      <div 
                        className="absolute -right-4 -bottom-10 text-[100px] font-black opacity-[0.03] select-none tracking-tighter leading-none whitespace-nowrap font-['Oswald']" 
                        style={{ color: color }}
                      >
                        {shortName}
                      </div>

                      {/* Glowing Orb */}
                      <div 
                        className="absolute top-0 right-0 w-[200px] h-[200px] blur-[60px] rounded-full opacity-20 translate-x-1/3 -translate-y-1/3"
                        style={{ backgroundColor: color }}
                      />

                      {/* Noise Texture */}
                      <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-20 mix-blend-overlay z-0" />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start relative z-10">
                      <div className="mt-1 shrink-0 relative z-10">
                        <div className={`w-5 h-5 rounded-full border transition-all duration-300 flex items-center justify-center ${
                          isSelected ? 'border-transparent' : 'border-[#5B6154]'
                        }`} style={isSelected ? { borderColor: color } : {}}>
                          <div className={`w-2.5 h-2.5 rounded-full transition-transform duration-300 ${isSelected ? 'scale-100' : 'scale-0'}`} style={{ backgroundColor: color }} />
                        </div>
                      </div>

                      <div className="flex-1 w-full relative z-10">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className={`font-['Oswald'] text-lg uppercase tracking-wide transition-colors ${isSelected ? 'text-white' : 'text-[#C2C9C3]'}`}>
                            {tier.name}
                          </h3>
                          <div className="flex items-baseline gap-1">
                            <span className={`font-['Oswald'] font-[700] text-lg transition-colors ${isSelected ? '' : 'text-[#A4ACA1]'}`} style={isSelected ? { color: color } : {}}>
                              {tier.priceEur}
                            </span>
                            <span className="font-mono text-sm text-[#8A9388]">€</span>
                          </div>
                        </div>

                        <p className="text-sm text-[#A4ACA1] font-sans mb-3">
                          {tier.tagline}
                        </p>

                        <div className="flex items-center gap-2 font-mono text-[11px] text-[#A4ACA1] uppercase tracking-wider">
                          <span className={isSelected ? 'text-white' : ''}>{tier.turnaroundLabel}</span>
                          <span className="w-1 h-1 rounded-none bg-[#5B6154] mx-1" />
                          <span>hasta €{tier.maxDeclaredValueEur.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 bg-[#454545] border border-white/[0.06] border-l-4 border-l-[#48C765] p-5 rounded-r-lg shadow-lg">
              <p className="font-sans text-sm text-[#A2B5A5]">
                <strong className="text-white font-semibold">{language === 'es' ? 'Valor declarado. ' : 'Declared value. '}</strong>
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
            <h2 className="font-['Oswald'] text-lg uppercase tracking-wide mb-2">
              {language === 'es' ? 'Suma tus cartas' : 'Add your cards'}
            </h2>
            <p className="text-xs text-[#A4ACA1] font-sans mb-8">
              {language === 'es' 
                ? 'Agrega una foto o escribe el nombre y valor de cada carta. Podrás añadir más después.'
                : 'Add a photo or type the name and value of each card.'}
            </p>

            {/* Huge Dropzone */}
            <form onSubmit={handleAddCard} className="w-full h-64 border-2 border-dashed border-[#2A2E2A] bg-[#454545]/50 hover:bg-[#151D17]/50 hover:border-[#48C765]/50 transition-all rounded-none flex flex-col items-center justify-center mb-8 cursor-pointer group">
              <div className="w-12 h-12 rounded-none border border-[#48C765]/50 text-[#48C765] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Plus className="w-6 h-6" />
              </div>
              <div className="text-center font-sans space-y-1">
                <p className="text-sm font-semibold text-white">
                  {language === 'es' ? 'Arrastra tus fotos acá, o haz clic para añadir datos' : 'Drag photos here, or click to add details'}
                </p>
                <p className="text-[10px] font-mono text-[#A4ACA1] uppercase tracking-widest">
                  JPG o PNG • Máx. 20 MB
                </p>
              </div>

              {/* Invisible inputs just to allow typing for demo if they click the area (Normally this would open a modal) */}
              <div className="mt-6 flex flex-wrap justify-center gap-3 w-3/4 opacity-0 group-hover:opacity-100 transition-opacity">
                 <input 
                  type="text" 
                  placeholder="Card Name (e.g. Charizard)" 
                  value={newCardName}
                  onChange={e => setNewCardName(e.target.value)}
                  className="px-3 py-1 bg-[#454545]/50 border border-white/10 rounded text-xs text-white"
                  onClick={e => e.stopPropagation()}
                 />
                 <input 
                  type="number" 
                  placeholder="Value (€)" 
                  value={newDeclaredValue}
                  onChange={e => setNewDeclaredValue(e.target.value)}
                  className="px-3 py-1 bg-[#454545]/50 border border-white/10 rounded text-xs text-white w-24"
                  onClick={e => e.stopPropagation()}
                 />
                 <button type="submit" onClick={e => e.stopPropagation()} className="px-4 py-1 bg-[#48C765] text-black text-xs font-bold rounded">Add</button>
              </div>
            </form>

            {/* Horizontal Card Gallery */}
            {items.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {items.map((item, idx) => (
                  <div key={item.id} className="bg-[#454545] border border-[#2A2E2A] rounded-none p-3 flex flex-col justify-between relative group h-28">
                    <div className="text-xs text-white font-semibold truncate pr-6">{item.cardName}</div>
                    <div className="text-[10px] text-[#A4ACA1] font-mono mt-auto">
                      ID: GG-{1000 + idx}
                      <br/>€{item.declaredValue}
                    </div>
                    <button 
                      onClick={() => handleRemoveCard(item.id)}
                      className="absolute bottom-3 right-3 text-[#A4ACA1] hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
            
            {items.length === 0 && (
              <div className="text-center font-mono text-[10px] text-[#A4ACA1] uppercase tracking-widest mt-8">
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
            <h2 className="font-['Oswald'] text-lg uppercase tracking-wide mb-2">
              {language === 'es' ? 'Tus Datos de Envío' : 'Your Shipping Details'}
            </h2>
            <p className="text-xs text-[#A4ACA1] font-sans mb-8">
              {language === 'es' 
                ? 'Introduce tus datos para que el servicio de mensajería blindada recoja tus cartas.'
                : 'Enter your details for the armored courier pickup.'}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder={language === 'es' ? 'Nombre Completo' : 'Full Name'} className="w-full p-4 bg-[#454545] border border-[#2A2E2A] rounded-none text-sm text-white focus:outline-none focus:border-[#48C765] transition-colors" />
              <input type="email" placeholder={language === 'es' ? 'Correo Electrónico' : 'Email Address'} className="w-full p-4 bg-[#454545] border border-[#2A2E2A] rounded-none text-sm text-white focus:outline-none focus:border-[#48C765] transition-colors" />
              <input type="text" placeholder={language === 'es' ? 'Dirección' : 'Street Address'} className="w-full p-4 bg-[#454545] border border-[#2A2E2A] rounded-none text-sm text-white focus:outline-none focus:border-[#48C765] transition-colors md:col-span-2" />
              <input type="text" placeholder={language === 'es' ? 'Ciudad' : 'City'} className="w-full p-4 bg-[#454545] border border-[#2A2E2A] rounded-none text-sm text-white focus:outline-none focus:border-[#48C765] transition-colors" />
              <input type="text" placeholder={language === 'es' ? 'Código Postal' : 'Postal Code'} className="w-full p-4 bg-[#454545] border border-[#2A2E2A] rounded-none text-sm text-white focus:outline-none focus:border-[#48C765] transition-colors" />
            </div>
          </div>
        )}

        {/* ==============================================================
            STEP 4: RESUMEN
        ============================================================== */}
        {currentStep === 4 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="font-['Oswald'] text-lg uppercase tracking-wide mb-2">
              {language === 'es' ? 'Resumen Final' : 'Final Review'}
            </h2>
            <p className="text-xs text-[#A4ACA1] font-sans mb-8">
              {language === 'es' 
                ? 'Comprueba que todo esté correcto. Al confirmar, emitiremos tu etiqueta de envío encriptada.'
                : 'Verify all details. Upon confirmation, your encrypted shipping label will be issued.'}
            </p>

            <div className="bg-[#454545] border border-[#2A2E2A] rounded-none p-6 font-mono text-sm space-y-4">
              <div className="flex justify-between border-b border-[#2A2E2A] pb-3 text-white">
                <span>{language === 'es' ? 'Servicio Seleccionado' : 'Selected Service'}</span>
                <span className="text-[#48C765] font-bold">{selectedTier.name}</span>
              </div>
              <div className="flex justify-between border-b border-[#2A2E2A] pb-3 text-white">
                <span>{language === 'es' ? 'Total de Cartas' : 'Total Cards'}</span>
                <span>{items.length}</span>
              </div>
              <div className="flex justify-between border-b border-[#2A2E2A] pb-3 text-white">
                <span>{language === 'es' ? 'Valor Declarado Total' : 'Total Declared Value'}</span>
                <span>€{totalDeclaredValue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-white font-bold text-lg pt-2">
                <span>TOTAL APROX.</span>
                <span className="text-[#48C765]">€{totalEstimatedCost.toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}

        {/* ==============================================================
            BOTTOM NAVIGATION BAR
        ============================================================== */}
        <div className="mt-16 flex items-center justify-between pt-6 border-t border-[#2A2E2A]">
          {currentStep > 1 ? (
            <button
              onClick={() => setCurrentStep((currentStep - 1) as any)}
              className="bg-[#454545] hover:bg-[#1A221C] text-white px-8 py-3.5 rounded text-xs font-bold tracking-widest uppercase transition-colors border border-[#2A2E2A]"
            >
              {language === 'es' ? 'ATRÁS' : 'BACK'}
            </button>
          ) : <div />}
          
          <button
            onClick={() => {
              if (currentStep === 1) setCurrentStep(2);
              else if (currentStep === 2 && items.length > 0) setCurrentStep(3);
              else if (currentStep === 2 && items.length === 0) alert(language === 'es' ? 'Añade al menos una carta' : 'Add at least one card');
              else if (currentStep === 3) setCurrentStep(4);
              else if (currentStep === 4) handleFinalSubmit();
            }}
            className="bg-[#3A9F50] hover:bg-[#48C765] text-black px-10 py-3.5 rounded text-xs font-bold tracking-widest uppercase transition-colors shadow-lg shadow-[#48C765]/10 flex items-center gap-4"
          >
            <span>{language === 'es' ? (currentStep === 4 ? 'ENVIAR PEDIDO' : 'CONTINUAR') : (currentStep === 4 ? 'SUBMIT ORDER' : 'CONTINUE')}</span>
            
            {/* Show dynamic total price on the button! Minimalist and out of the way */}
            {items.length > 0 && currentStep > 1 && (
              <span className="bg-[#454545]/20 px-2 py-0.5 rounded-none">€{totalEstimatedCost.toFixed(2)}</span>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
