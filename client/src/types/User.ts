import { DataType } from "./DataType"

export interface User extends DataType {
	username: string
	permissionLevel: string
	browseWikis: string[]
	editWikis: string[]
}
export interface UserWithPasswords extends User {
	currentPassword: string
	newPassword: string
	repeatNewPassword: string
}

export const defaultUser: User = {
	_id: "",
	username: "",
	permissionLevel: "",
	browseWikis: [],
	editWikis: [],
}

export const defaultUserWithPassword: UserWithPasswords = {
	...defaultUser,
	currentPassword: "",
	newPassword: "",
	repeatNewPassword: "",
}
