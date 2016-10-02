var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');

var jsVendor = [
    'node_modules/jquery/dist/jquery.js',
    'node_modules/bootstrap-sass/assets/javascripts/bootstrap.js',
];

var cssVendor = [
    'node_modules/purecss/build/menus.css',
];

var sassImports = [
    'node_modules/bootstrap-sass/assets/stylesheets',
];

gulp.task('css:app', function() {
    gulp.src('assets/css/*.{scss,sass}')
        .pipe(sourcemaps.init())
        .pipe(sass({
            includePaths: sassImports,
            outputStyle: 'expanded',
            precision: 8,
        }).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('build/css'));
});

gulp.task('css:vendor', function() {
    gulp.src(cssVendor)
        .pipe(concat('vendor.css'))
        .pipe(gulp.dest('build/css'))
});

gulp.task('css', ['css:app', 'css:vendor']);

gulp.task('js:app', function() {
    gulp.src('assets/js/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['latest'],
        }))
        .pipe(concat('app.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('build/js'));
});

gulp.task('js:vendor', function() {
    gulp.src(jsVendor)
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('build/js'));
});

gulp.task('js', ['js:app', 'js:vendor']);

gulp.task('watch', function() {
    gulp.watch('assets/css/*.{scss,sass}', ['css:app']);
    gulp.watch('assets/js/*.js', ['js:app']);
});

gulp.task('default', ['css:vendor', 'css:app', 'js:vendor', 'js:app']);
