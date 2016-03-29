import loadCSS from './loadcss';

const global = window;
const define = global.define || define;

let dependencies = [
  'module',
  'qlik',
  'client.utils/routing',
  'client.utils/state',
  'objects.utils/number-formatter',
  'general.services/show-service/show-service'
]; // 'css!./styles.css'

if(!global.React)
  dependencies.push('./vendors/react.min');

define(dependencies,
  function (module, qlik, Routing, State, NumberFormatter, ShowService, React) {
    const ROOT_URI = module.uri.split('/').slice(0, -1).join('/');
    loadCSS(`${ROOT_URI}/styles.css`);

    if(React && !global.React)
      global.React = React;

    let initialProperties = require('./initialProperties');
    let definition = require('./definition')({ ShowService });
    let paint = require('./paint')({qlik, Routing, State, NumberFormatter}); // NumberFormatter: global.NumberFormatter
    return {
      initialProperties,
      definition,
      paint,
      snapshot: {
        canTakeSnapshot : true
      }
    }
});
