const define = (window && window.define) || define;

import initialProperties from './initialProperties';
import definition from './definition';
import paint from './paint';

// './semantic/dist/semantic.min.js'
// 'css!./semantic/dist/semantic.min.css'

define([
	'css!./styles.css'
	],
	function () {
		return {
			initialProperties,
			definition,
			paint
		}
});