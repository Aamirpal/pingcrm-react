const mix = require('laravel-mix');
const webpack = require('webpack');
require('dotenv').config();

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

if (process.env.APP_ENV === 'local') {
  mix
    .react('resources/assets/js/app.js', 'public/js/app-compiled.js')
    .webpackConfig({ devtool: 'inline-source-map' });
} else {
  mix
    .react('resources/assets/js/app.js', 'public/js')
    .babel('public/js/app.js', 'public/js/app-compiled.js')
    .options({
      compact: false,
    })
    .sourceMaps(true, 'source-map');
}

const envVariables = new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
    ROLLBAR_CLIENT_ACCESS_TOKEN: JSON.stringify(process.env.ROLLBAR_CLIENT_ACCESS_TOKEN),
    PUSHER_APP_CLUSTER: JSON.stringify(process.env.PUSHER_APP_CLUSTER),
  },
});

mix.webpackConfig({
  plugins: [
    envVariables,
  ],
});

// Note[TomekKosakowski] Copy all images from assets to public directory and version them in order to cache boost.
mix.copy('resources/assets/js/images/*', 'public/images').version();
mix.copy('resources/assets/js/images/name_initials/*', 'public/images/name_initials').version();
mix.copy('resources/assets/js/images/name_initials/backup/*', 'public/images/name_initials/backup').version();
mix.copy('resources/assets/js/images/v2-images/*', 'public/images/v2-images').version();
mix.copy('resources/assets/js/images/v2-images/attachment-icons/*', 'public/images/v2-images/attachment-icons').version();
mix.copy('resources/assets/js/images/v2-images/small_category/*', 'public/images/v2-images/small_category').version();
mix.copy('resources/assets/js/images/feedback_email_template/*', 'public/images/feedback_email_template').version();
mix.copy('resources/assets/js/images/banner/*', 'public/images/banner').version();

mix.sass('resources/assets/sass/app.scss', 'public/css/v2');

mix
  .styles(
    [
      'public/css/bootstrap.min.css',
      'public/css/bootstrap-select.css',
      'public/css/font-awesome.min.css',
      'public/css/bootstrap-multiselect.css',
      'public/css/bootstrap-tour.min.css',
      'public/css/sweetalert2(6.6.9).min.css',
      'public/css/style.css',
      'public/css/feed.css',
    ],
    'public/css/main_compiled.css',
  )
  .version();

mix
  .styles(
    ['public/css/v2/app.css', 'public/css/v2/jquery.mCustomScrollbar.min.css'],
    'public/css/main_compiled_v2.css',
  )
  .version();

mix
  .scripts(
    [
      'public/js/modular_polyfill_standard.js',
      'public/js/bootstrap.min.js',
      'public/js/custom/circlos.js',
      'public/js/bootstrap-select.js',
      'public/js/autosize.js',
      'public/js/jquery.ns-autogrow.min.js',
      'public/js/bootstrap-tour.min.js',
      'public/js/search.js',
      'public/js/w3autosize.js',
      'public/js/jquery.cookie.js',
      'public/js/custom/generic.js',
      'public/js/custom/common.js',
      'public/js/custom/logger.js',
      'public/js/custom/file_view.js',
      'public/js/custom/community_member_module.js',
      'public/js/sweetalert2(6.6.9).min.js',
    ],
    'public/js/compiled/main_compiled.js',
  )
  .version();

mix
  .scripts(
    [
      'public/js/custom/v2/popper.min.js',
      'public/js/custom/v2/bootstrap.min.js',
      'public/js/autosize.js',
      'public/js/w3autosize.js',
      'public/js/custom/v2/feedpage.js',
      'public/js/search.js',
      'public/js/custom/v2/jquery.mCustomScrollbar.min.js',
      'public/js/custom/v2/generic_v2.js',
      'public/js/custom/logger.js',
      'public/js/handle_bar.js',
      'public/js/custom/v2/invite.js',
      'public/js/custom/v2/welcome_tour.js',
    ],
    'public/js/compiled/main_compiled-v2.js',
  )
  .version();
mix
  .scripts(
    ['public/js/app-compiled.js'],
    'public/js/compiled/react_compiled-v2.js',
  )
  .version();
