import { User, userService, createUserEndpoints } from "./users"
import {Wiki, wikiService, createWikiEndpoints} from "./wiki"
import { Token, tokenService } from "./tokens"
import connectToMongo from "./connect"
import {Express} from "express"
import { getModelForClass } from "@typegoose/typegoose"
export const Users = getModelForClass(User)
export const Tokens = getModelForClass(Token)
export const Wikis = getModelForClass(Wiki)

const createEndpoints = (app: Express) => {
  createUserEndpoints(app)
  createWikiEndpoints(app)
}

export {
  connectToMongo,
  userService,
  tokenService,
  wikiService,
  createEndpoints
}
