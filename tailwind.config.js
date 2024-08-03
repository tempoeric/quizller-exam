/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

delete colors.lightBlue;
delete colors.warmGray;
delete colors.trueGray;
delete colors.coolGray;
delete colors.blueGray;

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  safelist: [
    {
      pattern:
        /(bg|text|border)-(black-primary|blue-primary|gray-primary|gray-secondary|gray-tertiary|gray-quadrary|grayishBlue-primary|grayishBlue-secondary|grayishBlue-tertiary)/,
    },
  ],
  theme: {
    colors: {
      ...colors,
    },
    fontFamily: {
      bebas: ["Bebas Neue"],
      sora: ["Sora"],
    },
    extend: {
      colors: {
        "black-primary": "#2B2C2D",
        "blue-primary": "#4242E0",
        "gray-primary": "#D9D9D9",
        "gray-secondary": "#959EA6",
        "gray-tertiary": "#B2BCC3",
        "gray-quadrary": "#494B4D",
        "grayishBlue-primary": "#C8D2DA",
        "grayishBlue-secondary": "#D3E0E9",
        "grayishBlue-tertiary": "#363739",
      },
    },
  },
  plugins: [],
};
