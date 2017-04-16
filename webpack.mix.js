const { mix } = require('laravel-mix');

mix
.js('assets/js/vendor.js', 'public/js')
.js('assets/js/app.js', 'public/js')
.sass('assets/sass/vendor.sass', 'public/css')
.sass('assets/sass/app.sass', 'public/css')
.copyDirectory('assets/img', 'public/img');
