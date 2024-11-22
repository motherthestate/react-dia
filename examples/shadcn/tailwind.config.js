/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        appear: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '20%': { opacity: '1' },
          '100%': { opacity: '1', transform: 'translateY(0px)' },
        },
      },
      animation: {
        appear: 'appear 250ms',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
