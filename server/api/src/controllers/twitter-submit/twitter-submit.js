import request from "request"
import environment from "node-env-file"
import fs from "fs"

let env = environment(".env")

function submit(image, message) {
    var formData = {
        octocat: {
            value: fs.createReadStream("uploads/" + image.id),
            options: {
                filename: image.id,
                contentType: 'image/png'
            }
        }
    }
    request.post({ url: env.twitterApi + "/image/upload", formData: formData }, function(err, httpResponse, body) {
        if (err) {
            return console.error('upload failed:', err);
        }
        console.log(body)
        let image_id = JSON.parse(body).image.id
        request.post({ url: env.twitterApi + "/image/" + image_id + "/tweet", form: {message: message}})
    })
}

export { submit }