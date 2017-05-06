var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    watch = require('gulp-watch'),
    sass = require('gulp-sass'),
    livereload = require('gulp-livereload'),
    clean = require('gulp-clean'),
    miniejs = require('gulp-minify-ejs'),
    minicss = require('gulp-cssmin');


// clean > sass > run

gulp.task('run', ['bundle-css', 'bundle-js', 'bundle-js-gmap', 'mini-ejs']);

gulp.task('sass-compi', function () {
    gulp.src('public/sass/*.sass')
        .pipe(sass())
        .pipe(gulp.dest('public/css'))
    gulp.src('public/css/*.css')
        .pipe(livereload())
});

gulp.task('clean', function () {
    gulp.src(['public/dist/bundle.*', 'public/dist/bundle_gmap.*', 'public/css/*.css', 'views/**/*.ejs'])
        .pipe(clean())
});

gulp.task('bundle-css', function () {
    gulp.src('public/css/*.css')
        .pipe(concat('bundle.css'))
        .pipe(gulp.dest('public/dist'))
});

gulp.task('bundle-js', function () {
    gulp.src(['public/js/*.js', '!public/js/gmap.js'])
        .pipe(jshint({
            esnew: true
        }))
        .pipe(uglify())
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest('public/dist/'))
});

gulp.task('bundle-js-gmap', function () {
    gulp.src('public/js/gmap.js')
        .pipe(jshint({
            esnew: true
        }))
        .pipe(uglify())
        .pipe(concat('bundle_gmap.js'))
        .pipe(gulp.dest('public/dist/'))
});

gulp.task('mini-ejs', function () {
    gulp.src('views_ejs/**/*.ejs')
        .pipe(miniejs())
        .pipe(gulp.dest('views'))
});


gulp.task('sass-watch', function () {
    livereload.listen();
    gulp.watch('public/sass/*.sass', function () {
        gulp.src('public/sass/*.sass')
            .pipe(sass())
            .pipe(gulp.dest('public/css'))

        gulp.src('public/css/*.css')
            .pipe(livereload())
    });
});
