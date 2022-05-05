import bcrypt from "bcrypt"
import { Error, QueryWithHelpers } from "mongoose"
import { NotFoundError } from "../../types/Errors"
import { tokenService, DAY_IN_MILLISECONDS } from "../tokens"
import { Users } from ".."
import {User} from "."
import { CookieOptions, Request, Response } from "express"
import { PermissionLevel, userAuthService } from "."
import { AccessPermissionLevel } from "./UserAuthService"
import { BadRequestError, UnauthorizedError } from "../../types/Errors"

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
		userToUpdate.update({
			$set: {
				username: user.username,
				password: user.newPassword,
				permissionLevel: user.permissionLevel,
			},
		})
		return userToUpdate
	}

  async getUser(_id: string) {
    try {
      const out = await Users.findOne({ _id }, { password: 0 })
      if (!out)
        throw new Error.DocumentNotFoundError("Document not found")
      return out
    } catch (e) {
      if(e instanceof Error.DocumentNotFoundError)
        throw new NotFoundError("User with given id not found", "User")
    }
	}
	async getUserList() {
		return await Users.find({}, { _id: 1 })
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
      if(e instanceof Error.DocumentNotFoundError)
        throw new NotFoundError("Username not found", "Username")
    }
  }
  
  async getUsersForWikiEdit(wikiId: string) {
    try {
      return await Users.find({editWikis: wikiId})
    } catch (e) {
      if (e instanceof Error.DocumentNotFoundError)
        throw new NotFoundError("No users found", "User")
    }
  }
  async getUsersForWikiBrowse(wikiId: string) {
    try {
      return await Users.find({browseWikis: wikiId})
    } catch (e) {
      if (e instanceof Error.DocumentNotFoundError)
        throw new NotFoundError("No users found", "User")
    }
  }
}

const userService = new UserService()
export { userService }
