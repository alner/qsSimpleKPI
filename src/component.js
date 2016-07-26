import loadCSS from './loadcss';

const global = window;
const defined = window.requirejs.defined;
const define = global.define || define;

define('resource-not-defined', function(){
  return null;
});

let dependencies = [
  'module',
  'qlik',
  'client.utils/routing',
//  'client.utils/state',
  'objects.utils/number-formatter',
  'general.services/show-service/show-service',
  'general.utils/drag-and-drop-service'
].map(function(path){
  // check if dependency was defined...
  if(defined(path)
  || path === 'module'
  || path === 'objects.utils/number-formatter')
    return path
  else
  if(path === 'qlik' && defined('js/qlik'))
    return 'js/qlik'
  else return 'resource-not-defined'
});

if(!global.React)
  dependencies.push('./vendors/react.min');

define(dependencies,
  function (module, qlik, Routing, NumberFormatter, /* State,*/ ShowService, DragDropService, /*styles,*/ React) {
    const ROOT_URI = module && module.uri.split('/').slice(0, -1).join('/');
    //if(!styles && ROOT_URI)
    if(ROOT_URI)
      loadCSS(`${ROOT_URI}/styles.css`);

     if(React && !global.React)
      global.React = React;

    let initialProperties = require('./initialProperties');
    let definition = require('./definition')({ ShowService });
    let paint = require('./paint')({qlik, Routing, NumberFormatter, DragDropService}); // State, NumberFormatter

    return {
      initialProperties,
      definition,
      paint,
      support: {
        snapshot: true,
        export: true,
        exportData: true
      },
      // snapshot: {
      //   canTakeSnapshot : true
      // }
    }
});
