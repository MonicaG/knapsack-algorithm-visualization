const plugin = require('tailwindcss/plugin')

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      opacity: ['disabled'],
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
    })
  ],
}
