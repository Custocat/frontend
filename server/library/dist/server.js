"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _nodeEnvFile = require("node-env-file");

var _nodeEnvFile2 = _interopRequireDefault(_nodeEnvFile);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var env = (0, _nodeEnvFile2.default)(".env");
var app = (0, _express2.default)();

// Default route
app.get("/", function (req, res) {
    res.sendFile(_path2.default.join(__dirname + "/public/index.html"));
});
app.get("/js/index.js", function (req, res) {
    res.sendFile(_path2.default.join(__dirname + "/public/js/index.js"));
});
app.get("/js/main.css", function (req, res) {
    res.sendFile(_path2.default.join(__dirname + "/public/css/main.css"));
});

app.use("*", function (req, res) {
    res.sendFile(_path2.default.join(__dirname + "/special_endpoint/404.html"));
});

app.listen(env.PORT, env.HOST);
console.log("Server running on " + env.HOST + ":" + env.PORT + ". Use ctrl+c to stop.");