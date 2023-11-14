/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*{html,js}",
    "./assets/**/*{html,js}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        brand: "#11061E",
      },
      spacing: {
        96: "24rem",
        104: "26rem",
        // Add as many as you need...
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
