import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ArrowLeft, Mail, Clock, ShieldCheck, HelpCircle, CheckCircle2, Send, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

interface ContactPageProps {
  onNavigate: (path: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const { language } = useLanguage();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('shipping');
  const [orderNumber, setOrderNumber] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !message.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setTicketId(`GG-TKT-${Math.floor(100000 + Math.random() * 900000)}`);
    }, 800);
  };

  const handleReset = () => {
    setFullName('');
    setEmail('');
    setSubject('shipping');
    setOrderNumber('');
    setMessage('');
    setIsSubmitted(false);
  };

  return (
    <div className="min-h-screen bg-[#454545] text-white pt-24 pb-24 px-6 lg:px-12 selection:bg-[#48C765] selection:text-black relative overflow-hidden flex flex-col">
      {/* Background glow effects */}
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-[#48C765]/[0.02] blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-white/[0.01] blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-[1240px] w-full mx-auto relative z-10">
        
        {/* Navigation back */}
        <button 
          onClick={() => onNavigate('/')}
          className="mb-10 text-[#A4ACA1] hover:text-white flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest transition-colors w-fit"
        >
          <ArrowLeft size={14} />
          {language === 'es' ? 'Volver al Inicio' : 'Back to Home'}
        </button>

        {/* Section Header */}
        <div className="flex flex-col mb-16 animate-fade-in-up">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-[1px] bg-[#48C765]"></span>
            <span className="font-mono text-[10px] font-bold tracking-[0.25em] text-[#48C765] uppercase">
              {language === 'es' ? 'CANAL DIRECTO & ATENCIÓN AL COLECCIONISTA' : 'DIRECT INQUIRY & COLLECTOR DESK'}
            </span>
          </div>

          <h1 className="font-['Oswald'] font-[700] text-4xl sm:text-5xl lg:text-6xl uppercase tracking-wide leading-[1.05] text-white mb-6">
            {language === 'es' ? 'Formulario de Contacto' : 'Contact & Inquiries'}
          </h1>

          <p className="font-sans text-sm sm:text-base text-[#A4ACA1] max-w-3xl leading-relaxed text-justify">
            {language === 'es'
              ? 'Nuestro equipo técnico y de atención especializada está a tu total disposición para resolver consultas sobre envíos en tránsito, verificación de autenticidad, solicitudes corporativas o el estado de tus órdenes en laboratorio. Cada mensaje es asignado a un especialista dedicado con una respuesta garantizada en menos de 24 horas hábiles.'
              : 'Our technical and collector care team is entirely at your disposal to answer questions regarding in-transit shipments, authenticity verification, corporate B2B requests, or current laboratory orders. Every ticket is routed to a dedicated specialist with guaranteed response within 24 business hours.'}
          </p>
        </div>

        {/* Main Grid: Form + Side Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Form (7 cols) */}
          <div className="lg:col-span-7 bg-[#2B302B] border border-white/[0.06] p-8 sm:p-10 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#48C765]/5 blur-3xl pointer-events-none" />

            {isSubmitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 rounded-full bg-[#48C765]/10 border border-[#48C765]/30 flex items-center justify-center text-[#48C765] mb-6 shadow-[0_0_25px_rgba(72,199,101,0.2)]">
                  <CheckCircle2 size={36} />
                </div>

                <span className="font-mono text-xs text-[#48C765] tracking-widest uppercase mb-2">
                  {language === 'es' ? 'TICKET REGISTRADO' : 'TICKET REGISTERED'}
                </span>

                <h3 className="font-['Oswald'] text-2xl sm:text-3xl text-white uppercase font-bold mb-4">
                  {language === 'es' ? '¡Mensaje Enviado con Éxito!' : 'Message Sent Successfully!'}
                </h3>

                <div className="bg-black/20 border border-white/10 px-4 py-2 mb-6 font-mono text-xs text-[#A4ACA1]">
                  <span>{language === 'es' ? 'REFERENCIA: ' : 'REFERENCE ID: '}</span>
                  <strong className="text-[#48C765]">{ticketId}</strong>
                </div>

                <p className="font-sans text-sm text-[#A4ACA1] max-w-md leading-relaxed text-justify mb-8">
                  {language === 'es'
                    ? 'Hemos recibido tus detalles y un técnico de nuestro laboratorio los revisará de inmediato. Te responderemos directamente a tu correo electrónico en un plazo máximo de 24 horas hábiles.'
                    : 'We have received your request and our laboratory specialists will review it immediately. We will respond directly to your email within 24 business hours.'}
                </p>

                <div className="flex flex-wrap items-center justify-center gap-4">
                  <button
                    onClick={handleReset}
                    className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white font-mono text-xs uppercase tracking-widest border border-white/15 transition-all"
                  >
                    {language === 'es' ? 'Enviar Otra Consulta' : 'Submit Another Inquiry'}
                  </button>
                  <button
                    onClick={() => onNavigate('/')}
                    className="px-6 py-3 bg-[#48C765] hover:bg-[#3A9F50] text-[#14170F] font-bold font-mono text-xs uppercase tracking-widest transition-all shadow-[0_0_15px_rgba(72,199,101,0.2)]"
                  >
                    {language === 'es' ? 'Ir al Inicio' : 'Return to Home'}
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="flex items-center gap-2 pb-4 border-b border-white/10">
                  <MessageSquare size={18} className="text-[#48C765]" />
                  <span className="font-mono text-xs tracking-wider uppercase text-white font-bold">
                    {language === 'es' ? 'Enviar una Consulta' : 'Submit an Inquiry'}
                  </span>
                </div>

                {/* Name & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-[11px] uppercase tracking-wider text-[#A4ACA1]">
                      {language === 'es' ? 'Nombre Completo *' : 'Full Name *'}
                    </label>
                    <input 
                      type="text" 
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder={language === 'es' ? 'Ej. Alejandro Torres' : 'e.g. John Doe'}
                      className="w-full bg-[#161B16] border border-white/10 focus:border-[#48C765]/60 px-4 py-3 text-white text-sm focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-[11px] uppercase tracking-wider text-[#A4ACA1]">
                      {language === 'es' ? 'Correo Electrónico *' : 'Email Address *'}
                    </label>
                    <input 
                      type="email" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="nombre@ejemplo.com"
                      className="w-full bg-[#161B16] border border-white/10 focus:border-[#48C765]/60 px-4 py-3 text-white text-sm focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Subject & Order ID Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-[11px] uppercase tracking-wider text-[#A4ACA1]">
                      {language === 'es' ? 'Motivo de Consulta *' : 'Topic *'}
                    </label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full bg-[#161B16] border border-white/10 focus:border-[#48C765]/60 px-4 py-3 text-white text-sm focus:outline-none transition-colors cursor-pointer"
                    >
                      <option value="shipping" className="bg-[#161B16] text-white">
                        {language === 'es' ? 'Envíos, Empaque & Seguimiento' : 'Shipping, Packing & Tracking'}
                      </option>
                      <option value="order" className="bg-[#161B16] text-white">
                        {language === 'es' ? 'Estado de Orden en Curso' : 'Existing Order Status'}
                      </option>
                      <option value="pricing" className="bg-[#161B16] text-white">
                        {language === 'es' ? 'Tarifas, Facturación & Lotes' : 'Pricing, Invoicing & Bulk Tiers'}
                      </option>
                      <option value="technical" className="bg-[#161B16] text-white">
                        {language === 'es' ? 'Tecnología Óptica & Criterios' : 'Optical Tech & Grading Scale'}
                      </option>
                      <option value="events" className="bg-[#161B16] text-white">
                        {language === 'es' ? 'Puntos de Entrega & Eventos' : 'Dropoff Points & Events'}
                      </option>
                      <option value="other" className="bg-[#161B16] text-white">
                        {language === 'es' ? 'Otra Consulta' : 'Other Inquiries'}
                      </option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-[11px] uppercase tracking-wider text-[#A4ACA1]">
                      {language === 'es' ? 'Nº de Pedido (Opcional)' : 'Order / Submission ID (Optional)'}
                    </label>
                    <input 
                      type="text" 
                      value={orderNumber}
                      onChange={(e) => setOrderNumber(e.target.value)}
                      placeholder="Ej. GG-2026-9812"
                      className="w-full bg-[#161B16] border border-white/10 focus:border-[#48C765]/60 px-4 py-3 text-white text-sm focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Message Textarea */}
                <div className="flex flex-col gap-2">
                  <label className="font-mono text-[11px] uppercase tracking-wider text-[#A4ACA1]">
                    {language === 'es' ? 'Mensaje Detallado *' : 'Your Detailed Message *'}
                  </label>
                  <textarea 
                    rows={5}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={language === 'es' 
                      ? 'Describe tu consulta con el mayor detalle posible para darte una respuesta precisa...' 
                      : 'Please describe your inquiry with as much detail as possible...'}
                    className="w-full bg-[#161B16] border border-white/10 focus:border-[#48C765]/60 p-4 text-white text-sm focus:outline-none transition-colors resize-y"
                  />
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-[#48C765] hover:bg-[#3A9F50] text-[#14170F] font-mono font-bold text-xs uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(72,199,101,0.2)] hover:shadow-[0_0_30px_rgba(72,199,101,0.35)] flex items-center justify-center gap-3 disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>{language === 'es' ? 'Enviando Mensaje...' : 'Submitting Message...'}</span>
                  ) : (
                    <>
                      <span>{language === 'es' ? 'Enviar Formulario de Contacto' : 'Submit Contact Inquiry'}</span>
                      <Send size={14} />
                    </>
                  )}
                </button>

                <p className="font-sans text-[11px] text-[#A4ACA1] text-justify leading-relaxed">
                  {language === 'es'
                    ? 'Al enviar este formulario aceptas el tratamiento de tus datos para responder a tu consulta conforme a nuestra Política de Privacidad. No compartimos tu información con terceros bajo ninguna circunstancia.'
                    : 'By submitting this form you consent to the processing of your data to respond to your inquiry according to our Privacy Policy. We do not share your information with third parties.'}
                </p>
              </form>
            )}
          </div>

          {/* Right Column: Direct Info & Quick FAQ link (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Direct Support Card */}
            <div className="bg-[#2B302B] border border-white/[0.06] p-8 flex flex-col gap-6">
              <span className="font-mono text-[10px] tracking-[0.2em] text-[#48C765] uppercase font-bold">
                {language === 'es' ? 'CANALES OFICIALES' : 'OFFICIAL CHANNELS'}
              </span>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-none bg-[#48C765]/10 border border-[#48C765]/30 flex items-center justify-center text-[#48C765] shrink-0 mt-0.5">
                  <Mail size={18} />
                </div>
                <div className="flex flex-col">
                  <span className="font-mono text-[11px] text-[#A4ACA1] uppercase tracking-wider">
                    {language === 'es' ? 'Correo Electrónico Directo' : 'Direct Email Desk'}
                  </span>
                  <a href="mailto:info@gorillagrading.com" className="font-sans text-sm text-white font-medium hover:text-[#48C765] transition-colors">
                    info@gorillagrading.com
                  </a>
                  <p className="font-sans text-xs text-[#A4ACA1] mt-1 text-justify leading-relaxed">
                    {language === 'es' 
                      ? 'Monitoreado por nuestro equipo de guardia. Ideal para envíos masivos o adjuntar documentación fotográfica de piezas de alto valor.' 
                      : 'Monitored by our on-duty team. Ideal for bulk submissions or attaching photographic documentation.'}
                  </p>
                </div>
              </div>

              <div className="h-[1px] bg-white/10 w-full" />

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-none bg-white/5 border border-white/10 flex items-center justify-center text-[#A4ACA1] shrink-0 mt-0.5">
                  <Clock size={18} />
                </div>
                <div className="flex flex-col">
                  <span className="font-mono text-[11px] text-[#A4ACA1] uppercase tracking-wider">
                    {language === 'es' ? 'Horario de Custodia & Atención' : 'Operating Desk Hours'}
                  </span>
                  <span className="font-sans text-sm text-white font-medium">
                    {language === 'es' ? 'Lunes a Viernes · 09:00 - 18:00 CET' : 'Monday to Friday · 09:00 - 18:00 CET'}
                  </span>
                  <p className="font-sans text-xs text-[#A4ACA1] mt-1 text-justify leading-relaxed">
                    {language === 'es' 
                      ? 'Procesamiento continuo de admisión, escaneo espectrométrico e inspección óptica en cámara limpia durante días hábiles.' 
                      : 'Continuous intake, cleanroom spectrometric scan, and optical grading active on all business days.'}
                  </p>
                </div>
              </div>

              <div className="h-[1px] bg-white/10 w-full" />

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-none bg-white/5 border border-white/10 flex items-center justify-center text-[#48C765] shrink-0 mt-0.5">
                  <ShieldCheck size={18} />
                </div>
                <div className="flex flex-col">
                  <span className="font-mono text-[11px] text-[#A4ACA1] uppercase tracking-wider">
                    {language === 'es' ? 'Seguridad & Cadena de Custodia' : 'Security & Chain of Custody'}
                  </span>
                  <p className="font-sans text-xs text-[#A4ACA1] mt-1 text-justify leading-relaxed">
                    {language === 'es' 
                      ? 'Todas las aperturas de paquetes se graban en circuito cerrado de alta definición (CCTV) con doble verificación de precinto para garantizar absoluta tranquilidad.' 
                      : 'All package unboxings are recorded in closed-circuit HD video (CCTV) with double seal verification to guarantee full peace of mind.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick FAQ Link Card */}
            <div className="bg-[#2B302B] border border-[#48C765]/20 p-8 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <HelpCircle size={20} className="text-[#48C765]" />
                <h3 className="font-['Oswald'] text-lg uppercase text-white font-bold tracking-wide">
                  {language === 'es' ? '¿Buscas Respuestas Inmediatas?' : 'Looking for Instant Answers?'}
                </h3>
              </div>

              <p className="font-sans text-xs text-[#A4ACA1] text-justify leading-relaxed">
                {language === 'es'
                  ? 'Hemos recopilado todas las dudas más frecuentes sobre empaque seguro, tiempos de entrega en laboratorio, eventos presenciales y pólizas de seguro en nuestro centro de ayuda interactivo.'
                  : 'We have compiled all frequently asked questions regarding secure packaging, turnaround schedules, in-person events, and insurance policies in our interactive help hub.'}
              </p>

              <button
                onClick={() => onNavigate('/faq')}
                className="mt-2 py-3 px-6 bg-[#48C765]/10 hover:bg-[#48C765] hover:text-[#14170F] text-[#48C765] font-mono text-xs font-bold uppercase tracking-widest border border-[#48C765]/30 transition-all flex items-center justify-between group"
              >
                <span>{language === 'es' ? 'Ver Todas las Preguntas (FAQ)' : 'Browse Full FAQ Hub'}</span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
