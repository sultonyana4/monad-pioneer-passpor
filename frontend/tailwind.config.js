/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'],
      },
      colors: {
        background: '#0D1117',
        'text-primary': '#E6EDF3',
        'text-secondary': '#8B949E',
        accent: '#58A6FF',
      },
    },
  },
  plugins: [],
}
