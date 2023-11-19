/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*{html,js}', './assets/**/*{html,js}', "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      colors: {
        brand: '#11061E'
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

