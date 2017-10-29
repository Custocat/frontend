"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (app) {
    app.get("/images/all", function (req, res) {
        var images = _image2.default.getAll();
        var cleanImages = [];

        images.forEach(function (image) {
            cleanImages.push({
                id: image.id,
                submitter: image.submitter,
                name: image.name
            });
        });

        res.json(cleanImages);
    });
};

var _image = require("../../controllers/image/image");

var _image2 = _interopRequireDefault(_image);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }