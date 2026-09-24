/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#0A0D0B',
          charcoal: '#121613',
          panel: '#161B16',
          panel2: '#1D231E',
          card: '#181E19',
          border: 'rgba(255, 255, 255, 0.08)',
          borderSubtle: '#232A24',
          green: '#48C765',
          greenHover: '#38B554',
          greenMuted: '#246134',
          greenDark: '#0D1E14',
          text: '#F4F6F0',
          muted: '#8A9187',
          stone: '#EAE8E3',
        },
        gorilla: {
          50: '#eefdf5',
          100: '#d7fbe8',
          200: '#b2f6d2',
          300: '#7aedb5',
          400: '#48C765',
          500: '#38B554',
          600: '#2A9643',
          700: '#207735',
          800: '#195B2A',
          900: '#12431F',
          950: '#071A0C',
          accent: '#48C765',
        },
      },
      fontFamily: {
        sans: ['"Montserrat"', '"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        display: ['"Oswald"', '"Barlow Condensed"', '"Syne"', 'sans-serif'],
        condensed: ['"Oswald"', '"Barlow Condensed"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'slab': '0 30px 60px -20px rgba(0, 0, 0, 0.85), 0 0 0 1px rgba(255, 255, 255, 0.12)',
        'slab-luxury': '0 30px 60px -20px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(197, 168, 128, 0.35)',
        'laser-focus': '0 0 30px rgba(0, 223, 129, 0.3)',
        'glow-subtle': '0 0 40px -10px rgba(16, 185, 129, 0.25)',
      },
      animation: {
        'scanline': 'scanline 3.5s cubic-bezier(0.4, 0, 0.2, 1) infinite',
        'pulse-subtle': 'pulseSubtle 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 5s ease-in-out infinite',
        'iridescent': 'iridescent 8s ease infinite',
      },
      keyframes: {
        scanline: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '20%': { opacity: '1' },
          '80%': { opacity: '1' },
          '100%': { transform: 'translateY(800%)', opacity: '0' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.65' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        iridescent: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        }
      }
    },
  },
  plugins: [],
}
