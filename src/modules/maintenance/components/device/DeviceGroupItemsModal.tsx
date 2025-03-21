import React, { useState, useEffect } from 'react'
import {
	Modal,
	Box,
	Typography,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Checkbox,
	Paper,
	Button,
	Stack,
	TextField,
} from '@mui/material'
import { IAttributeDeviceGroup } from '@modules/maintenance/datas/attributeDeviceGroup/IAttributeDeviceGroup'
import attributeDeviceGroupApi from '@modules/maintenance/apis/attributeDeviceGroupApi'

interface DeviceGroupItemsModalProps {
	open: boolean
	onClose: () => void
	deviceGroupId: string
	onSelectionChange: (selectedItems: IAttributeDeviceGroup[]) => void
}

const DeviceGroupItemsModal: React.FC<DeviceGroupItemsModalProps> = ({
	open,
	onClose,
	deviceGroupId,
	onSelectionChange,
}) => {
	const [items, setItems] = useState<IAttributeDeviceGroup[]>([])
	const [selectedIds, setSelectedIds] = useState<string[]>([])
	const [openCreateModal, setOpenCreateModal] = useState(false)
	const [newAttributeName, setNewAttributeName] = useState('')

	useEffect(() => {
		if (deviceGroupId) {
			attributeDeviceGroupApi
				.get({ deviceGroupId })
				.then((response) => {
					const data: IAttributeDeviceGroup[] = response.result.items
					setItems(data)
					const allIds = data.map((item) => item.id)
					setSelectedIds(allIds)
					onSelectionChange(data) // mặc định chọn hết
				})
				.catch((error: any) => {
					console.error('Error fetching items:', error)
				})
		}
	}, [deviceGroupId])

	const handleToggle = (item: IAttributeDeviceGroup) => {
		const isSelected = selectedIds.includes(item.id)
		let newSelectedIds: string[]
		let newSelectedItems: IAttributeDeviceGroup[]

		if (isSelected) {
			newSelectedIds = selectedIds.filter((id) => id !== item.id)
			newSelectedItems = items.filter((i) => newSelectedIds.includes(i.id))
		} else {
			newSelectedIds = [...selectedIds, item.id]
			newSelectedItems = items.filter((i) => newSelectedIds.includes(i.id))
		}

		setSelectedIds(newSelectedIds)
		onSelectionChange(newSelectedItems)
	}

	const handleToggleAll = (checked: boolean) => {
		if (checked) {
			const allIds = items.map((item) => item.id)
			setSelectedIds(allIds)
			onSelectionChange(items)
		} else {
			setSelectedIds([])
			onSelectionChange([])
		}
	}

	const handleCreateNewAttribute = async () => {
		try {
			await attributeDeviceGroupApi.post({
				deviceGroupId,
				attributeName: newAttributeName,
			})
			setNewAttributeName('')
			setOpenCreateModal(false)
			// Reload items after creation
			const response = await attributeDeviceGroupApi.get({ deviceGroupId })
			setItems(response.result.items)
		} catch (error) {
			console.error('Error creating attribute:', error)
		}
	}

	return (
		<>
			<Modal open={open} onClose={onClose}>
				<Box
					sx={{
						position: 'absolute',
						top: '50%',
						left: '50%',
						transform: 'translate(-50%, -50%)',
						width: 500,
						bgcolor: 'background.paper',
						boxShadow: 24,
						p: 4,
					}}
				>
					<TableContainer component={Paper}>
						<Table>
							<TableHead sx={{ backgroundColor: '#648CC8' }}>
								<TableRow>
									<TableCell padding='checkbox'>
										<Checkbox
											checked={
												items.length > 0 && selectedIds.length === items.length
											}
											indeterminate={
												selectedIds.length > 0 &&
												selectedIds.length < items.length
											}
											onChange={(e) => handleToggleAll(e.target.checked)}
										/>
									</TableCell>
									<TableCell>Thông số máy</TableCell>
									{/* <TableCell>Giá trị</TableCell> */}
								</TableRow>
							</TableHead>
							<TableBody>
								{items.map((item) => (
									<TableRow key={item.id}>
										<TableCell padding='checkbox'>
											<Checkbox
												checked={selectedIds.includes(item.id)}
												onChange={() => handleToggle(item)}
											/>
										</TableCell>
										<TableCell>{item.attributeName}</TableCell>
										{/* <TableCell>{item.value ?? '-'}</TableCell> */}
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
					<Stack
						direction='row'
						justifyContent='flex-end'
						gap={1}
						sx={{ mt: 2 }}
					>
						<Button onClick={() => setOpenCreateModal(true)}>
							Tạo thông số mới
						</Button>
						<Button variant='contained' onClick={onClose}>
							Đóng
						</Button>
					</Stack>
				</Box>
			</Modal>
			<Modal open={openCreateModal} onClose={() => setOpenCreateModal(false)}>
				<Box
					sx={{
						position: 'absolute',
						top: '50%',
						left: '50%',
						transform: 'translate(-50%, -50%)',
						width: 300,
						bgcolor: 'background.paper',
						boxShadow: 24,
						p: 4,
					}}
				>
					<Typography variant='h6'>Tạo thông số mới</Typography>
					<TextField
						label='Tên thông số'
						fullWidth
						sx={{ mt: 2 }}
						value={newAttributeName}
						onChange={(e) => setNewAttributeName(e.target.value)}
					/>
					<Button
						fullWidth
						sx={{ mt: 2 }}
						variant='contained'
						onClick={handleCreateNewAttribute}
					>
						Tạo
					</Button>
				</Box>
			</Modal>
		</>
	)
}

export default DeviceGroupItemsModal
