/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        luxury: {
          50: '#FBF9F6',
          100: '#F6F2EB',
          200: '#EDE6DB',
          300: '#DED4C3',
          400: '#C7B79E',
          500: '#B09B7A',
          600: '#968160',
          700: '#7A674B',
          800: '#594B37',
          900: '#3D3325',
          gold: '#C5A880',
          darkgold: '#9F7C4E',
          charcoal: '#1A1816',
          deep: '#121110',
          stone: '#EFECE6',
          warmgray: '#8C857B',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 8px 30px rgba(0, 0, 0, 0.04)',
        'luxury': '0 20px 40px -15px rgba(26, 24, 22, 0.08)',
        'hover': '0 25px 50px -12px rgba(26, 24, 22, 0.15)',
      }
    },
  },
  plugins: [],
}
