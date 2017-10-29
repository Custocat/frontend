"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.submit = undefined;

var _request = require("request");

var _request2 = _interopRequireDefault(_request);

var _nodeEnvFile = require("node-env-file");

var _nodeEnvFile2 = _interopRequireDefault(_nodeEnvFile);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var env = (0, _nodeEnvFile2.default)(".env");

function submit(image, message) {
    var formData = {
        octocat: {
            value: _fs2.default.createReadStream("uploads/" + image.id),
            options: {
                filename: image.id,
                contentType: 'image/png'
            }
        }
    };
    _request2.default.post({ url: env.twitterApi + "/image/upload", formData: formData }, function (err, httpResponse, body) {
        if (err) {
            return console.error('upload failed:', err);
        }
        console.log(body);
        var image_id = JSON.parse(body).image.id;
        _request2.default.post({ url: env.twitterApi + "/image/" + image_id + "/tweet", form: { message: message } });
    });
}

exports.submit = submit;