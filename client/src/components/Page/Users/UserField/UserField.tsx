import React, { useEffect, useState } from "react"
import { User } from "../../../../types/User"
import "./UserField.css"
import { useFetch } from "use-http"
import useUserData from "./useUserData"
import useDataType from "../../../../hooks/useDataType"
type Props = { userId: string }

const UserField = ({ userId }: Props) => {
	const [editing, setEditing] = useState(false)
	// const {
	// 	username,
	// 	setUsername,
	// 	permissionLevel,
	// 	setPermissionLevel,
	// 	currentPassword,
	// 	setCurrentPassword,
	// 	newPassword,
	// 	setNewPassword,
	// 	repeatNewPassword,
	// 	setRepeatNewPassword,
	// 	reloadUser,
	// 	loading,
	// } = useUserData(userId)
	const { data, saveToDb, getFromDb, loading, set } = useDataType<User>(
		"/api/user",
		{ _id: userId }
	)
	if (editing) {
		return (
			<div className="userField editing">
				<div>
					<label>Username</label>
					<input
						type="text"
						name="username"
						value={data.username}
						onChange={(e) => set.username(e.target.value)}
					></input>
				</div>
				<div>
					<label>Permission level</label>
					<input
						type="text"
						name="permissionLevel"
						value={data.permissionLevel}
						onChange={(e)=>set.permissionLevel(e.target.value)}
					></input>
				</div>
				<button
					className="saveEdit"
					onClick={() => {
						saveToDb()
						setEditing(false)
					}}
				>
					Save
				</button>
				<button
					className="cancelEdit"
					onClick={() => {
						// reloadUser()
						getFromDb()
						setEditing(false)
					}}
				>
					Cancel
				</button>
			</div>
		)
	}
	return (
		<div className="userField">
			{loading ? (
				"Loading..."
			) : (
				<>
					<h3>{data.username}</h3>
					<h4>{data.permissionLevel}</h4>
					<button
						className="editUser"
						onClick={() => {
							setEditing(true)
						}}
					>
						Edit
					</button>
				</>
			)}
		</div>
	)
}

export default UserField
