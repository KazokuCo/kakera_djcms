var gulp = require('gulp');
var sass = require('gulp-sass');
var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('styles', function() {
    gulp.src('assets/css/*.{scss,sass}')
        .pipe(sourcemaps.init())
        .pipe(sass({
            includePaths: [
                'node_modules/bootstrap-sass/assets/stylesheets',
            ],
            outputStyle: 'expanded',
            precision: 8,
        }).on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('build/css'));
});

gulp.task('scripts', function() {
    gulp.src('assets/js/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['latest'],
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('build/js'));
});

gulp.task('watch', function() {
    gulp.watch('assets/css/*.{scss,sass}', ['styles']);
    gulp.watch('assets/js/*.js', ['scripts']);
});

gulp.task('default', ['styles', 'scripts']);
