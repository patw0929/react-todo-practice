var gulp = require('gulp'),
    compass = require('gulp-compass'),
    gulpWebpack = require('gulp-webpack'),
    webpack = require('webpack'),
    livereload = require('gulp-livereload'),
    notify = require('gulp-notify');

var live = livereload();
livereload.listen();

var env = 'production'; // development || production

gulp.task('bundle-css', function () {
  gulp.src('./app/assets/sass/*.scss')
    .pipe(compass({
        style: 'compressed',
        comments: false,
        css: './build/assets/css',
        sass: './app/assets/sass',
        image: './build/assets/images',
        font: './build/assets/fonts',
        import_path: [
          'bower_components/meyer-reset/stylesheets'
        ]
    }))
    .on('error', function (err){
        console.log('[錯誤]', err);
        this.end();
        gulp.src('').pipe(notify('✖ CSS Bundle Failed ✖'));
    })
    .pipe(gulp.dest('static/assets/business/css'));
});

gulp.task('bundle-js', function () {
  gulp.src('./app/js/boot.js')
      .pipe(gulpWebpack(require('./webpack.config.js')))
      .on('error', function (err){
          console.log('[錯誤]', err);
          this.end();
          gulp.src('').pipe(notify('✖ Javascript Bundle Failed ✖'));
      })
      .pipe(gulp.dest('./build'));
});

gulp.task('copy', function () {
  return gulp.src(['app/index.html'], { base: 'app' })
             .pipe(gulp.dest('./build'));
});

gulp.task('watch', function () {
  gulp.watch('./app/**/*', ['bundle-js', 'bundle-css', 'copy', 'refresh']);
});

gulp.task('refresh', function () {
  setTimeout(function () {
    live.changed('');
  }, 500);
});

gulp.task('default', ['dev']);

gulp.task('dev', ['bundle-js', 'bundle-css', 'copy', 'watch']);

