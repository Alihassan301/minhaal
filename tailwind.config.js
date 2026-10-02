export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        plum: '#160D18',
        night: '#0E0810',
        rose: '#E8A7B8',
        dusty: '#C98298',
        gold: '#D8B878',
        ivory: '#FFF8F0',
        burgundy: '#4A1F32',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        script: ['"Great Vibes"', 'cursive'],
        sans: ['Manrope', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
