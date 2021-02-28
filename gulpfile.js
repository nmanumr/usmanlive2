const { series, parallel } = require('gulp')
const clean = require('./gulp/clean')
const eleventy = require('./gulp/eleventy')
const postcss = require('./gulp/postcss')
const { jsDevelopment, jsProduction } = require('./gulp/rollup')
// const imagemin = require('./gulp/imagemin')
// const pdfs = require('./gulp/pdfs')
const watch = require('./gulp/watch')
const { browserSync } = require('./gulp/browser-sync')
// const rev = require('./gulp/rev')

exports.clean = clean
exports.eleventy = eleventy
exports.jsdev = jsDevelopment
exports.jsprod = jsProduction
// exports.imagemin = imagemin
// exports.pdfs = pdfs
exports.serve = browserSync
// exports.rev = rev

exports.default = series(
    clean,
    eleventy,
    postcss,
    parallel(jsDevelopment, browserSync, watch),
    // parallel(sass, eleventy, imagemin),
)

exports.build = series(
    clean,
    jsProduction,
    eleventy,
    postcss,
    // parallel(sass, imagemin, jsProduction, pdfs),
    // rev,
    // eleventy,
    // pdfs,
)
