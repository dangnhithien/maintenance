import { unwrapObjectReponse } from '@datas/comon/ApiResponse'
import userApi from '@modules/user/apis/UserApi'
import { GetUserDto } from '@modules/user/datas/user/GetUserDto'
import { UserDto } from '@modules/user/datas/user/UserDto'

import React, { useEffect, useState } from 'react'
import { AsyncPaginate } from 'react-select-async-paginate'

interface AsyncPaginateSelectProps {
	id?: string
	disabled?: boolean
	onChange?: (value: UserDto | null) => void
}

const UserSelect: React.FC<AsyncPaginateSelectProps> = ({
	id,
	onChange,
	disabled,
}) => {
	const [internalValue, setInternalValue] = useState<UserDto | null>(null)

	const handleChange = (val: UserDto | null) => {
		setInternalValue(val)
		onChange?.(val) // Gọi callback onChange nếu được truyền từ component cha
	}

	useEffect(() => {
		if (id) {
			userApi
				.getById(id)
				.then(unwrapObjectReponse)
				.then((res) => {
					setInternalValue(res)
				})
				.catch((err) => {})
		}
	}, [id])

	const loadOptionUsers = async (
		search: any,
		loadedOptions: any,
		additional: any,
	) => {
		const page = additional?.page || 1 // Nếu `additional` là undefined, mặc định `page = 1`

		const paramsObj: GetUserDto = {
			searchTerm: search,
			takeCount: 20,
			skipCount: (page - 1) * 20,
		}

		try {
			const result = await userApi.get(paramsObj) // Gọi API với tham số
			return {
				options: result.result.items,
				hasMore: page * 10 < result.result.totalCount,
				additional: {
					page: page + 1,
				},
			}
		} catch (error) {
			console.error('Error loading User options:', error)
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
			loadOptions={loadOptionUsers}
			getOptionLabel={(option: UserDto) => option.fullname}
			getOptionValue={(option: UserDto) => option.id}
			additional={{
				page: 1,
			}}
			debounceTimeout={400}
			menuPortalTarget={document.body}
			styles={{ menuPortal: (base: any) => ({ ...base, zIndex: 5 }) }}
			isDisabled={disabled}
			placeholder='Chọn nhân viên'
		/>
	)
}

export default UserSelect
