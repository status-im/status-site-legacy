var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    concat = require('gulp-concat'),
    autoprefixer = require('gulp-autoprefixer'),
    rename = require('gulp-rename'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    plumber = require('gulp-plumber'),
    newer = require('gulp-newer'),
    del = require('del'),
    cleanCSS = require('gulp-clean-css'),
    uncss = require('gulp-uncss'),
    uglify = require('gulp-uglify'),
    useref = require('gulp-useref'),
    neat = require('node-neat').includePaths;

gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: 'src'
    },
    notify: false
  });
});

gulp.task('styles', function() {
  return gulp.src('src/sass/main.scss')
    .pipe(plumber())
    .pipe(sass({
		includePaths: ['styles'].concat(neat)
	}))
    //.pipe(uncss({ html: '*.html' }))
    .pipe(autoprefixer({ browsers: ['last 15 versions', '> 1%', 'ie 9'], cascade: true }))
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('scripts', function() {
  return gulp.src([
    'src/libs/jquery/dist/jquery.min.js',
    'src/libs/modernizr/modernizr-custom.js',
    'src/libs/waypoints/waypoints.min.js'
    ])
    .pipe(plumber())
    .pipe(concat('libs.min.js'))
    //.pipe(uglify())
    .pipe(gulp.dest('src/js'));
});

gulp.task('watch', ['styles', 'scripts', 'browser-sync'], function() {
  gulp.watch('src/sass/**/*.+(sass|scss)', ['styles']);
  gulp.watch('src/*.html', browserSync.reload);
  gulp.watch('src/js/**/*.js', browserSync.reload);
});

gulp.task('clean', function() {
  return del.sync('build');
});

gulp.task('images', function() {
  return gulp.src('src/img/**/*')
    //.pipe(newer('build/img'))
    .pipe(plumber())
    .pipe(imagemin({
      interlaced: true,
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    }))
    .pipe(gulp.dest('build/img'));
});

gulp.task('build', ['clean', 'styles', 'scripts', 'images'], function() {

  gulp.src([
    'src/css/main.css'
    ])
  //.pipe(uncss({ html: '*.html' }))
  .pipe(cleanCSS({compatibility: 'ie9'}))
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest('build/css'));

  // gulp.src('src/fonts/**/*')
  // .pipe(gulp.dest('build/fonts'))

  gulp.src([
    'src/js/libs.min.js',
    'src/js/common.js'
    ])
  .pipe(concat('main.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest('build/js'));

  gulp.src('src/*.html')
  .pipe(useref({noAssets:true}))
  .pipe(gulp.dest('build'));

  gulp.src('src/*.php')
  .pipe(useref({noAssets:true}))
  .pipe(gulp.dest('build'));

});

gulp.task('default', ['watch']);
