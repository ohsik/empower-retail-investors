/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./lib/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        'xxs': '10px',
        'xs': '12px',
        'sm': '14px',
        'md': '16px',
        'lg': '18px',
      },
      colors: {
        'primary': '#C500E5',
        'primary-dark': '#B117CA',
        'primary-light': '#E5B3FF',
        'secondary': '#FFC500',
      },
      borderWidth: {
        DEFAULT: '0.4px',
      }
    },
  },
  plugins: [],
}