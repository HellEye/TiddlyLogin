import express, { Request, Response } from "express"
import {connectToMongo, createEndpoints} from "./db"
import cookieParser from "cookie-parser"
import { setUpForwarding } from "./forwarding"
import { createProxyMiddleware } from "http-proxy-middleware"
import { env } from "process"
const app = express()
app.use(express.json())

const PORT = 5000
app.use(cookieParser())
connectToMongo()
// setup(app)
setUpForwarding(app)
createEndpoints(app)
/* app.get("/", (req, res) => {
  return res.send(`
  url: ${req.url}<br>
  hostname: ${req.hostname}<br>
  header: ${JSON.stringify(req.headers)}<br>
  `)
}) */



app.listen(PORT, () => {
  console.log(`Server running on ${PORT} in ${env.NODE_ENV} env`)
})