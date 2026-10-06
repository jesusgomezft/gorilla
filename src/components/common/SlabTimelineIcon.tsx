import React from 'react';

interface SlabTimelineIconProps {
  status: 'completed' | 'current' | 'pending';
  isLight?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  isFinal?: boolean; // True cuando es el último paso completado (proceso finalizado)
}

/**
 * SlabTimelineIcon - Réplica a microescala de una carta coleccionable real
 * (borde dorado TCG, arte de criatura, barra de energía) encapsulada dentro del
 * slab acrílico Gorilla Grading con cabezal de certificación y escaneo óptico dinámico.
 */
export const SlabTimelineIcon: React.FC<SlabTimelineIconProps> = ({ 
  status, 
  isLight = false,
  className = '',
  size = 'md',
  isFinal = false
}) => {
  const dimensions = size === 'sm' 
    ? { width: 16, height: 23 } 
    : size === 'lg' 
      ? { width: 24, height: 34 }
      : { width: 19, height: 27 };

  // =========================================================================
  // PASO ACTIVO (CURRENT): Escaneo Láser Óptico Dinámico en Tiempo Real
  // =========================================================================
  if (status === 'current') {
    return (
      <svg
        width={dimensions.width}
        height={dimensions.height}
        viewBox="0 0 20 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`shrink-0 transition-all duration-300 ${className}`}
        style={{ overflow: 'visible' }}
        aria-label="Active optical grading slab with live laser scan and blinking status"
      >
        <defs>
          <style>{`
            @keyframes laserScanSweep {
              0% { transform: translateY(0px); opacity: 0.95; }
              50% { transform: translateY(13px); opacity: 1; }
              100% { transform: translateY(0px); opacity: 0.95; }
            }
            @keyframes slabPulseBlink {
              0%, 100% {
                filter: drop-shadow(0 0 2px rgba(34, 197, 94, 0.4));
                opacity: 1;
              }
              50% {
                filter: drop-shadow(0 0 8px rgba(74, 222, 128, 0.95)) drop-shadow(0 0 14px rgba(34, 197, 94, 0.6));
                opacity: 0.75;
              }
            }
            @keyframes slabRadarWave {
              0% {
                transform: scale(0.98);
                transform-origin: 10px 14px;
                opacity: 0.85;
                stroke-width: 1.5;
              }
              100% {
                transform: scale(1.36);
                transform-origin: 10px 14px;
                opacity: 0;
                stroke-width: 0.3;
              }
            }
            @keyframes liveLedBlink {
              0%, 100% { opacity: 1; transform: scale(1); }
              50% { opacity: 0.2; transform: scale(0.65); }
            }
            .active-laser-line {
              animation: laserScanSweep 2.2s ease-in-out infinite;
            }
            .active-slab-radar {
              animation: slabRadarWave 1.6s cubic-bezier(0, 0, 0.2, 1) infinite;
            }
            .active-slab-shell {
              animation: slabPulseBlink 1.4s ease-in-out infinite;
            }
            .active-live-led {
              animation: liveLedBlink 1s ease-in-out infinite;
              transform-origin: 3.5px 3.5px;
            }
          `}</style>
          {/* Degradado para el arte de la carta (Criatura de fuego/fantasía) */}
          <linearGradient id="cardArtGradCurrent" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#EA580C" />
            <stop offset="45%" stopColor="#EAB308" />
            <stop offset="100%" stopColor="#DC2626" />
          </linearGradient>
          {/* Brillo de reflejo acrílico diagonal */}
          <linearGradient id="acrylicReflection" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.45" />
            <stop offset="35%" stopColor="#FFFFFF" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>
          <clipPath id="innerCardClipCurrent">
            <rect x="2.5" y="9.5" width="15" height="16" rx="0.8" />
          </clipPath>
        </defs>

        {/* 0. ONDA RADAR EXPANSIVA EN FORMA DE SLAB (Titileo de Proceso Activo) */}
        <rect
          x="0.75"
          y="0.75"
          width="18.5"
          height="26.5"
          rx="2"
          fill="none"
          stroke={isLight ? '#16A34A' : '#4ADE80'}
          className="active-slab-radar"
          pointerEvents="none"
        />

        <g className="active-slab-shell">
          {/* 1. CÁPSULA ACRÍLICA EXTERIOR (Slab de Polímero Hermético) */}
          <rect
            x="0.75"
            y="0.75"
            width="18.5"
            height="26.5"
            rx="1.8"
            className={isLight ? 'fill-white stroke-[#16A34A]' : 'fill-[#181D18] stroke-[#4ADE80]'}
            strokeWidth="1.4"
          />

          {/* Rieles internos acrílicos y bisel */}
          <rect
            x="1.6"
            y="1.6"
            width="16.8"
            height="24.8"
            rx="1.2"
            fill="none"
            className={isLight ? 'stroke-black/5' : 'stroke-white/10'}
            strokeWidth="0.5"
          />

          {/* 2. ETIQUETA SUPERIOR GORILLA GRADING (Etiqueta de Grado y Holograma) */}
          <rect
            x="2.4"
            y="2.4"
            width="15.2"
            height="5.4"
            rx="0.6"
            className={isLight ? 'fill-[#16A34A]' : 'fill-[#14532D]'}
          />

          {/* Micro LED titilante de telemetría activa en tiempo real */}
          <circle cx="3.8" cy="4.0" r="0.85" fill="#4ADE80" className="active-live-led" />

          {/* Micro bloque de nota / Grado "10" en oro/blanco */}
          <rect
            x="13.2"
            y="3.2"
            width="3.6"
            height="3.8"
            rx="0.4"
            fill="#FEF08A"
            stroke="#CA8A04"
            strokeWidth="0.4"
          />
          {/* Micro número "10" estilizado en el bloque */}
          <line x1="14.3" y1="4.2" x2="14.3" y2="6.1" stroke="#854D0E" strokeWidth="0.6" strokeLinecap="round" />
          <circle cx="15.6" cy="5.15" r="0.9" fill="none" stroke="#854D0E" strokeWidth="0.6" />

          {/* Micro texto institucional Gorilla & Serial QR */}
          <line x1="5.3" y1="4.0" x2="11.5" y2="4.0" stroke="#FFFFFF" strokeWidth="0.7" strokeLinecap="round" />
          <line x1="3.4" y1="5.3" x2="10.2" y2="5.3" stroke="#86EFAC" strokeWidth="0.6" strokeLinecap="round" />
          <line x1="3.4" y1="6.4" x2="8.0" y2="6.4" stroke="#86EFAC" strokeWidth="0.5" strokeLinecap="round" />

          {/* Separador acrílico ultrasónico */}
          <line x1="1.8" y1="8.6" x2="18.2" y2="8.6" className={isLight ? 'stroke-[#DCD5C3]' : 'stroke-white/20'} strokeWidth="0.6" />

          {/* 3. CARTA COLECCIONABLE REAL (Pokémon / TCG inside) */}
          {/* Borde amarillo/dorado característico de cartas TCG */}
          <rect
            x="2.4"
            y="9.4"
            width="15.2"
            height="16.2"
            rx="0.8"
            fill="#FACC15"
            stroke="#CA8A04"
            strokeWidth="0.5"
          />

          {/* Cuerpo interior de la carta (fondo crema/pergamino o foil) */}
          <rect
            x="3.2"
            y="10.2"
            width="13.6"
            height="14.6"
            rx="0.5"
            fill="#FEF9C3"
          />

          {/* Barra superior de la carta (Nombre + Esfera de Energía) */}
          <line x1="4.0" y1="11.2" x2="12.0" y2="11.2" stroke="#713F12" strokeWidth="0.7" strokeLinecap="round" />
          <circle cx="15.0" cy="11.2" r="0.8" fill="#EF4444" /> {/* Esfera de energía de fuego/roja */}

          {/* Ventana de Ilustración / Arte del Personaje */}
          <rect
            x="3.9"
            y="12.3"
            width="12.2"
            height="7.5"
            rx="0.4"
            fill="url(#cardArtGradCurrent)"
            stroke="#B45309"
            strokeWidth="0.4"
          />
          {/* Silueta de criatura (cabeza/alas estilizadas en el arte) */}
          <path
            d="M8.5 17.5C8.0 15.5 10.0 14.2 11.2 13.8C11.8 14.5 12.5 15.5 11.8 17.5"
            fill="#7C2D12"
            opacity="0.85"
          />
          <circle cx="10.8" cy="14.6" r="0.45" fill="#FEF08A" />

          {/* Barra inferior de ataques y stats de la carta */}
          <line x1="4.2" y1="20.8" x2="14.8" y2="20.8" stroke="#854D0E" strokeWidth="0.6" strokeLinecap="round" />
          <line x1="4.2" y1="22.2" x2="13.0" y2="22.2" stroke="#A16207" strokeWidth="0.5" strokeLinecap="round" />
          <line x1="4.2" y1="23.4" x2="9.5" y2="23.4" stroke="#A16207" strokeWidth="0.5" strokeLinecap="round" />
          
          {/* Micro estrella de rareza en la esquina inferior derecha */}
          <circle cx="15.2" cy="23.4" r="0.4" fill="#EAB308" />

          {/* 4. HAZ LÁSER DINÁMICO EN MOVIMIENTO (Active Laser Subgrading Scanner) */}
          <g clipPath="url(#innerCardClipCurrent)">
            <g className="active-laser-line">
              {/* Resplandor óptico difuso del láser */}
              <line
                x1="2.4"
                y1="10.5"
                x2="17.6"
                y2="10.5"
                stroke="#4ADE80"
                strokeWidth="1.6"
                strokeOpacity="0.45"
              />
              {/* Núcleo de alta intensidad del haz láser de centrado */}
              <line
                x1="2.4"
                y1="10.5"
                x2="17.6"
                y2="10.5"
                stroke="#FFFFFF"
                strokeWidth="0.75"
              />
              {/* Punto de cálculo óptico micro-caliper */}
              <circle cx="10.0" cy="10.5" r="1.0" fill="#22C55E" />
              <circle cx="10.0" cy="10.5" r="0.5" fill="#FFFFFF" />
            </g>
          </g>

          {/* 5. REFLEJO DE CRISTAL ACRÍLICO DIAGONAL */}
          <path
            d="M1.5 1.5L16.5 1.5L2.5 22.5L1.5 22.5Z"
            fill="url(#acrylicReflection)"
            pointerEvents="none"
          />
        </g>
      </svg>
    );
  }

  // =========================================================================
  // PASO FINAL COMPLETADO (FINAL COMPLETED): Proceso Finalizado (Oro / Amarillo)
  // =========================================================================
  if (status === 'completed' && isFinal) {
    return (
      <svg
        width={dimensions.width}
        height={dimensions.height}
        viewBox="0 0 20 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`shrink-0 transition-all duration-300 ${className}`}
        style={{ overflow: 'visible' }}
        aria-label="Final completed and delivered slab with golden status pulse"
      >
        <defs>
          <style>{`
            @keyframes finalGoldPulse {
              0%, 100% {
                filter: drop-shadow(0 0 2px rgba(245, 158, 11, 0.45));
                opacity: 1;
              }
              50% {
                filter: drop-shadow(0 0 9px rgba(251, 191, 36, 0.95)) drop-shadow(0 0 15px rgba(245, 158, 11, 0.6));
                opacity: 0.8;
              }
            }
            @keyframes finalGoldRadar {
              0% {
                transform: scale(0.98);
                transform-origin: 10px 14px;
                opacity: 0.9;
                stroke-width: 1.6;
              }
              100% {
                transform: scale(1.38);
                transform-origin: 10px 14px;
                opacity: 0;
                stroke-width: 0.3;
              }
            }
            .final-slab-radar {
              animation: finalGoldRadar 1.6s cubic-bezier(0, 0, 0.2, 1) infinite;
            }
            .final-slab-shell {
              animation: finalGoldPulse 1.4s ease-in-out infinite;
            }
          `}</style>
          <linearGradient id="cardArtGradFinal" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="50%" stopColor="#EAB308" />
            <stop offset="100%" stopColor="#CA8A04" />
          </linearGradient>
          <linearGradient id="acrylicReflectionFinal" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.5" />
            <stop offset="35%" stopColor="#FFFFFF" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* 0. Onda radar expansiva de proceso finalizado en oro/amarillo */}
        <rect
          x="0.75"
          y="0.75"
          width="18.5"
          height="26.5"
          rx="2"
          fill="none"
          stroke="#F59E0B"
          className="final-slab-radar"
          pointerEvents="none"
        />

        <g className="final-slab-shell">
          {/* 1. Cápsula exterior en oro/amarillo completado */}
          <rect
            x="0.75"
            y="0.75"
            width="18.5"
            height="26.5"
            rx="1.8"
            className={isLight ? 'fill-white stroke-[#F59E0B]' : 'fill-[#241E14] stroke-[#FBBF24]'}
            strokeWidth="1.5"
          />

          {/* 2. Etiqueta superior dorada finalizada */}
          <rect
            x="2.4"
            y="2.4"
            width="15.2"
            height="5.4"
            rx="0.6"
            fill="#F59E0B"
          />
          {/* Checkmark blanco de proceso entregado/completado */}
          <path
            d="M13.8 4.8L14.8 5.8L16.6 3.6"
            stroke="#FFFFFF"
            strokeWidth="1.1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <line x1="3.4" y1="4.2" x2="11.5" y2="4.2" stroke="#FFFFFF" strokeWidth="0.8" strokeLinecap="round" />
          <line x1="3.4" y1="5.6" x2="9.0" y2="5.6" stroke="#FEF3C7" strokeWidth="0.6" strokeLinecap="round" />

          {/* Separador acrílico */}
          <line x1="1.8" y1="8.6" x2="18.2" y2="8.6" stroke="#F59E0B" strokeOpacity="0.4" strokeWidth="0.6" />

          {/* 3. Carta TCG interior con borde dorado */}
          <rect
            x="2.4"
            y="9.4"
            width="15.2"
            height="16.2"
            rx="0.8"
            fill="#FACC15"
            stroke="#CA8A04"
            strokeWidth="0.5"
          />
          <rect
            x="3.2"
            y="10.2"
            width="13.6"
            height="14.6"
            rx="0.5"
            fill="#FEF9C3"
          />
          {/* Cabecera y gema dorada */}
          <line x1="4.0" y1="11.2" x2="12.0" y2="11.2" stroke="#713F12" strokeWidth="0.7" strokeLinecap="round" />
          <circle cx="15.0" cy="11.2" r="0.8" fill="#F59E0B" />

          {/* Ilustración de la carta final */}
          <rect
            x="3.9"
            y="12.3"
            width="12.2"
            height="7.5"
            rx="0.4"
            fill="url(#cardArtGradFinal)"
            stroke="#B45309"
            strokeWidth="0.4"
          />
          <circle cx="10.0" cy="16.0" r="1.8" fill="#FEF08A" opacity="0.85" />

          {/* Stats de ataque */}
          <line x1="4.2" y1="21.0" x2="14.8" y2="21.0" stroke="#854D0E" strokeWidth="0.6" strokeLinecap="round" />
          <line x1="4.2" y1="22.4" x2="11.0" y2="22.4" stroke="#A16207" strokeWidth="0.5" strokeLinecap="round" />

          {/* Reflejo de cristal */}
          <path
            d="M1.5 1.5L16.5 1.5L2.5 22.5L1.5 22.5Z"
            fill="url(#acrylicReflectionFinal)"
            pointerEvents="none"
          />
        </g>
      </svg>
    );
  }

  // =========================================================================
  // PASO COMPLETADO (COMPLETED): Slab Certificado y Sellado
  // =========================================================================
  if (status === 'completed') {
    return (
      <svg
        width={dimensions.width}
        height={dimensions.height}
        viewBox="0 0 20 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`shrink-0 ${className}`}
        aria-label="Completed and verified certified slab"
      >
        <defs>
          <linearGradient id="cardArtGradCompleted" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0284C7" />
            <stop offset="50%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#1E3A8A" />
          </linearGradient>
          <linearGradient id="acrylicReflectionComp" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.4" />
            <stop offset="35%" stopColor="#FFFFFF" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* 1. Cápsula exterior certificada */}
        <rect
          x="0.75"
          y="0.75"
          width="18.5"
          height="26.5"
          rx="1.8"
          className={isLight ? 'fill-[#FAF7F2] stroke-[#2D9A46]' : 'fill-[#222822] stroke-[#48C765]'}
          strokeWidth="1.2"
        />

        {/* 2. Etiqueta superior con sello verificado */}
        <rect
          x="2.4"
          y="2.4"
          width="15.2"
          height="5.4"
          rx="0.6"
          className={isLight ? 'fill-[#2D9A46]' : 'fill-[#16A34A]'}
        />
        {/* Checkmark en la etiqueta */}
        <path
          d="M13.8 4.8L14.8 5.8L16.6 3.6"
          stroke="#FFFFFF"
          strokeWidth="0.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <line x1="3.4" y1="4.2" x2="11.5" y2="4.2" stroke="#FFFFFF" strokeWidth="0.7" strokeLinecap="round" />
        <line x1="3.4" y1="5.6" x2="9.0" y2="5.6" stroke="#BBF7D0" strokeWidth="0.6" strokeLinecap="round" />

        {/* Separador acrílico */}
        <line x1="1.8" y1="8.6" x2="18.2" y2="8.6" className={isLight ? 'stroke-[#2D9A46]/30' : 'stroke-[#48C765]/30'} strokeWidth="0.6" />

        {/* 3. Carta TCG interior con borde dorado */}
        <rect
          x="2.4"
          y="9.4"
          width="15.2"
          height="16.2"
          rx="0.8"
          fill="#EAB308"
          stroke="#CA8A04"
          strokeWidth="0.4"
        />
        <rect
          x="3.2"
          y="10.2"
          width="13.6"
          height="14.6"
          rx="0.5"
          fill="#FEF9C3"
        />
        {/* Cabecera y gema */}
        <line x1="4.0" y1="11.2" x2="12.0" y2="11.2" stroke="#713F12" strokeWidth="0.7" strokeLinecap="round" />
        <circle cx="15.0" cy="11.2" r="0.8" fill="#3B82F6" />

        {/* Ilustración de la carta */}
        <rect
          x="3.9"
          y="12.3"
          width="12.2"
          height="7.5"
          rx="0.4"
          fill="url(#cardArtGradCompleted)"
          stroke="#0369A1"
          strokeWidth="0.4"
        />
        <circle cx="10.0" cy="16.0" r="1.8" fill="#BAE6FD" opacity="0.6" />

        {/* Stats de ataque */}
        <line x1="4.2" y1="21.0" x2="14.8" y2="21.0" stroke="#854D0E" strokeWidth="0.6" strokeLinecap="round" />
        <line x1="4.2" y1="22.4" x2="11.0" y2="22.4" stroke="#A16207" strokeWidth="0.5" strokeLinecap="round" />

        {/* Reflejo de cristal */}
        <path
          d="M1.5 1.5L16.5 1.5L2.5 22.5L1.5 22.5Z"
          fill="url(#acrylicReflectionComp)"
          pointerEvents="none"
        />
      </svg>
    );
  }

  // =========================================================================
  // PASO PENDIENTE (PENDING): Silueta del Slab con Carta en espera
  // =========================================================================
  return (
    <svg
      width={dimensions.width}
      height={dimensions.height}
      viewBox="0 0 20 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 opacity-45 ${className}`}
      aria-label="Pending custody stage slab"
    >
      <rect
        x="0.75"
        y="0.75"
        width="18.5"
        height="26.5"
        rx="1.8"
        className={isLight ? 'fill-white stroke-black/25' : 'fill-[#282E28] stroke-white/25'}
        strokeWidth="1"
      />
      <rect
        x="2.4"
        y="2.4"
        width="15.2"
        height="5.4"
        rx="0.6"
        className={isLight ? 'fill-black/10' : 'fill-white/10'}
      />
      <rect
        x="2.4"
        y="9.4"
        width="15.2"
        height="16.2"
        rx="0.8"
        className={isLight ? 'fill-black/[0.04] stroke-black/15' : 'fill-white/[0.04] stroke-white/15'}
        strokeWidth="0.5"
      />
      <rect
        x="3.9"
        y="12.3"
        width="12.2"
        height="7.5"
        rx="0.4"
        className={isLight ? 'fill-black/5' : 'fill-white/5'}
      />
    </svg>
  );
};
