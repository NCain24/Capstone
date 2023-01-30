/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.jsx',
    './public/index.html',
    './components/**/*.jsx',
  ],
  theme: {
    extend: {
      backgroundColor: {
  "bg-magenta-500": "red"
      }
    },
  },
  plugins: [],
};
