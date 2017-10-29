import Image from "../../controllers/image/image"

export default function(app) {
    app.get("/images/all", function (req, res) {
        let images = Image.getAll()
        let cleanImages = []

        images.forEach(function(image) {
            cleanImages.push({
                id: image.id,
                submitter: image.submitter,
                name: image.name
            })
        })

        res.json(cleanImages)
    })
}