const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors:{
      transparent: 'transparent',
      choco: '#3a1d18',
      red: '#c42034',
      pale: '#dedbe6',
      palered: '#eb918a',
      dark: '#2b2b2b',
    },
    fontFamily:{
      simp: ['Tajawal', 'sans-serif'],
      deco: ['Overlock', 'cursive']
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}