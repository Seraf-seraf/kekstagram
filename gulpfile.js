import gulp from 'gulp';
import plumber from 'gulp-plumber';
import sourcemap from 'gulp-sourcemaps';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import csso from 'postcss-csso';
import rename from 'gulp-rename';
import htmlmin from 'gulp-htmlmin';
import terser from 'gulp-terser';
import svgo from 'gulp-svgo';
import imagemin from 'gulp-imagemin';
import sync from 'browser-sync';
import {deleteAsync} from 'del';

//Стили

export const styles = () => {
  return gulp.src('./css/*.css')
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(postcss([
      autoprefixer(),
      csso()
    ]))
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemap.write('.'))
    .pipe(gulp.dest('build/css'))
    .pipe(sync.stream());
};

// Очистка

export const clean = () => {
  return deleteAsync('build');
};

// Сервер

export const server = (done) => {
  sync.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
};

export const reload = (done) => {
  sync.reload();
  done();
};

// html

export const html = () => {
  return gulp.src('*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('build'));
};

// js

export const scripts = () => {
  return gulp.src('js/**/*.js')
    .pipe(terser())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('build/js'))
    .pipe(sync.stream());
};

// изображения; оптимизация svg, png, jpg

export const optimizeImages = () => {
  return gulp.src(['img/**/*.{svg,png,jpg}', 'photos/**/*'], {base: '.'})
    .pipe(svgo())
    .pipe(imagemin())
    .pipe(gulp.dest('build'))
  };

export const copyImages = () => {
  return gulp.src(['img/**/*.{svg,png,jpg}', 'photos/**/*'], {base: '.'})
  .pipe(gulp.dest('build'));
};

export const copy = () => {
  return gulp.src(['fonts/*', 'favicon.ico'], {base: '.'})
    .pipe(gulp.dest('build'));
};

// Око Саурона

export const watcher = () => {
  gulp.watch('*.html', gulp.series(html, reload));
  gulp.watch('css/*.css', gulp.series(styles, reload));
  gulp.watch(['js/**/*.js', 'pristine/**/*.js'], gulp.series(scripts));
  gulp.watch(['img/**/*', 'photos/**/*'], gulp.series(copyImages));
};

// build

export const build = gulp.series(
  clean,
  copy,
  optimizeImages,
  gulp.parallel(
    styles,
    html,
    scripts
  )
);

const start = gulp.series(
  clean,
  copy,
  copyImages,
  gulp.parallel(
    styles,
    html,
    scripts
  ),
  gulp.series(
    server,
    watcher
  )
);

export default start;
