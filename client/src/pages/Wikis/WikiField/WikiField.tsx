import React from "react"
import { Box, Button, Flex, Heading } from "@chakra-ui/react"
import { Wiki } from "../../../types"
import { QueryKey, useQuery } from "react-query"

type Props = {
	onSelectForEdit: () => void
	wiki: Wiki
}

const WikiField = ({ wiki, onSelectForEdit }: Props) => {
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
			<Heading size="md">{wiki.name}</Heading>
			<Heading size="sm"> at {wiki.address} </Heading>
			<Button w="5rem" onClick={onSelectForEdit}>
				Edit
			</Button>
		</Flex>
	)
}

export default WikiField
