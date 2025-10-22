// eleventy.config.js (ESM)
import yaml from "js-yaml";
import { DateTime } from "luxon";
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import htmlmin from "html-minifier";
import Image from "@11ty/eleventy-img";
import path from "path";
import { fileURLToPath } from "url";
import pluginSitemap from "@quasibit/eleventy-plugin-sitemap";
import UpgradeHelper from "@11ty/eleventy-upgrade-help";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function imageShortcode(src, alt, sizes, opts = {}) {
  if (!alt) throw new Error(`Missing \`alt\` for image: ${src}`);

  const fullSrc = path.join(
    __dirname,
    "src/assets/images",
    src.replace(/^assets\/images\//, "")
  );

  const metadata = await Image(fullSrc, {
    widths: [300, 600, 900, 1200, 1800],
    formats: ["avif", "webp", "jpeg"],
    urlPath: "/assets/images/",
    outputDir: "./_site/assets/images/",
  });

  const attributes = {
    alt,
    sizes,
    loading: "lazy",
    decoding: "async",
    // allow passing any HTML attributes like class, fetchpriority, etc.
    ...opts,
  };

  return Image.generateHTML(metadata, attributes);
}

export default function(eleventyConfig) {
  eleventyConfig.setUseGitIgnore(false);
  eleventyConfig.setDataDeepMerge(true);

  eleventyConfig.addFilter("readableDate", (dateObj) =>
    DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("dd LLL yyyy")
  );

  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addDataExtension("yaml", (contents) => yaml.load(contents));

  eleventyConfig.addPassthroughCopy({
    "./src/admin/config.yml": "./admin/config.yml",
    "./src/assets/images": "./assets/images",
    "./src/assets/js": "./assets/js",
    "./src/favicon.ico": "./favicon.ico",
    "./node_modules/alpinejs/dist/cdn.min.js": "./static/js/alpine.js",
    "./node_modules/prismjs/themes/prism-tomorrow.css": "./static/css/prism-tomorrow.css",
  });

  eleventyConfig.addTransform("htmlmin", function (content) {
    if (
      this.page.outputPath?.endsWith(".html") &&
      process.env.NODE_ENV === "production"
    ) {
      return htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      });
    }
    return content;
  });

  eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);
  eleventyConfig.addLiquidShortcode("image", imageShortcode);
  eleventyConfig.addJavaScriptFunction("image", imageShortcode);

  eleventyConfig.addPlugin(pluginSitemap, {
    sitemap: { hostname: "https://theslowworms.com" },
  });

  eleventyConfig.addPlugin(UpgradeHelper);

  return {
    dir: {
      input: "src",
      includes: "_includes",
      layouts: "_includes",
    },
    htmlTemplateEngine: "njk",
  };
}
