/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx}', './lib/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        abyss: {
          950: '#020410',
          900: '#040820',
          800: '#061037',
          700: '#0a1855',
          600: '#102570',
          500: '#1c3a9a'
        },
        sacred: {
          400: '#5eead4',
          300: '#7dd3fc',
          200: '#a5f3fc',
          100: '#cffafe',
          50: '#ecfeff'
        },
        gold: {
          400: '#fbbf24',
          300: '#fcd34d',
          200: '#fde68a'
        },
        mystic: {
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed'
        }
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
        display: ['"Cormorant Garamond"', 'Georgia', 'serif']
      },
      animation: {
        wave: 'wave 8s ease-in-out infinite',
        float: 'float 20s ease-in-out infinite',
        ripple: 'ripple 4s ease-out infinite',
        pulse: 'pulseGlow 2.5s ease-in-out infinite',
        particle: 'particle 8s linear infinite',
        shine: 'shine 3s ease-in-out infinite',
        'fade-up': 'fadeUp 1s cubic-bezier(.16,1,.3,1) forwards',
        infinity: 'infinityFlow 15s linear infinite',
        rune: 'runeRotate 60s linear infinite',
        ember: 'ember 4s ease-in-out infinite'
      },
      keyframes: {
        wave: {
          '0%,100%': { transform: 'translateY(0) translateX(0)' },
          '50%': { transform: 'translateY(-15px) translateX(10px)' }
        },
        float: {
          '0%,100%': { transform: 'translateY(0) translateX(0)' },
          '50%': { transform: 'translateY(-30px) translateX(20px)' }
        },
        ripple: {
          '0%': { transform: 'scale(0.8)', opacity: '0.8' },
          '100%': { transform: 'scale(2.5)', opacity: '0' }
        },
        pulseGlow: {
          '0%,100%': { opacity: '1', transform: 'scale(1)', boxShadow: '0 0 20px rgba(94,234,212,0.5)' },
          '50%': { opacity: '0.5', transform: 'scale(1.3)', boxShadow: '0 0 40px rgba(94,234,212,0.8)' }
        },
        particle: {
          '0%': { transform: 'translateY(0)', opacity: '0' },
          '10%,90%': { opacity: '1' },
          '100%': { transform: 'translateY(-300px)', opacity: '0' }
        },
        shine: {
          '0%': { width: '0', left: '0' },
          '50%': { width: '100%' },
          '100%': { width: '0', left: '100%' }
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' }
        },
        infinityFlow: {
          '0%': { strokeDashoffset: '0' },
          '100%': { strokeDashoffset: '-200' }
        },
        runeRotate: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' }
        },
        ember: {
          '0%,100%': { opacity: '0.3', transform: 'translateY(0)' },
          '50%': { opacity: '1', transform: 'translateY(-10px)' }
        }
      }
    }
  },
  plugins: []
};
