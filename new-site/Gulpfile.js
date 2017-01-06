/**
 * Created by marcoramires on 1/5/17.
 */

var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var sourcemaps   = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var bourbon = require('node-bourbon').includePaths;

// Static Server + watching scss/html files
gulp.task('serve', ['sass', 'styles-vendor', 'styles-plugins', 'js', 'js-plugins', 'js-vendor', 'js-preload'], function() {
    browserSync.init({
        server: ['./', '.tmp']
    });

    gulp.watch("app/sass/*.scss", ['sass']);
    gulp.watch("./*.html").on('change', browserSync.reload);

    // add browserSync.reload to the tasks array to make
    // all browsers reload after tasks are complete.
    gulp.watch("app/js/**/*.js", ['js-watch']);
    gulp.watch("app/styles/**/*.css", ['styles-vendor', 'styles-plugins']);
});

// create a task that ensures the `js` task is complete before
// reloading browsers
gulp.task('js-watch', ['js'], function (done) {
    browserSync.reload();
    done();
});

// process JS files and return the stream.
gulp.task('js', function () {
    return gulp.src(['app/js/**/*.js', '!app/js/vendor/*.js', '!app/js/plugins/*.js'])
        .pipe(concat('main.js'))
        .pipe(gulp.dest('.tmp/scripts'));
});


// process JS files and return the stream.
gulp.task('js-preload', function () {
    return gulp.src(['app/js/vendor/pace.min.js'])
        .pipe(concat('preload.js'))
        .pipe(gulp.dest('.tmp/scripts'));
});

gulp.task('js-plugins', function () {
    return gulp.src(['app/js/plugins/**/*.js'])
        .pipe(concat('plugins.js'))
        .pipe(gulp.dest('.tmp/scripts'));
});

gulp.task('js-vendor', function () {
    return gulp.src(['node_modules/jquery/dist/jquery.js', 'app/js/vendor/vendor.js'])
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('.tmp/scripts'));
});


// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("app/sass/main.scss")
        .pipe(sourcemaps.init())
        .pipe(sass({
            includePaths: bourbon
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('.tmp/styles/'))
        .pipe(browserSync.stream());
});

gulp.task('styles-vendor', function() {
    return gulp.src("app/styles/vendor/*.css")
        .pipe(concat('vendor.css'))
       .pipe(gulp.dest('.tmp/styles/'));
});

gulp.task('styles-plugins', function() {
    return gulp.src("app/styles/plugins/*.css")
        .pipe(concat('plugins.css'))
        .pipe(gulp.dest('.tmp/styles/'));
});

gulp.task('default', ['serve']);