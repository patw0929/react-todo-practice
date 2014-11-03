var gulp = require('gulp'),
    gulpWebpack = require('gulp-webpack'),
    webpack = require('webpack'),
    livereload = require('gulp-livereload');

var live = livereload();
livereload.listen();

var env = 'production'; // development || production

gulp.task('bundle-js', function () {
  gulp.src('./app/js/boot.js')
      .pipe(gulpWebpack(require('./webpack.config.js')))
      .pipe(gulp.dest('./build'));
});

gulp.task('copy', function () {
  return gulp.src(['app/index.html'], { base: 'app' })
             .pipe(gulp.dest('./build'));
});

gulp.task('watch', function () {
  gulp.watch('./app/**/*', ['bundle-js', 'copy', 'refresh']);
});

gulp.task('refresh', function () {
  setTimeout(function () {
    live.changed('');
  }, 500);
});

gulp.task('default', ['dev']);

gulp.task('dev', ['bundle-js', 'copy', 'watch']);

