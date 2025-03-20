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

const DeviceModelSelect: React.FC<AsyncPaginateSelectProps> = ({
	id,
	deviceSKUId,
	onChange,
	disabled,
	onSelect,
	error,
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
		onSelect?.({ id: val?.id || '', name: val?.name || '' }) // Gọi callback onSelect nếu được truyền từ component cha
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
			isDisabled={disabled}
			placeholder='Chọn đời thiết bị'
		/>
	)
}

export default DeviceModelSelect
