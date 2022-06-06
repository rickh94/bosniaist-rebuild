const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./**/*.njk",
    "./**/*.md",
    "./**/*.css",
  ],
  theme: {
    screens: {
      "xs": "475px",
      ...defaultTheme.screens,
    },
    extend: {
      colors: {
        beige: {
          "50": "#ffffff",
          "100": "#ffffff",
          "200": "#fffffa",
          "300": "#fffff0",
          "400": "#ffffe6",
          "500": "#f5f5dc",
          "600": "#ebebd2",
          "700": "#e1e1c8",
          "800": "#d7d7be",
          "900": "#cdcdb4"
        },
      },
    },
  },
  plugins: [],
};
