/*global browser, protractor, $, expect*/

describe( "Extension rendering", function () {
	var EC = protractor.ExpectedConditions;
	var timeoutTime = 20000;

	//Should be fixed in default conf file
	browser.baseUrl = browser.getProcessedConfig().value_.baseUrl;

	//Selectors
	var renderedSelector = element( by.css( ".rendered" ) );
	var appAvailableSelector = element( by.css( ".appAvailable" ) );

	before( function () {
		//Saving apiKey to sessionStorage
		browser.get( "/" );
		browser.executeScript( "sessionStorage.setItem( \"apiKey\", arguments[arguments.length - 1] )", process.env.apiKey );

		//authenticate against palyground
		browser.get( "/index.html" );
		browser.executeScript( "authenticate()" );
		waitForUrlToChangeTo( /main/ );
		browser.sleep(5000); //Delay to preFetch font
	} );

	it( "should render default settings correctly", function() {
		const dataDef = [
			{ "qDef": { "qFieldDefs": ["Characters"]}, "qOtherTotalSpec": { "qOtherMode": "OTHER_COUNTED", "qOtherCounted": "5", "qSuppressOther": true }},
			{ "qDef" : { "qDef": "Count([Kills])", "qLabel": "Kills", "valueIcon": "remove user icon"}}
		];

		const options = {
			options: {
				dimHideBorders: true,
				dimHideInternalBorders: true,
				dimDivideBy: "one",
				dimensionsOrientation: "vertical",
				dimLabelSize: "mini",
				size: "mini"
			}
		};

		browser.get( "/main.html"  );
		browser.executeScript( "addExtension(arguments)", JSON.stringify(dataDef), JSON.stringify( options ) );

		browser.wait( EC.visibilityOf( renderedSelector ), timeoutTime );
		return expect( browser.takeImageOf( {selector: ".rendered"} ) ).to.eventually.matchImageOf( camelize( this.test.title ) );
	} );

	it( "should render in card view", function() {
		const dataDef = [
			{"qDef": { "qFieldDefs": ["Season"], "qFieldLabels": ["Field Label"] }, "qNullSuppression": true },
			{"qDef" : { "qDef": "Avg( [Rating 1] )", "qLabel": "Measure Label", "valueColor": "#FF0000", "hideLabel": true, "valueIcon": "checkmark box icon" }}
		];

		const options = {
			options: {
				dimShowAs: "card"
			}
		};

		browser.get( "/main.html"  );
		browser.executeScript( "addExtension(arguments)", JSON.stringify( dataDef ), JSON.stringify( options ) );

		browser.wait( EC.visibilityOf( renderedSelector ), timeoutTime );
		return expect( browser.takeImageOf( {selector: ".rendered"} ) ).to.eventually.matchImageOf( camelize( this.test.title ) );
	} );

	it( "should render with embeded chart", function() {
		browser.get( "/main.html"  );
		browser.wait( EC.visibilityOf( appAvailableSelector ), timeoutTime );

		browser.executeAsyncScript( function() {
			var callback = arguments[arguments.length - 1];

			app.model.waitForOpen.promise.then( function() {
				app.visualization.create( 'piechart', ['Episode', '=Avg( [Rating 1] )' ] ).then( function( vis ){ callback( vis.id ) });
			});
		}).then( function( value ) {
			const dataDef = [
				{"qDef": { "qFieldDefs": ["Season"], "qFieldLabels": ["Field Label"] }, "qNullSuppression": true, "qOtherTotalSpec": { "qOtherMode": "OTHER_COUNTED", "qOtherCounted": "3", "qSuppressOther": true }},
				{"qDef" : { "qDef": "=1", "qLabel": "simple KPI", "embeddedItem": value, "fontStyles": "bold", "iconPosition": "label", "valueColor": "#21ba45", "valueIcon": "map icon"}}
			];

			const options = {
				options: {
					dimDivideBy: "three",
					dimShowAs: "card"
				}
			};

			browser.executeScript( "addExtension(arguments)", JSON.stringify( dataDef ), JSON.stringify( options ) );
		});

		browser.wait( EC.visibilityOf( renderedSelector ), timeoutTime );
		return expect( browser.takeImageOf( {selector: ".rendered"} ) ).to.eventually.matchImageOf( camelize( this.test.title ) );
	} );
} );

// #############################################################################
// Support functions
// #############################################################################

function waitForUrlToChangeTo( urlRegex ) {
	var currentUrl;

	return browser.getCurrentUrl().then(function storeCurrentUrl( url ) {
			currentUrl = url;
		}
	).then(function waitForUrlToChangeTo() {
			return browser.wait(function waitForUrlToChangeTo() {
				return browser.getCurrentUrl().then(function compareCurrentUrl( url ) {
					return urlRegex.test( url );
				});
			});
		}
	);
}

function camelize(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
    if (+match === 0) return "";
    return index == 0 ? match.toLowerCase() : match.toUpperCase();
  });
}
