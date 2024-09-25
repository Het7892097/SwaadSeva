/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
    'node_modules/preline/dist/*.js',
  ],
  daisyui: {
    themes: ["light"],
    base: false,
  },
  theme: {
    extend: {
      fontSize: {
        'xs': '0.75rem',  // 12px
        'sm': '0.875rem', // 14px
        'base': '1rem',   // 16px
        'lg': '1.125rem', // 18px
        'xl': '1.25rem',  // 20px
        '2xl': '1.5rem',  // 24px
      },
    },
  },
  plugins: [
    require('daisyui'),
    require('preline/plugin'),
  ],
}