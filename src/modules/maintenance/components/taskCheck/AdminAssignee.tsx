import { unwrapListReponse } from '@datas/comon/ApiResponse'

import caseApi from '@modules/maintenance/apis/caseApi'
import deviceApi from '@modules/maintenance/apis/deviceApi'
import { ICase } from '@modules/maintenance/datas/case/ICase'
import { IDevice } from '@modules/maintenance/datas/device/IDevice'
import { IDeviceGet } from '@modules/maintenance/datas/device/IDeviceGet'
import userApi from '@modules/user/apis/UserApi'
import { UserDto } from '@modules/user/datas/user/UserDto'
import { Box, Grid2 } from '@mui/material'
import { useEffect, useState } from 'react'
import InputSearch from '../common/InputSearch'
import AssigneeCard from './AssigneeCard'

const AdminAssignee = () => {
	// Số phần tử trên mỗi trang
	const PAGE_SIZE = 4

	// Các tham số filter ban đầu
	const [params, setParams] = useState<IDeviceGet>({
		searchTerm: '',
		takeCount: PAGE_SIZE,
	})

	const [products, setProducts] = useState<IDevice[]>([])
	const [technicians, setTechnicians] = useState<UserDto[]>([])
	const [cases, setCases] = useState<ICase[]>([])
	const [page, setPage] = useState<number>(0) // Số trang hiện tại (skipCount)
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [hasMore, setHasMore] = useState<boolean>(true)
	const [totalCount, setTotalCount] = useState<number>(0)

	// Khi thay đổi tìm kiếm (hoặc các tham số khác) thì reset lại danh sách, số trang và trạng thái còn dữ liệu
	useEffect(() => {
		if (params.searchTerm !== '' && page !== 0) {
			setProducts([])
			setPage(0)
			setHasMore(true)
		}
	}, [params.searchTerm])

	// Gọi API load danh sách sản phẩm mỗi khi số trang (page) hoặc các tham số khác thay đổi
	useEffect(() => {
		if (!hasMore || isLoading) return // 🔥 Tránh gọi API khi đang loading hoặc đã hết dữ liệu
		if (page === 0 && products.length > 0) return

		setIsLoading(true)
		deviceApi
			.get({
				...params,
				skipCount: page * PAGE_SIZE,
				takeCount: PAGE_SIZE,
			})
			.then((res) => {
				if ((page + 1) * PAGE_SIZE >= res.result.totalCount) {
					setHasMore(false)
				}
				if (page === 0) {
					setTotalCount(res.result.totalCount)
					setProducts(res.result.items)
				} else {
					setProducts((prevProducts) => [...prevProducts, ...res.result.items])
				}
			})
			.catch((error) => {
				console.error('Error loading products:', error)
			})
			.finally(() => {
				setIsLoading(false)
			})
	}, [page])

	// Gọi API lấy danh sách kĩ thuật viên
	useEffect(() => {
		userApi
			.get()
			.then(unwrapListReponse)
			.then((res) => {
				// Giả sử res.result.items chứa danh sách user với các trường id và name
				setTechnicians(res)
			})
			.catch((error) => {
				console.error('Error loading technicians:', error)
			})
		caseApi
			.get({ fromDate: new Date('2025-1-1'), toDate: new Date('2025-5-1') })
			.then(unwrapListReponse)
			.then((res) => {
				// Giả sử res.result.items chứa danh sách user với các trường id và name
				setCases(res)
			})
			.catch((error) => {
				console.error('Error loading technicians:', error)
			})
	}, [])

	// Lắng nghe sự kiện cuộn trang: khi cuộn gần cuối trang sẽ tăng số trang để load thêm dữ liệu
	useEffect(() => {
		const container = document.getElementById('layoutContainer')
		if (!container) return
		const handleScroll = () => {
			if (
				container.scrollTop + container.clientHeight + 200 >=
				container.scrollHeight
			) {
				if (!isLoading && hasMore) {
					setPage((prevPage) => prevPage + 1)
				}
			}
		}
		container.addEventListener('scroll', handleScroll)
		return () => container.removeEventListener('scroll', handleScroll)
	}, [isLoading, hasMore])

	return (
		<Box sx={{ p: 2, minHeight: '100vh' }}>
			<Grid2 container justifyContent={'space-between'} mb={2}>
				<InputSearch
					onSearch={(searchText) => {
						setParams({ ...params, searchTerm: searchText })
					}}
				/>
			</Grid2>
			<Grid2 container spacing={2}>
				{products.map((product) => (
					<AssigneeCard
						key={product.id}
						product={product}
						technicians={technicians}
						cases={cases}
					/>
				))}
			</Grid2>
		</Box>
	)
}

export default AdminAssignee
