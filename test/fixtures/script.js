// Input your config
var config={
	host:"playground.qlik.com",
	prefix:"/playground/",
	port:"443",
	isSecure:true,
	rejectUnauthorized:false,
	apiKey: sessionStorage.getItem( "apiKey" ),
	appname:"d7ad663d-2413-4088-a3c9-e5ed0283c788"
};

function authenticate() {
	Playground.authenticate(config);
};

require.config({
	baseUrl: ( config.isSecure ? "https://" : "http://" ) + config.host + (config.port ? ":" + config.port: "") + config.prefix + "resources",
	paths: {
		"local": "http://localhost:8000/build/"
	}
});

function main() {
	require( ["js/qlik"], function ( qlik  ) {
		// Suppress Qlik error dialogs and handle errors how you like.
		 qlik.setOnError( function ( error ) {
			console.log( error );
		});

		// Open a dataset on the server.
		var app = qlik.openApp( config.appname, config );
		window.app = app;

		app.model.waitForOpen.promise.then( function() {
			// Logging app info
			app.model.enigmaModel.getAppProperties().then( function( prop ) {
				console.log( "Connecting to app: %s (%s)", prop.qTitle, config.appname  );
				document.body.classList.add("appAvailable")
			} );
		});
	} );
};

function addExtension( arguments ) {
	dataDef = arguments[0] && JSON.parse( arguments[0] ) || [];
	options = arguments[1] && JSON.parse( arguments[1] ) || {};

	console.log( "Extension is using:\nDatadef - ", dataDef, "\nOptions - ", options  );

	require( ["js/qlik"], function ( qlik  ) {

		require(['local/qsSimpleKPI'], function( SimpleKPI ) {
			// Register the extension
			qlik.registerExtension( "SimpleKPI", SimpleKPI );

			app.model.waitForOpen.promise.then( function() {
				// Creating the visualization
				app.visualization.create(
					"SimpleKPI",
					dataDef,
					options
				).then( function ( vis ) {
					vis.show( "extension", {
						onRendered: function(){
							document.getElementById("extension").classList.add( "rendered" );
						}
					} );
				} ).catch( function ( err ) {
					console.error( err );
				} );
			});
		} );
	} );
};
