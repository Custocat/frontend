import TwitterClient from "../../controllers/twitter/twitter"
import Image from "../../controllers/image/image"
import bodyParser from "body-parser"

function twitterRoutes(app) {
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: false }))
    app.post("/twitter/tweet", function (req, res) {
        console.log(req.body)
        let message = req.body.message
        TwitterClient.post("statuses/update", {
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
            })
        })
    })

    app.post("/image/:id/tweet", function (req, res) {
        let image = new Image(req.params.id)
        TwitterClient.post("media/upload", {media: image.image}, function(error, media, response) {
            if (!error) {
                let status = {
                    status: req.body.message,
                    media_ids: media.media_id_string
                }
                TwitterClient.post("statuses/update", status, function (error2, tweet2, response2) {
                    if (!error) {
                        res.json({
                            err: false,
                            msg: "tweet was successfull",
                            twitter_response: response2
                        })
                    } else {
                        res.status(500).json({
                            err: true,
                            msg: "tweet was unseccessfull",
                            twitter_error: error2,
                            twitter_response: response2
                        })
                    }
                })
            } else {
                res.status(500).json({
                    err: true,
                    msg: "tweet was unseccessfull",
                    twitter_error: error,
                    twitter_response: response
                })
            }
        })
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
    })
}

export default twitterRoutes