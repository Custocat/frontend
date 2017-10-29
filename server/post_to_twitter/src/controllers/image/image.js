import fs from "fs"
export default class Image
{
    constructor(image_id) {
        if (!fs.existsSync("uploads/" + image_id)) {
            throw Error("Image doesn't exist")
        }

        this.id = image_id
        this.path = "uploads/" + image_id
        this.size = fs.statSync(this.path).size
        this.image = fs.readFileSync(this.path)
    }
}