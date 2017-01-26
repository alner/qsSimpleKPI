var webpack = require('webpack');
var path = require('path');
//var ExtractTextPlugin = require('extract-text-webpack-plugin');
var serverConfig = require('./server.config.json');

var node_modules_dir = path.join(__dirname, 'node_modules');
var name = path.basename(__dirname);
var outputFilename = name + '.js';
var devServerPort = serverConfig.serverPort || 8080;

var deps = [
  'react/dist/react.min.js',
  //'react-router/dist/react-router.min.js',
  //'moment/min/moment.min.js',
  //'underscore/underscore-min.js',
];

// default configuration
var config = {
  entry: {
    js: [
      //"webpack-dev-server/client?http://localhost:" + devServerPort,
      //"webpack/hot/only-dev-server",
      "./src/component.js" // input file
    ]
  },
  resolve: {
    modulesDirectories: ['node_modules', 'bower_components'],
  },
  output: {
    path: path.resolve(__dirname, serverConfig.buildFolder),
    filename: outputFilename // output file
  },
  externals: {
    "react": "React"
  },
  plugins: [
    //new webpack.optimize.CommonsChunkPlugin('React', 'react.js'),
    //new webpack.IgnorePlugin(/react/)
    //new ExtractTextPlugin("style.css")
  ],
  module: {
    noParse: ["react"],
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: [/node_modules/, /semantic/],
        loaders: ['babel']
      },
      /*
      {
        test:  /\.css$/,
        loader: "style-loader!css-loader"
      },
      {
          test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/,
          loader: 'url-loader?limit=30000&name=[name]-[hash].[ext]'
      },
      {
        test: /\.less$/,
        loader: "style!css!less"
      }
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader!autoprefixer-loader!less-loader")
      },
      {
          test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/,
          loader: 'url-loader?limit=30000&name=[name]-[hash].[ext]'
      }
      */
    ]
  },
  // postcss: [
  //   autoprefixer
  // ]
};

/*
deps.forEach(function (dep) {
  var depPath = path.resolve(node_modules_dir, dep);
  config.resolve.alias[dep.split(path.sep)[0]] = depPath;
  config.module.noParse.push(depPath);
});
*/

if(process.env.NODE_ENV !== 'production') {
  console.log('DEVELOPMENT configuration');
  config.devtool = 'inline-source-map'; //'#eval-source-map';
    //config.devtool = 'source-map';
  config.debug = true;
  config.output.path = path.resolve(serverConfig.deployFolder);
  //config.entry.js.unshift("webpack/hot/only-dev-server");
    config.entry.js.unshift("webpack-dev-server/client?http://localhost:" + devServerPort);
    //config.plugins.push(new webpack.HotModuleReplacementPlugin());
  config.plugins.push(new webpack.NoErrorsPlugin());
} else {
  console.log('PRODUCTION configuration');
  config.plugins.push(new webpack.DefinePlugin({
      'process.env': {NODE_ENV: JSON.stringify('production')}
    }));
  config.plugins.push(new webpack.optimize.UglifyJsPlugin({
    // Compression specific options
    compress: {
      warnings: false,
      // Drop `console` statements
      drop_console: true
    },
    beautify: false,
    comments: false,
    output: {
      comments: false,
    },
    mangle: true,
    sourcemap: false,
    beautify: false,
    dead_code: true
  }));
  config.plugins.push(new webpack.optimize.DedupePlugin());
  config.plugins.push(new webpack.optimize.OccurenceOrderPlugin());
}

module.exports = config;
