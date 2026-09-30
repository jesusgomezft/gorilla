import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

interface LoginPageProps {
  onNavigate: (path: string) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onNavigate }) => {
  const { language } = useLanguage();
  const { login } = useAuth();
  
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
    }, 1500);
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
    <div className="min-h-screen bg-[#14170F] text-white flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#48C765]/[0.05] blur-[150px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <div className="bg-black/20 border border-white/[0.05] p-8 md:p-12 relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-20 mix-blend-overlay pointer-events-none" />
          
          <div className="flex justify-center mb-8">
            <div className="w-12 h-12 bg-[#48C765]/10 flex items-center justify-center border border-[#48C765]/30">
              <span className="font-['Oswald'] text-2xl text-[#48C765]">G</span>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {step === 'email' && (
              <motion.div
                key="email"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex flex-col relative z-10"
              >
                <h1 className="font-['Oswald'] text-3xl uppercase text-center mb-2">
                  {language === 'es' ? 'Acceso Seguro' : 'Secure Access'}
                </h1>
                <p className="text-center font-mono text-[10px] text-[#A4ACA1] uppercase tracking-widest mb-8">
                  {language === 'es' ? 'Autenticación sin contraseña' : 'Passwordless Authentication'}
                </p>

                <form onSubmit={handleEmailSubmit} className="flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-[9px] text-[#A4ACA1] uppercase tracking-widest">
                      {language === 'es' ? 'Correo Electrónico' : 'Email Address'}
                    </label>
                    <input 
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="collector@example.com"
                      className="bg-white/5 border border-white/[0.05] px-4 py-3 text-sm font-sans focus:outline-none focus:border-[#48C765] transition-colors"
                      required
                    />
                    {error && <span className="text-red-400 text-xs mt-1">{error}</span>}
                  </div>
                  
                  <button type="submit" className="w-full py-4 bg-[#48C765] hover:bg-[#38B554] text-[#14170F] font-mono text-[10px] font-bold tracking-[0.2em] uppercase transition-colors">
                    {language === 'es' ? 'Recibir Código' : 'Get Code'}
                  </button>
                </form>
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
                <div className="w-8 h-8 border-2 border-[#48C765]/20 border-t-[#48C765] rounded-full animate-spin mb-4" />
                <p className="font-mono text-[10px] text-[#48C765] uppercase tracking-widest">
                  {language === 'es' ? 'Generando OTP...' : 'Generating OTP...'}
                </p>
              </motion.div>
            )}

            {step === 'otp' && (
              <motion.div
                key="otp"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex flex-col relative z-10"
              >
                <h1 className="font-['Oswald'] text-3xl uppercase text-center mb-2">
                  {language === 'es' ? 'Verificación' : 'Verification'}
                </h1>
                <p className="text-center font-sans text-xs text-[#A4ACA1] mb-8 px-4">
                  {language === 'es' 
                    ? `Hemos enviado un código seguro de 6 dígitos a ${email}` 
                    : `We sent a secure 6-digit code to ${email}`}
                </p>

                <form onSubmit={handleOtpSubmit} className="flex flex-col gap-6">
                  <div className="flex flex-col gap-2 items-center">
                    <input 
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      placeholder="000000"
                      className="bg-white/5 border border-white/[0.05] px-4 py-4 text-3xl tracking-[0.5em] font-mono text-center w-full focus:outline-none focus:border-[#48C765] transition-colors"
                      required
                    />
                    {error && <span className="text-red-400 text-xs mt-1">{error}</span>}
                  </div>
                  
                  <button type="submit" className="w-full py-4 bg-[#48C765] hover:bg-[#38B554] text-[#14170F] font-mono text-[10px] font-bold tracking-[0.2em] uppercase transition-colors">
                    {language === 'es' ? 'Acceder al Perfil' : 'Access Vault'}
                  </button>

                  <button 
                    type="button" 
                    onClick={() => {setStep('email'); setOtp(''); setError('');}}
                    className="text-center font-mono text-[9px] text-[#A4ACA1] hover:text-white uppercase tracking-widest mt-4 transition-colors"
                  >
                    {language === 'es' ? '¿No recibiste el código? Volver' : 'Didn\'t receive code? Go back'}
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
