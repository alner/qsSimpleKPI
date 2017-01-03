const baseConfig = require( "@qlik/after-work/dist/config/conf.js" ).config;
var httpServer = require( "@qlik/after-work/dist/utils" ).httpServer;
const extend = require( "extend" );

delete baseConfig.multiCapabilities;

const config = extend( true, baseConfig, {
	baseUrl: "http://localhost:8000",
	directConnect: true,
	capabilities: {
		browserName: "chrome",
		name: "Chrome dev"
	}
} );

module.exports = {
	config: config
};
