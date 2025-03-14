import { unwrapObjectReponse } from '@datas/comon/ApiResponse'
import deviceModelApi from '@modules/maintenance/apis/deviceModelApi'
import { IDeviceModel } from '@modules/maintenance/datas/deviceModel/IDeviceModel'
import { IDeviceModelGet } from '@modules/maintenance/datas/deviceModel/IDeviceModelGet'

import React, { useEffect, useState } from 'react'
import { AsyncPaginate } from 'react-select-async-paginate'

interface AsyncPaginateSelectProps {
	id?: string
	deviceSKUId?: string
	disabled?: boolean
	onChange?: (value: IDeviceModel | null) => void
}

const DeviceModelSelect: React.FC<AsyncPaginateSelectProps> = ({
	id,
	deviceSKUId,
	onChange,
	disabled,
}) => {
	const [internalValue, setInternalValue] = useState<IDeviceModel | null>(null)
	const [key, setKey] = useState(0)

	useEffect(() => {
		setInternalValue(null)
		setKey((prev) => prev + 1) // Cập nhật key để AsyncPaginate render lại
	}, [deviceSKUId])

	useEffect(() => {
		if (id) {
			deviceModelApi
				.getById(id)
				.then(unwrapObjectReponse)
				.then((res) => {
					setInternalValue(res)
				})
				.catch((err) => {})
		}
	}, [id])

	const handleChange = (val: IDeviceModel | null) => {
		setInternalValue(val)
		onChange?.(val) // Gọi callback onChange nếu được truyền từ component cha
	}

	const loadOptionCustomers = async (
		search: any,
		loadedOptions: any,
		additional: any,
	) => {
		const page = additional?.page || 1 // Nếu `additional` là undefined, mặc định `page = 1`

		const paramsObj: IDeviceModelGet = {
			searchTerm: search,
			takeCount: 20,
			skipCount: (page - 1) * 20,
			deviceSKUId,
		}

		try {
			const result = await deviceModelApi.get(paramsObj) // Gọi API với tham số
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
			getOptionLabel={(option: IDeviceModel) => option.name}
			getOptionValue={(option: IDeviceModel) => option.id}
			additional={{
				page: 1,
			}}
			debounceTimeout={400}
			menuPortalTarget={document.body}
			styles={{ menuPortal: (base: any) => ({ ...base, zIndex: 5 }) }}
			isDisabled={disabled}
			placeholder='Chọn đời thiết bị'
		/>
	)
}

export default DeviceModelSelect
