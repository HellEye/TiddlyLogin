import { Field, Formik } from "formik"
import {
	Box,
	Button,
	Flex,
	FormControl,
	FormLabel,
	Input,
	Select,
	Spinner,
} from "@chakra-ui/react"
import { InputFieldsType } from "../../util/textField"
import { DataType } from "../../types/DataType"
import { usePost } from "../../util/queryFunctions"
import { QueryKey } from "react-query"

type Props<T extends DataType> = {
	fields: InputFieldsType<T>[]
	queryKey: QueryKey
	data?: Partial<T>
	defaultValue: T
	onClose?: () => void
	addIdToQuery?: boolean
}
/* eslint react/jsx-uses-react: 0 */
function FormMap<T extends DataType>({
	fields,
	queryKey,
	defaultValue,
	data,
	onClose,
	addIdToQuery,
}: Props<T>) {
	const makeQueryKey = () => {
		const q = typeof queryKey === "string" ? [queryKey] : [...queryKey]
		if (addIdToQuery) {
			q.push(data?._id)
		}
		return q as QueryKey
	}
	const { mutateAsync, isLoading } = usePost<T>(makeQueryKey())
	if (!queryKey) {
		return <Box></Box>
	}
	if (!data) {
		return <Box></Box>
	}
	return (
		<Formik
			initialValues={{ ...defaultValue, ...data }}
			onSubmit={async (values) => {
				// console.log("values: ", values)
				await mutateAsync(values)
				if (onClose) onClose()
			}}
		>
			{({ handleSubmit, submitForm }) => (
				<form onSubmit={handleSubmit}>
					<Field
						as={Input}
						visibility="hidden"
						position="absolute"
						name="_id"
						id="_id"
						type="text"
					></Field>
					<Flex direction="column" gap="1em" align="flex-start">
						{fields.map((f) => {
							return (
								<FormControl
									key={f.name}
									display="flex"
									flexDir="column"
									alignItems="left"
								>
									<FormLabel
										mb="0"
										w="15rem"
										htmlFor={f.name}
										fontSize="smaller"
									>
										{f.text}
									</FormLabel>
									<Field
										as={f.component}
										textAlign="left"
										name={f.name}
										id={f.name}
										type={f.type}
										children={
											f.component === Select && f.selectOptions
												? f.selectOptions.map((so) => {
														return (
															<option value={so} key={so}>
																{so}
															</option>
														)
												  })
												: undefined
										}
									/>
								</FormControl>
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
										Saving <Spinner />{" "}
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
				</form>
			)}
		</Formik>
	)
}

export default FormMap
