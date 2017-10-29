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
        TwitterSubmit(newImage, "New custocat called " + req.body.name + " from " + req.body.submitter + ". Uploaded via the #api")
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
}