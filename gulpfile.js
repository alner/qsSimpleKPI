var gulp = require('gulp');
var gutil = require('gulp-util');
var less = require('gulp-less');
var del = require('del');
var zip = require('gulp-zip');
var cssnano = require('gulp-cssnano');
var purify = require('gulp-purifycss');
var LessPluginAutoPrefix = require('less-plugin-autoprefix');
var autoprefix= new LessPluginAutoPrefix({ browsers: ["last 2 versions"] });
var path = require('path');
var webpackConfig = require('./webpack.config');
var webpack = require('webpack');
var pkg = require('./package.json');


var name = "qlik-multi-kpi";

var lessFiles = path.resolve("./src/**/*.less");
var DIST = "./dist";
var VERSION = process.env.VERSION || "local-dev";

gulp.task("qext", function () {
  var qext = {
    name: "Multi KPI",
    type: "visualization",
    description: pkg.description + "\nVersion: " + VERSION,
    version: VERSION,
    icon: "kpi",
    preview: "multikpi.png",
    keywords: "qlik-sense, visualization",
    author: pkg.author,
    homepage: pkg.homepage,
    license: pkg.license,
    repository: pkg.repository,
    dependencies: {
      "qlik-sense": ">=5.5.x",
    },
  };
  if (pkg.contributors) {
    qext.contributors = pkg.contributors;
  }
  var src = require("stream").Readable({
    objectMode: true,
  });
  src._read = function () {
    this.push(
      new gutil.File({
        cwd: "",
        base: "",
        path: name + ".qext",
        contents: Buffer.from(JSON.stringify(qext, null, 4)),
      })
    );
    this.push(null);
  };
  return src.pipe(gulp.dest(DIST));
});

var ccsnanoConfig = {
  discardUnused: true,
  discardEmpty: true,
};

gulp.task("webpack-build", (done) => {
  webpack(webpackConfig, (error, statistics) => {
    const compilationErrors = statistics && statistics.compilation.errors;
    const hasCompilationErrors =
      !statistics || (compilationErrors && compilationErrors.length > 0);

    console.log(
      statistics && statistics.toString({ chunks: false, colors: true })
    ); // eslint-disable-line no-console

    if (error || hasCompilationErrors) {
      console.log("Build has errors or eslint errors, fail it"); // eslint-disable-line no-console
      process.exit(1);
    }

    done();
  });
});

gulp.task("less2css", function () {
  return gulp
    .src(lessFiles)
    .pipe(
      less({
        plugins: [autoprefix],
      })
    )
    .pipe(cssnano(ccsnanoConfig))
    .pipe(gulp.dest(DIST));
});

gulp.task("purifycss", function () {
  return gulp
    .src(`${DIST}/*.css`)
    .pipe(purify(["./src/**/*.js"]))
    .pipe(gulp.dest(DIST));
});

gulp.task("clean", function () {
  return del([DIST], { force: true });
});

gulp.task("zip-build", function () {
  return gulp
    .src(DIST + "/**/*")
    .pipe(zip(`${name}_${VERSION}.zip`))
    .pipe(gulp.dest(DIST));
});

gulp.task('add-assets', function(){
  return gulp.src('./assets/**/*').pipe(gulp.dest(DIST));
});

gulp.task('build',
  gulp.series('clean', 'qext', 'less2css', 'add-assets', 'purifycss', 'webpack-build')
);

gulp.task('zip',
  gulp.series('build', 'zip-build')
);

gulp.task('default',
  gulp.series('build')
);
