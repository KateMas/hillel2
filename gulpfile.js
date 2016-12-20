var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var uglify = require('gulp-uglifyjs');
var imagemin = require('gulp-imagemin');
var connect = require('gulp-connect-multi')();

//templates
gulp.task('templates', function(){
    gulp.src('./dev/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('./site'))
        .pipe(connect.reload());
});

//styles
gulp.task('styles', function(){
    gulp.src('./dev/sass/style.sass')
        .pipe(sass({
            outputStyle: 'compressed'
            }))
    .pipe(prefix('last 12 version'))
    .pipe(gulp.dest('./site'))
    .pipe(connect.reload());
});

//plugins
gulp.task('plugins', function() {
    return gulp.src(['./node_modules/normalize.css/normalize.css', './node_modules/owl.carousel/dist/assets/owl.carousel.min.css'])
    .pipe(gulp.dest('./site/plugins'))
    .pipe(connect.reload());
});

//scripts
gulp.task('scripts', function(){
    return gulp.src(['./node_modules/jquery/dist/jquery.js', './node_modules/owl.carousel/dist/owl.carousel.min.js', './dev/js/*.js'])
        .pipe(concat('scripts.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./site'))
        .pipe(connect.reload());
});

//images
gulp.task('images', function(){
    gulp.src('./dev/images/*/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./site/images'))
        .pipe(connect.reload());
});

//watch
gulp.task('watch', function () {
    gulp.watch('./dev/*.html', ['templates']);
    gulp.watch('./dev/sass/style.sass', ['styles']);
    gulp.watch('./dev/js/*.js', ['scripts']);
    gulp.watch('images/*.{jpg, png, svg}', ['images']);
});

//connect
gulp.task('connect', connect.server({
    host: '127.0.0.1',
    port: 9090,
    root: ['site'],
    livereload: true,
    open: {
        browser: 'Chrome'
    }
}));

gulp.task('default', ['templates','styles', 'plugins', 'scripts', 'images']);

gulp.task('dev', ['default', 'connect', 'watch']);
