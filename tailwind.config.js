/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        green: {
          50:  '#f0faf4',
          100: '#d9f2e3',
          200: '#b3e5c8',
          300: '#7dcba7',
          400: '#4aad82',
          500: '#2d8f63',
          600: '#1e6e4c',
          700: '#165439',
          800: '#0f3d2a',
          900: '#082718',
        },
        gold: {
          50:  '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#d4a017',
          600: '#b8860b',
          700: '#92690a',
          800: '#6b4c07',
          900: '#453105',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body:    ['"Inter"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glass':    '0 8px 32px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.6)',
        'gold':     '0 4px 24px rgba(212,160,23,0.25)',
        'green':    '0 4px 24px rgba(30,110,76,0.2)',
        'premium':  '0 20px 60px rgba(0,0,0,0.12), 0 8px 20px rgba(0,0,0,0.06)',
        'card':     '0 2px 20px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04)',
      },
      keyframes: {
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
        spin_slow: {
          from: { transform: 'rotate(0deg)' },
          to:   { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        shimmer:   'shimmer 3s ease-in-out infinite',
        float:     'float 4s ease-in-out infinite',
        spin_slow: 'spin_slow 20s linear infinite',
      },
    },
  },
  plugins: [],
};
