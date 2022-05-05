import { Schema } from "mongoose"
import { prop, pre, Ref, mongoose } from '@typegoose/typegoose';
import bcrypt from "bcrypt"
import { Wiki } from "../wiki"


export enum PermissionLevel {
  guest = "guest",
  user = "user",
  admin = "admin"
}

@pre<User>("save", async function (next) {
  this.username = this.username.replace(" ", "").toLowerCase()
  if(!this.isModified('password')) return next()
  this.password = await bcrypt.hash(this.password, 10);
  next()
})
export class User {
  readonly _id!: string
  @prop({required: true, index: true})
  username: string
  @prop({required: true})
  password: string
  @prop({ required: true })
  permissionLevel: PermissionLevel

  @prop({
    ref: () => Wiki,
    type: () => mongoose.Types.ObjectId,
    default: [],
  })
  browseWikis: Ref<Wiki, mongoose.Types.ObjectId>[]

  @prop({
    ref: () => Wiki,
    type: () => mongoose.Types.ObjectId,
    default: [],
  })
  editWikis: Ref<Wiki, mongoose.Types.ObjectId>[]

  isPasswordMatching(passToCheck:string) {
    return bcrypt.compareSync(this.password, passToCheck)
  }
}


