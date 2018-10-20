var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('sass', function() {
    return gulp.src("public/assets/scss/styles.scss")
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer({browsers: ['last 2 versions']}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('public/assets/css'));
});

gulp.task('default', ['sass']);
