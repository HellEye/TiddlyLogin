import { Express } from "express"
import wikiConfig from "../wikiConfig.json"
import { userService } from "../db"
import path from "path"

const getSubdomain = (hostname) => {
	return hostname.split(".")[0]
}

const PANEL_SUBDOMAIN = "controlpanel"

const setUpForwarding = (app: Express) => {
	//authorization
	app.use("", async (req, res, next) => {
    const subdomain = getSubdomain(req.hostname)
    const url = req.url
		if (subdomain === PANEL_SUBDOMAIN && url.length < 2) {
			return res.sendFile(path.join(path.dirname(require.main.filename), "/public/index.html"))
		}
		// console.log("cookies: ", req.cookies)
		if (req.cookies.token) {
			const user = await userService.loginWithToken(req.cookies.token, req, res)
			// console.log("user: ", user)
			if (user.user) {
				req.headers = {
					...req.headers,
					wikiAuth: "asdf",
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
