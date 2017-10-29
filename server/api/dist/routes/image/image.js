"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (app) {
    app.use(_bodyParser2.default.json());
    app.use(_bodyParser2.default.urlencoded({ extended: false }));

    app.post("/image", uploads.single("octocat"), function (req, res) {
        var newImage = _image2.default.new(req.file, req.body.name, req.body.submitter);
        console.log(newImage);
        (0, _twitterSubmit.submit)(newImage, "New custocat called " + req.body.name + " from " + req.body.submitter + ". Uploaded via the #api");
        if (newImage === false) {
            res.status(400).json({
                err: true,
                msg: "Invalid file type, image must be of content type: image/png"
            });
        } else {
            res.json({
                err: false,
                msg: "Image uploaded succesfully.",
                image: {
                    id: newImage.id
                }
            });
        }
    });
};

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _multer = require("multer");

var _multer2 = _interopRequireDefault(_multer);

var _image = require("../../controllers/image/image");

var _image2 = _interopRequireDefault(_image);

var _twitterSubmit = require("../../controllers/twitter-submit/twitter-submit");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var uploads = (0, _multer2.default)({ dest: "uploads" });