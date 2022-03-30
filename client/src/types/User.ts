import { DataType } from "./DataType"

export interface User extends DataType  {
  username: string
  permissionLevel: string
}