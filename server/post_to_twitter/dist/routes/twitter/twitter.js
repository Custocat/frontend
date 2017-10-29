"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _twitter = require("../../controllers/twitter/twitter");

var _twitter2 = _interopRequireDefault(_twitter);

var _image = require("../../controllers/image/image");

var _image2 = _interopRequireDefault(_image);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function twitterRoutes(app) {
    app.use(_bodyParser2.default.json());
    app.use(_bodyParser2.default.urlencoded({ extended: false }));
    app.post("/twitter/tweet", function (req, res) {
        console.log(req.body);
        var message = req.body.message;
        _twitter2.default.post("statuses/update", {
            "Name": "A tweet",
            "status": message
        }, function (tweets, error, response) {
            res.json({
                err: false,
                msg: "tweet made succesfully",
                twitterData: {
                    tweets: response,
                    error: error,
                    response: response
                }
            });
        });
    });

    app.post("/image/:id/tweet", function (req, res) {
        var image = new _image2.default(req.params.id);
        _twitter2.default.post("media/upload", { media: image.image }, function (error, media, response) {
            if (!error) {
                var status = {
                    status: req.body.message,
                    media_ids: media.media_id_string
                };
                _twitter2.default.post("statuses/update", status, function (error2, tweet2, response2) {
                    if (!error) {
                        res.json({
                            err: false,
                            msg: "tweet was successfull",
                            twitter_response: response2
                        });
                    } else {
                        res.status(500).json({
                            err: true,
                            msg: "tweet was unseccessfull",
                            twitter_error: error2,
                            twitter_response: response2
                        });
                    }
                });
            } else {
                res.status(500).json({
                    err: true,
                    msg: "tweet was unseccessfull",
                    twitter_error: error,
                    twitter_response: response
                });
            }
        });
        // TwitterClient.post("media/upload", {
        //     name: image_name,
        //     command: "INIT",
        //     total_bytes: image.size
        // }).then(function (tweet) {
        //     res.json({
        //         err: false,
        //         msg: "",
        //         tweet: tweet
        //     })
        // }).catch(function (error) {
        //     res.status(500).json({
        //         err: true,
        //         msg: "an error occured",
        //         error: error
        //     })
        // })
    });
}

exports.default = twitterRoutes;