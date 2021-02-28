const colors = require('tailwindcss/colors');

module.exports = {
  purge: {
    content: ["dist/**/*.html"],
    options: {
      whitelist: [],
    },
  },
  darkMode: false,
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
  ],
}
