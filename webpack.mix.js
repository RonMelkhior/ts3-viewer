const { mix } = require('laravel-mix');

mix
.js('assets/js/vendor.js', 'public/js')
.js('assets/js/app.js', 'public/js')
.sass('assets/sass/vendor.scss', 'public/css')
.sass('assets/sass/app.scss', 'public/css');
