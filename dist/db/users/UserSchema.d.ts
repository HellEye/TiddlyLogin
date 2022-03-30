export declare class User {
    readonly _id: string;
    username: string;
    password: string;
    permissionLevel: string;
    isPasswordMatching(passToCheck: string): boolean;
}
