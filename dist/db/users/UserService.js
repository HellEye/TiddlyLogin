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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const tokens_1 = require("../tokens");
const __1 = require("..");
const tokenCookieOptions = (expireIn) => ({
    maxAge: tokens_1.DAY_IN_MILLISECONDS * expireIn,
    path: "/",
    sameSite: "lax",
});
class UserService {
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield __1.Users.find({});
        });
    }
    updateUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userToUpdate = yield __1.Users.findOne({ _id: user._id });
                if (!userToUpdate)
                    return { message: "user.errors.userNotFound" };
                if (!user.currentPassword)
                    return { message: "user.errors.noCurrentPassword" };
                if (!userToUpdate.isPasswordMatching(user.currentPassword))
                    return { message: "user.errors.noPasswordMatch" };
                userToUpdate.update({
                    username: user.username,
                    password: user.newPassword,
                    permissionLevel: user.permissionLevel,
                });
                userToUpdate.save();
                return { message: "user.messages.updateSuccess" };
            }
            catch (e) {
                return { message: "user.errors.unknownError", error: e };
            }
        });
    }
    getUser(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield __1.Users.findOne({ _id }, { password: 0 });
            }
            catch (e) {
                return { message: "user.errors.unknownError", error: e };
            }
        });
    }
    getUserList() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield __1.Users.find({}, { _id: 1 });
            }
            catch (e) {
                return { message: "user.errors.unknownError", error: e };
            }
        });
    }
    createUser(username, password, permissionLevel) {
        return __awaiter(this, void 0, void 0, function* () {
            const userWithSameName = yield __1.Users.findOne({
                username: username.replace(" ", "").toLowerCase(),
            }, {}, { lean: true });
            if (userWithSameName) {
                return { message: "register.errors.usernameExists" };
            }
            try {
                yield __1.Users.create({ username, password, permissionLevel });
                return { message: "register.messages.registerSuccess", ok: true };
            }
            catch (e) {
                console.error(e);
                return { message: "register.errors.unknownError", error: e };
            }
        });
    }
    loginWithUsername(username, password, req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!username || !password)
                return { message: "login.errors.noUsernameOrPassword" };
            try {
                const expireIn = req.cookies.expireIn || 7;
                const user = yield __1.Users.findOne({ username }, {}, { lean: true });
                if (!user)
                    return { message: "login.errors.userNotFound" };
                if (!(yield bcrypt_1.default.compare(password, user.password)))
                    return { message: "login.errors.incorrectPassword" };
                const token = yield tokens_1.tokenService.createToken(user._id, expireIn);
                res.cookie("token", token, tokenCookieOptions(expireIn));
                user.password = undefined;
                return {
                    user,
                    token,
                    message: "login.message.loginSuccessful",
                };
            }
            catch (e) {
                return { message: "login.errors.unknownError" };
            }
        });
    }
    loginWithToken(token, req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const foundToken = yield tokens_1.tokenService.findToken(token);
                if (!foundToken) {
                    return { message: "login.errors.tokenNotFound" };
                }
                foundToken.refreshExpireDate(req.cookies.expireIn);
                yield foundToken.save();
                res.cookie("token", token, tokenCookieOptions(foundToken.expireIn));
                foundToken.user.password = undefined;
                return {
                    user: foundToken.user,
                    message: "login.messages.loginSuccessful",
                };
            }
            catch (e) {
                return { message: "login.errors.unknownError" };
            }
        });
    }
    logout(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield tokens_1.tokenService.removeToken(token);
                return { message: "login.messages.logoutSuccess" };
            }
            catch (e) {
                return { message: "login.errors.unknownError", error: e };
            }
        });
    }
    deleteUser(username) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield __1.Users.deleteOne({ username });
                return { message: "login.messages.userDeleted" };
            }
            catch (e) {
                return { message: "login.errors.unknownError", error: e };
            }
        });
    }
}
const userService = new UserService();
exports.userService = userService;
