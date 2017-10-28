"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.client = undefined;

var _twitter = require("twitter");

var _twitter2 = _interopRequireDefault(_twitter);

var _nodeEnvFile = require("node-env-file");

var _nodeEnvFile2 = _interopRequireDefault(_nodeEnvFile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var env = (0, _nodeEnvFile2.default)(".env");

var client = new _twitter2.default({
    consumer_key: env.TWITTER_CONSUMER_KEY,
    consumer_secret: env.TWITTER_CONSUMER_SECRET,
    access_token_key: env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: env.TWITTER_ACCESS_TOKEN_SECRET
});

exports.client = client;