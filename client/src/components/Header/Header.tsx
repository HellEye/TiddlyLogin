import React from "react"
import { useUserContext } from "../../context/UserContext"
import "./Header.css"

type Props = {}

const Header = (props: Props) => {
	const { user } = useUserContext()
	return (
		<div className="header">
			
			<h1>Header</h1>
			<div className="userDisplay">
				Logged in as <br />
				<span className="username">{user?.username ? user.username : "not logged in"}</span>
			</div>
		</div>
	)
}

export { Header }
