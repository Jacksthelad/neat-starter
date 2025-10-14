// postcss.config.js (ESM)
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
// Optional: minify in production
// import cssnano from "cssnano";

export default {
  plugins: [
    tailwindcss(),
    autoprefixer(),
    // ...(process.env.NODE_ENV === "production" ? [cssnano()] : []),
  ],
};
