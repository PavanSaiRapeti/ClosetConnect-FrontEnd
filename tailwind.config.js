/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ccPink: '#D5B1FA',
        ccWhite: '#EAEFFB',
        ccBlack: '#2A2A2A',
        ccGreen: '#D2EB63',
        base: '#1f2937',
      },
    },
  },
  plugins: [],
}