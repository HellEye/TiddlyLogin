import { Checkbox, Input, Select, Textarea } from "@chakra-ui/react"
import { DataType, User } from "../types"
import { QueryKey } from 'react-query';


export type InputFieldsType<T extends DataType> = {
	name: keyof T & string
	type: string
	text: string
	component: AcceptedComponents
	selectOptions: string[]
  shouldDisplay: (value: T, currentUser?: User) => boolean
  tab: string
  array: boolean
  arrayFrom: QueryKey[]
  arrayLinkExclude: string[]
}

export type InputFields<T extends DataType> = {
  tabs?: string[] | ((currentUser?: User)=>string[])
  fields: InputFieldsType<T>[]
}

type AcceptedComponents =
	| typeof Input
	| typeof Select
	| typeof Checkbox
	| typeof Textarea

type OptionsObject<T extends DataType> = {
	type?: string
	component?: AcceptedComponents
	selectOptions?: string[]
  shouldDisplay?: boolean | ((value: T, currentUser?: User) => boolean)
  tab?: string
  array?: boolean
  arrayFrom?: QueryKey[]
  arrayLinkExclude?: string[]
}

function defaultOptions<T extends DataType>(): Required<OptionsObject<T>> {
	return {
		type: "text",
		component: Input,
		selectOptions: [],
    shouldDisplay: true,
    tab: "",
    array: false,
    arrayFrom: [],
    arrayLinkExclude: []
	}
}
export const field = <T extends DataType>(
	name: keyof T & string,
	options?: OptionsObject<T>
): InputFieldsType<T> => {
	const newOptions = {
		...defaultOptions(),
		...options,
	}
	const shouldDisplay = (value: T, currentUser?: User): boolean => {
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
    shouldDisplay
	}
}
