import { User, userService } from "./users";
import { Wiki, wikiService } from "./wiki";
import { Token, tokenService } from "./tokens";
import connectToMongo from "./connect";
import { Express } from "express";
export declare const Users: import("@typegoose/typegoose").ReturnModelType<typeof User, import("@typegoose/typegoose/lib/types").BeAnObject>;
export declare const Tokens: import("@typegoose/typegoose").ReturnModelType<typeof Token, import("@typegoose/typegoose/lib/types").BeAnObject>;
export declare const Wikis: import("@typegoose/typegoose").ReturnModelType<typeof Wiki, import("@typegoose/typegoose/lib/types").BeAnObject>;
declare const createEndpoints: (app: Express) => void;
export { connectToMongo, userService, tokenService, wikiService, createEndpoints };
