"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Image = function Image(image_id) {
    _classCallCheck(this, Image);

    if (!_fs2.default.existsSync("uploads/" + image_id)) {
        throw Error("Image doesn't exist");
    }

    this.id = image_id;
    this.path = "uploads/" + image_id;
    // console.log(fs.statSync(this.path))
    this.size = _fs2.default.statSync(this.path).size;
};

exports.default = Image;