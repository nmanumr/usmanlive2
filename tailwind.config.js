const colors = require('tailwindcss/colors');

module.exports = {
  purge: {
    content: ["dist/**/*.html"],
    options: {
      whitelist: [],
    },
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      transitionDuration: {
        '400': '400ms',
      },
      animation: {
        'live-pulse': 'live-pulse 2s infinite',
      },
      keyframes: {
        'live-pulse': {
          '0%': {transform: 'scale(1)', opacity: 1},
          '70%': {opacity: 0},
          '100%': {transform: 'scale(4)', opacity: 0},
        }
      },
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
