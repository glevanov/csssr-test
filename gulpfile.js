var gulp = require('gulp')
var sass = require('gulp-sass')
var plumber = require('gulp-plumber')
var postcss = require('gulp-postcss')
var autoprefixer = require('autoprefixer')
var csso = require('gulp-csso')
var server = require('browser-sync').create()
var imagemin = require('gulp-imagemin')
var webp = require('gulp-webp')
var del = require('del')

gulp.task('css', function () {
  return gulp.src('src/sass/style.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(gulp.dest('dist/'))
    .pipe(server.stream())
})

gulp.task('html', function () {
  return gulp.src('src/*.html')
    .pipe(gulp.dest('dist'))
})

gulp.task('reload', function (done) {
  server.reload()
  done()
})

gulp.task('server', function () {
  server.init({
    server: 'dist/',
    notify: false,
    open: true,
    cors: true,
    ui: false
  })

  gulp.watch('src/sass/**/*.scss', gulp.series('css', 'reload'))
  gulp.watch('src/*.html', gulp.series('html', 'reload'))
})

gulp.task('copy', function () {
  return gulp.src([
      'src/fonts/**.*.{woff,woff2}',
      'src/img/**',
      'src/js/**'
    ],
    {
      base: 'src'
    })
    .pipe(gulp.dest('dist'))
})

gulp.task('clean', function () {
  return del('dist')
})

gulp.task('build', gulp.series(
  'clean',
  'copy',
  'css',
  'html'
))

gulp.task('start', gulp.series('build', 'server'))

gulp.task('imagemin', function () {
  return gulp.src('src/img/**/*.{png,jpg,svg}')
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest('src/img'))
})

gulp.task('webp', function () {
  return gulp.src('src/img/**/*.{png,jpg}')
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest('src/'))
})

gulp.task('images', gulp.series([
  'imagemin',
  'webp'
]))
