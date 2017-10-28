import express from "express"
import environment from "node-env-file"

// Route imports
import image from "./routes/image/image"
import twitter from "./routes/twitter/twitter"

let env = environment(".env")
let app = express()

// Routes
image(app)
twitter(app)

app.listen(env.PORT, env.HOST)
console.log("Server running on " + env.HOST + ":" + env.PORT + ". Use ctrl+c to stop.")