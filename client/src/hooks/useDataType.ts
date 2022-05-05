import { useState, useEffect, useRef } from "react"
import { AdditionalSetters, DataType, SettersFor } from "../types"

export type DataTypeReturn<T extends DataType> = {
	values: T
	set: SettersFor<T> & AdditionalSetters<T>
	hasValue: boolean
}

const useDataType = <T extends DataType>(
	initialValue?: T,
	defaultValue?: T
): DataTypeReturn<T> => {
	const [value, setValue] = useState<T | {}>(initialValue || {})
	const keys = Object.keys(value) as Extract<keyof SettersFor<T>, string>[]
	useEffect(() => {
		setValue(initialValue || {})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [initialValue?._id])

	// Property setters
	const propertySetters = useRef<SettersFor<T>>({} as any)
	useEffect(() => {
		for (let key of keys) {
			propertySetters.current[key] = (value) => {
				setValue((prev) => {
					return { ...prev, [key]: value }
				})
			}
		}
	}, [keys])

	const additionalSetters = useRef<AdditionalSetters<T>>({} as any)
	useEffect(() => {
		additionalSetters.current._full = (value) => {
			setValue(value)
		}
	})

	const values: T = { ...value } as T
	return {
		hasValue: !!values?._id,
		values: values || defaultValue,
		set: {
			...propertySetters.current,
			...additionalSetters.current,
		} as SettersFor<T> & AdditionalSetters<T>,
	}
}

export default useDataType
