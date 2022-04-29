const plugin = require('tailwindcss/plugin')

module.exports = {
  content: [    "./src/**/*.{js,jsx,ts,tsx}",  ],
  theme: {
    extend: {},
    fontFamily: {
      'header': ['"Open Sans"', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif', '"Apple Color Emoji"', '"Segoe UI Emoji"', '"Segoe UI Symbol"'],
    },
  },
  variants: {
    borderColor:  ({ after }) => after(['invalid']),
    ringColor: ({ after }) => after(['invalid']),
    backgroundColor: ({ after }) => after(['invalid']),
    extend: {
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
