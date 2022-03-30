import React from "react"
import "./App.css"
import { UserContextProvider, useUserContext } from "./context/UserContext"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { useCookies, CookiesProvider } from "react-cookie"
import { Login, Header, UserList, Sidebar, WikiList } from "./components"
import TestPage from './components/Page/TestPage/TestPage';
function AppWrapper() {
	return (
		<CookiesProvider>
			<UserContextProvider>
				<App />
			</UserContextProvider>
		</CookiesProvider>
	)
}

const App = () => {
	const { user } = useUserContext()
	return (
		<div className="App">
			<BrowserRouter>
				<Header />
				<div className="content">
					<Sidebar />
					{/* Landing page */}
					{!user ? (
						<Login />
					) : (
						<Routes>
							<Route path="/" />
							<Route path="/users" element={<UserList />} />
							<Route path="/wikis" element={<WikiList />} />
							<Route path="/testPage" element={<TestPage />} />
							
						</Routes>
					)}
				</div>
			</BrowserRouter>
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
