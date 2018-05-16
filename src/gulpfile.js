var gulp = require('gulp'),
    sassLint = require('gulp-sass-lint'),
    sass = require('gulp-sass');

gulp.task('sass', function() {
    gulp.src('sass/**/*.s+(a|c)ss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('css/'));
});

gulp.task('default', ['sass'], function() {
    gulp.watch('sass/**/*.s+(a|c)ss', ['sass']);
    return gulp.src('sass/**/*.s+(a|c)ss')
        .pipe(sassLint())
        .pipe(sassLint.format())
        .pipe(sassLint.failOnError());
});