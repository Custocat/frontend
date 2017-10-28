import express from "express"
import environment from "node-env-file"

// Route imports
import image from "./routes/image/image"

let env = environment(".env")
let app = express()

// Routes
image(app)

app.listen(env.PORT, env.HOST)
console.log("Server running on " + env.HOST + ":" + env.PORT + ". Use ctrl+c to stop.")