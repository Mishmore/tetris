const gulp = require('gulp');
const sass = require('gulp-sass');
const browserify = require('browserify');
const gulpBrowserify = require('gulp-browserify');
const rename = require('gulp-rename');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const addsrc = require('gulp-add-src');
const babelify = require('babelify');
const glob = require('glob');
const source = require('vinyl-source-stream');
const es = require('event-stream');

const config = {
  source: './src/',
  dist: './public/'
};

const paths = {
  assets: 'assets/',
  html: '**/*.html',
  js: "js/**/*.js",
  sass: 'scss/**/*.scss',
  jquery: 'js/vendor/jquery-3.2.1.min.js',
  mainSass: 'scss/main.scss',
  mainJS: 'js/app.js'
};

const sources = {
  assets: config.source + paths.assets,
  html: config.source + paths.html,
  sass: config.source + paths.assets + paths.sass,
  js: config.source + paths.assets + paths.js,
  jquery: config.source + paths.assets + paths.jquery,
  rootSass: config.source + paths.assets + paths.mainSass,
  rootJS: config.source + paths.assets + paths.mainJS
};

gulp.task('html', () => {
  gulp.src(sources.html).pipe(gulp.dest(config.dist));
});

gulp.task('img', () => {
  gulp.src(sources.assets + 'img/**/*').pipe(gulp.dest(config.dist + paths.assets + 'img'));
});

gulp.task('sass', () => {
  gulp.src(sources.rootSass)
    .pipe(sass({
      outputStyle: 'compressed'
    }).on('Error', sass.logError))
    .pipe(gulp.dest(config.dist + paths.assets + 'css'));
});

gulp.task('js', function() {
  return gulp.src([sources.rootJS])
    .pipe(concat('app.js'))
    .pipe(gulpBrowserify())
    .pipe(rename("bundle.js"))
    .pipe(gulp.dest(config.dist + paths.assets + "js"))
});

// gulp.task('js', (done) => {
//   glob(sources.js, function(err, files) {
//     if (err) done(err);
//
//     const tasks = files.map(function(entry) {
//       return browserify({
//           entries: [entry]
//         })
//         // .transform(babelify)
//         .transform('babelify', {
//           presets: ['env']
//         })
//         // .transform(babelify.configure({
//         //   presets: ['@babel/preset-env']
//         // }))
//         .bundle()
//         .pipe(source(entry.replace('./src/js/', '')))
//         .pipe(rename('bundle.js'))
//         .pipe(gulp.dest(config.dist + paths.assets + 'js'))
//     });
//
//     es.merge(tasks).on('end', done);
//   })
// });

gulp.task('css', () => {
  gulp.src(sources.bootstrapCss).pipe(gulp.dest(config.dist + paths.assets + 'css'));
});

gulp.task('font', () => {
  gulp.src(sources.assets + 'font/*.woff2').pipe(gulp.dest(config.dist + paths.assets + 'font'));
});

/* Watch */

gulp.task('sass-watch', ['sass'], (done) => {
  browserSync.reload();
  done();
});

gulp.task('js-watch', ['js'], (done) => {
  browserSync.reload();
  done();
});

gulp.task('html-watch', ['html'], (done) => {
  browserSync.reload();
  done();
});

/* Deploy production */

gulp.task('start', ['html', 'sass', 'js', 'img', 'font']);

/* Deploy locally and watch */

gulp.task('serve', () => {
  browserSync.init({
    server: {
      baseDir: config.dist
    }
  });
  gulp.watch(sources.html, ['html-watch']);
  gulp.watch(sources.sass, ['sass-watch']);
  gulp.watch(sources.js, ['js-watch']);
});