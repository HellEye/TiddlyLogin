import {
	Express,
	RequestHandler,
	Request,
	NextFunction,
	Response,
} from "express"
import wikiConfig from "../wikiConfig.json"
import { userService, userAuthService, wikiService } from "../db"
import path from "path"
import { NotFoundError } from "../types/Errors"
import { AccessPermissionLevel } from "../db/users/UserAuthService"
import axios from "axios"
import { Wiki } from "../db/wiki"
import proxy from "express-http-proxy"
import { PermissionLevel, User } from "../db/users"
import { createClient } from "redis"
import { ClientRequest, request } from "http"
import redis from "../cache/redis"
import util from "util"
import { ObjectId, PopulatedDoc } from "mongoose"
import { Ref } from "@typegoose/typegoose"

const getSubdomain = (hostname) => {
	return hostname.split(".")[0]
}

const addToCache = async (cacheName: string, key: string, value: string) => {}

const getData = async (wikiName: string, token: string) => {
  const redisWiki:Wiki = JSON.parse(await redis.get(`wiki:${wikiName}`))
  const wiki = redisWiki || await wikiService.findWikiByName(wikiName)
  if (!redisWiki && wiki) {
    redis.set(`wiki:${wikiName}`, JSON.stringify(wiki))
  }
	if (!wiki)
    throw new NotFoundError(`Wiki with name ${wikiName} not found`, "Wiki")
  
	const user = await userAuthService.isUserAllowed(
		token,
		AccessPermissionLevel.wikiBrowser,
		wiki
	)
	if (wiki) {
	}
	if (user) {
	}
	return {
		wiki,
		user,
	}
}

// const PANEL_SUBDOMAIN = "controlpanel"
const makeProxy = async (
	req: Request,
	res: Response,
	next: NextFunction,
	wiki: Wiki,
	user: User,
	address: string
) => {
	const out = proxy(address, {
		proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
			if (
				user.permissionLevel === PermissionLevel.admin ||
				user.editWikis.find((_id) => _id === wiki._id)
			) {
				proxyReqOpts.headers[`wikiAuthHeader`] = user.username
			}
			return proxyReqOpts
		},
	})(req, res, next)
	return out
}
const getProxy: RequestHandler = async (req, res, next) => {
	console.time("Proxy: pathCalc")
	const { wiki, user } = await getData(req.params?.name, req.cookies?.token)
	console.timeEnd("Proxy: pathCalc")
	return makeProxy(req, res, next, wiki, user, wiki.address)
}

const setUpForwarding = (app: Express) => {
	app.use(async (req, res, next) => {
		console.time("Proxy: tiddlyRequests")
		const hasHeader = req.headers?.["x-requested-with"] === "TiddlyWiki"
		const refererMatch = req.headers?.referer?.match("\\/(wiki)\\/(.*)")
		if (hasHeader || refererMatch?.[1] === "wiki") {
			const { user, wiki } = await getData(
				refererMatch?.[2],
				req.cookies?.token
			)
			const address = `${wiki.address}${req.url}`
			console.timeEnd("Proxy: tiddlyRequests")

			return proxy(address)(req, res, next)
		}
		console.timeEnd("Proxy: tiddlyRequests")
		next()
	})

	app.use("/wiki/:name", getProxy)
}

export { setUpForwarding }
