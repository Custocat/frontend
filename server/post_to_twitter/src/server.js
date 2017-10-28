import express from "express"
import environment from "node-env-file"

let env = environment(".env")
let app = express()

app.listen(env.PORT, env.HOST)
console.log("Server running on " + env.HOST + ":" + env.PORT + ". Use ctrl+c to stop.")