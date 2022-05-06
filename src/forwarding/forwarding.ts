import { Express, RequestHandler } from "express"
import wikiConfig from "../wikiConfig.json"
import { userService, userAuthService, wikiService } from "../db"
import path from "path"
import { NotFoundError } from "../types/Errors"
import { AccessPermissionLevel } from "../db/users/UserAuthService"
import axios from "axios"
import { Wiki } from "../db/wiki"
import proxy from "express-http-proxy"
import { PermissionLevel } from "../db/users"

const getSubdomain = (hostname) => {
	return hostname.split(".")[0]
}

// const PANEL_SUBDOMAIN = "controlpanel"

const getProxy: RequestHandler = async (req, res, next) => {
  console.log("received proxy request for ", req.params?.name)
	console.time("Proxy: pathCalc")
	const wiki = await wikiService.findWikiByName(req.params?.name)
	const user = await userAuthService.isUserAllowed(
		req.cookies?.token,
		AccessPermissionLevel.wikiBrowser,
		wiki
	)
  console.timeEnd("Proxy: pathCalc")
  
	return proxy(wiki.address, {
		proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
			if (
				user.permissionLevel === PermissionLevel.admin ||
				user.editWikis.find(({ _id }) => _id === wiki._id)
			) {
				console.log("Giving edit permission")
				if (user.permissionLevel === PermissionLevel.admin)
					console.log("User is admin")
				if (user.editWikis.find(({ _id }) => _id === wiki._id))
					console.log("User is editor")
				proxyReqOpts.headers[`wikiAuthHeader`] = "magic header"
      }
      console.log("Proxy finished, granting access to ", wiki.name)
			return proxyReqOpts
		},
	})(req, res, next)
}

const setUpForwarding = (app: Express) => {
  
  app.use("/api/getwiki/", (req, res, next) => {
    console.log("test with wiki")
  })
	app.use("/wiki/:name", getProxy)

	//authorization
	/* app.use("/wiki/:name", async (req, res, next) => {
		console.time("wikiQuery")
		const subdomain = getSubdomain(req.hostname)
		const url = req.url
		const name = req.params.name
		console.log(`going to wiki ${name}`)
		const wiki = await wikiService.findWikiByName(req.params?.name)
		await userAuthService.isUserAllowed(
			req.cookies?.token,
			AccessPermissionLevel.wikiBrowser,
			wiki
		)
		req.headers = {
			...req.headers,
			wikiAuth: "asdf",
		}
		console.timeEnd("wikiQuery")
    req.pipe(request({uri: wiki.address})).pipe(res)
	}) */
	//Temp testing thing

	// app.use("/wiki/:name", async (req, res) => {})
	/* app.use("/wiki/:name", createProxyMiddleware({
    on: {
      proxyReq: () => {
        
      }
    }
  })) */
}

export { setUpForwarding }
