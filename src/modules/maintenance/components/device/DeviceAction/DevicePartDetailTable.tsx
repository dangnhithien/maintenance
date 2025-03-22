import * as React from 'react'
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Checkbox,
	IconButton,
	Alert,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { IPartDetailCreate } from '@modules/maintenance/datas/partDetail/IPartDetailCreate'
import { CreatePartDetailModal } from './CreatePartDetailModal'

interface DevicePartDetailTableProps {
	isMode?: string
	data: IPartDetailCreate[]
	onChange: (selected: IPartDetailCreate[]) => void
	onAdd?: (newItem: IPartDetailCreate) => void
}

export default function DevicePartDetailTable({
	isMode,
	data = [],
	onChange,
	onAdd,
}: DevicePartDetailTableProps) {
	const [openCreateModal, setOpenCreateModal] = React.useState(false)
	const [selected, setSelected] = React.useState<string[]>([])
	const [errorMessage, setErrorMessage] = React.useState<string | null>(null)

	const isAllSelected = selected.length > 0 && selected.length === data.length

	const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newSelected = e.target.checked ? data.map((r) => r.serialNumber) : []
		setSelected(newSelected)
		onChange(data.filter((item) => newSelected.includes(item.serialNumber)))
	}

	const handleSelectRow = (id: string) => {
		const newSelected = selected.includes(id)
			? selected.filter((i) => i !== id)
			: [...selected, id]
		setSelected(newSelected)
		onChange(data.filter((item) => newSelected.includes(item.serialNumber)))
	}

	const handleAddRow = () => setOpenCreateModal(true)

	const handleCreate = (newData: IPartDetailCreate) => {
		if (!onAdd) return
		const isDuplicate = data.some(
			(item) => item.serialNumber === newData.serialNumber,
		)
		if (isDuplicate) {
			setErrorMessage(`Serial number "${newData.serialNumber}" đã tồn tại.`)
			return
		}
		onAdd({ ...newData, deviceId: '' })

		const updated = [...data, { ...newData, deviceId: '' }]
		const updatedSelected = [...selected, newData.serialNumber]
		setSelected(updatedSelected)
		onChange(
			updated.filter((item) => updatedSelected.includes(item.serialNumber)),
		)
		setOpenCreateModal(false)
	}

	return (
		<>
			{errorMessage && (
				<Alert severity='error' onClose={() => setErrorMessage(null)}>
					{errorMessage}
				</Alert>
			)}
			<TableContainer
				component={Paper}
				sx={{ maxHeight: 200, overflowY: 'auto' }}
			>
				<Table stickyHeader size='small'>
					<TableHead>
						<TableRow sx={{ backgroundColor: '#648CC8' }}>
							{isMode !== 'view' && (
								<TableCell padding='checkbox'>
									<Checkbox
										checked={isAllSelected}
										indeterminate={
											selected.length > 0 && selected.length < data.length
										}
										onChange={handleSelectAll}
									/>
								</TableCell>
							)}
							<TableCell>Seri</TableCell>
							<TableCell>Tên</TableCell>
							<TableCell>Danh mục</TableCell>
							<TableCell>Loại</TableCell>
							<TableCell>Nhóm</TableCell>
							<TableCell>SKU</TableCell>
							<TableCell>Hình thức</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{data?.map((row) => {
							const isChecked = selected.includes(row.serialNumber)
							return (
								<TableRow key={row.serialNumber} hover selected={isChecked}>
									{isMode !== 'view' && (
										<TableCell padding='checkbox'>
											<Checkbox
												checked={isChecked}
												onChange={() => handleSelectRow(row.serialNumber)}
											/>
										</TableCell>
									)}
									<TableCell>{row.serialNumber}</TableCell>
									<TableCell>{row.name}</TableCell>
									<TableCell>{row.partCategoryName}</TableCell>
									<TableCell>{row.partTypeName}</TableCell>
									<TableCell>{row.partGroupName}</TableCell>
									<TableCell>{row.partSKUName}</TableCell>
									<TableCell>{row.usageTypeName}</TableCell>
								</TableRow>
							)
						})}
						{isMode !== 'view' && (
							<TableRow>
								<TableCell align='center' colSpan={8}>
									<IconButton onClick={handleAddRow} color='primary'>
										<AddIcon />
									</IconButton>
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</TableContainer>

			<CreatePartDetailModal
				open={openCreateModal}
				onClose={() => setOpenCreateModal(false)}
				onSubmit={handleCreate}
			/>
		</>
	)
}
