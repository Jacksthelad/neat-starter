module.exports = {
  content: ["./**/*.html"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        'primary': '#02B0AF',
        'secondary': '#FE3C07',
        'tertiary': '#F8A585',
        'background': '#EEDBCC',
        'text': '#362420',
      },
      boxShadow: {
        '3xl': '0.25rem 0.25rem #362420',
      },
      borderRadius: {
        '4xl': '3rem',
      },
    },
  },
  variants: {},
  plugins: [require("@tailwindcss/typography")],
};
