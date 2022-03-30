import { User } from "./User"

export interface DataType {
	_id: string
}

type Setter<T> = (value: T) => void

export type AdditionalSetters<T extends DataType> = {
	_full: Setter<T>
}

export type SettersFor<T extends DataType> = {
	[key in keyof T]: Setter<T[key]>
}
