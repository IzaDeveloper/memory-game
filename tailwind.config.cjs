/** @type {import('tailwindcss').Config} */
module.exports = {
  node: 'jit', 
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        atelie: {
          '500': '#ffe600'
        }
      }
    },
  },
  plugins: [],
}
