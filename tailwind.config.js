const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./client/src/**/*.js", "./client/dist/index.html"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'primary': colors.red['500'],
        'foreground': colors.white,
        'background': colors.neutral['900'],
        'secondary': colors.slate
      },
      fontFamily: {
        archivo: ['Archivo Black', ...defaultTheme.fontFamily.serif],
        poppins: ['Poppins', ...defaultTheme.fontFamily.sans],
        public: ['Public Sans', ...defaultTheme.fontFamily.sans]
      }
    },
  },
  plugins: [],
}
