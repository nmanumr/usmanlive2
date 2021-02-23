module.exports = function (eleventyConfig) {
  eleventyConfig.setUseGitIgnore(false);

  eleventyConfig.addWatchTarget("./_tmp/style.css");

  eleventyConfig.addPassthroughCopy({ "./_tmp/style.css": "./style.css" });
  eleventyConfig.addPassthroughCopy({ "./src/assets/": "./assets" });

  eleventyConfig.addShortcode("version", function () {
    return String(Date.now());
  });

  return {
    dir: {
      input: "src",
      output: "public"
    }
  };
};
