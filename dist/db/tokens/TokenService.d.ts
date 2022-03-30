/// <reference types="mongoose" />
import { User } from "../users";
declare class TokenService {
    findToken(token: string): Promise<import("mongoose").Document<string, import("@typegoose/typegoose/lib/types").BeAnObject, any> & import("./TokenSchema").Token & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: string;
    } & {
        user: User;
    }>;
    createToken(userId: string, expireIn: number): Promise<string>;
    refreshToken(token: string): Promise<void>;
    removeToken(token: string): Promise<void>;
}
declare const tokenService: TokenService;
export { tokenService };
