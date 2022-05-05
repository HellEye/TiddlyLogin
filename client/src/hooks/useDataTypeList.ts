import { QueryKey, useQuery } from "react-query"
import { DataType } from "../types"
import { useState } from "react"
import { usePost } from "../util/queryFunctions"

const useDataTypeList = <T extends DataType>(
	key: QueryKey,
	defaultValue: T
) => {
	const [editIndex, setEditIndex] = useState(-1)
	const query = useQuery<T[]>(key)
	const { mutate } = usePost(key)
	const createNew = () => {
		mutate(defaultValue)
	}
	return {
		createNew,
		...query,
		editIndex,
		setEditIndex,
	}
}

export default useDataTypeList
