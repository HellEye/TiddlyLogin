import React, { useCallback, useState } from "react"
import { useUserContext } from "../../../context/UserContext"

type Props = {}

const Login = (props: Props) => {
	const { login } = useUserContext()
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")

	const processKey = useCallback((e: React.KeyboardEvent) => {
		if (e.key === "Enter")
			login(username, password)
	}, [login, password, username])
	return (
		<div className="page login">
			<h1>Log in</h1>
			<input
				name="username"
				type="text"
				onKeyDown={processKey}
				onChange={(e) => setUsername(e.target.value)}
				value={username}
				placeholder="Username"
			></input>
			<input
				name="password"
				type="password"
				onKeyDown={processKey}
				onChange={(e) => setPassword(e.target.value)}
				value={password}
				placeholder="Password"
			></input>
			<button onClick={() => login(username, password)}>Login</button>
		</div>
	)
}

export { Login }
