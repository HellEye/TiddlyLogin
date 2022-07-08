import { Tokens } from ".."
import { User } from "../users"
import { randomBytes } from "crypto"
import { Token } from "./TokenSchema"
import { Error, Document } from 'mongoose';
import { NotFoundError } from "../../types/Errors"
import util from "util"
import redis from "../../cache/redis"
class TokenService {
	async findToken(token: string) {
    try {
      const redisToken = JSON.parse(await redis.get(`token:${token}`))
      const tokenObj = redisToken || await Tokens.findOne({ token })?.populate<{ user: User }>("user")
      if (!redisToken && tokenObj) {
        redis.set(`token:${token}`, JSON.stringify(tokenObj._doc), {EX:300})
      }
      if (!tokenObj) {
				throw new NotFoundError("errors.tokenNotFound", "Token")
      }
      return tokenObj
		} catch (e) {
			if (e instanceof Error.DocumentNotFoundError)
        throw new NotFoundError("errors.tokenNotFound", "Token")
      throw e
		}
	}

	async createToken(userId: string, expireIn: number) {
    const token = randomBytes(24).toString("hex")
		return await Tokens.create({ user: userId, token, expireIn })
	}

	async refreshToken(token: string) {
		try {
			const foundToken = await Tokens.findOne({ token })
			foundToken?.refreshExpireDate()
			return foundToken
		} catch (e) {
			if (e instanceof Error.DocumentNotFoundError)
				throw new NotFoundError("errors.tokenNotFound", "Token")
		}
	}

	async removeToken(token: string) {
    try {
      redis.del(`token:${token}`)
			await Tokens.deleteOne({ token })
		} catch (e) {
			if (e instanceof Error.DocumentNotFoundError)
				throw new NotFoundError("errors.tokenNotFound", "Token")
		}
	}
}
const tokenService = new TokenService()
export { tokenService }
