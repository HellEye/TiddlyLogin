import { DataType } from "./DataType"

export interface User extends DataType {
	username: string
	permissionLevel: string
	browseWikis: string[]
  editWikis: string[]
  password?: string
}
export interface UserWithPasswords extends User {
	currentPassword: string
	newPassword: string
	repeatNewPassword: string
}

export const defaultUser: User = {
	_id: "",
	username: "NewUser",
	permissionLevel: "user",
	browseWikis: [],
  editWikis: [],
  password: "123"
}

export const defaultUserWithPassword: UserWithPasswords = {
	...defaultUser,
	currentPassword: "",
	newPassword: "",
	repeatNewPassword: "",
}
