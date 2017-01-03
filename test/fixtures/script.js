// Input your config
var config={
	host:"playground.qlik.com",
	prefix:"/playground/",
	port:"443",
	isSecure:true,
	rejectUnauthorized:false,
	apiKey: sessionStorage.getItem("apiKey"),
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

function main( arguments ) {
	dataDef = JSON.parse( arguments[0] );	//Since Webdriver protocol can only send string


	require( ["js/qlik"], function ( qlik  ) {

		require(['local/qsSimpleKPI'], function( SimpleKPI ) {
			// Suppress Qlik error dialogs and handle errors how you like.
			 qlik.setOnError( function ( error ) {
				console.log( error );
			});

			// Register the extension
			qlik.registerExtension( "SimpleKPI", SimpleKPI );

			// Open a dataset on the server.
			var app = qlik.openApp( config.appname, config );
			window.app = app;

			app.model.waitForOpen.promise.then( function() {
				// Logging app info
				app.model.enigmaModel.getAppProperties().then( function( prop ) {
					console.log( "Connecting to app: %s (%s)", prop.qTitle, config.appname  );
				} );

				// Creating the visualization
				app.visualization.create(
					"SimpleKPI",
					dataDef
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
