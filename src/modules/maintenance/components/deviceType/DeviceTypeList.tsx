import { Warning } from '@mui/icons-material'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import { Box, Button, IconButton, CircularProgress, Grid2 } from '@mui/material'
import React, { useCallback, useRef } from 'react'
import { Link } from 'react-router-dom'
import DeviceCard from '../common/DeviceItem'
import InputSearch from '../common/InputSearch'
import { useNotification } from '../common/Notistack'
import PopupConfirm from '../common/PopupConfirm'
import useDeviceType from '@modules/maintenance/hooks/useDeviceType'

const DeviceType: React.FC = () => {
	const { notify } = useNotification()

	// Sử dụng hook useDeviceType với Infinite Query (lấy 3 phần tử mỗi trang)
	const {
		deviceTypes,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		isLoading,
		deleteDeviceType,
	} = useDeviceType(10)

	// State cho chế độ selection và popup xóa
	const [mode, setMode] = React.useState<string>('')
	const [openPopupHardDelete, setOpenPopupHardDelete] = React.useState(false)
	const [selectedDevices, setSelectedDevices] = React.useState<string[]>([])

	// IntersectionObserver để kích hoạt load thêm khi cuộn tới phần tử cuối cùng
	const observer = useRef<IntersectionObserver | null>(null)
	const lastDeviceElementRef = useCallback(
		(node: HTMLDivElement) => {
			if (isFetchingNextPage || !hasNextPage) return
			if (observer.current) observer.current.disconnect()

			observer.current = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting) {
					fetchNextPage()
				}
			})

			if (node) observer.current.observe(node)
		},
		[isFetchingNextPage, hasNextPage, fetchNextPage],
	)

	// Cập nhật danh sách thiết bị được chọn từ DeviceCard
	const handleSelectionChange = (deviceId: string, checked: boolean) => {
		setSelectedDevices((prevSelected) =>
			checked
				? [...prevSelected, deviceId]
				: prevSelected.filter((id) => id !== deviceId),
		)
	}

	// Xác nhận xóa thiết bị (gọi mutation từ useDeviceType)
	const handleConfirmHardDelete = async () => {
		await deleteDeviceType({
			isHardDeleted: true,
			ids: selectedDevices,
		})
			.then(() => {
				notify('Xóa thành công', 'success')
				setOpenPopupHardDelete(false)
				setSelectedDevices([])
			})
			.catch(() => {})
	}

	return (
		<>
			{/* Header: Tìm kiếm & Nút Thêm/Xóa */}
			<Grid2 container justifyContent='space-between' alignItems='center'>
				<Grid2 size={{ xs: 6 }}>
					<InputSearch onSearch={(searchText) => console.log(searchText)} />
				</Grid2>
				<Grid2>
					<Box display='flex' alignItems='center'>
						<Link to='/device-types/create'>
							<IconButton>
								<AddIcon />
							</IconButton>
						</Link>
						<IconButton
							onClick={() => setMode(mode === 'selection' ? '' : 'selection')}
						>
							<DeleteIcon
								color={mode === 'selection' ? 'primary' : 'inherit'}
							/>
						</IconButton>
						{mode === 'selection' && (
							<Button
								variant='contained'
								color='error'
								onClick={() => setOpenPopupHardDelete(true)}
								disabled={selectedDevices.length === 0}
								sx={{ ml: 2 }}
							>
								Xóa thiết bị đã chọn
							</Button>
						)}
					</Box>
				</Grid2>
			</Grid2>

			{/* Danh sách thiết bị */}
			<Grid2 container spacing={2} mt={2}>
				{deviceTypes.map((device, index) => (
					<Grid2
						key={device.id}
						size={{ xs: 12, sm: 6, md: 4, xl: 4 }}
						ref={
							index === deviceTypes.length - 1
								? (lastDeviceElementRef as React.Ref<HTMLDivElement>)
								: null
						}
					>
						<DeviceCard
							linkBaseUrl='/device-types/update'
							deviceId={device.id}
							image='https://linx.com.vn/wp-content/uploads/2022/10/may-in-date-linx-8830.jpg'
							deviceName={device.name}
							mode={mode}
							onCheckDelete={handleSelectionChange}
						/>
					</Grid2>
				))}
			</Grid2>

			{/* Hiển thị icon loading khi tải thêm dữ liệu */}
			{(isLoading || isFetchingNextPage) && (
				<Box display='flex' justifyContent='center' mt={2}>
					<CircularProgress />
				</Box>
			)}

			{/* Popup xác nhận xóa */}
			<PopupConfirm
				open={openPopupHardDelete}
				onClose={() => setOpenPopupHardDelete(false)}
				onCancel={() => setOpenPopupHardDelete(false)}
				onConfirm={handleConfirmHardDelete}
				icon={<Warning fontSize='large' color='warning' />}
				message='Bạn có chắc chắn muốn xóa?'
				subMessage='Sau khi xóa, danh sách sẽ biến mất vĩnh viễn!'
				sx={{ width: 450 }}
			/>
		</>
	)
}

export default DeviceType
