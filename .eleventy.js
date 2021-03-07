const markdown = require('./eleventy/markdown');
const toc = require('./eleventy/toc');

module.exports = function (config) {
  // Markdown
  config.setLibrary('md', markdown.lib);
  config.addFilter('markdown', markdown.inline);
  config.addPairedShortcode('markdownFile', markdown.includeMarkdownFile);
  config.addPairedShortcode('markdown', markdown.pairedMarkdown);
  config.addFilter('toc', toc);

  return {
    dir: {
      input: "docs",
      includes: '../src/layouts/',
      output: "dist"
    }
  };
};
