import { DataType } from "./DataType"

export interface Wiki extends DataType {
	name: string
	address: string
	public: boolean
	subdomain: string
}

export const defaultWiki: Wiki = {
	_id: "",
	address: "localhost",
	name: "New Wiki",
	public: false,
	subdomain: "subdomain",
}
