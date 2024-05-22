/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        'regrade': ['"NeueRegrade"', 'sans-serif']  /* Replace 'YourFontName' with your font name */
      },
      colors: {
        primary: {
          100: "#F8F3F1",
          300: "#CAC1BD",
          900: "#121111",
        },

      },
    },
  },
  plugins: [],
}

