/// <reference types="mongoose" />
import { Request, Response } from "express";
declare type UpdateUserInput = {
    _id: string;
    username?: string;
    newPassword?: string;
    currentPassword?: string;
    permissionLevel?: string;
};
declare class UserService {
    getAllUsers(): Promise<(import("mongoose").Document<string, import("@typegoose/typegoose/lib/types").BeAnObject, any> & import("./UserSchema").User & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: string;
    })[]>;
    updateUser(user: UpdateUserInput): Promise<{
        message: string;
        error?: undefined;
    } | {
        message: string;
        error: any;
    }>;
    getUser(_id: string): Promise<(import("mongoose").Document<string, import("@typegoose/typegoose/lib/types").BeAnObject, any> & import("./UserSchema").User & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: string;
    }) | {
        message: string;
        error: any;
    }>;
    getUserList(): Promise<(import("mongoose").Document<string, import("@typegoose/typegoose/lib/types").BeAnObject, any> & import("./UserSchema").User & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: string;
    })[] | {
        message: string;
        error: any;
    }>;
    createUser(username: string, password: string, permissionLevel: string): Promise<{
        message: string;
        ok?: undefined;
        error?: undefined;
    } | {
        message: string;
        ok: boolean;
        error?: undefined;
    } | {
        message: string;
        error: any;
        ok?: undefined;
    }>;
    loginWithUsername(username: string, password: string, req: Request, res: Response): Promise<{
        message: string;
        user?: undefined;
        token?: undefined;
    } | {
        user: import("mongoose").Document<string, import("@typegoose/typegoose/lib/types").BeAnObject, any> & import("./UserSchema").User & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
            _id: string;
        };
        token: string;
        message: string;
    }>;
    loginWithToken(token: string, req: Request, res: Response): Promise<{
        message: string;
        user?: undefined;
    } | {
        user: import("@typegoose/typegoose").Ref<import("./UserSchema").User, import("mongoose").Types.ObjectId> & import("./UserSchema").User;
        message: string;
    }>;
    logout(token: string): Promise<{
        message: string;
        error?: undefined;
    } | {
        message: string;
        error: any;
    }>;
    deleteUser(username: string): Promise<{
        message: string;
        error?: undefined;
    } | {
        message: string;
        error: any;
    }>;
}
declare const userService: UserService;
export { userService };
