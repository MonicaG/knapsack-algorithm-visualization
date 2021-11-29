const plugin = require('tailwindcss/plugin')

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    borderColor:  ({ after }) => after(['invalid']),
    ringColor: ({ after }) => after(['invalid']),
    backgroundColor: ({ after }) => after(['invalid']),
    extend: {
      opacity: ['disabled'],
      borderColor: ['invalid'],
      ringColor: ['invalid'],
      backgroundColor: ['invalid'],
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    plugin(function({ addUtilities }) {
      const cursor = {
        '.cursor-not-allowed': {
          cursor: 'not-allowed',
        }
      }

      addUtilities(cursor, {
        variants: ['disabled'],
      })
    }),
    plugin(function ({ addVariant, e }) {
      addVariant('invalid', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.${e(`invalid${separator}${className}`)}:invalid`;
        });
      });
    }),
  ],
}
