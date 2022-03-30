import axios from "axios"
import { useCallback, useEffect, useState } from "react"
import useFetch from "use-http"
import { User } from "../../../../types/User"
const useUserData = (_id: string) => {
	const [username, setUsername] = useState("")
	const [permissionLevel, setPermissionLevel] = useState("")
	const [currentPassword, setCurrentPassword] = useState("")
	const [newPassword, setNewPassword] = useState("")
	const [repeatNewPassword, setRepeatNewPassword] = useState("")
	const { request, loading } = useFetch<User>()

	const reloadUser = useCallback(() => {
		setCurrentPassword("")
		setNewPassword("")
		setRepeatNewPassword("")
		request.get(`/api/user/${_id}`).then((user) => {
			setUsername(user.username)
			setPermissionLevel(user.permissionLevel)
		})
	}, [_id, request])
	useEffect(() => {
		reloadUser()
	}, [_id, setUsername, request, setPermissionLevel, reloadUser])

	const saveUser = useCallback(() => {
		if(newPassword!==repeatNewPassword) return
		request.post(`api/user/${_id}`, {
			username,
			permissionLevel,
			currentPassword,
			newPassword,
		})
	}, [_id, currentPassword, newPassword, permissionLevel, repeatNewPassword, request, username])

	return {
		username,
		setUsername,
		currentPassword,
		setCurrentPassword,
		permissionLevel,
		setPermissionLevel,
		newPassword,
		setNewPassword,
		reloadUser,
		repeatNewPassword, setRepeatNewPassword,
		saveUser,
		loading
	}
}

export default useUserData
