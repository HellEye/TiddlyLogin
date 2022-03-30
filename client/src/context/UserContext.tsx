import react, { useCallback, useContext, useEffect, useState } from "react"
import { useCookies } from 'react-cookie';
import axios from "axios"
type UserType = {
  username: string
}

export type UserContextType = {
  user?: UserType
  login: (username: string, password: string) => void
  logout: () => void
}

const defaultContext: UserContextType = {
  login: (username, password) => { },
  logout: ()=>{}
}

const UserContext = react.createContext(defaultContext) 

type PropType = {
  children: React.ReactNode
}

const UserContextProvider = ({children}:PropType) => {
  const [user, setUser] = useState<UserType | undefined>(undefined)
	const [cookies, setCookie, removeCookie] = useCookies(["token"])

  const login = useCallback((username:string, password:string) => {
    axios.post("/api/login", {
      username, password
    }).then(res => {
      if (res.data.user)
        setUser(res.data.user)
      else
        console.log(res)
    })
  }, [])

  const logout = useCallback(() => {
    //TODO logout here
  }, [])

  //Auto login
  useEffect(() => {
    if (cookies && cookies.token) {
      axios.post("/api/logintoken", {
        token: cookies.token
      }).then(res => {
        setUser(res.data.user)
      }).catch(err => {
        console.log(err)
      })
    }
  }, [cookies, cookies.token])

  return <UserContext.Provider value={{
    user,
    login,
    logout
  }}>
    {children}
  </UserContext.Provider>
}

const useUserContext = () => {
  const userContext = useContext(UserContext)
  return userContext
}

export {useUserContext, UserContextProvider}