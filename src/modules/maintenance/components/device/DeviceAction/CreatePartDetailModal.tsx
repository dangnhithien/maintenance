import React, { useState } from 'react'
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	TextField,
	Button,
	Grid2,
} from '@mui/material'
import UsageTypeSelect from '../../common/select/UsageTypeSelect'
import PartCategorySelect from '../../common/select/PartCategorySelect'
import PartTypeSelect from '../../common/select/PartTypeSelect'
import PartGroupSelect from '../../common/select/PartGroupSelect'
import PartSKUSelect from '../../common/select/PartSKUSelect'
import { IPartDetailCreate } from '@modules/maintenance/datas/partDetail/IPartDetailCreate'

// interface PartFormData {
// 	serialNumber: string
// 	name: string
// 	description: string
// 	partCategoryId: string
// 	partCategoryName: string
// 	partTypeId: string
// 	partTypeName: string
// 	partGroupId: string
// 	partGroupName: string
// 	partSKUId: string
// 	partSKUName: string
// 	usageTypeId: string
// 	usageTypeName: string
// }

interface CreatePartDetailModalProps {
	open: boolean
	onClose: () => void
	onSubmit: (data: IPartDetailCreate) => void
}

export const CreatePartDetailModal: React.FC<CreatePartDetailModalProps> = ({
	open,
	onClose,
	onSubmit,
}) => {
	const [errors, setErrors] = useState<
		Partial<Record<keyof IPartDetailCreate, string>>
	>({})
	const [formData, setFormData] = useState<IPartDetailCreate>({
		serialNumber: '',
		name: '',
		description: '',
		deviceId: '',
		partCategoryId: '',
		partCategoryName: '',
		partTypeId: '',
		partTypeName: '',
		partGroupId: '',
		partGroupName: '',
		partSKUId: '',
		partSKUName: '',
		usageTypeId: '',
		usageTypeName: '',
	})

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setFormData((prev) => ({ ...prev, [name]: value }))
	}

	const handleSubmit = () => {
		const newErrors: Partial<Record<keyof IPartDetailCreate, string>> = {}

		const requiredFields: (keyof IPartDetailCreate)[] = [
			'serialNumber',
			'name',
			'partCategoryId',
			'partTypeId',
			'partGroupId',
			'partSKUId',
			'usageTypeId',
		]

		requiredFields.forEach((field) => {
			if (!formData[field]) {
				newErrors[field] = 'Trường này là bắt buộc'
			}
		})

		setErrors(newErrors)

		if (Object.keys(newErrors).length === 0) {
			onSubmit(formData)
			setFormData({
				serialNumber: '',
				name: '',
				description: '',
				deviceId: '',
				partCategoryId: '',
				partCategoryName: '',
				partTypeId: '',
				partTypeName: '',
				partGroupId: '',
				partGroupName: '',
				partSKUId: '',
				partSKUName: '',
				usageTypeId: '',
				usageTypeName: '',
			})

			setErrors({})
		}
	}

	console.log(formData)

	return (
		<Dialog open={open} onClose={onClose} fullWidth maxWidth='lg'>
			<DialogTitle
				sx={{ backgroundColor: '#1976d2', color: '#fff', fontWeight: 'bold' }}
			>
				Tạo thành phần mới
			</DialogTitle>
			<DialogContent dividers sx={{ p: 2 }}>
				<Grid2 container spacing={2} mt={1}>
					<Grid2 size={{ xs: 3 }}>
						<TextField
							fullWidth
							size='small'
							label='Seri'
							name='serialNumber'
							value={formData.serialNumber}
							onChange={handleChange}
							error={!!errors.serialNumber}
							helperText={errors.serialNumber}
						/>
					</Grid2>
					<Grid2 size={{ xs: 3 }}>
						<TextField
							fullWidth
							size='small'
							label='Tên'
							name='name'
							value={formData.name}
							onChange={handleChange}
							error={!!errors.name}
							helperText={errors.name}
						/>
					</Grid2>
					<Grid2 size={{ xs: 3 }}>
						<TextField
							fullWidth
							size='small'
							label='Mô tả'
							name='description'
							value={formData.description}
							onChange={handleChange}
						/>
					</Grid2>
					<Grid2 size={{ xs: 3 }}>
						<UsageTypeSelect
							onSelect={(val) =>
								setFormData((prev) => ({
									...prev,
									usageTypeId: val.id,
									usageTypeName: val.name,
								}))
							}
							error={!!errors.usageTypeId}
						/>
						{errors.usageTypeId && (
							<span style={{ color: '#d32f2f', fontSize: 12, marginLeft: 4 }}>
								{errors.usageTypeId}
							</span>
						)}
					</Grid2>
					<Grid2 size={{ xs: 3 }}>
						<PartCategorySelect
							onSelect={(val) =>
								setFormData((prev) => ({
									...prev,
									partCategoryId: val.id,
									partCategoryName: val.name,
								}))
							}
							error={!!errors.partCategoryId}
						/>
						{errors.partCategoryId && (
							<span style={{ color: '#d32f2f', fontSize: 12, marginLeft: 4 }}>
								{errors.partCategoryId}
							</span>
						)}
					</Grid2>
					<Grid2 size={{ xs: 3 }}>
						<PartTypeSelect
							partCategoryId={formData.partCategoryId}
							onSelect={(val) =>
								setFormData((prev) => ({
									...prev,
									partTypeId: val.id,
									partTypeName: val.name,
								}))
							}
							disabled={!formData.partCategoryId}
							error={!!errors.partTypeId}
						/>
						{errors.partTypeId && (
							<span style={{ color: '#d32f2f', fontSize: 12, marginLeft: 4 }}>
								{errors.partTypeId}
							</span>
						)}
					</Grid2>
					<Grid2 size={{ xs: 3 }}>
						<PartGroupSelect
							partTypeId={formData.partTypeId}
							onSelect={(val) =>
								setFormData((prev) => ({
									...prev,
									partGroupId: val.id,
									partGroupName: val.name,
								}))
							}
							disabled={!formData.partTypeId}
							error={!!errors.partGroupId}
						/>
						{errors.partGroupId && (
							<span style={{ color: '#d32f2f', fontSize: 12, marginLeft: 4 }}>
								{errors.partGroupId}
							</span>
						)}
					</Grid2>
					<Grid2 size={{ xs: 3 }}>
						<PartSKUSelect
							partGroupId={formData.partGroupId}
							onSelect={(val) =>
								setFormData((prev) => ({
									...prev,
									partSKUId: val.id,
									partSKUName: val.name,
								}))
							}
							disabled={!formData.partGroupId}
							error={!!errors.partSKUId}
						/>
						{errors.partSKUId && (
							<span style={{ color: '#d32f2f', fontSize: 12, marginLeft: 4 }}>
								{errors.partSKUId}
							</span>
						)}
					</Grid2>
				</Grid2>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose}>Hủy</Button>
				<Button onClick={handleSubmit} variant='contained'>
					Tạo
				</Button>
			</DialogActions>
		</Dialog>
	)
}
