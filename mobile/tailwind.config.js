/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./<custom directory>/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        text: ["Baloo Da 2 Regular", "cursive"],
        textMedium : ["Baloo Da 2 Medium", "cursive"],
        textBold : ["Baloo Da 2 SemiBold", "cursive"],
        title: ["Cabin Sketch", "cursive"],
        titleBold: ["Cabin Sketch Bold", "cursive"],
      },
      colors: {
        primary: '#1B3464',
        secondary: '#98B8E8',
        tertiary: '#D66060',
        white: '#FFFFFF',
        whiteOpacity: 'rgba(250,250,250,0.2)',
        darkgrey: '#4F4F4F',
      },
    },
  },
  plugins: [],
};
