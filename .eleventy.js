const htmlmin = require("html-minifier");
const markdownIt = require("markdown-it");
const mdFigcaption = require("markdown-it-image-figures");
const { EleventyRenderPlugin } = require("@11ty/eleventy");
const EleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const now = String(Date.now());

const SITE_TITLE = "Bosnia International Servant Trip";

let figoptions = {
  figcaption: true,
};

const mdLib = markdownIt({}).use(mdFigcaption, figoptions);

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(EleventyRenderPlugin);
  eleventyConfig.addPlugin(EleventyNavigationPlugin);
  eleventyConfig.setUseGitIgnore(false);

  eleventyConfig.addWatchTarget("./styles/tailwind.config.js");
  eleventyConfig.addWatchTarget("./styles/tailwind.pcss");

  eleventyConfig.addPassthroughCopy({ "./_tmp/style.css": "./style.css" });
  eleventyConfig.addPassthroughCopy("./assets");
  eleventyConfig.addPassthroughCopy({ "./src/admin": "./admin" });

  eleventyConfig.addShortcode("version", function () {
    return now;
  });

  eleventyConfig.addTransform("htmlmin", function (content, outputPath) {
    if (
      process.env.ELEVENTY_PRODUCTION &&
      outputPath &&
      outputPath.endsWith(".html")
    ) {
      return htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      });
    }
    return content;
  });

  eleventyConfig.addPassthroughCopy({
    "./node_modules/alpinejs/dist/cdn.js": "./js/alpine.js",
  });

  eleventyConfig.addNunjucksFilter("niceDate", (value) => {
    return new Date(value).toLocaleString("en-US", { month: "long", day: "numeric", year: "numeric" });
  });

  eleventyConfig.addFilter("sortByIndex", (value) => {
    value.sort((a, b) => a.data.index - b.data.index);
    return [...value];
  });

  eleventyConfig.addFilter("sortByOrder", (value) => {
    return value.sort((a, b) => a.data.order - b.data.order);
    // console.log('sorted' + newList.map(item => item.data.order))
    // return newList;
  });

  eleventyConfig.addFilter("removeHidden", (value) => {
    return value.filter((item) => !item.data.hidden);
  });

  eleventyConfig.addFilter("appendSiteTitle", (value) => {
    if (value.includes(SITE_TITLE)) {
      return value;
    } else {
      return `${value} | ${SITE_TITLE}`;
    }
  });

  eleventyConfig.setLibrary("md", mdLib);

  eleventyConfig.addCollection("ministryFilteredSorted", function (collectionApi) {
    return collectionApi
      .getFilteredByTag("ministry")
      .filter(item => !item.data.hidden)
      .sort((a, b) => a.data.order - b.data.order);
  });

  return {
    dir: {
      input: "src",
    },
  };
};

