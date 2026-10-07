import React from 'react';

interface VerifyLogoProps {
  className?: string;
  size?: string; // e.g., 'w-24 h-24 sm:w-28 sm:h-28'
  showText?: boolean;
}

export const VerifyLogo: React.FC<VerifyLogoProps> = ({
  className = '',
  size = 'w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32',
  showText = false
}) => {
  return (
    <div className={`inline-flex flex-col items-center select-none ${className}`}>
      <div className={`relative ${size} shrink-0`}>
        {/* Soft Ambient Dynamic Pulse Halo */}
        <div 
          className="absolute inset-0 rounded-full bg-[#22C55E]/25 blur-2xl pointer-events-none animate-pulse"
          style={{ animationDuration: '3.5s' }}
        />

        <svg 
          viewBox="0 0 140 140" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full object-contain relative z-10 drop-shadow-xl overflow-visible"
        >
          <defs>
            <linearGradient id="vlShieldGrad" x1="20" y1="20" x2="120" y2="120" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#4ADE80" />
              <stop offset="50%" stopColor="#22C55E" />
              <stop offset="100%" stopColor="#15803D" />
            </linearGradient>

            <linearGradient id="vlInnerBevel" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0.25" />
            </linearGradient>

            <radialGradient id="vlRingGlow" cx="70" cy="70" r="65" gradientUnits="userSpaceOnUse">
              <stop offset="60%" stopColor="#22C55E" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#22C55E" stopOpacity="0" />
            </radialGradient>

            {/* Laser Shimmer Scan Gradient */}
            <linearGradient id="vlScanBeam" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
              <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </linearGradient>

            <clipPath id="vlShieldClip">
              <path d="M42 35C42 30.5817 45.5817 27 50 27H90C94.4183 27 98 30.5817 98 35V69C98 85.5 82 98.5 70 105C58 98.5 42 85.5 42 69V35Z" />
            </clipPath>

            <style>
              {`
                @keyframes vlRotateDial {
                  from { transform: rotate(0deg); }
                  to { transform: rotate(360deg); }
                }
                @keyframes vlFloatShield {
                  0%, 100% { transform: translateY(0px); }
                  50% { transform: translateY(-3.5px); }
                }
                @keyframes vlBadgePulse {
                  0%, 100% { transform: scale(1); }
                  50% { transform: scale(1.08); }
                }
                @keyframes vlPingWave {
                  0% { transform: scale(0.9); opacity: 0.8; }
                  70%, 100% { transform: scale(1.6); opacity: 0; }
                }
                @keyframes vlLaserScan {
                  0% { transform: translateY(-30px); }
                  50%, 100% { transform: translateY(90px); }
                }

                .vl-dial-group {
                  transform-origin: 70px 70px;
                  animation: vlRotateDial 22s linear infinite;
                }
                .vl-shield-group {
                  transform-origin: 70px 65px;
                  animation: vlFloatShield 4s ease-in-out infinite;
                }
                .vl-badge-group {
                  transform-origin: 96px 94px;
                  animation: vlBadgePulse 2.8s ease-in-out infinite;
                }
                .vl-ping-circle {
                  transform-origin: 16px 16px;
                  animation: vlPingWave 2.8s cubic-bezier(0, 0, 0.2, 1) infinite;
                }
                .vl-scan-line {
                  animation: vlLaserScan 3.5s ease-in-out infinite;
                }
              `}
            </style>
          </defs>

          {/* Ambient Glow */}
          <circle cx="70" cy="70" r="62" fill="url(#vlRingGlow)" />

          {/* 1. ANIMATED ROTATING RADAR / METROLOGY DIAL */}
          <g className="vl-dial-group">
            {/* Outer Metrological Security Ring with Dial Ticks */}
            <circle cx="70" cy="70" r="59" stroke="#22C55E" strokeOpacity="0.38" strokeWidth="1.5" strokeDasharray="5 3.5" />
            <circle cx="70" cy="70" r="53" stroke="#22C55E" strokeOpacity="0.22" strokeWidth="1" />

            {/* Dial Cardinal Precision Points */}
            <circle cx="70" cy="11" r="2.5" fill="#4ADE80" />
            <circle cx="129" cy="70" r="2.5" fill="#4ADE80" />
            <circle cx="70" cy="129" r="2.5" fill="#4ADE80" />
            <circle cx="11" cy="70" r="2.5" fill="#4ADE80" />

            {/* Intermediate Micro Ticks */}
            <circle cx="28" cy="28" r="1.5" fill="#22C55E" fillOpacity="0.7" />
            <circle cx="112" cy="28" r="1.5" fill="#22C55E" fillOpacity="0.7" />
            <circle cx="112" cy="112" r="1.5" fill="#22C55E" fillOpacity="0.7" />
            <circle cx="28" cy="112" r="1.5" fill="#22C55E" fillOpacity="0.7" />
          </g>

          {/* 2. ANIMATED FLOATING SHIELD GROUP */}
          <g className="vl-shield-group">
            {/* Gorilla Shield Shadow */}
            <path 
              d="M42 37C42 31.5817 45.5817 28 50 28H90C94.4183 28 98 31.5817 98 36V70C98 86.5 82 99.5 70 106C58 99.5 42 86.5 42 70V37Z" 
              fill="#080F0A" 
              fillOpacity="0.75" 
            />

            {/* Main Gorilla Shield (Emerald Gradient) */}
            <path 
              d="M42 35C42 30.5817 45.5817 27 50 27H90C94.4183 27 98 30.5817 98 35V69C98 85.5 82 98.5 70 105C58 98.5 42 85.5 42 69V35Z" 
              fill="url(#vlShieldGrad)" 
            />

            {/* Inner Bevel Metallic Relief */}
            <path 
              d="M42 35C42 30.5817 45.5817 27 50 27H90C94.4183 27 98 30.5817 98 35V69C98 85.5 82 98.5 70 105C58 98.5 42 85.5 42 69V35Z" 
              fill="url(#vlInnerBevel)" 
            />

            {/* Laser Shimmer Scan Beam (Clipped to Shield) */}
            <g clipPath="url(#vlShieldClip)">
              <rect 
                x="35" 
                y="20" 
                width="70" 
                height="18" 
                fill="url(#vlScanBeam)" 
                className="vl-scan-line" 
              />
            </g>

            {/* Shield Border Line */}
            <path 
              d="M42 35C42 30.5817 45.5817 27 50 27H90C94.4183 27 98 30.5817 98 35V69C98 85.5 82 98.5 70 105C58 98.5 42 85.5 42 69V35Z" 
              stroke="#FFFFFF" 
              strokeOpacity="0.4" 
              strokeWidth="1.5" 
            />

            {/* Gorilla Hallmark 'G' inside Shield */}
            <g transform="translate(68, 59)">
              <path 
                d="M11 -7.5 A13.5 13.5 0 1 0 13 2.5 H2" 
                fill="none" 
                stroke="#0F1711" 
                strokeWidth="6.5" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
              />
            </g>
          </g>

          {/* 3. ANIMATED PULSING VERIFIED CHECK BADGE */}
          <g className="vl-badge-group" transform="translate(80, 78)">
            {/* Radar Expanding Wave Ping Ring */}
            <circle 
              cx="16" 
              cy="16" 
              r="15" 
              fill="none" 
              stroke="#4ADE80" 
              strokeWidth="2" 
              className="vl-ping-circle" 
            />

            {/* Solid Dark Outer Rim */}
            <circle cx="16" cy="16" r="16.5" fill="#0A120D" />
            
            {/* Vivid Green Circle */}
            <circle cx="16" cy="16" r="15" fill="#22C55E" />
            
            {/* Crisp White Checkmark */}
            <path 
              d="M9.2 16.2L14 21L23 11.8" 
              stroke="#FFFFFF" 
              strokeWidth="3.4" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
            />
          </g>
        </svg>
      </div>

      {showText && (
        <div className="mt-3 text-center">
          <div className="font-['Montserrat'] font-extrabold text-sm sm:text-base tracking-[0.2em] uppercase text-current">
            GORILLA <span className="text-[#22C55E]">VERIFY</span>
          </div>
          <div className="font-mono text-[9px] tracking-[0.3em] uppercase opacity-50">
            OFFICIAL REGISTRY
          </div>
        </div>
      )}
    </div>
  );
};
