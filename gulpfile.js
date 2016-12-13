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
    useref = require('gulp-useref'),
    //more
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    gutil = require('gulp-util'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    babel = require('gulp-babel');

gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: 'src'
    },
    notify: false
  });
});


gulp.task('styles', function () {
  return gulp.src('src/scss/main.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(autoprefixer({
			browsers: ['last 3 versions'],
			cascade: false
		}))
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.reload({stream: true}));
})

gulp.task('scripts', function() {
  return gulp.src([
    'src/libs/swiper/js/swiper.min.js',
    ])
    .pipe(plumber())
    .pipe(concat('libs.min.js'))
    .pipe(gulp.dest('src/js'));
});

gulp.task('js', function () {
  var b = browserify({
    entries: 'src/js/main.js',
    debug: false,
  })
  return b.bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(sourcemaps.init())
        .pipe(uglify())
        .on('error', gutil.log)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('src/js'))
})

gulp.task('watch', ['styles', 'js', 'browser-sync'], function() {
  gulp.watch('src/sass/**/*.+(sass|scss)', ['styles']);
  gulp.watch('src/*.html', browserSync.reload);
  gulp.watch('src/js/**/*.js', browserSync.reload);
});

gulp.task('clean', function() {
  return del.sync('build');
});

gulp.task('images', function() {
  return gulp.src('src/img/**/*')
    .pipe(plumber())
    .pipe(gulp.dest('build/img'));
});

gulp.task('demo', function() {
  gulp.src(['src/demo/**/*'])
    .pipe(gulp.dest('build/demo'))
});

gulp.task('dapps', function() {
  gulp.src(['src/dapps/**/*'])
    .pipe(gulp.dest('build/dapps'))
});

gulp.task('build', ['clean', 'styles', 'js', 'images', 'demo', 'dapps'], function() {

  gulp.src([
      'src/css/main.css'
    ])
    .pipe(cleanCSS({compatibility: 'ie9'}))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('build/css'));

    gulp.src([
        'src/js/app.js',
        'src/js/mc-validate.js'
      ])
      .pipe(uglify())
      .pipe(concat('app.min.js'))
      .pipe(gulp.dest('build/js'));

  gulp.src('src/*.html')
    .pipe(useref({noAssets:true}))
    .pipe(gulp.dest('build'));

  gulp.src('src/fonts/**/*')
    .pipe(gulp.dest('build/fonts'));

  gulp.src('src/*.php')
    .pipe(useref({noAssets:true}))
    .pipe(gulp.dest('build'));
});

gulp.task('default', ['watch']);
