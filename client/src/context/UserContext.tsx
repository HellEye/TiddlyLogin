import react, { useCallback, useContext, useEffect, useState } from "react"
import { useCookies } from "react-cookie"
import axios from "axios"
import { User } from "../types"

export type UserContextType = {
	user?: User
	login: (username: string, password: string) => void
	logout: () => void
}

const defaultContext: UserContextType = {
	login: (username, password) => {},
	logout: () => {},
}

const UserContext = react.createContext(defaultContext)

type PropType = {
	children: React.ReactNode
}

const UserContextProvider = ({ children }: PropType) => {
	const [user, setUser] = useState<User | undefined>(undefined)
	const [cookies] = useCookies(["token"])

	const login = useCallback((username: string, password: string) => {
		axios
			.post("/api/login", {
				username,
				password,
			})
			.then((res) => {
				if (res.data.user) setUser(res.data.user)
				else console.log(res)
			})
	}, [])

	const logout = useCallback(() => {
		axios
			.post("/api/logout")
			.then((res) => {
				setUser(undefined)
			})
			.catch((err) => {
				console.error(err)
			})
	}, [])

	//Auto login
	useEffect(() => {
		if (cookies && cookies.token) {
			axios
				.post("/api/logintoken")
				.then((res) => {
					setUser(res.data)
				})
				.catch((err) => {
					console.error(err)
				})
		}
	}, [cookies, cookies.token])

	return (
		<UserContext.Provider
			value={{
				user,
				login,
				logout,
			}}
		>
			{children}
		</UserContext.Provider>
	)
}

const useUserContext = () => {
	const userContext = useContext(UserContext)
	return userContext
}

export { useUserContext, UserContextProvider }
