/*global browser, protractor, $, expect*/

describe( "Extension rendering", function () {
	var EC = protractor.ExpectedConditions;
	var timeoutTime = 20000;

	//Should be fixed in default conf file
	browser.baseUrl = browser.getProcessedConfig().value_.baseUrl;

	//Selectors
	var renderedSelector = element( by.css( ".rendered" ) );
	var appAvailableSelector = element( by.css( ".appAvailable" ) );
	var logger = element( by.css( "#log" ) );

	before( function () {
		browser.get( "/main.html" );
		browser.sleep(5000); // Delay to open app		

		//Saving apiKey to sessionStorage
		//browser.get( "/" );
		//browser.executeScript( "sessionStorage.setItem( \"apiKey\", arguments[arguments.length - 1] )", process.env.apiKey );

		//authenticate against palyground
		//browser.get( "/index.html" );
		//browser.executeScript( "authenticate()" );
		//waitForUrlToChangeTo( /main/ );
		//browser.sleep(5000); //Delay to preFetch font
	} );

	it( "should render default settings correctly", function() {
		const dataDef = [
			{ "qDef": { "qFieldDefs": ["Priority"]}, "qOtherTotalSpec": { "qOtherMode": "OTHER_COUNTED", "qOtherCounted": "5", "qSuppressOther": true }},
			{ "qDef" : { "qDef": "Count( Distinct %CaseId )", "qLabel": "Cases", "valueIcon": "cube icon"}}
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
			{"qDef": { "qFieldDefs": ["Priority"], "qFieldLabels": ["Field Label"] }, "qNullSuppression": true },
			{"qDef" : { "qDef": "Avg( [Case Duration Time] )", "qLabel": "Measure Label", "valueColor": "#FF0000", "hideLabel": true, "valueIcon": "checkmark box icon" }}
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

		function render( value ) {
			// {"qDef": { "qFieldDefs": ["Date.autoCalendar.Year"], "qFieldLabels": ["Field Label"] }, "qNullSuppression": true, "qOtherTotalSpec": { "qOtherMode": "OTHER_COUNTED", "qOtherCounted": "3", "qSuppressOther": true }},
			const dataDef = [
				{"qDef" : { "qDef": "=1", "qLabel": "Simple KPI", "embeddedItem": value, "fontStyles": "bold", "iconPosition": "label", "valueColor": "#808080", "valueIcon": "pie chart icon"}}
			];

			const options = {
				options: {
					autoSize: true
				}
			};

			browser.executeScript( "addExtension(arguments)", JSON.stringify( dataDef ), JSON.stringify( options ) );
		}

		browser.executeScript( function() {
			//var callback = arguments[arguments.length - 1];
			//app.model.waitForOpen.promise.then( function() {
			return app.visualization.create( 'piechart', ['Priority', '=Avg( [Case Duration Time] )' ] );
			// .then( function( vis ){
			// 	render( vis.id );
			// });
			//});
		}).then(function(vis) {
			//browser.debugger();
			vis.show("logger");
			render(vis.id);
			console.log(vis);
			browser.pause();						
		}).catch(function(err){
			console.error(err);
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
