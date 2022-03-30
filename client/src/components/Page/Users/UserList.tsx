import React, { useEffect, useState } from "react"
import "./UserList.css"
import {useFetch} from "use-http"
import axios from "axios"
import UserField from "./UserField/UserField"
import { User } from "../../../types"
type Props = {}

const UserList = (props: Props) => {
  const {request, loading, data} = useFetch<{_id:string}[]>()

  useEffect(() => {
    request.get("/api/userList")
  }, [request])
	return (
		<div className="page userList">
			<h1>User list</h1>
			{loading?"Loading...":data?.map(({_id}) => {
				return <UserField key={_id} userId={_id} />
			})}
		</div>
	)
}

export { UserList }
