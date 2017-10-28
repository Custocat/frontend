import TwitterClient from "../../controllers/twitter/twitter"
import Image from "../../controllers/image/image"
import bodyParser from "body-parser"

function twitterRoutes(app) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.post("/twitter/tweet", function (req, res) {
        console.log(req.body);
        let message = req.body.message;
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
            });
        });
    });

    app.post("/image/:id/tweet", function (req, res) {
        let image_name = req.body.image_name;
        let image = new Image(req.params.id);
        TwitterClient.post("media/upload", {
            name: image_name,
            command: "INIT",
            total_bytes: image.size
        }).then(function (tweet) {
            res.json({
                err: false,
                msg: "",
                tweet: tweet
            })
        }).catch(function (error) {
            res.status(500).json({
                err: true,
                msg: "an error occured",
                error: error
            })
        })
    })
}

export default twitterRoutes