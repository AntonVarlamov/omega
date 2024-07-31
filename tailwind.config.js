/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        errorMessage: '0 0 0 2px rgba(220, 53, 69, 0.2)',
        focusedMessage: '0 0 0 2px #e8dbfd',
      },
    },
  },
  plugins: [],
};
