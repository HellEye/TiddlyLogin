import bcrypt from "bcrypt"
import { tokenService, DAY_IN_MILLISECONDS } from "../tokens"
import { Users } from ".."
import { CookieOptions, Request, Response } from "express"

const tokenCookieOptions = (expireIn: number): CookieOptions => ({
	maxAge: DAY_IN_MILLISECONDS * expireIn,
	path: "/",
	sameSite: "lax",
})
type CreateUserInput = {
	username: string
	password: string
}
type UpdateUserInput = {
	_id: string
	username?: string
	newPassword?: string
	currentPassword?: string
	permissionLevel?: string
}
class UserService {
	async getAllUsers() {
		return await Users.find({})
	}

	async updateUser(
		_id: string,
		user: UpdateUserInput,
		updatingUserToken: string
	) {
		try {
			const updatingUser = (await tokenService.findToken(updatingUserToken))
				.user
			const userToUpdate = await Users.findOne({ _id })
			if (!userToUpdate) return { message: "user.errors.userNotFound" }
			if (!updatingUser.permissionLevel.toLowerCase().includes("admin")) {
				if (!user.currentPassword)
					return { message: "user.errors.noCurrentPassword" }
				if (!userToUpdate.isPasswordMatching(user.currentPassword))
					return { message: "user.errors.noPasswordMatch" }
			}
			userToUpdate.update({
				$set: {
					username: user.username,
					password: user.newPassword,
					permissionLevel: user.permissionLevel,
				},
			})
			return { message: "user.messages.updateSuccess" }
		} catch (e) {
			return { message: "user.errors.unknownError", error: e }
		}
	}

	async getUser(_id: string) {
		try {
			return await Users.findOne({ _id }, { password: 0 })
		} catch (e) {
			return { message: "user.errors.unknownError", error: e }
		}
	}
	async getUserList() {
		try {
			return await Users.find({}, { _id: 1 })
		} catch (e) {
			return { message: "user.errors.unknownError", error: e }
		}
	}
	async createUser(
		username: string,
		password: string,
		permissionLevel: string
	) {
		const userWithSameName = await Users.findOne(
			{
				username: username.replace(" ", "").toLowerCase(),
			},
			{},
			{ lean: true }
		)
		if (userWithSameName) {
			return { message: "register.errors.usernameExists" }
		}
		try {
			await Users.create({ username, password, permissionLevel })
			return { message: "register.messages.registerSuccess", ok: true }
		} catch (e) {
			console.error(e)
			return { message: "register.errors.unknownError", error: e }
		}
	}

	async loginWithUsername(
		username: string,
		password: string,
		req: Request,
		res: Response
	) {
		if (!username || !password)
			return { message: "login.errors.noUsernameOrPassword" }
		try {
			const expireIn = req.cookies.expireIn || 7
			const user = await Users.findOne({ username }, {}, { lean: true })
			if (!user) return { message: "login.errors.userNotFound" }
			if (!(await bcrypt.compare(password, user.password)))
				return { message: "login.errors.incorrectPassword" }
			const token = await tokenService.createToken(user._id, expireIn)
			res.cookie("token", token, tokenCookieOptions(expireIn))
			user.password = undefined
			return {
				user,
				token,
				message: "login.message.loginSuccessful",
			}
		} catch (e) {
			return { message: "login.errors.unknownError" }
		}
	}

	async loginWithToken(token: string, req: Request, res: Response) {
		try {
			const foundToken = await tokenService.findToken(token)
			if (!foundToken) {
				return { message: "login.errors.tokenNotFound" }
			}

			foundToken.refreshExpireDate(req.cookies.expireIn)
			await foundToken.save()
			res.cookie("token", token, tokenCookieOptions(foundToken.expireIn))
			foundToken.user.password = undefined
			return {
				user: foundToken.user,
				message: "login.messages.loginSuccessful",
			}
		} catch (e) {
			return { message: "login.errors.unknownError" }
		}
	}
	async logout(token: string) {
		try {
			await tokenService.removeToken(token)
			return { message: "login.messages.logoutSuccess" }
		} catch (e) {
			return { message: "login.errors.unknownError", error: e }
		}
	}

	async deleteUser(username: string) {
		try {
			await Users.deleteOne({ username })
			return { message: "login.messages.userDeleted" }
		} catch (e) {
			return { message: "login.errors.unknownError", error: e }
		}
	}
}

const userService = new UserService()
export { userService }
