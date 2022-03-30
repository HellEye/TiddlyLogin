import { DataType } from "./DataType"

export interface Wiki extends DataType {
  name: string
  address: string
  public: boolean
  subdomain: string
}

