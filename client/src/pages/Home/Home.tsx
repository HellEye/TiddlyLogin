import React from "react"
import { Flex, Heading } from "@chakra-ui/react"
import Page from "../../components/Page/Page"
import useDataTypeList from "../../hooks/useDataTypeList"
import { queryFnGet, queryFnGetArr } from "../../util/queryFunctions"
import { useQuery } from "react-query"
import WikiCard from "./Card/WikiCard"
import { WikiWithAccess } from "../../types/Wiki"

type Props = {}

const Home = (props: Props) => {
	const { data, isLoading } = useQuery<WikiWithAccess[]>(
		["userwiki"],
		queryFnGetArr
	)
	return (
		<Page>
			<Heading>Home</Heading>
			<Flex height="fit-content" alignItems="stretch">
				{data?.map((w) => {
					return <WikiCard key={w._id} wiki={w} />
				})}
			</Flex>
		</Page>
	)
}

export default Home
