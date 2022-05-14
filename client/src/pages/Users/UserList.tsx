import UserField from "./UserField/UserField"
import { User } from "../../types"
import { Button, Flex, Heading, Select } from "@chakra-ui/react"
import Page from "../../components/Page/Page"
import DivisiblePage from "../../components/Layout/DivisiblePage"
import useDataTypeList from "../../hooks/useDataTypeList"
import {
	defaultUser,
	UserWithPasswords,
	defaultUserWithPassword,
} from "../../types/User"
import { field, InputFields } from "../../util/textField"
import FormMap from "../../components/Form/FormMap"
type Props = {}

const permissionLevels = ["admin", "user", "guest"]

const inputFields: InputFields<UserWithPasswords> = {
	tabs: (user) =>
		user?.permissionLevel === "admin"
			? ["User", "Browse permissions", "Edit permissions"]
			: ["User"],
	fields: [
		field("username", { tab: "User" }),
		field("permissionLevel", {
			component: Select,
			tab: "User",
			selectOptions: permissionLevels,
		}),
		field("newPassword", { type: "password", tab: "User" }),
		field("repeatNewPassword", { type: "password", tab: "User" }),
		field("currentPassword", {
			type: "password",
			tab: "User",
			shouldDisplay: (value, currentUser) =>
				currentUser?.permissionLevel !== "admin" ||
				currentUser?._id === value._id,
		}),
		field("browseWikis", {
      tab: "Browse permissions",
			array: true,
			arrayFrom: ["wiki"],
			arrayLinkExclude: ["editWikis", "browseWikis"],
		}),
		field("editWikis", {
			tab: "Edit permissions",
			array: true,
			arrayFrom: ["wiki"],
			arrayLinkExclude: ["editWikis", "browseWikis"],
		}),
	],
}

const UserList = (props: Props) => {
	const { createNew, data, isLoading, editIndex, setEditIndex } =
		useDataTypeList<User>(["user"], defaultUser)

	return (
		<Page>
			<Flex direction="row" gap="5rem">
				<Heading>User list</Heading>
				<Button onClick={createNew}>Add new user</Button>
			</Flex>
			{isLoading ? (
				<Heading fontSize="md">Loading..."</Heading>
			) : (
				<DivisiblePage
					left={
						<Flex direction="column" gap="1rem">
							{data?.map((user, index) => {
								return (
									<UserField
										key={user._id}
										user={user}
										onSelectForEdit={() => setEditIndex(index)}
									/>
								)
							})}
						</Flex>
					}
					rightWidth="150%"
					right={
						<FormMap
							fields={inputFields}
							queryKey="user"
							addIdToQuery
							defaultValue={defaultUserWithPassword}
							data={editIndex > -1 ? data?.[editIndex] : undefined}
							onClose={() => setEditIndex(-1)}
						/>
					}
					open={editIndex > -1}
				/>
			)}
		</Page>
	)
}

export { UserList }
