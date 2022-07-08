import { Schema } from "mongoose"
import { prop, pre, Ref, mongoose, DocumentType } from "@typegoose/typegoose"
import bcrypt from "bcrypt"
import { Wiki } from "../wiki"

export enum PermissionLevel {
	guest = "guest",
	user = "user",
	admin = "admin",
}

@pre<User>("save", async function (next) {
	if (this.isModified("username"))
		this.username = this.username.replace(" ", "").toLowerCase()
	if (this.isModified("password"))
		this.password = await bcrypt.hash(this.password, 10)
	next()
})
export class User {
	readonly _id!: string
	@prop({ required: true, index: true })
	username: string
	@prop({ required: true })
	password: string
	@prop({ required: true })
	permissionLevel: PermissionLevel

	@prop({
		ref: () => Wiki,
		type: () => String,
		default: [],
	})
	browseWikis: Ref<Wiki, string>[]

	@prop({
		ref: () => Wiki,
		type: () => String,
		default: [],
	})
	editWikis: Ref<Wiki, string>[]

	isPasswordMatching(passToCheck: string) {
		return bcrypt.compareSync(this.password, passToCheck)
	}
}
