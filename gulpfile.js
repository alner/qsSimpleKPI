var gulp = require('gulp');
var gutil = require('gulp-util');
var gulpIgnore = require('gulp-ignore');
var rename = require('gulp-rename');
var watch = require('gulp-watch');
var less = require('gulp-less');
var del = require('del');
var zip = require('gulp-zip');
var minifyCSS = require('gulp-clean-css'); // gulp-minify-css
var cssnano = require('gulp-cssnano');
var purify = require('gulp-purifycss');
var runSequence = require('run-sequence');
var LessPluginAutoPrefix = require('less-plugin-autoprefix');
var autoprefix= new LessPluginAutoPrefix({ browsers: ["last 2 versions"] });
//var gulpLoadPlugins = require('gulp-load-plugins');
//plugins = gulpLoadPlugins();
var path = require('path');
var startDevServer = require('./server').start;
var build = require('./server').build;
//var buildDest = require('./server.config.json').buildFolder;
var buildDest = require('./server').buildPathDestination;
var deployDest = require('./server').deployPathDestination;

var templateFile = './src/Template.qextmpl';
var lessFiles = './src/**/*.less';
var cssFiles = './src/**/*.css';
var jsFiles = './**/*.js';

var name = require('./package.json').packageName;

var ccsnanoConfig = {
  discardComments: {
        removeAll: true
    },
  discardUnused: true,
  discardEmpty: true,
//  mergeLonghand: true,
//  reduceIdents: true
};

gulp.task('build', function(callback){
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
  return gulp.src(templateFile)
  .pipe(rename(name+'.qext'))
  .pipe(gulp.dest(buildDest));
});

gulp.task('less2css', function(){
  return gulp.src(lessFiles)
  .pipe(less({
    plugins: [autoprefix]
  }))
  //.pipe(minifyCSS({keepSpecialComments : 0}))
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
  //.pipe(minifyCSS({keepSpecialComments : 0}))
  .pipe(cssnano(ccsnanoConfig))
  .pipe(gulp.dest(buildDest));
});

gulp.task('watch', function(){
  gulp.watch(templateFile, ['qext']);
  gulp.watch(lessFiles, ['less2css']);
  gulp.watch(cssFiles, ['css']);
});

gulp.task('remove-build-zip', function(callback){
  del.sync([deployDest + name + '.zip']);
  callback();
});

gulp.task('zip-build', function(){
  return gulp.src(buildDest + '/**/*')
    .pipe(zip(name + '.zip'))
    .pipe(gulp.dest(deployDest));
});

gulp.task('add-assets', function(){
  return gulp.src("./assets/**/*").pipe(gulp.dest(buildDest));
});

gulp.task('add-version', function(){
  return gulp.src("VERSION").pipe(gulp.dest(buildDest));
});

gulp.task('deploy', function(){
  return gulp.src(buildDest + "/**/*").pipe(gulp.dest(deployDest));
});

gulp.task('development', ['qext', 'less2css', /*'css',*/ 'add-assets', 'add-version', 'watch', 'devServer']);
gulp.task('production', function(callback) {
  runSequence(['qext', 'less2css', /*'css',*/ 'purifycss', 'remove-build-zip', 'add-assets', 'add-version'],
    'build',
    'zip-build',
    'deploy'
    );
});

//gulp.task('default', ['production']);
