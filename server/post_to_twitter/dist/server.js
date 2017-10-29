"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _nodeEnvFile = require("node-env-file");

var _nodeEnvFile2 = _interopRequireDefault(_nodeEnvFile);

var _image = require("./routes/image/image");

var _image2 = _interopRequireDefault(_image);

var _twitter = require("./routes/twitter/twitter");

var _twitter2 = _interopRequireDefault(_twitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Route imports
var env = (0, _nodeEnvFile2.default)(".env");
var app = (0, _express2.default)();

// Routes
(0, _image2.default)(app);
(0, _twitter2.default)(app);

app.listen(env.PORT, env.HOST);
console.log("Server running on " + env.HOST + ":" + env.PORT + ". Use ctrl+c to stop.");