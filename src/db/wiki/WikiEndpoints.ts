import { Express } from "express"
import { AccessPermissionLevel, userAuthService } from "../users"
import { wikiService } from "./WikiService"
import { exec } from "child_process"
const createWikiEndpoints = (app: Express) => {
	app.get("/api/wiki", async (req, res) => {
		await userAuthService.isUserAllowed(
			req.cookies?.token,
			AccessPermissionLevel.admin
		)
		const out = await wikiService.getWikiList()
		return res.send(out)
	})
	app.get("/api/wiki/:id", async (req, res) => {
		const out = await wikiService.findWiki(req.params?.id)
		return res.send(out)
	})

	app.get("/api/wiki/:id/status", async (req, res) => {
		const wiki = await wikiService.findWiki(req.params.id)
		await userAuthService.isUserAllowed(
			req.cookies.token,
			AccessPermissionLevel.wikiBrowser,
			wiki
    )
    exec(`ping ${wiki.address} -c 1 -W 10`, (error, stdout, stderr) => {
      if (error)
        return res.send({ up: false })
      else {
        res.send({up: true})
      }
		})
	})

	app.post("/api/wiki", async (req, res) => {
		//TODO actually creating / updating wiki files
		await userAuthService.isUserAllowed(
			req.cookies?.token,
			AccessPermissionLevel.admin
		)
		const out = await wikiService.createWiki(req.body)
		return res.json(out)
	})

	app.post("/api/wiki/:id", async (req, res) => {
		await userAuthService.isUserAllowed(
			req.cookies?.token,
			AccessPermissionLevel.admin
		)
		const out = await wikiService.updateWiki(req.params?.id, req.body)
		return res.status(200).send(out)
	})

	app.delete("/api/wiki/:id", async (req, res) => {
		await userAuthService.isUserAllowed(
			req.cookies?.token,
			AccessPermissionLevel.admin
		)
		const out = await wikiService.removeWiki(req.params?.id)
		return res.status(200).send()
	})
}
export { createWikiEndpoints }
