/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#5bbfb5',
          light: '#7accc4',
          dark: '#4a9c94',
        },
      },
    },
  },
  plugins: [],
};