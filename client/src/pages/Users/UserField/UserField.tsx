import { User } from "../../../types/User"
import { Button, Flex, Heading, Hide, Show } from "@chakra-ui/react"
type Props = {
	user: User
	onSelectForEdit: () => void
}

const UserField = ({ user, onSelectForEdit }: Props) => {
	return (
		<Flex
			bg="bg.400"
			px="1em"
			py="2em"
			borderRadius="1em"
			gap="1rem"
			direction="row"
			w="90%"
			// justify="space-around"
			align="center"
			sx={{
				"&>*": {
					minWidth: "8rem",
				},
			}}
		>
      <Heading size="md">{user.username}</Heading>
      <Hide below="container.md">
        <Heading size="sm">{user.permissionLevel}</Heading>
      </Hide>
			<Button
				onClick={() => {
					onSelectForEdit()
				}}
				w="5rem"
			>
				Edit
			</Button>
		</Flex>
	)
}

export default UserField
