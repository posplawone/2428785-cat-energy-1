import gulp from 'gulp';
import plumber from 'gulp-plumber';
import less from 'gulp-less';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import browser from 'browser-sync';
import htmlmin from 'gulp-htmlmin';
import sharpOptimizeImages from 'gulp-sharp-optimize-images';
import svgo from 'gulp-svgo';
import rename from 'gulp-rename';
import svgstore from 'gulp-svgstore';
import {deleteAsync} from 'del';

// Styles

const styles = () => {
  return gulp.src('source/less/style.less', { sourcemaps: true })
    .pipe(plumber())
    .pipe(less())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest('build/css', { sourcemaps: '.' }))
    .pipe(browser.stream());
}

// HTML
const html = () => {
  return gulp.src('source/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('build'));
};

// Images
const optimizeImages = () => {
  return gulp.src('source/img/*.{jpg,png}')
    .pipe(
      sharpOptimizeImages({
        logLevel: "small",
        webp: {
          quality: 80,
          lossless: false,
          alsoProcessOriginal: true,
        },
        jpg_to_jpg: {
          quality: 80,
          mozjpeg: true,
        },
        png_to_png: {
          quality: 80,
        },
      })
    )
    .pipe(gulp.dest('build/img'));
};

const copyImages = () => {
  return gulp.src('source/img/*.{jpg,png}')
    .pipe(gulp.dest('build/img'))
}

const svg = () => {
  return gulp.src('source/img/*.svg')
    .pipe(svgo())
    .pipe(gulp.dest('build/img'));
}

const sprite = () => {
  return gulp.src('source/img/*.svg')
    .pipe(svgo())
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest('build/img'));
}

// Copy

const copy = (done) => {
  gulp.src([
    'source/fonts/**/*.{woff2,woff}',
    'source/*.ico',
  ], {
      base: 'source'
    })
    .pipe(gulp.dest('build'))
    done();
}

// Clean

const clean = () => {
  return deleteAsync('build');
}

// Server

const server = (done) => {
  browser.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

// Watcher

const watcher = () => {
  gulp.watch('source/less/**/*.less', gulp.series(styles));
  gulp.watch('source/*.html').on('change', browser.reload);
}

// Default

export default gulp.series(
  clean,
  copy,
  copyImages,
  gulp.parallel(
    html,
    styles,
    svg,
    sprite
  ),
  gulp.series(
    server,
    watcher
  ));

// Build

export const build = gulp.series(
  clean,
  copy,
  optimizeImages,
  gulp.parallel(
    html,
    styles,
    server,
    watcher,
    svg,
    sprite
  ),
  server
);
