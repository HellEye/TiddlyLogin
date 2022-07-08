import React from "react"
import Page from "../../components/Page/Page"
import { useUserContext } from "../../context/UserContext"
import { UserWithPasswords } from "../../types"
import { InputFields, field } from "../../util/textField"
import { Button, Flex, Heading } from "@chakra-ui/react"
import { Link, useNavigate } from "react-router-dom"
import FormMap from "../../components/Form/FormMap"
import { defaultUserWithPassword } from "../../types/User"

type Props = {}

const fields: InputFields<UserWithPasswords> = {
	fields: [
		field("currentPassword", { type: "password" }),
		field("newPassword", { type: "password" }),
		field("repeatNewPassword", { type: "password" }),
	],
}

const UserSettings = (props: Props) => {
	const { user } = useUserContext()
	const navigate = useNavigate()
	return (
		<Page>
			<Flex gap="4rem" mb="2rem">
				<Heading>User settings</Heading>
				<Button onClick={() => navigate("/")}>Home</Button>
			</Flex>
			<Flex gap="2rem" direction="column" w="container.sm">
				<FormMap
					defaultValue={defaultUserWithPassword}
					fields={fields}
          queryKey="user"
          addIdToQuery
          invalidate={["user"]}
          data={user}
				/>
			</Flex>
		</Page>
	)
}

export default UserSettings
