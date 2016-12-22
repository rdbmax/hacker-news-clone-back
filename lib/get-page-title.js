'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _cheerio = require('cheerio');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getPageTitle = function getPageTitle(url) {
  return new Promise(function (resolve, reject) {
    (0, _request2.default)(url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var $ = (0, _cheerio.load)(body);
        var title = $('title').text();
        if (title) resolve(title);else resolve(url);
      } else {
        reject(error);
      }
    });
  });
};

exports.default = getPageTitle;