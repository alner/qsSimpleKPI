const global = window;
const define = global.define || define;

let dependencies = ['css!./styles.css'];
if(!global.React)
  dependencies.push('./vendors/react.min');

define(dependencies,
  function (styles, React) {
    global.React = React;

    let initialProperties = require('./initialProperties');
    let definition = require('./definition');
    let paint = require('./paint');

    return {
      initialProperties,
      definition,
      paint,
      snapshot: {
        canTakeSnapshot : true
      }
    }
});
