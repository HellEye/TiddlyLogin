import { FormControl, FormLabel } from "@chakra-ui/react"
import React from "react"
import { useQuery } from "react-query"

import { DataType, DataTypeWithName } from "../../types"
import { InputFieldsType } from "../../util/textField"
import { Field } from "formik"
import FormSelect from "./FormSelect"

type Props<T extends DataType> = {
	f: InputFieldsType<T>
  setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void
}

function FormMapArrayField<T extends DataType>({ f, setFieldValue }: Props<T>) {
	const { data: fromData } = useQuery<DataTypeWithName[]>(f.arrayFrom)
	return (
		<FormControl>
			<FormLabel mb="0" w="15rem" htmlFor={f.name} fontSize="smaller">
				{f.text}
			</FormLabel>

			<Field
        as={FormSelect}
        f={f}
        name={f.name}
        id={f.name}
        setFieldValue={setFieldValue}
				//TODO style this awful dropdown, probably in theme
				data={fromData?.map((v) => ({
					label: v.name,
					value: v._id,
				}))}
			/>
		</FormControl>
	)
}

export default FormMapArrayField
