/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      height: {
        '80vh': '80vh',
      },
      fontSize: {
        'large': '9rem',
      },
      fontFamily: {
        'ubuntu': ['Ubuntu', 'sans-serif'],
      },
      colors: {
        ccPink: '#D5B1FA',
        ccWhite: '#EAEFFB',
        ccBlack: '#2A2A2A',
        ccGreen: '#D2EB63',
        base: '#1f2937',
      },
      keyframes: {
        spin: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '50%': { transform: 'rotate(180deg)' },
        },
      },
      animation: {
        spin: 'spin 1s linear infinite',
      },
    },
  },
  plugins: [],
}