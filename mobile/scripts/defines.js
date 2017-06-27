'use strict';
const process = require('process');

const NODE_ENV = process.env.NODE_ENV;
let SERVER_ENV = process.env.SERVER_ENV || 'development';

if (NODE_ENV === 'production') {
  SERVER_ENV = 'production';
}

module.exports = {
  'env.configFilename': '@config/config.' + SERVER_ENV
};
