const { watch, series } = require('gulp');
const { reload } = require('./browser-sync');

const eleventy = require('./eleventy');
const postcss = require('./postcss');

const watcher = cb => {
  // Eleventy files
  watch([
    '.eleventy.js',
    'src/_includes/**/*',
    'docs/**/*',
  ], series(eleventy, reload), cb);

  watch(['src/styles/**/*',], series(postcss, reload), cb);
}

module.exports = watcher;
