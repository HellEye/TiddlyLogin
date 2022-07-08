import { Error } from "mongoose"
import { NotFoundError } from "../../types/Errors"
import { Users } from ".."
import { PermissionLevel, userAuthService } from "."
import { AccessPermissionLevel } from "./UserAuthService"
import { BadRequestError, UnauthorizedError } from "../../types/Errors"
import redis from "../../cache/redis"

type UpdateUserInput = {
	_id: string
	username?: string
	newPassword?: string
	currentPassword?: string
	permissionLevel?: PermissionLevel
	browseWikis?: string[]
	editWikis?: string[]
}
class UserService {
	async getAllUsers() {
		return await Users.find({}, { password: 0 })
	}

	async updateUser(
		_id: string,
		user: UpdateUserInput,
		updatingUserToken: string
	) {
		const userToUpdate = await Users.findOne({ _id })
		const updatingUser = await userAuthService.isUserAllowed(
			updatingUserToken,
			AccessPermissionLevel.ownUser,
			userToUpdate
		)
		if (updatingUser.permissionLevel !== PermissionLevel.admin) {
			if (!user.currentPassword)
				throw new BadRequestError("Current password not provided")
			if (!userToUpdate.isPasswordMatching(user.currentPassword))
				throw new UnauthorizedError("Provided password doesn't match")
		}
		userToUpdate.username = user.username
		userToUpdate.permissionLevel = user.permissionLevel
		userToUpdate.browseWikis = user.browseWikis
		userToUpdate.editWikis = user.editWikis
		if (user.newPassword) userToUpdate.password = user.newPassword

		await userToUpdate.save()
    userToUpdate.password = undefined
		redis.set(`user:${_id}`, JSON.stringify(userToUpdate), { EX: 300 })
		return userToUpdate
	}

	async getUser(_id: string) {
		try {
			const redisUser = JSON.parse(await redis.get(`user:${_id}`))
      const out = redisUser || (await Users.findOne({ _id }, { password: 0 }))
			if (!redisUser && out) {
				redis.set(`user:${_id}`, JSON.stringify(out), { EX: 300 })
			}
			if (!out) throw new Error.DocumentNotFoundError("Document not found")
			return out
		} catch (e) {
			if (e instanceof Error.DocumentNotFoundError)
				throw new NotFoundError("User with given id not found", "User")
		}
	}
	async getUserList() {
		return await Users.find({}, { _id: 1, password: 0 })
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
		if (userWithSameName) throw new BadRequestError("Username already taken")

		const newUser = await Users.create({ username, password, permissionLevel })
		newUser.password = undefined
		return newUser
	}

	async deleteUser(username: string) {
		try {
			await Users.deleteOne({ username })
		} catch (e) {
			if (e instanceof Error.DocumentNotFoundError)
				throw new NotFoundError("Username not found", "Username")
		}
	}

	async getUsersForWikiEdit(wikiId: string) {
		try {
			return await Users.find({ editWikis: wikiId })
		} catch (e) {
			if (e instanceof Error.DocumentNotFoundError)
				throw new NotFoundError("No users found", "User")
		}
	}
	async getUsersForWikiBrowse(wikiId: string) {
		try {
			return await Users.find({ browseWikis: wikiId })
		} catch (e) {
			if (e instanceof Error.DocumentNotFoundError)
				throw new NotFoundError("No users found", "User")
		}
	}
}

const userService = new UserService()
export { userService }
