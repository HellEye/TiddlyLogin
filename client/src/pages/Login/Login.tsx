import { Button, Heading, Input } from "@chakra-ui/react"
import React, { useCallback, useState } from "react"
import Page from "../../components/Page/Page"
import { useUserContext } from "../../context/UserContext"

type Props = {}

const Login = (props: Props) => {
	const { login } = useUserContext()
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")

	const processKey = useCallback(
		(e: React.KeyboardEvent) => {
			if (e.key === "Enter") login(username, password)
		},
		[login, password, username]
	)
	return (
		<Page width="40%" maxWidth="30rem">
			<Heading size="xl">Log in</Heading>
			<Input
				name="username"
				type="text"
				onKeyDown={processKey}
				onChange={(e) => setUsername(e.target.value)}
				value={username}
				placeholder="Username"
			></Input>
			<Input
				name="password"
				type="password"
				onKeyDown={processKey}
				onChange={(e) => setPassword(e.target.value)}
				value={password}
				placeholder="Password"
			></Input>
			<Button size="lg" onClick={() => login(username, password)}>
				Login
			</Button>
		</Page>
	)
}

export { Login }
