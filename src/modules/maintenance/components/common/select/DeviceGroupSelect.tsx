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
const DeviceGroupSelect: React.FC<AsyncPaginateSelectProps> = ({
	id,
	deviceTypeId,
	onChange,
	disabled,
	onSelect,
	error,
}) => {
	const [internalValue, setInternalValue] = useState<IDeviceGroup | null>(null)
	const [key, setKey] = useState(0)

	const handleChange = (val: IDeviceGroup | null) => {
		setInternalValue(val)
		onChange?.(val) // Gọi callback onChange nếu được truyền từ component cha
		onSelect?.({ id: val?.id || '', name: val?.name || '' }) // Gọi callback onSelect nếu được truyền từ component cha
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
			styles={{
				menuPortal: (base: any) => ({ ...base, zIndex: 5 }),
				...customStyles,
				control: (base) => ({
					...base,
					minHeight: '40px',
					height: '40px',
					borderRadius: '4px',
					borderColor: error ? '#d32f2f' : base.borderColor, // Viền đỏ khi có lỗi
				}),
			}}
			isDisabled={disabled} // Disable nếu chưa chọn deviceTypeId
			placeholder='Chọn nhóm thiết bị'
		/>
	)
}

export default DeviceGroupSelect
