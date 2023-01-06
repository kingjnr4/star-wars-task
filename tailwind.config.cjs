/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens:{
      'sm':'468px',
      'md':'768px',
      'lg':'968px',
      'xl':'1440px'
    },
    extend: {
    },
  },
  plugins: [],
}