/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#8dd7cf',
          DEFAULT: '#5bbfb5',
          dark: '#429991',
        },
        secondary: {
          light: '#fde68a',
          DEFAULT: '#fcd34d',
          dark: '#f59e0b',
        },
      },
    },
  },
  plugins: [],
}