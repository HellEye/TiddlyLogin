import React, { useEffect, useState } from "react"
import { Props as SelectProps, Select, GroupBase } from "chakra-react-select"
import { DataType, DataTypeWithName, User } from "../../types"
import { InputFieldsType } from "../../util/textField"
import { useFormikContext } from "formik"

type OptionType = {
	label: string
	value: string
	colorScheme?: string
}
interface Props<T extends DataType, A extends DataType> {
	f: InputFieldsType<T, A>
	data: A[]
}
function FormSelect<T extends DataType, A extends DataType>({
	data,
	f,
}: Props<T, A>) {
	const { setFieldValue, values } = useFormikContext<T>()
	const [selectValue, setSelectValue] = useState<OptionType[]>([])
	useEffect(() => {
		const arrayValues = values?.[f.name] as unknown as string[]
		setSelectValue(
			arrayValues.map?.((v) => ({
				label: (data?.find((d) => d._id === v)?.[f.arrayLabel] as string) || "",
        value: v,
        colorScheme: "accent"
			})) || []
		)
	}, [data, f.arrayLabel, f.name, values])
	return (
		<Select
			isMulti
			name={f.name}
			id={f.name}
			options={data?.map((v) => ({
				label: v[f.arrayLabel] as string,
				value: v._id,
			}))}
			onChange={(newValue) => {
				setSelectValue([...newValue])
				setFieldValue(
					f.name,
					newValue.map((v) => v.value)
				)
			}}
			value={selectValue}
		/>
	)
}

export default FormSelect
