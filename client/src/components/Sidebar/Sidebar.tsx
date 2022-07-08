import React from "react"
import { Heading, Box, Flex } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { useLocation } from "react-router" 
type Props = {}

const pages = [
	{ name: "Home", to: "/" },
	{ name: "Users", to: "/Users" },
	{ name: "Wikis", to: "/Wikis" },
]

type WrapperProps = {
  current?: boolean
  children?: React.ReactNode | React.ReactNode[]
}
const LinkWrapper: React.FC<WrapperProps> = ({ children, current }) => {
	return (
		<Box
			bgColor={current ? "interact.400" : "interact.250"}
			textAlign="center"
			color="fg.primary"
			textDecoration="none"
			fontSize="l"
			fontWeight="bold"
			transition="background-color 0.15s ease"
			_hover={{ backgroundColor: "interact.light" }}
			sx={{
				"& a": {
					width: "100%",
					height: "100%",
					display: "block",
					padding: " 0.5em 1em",
				},
			}}
		>
			{children}
		</Box>
	)
}
const Sidebar = (props: Props) => {
	const { pathname } = useLocation()
	return (
		<Flex
			w="17%"
			minWidth="200px"
			backgroundColor="interact.550"
			flexDir="column"
			borderRight="1px solid"
			borderRightColor="accent.500"
		>
			<Heading size="xl" m="5">
				Menu
			</Heading>
			{pages.map((page) => {
				return (
					<LinkWrapper key={page.to} current={pathname === page.to}>
						<Link to={page.to}>{page.name}</Link>
					</LinkWrapper>
				)
			})}
		</Flex>
	)
}

export { Sidebar }
