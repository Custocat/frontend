import fs from "fs"
import multer from "multer"

let uploads = multer({dest: "uploads"})

function uploadRoute(app) {
    app.post("/image/upload", uploads.single("octocat"), function (req, res) {
        if (req.file.mimetype != "image/png") {
            fs.unlink(req.file.path)
            res.status(400).json({
                err: true,
                msg: "Invalid file type, image must be of content type: image/png"
            })
        } else if (fs.existsSync(req.file.path)) {
            res.json({
                err: false,
                msg: "Image uploaded succesfully.",
                image: {
                    id: req.file.filename
                }
            })
        } else {
            res.status(500).json({
                err: true,
                msg: "An unknown error occured."
            })
        }
    })

    app.route("/image/:id")
        .get( function (req, res) {
            let imageId = req.params.id
            if(fs.existsSync("uploads/"+imageId)) {
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
                        })
                    }
                })
            } else {
                res.status(400).json({
                    err: true,
                    msg: "image doesn't exist"
                })
            }
        })
        .delete(function (req, res) {
            let imageId = req.params.id
            if (fs.existsSync("uploads/" + imageId)) {
                fs.unlinkSync("uploads/"+imageId)
                if (!fs.existsSync("uploads/" + imageId)) {
                    res.json({
                        err: false,
                        msg: "Image deleted succesfully"
                    })
                } else {
                    res.status(500).json({
                        err: true,
                        msg: "unknown error has occured and the image has not been deleted"
                    })
                }
            } else {
                res.status(400).json({
                    err: true,
                    msg: "image doesn't exist"
                })
            }
        })
}

export default uploadRoute