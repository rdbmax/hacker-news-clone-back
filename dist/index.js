'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _graphql = require('graphql');

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _schema = require('./schema');

var _schema2 = _interopRequireDefault(_schema);

var _constant = require('./constant');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.connect(_constant.MONGODB_ADRESS);
var app = (0, _express2.default)();

app.use((0, _cors2.default)({ origin: _constant.WEBSITE_DOMAIN, optionsSuccessStatus: 200 }));

var graphQLParser = _bodyParser2.default.text({ type: 'application/graphql' });
app.post('/graphql', graphQLParser, function (req, res) {
  (0, _graphql.graphql)(_schema2.default, req.body).then(function (result) {
    res.send(JSON.stringify(result, null, 2));
  });
});

app.listen(_constant.API_PORT, function () {
  console.log('HackeNews Clone API listening');
});