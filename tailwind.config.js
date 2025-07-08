/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF6B35',
          50: '#FFF4F1',
          100: '#FFE6DE',
          200: '#FFCCBE',
          300: '#FFB19E',
          400: '#FF967E',
          500: '#FF6B35',
          600: '#FF4500',
          700: '#CC3600',
          800: '#992600',
          900: '#661A00',
        },
        secondary: {
          DEFAULT: '#2C3E50',
          50: '#F8F9FA',
          100: '#E9ECEF',
          200: '#CED4DA',
          300: '#ADB5BD',
          400: '#6C757D',
          500: '#2C3E50',
          600: '#243140',
          700: '#1B2530',
          800: '#121920',
          900: '#0A0C10',
        },
        accent: {
          DEFAULT: '#3498DB',
          50: '#F1F8FD',
          100: '#E1F0FB',
          200: '#C3E1F7',
          300: '#A5D2F3',
          400: '#69B5E7',
          500: '#3498DB',
          600: '#2980B9',
          700: '#1F618B',
          800: '#17495C',
          900: '#0E302E',
        },
        success: '#27AE60',
        warning: '#F39C12',
        error: '#E74C3C',
        info: '#3498DB',
      },
      fontFamily: {
        'display': ['Righteous', 'cursive'],
        'body': ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 2px 4px rgba(0, 0, 0, 0.1)',
        'elevated': '0 4px 8px rgba(0, 0, 0, 0.12)',
        'deep': '0 8px 16px rgba(0, 0, 0, 0.15)',
      },
      animation: {
        'count-up': 'countUp 0.8s ease-out forwards',
        'float': 'float 3s ease-in-out infinite',
        'fuel-fill': 'fuelFill 2s ease-in-out infinite',
      },
      keyframes: {
        countUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        fuelFill: {
          '0%, 100%': { transform: 'scaleY(0.8)' },
          '50%': { transform: 'scaleY(1)' },
        },
      },
    },
  },
  plugins: [],
}