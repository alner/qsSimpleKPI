var webpack = require('webpack');
var path = require('path');
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
	],
	module: {
		noParse: ["react"],
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: [/node_modules/, /semantic/],
				loaders: ['react-hot', 'babel']
			},
			{
				test:  /\.css$/,
				loader: "style-loader!css-loader"
			},
			{
				test: /\.less$/,
				loader: "style!css!less"
			}
		]
	}
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
	//config.entry.js.unshift("webpack/hot/only-dev-server");
  	config.entry.js.unshift("webpack-dev-server/client?http://localhost:" + devServerPort);
  	//config.plugins.push(new webpack.HotModuleReplacementPlugin());
	config.plugins.push(new webpack.NoErrorsPlugin());
} else {
	console.log('PRODUCTION configuration');
	config.plugins.push(new webpack.optimize.UglifyJsPlugin({minimize: true}));
	config.plugins.push(new webpack.optimize.OccurenceOrderPlugin());
}

module.exports = config;