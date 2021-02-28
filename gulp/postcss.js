const gulp = require('gulp')
const size = require('gulp-size')
const postcss = require('gulp-postcss');
const path = require('path');

const { input, output } = require('./_config')

const src = path.join(input, 'styles/tailwind.css');
const dest = path.join(output, '/css');

const css = cb => {
  return gulp.src(src)
      .pipe(postcss())
      .pipe(size({ title: 'styles' }))
      .pipe(gulp.dest(dest))
}

module.exports = css
