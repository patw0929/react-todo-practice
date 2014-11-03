var gulp = require('gulp'),
    gulpWebpack = require('gulp-webpack'),
    webpack = require('webpack');

var env = 'production'; // development || production

gulp.task('bundle-js', function () {
  gulp.src('./app/js/boot.js')
      .pipe(gulpWebpack(require('./webpack.config.js')))
      .pipe(gulp.dest('./build'));
});

