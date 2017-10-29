"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _multer = require("multer");

var _multer2 = _interopRequireDefault(_multer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var uploads = (0, _multer2.default)({ dest: "uploads" });

function uploadRoute(app) {
    app.post("/image/upload", uploads.single("octocat"), function (req, res) {
        if (req.file.mimetype != "image/png") {
            _fs2.default.unlink(req.file.path);
            res.status(400).json({
                err: true,
                msg: "Invalid file type, image must be of content type: image/png"
            });
        } else if (_fs2.default.existsSync(req.file.path)) {
            res.json({
                err: false,
                msg: "Image uploaded succesfully.",
                image: {
                    id: req.file.filename
                }
            });
        } else {
            res.status(500).json({
                err: true,
                msg: "An unknown error occured."
            });
        }
    });

    app.route("/image/:id").get(function (req, res) {
        var imageId = req.params.id;
        if (_fs2.default.existsSync("uploads/" + imageId)) {
            res.sendFile(imageId, {
                root: "uploads",
                headers: {
                    "Content-Type": "image/png",
                    "image_id": imageId
                }
            }, function (err) {
                if (err) {
                    res.send(500).json({
                        err: true,
                        msg: err
                    });
                }
            });
        } else {
            res.status(400).json({
                err: true,
                msg: "image doesn't exist"
            });
        }
    }).delete(function (req, res) {
        var imageId = req.params.id;
        if (_fs2.default.existsSync("uploads/" + imageId)) {
            _fs2.default.unlinkSync("uploads/" + imageId);
            if (!_fs2.default.existsSync("uploads/" + imageId)) {
                res.json({
                    err: false,
                    msg: "Image deleted succesfully"
                });
            } else {
                res.status(500).json({
                    err: true,
                    msg: "unknown error has occured and the image has not been deleted"
                });
            }
        } else {
            res.status(400).json({
                err: true,
                msg: "image doesn't exist"
            });
        }
    });
}

exports.default = uploadRoute;