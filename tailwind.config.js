/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        pink: '#ffaae7',
        lighter: '#f5f5f5',
        light: '#ececec',
        dark: '#1a1d1c',
        red: '#c06659',
        teal: '#4a8587',
      },
    },
  },
  plugins: [],
}
