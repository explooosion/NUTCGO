var gulp = require('gulp'),
    concat = require('gulp-concat'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    watch = require('gulp-watch'),
    livereload = require('gulp-livereload'),
    jsmin = require('gulp-jsmin'),
    miniejs = require('gulp-minify-ejs'),
    minicss = require('gulp-cssmin'),
    clean = require('gulp-clean');


gulp.task('wa-sass', function () {
    gulp.watch('public/scss/*.scss', function () {
        gulp.src('public/scss/*.scss')
            // .pipe(sass({
            //     outputStyle: 'compressed'
            // }))
            .pipe(sass())
            .pipe(gulp.dest('public/css'))
    });
});

gulp.task('wa-ejs', function () {
    gulp.watch('views_ejs/**/*.ejs', function () {
        gulp.src('views_ejs/**/*.ejs')
            .pipe(miniejs())
            .pipe(gulp.dest('views'))
    });
});

gulp.task('ex-sass', function () {
    gulp.src('public/scss/*.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(gulp.dest('public/css'))

    gulp.src('public/css/*.css')
        .pipe(concat('bundle.css'))
        .pipe(minicss())
        .pipe(gulp.dest('public/dist'))
});


gulp.task('ex-js', function () {
    gulp.src(['public/js/*.js', '!public/js/*map*.js'])
        .pipe(jshint({
            esnew: true
        }))
        .pipe(concat('bundle.js'))
        .pipe(jsmin())
        .pipe(uglify())
        .pipe(gulp.dest('public/dist/'))
});

gulp.task('ex-js-map', function () {
    gulp.src('public/js/*map*.js')
        .pipe(jshint({
            esnew: true
        }))
        .pipe(concat('bundle.gmap.js'))
        .pipe(jsmin())
        .pipe(uglify())
        .pipe(gulp.dest('public/dist/'))
});

gulp.task('mini-ejs', function () {
    gulp.src('views_ejs/**/*.ejs')
        .pipe(miniejs())
        .pipe(gulp.dest('views'))
});


gulp.task('clean', function () {
    gulp.src(['public/dist/bundle*.*', 'views/**/*.ejs'])
        .pipe(clean())
});

gulp.task('watch', ['wa-sass', 'wa-ejs']);

gulp.task('ex-all', ['ex-sass', 'ex-js', 'ex-js-map', 'mini-ejs']);