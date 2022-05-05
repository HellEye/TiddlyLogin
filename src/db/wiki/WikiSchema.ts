import { getModelForClass, prop, Ref } from "@typegoose/typegoose"
import { ObjectId, Schema } from "mongoose"
import { User } from "../users"

export class Wiki {
  readonly _id!: string
	@prop({ required: true, index: 1 })
	name: string

	@prop({ required: true })
	address: string

	@prop({ required: true, default: true })
	public: boolean

	@prop({ required: true })
	subdomain: string
}
