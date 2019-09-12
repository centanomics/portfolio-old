const { src, series, dest, watch } = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const reload = browserSync.reload;

const source = {
  scss: 'scss/*.scss',
  css: 'css',
  html: '*.html',
  js: 'js/*.js'
};

// Static Server + watching scss/html/js files
function serve(cb) {
  browserSync.init({
    server: './'
  });

  const watchers = watch([source.scss]);

  watchers.on('change', scss);

  const watcher = watch([source.html, source.js]);

  watcher.on('change', function(path, stats) {
    reload();
  });
  cb();
}

// Compile sass into CSS
function scss() {
  return src(source.scss)
    .pipe(sass().on('error', sass.logError))
    .pipe(dest(source.css))
    .pipe(reload({ stream: true }));
}

exports.default = series(scss, serve);
