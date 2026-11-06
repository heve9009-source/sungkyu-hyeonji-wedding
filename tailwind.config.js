/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: '#F6F4EC',
        'warm-white': '#FCFBF6',
        forest: '#465F4C',
        'deep-green': '#465F4C',
        olive: '#6D7658',
        sage: '#AAB29A',
        'pale-pink': '#D8B8B0',
        champagne: '#C9B58C',
        text: '#30342D',
      },
      fontFamily: {
        serif: ['"RIDIBatang"', '"Cormorant Garamond"', 'serif'],
        sans: ['"RIDIBatang"', 'sans-serif'],
        serifkr: ['"RIDIBatang"', 'serif'],
        ridi: ['"RIDIBatang"', 'serif'],
        paperlogy: ['"RIDIBatang"', 'serif'],
        script: ['"Alex Brush"', '"Pinyon Script"', 'cursive'],
        couple: ['"Continuous"', '"PlayfairDisplayCustom"', 'cursive', 'serif'],
        champignon: ['"Champignon"', 'cursive'],
        continuous: ['"Continuous"', 'cursive'],
      },
      letterSpacing: {
        widest: '0.25em',
        editorial: '0.35em',
      },
      borderRadius: {
        none: '0px',
        sm: '2px',
      },
      maxWidth: {
        mobile: '430px',
      }
    },
  },
  plugins: [],
};
