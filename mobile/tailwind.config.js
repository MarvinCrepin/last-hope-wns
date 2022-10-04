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
        "lh-primary": "#d66060",
        "lh-secondary": "#fe9595",
        "lh-light": "#fcfcfc",
        "lh-dark": "#4f4f4f",
        "lh-gray": "#e5e5e5",
        "lh-light-gray": "#cfcfcf",
      },
    },
  },
  plugins: [],
};
