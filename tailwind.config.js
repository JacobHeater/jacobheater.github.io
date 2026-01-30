import defaultTheme from 'tailwindcss/defaultTheme';
import typography from '@tailwindcss/typography';

const { fontFamily } = defaultTheme;

const config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'selector',
  theme: {
    extend: {
      fontFamily: {
        cursive: ['League Script', 'cursive', ...fontFamily.sans],
      },
    },
  },
  plugins: [typography],
};

export default config;
