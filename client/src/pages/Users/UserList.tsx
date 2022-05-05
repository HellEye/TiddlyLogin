import UserField from "./UserField/UserField"
import { User } from "../../types"
import { Box, Heading, Select } from "@chakra-ui/react"
import Page from "../../components/Page/Page"
import DivisiblePage from "../../components/Layout/DivisiblePage"
import useDataTypeList from "../../hooks/useDataTypeList"
import {
	defaultUser,
	UserWithPasswords,
	defaultUserWithPassword,
} from "../../types/User"
import { field, InputFieldsType } from "../../util/textField"
import FormMap from "../../components/Form/FormMap"
type Props = {}

const permissionLevels = ["admin", "user", "guest"]

const inputFields: InputFieldsType<UserWithPasswords>[] = [
	field("username"),
	field("permissionLevel", {
		component: Select,
		selectOptions: permissionLevels,
	}),
	field("newPassword", { type: "password" }),
	field("repeatNewPassword", { type: "password" }),
	field("currentPassword", { type: "password" }),
]

const UserList = (props: Props) => {
	const { createNew, data, isLoading, editIndex, setEditIndex } =
		useDataTypeList<User>(["user"], defaultUser)

	return (
		<Page>
			<Heading>User list</Heading>
			{isLoading ? (
				<Heading fontSize="md">Loading..."</Heading>
			) : (
				<DivisiblePage
					left={
						<Box>
							{data?.map((user, index) => {
								return (
									<UserField
										key={user._id}
										user={user}
										onSelectForEdit={() => setEditIndex(index)}
									/>
								)
							})}
						</Box>
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
