var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    watch = require('gulp-watch'),
    sass = require('gulp-sass'),
    livereload = require('gulp-livereload'),
    clean = require('gulp-clean'),
    wait = require('gulp-wait');

gulp.task('minify-css', function () {
    gulp.src('public/css/*.css')
        .pipe(concat('bundle.css'))
        .pipe(gulp.dest('public/dist/'))
});

gulp.task('minify-js', function () {
    gulp.src(['public/js/*.js', '!public/js/gmap.js'])
        .pipe(jshint({
            esnew: true
        }))
        .pipe(uglify())
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest('public/dist/'))
});

gulp.task('minify-js-gmap', function () {
    gulp.src('public/js/gmap.js')
        .pipe(jshint({
            esnew: true
        }))
        .pipe(uglify())
        .pipe(concat('bundle_gmap.js'))
        .pipe(gulp.dest('public/dist/'))
});

gulp.task('sass-edit', function () {
    livereload.listen();
    gulp.watch('public/sass/*.sass', function () {
        gulp.src('public/sass/*.sass')
            .pipe(sass())
            .pipe(gulp.dest('public/css'))

        gulp.src('public/css/*.css')
            .pipe(livereload())
    });
});

gulp.task('sass-compi', function () {
    gulp.src('public/sass/*.sass')
        .pipe(sass())
        .pipe(gulp.dest('public/css'))
    gulp.src('public/css/*.css')
        .pipe(livereload())
});


gulp.task('clean', function () {
    gulp.src('public/dist/bundle.*')
        .pipe(clean())
    gulp.src('public/css/*.css')
        .pipe(clean())
});


gulp.task('run', ['clean', 'sass-compi', 'minify-css', 'minify-js', 'minify-js-gmap']);
// 用法: gulp run