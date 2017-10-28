let express = require('express')
let path = require('path')
let fs = require('fs')

let app = express()

// Get all files in a folder and return an array containing their names
function getFiles(dir) {
    fileList = [];
    var files = fs.readdirSync(dir);
    for (var i in files) {
        if (!files.hasOwnProperty(i)) continue;
        var name = dir + '/' + files[i];
        if (!fs.statSync(name).isDirectory()) {
            fileList.push(name);
        }
    }
    return fileList;
}

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'))
})

app.get("/files", function(req, res) {
    // Sub image arrays
    var headImgArray = getFiles('images/head/')
    var armImgArray = getFiles('images/arms/')
    var legImgArray = getFiles('images/legs/')

    // Main array of image arrays
    var mainArray = [headImgArray, armImgArray, legImgArray]

    res.json(mainArray)
})

app.use(express.static('.'))

app.listen("8080", "127.0.0.1")
console.log("Server running on 127.0.0.1:8080. Use ctr+c to exit.")