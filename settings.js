const path = require('path');
const packageJSON = require('./package.json');

const defaultBuildDestination = path.resolve("./build");

module.exports = {
  buildDestination: "C:\\Users\\Ahmed\\Documents\\Qlik\\Sense\\Extensions\\KPI",
  mode: process.env.NODE_ENV || 'development',
  name: packageJSON.name,
  version: process.env.VERSION || 'local-dev',
  url: process.env.BUILD_URL || defaultBuildDestination,
  port: 8081
};
