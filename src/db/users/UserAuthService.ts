import bcrypt from "bcrypt"
import { tokenService, DAY_IN_MILLISECONDS } from "../tokens"
import { Users } from ".."
import { CookieOptions, Request, Response } from "express"
import {
	BadRequestError,
	NotFoundError,
	UnauthorizedError,
} from "../../types/Errors"
import { User, userService } from "."
import { Wiki } from "../wiki/WikiSchema"
import redis from "../../cache/redis"

const tokenCookieOptions = (expireIn: number): CookieOptions => ({
	maxAge: DAY_IN_MILLISECONDS * expireIn,
	path: "/",
	sameSite: "lax",
})

export enum AccessPermissionLevel {
	guest = "guest",
	wikiBrowser = "wikiBrowser",
	wikiEditor = "wikiEditor",
	user = "user",
	ownUser = "ownUser",
	admin = "admin",
}

type PermissionCheckerType = {
	[key in AccessPermissionLevel]: (user: User, target?: User | Wiki) => boolean
}

const PermissionChecker: PermissionCheckerType = {
	admin: (user) => user.permissionLevel === "admin",
	guest: (user) => !!user,
	user: (user) => user.permissionLevel !== "guest",
	ownUser: (user, target: User) =>
		(user.permissionLevel === "admin") || user._id === target._id,
	wikiEditor: (user, target: Wiki) =>
		PermissionChecker.admin(user) ||
		user.editWikis.findIndex((w) => w === target._id) > -1,
	wikiBrowser: (user, target: Wiki) =>
    target.public ||
		PermissionChecker.wikiEditor(user) ||
		user.browseWikis.findIndex((w) => w === target._id) > -1,
}

class UserAuthService {
	async loginWithUsername(
		username: string,
		password: string,
		req: Request,
		res: Response
	) {
		if (!username || !password)
			throw new BadRequestError("No username or password")
		const expireIn = req.cookies.expireIn || 7
		const user = await Users.findOne({ username }, {}, { lean: true })
		if (!user || !(await bcrypt.compare(password, user.password)))
      throw new UnauthorizedError("Wrong username or password")
    
    const token = await tokenService.createToken(user._id, expireIn)
    await redis.set(`token:${token.token}`, JSON.stringify({
      ...token,
      user
    }), {
      EX:600
    })
		res.cookie("token", token.token, tokenCookieOptions(expireIn))
		user.password = undefined
		return {
			user,
			token,
		}
	}

  async loginWithToken(token: string, req: Request, res: Response) {
    const redisToken = JSON.parse(await redis.get(`token:${token}`))
    if (redisToken) {
      return redisToken.user
    }
		const foundToken = await tokenService.findToken(token)
		foundToken.refreshExpireDate(req.cookies?.expireIn || 7)
		await foundToken.save()
		res.cookie(
			"token",
			foundToken.token,
			tokenCookieOptions(foundToken.expireIn)
		)
		foundToken.user.password = undefined
		return foundToken.user
	}

	async logout(token: string) {
		await tokenService.removeToken(token)
	}

	async changePassword(username: string, newPassword: string) {
		if (!username || !newPassword)
			throw new BadRequestError("No username or password")
    const user = await Users.findOne({ username })
    user.password = newPassword
    user.save()
    return true
  }

	async isUserAllowed(
		token: string,
		requiredLevel: AccessPermissionLevel,
		target?: User | Wiki
  ) {
    const redisToken = JSON.parse(await redis.get(`token:${token}`))
    const tokenObj = redisToken || (await tokenService.findToken(token))
    if (!redisToken && tokenObj) {
      redis.set(`token:${token}`, JSON.stringify({
        ...tokenObj._doc
      }), {EX: 300})
    }
    if(tokenObj && tokenObj.user)
      tokenObj.user.password = undefined
		if (PermissionChecker[requiredLevel](tokenObj.user, target)) return tokenObj.user
		throw new UnauthorizedError("Insufficient permission to edit this resource")
	}
}

const userAuthService = new UserAuthService()

export { userAuthService }
