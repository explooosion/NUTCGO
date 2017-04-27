var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat');

gulp.task('minify-css', function () {
    gulp.src('public/css/*.css')
        .pipe(jshint())
        .pipe(concat('bundle.css'))
        .pipe(gulp.dest('public/dist/'))
});

gulp.task('minify-js', function () {
    gulp.src(['public/js/*.js', '!public/js/gmap.js'])
        .pipe(jshint())
        .pipe(uglify())
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest('public/dist/'))
});

gulp.task('minify-js-gmap', function () {
    gulp.src('public/js/gmap.js')
        .pipe(jshint())
        .pipe(uglify())
        .pipe(concat('bundle_gmap.js'))
        .pipe(gulp.dest('public/dist/'))
});


gulp.task('run', ['minify-css', 'minify-js', 'minify-js-gmap']);
// 用法: gulp run