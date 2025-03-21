import { ApiRequest } from '@datas/comon/ApiRequest'
// import { unwrapObjectReponse } from '@datas/comon/ApiResponse'
import taskCheckTypeApi from '@modules/maintenance/apis/taskCheckTypeApi'
import { ITaskCheckType } from '@modules/maintenance/datas/taskCheckType/ITaskCheckType'
import React, { useState } from 'react'
import { AsyncPaginate } from 'react-select-async-paginate'

interface AsyncPaginateSelectProps {
	id?: string
	disabled?: boolean
	onChange?: (value: ITaskCheckType | null) => void
	onSelect?: (item: { id: string; name: string }) => void
	error?: boolean
}
const customStyles = {
	control: (base: any, state: any) => ({
		...base,
		minHeight: '40px', // Chiều cao giống MUI `small`
		height: '40px',
		borderRadius: '6px',
		fontSize: '16px', // Font size nhỏ hơn giống MUI small
		borderColor: state.isFocused ? '#1976d2' : base.borderColor, // Border xanh khi focus
		boxShadow: state.isFocused ? '0 0 0 2px rgba(25, 118, 210, 0.2)' : 'none',
		'&:hover': {
			borderColor: '#1976d2',
		},
	}),
	valueContainer: (base: any) => ({
		...base,
		padding: '6.5px 14px', // Khoảng cách giống MUI small
	}),
	input: (base: any) => ({
		...base,
		margin: 0,
		padding: 0,
		fontSize: '14px', // Giữ font nhỏ như MUI
	}),
	indicatorsContainer: (base: any) => ({
		...base,
		height: '40px', // Căn giữa icon dropdown
		alignItems: 'center',
	}),
	clearIndicator: (base: any) => ({
		...base,
		padding: '4px',
	}),
	menu: (base: any) => ({
		...base,
		fontSize: '14px', // Giữ menu đồng bộ với text
	}),
}
const TaskCheckTypeSelect: React.FC<AsyncPaginateSelectProps> = ({
	id,
	onChange,
	disabled,
	onSelect,
	error,
}) => {
	const [internalValue, setInternalValue] = useState<ITaskCheckType | null>(
		null,
	)

	const handleChange = (val: ITaskCheckType | null) => {
		setInternalValue(val)
		onChange?.(val) // Gọi callback onChange nếu được truyền từ component cha
		onSelect?.({ id: val?.id || '', name: val?.name || '' })
	}

	// useEffect(() => {
	// 	if (id) {
	// 		taskCheckTypeApi
	// 			.get()
	// 			.then(unwrapObjectReponse)
	// 			.then((res) => {
	// 				setInternalValue(res)
	// 			})
	// 			.catch((err) => {})
	// 	}
	// }, [id])

	const loadOptionCustomers = async (
		search: any,
		loadedOptions: any,
		additional: any,
	) => {
		const page = additional?.page || 1 // Nếu `additional` là undefined, mặc định `page = 1`

		const paramsObj: ApiRequest = {
			searchTerm: search,
			takeCount: 20,
			skipCount: (page - 1) * 20,
		}

		try {
			const result = await taskCheckTypeApi.get(paramsObj) // Gọi API với tham số
			return {
				options: result.result.items,
				hasMore: page * 10 < result.result.totalCount,
				additional: {
					page: page + 1,
				},
			}
		} catch (error) {
			console.error('Error loading Customer options:', error)
			return {
				options: [],
				hasMore: false,
				additional: {
					page,
				},
			}
		}
	}

	return (
		<AsyncPaginate
			isClearable
			value={internalValue}
			onChange={handleChange}
			loadOptions={loadOptionCustomers}
			getOptionLabel={(option: ITaskCheckType) => option.name}
			getOptionValue={(option: ITaskCheckType) => option.id}
			additional={{
				page: 1,
			}}
			debounceTimeout={400}
			menuPortalTarget={document.body}
			styles={{
				menuPortal: (base: any) => ({ ...base, zIndex: 1600 }),
				...customStyles,
				control: (base) => ({
					...base,
					minHeight: '40px',
					height: '40px',
					borderRadius: '4px',
					borderColor: error ? '#d32f2f' : base.borderColor, // Viền đỏ khi có lỗi
				}),
			}}
			isDisabled={disabled}
			placeholder='Chọn loại task'
		/>
	)
}

export default TaskCheckTypeSelect
