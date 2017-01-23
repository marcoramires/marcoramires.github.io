/**
 * Created by marcoramires on 1/5/17.
 */

var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var sourcemaps   = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var bourbon = require('node-bourbon').includePaths;
var replace = require('gulp-replace');

// Static Server + watching scss/html files
gulp.task('serve', ['sass', 'styles-vendor', 'styles-plugins', 'js', 'js-plugins', 'js-vendor', 'js-preload', 'app-data'], function() {
    browserSync.init({
        server: ['./', './app', '.tmp']
    });

    gulp.watch("app/sass/*.scss", ['sass']);
    gulp.watch("./*.html").on('change', browserSync.reload);

    // add browserSync.reload to the tasks array to make
    // all browsers reload after tasks are complete.
    gulp.watch("app/js/**/*.js", ['js-watch']);
    gulp.watch("app/layout/**/*.js", ['js-watch']);
    gulp.watch("app/styles/**/*.css", ['styles-vendor', 'styles-plugins']);
});

gulp.task('serve-dist', function() {
    browserSync.init({
        server: ['.build']
    });
});

// create a task that ensures the `js` task is complete before
// reloading browsers
gulp.task('js-watch', ['js'], function (done) {
    browserSync.reload();
    done();
});

// process JS files and return the stream.
gulp.task('js', function () {
    return gulp.src(['app/js/**/*.js', 'app/layout/*.controller.js', 'app/js/services/*.service.js', '!app/js/vendor/*.js', '!app/js/plugins/*.js'])
        .pipe(concat('main.js'))
        .pipe(gulp.dest('.tmp/scripts'));
});

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
    return gulp.src(['node_modules/jquery/dist/jquery.js', 'app/js/vendor/vendor.js', 'node_modules/angular/angular.js', 'node_modules/angular-ui-router/release/angular-ui-router.js', 'node_modules/oclazyload/dist/ocLazyLoad.js', 'node_modules/angular-google-analytics/dist/angular-google-analytics.min.js'])
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('.tmp/scripts'));
});

gulp.task('app-data', function () {
    return gulp.src('app/data/**/*')
        .pipe(gulp.dest('.tmp/data'));
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

gulp.task('layouts', function() {
    return gulp.src("app/layout/**/*.html")
        .pipe(gulp.dest('../dist/layout'));
});

gulp.task('default', ['serve']);

// Prepare Images and fonts
gulp.task('images', function () {
    return gulp.src(['app/images/**/*', '!app/images/demo/**/*'])
        .pipe(gulp.dest('.tmp/images'));
});

gulp.task('fonts', function () {
    return gulp.src('app/fonts/**/*')
        .pipe(gulp.dest('.tmp/fonts'));
});

// Deployment task
gulp.task('build-dist', ['sass', 'styles-vendor', 'styles-plugins', 'js', 'js-plugins', 'js-vendor', 'js-preload', 'images', 'fonts', 'app-data'], function() {
    gulp.src(['.tmp/**/*', '!.tmp/images/demo/'])
        .pipe(gulp.dest('.dist/'));
});

gulp.task('replace-dist', function () {
    gulp.src(['.dist/scripts/main.js'])
        .pipe(replace('layout', '/dist/layout'))
        .pipe(replace('data/app', '/dist/data/app'))
        .pipe(replace('\'sandbox\'', '\'production\''))
        .pipe(gulp.dest('.build/dist/scripts/'));

    gulp.src(['app/layout/*.html'])
        .pipe(replace('images/site/', 'https://marcoramires.imgix.net/'))
        .pipe(gulp.dest('.build/dist/layout/'));

    gulp.src(['index.html'])
        .pipe(replace('scripts', 'dist/scripts'))
        .pipe(replace('styles/', 'dist/styles/'))
        .pipe(gulp.dest('.build/'));


});

gulp.task('build-release', ['replace-dist'], function () {
    gulp.src(['.dist/**/*', '!.dist/scripts/main.js'])
        .pipe(gulp.dest('.build/dist/'));
});

gulp.task('build-commit', ['replace-dist'], function () {
    gulp.src(['.build/**/*'])
        .pipe(gulp.dest('../'));
});


