import {
	Box,
	Button,
	Checkbox,
	Flex,
	Heading,
	Textarea,
} from "@chakra-ui/react"
import FormMap from "../../components/Form/FormMap"
import DivisiblePage from "../../components/Layout/DivisiblePage"
import Page from "../../components/Page/Page"
import useDataTypeList from "../../hooks/useDataTypeList"
import { Wiki } from "../../types"
import { defaultWiki } from "../../types/Wiki"
import { field, InputFields } from "../../util/textField"
import WikiField from "./WikiField/WikiField"

type Props = {}

const inputFields: InputFields<Wiki> = {
	fields: [
		field("name"),
		field("address"),
		field("public", { component: Checkbox }),
		field("subdomain"),
		field("description", { component: Textarea }),
	],
}

const WikiList = (props: Props) => {
	const { createNew, data, isLoading, editIndex, setEditIndex } =
		useDataTypeList<Wiki>(["wiki"], defaultWiki)

	if (!data?.[0]?._id) {
		return (
			<Page>
				<Heading>Wiki list</Heading>
				{isLoading ? (
					<Heading fontSize="md">Loading..."</Heading>
				) : (
					<>
						<Heading>No data</Heading>
						<Button
							onClick={() => {
								createNew()
							}}
						>
							{" "}
							Add wiki{" "}
						</Button>
					</>
				)}
			</Page>
		)
	}
	return (
		<Page>
			<Flex direction="row" gap="5rem">
				<Heading>Wiki list</Heading>
				<Button onClick={createNew}>Add new wiki</Button>
			</Flex>

			<DivisiblePage
				open={editIndex > -1}
				right={
					<FormMap
						fields={inputFields}
						queryKey={"wiki"}
						addIdToQuery
						invalidate={[["userwiki"]]}
						defaultValue={defaultWiki}
						data={editIndex > -1 ? data?.[editIndex] : undefined}
						onClose={() => setEditIndex(-1)}
					/>
				}
				left={
					<Box>
						{data?.map((w, i) => {
							return (
								<WikiField
									key={w._id}
									wiki={w}
									onSelectForEdit={() => setEditIndex(i)}
								/>
							)
						})}
					</Box>
				}
			/>
		</Page>
	)
}

export { WikiList }
