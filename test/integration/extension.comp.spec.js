/*global browser, protractor, $, expect*/

describe( "Extension rendering", function () {
	var EC = protractor.ExpectedConditions;
	var timeoutTime = 60000;

	//Should be fixed in default conf file
	browser.baseUrl = browser.getProcessedConfig().value_.baseUrl;

	//Selectors
	var renderedSelector = element( by.css( ".rendered" ) );

	before( function () {
		// Loading login page and waiting for Url to change
		browser.get( "/index.html" );
		waitForUrlToChangeTo( /main/ );
	} );

	it( "should render default settings correctly", function() {
		const dataDef = [{ qDef: { qFieldDefs: ['Characters']},
						qOtherTotalSpec: {qOtherMode: 'OTHER_COUNTED', qOtherCounted: '5', qSuppressOther: true}
					},
					'=Count([Kills])'];

		browser.get( "/main.html"  );
		browser.executeScript( "main(arguments)", JSON.stringify(dataDef) );

		browser.wait( EC.visibilityOf( renderedSelector ), timeoutTime );
		return expect( browser.takeImageOf( {selector: ".rendered"} ) ).to.eventually.matchImageOf( "default" );
	} );

	it( "should render chart1", function() {
		const dataDef = [{ qDef: { qFieldDefs: ['Season']}
					},
					'=Avg([Rating 1])'];

		browser.get( "/main.html"  );
		browser.executeScript( "main(arguments)", JSON.stringify(dataDef) );

		browser.wait( EC.visibilityOf( renderedSelector ), timeoutTime );
		return expect( browser.takeImageOf( {selector: ".rendered"} ) ).to.eventually.matchImageOf( "chart1" );
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
