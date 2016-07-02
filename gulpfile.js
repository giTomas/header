var gulp         = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var browserSync  = require('browser-sync');
var pug          = require('pug');
var gulpPug      = require('gulp-pug');
var prettify     = require('gulp-js-prettify');
var sass         = require('gulp-sass');



gulp.task('sass', function () {
    return gulp.src('sass/main.scss')
        .pipe(sass({
            includePaths: ['css']
        }))
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8'], { cascade: true }))
        .pipe(gulp.dest('production'))
        .pipe(gulp.dest('sass'));
});

gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: 'production'
        }
    });
});

gulp.task('pug', function(){
  return gulp.src('views/*.pug')
    .pipe(gulpPug({
      pug: pug,
      pretty: true
    }))
    .pipe(gulp.dest('production'))
});

/*
gulp.task('prettify', function(){
  gulp.src('js/*.js')
    .pipe(prettify({collapseWhitespace: true}))
    .pipe(gulp.dest('production/js'))
 });*/

gulp.task('watch', ['browserSync'], function(){
  gulp.watch('assets/css/*.css', ['styles']);
  gulp.watch('views/*.pug', ['pug']);
  //gulp.watch('js/*.js', ['prettify']);
  gulp.watch('production/**', browserSync.reload);
  gulp.watch('assets/css/*.sass', ['sass']);
});

gulp.task('default', ['browserSync', 'watch']);
