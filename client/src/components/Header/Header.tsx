import {
	Box,
	Flex,
	Heading,
	IconButton,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Text,
} from "@chakra-ui/react"
import { ArrowDownIcon } from "@chakra-ui/icons"
import React, { useState } from "react"
import { useUserContext } from "../../context/UserContext"
import { Link } from "react-router-dom"

type Props = {}

const Header = (props: Props) => {
	const { user, logout } = useUserContext()
	const [menuOpen, setMenuOpen] = useState(false)
	return (
		<Flex
			dir="row"
			bgColor="bg.500"
			padding="1em"
			borderBottom="1px solid"
			borderBottomColor="accent.500"
			align="center"
			justify="space-between"
		>
			<Heading>Header</Heading>
			<Flex
				w="16em"
				direction="row"
				align="center"
				justify="flex-end"
				gap="1em"
			>
				<Box width="9rem">
					<Text fontSize="smaller">Logged in as</Text>
					<Text color="accent.600" display="inline">
						{user?.username ? user.username : "not logged in"}
					</Text>
				</Box>
				{user?.username ? (
					<Menu variant="headerDropdown">
						<MenuButton
							onClick={(e) => {
								setMenuOpen((prevState) => !prevState)
							}}
							colorScheme="interact"
							as={IconButton}
							icon={
								<ArrowDownIcon
									transform={`rotate(${menuOpen ? "-180deg" : "0deg"})`}
									transition="transform 0.15s ease"
								/>
							}
							aria-label={"Open panel"}
						/>
						<MenuList bgColor="bg.500" p="2 0" borderColor="accent.400">
							<MenuItem as={Link} to="/userSettings">
								Settings
							</MenuItem>
							<MenuItem onClick={logout}>Logout</MenuItem>
						</MenuList>
					</Menu>
				) : (
					""
				)}
			</Flex>
		</Flex>
	)
}

export { Header }
