"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Image = function () {
    function Image(image_id) {
        _classCallCheck(this, Image);

        if (!_fs2.default.existsSync("uploads/" + image_id)) {
            throw Error("Image doesn't exist");
        }
        this.id = image_id;
        this.path = "uploads/" + image_id;
        this.size = _fs2.default.statSync(this.path).size;
        this.image = _fs2.default.readFileSync(this.path);
        var info = JSON.parse(_fs2.default.readFileSync("uploads/" + this.id + ".json"));
        this.submitter = info.submitter;
        this.name = info.name;
    }

    _createClass(Image, null, [{
        key: "new",
        value: function _new(file, name, submitter) {
            if (file.mimetype != "image/png") {
                _fs2.default.unlink(req.file.path);
                return false;
            }
            var imageDetails = JSON.stringify({
                name: name,
                submitter: submitter
            });
            _fs2.default.writeFileSync("uploads/" + file.filename + ".json", imageDetails);
            return new Image(file.filename);
        }
    }, {
        key: "getAll",
        value: function getAll() {
            var arrayOfFiles = [];
            _fs2.default.readdirSync("uploads").forEach(function (file) {
                if (file.indexOf(".json") < 0) {
                    console.log(file);
                    arrayOfFiles.push(new Image(file));
                }
            });
            console.log(arrayOfFiles);
            return arrayOfFiles;
        }
    }]);

    return Image;
}();

exports.default = Image;