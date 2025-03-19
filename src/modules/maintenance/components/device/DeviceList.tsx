import AddIcon from '@mui/icons-material/Add'
import {
	Box,
	Button,
	Grid2,
	IconButton,
	Stack,
	Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import InputSearch from '../common/InputSearch'
import deviceApi from '@modules/maintenance/apis/deviceApi'
import { IDevice } from '@modules/maintenance/datas/device/IDevice'
import { IDeviceGet } from '@modules/maintenance/datas/device/IDeviceGet'
import { Warning } from '@mui/icons-material'
import { GridDeleteIcon } from '@mui/x-data-grid'
import { Link } from 'react-router-dom'
import DeviceDetailItem from '../common/DeviceDetailItem'
import { useNotification } from '../common/Notistack'
import PopupConfirm from '../common/PopupConfirm'
import SpinnerLoading from '@components/SpinerLoading'

const DeviceListDetail = () => {
	const PAGE_SIZE = 10

	const [openPopupHardDelete, setOpenPopupHardDelete] = useState(false)
	const { notify } = useNotification()
	const [selectedDevices, setSelectedDevices] = useState<string[]>([])

	// Các tham số filter ban đầu
	const [params, setParams] = useState<IDeviceGet>({
		includeProperties: 'Customer,DeviceModel,DeviceType',
		searchTerm: '',
		takeCount: PAGE_SIZE,
	})

	const [devices, setDevices] = useState<IDevice[]>([])
	const [page, setPage] = useState<number>(0) // Số trang hiện tại (skipCount)
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [hasMore, setHasMore] = useState<boolean>(true)
	const [totalCount, setTotalCount] = useState<number>(0)
	const [mode, setMode] = useState<string>('')

	useEffect(() => {
		setDevices([])
		setPage(0)
		setHasMore(true)
	}, [params.searchTerm])

	useEffect(() => {
		if (!hasMore && page !== 0) return
		setIsLoading(true)
		deviceApi
			.get({
				...params,
				skipCount: page * PAGE_SIZE,
				takeCount: PAGE_SIZE,
			})
			.then((res) => {
				console.log(res)
				// Nếu không còn dữ liệu trả về thì đánh dấu hasMore là false
				if ((page + 1) * PAGE_SIZE >= res.result.totalCount) {
					setHasMore(false)
				}
				// Nếu là trang đầu tiên thì thay thế danh sách, còn nếu không thì nối thêm vào danh sách hiện có
				if (page === 0) {
					setTotalCount(res.result.totalCount)
					setDevices(res.result.items)
				} else {
					setDevices((prevDevices) => [...prevDevices, ...res.result.items])
				}
			})
			.catch((error) => {
				console.error('Error loading Devices:', error)
			})
			.finally(() => {
				setIsLoading(false)
			})
	}, [page, params, hasMore])

	useEffect(() => {
		const container = document.getElementById('layoutContainer')
		if (!container) return
		const handleScroll = () => {
			if (
				container.scrollTop + container.clientHeight + 100 >=
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

	const handleSelectionChange = (deviceId: string, checked: boolean) => {
		setSelectedDevices((prevSelected) =>
			checked
				? [...prevSelected, deviceId]
				: prevSelected.filter((id) => id !== deviceId),
		)
	}

	const handleConfirmHardDelete = async () => {
		await deviceApi
			.delete(true, selectedDevices as string[])
			.then(() => {
				notify('success', 'success')
				setOpenPopupHardDelete(false)

				setSelectedDevices([])
			})
			.catch(() => {})
	}

	const handleCancelHardDelete = () => {
		setOpenPopupHardDelete(false)
	}
	const onHardDelete = () => {
		if (selectedDevices.length > 0) {
			setOpenPopupHardDelete(true)
		}
	}

	return (
		<>
			<Box mb={2}>
				<Stack
					direction='row'
					justifyContent='space-between'
					alignItems={'center'}
				>
					<Stack direction={'row'} spacing={2} alignItems={'center'}>
						<InputSearch
							onSearch={(data) => {
								setParams((prev) => ({ ...prev, searchTerm: data }))
							}}
						/>
					</Stack>
					<div>
						<Link to='/devices/create'>
							<IconButton>
								<AddIcon />
							</IconButton>
						</Link>
						<IconButton
							onClick={() => setMode(mode === 'selection' ? '' : 'selection')}
						>
							<GridDeleteIcon
								color={mode === 'selection' ? 'primary' : 'inherit'}
							/>
						</IconButton>
						{mode === 'selection' && (
							<Button
								variant='contained'
								color='error'
								onClick={onHardDelete}
								disabled={selectedDevices.length === 0}
								sx={{ ml: 2 }}
							>
								Xóa thiết bị đã chọn
							</Button>
						)}
					</div>
				</Stack>
			</Box>
			{devices.length === 0 && !isLoading && (
				<Typography variant='body1' textAlign={'center'} height={100}>
					No Devices
				</Typography>
			)}
			<Grid2 container spacing={2}>
				{devices.map((item) => (
					<Grid2 key={item.id} size={{ xs: 12, md: 6 }}>
						<DeviceDetailItem
							data={item}
							linkBaseUrl={'/devices/update'}
							mode={mode}
							onCheckDelete={handleSelectionChange}
						/>
					</Grid2>
				))}
			</Grid2>
			{isLoading && <SpinnerLoading />}

			<PopupConfirm
				open={openPopupHardDelete}
				onClose={() => setOpenPopupHardDelete(false)}
				onCancel={handleCancelHardDelete}
				onConfirm={handleConfirmHardDelete}
				icon={<Warning fontSize='large' color='warning' />}
				message='Bạn có chắc chắn muốn xóa?'
				subMessage='Sau khi xoá danh sách sẽ biến mất vĩnh viễn!'
				sx={{ width: 450 }}
			/>
		</>
	)
}

export default DeviceListDetail
