import { unwrapObjectReponse } from '@datas/comon/ApiResponse'
import deviceSKUApi from '@modules/maintenance/apis/deviceSKUApi'
import { IDeviceSKU } from '@modules/maintenance/datas/deviceSKU/IDeviceSKU'
import { IDeviceSKUGet } from '@modules/maintenance/datas/deviceSKU/IDeviceSKUGet'

import React, { useEffect, useState } from 'react'
import { AsyncPaginate } from 'react-select-async-paginate'

interface AsyncPaginateSelectProps {
	id?: string
	deviceGroupId?: string
	disabled?: boolean
	onChange?: (value: IDeviceSKU | null) => void
}

const DeviceSKUSelect: React.FC<AsyncPaginateSelectProps> = ({
	id,
	deviceGroupId,
	onChange,
	disabled,
}) => {
	const [internalValue, setInternalValue] = useState<IDeviceSKU | null>(null)
	const [key, setKey] = useState(0)

	useEffect(() => {
		setInternalValue(null)
		setKey((prev) => prev + 1) // Cập nhật key để AsyncPaginate render lại
	}, [deviceGroupId])

	useEffect(() => {
		if (id) {
			deviceSKUApi
				.getById(id)
				.then(unwrapObjectReponse)
				.then((res) => {
					setInternalValue(res)
				})
				.catch((err) => {})
		}
	}, [id])

	const handleChange = (val: IDeviceSKU | null) => {
		setInternalValue(val)
		onChange?.(val) // Gọi callback onChange nếu được truyền từ component cha
	}

	const loadOptionCustomers = async (
		search: any,
		loadedOptions: any,
		additional: any,
	) => {
		const page = additional?.page || 1 // Nếu `additional` là undefined, mặc định `page = 1`

		const paramsObj: IDeviceSKUGet = {
			searchTerm: search,
			takeCount: 20,
			skipCount: (page - 1) * 20,
			deviceGroupId,
		}

		try {
			const result = await deviceSKUApi.get(paramsObj) // Gọi API với tham số
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
			getOptionLabel={(option: IDeviceSKU) => option.name}
			getOptionValue={(option: IDeviceSKU) => option.id}
			additional={{
				page: 1,
			}}
			debounceTimeout={400}
			menuPortalTarget={document.body}
			styles={{ menuPortal: (base: any) => ({ ...base, zIndex: 5 }) }}
			isDisabled={disabled}
			placeholder='Chọn SKU thiết bị'
		/>
	)
}

export default DeviceSKUSelect
