import React from "react"
import { UserContextProvider, useUserContext } from "./context/UserContext"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { CookiesProvider } from "react-cookie"
import { ChakraProvider } from "@chakra-ui/react"
import { Login, Header, UserList, Sidebar, WikiList } from "./components"
import TestPage from "./pages/TestPage/TestPage"
import { chakraTheme } from "./theme/chakraTheme"
import { QueryClient, QueryClientProvider } from "react-query"
import { ReactQueryDevtools } from "react-query/devtools"
import { queryFnGet } from "./util/queryFunctions"
import Home from "./pages/Home/Home"

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			queryFn: queryFnGet,
		},
	},
})

function AppWrapper() {
	// console.log(chakraTheme)
	return (
		<CookiesProvider>
			<UserContextProvider>
				<QueryClientProvider client={queryClient}>
					<BrowserRouter>
						<ChakraProvider theme={chakraTheme}>
							<App />
							<ReactQueryDevtools initialIsOpen={true} />
						</ChakraProvider>
					</BrowserRouter>
				</QueryClientProvider>
			</UserContextProvider>
		</CookiesProvider>
	)
}

const App = () => {
	const { user } = useUserContext()
	return (
		<div className="App">
			<Header />
      <div className="content">
        {user?.permissionLevel==="admin" ? <Sidebar /> : ""}
				
				{/* Landing page */}
				{!user ? (
					<Login />
				) : (
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/users" element={<UserList />} />
						<Route path="/wikis" element={<WikiList />} />
						<Route path="/testPage" element={<TestPage />} />
					</Routes>
				)}
			</div>
		</div>
	)
}

export default App
export { AppWrapper }

/**
 * big TODO
 * Landing page (probably login by default so let's start there)
 *
 */
