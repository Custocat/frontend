let express = require('express')
let path = require('path')
let fs = require('fs')

let app = express()

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'))
})

app.use(express.static('.'))

app.listen("8080", "127.0.0.1")