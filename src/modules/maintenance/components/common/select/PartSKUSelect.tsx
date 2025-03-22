import { unwrapObjectReponse } from '@datas/comon/ApiResponse'
import partSKUApi from '@modules/maintenance/apis/partSKUApi'
import { IPartSKU } from '@modules/maintenance/datas/partSKU/IPartSKU'
import { IPartSKUGet } from '@modules/maintenance/datas/partSKU/IPartSKUGet'

import React, { useEffect, useState } from 'react'
import { AsyncPaginate } from 'react-select-async-paginate'
import { customSelectStyle } from './StyleSelect'

interface AsyncPaginateSelectProps {
	id?: string
	partGroupId?: string
	disabled?: boolean
	onChange?: (value: IPartSKU | null) => void
	onSelect?: (item: { id: string; name: string }) => void
	error?: boolean
}

const PartSKUSelect: React.FC<AsyncPaginateSelectProps> = ({
	id,
	partGroupId,
	onChange,
	disabled,
	onSelect,
	error,
}) => {
	const [internalValue, setInternalValue] = useState<IPartSKU | null>(null)
	const [key, setKey] = useState(0)

	const handleChange = (val: IPartSKU | null) => {
		setInternalValue(val)
		onChange?.(val) // Gọi callback onChange nếu được truyền từ component cha
		onSelect?.({ id: val?.id || '', name: val?.name || '' })
	}

	useEffect(() => {
		setInternalValue(null)
		setKey((prev) => prev + 1) // Cập nhật key để AsyncPaginate render lại
	}, [partGroupId])

	useEffect(() => {
		if (id) {
			partSKUApi
				.getById(id)
				.then(unwrapObjectReponse)
				.then((res) => {
					setInternalValue(res)
				})
				.catch((err) => {})
		}
	}, [id])

	const loadOptionCustomers = async (
		search: any,
		loadedOptions: any,
		additional: any,
	) => {
		const page = additional?.page || 1 // Nếu `additional` là undefined, mặc định `page = 1`

		const paramsObj: IPartSKUGet = {
			searchTerm: search,
			takeCount: 20,
			skipCount: (page - 1) * 20,
			partGroupId,
		}

		try {
			const result = await partSKUApi.get(paramsObj) // Gọi API với tham số
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
			getOptionLabel={(option: IPartSKU) => option.name}
			getOptionValue={(option: IPartSKU) => option.id}
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
			placeholder='Chọn SKU thành phần'
		/>
	)
}

export default PartSKUSelect
