const colors = require('tailwindcss/colors');

module.exports = {
  purge: {
    content: [
        "docs/**/*.njk",
        "docs/**/*.html",
        "src/**/*.njk",
        "src/**/*.html",
        "src/**/*.tsx",
    ],
    options: {
      whitelist: [],
    },
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        rose: colors.rose,
      },
    },
    fontFamily: {
      'sans': 'Nunito, sans-serif',
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
