import fs from "fs"
export default class Image {
    constructor(image_id) {
        if (!fs.existsSync("uploads/" + image_id)) {
            throw Error("Image doesn't exist")
        }
        this.id = image_id
        this.path = "uploads/" + image_id
        this.size = fs.statSync(this.path).size
        this.image = fs.readFileSync(this.path)
        if (fs.existsSync("uploads/" + this.id + ".json")) {
            let info = JSON.parse(fs.readFileSync("uploads/" + this.id + ".json"))
            this.submitter = info.submitter
            this.name = info.name
        } else {
            this.submitter = "Unknwon"
            this.name = "Unknown"
        }
    }

    static new (file, name, submitter) {
        if (file.mimetype != "image/png") {
            fs.unlink(req.file.path)
            return false
        }
        let imageDetails = JSON.stringify({
            name: name,
            submitter: submitter
        })
        fs.writeFileSync("uploads/" + file.filename + ".json", imageDetails)
        return new Image(file.filename)
    }

    static getAll() {
        let arrayOfFiles = []
        fs.readdirSync("uploads").forEach(function(file) {
            if (file.indexOf(".json") < 0) {
                console.log(file)
                arrayOfFiles.push(new Image(file))
            }
        })
        console.log(arrayOfFiles)
        return arrayOfFiles
    }
}