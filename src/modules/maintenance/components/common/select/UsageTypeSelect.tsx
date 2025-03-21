import { unwrapObjectReponse } from '@datas/comon/ApiResponse'
import usageTypeApi from '@modules/maintenance/apis/usageTypeApi'

import { IUsageType } from '@modules/maintenance/datas/usageType/IUsageType'
import { IUsageTypeGet } from '@modules/maintenance/datas/usageType/IUsageTypeGet'

import React, { useEffect, useState } from 'react'
import { AsyncPaginate } from 'react-select-async-paginate'
import { customSelectStyle } from './StyleSelect'

interface AsyncPaginateSelectProps {
	id?: string
	disabled?: boolean
	onChange?: (value: IUsageType | null) => void
	onSelect?: (item: { id: string; name: string }) => void
	error?: boolean
}

const UsageTypeSelect: React.FC<AsyncPaginateSelectProps> = ({
	id,
	onChange,
	disabled,
	onSelect,
	error,
}) => {
	const [internalValue, setInternalValue] = useState<IUsageType | null>(null)

	const handleChange = (val: IUsageType | null) => {
		setInternalValue(val)
		onChange?.(val) // Gọi callback onChange nếu được truyền từ component cha
		onSelect?.({ id: val?.id || '', name: val?.name || '' }) // Gọi callback onSelect nếu được truyền từ component cha
	}

	useEffect(() => {
		if (id) {
			usageTypeApi
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

		const paramsObj: IUsageTypeGet = {
			searchTerm: search,
			takeCount: 20,
			skipCount: (page - 1) * 20,
		}

		try {
			const result = await usageTypeApi.get(paramsObj) // Gọi API với tham số
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
			getOptionLabel={(option: IUsageType) => option.name}
			getOptionValue={(option: IUsageType) => option.id}
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
			placeholder='Chọn hình thức sử dụng'
		/>
	)
}

export default UsageTypeSelect
