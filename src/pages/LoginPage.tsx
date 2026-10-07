import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

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
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) {
      setError(language === 'es' ? 'Introduce un correo válido' : 'Enter a valid email');
      return;
    }
    setError('');
    setStep('sending');
    
    // Simulate API delay
    setTimeout(() => {
      setStep('otp');
    }, 1200);
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate verification (any 6 digit code works for demo)
    if (otp.length === 6) {
      login(email);
      onNavigate('/account');
    } else {
      setError(language === 'es' ? 'El código debe tener 6 dígitos' : 'Code must be 6 digits');
    }
  };

  return (
    <div 
      className={`flex-1 min-h-[calc(100vh-5rem)] min-h-[calc(100dvh-5rem)] flex items-center justify-center p-4 sm:p-6 relative overflow-hidden transition-colors duration-500 ${
        isLight ? 'bg-[#F4F1EA] text-[#1A1D1A]' : 'bg-[#14170F] text-white'
      }`}
    >
      {/* Background Ambience */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[140px] pointer-events-none opacity-25"
        style={{ backgroundColor: isLight ? 'rgba(22, 163, 74, 0.15)' : 'rgba(72, 199, 101, 0.12)' }}
      />

      <div className="w-full max-w-md relative z-10">
        <div 
          className={`border p-7 sm:p-10 relative overflow-hidden rounded-2xl shadow-xl backdrop-blur-md transition-colors duration-300 ${
            isLight 
              ? 'bg-white/95 border-neutral-200/90 shadow-[0_20px_50px_rgba(0,0,0,0.06)]' 
              : 'bg-black/40 border-white/[0.08] shadow-2xl'
          }`}
        >
          {/* Subtle noise texture */}
          <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-15 mix-blend-overlay pointer-events-none" />
          
          {/* Brand Monogram Icon - clickable to go home */}
          <div className="flex justify-center mb-6">
            <button 
              onClick={() => onNavigate('/')}
              title={language === 'es' ? 'Ir al inicio' : 'Go home'}
              className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-200 hover:scale-105 cursor-pointer ${
                isLight 
                  ? 'bg-[#16A34A]/10 border-[#16A34A]/30 text-[#16A34A]' 
                  : 'bg-[#48C765]/10 border-[#48C765]/30 text-[#48C765]'
              }`}
            >
              <span className="font-['Oswald'] text-2xl font-bold">G</span>
            </button>
          </div>

          <AnimatePresence mode="wait">
            {step === 'email' && (
              <motion.div
                key="email"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col relative z-10"
              >
                <h1 className="font-['Oswald'] text-2xl sm:text-3xl uppercase text-center mb-1 font-bold tracking-wide title-3d">
                  {language === 'es' ? 'Acceso Seguro' : 'Secure Access'}
                </h1>
                <p 
                  className={`text-center font-mono text-[10px] uppercase tracking-widest mb-3 ${
                    isLight ? 'text-neutral-500' : 'text-[#A4ACA1]'
                  }`}
                >
                  {language === 'es' ? 'Autenticación sin contraseña' : 'Passwordless Authentication'}
                </p>

                <p 
                  className={`text-center font-sans text-xs mb-6 px-2 leading-relaxed ${
                    isLight ? 'text-neutral-600' : 'text-neutral-400'
                  }`}
                >
                  {language === 'es'
                    ? 'Accede con el correo de tus pedidos para consultar el estado de tus cartas y tu bóveda.'
                    : 'Access with the email used in your orders to check your cards and vault status.'}
                </p>

                {/* Email Form */}
                <form onSubmit={handleEmailSubmit} className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label 
                      className={`font-mono text-[9.5px] uppercase tracking-widest font-semibold ${
                        isLight ? 'text-neutral-500' : 'text-[#A4ACA1]'
                      }`}
                    >
                      {language === 'es' ? 'Correo Electrónico' : 'Email Address'}
                    </label>
                    <input 
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="collector@example.com"
                      className={`px-4 py-3 rounded-lg text-sm font-sans focus:outline-none transition-all duration-200 border ${
                        isLight 
                          ? 'bg-neutral-50 border-neutral-300 text-neutral-900 placeholder:text-neutral-400 focus:border-[#16A34A] focus:bg-white focus:ring-1 focus:ring-[#16A34A]'
                          : 'bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#48C765] focus:bg-white/[0.08]'
                      }`}
                      required
                    />
                    {error && <span className="text-red-500 text-xs mt-1 font-sans">{error}</span>}
                  </div>
                  
                  <button 
                    type="submit" 
                    className="btn-gorilla-square w-full py-3.5 text-xs font-extrabold tracking-normal shadow-lg"
                  >
                    {language === 'es' ? 'Recibir Código' : 'Get Code'}
                  </button>
                </form>

                {/* Divider: New Collector Guidance */}
                <div className="flex items-center gap-3 my-6">
                  <div className={`h-[1px] flex-1 ${isLight ? 'bg-neutral-200' : 'bg-white/10'}`} />
                  <span className={`font-mono text-[9px] uppercase tracking-widest font-semibold ${isLight ? 'text-neutral-400' : 'text-[#A4ACA1]'}`}>
                    {language === 'es' ? '¿NUEVO COLECCIONISTA?' : 'NEW COLLECTOR?'}
                  </span>
                  <div className={`h-[1px] flex-1 ${isLight ? 'bg-neutral-200' : 'bg-white/10'}`} />
                </div>

                {/* Clear Explanatory Copy */}
                <p className={`text-center font-sans text-xs mb-3.5 leading-relaxed px-1 ${isLight ? 'text-neutral-600' : 'text-[#C5CDC2]'}`}>
                  {language === 'es'
                    ? 'Tu cuenta se activa automáticamente al enviar tu primer lote de cartas a certificar.'
                    : 'Your collector vault is activated automatically when you submit your first batch of cards.'}
                </p>

                {/* Conversion CTA: Enviar Cartas a Graduar */}
                <button
                  type="button"
                  onClick={() => onNavigate('/submit')}
                  className="btn-gorilla-square-secondary w-full py-3 px-4 text-xs font-bold tracking-normal flex items-center justify-center gap-2 group"
                >
                  <span>{language === 'es' ? 'Enviar Cartas a Graduar' : 'Submit Cards for Grading'}</span>
                  <span className="transition-transform duration-200 group-hover:translate-x-1 font-bold">→</span>
                </button>

                {/* Secondary Shortcut: Track Existing Package */}
                <div className="mt-4 pt-3 border-t border-dashed border-neutral-200 dark:border-white/[0.08] text-center">
                  <button
                    type="button"
                    onClick={() => onNavigate('/track')}
                    className={`font-mono text-[9px] uppercase tracking-wider transition-colors hover:underline cursor-pointer ${
                      isLight ? 'text-neutral-400 hover:text-neutral-700' : 'text-[#8E968B] hover:text-white'
                    }`}
                  >
                    {language === 'es' ? '¿Solo buscas rastrear un pedido? Haz clic aquí' : 'Just tracking an existing order? Click here'}
                  </button>
                </div>
              </motion.div>
            )}

            {step === 'sending' && (
              <motion.div
                key="sending"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-12 relative z-10"
              >
                <div 
                  className={`w-10 h-10 border-2 rounded-full animate-spin mb-4 ${
                    isLight 
                      ? 'border-[#16A34A]/20 border-t-[#16A34A]' 
                      : 'border-[#48C765]/20 border-t-[#48C765]'
                  }`} 
                />
                <p className={`font-mono text-[10px] uppercase tracking-widest ${isLight ? 'text-[#16A34A]' : 'text-[#48C765]'}`}>
                  {language === 'es' ? 'Generando código de acceso...' : 'Generating access code...'}
                </p>
              </motion.div>
            )}

            {step === 'otp' && (
              <motion.div
                key="otp"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col relative z-10"
              >
                <h1 className="font-['Oswald'] text-2xl sm:text-3xl uppercase text-center mb-1 font-bold tracking-wide title-3d">
                  {language === 'es' ? 'Verificación' : 'Verification'}
                </h1>
                <p className={`text-center font-sans text-xs mb-6 px-4 ${isLight ? 'text-neutral-600' : 'text-[#A4ACA1]'}`}>
                  {language === 'es' 
                    ? `Hemos enviado un código de acceso a ${email}` 
                    : `We sent an access code to ${email}`}
                </p>

                <form onSubmit={handleOtpSubmit} className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2 items-center">
                    <input 
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      placeholder="000000"
                      maxLength={6}
                      autoFocus
                      className={`px-4 py-3 text-2xl sm:text-3xl tracking-[0.5em] font-mono text-center w-full rounded-lg border focus:outline-none transition-colors ${
                        isLight 
                          ? 'bg-neutral-50 border-neutral-300 text-neutral-900 focus:border-[#16A34A] focus:bg-white focus:ring-1 focus:ring-[#16A34A]'
                          : 'bg-white/5 border-white/10 text-white focus:border-[#48C765] focus:bg-white/[0.08]'
                      }`}
                      required
                    />
                    {error && <span className="text-red-500 text-xs mt-1 font-sans">{error}</span>}
                  </div>
                  
                  <button 
                    type="submit" 
                    className="btn-gorilla-square w-full py-3.5 text-xs font-extrabold tracking-normal shadow-lg"
                  >
                    {language === 'es' ? 'Acceder al Perfil' : 'Access Vault'}
                  </button>

                  <button 
                    type="button" 
                    onClick={() => { setStep('email'); setOtp(''); setError(''); }}
                    className={`text-center font-mono text-[9px] uppercase tracking-widest mt-2 transition-colors cursor-pointer hover:underline ${
                      isLight ? 'text-neutral-400 hover:text-neutral-800' : 'text-[#A4ACA1] hover:text-white'
                    }`}
                  >
                    {language === 'es' ? '← Cambiar correo electrónico' : '← Change email address'}
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

