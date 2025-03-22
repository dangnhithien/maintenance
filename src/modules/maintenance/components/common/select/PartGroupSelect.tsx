import { unwrapObjectReponse } from '@datas/comon/ApiResponse'
import partGroupApi from '@modules/maintenance/apis/partGroupApi'
import { IPartGroup } from '@modules/maintenance/datas/partGroup/IPartGroup'
import { IPartGroupGet } from '@modules/maintenance/datas/partGroup/IPartGroupGet'
import React, { useEffect, useState } from 'react'
import { AsyncPaginate } from 'react-select-async-paginate'
import { customSelectStyle } from './StyleSelect'

interface AsyncPaginateSelectProps {
	id?: string
	partTypeId?: string
	disabled?: boolean
	onChange?: (value: IPartGroup | null) => void
	onSelect?: (item: { id: string; name: string }) => void
	error?: boolean
}

const PartGroupSelect: React.FC<AsyncPaginateSelectProps> = ({
	id,
	partTypeId,
	onChange,
	disabled,
	onSelect,
	error,
}) => {
	const [internalValue, setInternalValue] = useState<IPartGroup | null>(null)
	const [key, setKey] = useState(0)

	useEffect(() => {
		setInternalValue(null)
		setKey((prev) => prev + 1) // Cập nhật key để AsyncPaginate render lại
	}, [partTypeId])

	useEffect(() => {
		if (id) {
			partGroupApi
				.getById(id)
				.then(unwrapObjectReponse)
				.then((res) => {
					setInternalValue(res)
				})
				.catch((err) => {})
		}
	}, [id])

	const handleChange = (val: IPartGroup | null) => {
		setInternalValue(val)
		onChange?.(val) // Gọi callback onChange nếu được truyền từ component cha
		onSelect?.({ id: val?.id || '', name: val?.name || '' })
	}

	const loadOptionCustomers = async (
		search: any,
		loadedOptions: any,
		additional: any,
	) => {
		const page = additional?.page || 1 // Nếu `additional` là undefined, mặc định `page = 1`

		const paramsObj: IPartGroupGet = {
			searchTerm: search,
			takeCount: 20,
			skipCount: (page - 1) * 20,
			partTypeId,
		}

		try {
			const result = await partGroupApi.get(paramsObj) // Gọi API với tham số
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
			key={key}
			isClearable
			value={internalValue}
			onChange={handleChange}
			loadOptions={loadOptionCustomers}
			getOptionLabel={(option: IPartGroup) => option.name}
			getOptionValue={(option: IPartGroup) => option.id}
			additional={{
				page: 1,
			}}
			debounceTimeout={400}
			menuPortalTarget={document.body}
			styles={{
				menuPortal: (base: any) => ({ ...base, zIndex: 1600 }),
				...customSelectStyle,
				control: (base) => ({
					...base,
					minHeight: '40px',
					height: '40px',
					borderRadius: '4px',
					borderColor: error ? '#d32f2f' : base.borderColor,
				}),
			}}
			isDisabled={disabled}
			placeholder='Chọn nhóm thành phần'
		/>
	)
}

export default PartGroupSelect
