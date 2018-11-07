var gulp = require('gulp');
var less = require('gulp-less');
var del = require('del');
var zip = require('gulp-zip');
var cssnano = require('gulp-cssnano');
var purify = require('gulp-purifycss');
var runSequence = require('run-sequence');
var LessPluginAutoPrefix = require('less-plugin-autoprefix');
var autoprefix= new LessPluginAutoPrefix({ browsers: ["last 2 versions"] });
var path = require('path');
var settings = require('./settings');
var startDevServer = require('./server').start;
var build = require('./server').build;
var jeditor = require("gulp-json-editor");

var buildDest = settings.buildDestination;
var name = settings.name;
var version = settings.version;

var qextFile = path.resolve('./src/' + name + '.qext');
var lessFiles = path.resolve('./src/**/*.less');
var cssFiles = path.resolve('./src/**/*.css');



var ccsnanoConfig = {
  discardComments: {
        removeAll: true
    },
  discardUnused: true,
  discardEmpty: true
};

gulp.task('webpack', function(callback){
    build(function(err, stats){
        if(err) {
          return callback(err);
        }
        callback();
    });
});

gulp.task('devServer', function(callback){
    startDevServer(function(err, server){
        if(err) {
          return callback(err);
        }
        callback();
    });
});

gulp.task('qext', function () {
  return gulp.src(qextFile)
  .pipe(gulp.dest(buildDest));
});

gulp.task('less2css', function(){
  return gulp.src(lessFiles)
  .pipe(less({
    plugins: [autoprefix]
  }))
  .pipe(cssnano(ccsnanoConfig))
  .pipe(gulp.dest(buildDest));
});

gulp.task('purifycss', function(){
  return gulp.src('./build/*.css')
    .pipe(purify(['./src/**/*.js']))
    .pipe(gulp.dest(buildDest));
});

gulp.task('css', function(){
  return gulp.src(cssFiles)
  .pipe(cssnano(ccsnanoConfig))
  .pipe(gulp.dest(buildDest));
});

gulp.task('startWatcher', function(){
  gulp.watch(qextFile, ['qext']);
  gulp.watch(lessFiles, ['less2css']);
  gulp.watch(cssFiles, ['css']);
});

gulp.task('remove-build-folder', function(){
  return del([buildDest], { force: true });
});

gulp.task('zip-build', function(){
  return gulp.src(buildDest + '/**/*')
    .pipe(zip(name + '_' + version + '.zip'))
    .pipe(gulp.dest(buildDest));
});

gulp.task('update-qext-version', function () {
  return gulp.src("./build/" + name + ".qext")
    .pipe(jeditor({
      'version': version
    }))
  .pipe(gulp.dest("./build"));
})

gulp.task('add-assets', function(){
  return gulp.src("./assets/**/*").pipe(gulp.dest(buildDest));
});

gulp.task('prepare', ['qext', 'less2css', 'add-assets'])
gulp.task('watch', function(callback) {
  runSequence(
    'prepare',
    'startWatcher',
    'devServer'
  );
});
gulp.task('build', function(callback) {
  runSequence(
    'remove-build-folder',
    'prepare',
    'purifycss',
    'webpack',
    'update-qext-version',
    'zip-build'
  );
});

