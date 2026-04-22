/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ai: {
          primary: '#3b82f6', // blue-500
          secondary: '#8b5cf6', // violet-500
          accent: '#06b6d4', // cyan-500
          dark: '#0f172a', // slate-900
          light: '#f8fafc', // slate-50
        }
      },
      fontFamily: {
        sans: ['Inter', 'Poppins', 'sans-serif'],
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(59, 130, 246, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(59, 130, 246, 0.9)' },
        }
      }
    },
  },
  plugins: [],
}
