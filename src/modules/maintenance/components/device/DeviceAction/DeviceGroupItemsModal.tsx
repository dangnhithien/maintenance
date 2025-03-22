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
import { v4 as uuidv4 } from 'uuid'
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
	const [editingId, setEditingId] = useState<string | null>(null)
	const [editValue, setEditValue] = useState<string>('')

	const [openCreateModal, setOpenCreateModal] = useState(false)
	const [newAttributeName, setNewAttributeName] = useState('')
	const [newAttributeValue, setNewAttributeValue] = useState('')

	useEffect(() => {
		if (deviceGroupId) {
			attributeDeviceGroupApi
				.get({ deviceGroupId })
				.then((response) => {
					const data: IAttributeDeviceGroup[] = response.result.items
					setItems(data)
					const allIds = data.map((item) => item.id)
					setSelectedIds(allIds)
					onSelectionChange(data)
				})
				.catch((error: any) => {
					console.error('Error fetching items:', error)
				})
		}
	}, [deviceGroupId])

	const handleToggle = (item: IAttributeDeviceGroup) => {
		setSelectedIds((prev) =>
			prev.includes(item.id)
				? prev.filter((id) => id !== item.id)
				: [...prev, item.id],
		)

		const newSelected = selectedIds.includes(item.id)
			? selectedIds.filter((id) => id !== item.id)
			: [...selectedIds, item.id]

		const selectedItems = items.filter((i) => newSelected.includes(i.id))
		onSelectionChange(selectedItems)
	}

	const handleToggleAll = (checked: boolean) => {
		const newSelected = checked ? items.map((item) => item.id) : []
		setSelectedIds(newSelected)
		onSelectionChange(checked ? items : [])
	}

	const handleEdit = (id: string, currentValue: string) => {
		setEditingId(id)
		setEditValue(currentValue)
	}

	const handleSave = (id: string) => {
		const updatedItems = items.map((item) =>
			item.id === id ? { ...item, value: editValue } : item,
		)
		setItems(updatedItems)

		const selectedItems = updatedItems.filter((i) => selectedIds.includes(i.id))
		onSelectionChange(selectedItems)

		setEditingId(null)
	}

	const handleCreateNewAttribute = () => {
		const newItem: IAttributeDeviceGroup = {
			id: uuidv4(),
			deviceId: '',
			deviceGroupId,
			attributeName: newAttributeName,
			attributeDescription: '',
			value: newAttributeValue,
		}

		const updatedItems = [...items, newItem]
		const updatedSelected = [...selectedIds, newItem.id]

		setItems(updatedItems)
		setSelectedIds(updatedSelected)
		onSelectionChange(
			updatedItems.filter((i) => updatedSelected.includes(i.id)),
		)

		setNewAttributeName('')
		setNewAttributeValue('')
		setOpenCreateModal(false)
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
						width: 600,
						bgcolor: 'background.paper',
						boxShadow: 24,
						p: 4,
					}}
				>
					<TableContainer
						component={Paper}
						sx={{ maxHeight: 400, overflow: 'auto' }}
					>
						<Table stickyHeader>
							<TableHead>
								<TableRow>
									<TableCell sx={{ bgcolor: '#648CC8', color: 'white' }}>
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
									<TableCell sx={{ bgcolor: '#648CC8', color: 'white' }}>
										Thông số máy
									</TableCell>
									<TableCell sx={{ bgcolor: '#648CC8', color: 'white' }}>
										Giá trị
									</TableCell>
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
										<TableCell
											onClick={() => handleEdit(item.id, item.value || '')}
											sx={{
												cursor: 'pointer',
												minWidth: 200,
												maxWidth: 200,
												display: 'flex',
												alignItems: 'center',
											}}
										>
											{editingId === item.id ? (
												<TextField
													value={editValue}
													onChange={(e) => setEditValue(e.target.value)}
													onBlur={() => handleSave(item.id)}
													autoFocus
													fullWidth
													variant='standard'
													sx={{
														width: '100%', // Đảm bảo input không thay đổi kích thước
														border: 'none',
														outline: 'none',
														'& .MuiInputBase-input': {
															p: 0,
															textAlign: 'left',
														},
														'& .MuiInput-underline:before, & .MuiInput-underline:after':
															{
																borderBottom: 'none !important',
															},
													}}
												/>
											) : (
												<Typography sx={{ width: '100%' }}>
													{item.value || '-'}
												</Typography>
											)}
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
					<Stack direction='row' justifyContent='space-between' sx={{ mt: 2 }}>
						<Button onClick={() => setOpenCreateModal(true)}>
							Tạo thông số mới
						</Button>
						<Button variant='contained' onClick={onClose}>
							Đóng
						</Button>
					</Stack>
				</Box>
			</Modal>

			{/* Modal tạo mới */}
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
					<TextField
						label='Giá trị'
						fullWidth
						sx={{ mt: 2 }}
						value={newAttributeValue}
						onChange={(e) => setNewAttributeValue(e.target.value)}
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
