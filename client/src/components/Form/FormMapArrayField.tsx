import { FormControl, FormLabel } from "@chakra-ui/react"
import React from "react"
import { useQuery } from "react-query"

import { DataType, DataTypeWithName } from "../../types"
import { InputFieldsType } from "../../util/textField"
import { Field } from "formik"
import FormSelect from "./FormSelect"

type Props<T extends DataType, A extends DataType> = {
	f: InputFieldsType<T, A>
}

function FormMapArrayField<T extends DataType, A extends DataType>({
	f,
}: Props<T, A>) {
	const { data: fromData } = useQuery<A[]>(f.arrayFrom)
	return (
		<FormControl>
			<FormLabel mb="0" w="15rem" htmlFor={f.name} fontSize="smaller">
				{f.text}
			</FormLabel>

			<Field as={FormSelect} f={f} data={fromData} name={f.name} id={f.name} />
		</FormControl>
	)
}

export default FormMapArrayField
