/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#D4A574',
        secondary: '#F5E6D3',
        accent: '#C1666B',
        background: '#FFF9F5',
        surface: '#FFFFFF',
        success: '#7CAA2D',
        warning: '#E8A435',
        error: '#D1495B',
        info: '#6B9AC4'
      },
      fontFamily: {
        'display': ['Playfair Display', 'serif'],
        'body': ['Inter', 'sans-serif']
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem'
      },
      scale: {
        '102': '1.02'
      }
    },
  },
  plugins: [],
}