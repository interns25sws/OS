/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class', // 'media' if you prefer automatic dark mode
  theme: {
    container: {
      center: true,
      padding: '1rem',
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1440px',
      },
    },
    extend: {
      colors: {
        primary: '#0D9488',
        secondary: '#F59E0B',
        accent: '#8B5CF6',
        muted: '#64748b',
        background: '#F8FAFC',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        heading: ['Poppins', 'ui-sans-serif'],
      },
      keyframes: {
        'slide-up-fade': {
          '0%': { opacity: 0, transform: 'translateY(30px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        'slide-down-fade': {
          '0%': { opacity: 0, transform: 'translateY(-30px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        'scale-in': {
          '0%': { opacity: 0, transform: 'scale(0.95)' },
          '100%': { opacity: 1, transform: 'scale(1)' },
        },
      },
      animation: {
        'slide-up-fade': 'slide-up-fade 0.5s ease-out',
        'slide-down-fade': 'slide-down-fade 0.5s ease-out',
        'fade-in': 'fade-in 0.6s ease-in-out',
        'scale-in': 'scale-in 0.4s ease-in-out',
      },
      transitionTimingFunction: {
        'in-out-smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        'fast': '200ms',
        'normal': '300ms',
        'slow': '500ms',
      },
    },
  },
  plugins: [],
}
