const markdown = require('./eleventy/markdown');
const toc = require('./eleventy/toc');
const {pathPrefix} = require('./gulp/_config');

module.exports = function (config) {
  // Markdown
  config.setLibrary('md', markdown.lib);
  config.addFilter('markdown', markdown.inline);
  config.addPairedShortcode('markdownFile', markdown.includeMarkdownFile);
  config.addPairedShortcode('markdown', markdown.pairedMarkdown);
  config.addFilter('toc', toc);

  return {
    pathPrefix,
    dir: {
      input: "docs",
      includes: '../src/layouts/',
      output: "dist"
    }
  };
};
