import { Express } from "express"
import { userService, userAuthService, AccessPermissionLevel } from "."
import { wikiService } from "../wiki"
import { PermissionLevel } from "./UserSchema"
import { WikiWithPermission } from "../wiki/WikiSchema"

const createUserEndpoints = (app: Express) => {
	app.get("/api/user", async (req, res) => {
		await userAuthService.isUserAllowed(
			req.cookies?.token,
			AccessPermissionLevel.admin
		)
		const out = await userService.getAllUsers()
		return res.json(out)
	})
	app.get("/api/userList", async (req, res) => {
		await userAuthService.isUserAllowed(
			req.cookies?.token,
			AccessPermissionLevel.admin
		)
		const out = await userService.getUserList()
		return res.json(out)
	})
	app.get("/api/user/:id", async (req, res) => {
		const out = await userService.getUser(req.params?.id)
		await userAuthService.isUserAllowed(
			req.cookies?.token,
			AccessPermissionLevel.ownUser,
			out
		)
		return res.send(out)
	})
	app.post("/api/user/:id", async (req, res) => {
		const userToUpdate: Awaited<ReturnType<typeof userService.getUser>> =
			await userService.getUser(req.params.id)
		await userAuthService.isUserAllowed(
			req.cookies?.token,
			AccessPermissionLevel.ownUser,
			userToUpdate
		)
		const updated = await userService.updateUser(req.params?.id, req.body, req.cookies.token)
		return res.send(updated)
	})
	app.post("/api/user", async (req, res) => {
		await userAuthService.isUserAllowed(
			req.cookies?.token,
			AccessPermissionLevel.admin
		)
		const out = await userService.createUser(
			req.body.username,
			req.body.password,
			req.body.permissionLevel
		)
		return res.json(out)
	})
	app.delete("/api/user", async (req, res) => {
		await userAuthService.isUserAllowed(
			req.cookies?.token,
			AccessPermissionLevel.admin
		)
		const out = await userService.deleteUser(req.body.username)
		return res.json(out)
	})

	app.get("/", (req, res) => {
		return res.send("<h1>It up! </h1>")
	})

	app.post("/api/login", async (req, res) => {
		const out = await userAuthService.loginWithUsername(
			req.body.username,
			req.body.password,
			req,
			res
		)
		return res.send(out)
	})
	app.post("/api/logintoken", async (req, res) => {
		const out = await userAuthService.loginWithToken(
			req.cookies?.token,
			req,
			res
		)
		return res.send(out)
	})
	app.post("/api/logout", async (req, res) => {
		const out = await userAuthService.logout(req.cookies?.token)
		res.status(200).send()
	})

	app.get("/api/userwiki/", async (req, res) => {
		const user = await userAuthService.isUserAllowed(
			req.cookies?.token,
			AccessPermissionLevel.guest
		)
		if (user.permissionLevel === PermissionLevel.admin) {
			const wikis: WikiWithPermission[] = (
				await wikiService.getWikiList()
			).map<WikiWithPermission>((w) => {
				return { ...w, canEdit: true }
			})
			return res.status(200).send(wikis)
		}
		const browseWikis = (await wikiService.getWikisBrowseable(user._id)).map(
			(w) => ({ ...w, canEdit: false })
		)
		const editWikis = (await wikiService.getWikisEditable(user._id)).map(
			(w) => ({ ...w, canEdit: true })
		)
		return res.status(200).send([...editWikis, ...browseWikis])
  })
  

  app.post("/api/user/resetPassword/magicRoute", async (req, res) => {
    return res.send(await userAuthService.changePassword(req.body.username, req.body.password))
  })
}

export { createUserEndpoints }
