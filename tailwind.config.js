/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          900: '#0a0f1e',
          800: '#0d1526',
          700: '#111d35',
          600: '#1a2d4f',
        }
      }
    },
  },
  plugins: [],
}