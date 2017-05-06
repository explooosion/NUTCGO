var gulp = require('gulp'),
    sass = require('gulp-sass'),
    watch = require('gulp-watch'),
    livereload = require('gulp-livereload'),
    miniejs = require('gulp-minify-ejs')



gulp.task('wa-sass', function () {
    gulp.watch('public/scss/*.scss', function () {
        gulp.src('public/scss/*.scss')
            .pipe(sass({
                outputStyle: 'compressed'
            }))
            // .pipe(sass())
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

gulp.task('sass', function () {
    gulp.src('public/scss/*.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        // .pipe(sass())
        .pipe(gulp.dest('public/css'))
});

gulp.task('mini-ejs', function () {
    gulp.src('views_ejs/**/*.ejs')
        .pipe(miniejs())
        .pipe(gulp.dest('views'))
});


gulp.task('watch', ['wa-sass', 'wa-ejs']);