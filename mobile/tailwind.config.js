/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./<custom directory>/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        text: ["baloo-da-2", "cursive"],
        title: ["Cabin Sketch", "cursive"],
      },
      colors: {
        primary: '#1B3464',
        secondary: '#98B8E8',
        tertiary: '#D66060',
        white: '#FFFFFF',
        darkgrey: '#4F4F4F'
      },
    },
  },
  plugins: [],
};
