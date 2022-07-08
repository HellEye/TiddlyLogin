import {
	CheckIcon,
	EditIcon,
	NotAllowedIcon,
	RepeatIcon,
} from "@chakra-ui/icons"
import { Box, Flex, Heading, Icon, Text } from "@chakra-ui/react"
import React from "react"
import { WikiWithAccess } from "../../../types"
import { useQuery } from "react-query"
import axios from "axios"

type Props = {
	wiki: WikiWithAccess
}

const WikiCard = ({ wiki }: Props) => {
	const { data, isLoading } = useQuery<{ up: boolean }>(
		["wikiStatus", wiki._id],
		async () => {
			const res = await axios.get(`/api/wiki/${wiki._id}/status`)
			return res.data
		}
	)
	const getIcon = () => {
		return isLoading ? RepeatIcon : data?.up ? CheckIcon : NotAllowedIcon
	}
	const getIconColor = () => {
		return isLoading ? "bg.900" : data?.up ? "green.600" : "red.600"
	}
	return (
		<Box
			position="relative"
			cursor={isLoading || !data?.up ? "not-allowed" : "pointer"}
		>
			{wiki.canEdit ? <EditIcon position="absolute" right="3" top="3" /> : ""}
			<Icon
				as={getIcon()}
				color={getIconColor()}
				position="absolute"
				left="3"
				top="3"
			/>
			<Flex
				color={isLoading || !data?.up ? "bg.900" : "inherit"}
				direction="column"
				bg="bg.500"
				border="1px solid"
				padding="1em"
				borderColor="accent.500"
				width="20rem"
				borderRadius="1rem"
				onClick={() => {
					//TODO go to wiki
					if (!isLoading && data?.up)
						window.open(`http://localhost:6062/wiki/${wiki.name}`)
				}}
			>
				<Heading fontSize="2xl" mb="5">
					{wiki.name}
				</Heading>

				<Text whiteSpace="break-spaces">{wiki.description}</Text>
			</Flex>
		</Box>
	)
}

export default WikiCard
