/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Charcoal / near-black base
        ink: {
          50: '#f6f7f8',
          100: '#e9ebed',
          200: '#d1d5da',
          300: '#aeb4bc',
          400: '#828a96',
          500: '#636c79',
          600: '#4d545f',
          700: '#3d434c',
          800: '#262b32',
          900: '#1a1e24',
          950: '#11141a',
        },
        // Cobalt blue accent
        cobalt: {
          50: '#eef4ff',
          100: '#d9e6ff',
          200: '#bcd2ff',
          300: '#8eb4ff',
          400: '#598bff',
          500: '#3563ff',
          600: '#1f43f5',
          700: '#1633e1',
          800: '#182db6',
          900: '#1a2c8f',
          950: '#151e57',
        },
        // Warm white surfaces
        warm: {
          50: '#fdfcfa',
          100: '#f9f7f2',
          200: '#f1ece3',
          300: '#e6dfd1',
        },
        success: '#16a34a',
        warning: '#d97706',
        error: '#dc2626',
      },
      fontFamily: {
        display: ['"Fraunces"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      fontSize: {
        'display-2xl': ['clamp(2.5rem, 6vw, 5rem)', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        'display-xl': ['clamp(2rem, 5vw, 3.75rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(1.5rem, 3.5vw, 2.5rem)', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      maxWidth: {
        '8xl': '88rem',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-in': 'slideIn 0.4s ease-out forwards',
        'scroll-bounce': 'scrollBounce 2s ease-in-out infinite',
        'dash-flow': 'dashFlow 3s linear infinite',
        'pulse-ring': 'pulseRing 2s ease-out infinite',
        'type-cursor': 'typeCursor 1s step-end infinite',
        'spin-slow': 'spin 20s linear infinite',
        'gradient-shift': 'gradientShift 8s ease infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scrollBounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(8px)' },
        },
        dashFlow: {
          '0%': { strokeDashoffset: '100' },
          '100%': { strokeDashoffset: '0' },
        },
        pulseRing: {
          '0%': { transform: 'scale(0.8)', opacity: '0.8' },
          '100%': { transform: 'scale(2)', opacity: '0' },
        },
        typeCursor: {
          '0%, 50%': { opacity: '1' },
          '51%, 100%': { opacity: '0' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      backgroundImage: {
        'grid-pattern': "linear-gradient(to right, rgba(120,120,120,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(120,120,120,0.06) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};
