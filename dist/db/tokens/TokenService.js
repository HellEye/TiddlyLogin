"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenService = void 0;
const __1 = require("..");
const crypto_1 = require("crypto");
class TokenService {
    findToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const out = yield __1.Tokens.findOne({ token }).populate("user");
                return out;
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    createToken(userId, expireIn) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = (0, crypto_1.randomBytes)(24).toString("hex");
            return (yield __1.Tokens.create({ user: userId, token, expireIn })).token;
        });
    }
    refreshToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const foundToken = yield __1.Tokens.findOne({ token });
            foundToken === null || foundToken === void 0 ? void 0 : foundToken.refreshExpireDate();
        });
    }
    removeToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            yield __1.Tokens.deleteOne({ token });
        });
    }
}
const tokenService = new TokenService();
exports.tokenService = tokenService;
