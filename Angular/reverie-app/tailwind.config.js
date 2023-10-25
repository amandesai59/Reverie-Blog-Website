/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFace: {
        'gt-super': {
          fontFamily: 'gt-super',
          src: 'url("./src/assets/fonts/Web/GT-Super/GT-Super-Display-Bold.woff2") format("woff2")',
          fontWeight: '400',
          fontStyle: 'normal',
        },
      },
    },
  },

  plugins: [],
}
