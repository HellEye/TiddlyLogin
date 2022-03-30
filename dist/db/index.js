"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEndpoints = exports.wikiService = exports.tokenService = exports.userService = exports.connectToMongo = exports.Wikis = exports.Tokens = exports.Users = void 0;
const users_1 = require("./users");
Object.defineProperty(exports, "userService", { enumerable: true, get: function () { return users_1.userService; } });
const wiki_1 = require("./wiki");
Object.defineProperty(exports, "wikiService", { enumerable: true, get: function () { return wiki_1.wikiService; } });
const tokens_1 = require("./tokens");
Object.defineProperty(exports, "tokenService", { enumerable: true, get: function () { return tokens_1.tokenService; } });
const connect_1 = __importDefault(require("./connect"));
exports.connectToMongo = connect_1.default;
const typegoose_1 = require("@typegoose/typegoose");
exports.Users = (0, typegoose_1.getModelForClass)(users_1.User);
exports.Tokens = (0, typegoose_1.getModelForClass)(tokens_1.Token);
exports.Wikis = (0, typegoose_1.getModelForClass)(wiki_1.Wiki);
const createEndpoints = (app) => {
    (0, users_1.createUserEndpoints)(app);
    (0, wiki_1.createWikiEndpoints)(app);
};
exports.createEndpoints = createEndpoints;
