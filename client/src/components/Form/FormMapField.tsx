import { FormControl, FormLabel, Select } from "@chakra-ui/react"
import { Field } from "formik"
import React from "react"
import { DataType, User } from "../../types"
import { InputFieldsType } from "../../util/textField"

type Props<T extends DataType> = {
	f: InputFieldsType<T, any>
	data: T
	user?: User
}

function FormMapField<T extends DataType>({
	f,
	data,
	user,
}: Props<T>) {
	if (!f.shouldDisplay(data, user)) return null
	return (
		<FormControl key={f.name} display="flex" flexDir="column" alignItems="left">
			<FormLabel mb="0" w="15rem" htmlFor={f.name} fontSize="smaller">
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
}

export default FormMapField
