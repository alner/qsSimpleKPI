import loadCSS from './loadcss';
import Promise from "promise-polyfill";
import React from 'react';

const global = window;
const defined = global.requirejs && global.requirejs.defined;
const define = (global && global.define) || define;

let dependencies = [
  'module',
  'qlik',
  'general.services/show-service/show-service',
  'general.utils/drag-and-drop-service'
]
  .map(function(path){
    // check if dependency was defined...
    if(defined(path)
    || path === 'module'
    || path === 'general.utils/drag-and-drop-service')
      return path;
    else
    if(path === 'qlik' && defined('js/qlik'))
      return 'js/qlik';
    else return null;
  });

define(dependencies,
  function (module, qlik, ShowService, DragDropService, React) {
    const ROOT_URI = (module && module.uri && module.uri.split('/').slice(0, -1).join('/'))
    || '/extensions/qsSimpleKPI';

    if(!global.Promise)
      global.Promise = Promise;

    const PromiseClass = qlik.Promise || global.Promise;
    let LoadedPromise = new PromiseClass(function(resolve){
      loadCSS(`${ROOT_URI}/qsSimpleKPI.css`,
        function onLoaded() {
          resolve();
        },
        function onError() {
          resolve();
        }
      );
    });

    if(React && !global.React)
      global.React = React;

    let initialProperties = require('./initialProperties');
    let definition = require('./definition')({ ShowService });
    let paint = require('./paint')({ qlik, DragDropService, LoadedPromise });

    return {
      initialProperties,
      definition,
      paint,
      support: {
        snapshot: true,
        export: true,
        exportData: true
      }
    };
  });
