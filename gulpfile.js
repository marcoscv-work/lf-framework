var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var gulp = require('gulp');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var runSequence = require('run-sequence').use(gulp);

gulp.task('build:css', function() {
    gulp.src('scss/**/*.scss')
        .pipe(sass({includePaths: require('node-bourbon').includePaths}).on('error', sass.logError))
        .pipe(gulp.dest('./css/'))
});

gulp.task('autoprefixer', function () {
    var plugins = [
        autoprefixer({browsers: ['last 1 version']}),
        cssnano()
    ];
    return gulp.src('css/**/.css')
        .pipe(postcss(plugins))
        .pipe(gulp.dest('css'));
});

gulp.task('build',function() {
	runSequence('build:css', 'autoprefixer')
});

gulp.task('watch',function() {
    gulp.watch('scss/**/*.scss',['build']);
});

gulp.task('default',function() {
	runSequence('watch')
});