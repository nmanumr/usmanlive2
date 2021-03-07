const { series, parallel } = require('gulp')
const clean = require('./gulp/clean')
const eleventy = require('./gulp/eleventy')
const postcss = require('./gulp/postcss')
const { jsDevelopment, jsProduction } = require('./gulp/rollup')
const watch = require('./gulp/watch')
const { browserSync } = require('./gulp/browser-sync')

exports.clean = clean
exports.eleventy = eleventy
exports.jsdev = jsDevelopment
exports.jsprod = jsProduction
exports.serve = browserSync

exports.default = series(
    clean,
    eleventy,
    postcss,
    parallel(jsDevelopment, browserSync, watch),
)

exports.build = series(
    clean,
    jsProduction,
    eleventy,
    postcss,
)
