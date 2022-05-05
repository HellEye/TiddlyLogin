import { Express } from "express"
import wikiConfig from "../wikiConfig.json"
import { userService, userAuthService } from "../db"
import path from "path"
import { NotFoundError } from '../types/Errors';

const getSubdomain = (hostname) => {
	return hostname.split(".")[0]
}

const PANEL_SUBDOMAIN = "controlpanel"

const setUpForwarding = (app: Express) => {
	//authorization
	app.use("/wiki/:name", async (req, res, next) => {
		const subdomain = getSubdomain(req.hostname)
    const url = req.url
    const name = req.params.name
    console.log(`going to wiki ${name}`)
    if (req.cookies.token && !url.startsWith("/api")) {
      try {
        const user = await userAuthService.loginWithToken(
          req.cookies.token,
          req,
          res
        )
        if (user) {
          req.headers = {
            ...req.headers,
            wikiAuth: "asdf",
          }
        }
      } catch (e) {
        if (e instanceof NotFoundError) {
          next()
        }
        else {
          next(e)
        }
      }
			
		}
		next()
	})
	//Temp testing thing
	app.get("/wiki", (req, res) => {
		const hostName = req.hostname.split(".")[0]
		res.redirect(`http://localhost:${wikiConfig[hostName].port}`)
	})
}

export { setUpForwarding }
