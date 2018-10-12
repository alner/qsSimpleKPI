module.exports = (config) => {
  config.set({
    browsers: ['SlimChromeHeadless'],
    customLaunchers: {
      SlimChromeHeadless: {
        base: 'ChromeHeadless',
        flags: ['--headless', '--disable-gpu', '--disable-translate', '--disable-extensions']
      }
    },
    files: [
      { pattern: 'src/*.spec.js', watched: false }
    ],
    frameworks: ['jasmine'],
    preprocessors: {
      'src/*.spec.js': ['webpack', 'sourcemap']
    },
    webpack: {
      devtool: 'source-map',
      debug: true,
      resolve: {
        modulesDirectories: ['node_modules', 'bower_components', 'test'],
      },
      module: {
        noParse: ["react"],
        loaders: [
          {
            test: /\.jsx?$/,
            exclude: [/node_modules/, /semantic/],
            loaders: ['babel']
          },
          { test: /\.less$/, loader: 'ignore-loader' },
          { test: /\.json$/, loader: 'ignore-loader' }
        ]
      }
    }
  });
};
