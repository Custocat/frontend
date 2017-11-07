import express from "express"
import path from "path"
import fs from "fs"
import environment from "node-env-file"
let env = environment(".env")

let app = express()

// Get all files in a folder and return an array containing their names
function getFiles(dir) {
    let fileList = []
    var files = fs.readdirSync(dir)
    for (var i in files) {
        if (!files.hasOwnProperty(i)) continue
        var name = dir + "/" + files[i]
        if (!fs.statSync(name).isDirectory()) {
            fileList.push(name.replace(__dirname + "/public/", ""))
        }
    }
    return fileList
}

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname + "/public/index.html"))
})

app.get("/files", function(req, res) {
    // Sub image arrays
    var headImgArray = getFiles(__dirname + "/public/images/head/")
    var armImgArray = getFiles(__dirname + "/public/images/arms/")
    var legImgArray = getFiles(__dirname + "/public/images/legs/")

    // Main array of image arrays
    var mainArray = [headImgArray, armImgArray, legImgArray]

    res.json(mainArray)
})

app.use(express.static(__dirname + "/public"))

app.listen(env.PORT, env.HOST)
console.log("Server running on " + env.HOST + ":" + env.PORT + ". Use ctr+c to exit.")

if (process.argv.slice(2)[0] == "test") {
    process.exit(0)
}