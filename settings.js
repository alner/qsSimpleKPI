const path = require('path');
const packageJSON = require('./package.json');

const defaultBuildDestination = path.resolve("./build");

module.exports = {
  buildDestination: process.env.BUILD_PATH || defaultBuildDestination,
  mode: process.env.NODE_ENV || 'development',
  name: packageJSON.name,
  version: process.env.VERSION || 'local-dev',
  url: process.env.BUILD_URL || defaultBuildDestination,
  port: 8081
};
