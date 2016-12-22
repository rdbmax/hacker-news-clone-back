'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ObjectId = _mongoose2.default.Schema.ObjectId;


var linkSchema = new _mongoose.Schema({
  id: ObjectId,
  name: { type: String, default: 'not found' },
  url: String,
  vote: { type: Number, default: 0 }
}, {
  timestamps: { createdAt: 'created_at' }
});

var linkModel = _mongoose2.default.model('Link', linkSchema);

exports.default = linkModel;