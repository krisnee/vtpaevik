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
        salmon: {
          light: '#f7b9b9',
          DEFAULT: '#f59a9a',
          dark: '#f37c7c',
        },
        peach: {
          light: '#f8d0a9',
          DEFAULT: '#f5b870',
          dark: '#f09f4f',
        },
        gray: {
          lightest: '#f7f7f7',
          light: '#e5e5e5',
          medium: '#767676',
          dark: '#333333',
        },
      },
    },
  },
  plugins: [],
};