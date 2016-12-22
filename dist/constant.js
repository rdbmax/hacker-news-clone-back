'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var WEBSITE_DOMAIN = process.env.NODE_ENV === 'production' ? 'http://production-website.com' : 'http://localhost:8888';

var API_PORT = process.env.NODE_ENV === 'production' ? '3232' : '3000';

var MONGODB_ADRESS = process.env.NODE_ENV === 'production' ? 'mongodb://mongodb-production-adress' : 'mongodb://localhost/hackernewsclone';

exports.WEBSITE_DOMAIN = WEBSITE_DOMAIN;
exports.API_PORT = API_PORT;
exports.MONGODB_ADRESS = MONGODB_ADRESS;