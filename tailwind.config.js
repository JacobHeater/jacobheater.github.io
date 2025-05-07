const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}', // Corrected
  ],
  theme: {
    extend: {
      fontFamily: {
        cursive: ['League Script', 'cursive', ...fontFamily.sans],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
