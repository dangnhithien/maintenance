import {
	unwrapListReponse,
	unwrapObjectReponse,
} from '@datas/comon/ApiResponse'
import componentApi from '@modules/maintenance/apis/componentApi'
import { ComponentDto } from '@modules/maintenance/datas/component/ComponentDto'
import { CreateComponentDto } from '@modules/maintenance/datas/component/CreateComponentDto'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import SaveIcon from '@mui/icons-material/Save'
import {
	IconButton,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
} from '@mui/material'
import React, { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react'

// Hàm format ngày dạng dd/MM/yyyy
function formatDateDDMMYYYY(date: Date) {
	if (!date) return ''
	const d = new Date(date)
	const day = d.getDate().toString().padStart(2, '0')
	const month = (d.getMonth() + 1).toString().padStart(2, '0')
	const year = d.getFullYear().toString()
	return `${month}/${day}/${year}`
}

// Hàm chuyển đổi Date sang chuỗi định dạng YYYY-MM-DD theo múi giờ địa phương
function toLocalDateString(date: Date) {
	if (!date) return ''
	const tzOffset = date.getTimezoneOffset() * 60000
	return new Date(date.getTime() - tzOffset).toISOString().split('T')[0]
}

interface Props {
	deviceId?: string
	isEdit?: boolean
}

const ComponentCreateUpdate: React.FC<Props> = ({
	deviceId,
	isEdit = true,
}) => {
	const [tableData, setTableData] = useState<ComponentDto[]>([])

	// Load dữ liệu từ API và parse các trường ngày về đối tượng Date
	useEffect(() => {
		componentApi
			.get({ deviceId })
			.then(unwrapListReponse)
			.then((res) => {
				const parsed = res.map((item: ComponentDto) => ({
					...item,
					installationDate: item.installationDate
						? new Date(item.installationDate)
						: undefined,
					lastMaintenanceDate: item.lastMaintenanceDate
						? new Date(item.lastMaintenanceDate)
						: undefined,
				}))
				setTableData(parsed)
			})
			.catch((err) => console.error('Load data error:', err))
	}, [deviceId])

	// Xác định ô đang được edit (rowIndex + field)
	const [editingCell, setEditingCell] = useState<{
		rowIndex: number | null
		field: keyof ComponentDto | null
	}>({ rowIndex: null, field: null })

	// Khi click vào ô, bật trạng thái edit
	const handleClickCell = (rowIndex: number, field: keyof ComponentDto) => {
		setEditingCell({ rowIndex, field })
	}

	// Cập nhật dữ liệu khi gõ
	const handleChange = (
		event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
		rowIndex: number,
		field: keyof ComponentDto,
	) => {
		const newValue = event.target.value
		setTableData((prevData) => {
			const updated = [...prevData]
			let parsedValue: any = newValue

			if (field === 'maintenanceCycle' || field === 'reminderAdvanceDays') {
				parsedValue = parseInt(newValue, 10) || 0
			} else if (
				field === 'installationDate' ||
				field === 'lastMaintenanceDate'
			) {
				parsedValue = new Date(newValue)
				if (isNaN(parsedValue.getTime())) {
					parsedValue = new Date()
				}
			}
			updated[rowIndex] = { ...updated[rowIndex], [field]: parsedValue }
			return updated
		})
	}

	// Thoát trạng thái edit khi blur hoặc nhấn Enter
	const handleFinishEdit = () => {
		setEditingCell({ rowIndex: null, field: null })
	}

	const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			handleFinishEdit()
		}
	}

	// Thêm một dòng mới (id = "" đánh dấu dòng mới)
	const handleAddRow = () => {
		const newRow: ComponentDto = {
			id: '', // chưa có trên DB
			name: '',
			deviceId: deviceId || '',
			installationDate: new Date(),
			maintenanceCycle: 0,
			lastMaintenanceDate: new Date(),
			reminderAdvanceDays: 0,
		}
		setTableData((prev) => [...prev, newRow])
	}

	// Xóa dòng (cục bộ, có thể gọi API nếu cần)
	const handleDeleteRow = (id: string) => {
		setTableData((prev) => prev.filter((row) => row.id !== id))
	}

	// Lưu dòng. Nếu id = "" gọi POST, ngược lại gọi PUT/PATCH
	const handleSaveRow = (id: string) => {
		const rowToSave = tableData.find((r) => r.id === id)
		if (!rowToSave) return

		if (rowToSave.id === '') {
			const createData: CreateComponentDto = {
				deviceId: rowToSave.deviceId,
				name: rowToSave.name,
				installationDate: rowToSave.installationDate || new Date(),
				maintenanceCycle: rowToSave.maintenanceCycle || 0,
				lastMaintenanceDate: rowToSave.lastMaintenanceDate || new Date(),
				reminderAdvanceDays: rowToSave.reminderAdvanceDays || 0,
			}
			componentApi
				.post(createData)
				.then(unwrapObjectReponse)
				.then((response) => {
					const newId = response.id
					setTableData((prev) =>
						prev.map((r) => (r === rowToSave ? { ...r, id: newId } : r)),
					)
				})
				.catch((error) => {
					console.error('Post error:', error)
				})
		} else {
			console.log('Update row ID:', rowToSave.id, '=> call PUT/PATCH here')
			// componentApi.update(rowToSave.id, rowToSave) ...
		}
	}

	// Style cho TextField và hiển thị ô
	const textFieldStyle = {
		width: '100%',
		boxSizing: 'border-box',
		'& .MuiOutlinedInput-root': {
			'& fieldset': {
				border: 'none',
			},
			'& input': {
				padding: '4px 8px',
				fontSize: '0.875rem',
			},
		},
	}

	const cellDisplayStyle: React.CSSProperties = {
		display: 'inline-block',
		width: '100%',
		boxSizing: 'border-box',
		fontSize: '0.875rem',
		padding: '4px 8px',
	}

	return (
		<TableContainer>
			<Table
				sx={{
					'& td:last-child, & th:last-child': {
						borderRight: 0,
					},
				}}
			>
				<TableHead sx={{ background: '#ebf1fa' }}>
					<TableRow
						sx={{
							'& th': {
								color: '#002f77',
								fontWeight: 600,
							},
						}}
					>
						<TableCell>Tên</TableCell>
						<TableCell>Ngày lắp đặt</TableCell>
						<TableCell>Chu kì bảo trì</TableCell>
						<TableCell>Lần bảo trì cuối</TableCell>
						<TableCell>Số ngày nhắc </TableCell>
						{!isEdit && <TableCell>Ngày bảo trì kế tiếp</TableCell>}
						{isEdit && (
							<TableCell sx={{ textAlign: 'center' }}>Action</TableCell>
						)}
					</TableRow>
				</TableHead>
				<TableBody>
					{tableData.map((row, rowIndex) => (
						<TableRow key={rowIndex}>
							{/* Name */}
							<TableCell
								onClick={() => handleClickCell(rowIndex, 'name')}
								sx={{ width: '180px', padding: 0 }}
							>
								{editingCell.rowIndex === rowIndex &&
								editingCell.field === 'name' ? (
									<TextField
										autoFocus
										value={row.name || ''}
										onChange={(e) => handleChange(e, rowIndex, 'name')}
										onBlur={handleFinishEdit}
										onKeyDown={handleKeyDown}
										size='small'
										variant='outlined'
										sx={textFieldStyle}
									/>
								) : (
									<span style={cellDisplayStyle}>{row.name}</span>
								)}
							</TableCell>

							{/* Installation Date */}
							<TableCell
								onClick={() => handleClickCell(rowIndex, 'installationDate')}
								sx={{ width: '160px', padding: 0 }}
							>
								{editingCell.rowIndex === rowIndex &&
								editingCell.field === 'installationDate' ? (
									<TextField
										type='date'
										autoFocus
										value={
											row.installationDate
												? toLocalDateString(row.installationDate)
												: ''
										}
										onChange={(e) =>
											handleChange(e, rowIndex, 'installationDate')
										}
										onBlur={handleFinishEdit}
										onKeyDown={handleKeyDown}
										size='small'
										variant='outlined'
										sx={textFieldStyle}
									/>
								) : (
									<span style={cellDisplayStyle}>
										{row.installationDate
											? formatDateDDMMYYYY(row.installationDate)
											: ''}
									</span>
								)}
							</TableCell>

							{/* Maintenance Cycle */}
							<TableCell
								onClick={() => handleClickCell(rowIndex, 'maintenanceCycle')}
								sx={{ width: '140px', padding: 0 }}
							>
								{editingCell.rowIndex === rowIndex &&
								editingCell.field === 'maintenanceCycle' ? (
									<TextField
										type='number'
										autoFocus
										value={row.maintenanceCycle?.toString() ?? ''}
										onChange={(e) =>
											handleChange(e, rowIndex, 'maintenanceCycle')
										}
										onBlur={handleFinishEdit}
										onKeyDown={handleKeyDown}
										size='small'
										variant='outlined'
										sx={textFieldStyle}
									/>
								) : (
									<span style={cellDisplayStyle}>{row.maintenanceCycle}</span>
								)}
							</TableCell>

							{/* Last Maintenance Date */}
							<TableCell
								onClick={() => handleClickCell(rowIndex, 'lastMaintenanceDate')}
								sx={{ width: '160px', padding: 0 }}
							>
								{editingCell.rowIndex === rowIndex &&
								editingCell.field === 'lastMaintenanceDate' ? (
									<TextField
										type='date'
										autoFocus
										value={
											row.lastMaintenanceDate
												? toLocalDateString(row.lastMaintenanceDate)
												: ''
										}
										onChange={(e) =>
											handleChange(e, rowIndex, 'lastMaintenanceDate')
										}
										onBlur={handleFinishEdit}
										onKeyDown={handleKeyDown}
										size='small'
										variant='outlined'
										sx={textFieldStyle}
									/>
								) : (
									<span style={cellDisplayStyle}>
										{row.lastMaintenanceDate
											? formatDateDDMMYYYY(row.lastMaintenanceDate)
											: ''}
									</span>
								)}
							</TableCell>

							{/* Reminder Advance Days */}
							<TableCell
								onClick={() => handleClickCell(rowIndex, 'reminderAdvanceDays')}
								sx={{ width: '160px', padding: 0 }}
							>
								{editingCell.rowIndex === rowIndex &&
								editingCell.field === 'reminderAdvanceDays' ? (
									<TextField
										type='number'
										autoFocus
										value={row.reminderAdvanceDays?.toString() ?? ''}
										onChange={(e) =>
											handleChange(e, rowIndex, 'reminderAdvanceDays')
										}
										onBlur={handleFinishEdit}
										onKeyDown={handleKeyDown}
										size='small'
										variant='outlined'
										sx={textFieldStyle}
									/>
								) : (
									<span style={cellDisplayStyle}>
										{row.reminderAdvanceDays ?? 0}
									</span>
								)}
							</TableCell>
							{!isEdit && (
								<TableCell sx={{ width: '160px', padding: 0 }}>
									<span style={cellDisplayStyle}>
										{row?.nextMaintenanceDate
											? formatDateDDMMYYYY(row.nextMaintenanceDate)
											: ''}
									</span>
								</TableCell>
							)}
							{/* Action Column */}
							{isEdit && (
								<TableCell sx={{ width: '80px', textAlign: 'center' }}>
									{row.id === '' ? (
										<IconButton
											color='primary'
											onClick={() => handleSaveRow(row.id || '')}
										>
											<SaveIcon />
										</IconButton>
									) : (
										<IconButton
											color='error'
											onClick={() => handleDeleteRow(row.id || '')}
										>
											<DeleteIcon />
										</IconButton>
									)}
								</TableCell>
							)}
						</TableRow>
					))}
					{/* Dòng cuối: nút Add item */}
					{isEdit && (
						<TableRow>
							<TableCell colSpan={6}>
								<div
									onClick={handleAddRow}
									style={{
										display: 'inline-flex',
										alignItems: 'center',
										gap: '6px',
										cursor: 'pointer',
										color: '#1976d2',
									}}
								>
									<AddIcon fontSize='small' />
									<span>Thêm mới</span>
								</div>
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</TableContainer>
	)
}

export default ComponentCreateUpdate
