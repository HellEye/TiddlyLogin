import { Tokens } from ".."
import { User } from "../users"
import { randomBytes } from "crypto"

class TokenService {
	async findToken(token: string) {
		try {
			const out = await Tokens.findOne({ token }).populate<{ user: User }>(
				"user"
			)
			return out
		} catch (e) {
			console.log(e)
		}
	}

	async createToken(userId: string, expireIn: number) {
		const token = randomBytes(24).toString("hex")
		return (await Tokens.create({ user: userId, token, expireIn })).token
	}

	async refreshToken(token: string) {
		const foundToken = await Tokens.findOne({ token })
		foundToken?.refreshExpireDate()
	}

	async removeToken(token: string) {
		await Tokens.deleteOne({ token })
	}
}
const tokenService = new TokenService()
export { tokenService }
