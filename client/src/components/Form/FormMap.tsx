import { Field, Formik, FormikProps } from "formik"
import {
	Box,
	Button,
	Flex,
	Input,
	Spinner,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
} from "@chakra-ui/react"
import { InputFields } from "../../util/textField"
import { DataType } from "../../types/DataType"
import { usePost } from "../../util/queryFunctions"
import { QueryKey } from "react-query"
import { useUserContext } from "../../context/UserContext"
import { useEffect, useRef } from "react"
import FormMapField from "./FormMapField"
import FormMapArrayField from "./FormMapArrayField"
type Props<T extends DataType, A extends DataType> = {
	fields: InputFields<T, A>
	queryKey: QueryKey
	data?: Partial<T>
	invalidate?: QueryKey[]
	defaultValue: T
	onClose?: () => void
	addIdToQuery?: boolean
}
/* eslint react/jsx-uses-react: 0 */
function FormMap<T extends DataType, A extends DataType>({
	fields,
	queryKey,
	defaultValue,
	data,
	invalidate,
	onClose,
	addIdToQuery,
}: Props<T, A>) {
	const { user } = useUserContext()
	const formikRef = useRef<FormikProps<T>>(null)
	const makeQueryKey = () => {
		const q = typeof queryKey === "string" ? [queryKey] : [...queryKey]
		if (addIdToQuery) {
			q.push(data?._id)
		}
		return q as QueryKey
	}
	useEffect(() => {
		formikRef.current?.resetForm({
			values: { ...defaultValue, ...data },
		})
	}, [data, defaultValue])
	const { mutateAsync, isLoading } = usePost<T>(makeQueryKey(), { invalidate })
	if (!queryKey) {
		return <Box></Box>
	}
	if (!data) {
		return <Box></Box>
	}
	return (
		<Formik
			innerRef={formikRef}
			initialValues={{ ...defaultValue, ...data }}
			onSubmit={async (values) => {
				console.log("values: ", values)
				await mutateAsync(values)
				if (onClose) onClose()
			}}
		>
			{({ handleSubmit, submitForm, resetForm, setFieldValue }) => (
				<form onSubmit={handleSubmit}>
					<Field
						as={Input}
						visibility="hidden"
						position="absolute"
						name="_id"
						id="_id"
						type="text"
					></Field>
					<Tabs colorScheme="accent" variant="enclosed">
						<TabList>
							{(typeof fields.tabs === "function"
								? fields.tabs(user)
								: fields.tabs
							)?.map((tab) => (
								<Tab key={tab}>{tab}</Tab>
							))}
						</TabList>
						<TabPanels>
							{(fields.tabs
								? typeof fields.tabs === "function"
									? fields.tabs(user)
									: fields.tabs
								: [""]
							).map((tab) => {
								return (
									<TabPanel key={tab}>
										<Flex direction="column" gap="1em" align="flex-start">
											{fields.fields.map((f) => {
												// console.log(f.name, f.shouldDisplay({...defaultValue, ...data}, user))
												if (f.tab && f.tab !== tab) return ""
												if (f.array)
													return <FormMapArrayField f={f} key={f.name} />
												return (
													<FormMapField
														f={f}
														key={f.name}
														user={user}
														data={{ ...defaultValue, ...data }}
													/>
												)
											})}

											<Flex
												direction="row"
												gap="1em"
												justify="stretch"
												align="stretch"
												w="100%"
											>
												<Button
													disabled={isLoading}
													w="100%"
													colorScheme="confirm"
													onClick={() => {
														submitForm()
													}}
												>
													{isLoading ? (
														<>
															Saving <Spinner ml="5" />{" "}
														</>
													) : (
														"Save"
													)}
												</Button>
												<Button
													w="50%"
													colorScheme="error"
													onClick={() => {
														if (onClose) onClose()
													}}
												>
													Close
												</Button>
											</Flex>
										</Flex>
									</TabPanel>
								)
							})}
						</TabPanels>
					</Tabs>
				</form>
			)}
		</Formik>
	)
}

export default FormMap
