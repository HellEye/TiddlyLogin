import axios from "axios"
import {
	MutationFunction,
	MutationOptions,
	QueryFunctionContext,
	QueryKey,
	useMutation,
	useQueryClient,
} from "react-query"
import { DataType } from "../types/DataType"

// const postFunction: (path: string) => MutationFunction = <
export function postFunction<
	Result extends DataType,
	Input extends DataType = Result
>(queryKey: QueryKey): MutationFunction<Result, Input> {
	return async (data: Input) => {
		data._id = ""
		const res = await axios.post<Result>(
			`/api/${queryKey[0]}/${queryKey.length > 1 ? queryKey[1] : ""}`
		)

		return res.data
	}
}

export const queryFnGet = async <Result extends DataType>({
	queryKey,
}: QueryFunctionContext): Promise<Result> => {
	const res = await axios.get<Result>(
		`/api/${Array.isArray(queryKey) ? queryKey.join("/") : queryKey}`
	)
	return res.data
}

export function usePost<
	Result extends DataType,
	Input extends DataType = Result
>(name: QueryKey, options?: MutationOptions<Result, Error, Input>) {
	const queryClient = useQueryClient()
	return useMutation<Result, Error, Input>(
		Array.isArray(name) ? name.join("/") : name + " Post",
		postFunction<Result, Input>(name),
		{
			onSuccess: () => {
				queryClient.invalidateQueries(name)
			},
			...options,
		}
	)
} /*

export function useGet<Result extends DataType | DataType[]>(
	name: QueryKey,
	path: string,
	options?: QueryOptions<Result, Error, Result>
) {
	// const queryClient = useQueryClient()
	return useQuery<Result, Error, Result>(
		name,
		getFunction<Result>(path),
		options
	)
}

type DataOptions<
	Result extends DataType | DataType[],
	MInput extends DataType,
	Data extends DataType | DataType[] = Result
> = {
	mutation?: MutationOptions<Result, Error, MInput>
	query?: QueryOptions<Data, Error, Data>
	defaultValue: Result
}

export function useData<
	Result extends DataType,
	MInput extends Result = Result
>(name: QueryKey, path: string, options?: DataOptions<Result, MInput>) {
	const defaultValue = options?.defaultValue
	const query = useGet<Result>(name, path, options?.query)
	const data = useDataType<Result>({ ...defaultValue, ...query.data } as Result)
	const mutation = usePost(name, path, {
		...(options?.mutation || {}),
		invalidateQueries: name,
	})
	return { mutation, query, data }
}

export function useDataArray<
	Result extends DataType,
	MInput extends Result = Result
>(
	name: QueryKey,
	path: string,
	options?: DataOptions<Result, MInput, Result[]>
) {
	const [index, setIndex] = useState(-1)
	const defaultValue = options?.defaultValue
	const query = useGet<Result[]>(name, path, options?.query)
	const data = useDataType<Result>({
		...defaultValue,
		...(index > -1 && query.data ? query.data?.[index] : undefined),
	} as Result)
	const mutation = usePost<Result, MInput>(name, path, {
		...(options?.mutation || {}),
		invalidateQueries: name,
		_id: (index > -1 && query?.data?.[index]._id) || "",
	})
	return {
		mutation,
		query,
		data,
		index,
		setIndex,
	}
}
 */
