import { mongoose, pre, prop, Ref } from "@typegoose/typegoose"
import { User } from "../users"

export const DAY_IN_MILLISECONDS = 1000 * 60 * 60 * 24

const getTokenExpireDate = (expireIn: number) => {
	if (expireIn === -1) return undefined
	return new Date(Date.now() + expireIn * DAY_IN_MILLISECONDS)
}

@pre<Token>("save", async function (next) {
	this.refreshExpireDate()
	next()
})
export class Token {
	readonly _id!: string

	@prop({
		ref: () => User,
		type: () => mongoose.Types.ObjectId,
		required: true,
		index: true,
	}) 
	user: Ref<User, mongoose.Types.ObjectId>

	@prop({ required: true, index: true })
	token: string
	@prop()
	expireAt?: Date

	@prop({ required: true, default: 0 })
	expireIn: number

	refreshExpireDate(expireIn?: number) {
		this.expireAt = getTokenExpireDate(
			expireIn === undefined || expireIn === null ? this.expireIn : expireIn
		)
	}
}
