var gulp = require('gulp');
var gutil = require('gulp-util');
var gulpIgnore = require('gulp-ignore');
var rename = require('gulp-rename');
var watch = require('gulp-watch');
var less = require('gulp-less');
var minifyCSS = require('gulp-minify-css');
//var gulpLoadPlugins = require('gulp-load-plugins');
//plugins = gulpLoadPlugins();
var path = require('path');
var startDevServer = require('./server').start;
var build = require('./server').build;
var buildDest = require('./server.config.json').buildFolder;

var templateFile = './src/Template.qextmpl';
var lessFiles = './src/**/*.less';
var cssFiles = './src/**/*.css';

var name = path.basename(__dirname);

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
  gulp.src(templateFile)
  .pipe(rename(name+'.qext'))
  .pipe(gulp.dest(buildDest));
});

gulp.task('less2css', function(){
  gulp.src(lessFiles)
  .pipe(less())
  .pipe(minifyCSS())
  .pipe(gulp.dest(buildDest));
});

gulp.task('css', function(){
  gulp.src(cssFiles)
  .pipe(minifyCSS())
  .pipe(gulp.dest(buildDest));
});

gulp.task('watch', function(){
  gulp.watch(templateFile, ['qext']);
  gulp.watch(lessFiles, ['less2css']);
  gulp.watch(cssFiles, ['css']);
});

gulp.task('development', ['qext', 'less2css', 'css', 'watch', 'devServer']);
gulp.task('production', ['qext', 'less2css', 'css', 'build']);

gulp.task('default', ['production']);