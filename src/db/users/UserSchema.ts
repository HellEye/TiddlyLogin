import { Schema } from "mongoose"
import { prop, pre } from "@typegoose/typegoose"
import bcrypt from "bcrypt"

@pre<User>("save", async function (next) {
  this.username = this.username.replace(" ", "").toLowerCase()
  if(!this.isModified('password')) return next()
  this.password = await bcrypt.hash(this.password, 10);
  next()
})
export class User {
  readonly _id!: string
  @prop({required: true})
  username: string
  @prop({required: true})
  password: string
  @prop({ required: true })
  permissionLevel: string

  isPasswordMatching(passToCheck:string) {
    return bcrypt.compareSync(this.password, passToCheck)
  }
}


