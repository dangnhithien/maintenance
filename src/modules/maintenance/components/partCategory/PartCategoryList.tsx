import { IPartCategoryGet } from '@modules/maintenance/datas/partCategory/IPartCategoryGet'
import usePartCategory from '@modules/maintenance/hooks/usePartCategory'
import { Warning } from '@mui/icons-material'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import { Box, Button, Grid2, IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import DeviceCard from '../common/DeviceItem'
import InputSearch from '../common/InputSearch'
import { useNotification } from '../common/Notistack'
import PopupConfirm from '../common/PopupConfirm'

const PartCategoryList: React.FC = () => {
	const [openPopupHardDelete, setOpenPopupHardDelete] = useState(false)
	const { notify } = useNotification()

	const [params, setParams] = useState<IPartCategoryGet>({
		takeCount: 10,
		sortBy: 'CreatedDate DESC',
	})

	const { partCategorys, fetchPartCategorys, deletePartCategory } =
		usePartCategory()

	const initData = () => {
		fetchPartCategorys(params)
	}

	useEffect(() => {
		initData()
	}, [params])

	const [selectedDevices, setSelectedDevices] = useState<string[]>([])
	// State để quản lí mode hiện tại (selection hiển thị checkbox)
	const [mode, setMode] = useState<string>('')

	// Callback cập nhật danh sách thiết bị được chọn từ DeviceCard
	const handleSelectionChange = (deviceId: string, checked: boolean) => {
		setSelectedDevices((prevSelected) =>
			checked
				? [...prevSelected, deviceId]
				: prevSelected.filter((id) => id !== deviceId),
		)
	}

	const handleConfirmHardDelete = async () => {
		await deletePartCategory({
			isHardDeleted: true,
			ids: selectedDevices as string[],
		})
			.then(() => {
				notify('success', 'success')
				setOpenPopupHardDelete(false)
				initData()
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
		<div>
			<Grid2
				container
				direction={'row'}
				justifyContent={'space-between'}
				mb={2}
			>
				<Grid2>
					<InputSearch
						onSearch={(searchText) => {
							setParams({ ...params, searchTerm: searchText })
						}}
					/>
				</Grid2>
				<Grid2>
					<Box sx={{ display: 'flex', alignItems: 'center' }}>
						<Link to='/part-categories/create'>
							<IconButton>
								<AddIcon />
							</IconButton>
						</Link>
						{/* Icon Sửa */}

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
								onClick={onHardDelete}
								disabled={selectedDevices.length === 0}
								sx={{ ml: 2 }}
							>
								Xóa danh sách đã chọn
							</Button>
						)}
					</Box>
				</Grid2>
			</Grid2>

			<Grid2 container spacing={2}>
				{partCategorys.map((device) => (
					<Grid2 key={device.id} size={{ xs: 12, sm: 6, md: 4, xl: 4 }}>
						<DeviceCard
							linkBaseUrl='/device-types/update'
							deviceId={device.id}
							deviceName={device.name}
							mode={mode} // Truyền mode cho DeviceCard để hiển thị checkbox nếu cần
							onCheckDelete={handleSelectionChange}
						/>
					</Grid2>
				))}
			</Grid2>

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
		</div>
	)
}

export default PartCategoryList
