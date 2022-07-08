import { Checkbox, Input, Select, Textarea } from "@chakra-ui/react"
import { DataType, User } from "../types"
import { QueryKey } from "react-query"

type StringFieldsOfType<T extends DataType, Filter = string> =
	| Exclude<
			keyof Pick<
				T,
				{
					[K in keyof T]: T[K] extends Filter ? K : never
				}[keyof T]
			>,
			undefined
	  >
	| "_id"

export type InputFieldsType<
	FieldType extends DataType,
	ArrayType extends DataType = DataType
> = {
	name: keyof FieldType & string
	type: string
	text: string
	component: AcceptedComponents
	selectOptions: string[]
	shouldDisplay: (value: FieldType, currentUser?: User) => boolean
	tab: string
	array: boolean
	arrayFrom: QueryKey[]
	arrayLinkExclude: string[]
	arrayLabel: StringFieldsOfType<ArrayType>
}

export type InputFields<
	FieldType extends DataType,
	ArrayType extends DataType = DataType
> = {
	tabs?: string[] | ((currentUser?: User) => string[])
	fields: InputFieldsType<FieldType, ArrayType>[]
}

type AcceptedComponents =
	| typeof Input
	| typeof Select
	| typeof Checkbox
	| typeof Textarea

type OptionsObject<FieldType extends DataType, ArrayType extends DataType> = {
	type?: string
	component?: AcceptedComponents
	selectOptions?: string[]
	shouldDisplay?: boolean | ((value: FieldType, currentUser?: User) => boolean)
	tab?: string
	array?: boolean
	arrayFrom?: QueryKey[]
	arrayLinkExclude?: string[]
	arrayLabel?: StringFieldsOfType<ArrayType>
}

function defaultOptions<
	FieldType extends DataType,
	ArrayType extends DataType = DataType
>(): Required<OptionsObject<FieldType, ArrayType>> {
	// const test2: StringFieldsOfType<ArrayType>
	return {
		type: "text",
		component: Input,
		selectOptions: [],
		shouldDisplay: true,
		tab: "",
		array: false,
		arrayFrom: [],
		arrayLinkExclude: [],
		arrayLabel: "_id",
	}
}
export const field = <
	FieldType extends DataType,
	ArrayType extends DataType = DataType
>(
	name: keyof FieldType & string,
	options?: OptionsObject<FieldType, ArrayType>
): InputFieldsType<FieldType, ArrayType> => {
	const newOptions = {
		...defaultOptions(),
		...options,
	}
	const shouldDisplay = (value: FieldType, currentUser?: User): boolean => {
		if (options?.shouldDisplay)
			return typeof options.shouldDisplay === "function"
				? options.shouldDisplay(value, currentUser)
				: options.shouldDisplay
		return true
	}

	const splitText = name.split(RegExp("(?=[A-Z])")).join(" ")
	return {
		name,
		text: splitText.charAt(0).toUpperCase() + splitText.slice(1),
		...newOptions,
		shouldDisplay,
	}
}
