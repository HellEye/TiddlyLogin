import { DataType } from "./DataType"

export interface Wiki extends DataType {
	name: string
	address: string
	public: boolean
  subdomain: string
  description: string
}

export interface WikiWithAccess extends Wiki {
  canEdit: boolean
}

export const defaultWiki: Wiki = {
	_id: "",
	address: "localhost",
	name: "New Wiki",
	public: false,
  subdomain: "subdomain",
  description: ""
}

export const defaultWikiWithAccess: WikiWithAccess = {
  ...defaultWiki,
  canEdit: false
}