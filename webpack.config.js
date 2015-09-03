var webpack = require('webpack');
var path = require('path');
var serverConfig = require('./server.config.json');

var name = path.basename(__dirname);
var outputFilename = name + '.js';
var devServerPort = serverConfig.serverPort || 8080;

// default configuration
var config = {
	entry: {
		js: [
			//"webpack-dev-server/client?http://localhost:" + devServerPort,
			//"webpack/hot/only-dev-server",
			"./src/component.js" // input file
		]
	},
	output: {
		path: path.resolve(__dirname, serverConfig.buildFolder),
		filename: outputFilename // output file
	},
	plugins: [
	],
	resolve: {
		modulesDirectories: ['node_modules', 'bower_components']
	},
	module: {
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