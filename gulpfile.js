var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('demo', function () {
  gulp.src('src/js/*.js')
  .pipe(concat('todo.js'))
  .pipe(uglify())
  .pipe(gulp.dest('dist/js/'))
});

gulp.task('styles', function () {
  gulp.src('./src/sass/main.scss')
    .pipe(sass())
    .pipe(gulp.dest('./src/css'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('server', function() {

  browserSync.init({
    server: {
      baseDir: './src'
    }
  });

  gulp.watch('./src/sass/*.scss', ['styles']);
  gulp.watch('./src/**/*.html').on('change', browserSync.reload);

});

gulp.task('default', ['demo','styles','server']);
