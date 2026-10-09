import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  Lock, 
  Mail, 
  ArrowRight, 
  Sparkles, 
  Scan, 
  Layers, 
  Search, 
  Package, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle,
  KeyRound,
  ArrowLeft
} from 'lucide-react';

interface LoginPageProps {
  onNavigate: (path: string) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onNavigate }) => {
  const { language } = useLanguage();
  const { login } = useAuth();
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const [step, setStep] = useState<'email' | 'sending' | 'otp'>('email');
  const [email, setEmail] = useState('');
  const [otpValues, setOtpValues] = useState<string[]>(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [resendTimer, setResendTimer] = useState(30);
  const [isResendDisabled, setIsResendDisabled] = useState(true);

  const otpInputsRef = useRef<(HTMLInputElement | null)[]>([]);

  // Timer for OTP resend countdown
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (step === 'otp' && resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    } else if (resendTimer === 0) {
      setIsResendDisabled(false);
    }
    return () => clearInterval(interval);
  }, [step, resendTimer]);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      setError(language === 'es' ? 'Introduce una dirección de correo válida' : 'Please enter a valid email address');
      return;
    }
    setError('');
    setStep('sending');

    setTimeout(() => {
      setStep('otp');
      setResendTimer(30);
      setIsResendDisabled(true);
      setOtpValues(['', '', '', '', '', '']);
      setTimeout(() => {
        otpInputsRef.current[0]?.focus();
      }, 100);
    }, 1100);
  };

  const handleFillDemoEmail = () => {
    setEmail('alex.collector@gorilla.es');
    setError('');
  };

  const handleOtpChange = (index: number, value: string) => {
    // Only accept numeric inputs
    const sanitized = value.replace(/\D/g, '');
    if (!sanitized && value !== '') return;

    const newOtp = [...otpValues];

    if (sanitized.length > 1) {
      // Handle paste of whole code
      const pastedChars = sanitized.slice(0, 6).split('');
      for (let i = 0; i < 6; i++) {
        newOtp[i] = pastedChars[i] || '';
      }
      setOtpValues(newOtp);
      const nextIndex = Math.min(pastedChars.length, 5);
      otpInputsRef.current[nextIndex]?.focus();
      if (newOtp.join('').length === 6) {
        completeLogin(newOtp.join(''));
      }
      return;
    }

    newOtp[index] = sanitized;
    setOtpValues(newOtp);

    // Auto-advance
    if (sanitized && index < 5) {
      otpInputsRef.current[index + 1]?.focus();
    }

    // Check complete
    if (newOtp.every((char) => char !== '')) {
      completeLogin(newOtp.join(''));
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (!otpValues[index] && index > 0) {
        otpInputsRef.current[index - 1]?.focus();
      }
    }
  };

  const completeLogin = (fullOtp: string) => {
    if (fullOtp.length === 6) {
      login(email || 'alex.collector@gorilla.es');
      onNavigate('/account');
    } else {
      setError(language === 'es' ? 'Introduce el código completo de 6 dígitos' : 'Please enter the complete 6-digit code');
    }
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    completeLogin(otpValues.join(''));
  };

  const handleResendCode = () => {
    if (isResendDisabled) return;
    setIsResendDisabled(true);
    setResendTimer(30);
    setError('');
    // Simulated resend flash
  };

  return (
    <div 
      className={`min-h-[calc(100vh-5rem)] min-h-[calc(100dvh-5rem)] flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8 relative overflow-hidden transition-colors duration-500 ${
        isLight ? 'bg-[#F4F1EA] text-[#1A1D1A]' : 'bg-[#14170F] text-white'
      }`}
    >
      {/* Background Ambience & Metrology Grid */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: isLight 
            ? 'radial-gradient(#1A1D1A 1px, transparent 1px)' 
            : 'radial-gradient(#48C765 1px, transparent 1px)',
          backgroundSize: '28px 28px'
        }}
      />

      {/* Atmospheric Radial Green Bloom */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full blur-[160px] pointer-events-none opacity-25"
        style={{ backgroundColor: isLight ? 'rgba(22, 163, 74, 0.12)' : 'rgba(72, 199, 101, 0.14)' }}
      />

      {/* Main Container */}
      <div className="w-full max-w-5xl relative z-10 my-auto">
        
        {/* Metrological Corner Marks Decor (Luxury Blueprint Feel) */}
        <div className="relative border border-dashed rounded-3xl p-1 sm:p-2.5 transition-colors duration-300"
          style={{
            borderColor: isLight ? 'rgba(0, 0, 0, 0.08)' : 'rgba(72, 199, 101, 0.15)'
          }}
        >
          {/* Subtle Technical Reticles in the corners */}
          <span className="absolute -top-1.5 -left-1.5 font-mono text-[10px] text-[#48C765] opacity-60 select-none">+</span>
          <span className="absolute -top-1.5 -right-1.5 font-mono text-[10px] text-[#48C765] opacity-60 select-none">+</span>
          <span className="absolute -bottom-1.5 -left-1.5 font-mono text-[10px] text-[#48C765] opacity-60 select-none">+</span>
          <span className="absolute -bottom-1.5 -right-1.5 font-mono text-[10px] text-[#48C765] opacity-60 select-none">+</span>

          {/* Core Card Container (Dual Flank Architecture) */}
          <div 
            className={`grid grid-cols-1 lg:grid-cols-12 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 border ${
              isLight 
                ? 'bg-[#FAF8F5] border-[#E8E2D5] shadow-[0_30px_70px_rgba(0,0,0,0.07)]' 
                : 'bg-[#121612]/95 border-white/[0.08] shadow-[0_30px_80px_rgba(0,0,0,0.8)] backdrop-blur-xl'
            }`}
          >
            
            {/* ═══════════════════════════════════════════════════════════════
                LEFT FLANK: BRAND IDENTITY, FORENSIC ASSURANCE & VAULT PREVIEW
                ═══════════════════════════════════════════════════════════════ */}
            <div 
              className={`lg:col-span-5 p-8 sm:p-10 lg:p-12 flex flex-col justify-between relative overflow-hidden border-b lg:border-b-0 lg:border-r ${
                isLight 
                  ? 'bg-gradient-to-b from-[#F2ECE1] to-[#EAE2D3] border-[#E4DDD0]' 
                  : 'bg-gradient-to-b from-[#161B16] to-[#0E120E] border-white/[0.06]'
              }`}
            >
              {/* Subtle background circuit / watermark */}
              <div className="absolute -right-12 -bottom-12 w-64 h-64 opacity-5 pointer-events-none select-none">
                <img 
                  src="/brand/verify-logo.svg" 
                  alt="Gorilla Watermark" 
                  className="w-full h-full object-contain filter grayscale"
                />
              </div>

              <div>
                {/* Official Brand Crest Header */}
                <div className="flex items-center justify-between mb-8">
                  <button 
                    onClick={() => onNavigate('/')}
                    title={language === 'es' ? 'Ir al inicio de Gorilla Grading' : 'Go to Gorilla Grading home'}
                    className="flex items-center gap-3.5 group cursor-pointer text-left focus:outline-none"
                  >
                    <div className="relative">
                      {/* Brand Logo Emblem */}
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center p-1.5 border transition-all duration-300 group-hover:scale-105 ${
                        isLight 
                          ? 'bg-white border-[#DDD6C9] shadow-sm' 
                          : 'bg-[#1A2019] border-[#48C765]/30 shadow-[0_0_20px_rgba(72,199,101,0.15)]'
                      }`}>
                        <img 
                          src="/brand/logo-green.png" 
                          alt="Gorilla Shield Emblem" 
                          className="w-full h-full object-contain"
                        />
                      </div>
                      {/* Active Status Pulse */}
                      <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#48C765] opacity-75" />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#22C55E]" />
                      </span>
                    </div>

                    <div className="flex flex-col">
                      <span className="font-['Nunito',sans-serif] font-[900] text-sm tracking-tight leading-none uppercase">
                        Gorilla Grading
                      </span>
                      <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#48C765] font-semibold mt-1">
                        Private Vault
                      </span>
                    </div>
                  </button>

                  {/* Security Clearance Pill */}
                  <div className={`px-2.5 py-1 rounded-md font-mono text-[8.5px] font-bold uppercase tracking-wider flex items-center gap-1.5 border ${
                    isLight 
                      ? 'bg-white/80 text-neutral-700 border-[#DDD6C9]' 
                      : 'bg-black/40 text-[#48C765] border-[#48C765]/20'
                  }`}>
                    <Lock className="w-3 h-3 text-[#48C765]" />
                    <span>256-BIT SSL</span>
                  </div>
                </div>

                {/* Vault Title & Concept Statement */}
                <div className="space-y-3 mb-8">
                  <div className="inline-flex items-center gap-2 font-mono text-[9.5px] uppercase tracking-[0.25em] text-[#48C765] font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#48C765]" />
                    {language === 'es' ? 'PORTAL DEL COLECCIONISTA' : 'COLLECTOR VAULT PORTAL'}
                  </div>

                  <h1 className="font-['Nunito',sans-serif] font-[900] text-2xl sm:text-3xl leading-[1.15] tracking-tight uppercase">
                    {language === 'es' ? (
                      <>Custodia, Métricas y <span className="text-[#48C765]">Tus Cartas</span></>
                    ) : (
                      <>Custody, Metrics & <span className="text-[#48C765]">Your Slabs</span></>
                    )}
                  </h1>

                  <p className={`text-xs leading-relaxed font-sans ${isLight ? 'text-neutral-600' : 'text-[#A4ACA1]'}`}>
                    {language === 'es'
                      ? 'Accede a la bóveda privada para auditar tus certificados ópticos a 1200 DPI, consultar el avance de tus expedientes en laboratorio y gestionar tu colección.'
                      : 'Access your private vault to audit 1200 DPI optical certificates, track laboratory grading dossiers in real-time, and manage your encapsulated collection.'}
                  </p>
                </div>

                {/* Architectural Feature Cards (What awaits in the vault) */}
                <div className="space-y-2.5 mb-8">
                  <div className={`p-3 rounded-xl border flex items-start gap-3 transition-colors ${
                    isLight ? 'bg-white/70 border-[#E8E2D5]' : 'bg-white/[0.03] border-white/[0.05]'
                  }`}>
                    <div className="p-1.5 rounded-lg bg-[#48C765]/10 text-[#48C765] shrink-0 mt-0.5">
                      <Scan className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-['Nunito',sans-serif] font-bold text-xs uppercase tracking-tight">
                        {language === 'es' ? 'Certificados Ópticos 1200 DPI' : '1200 DPI Optical Certificates'}
                      </div>
                      <div className={`font-sans text-[11px] leading-snug mt-0.5 ${isLight ? 'text-neutral-500' : 'text-[#8E968B]'}`}>
                        {language === 'es' ? 'Sub-notas biométricas, roseta y micro-inspección UV.' : 'Biometric sub-grades, rosette analysis & UV micro-inspection.'}
                      </div>
                    </div>
                  </div>

                  <div className={`p-3 rounded-xl border flex items-start gap-3 transition-colors ${
                    isLight ? 'bg-white/70 border-[#E8E2D5]' : 'bg-white/[0.03] border-white/[0.05]'
                  }`}>
                    <div className="p-1.5 rounded-lg bg-[#48C765]/10 text-[#48C765] shrink-0 mt-0.5">
                      <Layers className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-['Nunito',sans-serif] font-bold text-xs uppercase tracking-tight">
                        {language === 'es' ? 'Trazabilidad de Expedientes' : 'Live Dossier Tracking'}
                      </div>
                      <div className={`font-sans text-[11px] leading-snug mt-0.5 ${isLight ? 'text-neutral-500' : 'text-[#8E968B]'}`}>
                        {language === 'es' ? 'Auditoría en sala limpia, sellado ultrasónico y despacho.' : 'Cleanroom audit, ultrasonic sonic welding & safe return.'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Demo 1-Click Access Pill for Evaluator Convenience */}
              <div className={`pt-4 border-t flex flex-col gap-2 ${isLight ? 'border-[#DDD6C9]' : 'border-white/[0.08]'}`}>
                <div className="flex items-center justify-between">
                  <span className={`font-mono text-[9px] uppercase tracking-wider font-semibold ${isLight ? 'text-neutral-500' : 'text-[#8E968B]'}`}>
                    {language === 'es' ? 'PERFIL DE DEMOSTRACIÓN' : 'DEMO ACCOUNT SHORTCUT'}
                  </span>
                  <span className="font-mono text-[9px] text-[#48C765] font-bold">1-CLICK</span>
                </div>
                <button
                  type="button"
                  onClick={handleFillDemoEmail}
                  className={`w-full py-2 px-3 rounded-lg border text-left font-mono text-[11px] flex items-center justify-between transition-all duration-200 group cursor-pointer ${
                    isLight 
                      ? 'bg-white hover:bg-[#F2ECE1] border-[#DDD6C9] text-neutral-800' 
                      : 'bg-white/[0.04] hover:bg-white/[0.08] border-white/10 text-[#C5CDC2] hover:text-white'
                  }`}
                >
                  <span className="truncate">alex.collector@gorilla.es</span>
                  <span className="text-[10px] text-[#48C765] font-bold group-hover:translate-x-0.5 transition-transform shrink-0 ml-2">
                    {language === 'es' ? 'Rellenar ↵' : 'Autofill ↵'}
                  </span>
                </button>
              </div>
            </div>

            {/* ═══════════════════════════════════════════════════════════════
                RIGHT FLANK: INTERACTIVE VAULT AUTHENTICATION TERMINAL
                ═══════════════════════════════════════════════════════════════ */}
            <div className="lg:col-span-7 p-8 sm:p-10 lg:p-12 flex flex-col justify-between relative bg-transparent">
              
              <div>
                {/* Security Protocol Status Bar */}
                <div className="flex items-center justify-between pb-5 mb-7 border-b border-dashed border-neutral-300 dark:border-white/10">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#48C765]" />
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-bold">
                      {language === 'es' ? 'GATEWAY DE IDENTIDAD' : 'IDENTITY GATEWAY'}
                    </span>
                  </div>

                  <span className={`font-mono text-[9px] uppercase tracking-widest ${isLight ? 'text-neutral-400' : 'text-[#687265]'}`}>
                    {step === 'otp' ? 'PASO 02 / 02' : 'PASO 01 / 02'}
                  </span>
                </div>

                <AnimatePresence mode="wait">
                  
                  {/* ─────────────────────────────────────────────────────────────
                      STEP 1: EMAIL ADDRESS INPUT
                      ───────────────────────────────────────────────────────────── */}
                  {step === 'email' && (
                    <motion.div
                      key="email-view"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.22 }}
                      className="space-y-6"
                    >
                      <div>
                        <h2 className="font-['Nunito',sans-serif] font-[900] text-2xl sm:text-3xl uppercase tracking-tight mb-2">
                          {language === 'es' ? 'Acceso Seguro a Bóveda' : 'Secure Vault Access'}
                        </h2>
                        <p className={`font-sans text-xs leading-relaxed ${isLight ? 'text-neutral-600' : 'text-[#A4ACA1]'}`}>
                          {language === 'es'
                            ? 'Introduce el correo electrónico que utilizaste al tramitar tus envíos de cartas. Te enviaremos una clave de acceso inmediata sin necesidad de recordar contraseñas.'
                            : 'Enter the email address registered with your grading submissions. We will dispatch an instant passwordless access code.'}
                        </p>
                      </div>

                      {/* Main Form */}
                      <form onSubmit={handleEmailSubmit} className="space-y-4">
                        <div className="space-y-1.5">
                          <label 
                            htmlFor="login-email-input"
                            className={`flex items-center justify-between font-mono text-[9.5px] uppercase tracking-[0.18em] font-semibold ${
                              isLight ? 'text-neutral-500' : 'text-[#A4ACA1]'
                            }`}
                          >
                            <span>{language === 'es' ? 'Correo Electrónico Registrado' : 'Registered Email Address'}</span>
                            <span className="text-[#48C765] font-bold">*</span>
                          </label>

                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400 dark:text-neutral-500">
                              <Mail className="w-4 h-4" />
                            </div>

                            <input
                              id="login-email-input"
                              type="email"
                              value={email}
                              onChange={(e) => {
                                setEmail(e.target.value);
                                if (error) setError('');
                              }}
                              placeholder="collector@example.com"
                              className={`w-full pl-10 pr-4 py-3.5 rounded-xl text-sm font-sans focus:outline-none transition-all duration-200 border ${
                                isLight
                                  ? 'bg-white border-[#DDD6C9] text-neutral-900 placeholder:text-neutral-400 focus:border-[#16A34A] focus:ring-2 focus:ring-[#16A34A]/20 shadow-sm'
                                  : 'bg-[#181E18] border-white/10 text-white placeholder:text-neutral-600 focus:border-[#48C765] focus:bg-[#1B231B] focus:ring-2 focus:ring-[#48C765]/20'
                              }`}
                              required
                              autoComplete="email"
                            />
                          </div>

                          {error && (
                            <motion.div 
                              initial={{ opacity: 0, y: -4 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="flex items-center gap-1.5 text-red-500 text-xs font-sans mt-1.5"
                            >
                              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                              <span>{error}</span>
                            </motion.div>
                          )}
                        </div>

                        {/* Submit Button */}
                        <button
                          type="submit"
                          className="btn-gorilla-square w-full py-4 text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-lg group cursor-pointer"
                        >
                          <span>{language === 'es' ? 'Recibir Código de Acceso' : 'Get Access Code'}</span>
                          <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                        </button>
                      </form>

                      {/* VIP Onboarding Card for New Collectors */}
                      <div className={`p-4 sm:p-5 rounded-2xl border transition-colors ${
                        isLight 
                          ? 'bg-gradient-to-br from-[#F5EFE4] to-[#EBE4D5] border-[#DDD6C9]' 
                          : 'bg-gradient-to-br from-white/[0.04] to-white/[0.01] border-white/[0.08]'
                      }`}>
                        <div className="flex items-center gap-2 mb-2 font-mono text-[9px] uppercase tracking-[0.2em] text-[#48C765] font-bold">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>{language === 'es' ? '¿NUEVO COLECCIONISTA?' : 'FIRST TIME SUBMITTING?'}</span>
                        </div>

                        <p className={`font-sans text-xs leading-relaxed mb-3.5 ${isLight ? 'text-neutral-700' : 'text-[#C5CDC2]'}`}>
                          {language === 'es'
                            ? 'Tu bóveda digital y perfil se activan de forma automática con tu primer lote de cartas certificado por nuestro laboratorio.'
                            : 'Your collector vault activates automatically when submitting your first batch of trading cards to our optical laboratory.'}
                        </p>

                        <button
                          type="button"
                          onClick={() => onNavigate('/submit')}
                          className="btn-gorilla-square-secondary w-full py-3 px-4 text-xs font-bold uppercase tracking-normal flex items-center justify-center gap-2 group cursor-pointer"
                        >
                          <span>{language === 'es' ? 'Iniciar Expediente de Envío' : 'Submit Cards for Grading'}</span>
                          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* ─────────────────────────────────────────────────────────────
                      STEP 2: GENERATING / ENCRYPTING TOKEN ANIMATION
                      ───────────────────────────────────────────────────────────── */}
                  {step === 'sending' && (
                    <motion.div
                      key="sending-view"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      className="py-16 flex flex-col items-center justify-center text-center space-y-5"
                    >
                      <div className="relative w-16 h-16 flex items-center justify-center">
                        {/* Outer Spinner */}
                        <div className={`absolute inset-0 border-2 rounded-full animate-spin ${
                          isLight 
                            ? 'border-[#16A34A]/20 border-t-[#16A34A]' 
                            : 'border-[#48C765]/20 border-t-[#48C765]'
                        }`} />
                        {/* Center Icon */}
                        <KeyRound className="w-6 h-6 text-[#48C765] animate-pulse" />
                      </div>

                      <div className="space-y-1.5">
                        <h3 className="font-['Nunito',sans-serif] font-[900] text-xl uppercase tracking-tight">
                          {language === 'es' ? 'Generando Clave Segura' : 'Generating Secure Key'}
                        </h3>
                        <p className={`font-mono text-[10.5px] uppercase tracking-widest ${isLight ? 'text-[#16A34A]' : 'text-[#48C765]'}`}>
                          {language === 'es' ? 'Cifrando token criptográfico...' : 'Encrypting one-time token...'}
                        </p>
                      </div>

                      <div className={`max-w-xs text-xs font-sans leading-relaxed ${isLight ? 'text-neutral-500' : 'text-neutral-400'}`}>
                        {language === 'es' 
                          ? `Despachando código de 6 dígitos a ${email}...` 
                          : `Dispatching 6-digit passcode to ${email}...`}
                      </div>
                    </motion.div>
                  )}

                  {/* ─────────────────────────────────────────────────────────────
                      STEP 3: 6-DIGIT OTP VERIFICATION TERMINAL
                      ───────────────────────────────────────────────────────────── */}
                  {step === 'otp' && (
                    <motion.div
                      key="otp-view"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.22 }}
                      className="space-y-6"
                    >
                      <div>
                        <div className="inline-flex items-center gap-1.5 font-mono text-[9.5px] uppercase tracking-widest text-[#48C765] font-bold mb-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{language === 'es' ? 'CÓDIGO TRANSMITIDO' : 'CODE DISPATCHED'}</span>
                        </div>

                        <h2 className="font-['Nunito',sans-serif] font-[900] text-2xl sm:text-3xl uppercase tracking-tight mb-2">
                          {language === 'es' ? 'Verificación de Acceso' : 'Passcode Verification'}
                        </h2>

                        <p className={`font-sans text-xs leading-relaxed ${isLight ? 'text-neutral-600' : 'text-[#A4ACA1]'}`}>
                          {language === 'es' ? (
                            <>Hemos remitido un código de autenticación a <span className="font-semibold text-neutral-900 dark:text-white underline decoration-[#48C765]">{email}</span>. Cualquier código de 6 dígitos es válido en este entorno prototipo.</>
                          ) : (
                            <>We have sent an authentication passcode to <span className="font-semibold text-neutral-900 dark:text-white underline decoration-[#48C765]">{email}</span>. Any 6-digit code unlocks access in this prototype.</>
                          )}
                        </p>
                      </div>

                      {/* Segmented 6-Cell OTP Input */}
                      <form onSubmit={handleOtpSubmit} className="space-y-5">
                        <div className="space-y-2">
                          <label className={`block font-mono text-[9px] uppercase tracking-[0.2em] font-semibold text-center ${
                            isLight ? 'text-neutral-500' : 'text-[#A4ACA1]'
                          }`}>
                            {language === 'es' ? 'CLAVE DE SEGURIDAD (6 DÍGITOS)' : 'SECURITY CODE (6 DIGITS)'}
                          </label>

                          <div className="flex justify-center gap-2 sm:gap-3">
                            {otpValues.map((digit, index) => (
                              <input
                                key={index}
                                ref={(el) => (otpInputsRef.current[index] = el)}
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleOtpChange(index, e.target.value)}
                                onKeyDown={(e) => handleOtpKeyDown(index, e)}
                                className={`w-11 h-14 sm:w-13 sm:h-16 text-center text-xl sm:text-2xl font-mono font-bold rounded-xl border transition-all duration-200 focus:outline-none focus:scale-105 ${
                                  isLight
                                    ? digit 
                                      ? 'bg-white border-[#16A34A] text-neutral-900 shadow-md ring-2 ring-[#16A34A]/20' 
                                      : 'bg-white border-[#DDD6C9] text-neutral-900 focus:border-[#16A34A]'
                                    : digit 
                                      ? 'bg-[#1C241B] border-[#48C765] text-white shadow-[0_0_15px_rgba(72,199,101,0.25)] ring-2 ring-[#48C765]/30' 
                                      : 'bg-[#181E18] border-white/10 text-white focus:border-[#48C765]'
                                }`}
                              />
                            ))}
                          </div>

                          {error && (
                            <motion.div 
                              initial={{ opacity: 0, y: -4 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="flex items-center justify-center gap-1.5 text-red-500 text-xs font-sans mt-2"
                            >
                              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                              <span>{error}</span>
                            </motion.div>
                          )}
                        </div>

                        {/* Submit Action */}
                        <button
                          type="submit"
                          className="btn-gorilla-square w-full py-4 text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-lg group cursor-pointer"
                        >
                          <span>{language === 'es' ? 'Acceder a la Bóveda Privada' : 'Unlock Private Vault'}</span>
                          <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                        </button>

                        {/* Navigation Sub-actions: Resend & Edit Email */}
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                          <button
                            type="button"
                            onClick={() => {
                              setStep('email');
                              setError('');
                            }}
                            className={`flex items-center gap-1.5 font-mono text-[9.5px] uppercase tracking-wider transition-colors cursor-pointer hover:underline ${
                              isLight ? 'text-neutral-500 hover:text-neutral-900' : 'text-[#A4ACA1] hover:text-white'
                            }`}
                          >
                            <ArrowLeft className="w-3 h-3" />
                            <span>{language === 'es' ? 'Cambiar correo' : 'Change email'}</span>
                          </button>

                          <button
                            type="button"
                            disabled={isResendDisabled}
                            onClick={handleResendCode}
                            className={`flex items-center gap-1.5 font-mono text-[9.5px] uppercase tracking-wider transition-colors ${
                              isResendDisabled
                                ? 'text-neutral-400 dark:text-neutral-600 cursor-not-allowed'
                                : 'text-[#48C765] hover:underline cursor-pointer'
                            }`}
                          >
                            <RefreshCw className={`w-3 h-3 ${isResendDisabled ? '' : 'text-[#48C765]'}`} />
                            <span>
                              {isResendDisabled
                                ? (language === 'es' ? `Reenviar en ${resendTimer}s` : `Resend in ${resendTimer}s`)
                                : (language === 'es' ? 'Reenviar código ahora' : 'Resend code now')}
                            </span>
                          </button>
                        </div>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* ═══════════════════════════════════════════════════════════════
                  BOTTOM UTILITY STRIP: TRACKING & PUBLIC VERIFICATION SHORTCUTS
                  ═══════════════════════════════════════════════════════════════ */}
              <div className="mt-8 pt-5 border-t border-dashed border-neutral-300 dark:border-white/10">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                  <span className={`font-mono text-[9px] uppercase tracking-widest ${isLight ? 'text-neutral-400' : 'text-[#687265]'}`}>
                    {language === 'es' ? 'SERVICIOS PÚBLICOS:' : 'PUBLIC UTILITIES:'}
                  </span>

                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() => onNavigate('/track')}
                      className={`flex items-center gap-1.5 font-mono text-[9.5px] uppercase tracking-wider transition-colors hover:underline cursor-pointer ${
                        isLight ? 'text-neutral-600 hover:text-neutral-900' : 'text-[#A4ACA1] hover:text-white'
                      }`}
                    >
                      <Package className="w-3 h-3 text-[#48C765]" />
                      <span>{language === 'es' ? 'Rastrear Envío' : 'Track Package'}</span>
                    </button>

                    <span className="text-neutral-300 dark:text-neutral-700">·</span>

                    <button
                      type="button"
                      onClick={() => onNavigate('/verify')}
                      className={`flex items-center gap-1.5 font-mono text-[9.5px] uppercase tracking-wider transition-colors hover:underline cursor-pointer ${
                        isLight ? 'text-neutral-600 hover:text-neutral-900' : 'text-[#A4ACA1] hover:text-white'
                      }`}
                    >
                      <Search className="w-3 h-3 text-[#48C765]" />
                      <span>{language === 'es' ? 'Verificar Certificado' : 'Verify Slab'}</span>
                    </button>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Bottom Security / ISO Metrology Regulatory Line */}
        <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-2 px-2 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#48C765]" />
            <span className={`font-mono text-[9px] uppercase tracking-widest ${isLight ? 'text-neutral-500' : 'text-[#687265]'}`}>
              Gorilla Grading Optical Metrology · Secure Vault Architecture v2.4
            </span>
          </div>

          <div className={`font-mono text-[9px] uppercase tracking-widest ${isLight ? 'text-neutral-400' : 'text-[#687265]'}`}>
            ISO 9001 / Forensic Chain of Custody
          </div>
        </div>

      </div>
    </div>
  );
};
