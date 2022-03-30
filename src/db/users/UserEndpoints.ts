import { Express } from "express"
import { userService } from "."
const createUserEndpoints = (app: Express) => {
	app.get("/api/userList", async (req, res) => {
		const out = await userService.getUserList()
		return res.json(out)
	})
	app.get("/api/user/:id", async (req, res) => {
		if(!req.params.id) return {message: "user.errors.noId"}
		const out = await userService.getUser(req.params.id)
		return res.send(out)
	})
	app.post("/api/user/:id", async (req, res) => {
		const out = await userService.updateUser(req.params.id, req.body, req.cookies.token)
		return res.send(out)
	})
	app.post("/api/user", async (req, res) => {
		const out = await userService.createUser(
			req.body.username,
			req.body.password,
			req.body.permissionLevel
		)
		return res.json(out)
	})
	app.delete("/api/user", async (req, res) => {
		const out = await userService.deleteUser(req.body.username)
		return res.json(out)
	})

	app.get("/", (req, res) => {
		return res.send("<h1>Yes it's working </h1>")
	})

	app.post("/api/login", async (req, res) => {
		const out = await userService.loginWithUsername(
			req.body.username,
			req.body.password,
			req,
			res
		)
		return res.send(out)
	})
	app.post("/api/logintoken", async (req, res) => {
		const out = await userService.loginWithToken(req.cookies?.token, req, res)
		return res.send(out)
	})

}

export {createUserEndpoints}