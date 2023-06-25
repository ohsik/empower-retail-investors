/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./lib/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#C500E5',
        'primary-dark': '#B117CA',
        'primary-light': '#E5B3FF',
        'secondary': '#FFC500',
      }
    },
  },
  plugins: [],
}