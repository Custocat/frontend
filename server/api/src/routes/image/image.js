import bodyParser from "body-parser"
import multer from "multer"
import Image from "../../controllers/image/image"
import { submit as TwitterSubmit } from "../../controllers/twitter-submit/twitter-submit"

let uploads = multer({ dest: "uploads" })

export default function(app) {
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: false }))

    app.post("/image", uploads.single("octocat"), function(req, res) {
        let newImage = Image.new(req.file, req.body.name, req.body.submitter)
        console.log(newImage)
        TwitterSubmit(newImage, "@GitHubEducation " + req.body.submitter + " just created a #myoctocat called " + req.body.name + ". #HackNotts")
        if (newImage === false) {
            res.status(400).json({
                err: true,
                msg: "Invalid file type, image must be of content type: image/png"
            })
        } else {
            res.json({
                err: false,
                msg: "Image uploaded succesfully.",
                image: {
                    id: newImage.id
                }
            })
        }
    })

    app.get("/image/:id", function (req, res) {
        let imageId = req.params.id
        try {
            let image = new Image(imageId)
        } catch (e) {
            res.status(400).json({
                err: true,
                msg: "image doesn't exist"
            })
        }
        res.sendFile(imageId, {
            root: "uploads",
            headers: {
                "Content-Type": "image/png",
                "image_id": imageId
            }
        })
    })
}