/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#00FF41', // Matrix green
        },
        background: {
          DEFAULT: '#0a0a0a', // Deep black
        },
        surface: {
          DEFAULT: '#111', // Slightly lighter black for surfaces
        },
        accent: {
          DEFAULT: '#00b894', // Accent green
        },
      },
    },
  },
  plugins: [],
};
