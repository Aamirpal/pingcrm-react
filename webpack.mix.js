const mix = require('laravel-mix');
const path = require('path');

// THIS IS A TEMPORARY SOLUTION.
const { hmrOptions, devServer } = require('./webpack.fix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.extract();

mix
  .react('resources/js/app.js', 'public/js')
  .babel('public/js/app.js', 'public/js/app-compiled.js')
  .options({
    compact: false,
  })
  .sourceMaps(true, 'source-map');
