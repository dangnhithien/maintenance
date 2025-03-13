import { unwrapObjectReponse } from '@datas/comon/ApiResponse'
import customerApi from '@modules/maintenance/apis/customerApi'
import { CustomerDto } from '@modules/maintenance/datas/customer/CustomerDto'
import { GetCustomerDto } from '@modules/maintenance/datas/customer/GetCustomerDto'

import React, { useEffect, useState } from 'react'
import { AsyncPaginate } from 'react-select-async-paginate'

interface AsyncPaginateSelectProps {
	id?: string
	disabled?: boolean
	onChange?: (value: CustomerDto | null) => void
}

const CustomerSelect: React.FC<AsyncPaginateSelectProps> = ({
	id,
	onChange,
	disabled,
}) => {
	const [internalValue, setInternalValue] = useState<CustomerDto | null>(null)

	const handleChange = (val: CustomerDto | null) => {
		setInternalValue(val)
		onChange?.(val) // Gọi callback onChange nếu được truyền từ component cha
	}

	useEffect(() => {
		if (id) {
			customerApi
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

		const paramsObj: GetCustomerDto = {
			searchTerm: search,
			takeCount: 20,
			skipCount: (page - 1) * 20,
		}

		try {
			const result = await customerApi.get(paramsObj) // Gọi API với tham số
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
			getOptionLabel={(option: CustomerDto) => option.name}
			getOptionValue={(option: CustomerDto) => option.id}
			additional={{
				page: 1,
			}}
			debounceTimeout={400}
			menuPortalTarget={document.body}
			styles={{ menuPortal: (base: any) => ({ ...base, zIndex: 5 }) }}
			isDisabled={disabled}
			placeholder='Chọn khách hàng'
		/>
	)
}

export default CustomerSelect
