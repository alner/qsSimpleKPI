const baseConfig = require( "after-work.js/dist/config/conf.js" ).config;
var httpServer = require( "after-work.js/dist/utils" ).httpServer;
const extend = require( "extend" );

delete baseConfig.multiCapabilities;

const config = extend( true, baseConfig, {
	baseUrl: "http://localhost:8000",
	directConnect: true,
	capabilities: {
		browserName: "chrome"
	},
	mochaOpts: {
		reporterOptions: {
			xunit: true
		}
	},
	beforeLaunch() {
		return httpServer( {
			"logLevel": "info",
			"port": 8000,
			"server": {
				"baseDir": "./test/fixtures/",
				"routes": {
					"/playground": "./node_modules/playground-js-api/dist",
					"/build": "./build/",
					"/main": "./test/fixtures/main.html"
					}
				}
		} );
	}
} );


module.exports = {
	config: config
};
