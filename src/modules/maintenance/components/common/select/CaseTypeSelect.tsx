import { unwrapObjectReponse } from '@datas/comon/ApiResponse'
import caseTypeApi from '@modules/maintenance/apis/caseTypeApi'
import { ICaseType } from '@modules/maintenance/datas/caseType/ICaseType'
import { ICaseTypeGet } from '@modules/maintenance/datas/caseType/ICaseTypeGet'

import React, { useEffect, useState } from 'react'
import { AsyncPaginate } from 'react-select-async-paginate'

interface AsyncPaginateSelectProps {
	id?: string
	disabled?: boolean
	onChange?: (value: ICaseType | null) => void
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

const CaseTypeSelect: React.FC<AsyncPaginateSelectProps> = ({
	id,
	onChange,
	disabled,
}) => {
	const [internalValue, setInternalValue] = useState<ICaseType | null>(null)

	const handleChange = (val: ICaseType | null) => {
		setInternalValue(val)
		onChange?.(val) // Gọi callback onChange nếu được truyền từ component cha
	}

	useEffect(() => {
		if (id) {
			caseTypeApi
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

		const paramsObj: ICaseTypeGet = {
			searchTerm: search,
			takeCount: 20,
			skipCount: (page - 1) * 20,
		}

		try {
			const result = await caseTypeApi.get(paramsObj) // Gọi API với tham số
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
			getOptionLabel={(option: ICaseType) => option.name}
			getOptionValue={(option: ICaseType) => option.id}
			additional={{
				page: 1,
			}}
			debounceTimeout={400}
			menuPortalTarget={document.body}
			styles={{
				menuPortal: (base: any) => ({ ...base, zIndex: 5 }),
				...customStyles, // Thêm styles tùy chỉnh
			}}
			isDisabled={disabled}
			placeholder='Chọn loại case'
		/>
	)
}

export default CaseTypeSelect
