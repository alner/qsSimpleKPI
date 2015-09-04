import initialProperties from './initialProperties';
import definition from './definition';
import paint from './paint';

const define = (window && window.define) || define;

// './semantic/dist/semantic.min.js'
// 'css!./semantic/dist/semantic.min.css'

define([
	'css!./styles.css'
	],
	function () {
		return {
			initialProperties,
			definition,
			paint,
			snapshot: {
				canTakeSnapshot : true
			}
		}
});