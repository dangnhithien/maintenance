import { unwrapObjectReponse } from '@datas/comon/ApiResponse'
import deviceGroupApi from '@modules/maintenance/apis/deviceGroupApi'
import { IDeviceGroup } from '@modules/maintenance/datas/deviceGroup/IDeviceGroup'
import { IDeviceGroupGet } from '@modules/maintenance/datas/deviceGroup/IDeviceGroupGet'
import React, { useEffect, useState } from 'react'
import { AsyncPaginate } from 'react-select-async-paginate'

interface AsyncPaginateSelectProps {
	id?: string
	deviceTypeId?: string
	disabled?: boolean
	onChange?: (value: IDeviceGroup | null) => void
}

const DeviceGroupSelect: React.FC<AsyncPaginateSelectProps> = ({
	id,
	deviceTypeId,
	onChange,
	disabled,
}) => {
	const [internalValue, setInternalValue] = useState<IDeviceGroup | null>(null)
	const [key, setKey] = useState(0)

	const handleChange = (val: IDeviceGroup | null) => {
		setInternalValue(val)
		onChange?.(val) // Gọi callback onChange nếu được truyền từ component cha
	}

	// Reset internal value khi deviceTypeId thay đổi
	useEffect(() => {
		setInternalValue(null)
		setKey((prev) => prev + 1) // Cập nhật key để AsyncPaginate render lại
	}, [deviceTypeId])

	useEffect(() => {
		if (id) {
			deviceGroupApi
				.getById(id)
				.then(unwrapObjectReponse)
				.then((res) => {
					setInternalValue(res)
					console.log('res', res)
				})
				.catch((err) => {})
		}
	}, [id])

	const loadOptionCustomers = async (
		search: any,
		loadedOptions: any,
		additional: any,
	) => {
		const page = additional?.page || 1
		const paramsObj: IDeviceGroupGet = {
			searchTerm: search,
			takeCount: 20,
			skipCount: (page - 1) * 20,
			deviceTypeId,
		}
		try {
			const result = await deviceGroupApi.get(paramsObj)
			return {
				options: result.result.items,
				hasMore: page * 10 < result.result.totalCount,
				additional: { page: page + 1 },
			}
		} catch (error) {
			console.error('Error loading device group options:', error)
			return { options: [], hasMore: false, additional: { page } }
		}
	}

	return (
		<AsyncPaginate
			key={key}
			isClearable
			value={internalValue}
			onChange={handleChange}
			loadOptions={loadOptionCustomers}
			getOptionLabel={(option: IDeviceGroup) => option.name}
			getOptionValue={(option: IDeviceGroup) => option.id}
			additional={{
				page: 1,
			}}
			debounceTimeout={400}
			menuPortalTarget={document.body}
			styles={{ menuPortal: (base: any) => ({ ...base, zIndex: 5 }) }}
			isDisabled={disabled} // Disable nếu chưa chọn deviceTypeId
			placeholder='Chọn nhóm thiết bị'
		/>
	)
}

export default DeviceGroupSelect
