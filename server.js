var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
var serverConfig = require('./server.config.json');

var devServerPort = serverConfig.devServerPort || 8080;
var contentUrl = serverConfig.url;

var compiler = webpack(config);
var originalOutputFileSystem = compiler.outputFileSystem;

module.exports.buildPathDestination =
  process.env.npm_lifecycle_event === 'build' ?
  serverConfig.buildFolder : serverConfig.deployFolder;
module.exports.deployPathDestination = serverConfig.deployFolder;

module.exports.start = function start(callback) {
	var devServer = new WebpackDevServer(compiler, {
	  contentBase: contentUrl,
	  //hot: true,
	  headers: { "Access-Control-Allow-Origin": "*" },
	  inline: true,
	  historyApiFallback: true,
	  filename: config.output.filename
	})
	.listen(devServerPort, 'localhost', function (err, result) {
	  // WebpackDevServer uses in-memory compilation
	  // (!) Restore original output file system
	  compiler.outputFileSystem  = originalOutputFileSystem;

	  if (err) {
	    console.error(err);
	    return callback(err);
	  }

	  console.log('Listening at localhost:' + devServerPort);

	  callback(null, devServer);
	});
};


module.exports.build = function build(callback){
	compiler.run(function(err, stats) {
		if(err)
			console.error(stats);

		if(stats) console.info(stats.toString());

		callback(err, stats);
	});
}
