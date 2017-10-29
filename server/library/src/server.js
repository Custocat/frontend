import express from "express"
import environment from "node-env-file"
import path from "path"

let env = environment(".env")
let app = express()

// Default route
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname + "/public/index.html"))
})
app.get("/js/index.js", function (req, res) {
    res.sendFile(path.join(__dirname + "/public/js/index.js"))
})
app.get("/js/main.css", function (req, res) {
    res.sendFile(path.join(__dirname + "/public/css/main.css"))
})

app.use("*", function (req, res) {
    res.sendFile(path.join(__dirname + "/special_endpoint/404.html"))
});

app.listen(env.PORT, env.HOST)
console.log("Server running on " + env.HOST + ":" + env.PORT + ". Use ctrl+c to stop.")