'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = require('graphql');

var _graphqlIsoDate = require('graphql-iso-date');

var _graphqlIsoDate2 = _interopRequireDefault(_graphqlIsoDate);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _linkModel = require('./link-model');

var _linkModel2 = _interopRequireDefault(_linkModel);

var _getPageTitle = require('./get-page-title');

var _getPageTitle2 = _interopRequireDefault(_getPageTitle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LinkType = new _graphql.GraphQLObjectType({
  name: 'link',
  fields: function fields() {
    return {
      _id: { type: _graphql.GraphQLID },
      name: { type: _graphql.GraphQLString },
      url: { type: _graphql.GraphQLString },
      vote: { type: _graphql.GraphQLInt },
      created_at: { type: _graphqlIsoDate2.default }
    };
  }
});

var Query = function Query() {
  var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'popular';

  var sortingRule = type === 'popular' ? { vote: -1 } : { created_at: -1 };

  return {
    type: new _graphql.GraphQLList(LinkType),
    resolve: function resolve() {
      return new Promise(function (resolve, reject) {
        _linkModel2.default.find().sort(sortingRule).exec(function (err, links) {
          if (err) reject(err);else resolve(links);
        });
      });
    }
  };
};

var MutationAdd = {
  type: LinkType,
  description: 'Add a Link',
  args: {
    url: {
      name: 'link url',
      type: new _graphql.GraphQLNonNull(_graphql.GraphQLString)
    }
  },
  resolve: function resolve(root, _ref) {
    var url = _ref.url;

    return new Promise(function (resolve, reject) {
      (0, _getPageTitle2.default)(url).then(function (name) {
        var newLink = new _linkModel2.default({ url: url, name: name });

        newLink.save(function (err) {
          if (err) reject(err);else resolve(newLink);
        });
      });
    });
  }
};

var MutationVote = function MutationVote() {
  var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'inc';

  var value = type === 'inc' ? 1 : -1;

  return {
    type: LinkType,
    description: (type === 'inc' ? 'Up' : 'Down') + ' vote a Link',
    args: {
      _id: {
        name: 'link id',
        type: new _graphql.GraphQLNonNull(_graphql.GraphQLID)
      }
    },
    resolve: function resolve(root, _ref2) {
      var _id = _ref2._id;

      return new Promise(function (resolve, reject) {
        _linkModel2.default.findByIdAndUpdate(_id, { $inc: { vote: value } }, { new: true }, function (err, link) {
          if (err) reject(err);else resolve(link);
        });
      });
    }
  };
};

var MutationType = new _graphql.GraphQLObjectType({
  name: 'Mutation',
  fields: {
    add: MutationAdd,
    upvote: MutationVote('inc'),
    downvote: MutationVote('dec')
  }
});

var QueryType = new _graphql.GraphQLObjectType({
  name: 'Query',
  fields: {
    popular: Query('popular'),
    recent: Query('recent')
  }
});

var Schema = new _graphql.GraphQLSchema({
  query: QueryType,
  mutation: MutationType
});

exports.default = Schema;