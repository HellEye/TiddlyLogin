import { useCallback, useState, useEffect, useRef } from "react"
import { AdditionalSetters, DataType, SettersFor } from "../types"

type ParamType = {
	_id?: string
}

type GetKeys<U> = U extends Record<infer K, any> ? K : never

type Test<T extends DataType> = SettersFor<T> & AdditionalSetters<T>
const useDataType = <T extends DataType>(
	endpoint: string,
	params?: ParamType,
	settings?: any
) => {
	const [value, setValue] = useState<T>({} as T)
	const [loading, setLoading] = useState(false)
	const getUrl = useCallback(() => {
		return `${endpoint}${
			endpoint.charAt(endpoint.length - 1) === "/" ? "" : "/"
		}${params?._id}`
	}, [endpoint, params?._id])

	const keys = Object.keys(value) as Extract<keyof SettersFor<T>, string>[]
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

	const getFromDb = useCallback(() => {
		setLoading(true)
		fetch(getUrl())
			.then((res) => res.json())
			.then((data) => {
				additionalSetters.current._full(data)
				setLoading(false)
			})
			.catch((e) => {
				//TODO better error handling
				console.error(e)
				setLoading(false)
			})
	}, [getUrl])

	const saveToDb = useCallback(() => {
		setLoading(true)
		const fetchValue: any = { ...value }
		fetchValue._id = undefined
		fetch(getUrl(), {
			method: params?._id ? "POST" : "PUT",
			body: JSON.stringify(value),
		})
			.then((res) => res.json())
			.then((data) => {
				//TODO some smart data setting
				console.log(data)
				setLoading(false)
			})
			.catch((e) => {
				console.error(e)
				setLoading(false)
			})
	}, [getUrl, params?._id, value])
	const values: T = { ...value } as T

	useEffect(() => {
		if (params?._id) {
			getFromDb()
		}
	}, [endpoint, params?._id, getFromDb])

	return {
		data: values,
		set: { ...propertySetters.current, ...additionalSetters.current } as SettersFor<T> & AdditionalSetters<T>,
		getFromDb,
		saveToDb,
		loading,
	}
}

export default useDataType
