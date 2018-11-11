var gulp = require('gulp');
var del = require('del');
var sass = require('gulp-sass');
var babel = require('gulp-babel');
// var watch = require('gulp-watch');
var browserSync = require('browser-sync').create();

gulp.task('default', sass);

gulp.task('clean', function (done) {
    return del(['www/*'], done);
});

gulp.task('styles', function () {
    return gulp.src('./src/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(sass({
            includePaths: require('node-reset-scss').includePath
        }))
        .pipe(gulp.dest('./www/css'))
        .pipe(browserSync.stream());
});

gulp.task('html', function () {
    return gulp.src('./src/html/**/*.html')
        .pipe(gulp.dest('./www/html'))
        .pipe(browserSync.stream());
});

gulp.task('babel', () =>
    gulp.src('src/js/app.js')
        .pipe(babel())
        .pipe(gulp.dest('www/js'))
);
;

gulp.task('watch', function () {
    browserSync.init({
        server: {
            baseDir: "./",
            index: "/www/html/index.html"
        }
    });
    gulp.watch('src/js/*.js', gulp.series('babel'));
    gulp.watch('src/sass/**/*.scss', gulp.series('styles'));
    gulp.watch('src/html/**/*.html', gulp.series('html'));
});

gulp.task('build', gulp.series('clean', gulp.parallel('html','styles', 'babel')));
gulp.task('dev', gulp.series('build', 'watch'))