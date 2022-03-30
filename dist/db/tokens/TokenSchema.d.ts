import { mongoose, Ref } from "@typegoose/typegoose";
import { User } from "../users";
export declare const DAY_IN_MILLISECONDS: number;
export declare class Token {
    readonly _id: string;
    user: Ref<User, mongoose.Types.ObjectId>;
    token: string;
    expireAt?: Date;
    expireIn: number;
    refreshExpireDate(expireIn?: number): void;
}
