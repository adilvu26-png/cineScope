/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      screens: {
        xs: '480px',
      },
      colors: {
        void: {
          950: '#050505',
          900: '#0B0B0B',
          800: '#111111',
          700: '#1A1A1A',
          600: '#242424',
          500: '#333333',
        },
        marquee: {
          DEFAULT: '#D4A24E',
          light: '#E8C77E',
          dark: '#9C7530',
        },
        ember: {
          DEFAULT: '#B34632',
          light: '#D2604A',
        },
        mist: {
          100: '#F5F3EF',
          300: '#C9C6BF',
          500: '#8C897F',
        },
      },
      fontFamily: {
        display: ['"Fraunces"', 'ui-serif', 'Georgia', 'serif'],
        sans: ['"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'film-grain': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E\")",
      },
      boxShadow: {
        'glow-marquee': '0 0 40px -8px rgba(212, 162, 78, 0.35)',
        card: '0 20px 45px -15px rgba(0,0,0,0.6)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideUp: {
          '0%': { opacity: 0, transform: 'translateY(24px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: 0, transform: 'translateY(-12px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-400px 0' },
          '100%': { backgroundPosition: '400px 0' },
        },
        scaleIn: {
          '0%': { opacity: 0, transform: 'scale(0.96)' },
          '100%': { opacity: 1, transform: 'scale(1)' },
        },
        toastIn: {
          '0%': { opacity: 0, transform: 'translateY(16px) translateX(-50%)' },
          '100%': { opacity: 1, transform: 'translateY(0) translateX(-50%)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.8s ease-out both',
        slideUp: 'slideUp 0.7s cubic-bezier(0.16,1,0.3,1) both',
        slideDown: 'slideDown 0.4s ease-out both',
        shimmer: 'shimmer 1.8s infinite linear',
        scaleIn: 'scaleIn 0.25s cubic-bezier(0.16,1,0.3,1) both',
        toastIn: 'toastIn 0.35s cubic-bezier(0.16,1,0.3,1) both',
      },
    },
  },
  plugins: [],
}
