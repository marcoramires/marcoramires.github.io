/**
 * Created by marcoramires on 1/5/17.
 */

var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');

// Static Server + watching scss/html files
gulp.task('serve', ['sass', 'js'], function() {
    browserSync.init({
        server: ['./', '.tmp']
    });

    gulp.watch("app/scss/*.scss", ['sass']);
    gulp.watch("app/*.html").on('change', browserSync.reload);

    // add browserSync.reload to the tasks array to make
    // all browsers reload after tasks are complete.
    gulp.watch("app/js/*.js", ['js-watch']);
});

// create a task that ensures the `js` task is complete before
// reloading browsers
gulp.task('js-watch', ['js'], function (done) {
    browserSync.reload();
    done();
});

// process JS files and return the stream.
gulp.task('js', function () {
    return gulp.src('app/js/*js')
        .pipe(gulp.dest('.tmp/'));

    //TODO: concat files
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("app/scss/*.scss")
        .pipe(sass())
        .pipe(gulp.dest('.tmp/'))
        .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);