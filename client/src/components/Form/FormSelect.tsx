import React from "react"
import { Props as SelectProps, Select } from "chakra-react-select"
import { DataType } from "../../types"
import { InputFieldsType } from "../../util/textField"

interface Props<T extends DataType> extends SelectProps {
	data: {
		label: string
		value: string
  }[],
  f: InputFieldsType<T>
  setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void
}
function FormSelect<T extends DataType>({ data, setFieldValue, f }: Props<T>) {
  return (
    <Select
      isMulti
      //TODO style this awful dropdown, probably in theme
      name={f.name}
      options={data?.map((v) => ({
        ...v,
        colorScheme: "accent",
      }))}
      onChange={(newValue) =>
        setFieldValue(f.name, newValue.map(v => v.value))
      }
    />
	)
}

export default FormSelect
