import { Checkbox, Input, Select } from "@chakra-ui/react"
import { DataType } from "../types"

/* 
type InputComponentProps = {
  id: string
	name: string
	value: any
	onChange: ChangeEventHandler
	type?: string
  placeholder?: string
} */

export type InputFieldsType<T> = {
	name: keyof T & string
	type: string
	text: string
	component: AcceptedComponents
	selectOptions: string[]
}

type AcceptedComponents = typeof Input | typeof Select | typeof Checkbox

type OptionsObject = {
	type?: string
	component?: AcceptedComponents
	selectOptions?: string[]
}

function defaultOptions(): Required<OptionsObject> {
	return {
		type: "text",
		component: Input,
		selectOptions: [],
	}
}
export const field = <T extends DataType>(
	name: keyof T & string,
	options?: OptionsObject
): InputFieldsType<T> => {
	const newOptions = {
		...defaultOptions(),
		...options,
	}
	const splitText = name.split(RegExp("(?=[A-Z])")).join(" ")
	return {
		name,
		text: splitText.charAt(0).toUpperCase() + splitText.slice(1),
		...newOptions,
	}
}
