/* PostCSS config (CommonJS) to avoid ESM require errors on Netlify */
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    ...(isProd ? [require('cssnano')] : []),
  ],
};
