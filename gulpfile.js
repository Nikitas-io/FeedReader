/*eslint-env node */

const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const rename = require('gulp-rename');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');

browserSync.stream();

gulp.task('default', function () {
    gulp.watch('sass/**/*.scss', gulp.series('styles'));
    gulp.watch('js/**/*.js', gulp.series('lint'));
    // Watch for changes in the dist/index file and auto-reload when they happen.
    gulp.watch('./index.html').on('change', browserSync.reload);

    browserSync.init({
        server: "./"
    });
});

gulp.task('styles', function () {
    return gulp.src('sass/**/*.scss')
        //Compresses Sass files and loggs errors in case there are any.
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(gulp.dest('./css'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

//Minify all JS files from the js folder into the allJS file.
gulp.task('app-dist', function () {
    return gulp.src('js/app.js')
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(rename("app.min.js"))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./js'));
});

//Production ready version task
gulp.task('dist', gulp.series( //Run the tasks in paraller.
    'styles',
    'app-dist'
));