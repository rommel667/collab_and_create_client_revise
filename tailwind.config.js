module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    minWidth: {
      '0': '0',
      '1/4': '24%',
      '1/3': '32%',
      '1/2': '49%',
      '3/4': '75%',
      'full': '100%',
     }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
