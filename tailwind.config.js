/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        diwali: {
          gold: '#f59e0b',
          amber: '#d97706',
          saffron: '#ea580c',
          marigold: '#fbbf24',
          night: '#0d0714',
          card: '#180d26',
        },
      },
    },
  },
  plugins: [],
};
