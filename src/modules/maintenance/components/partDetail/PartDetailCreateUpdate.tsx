import ImageUpload from '@components/ImageUpload'
import { unwrapError, unwrapObjectReponse } from '@datas/comon/ApiResponse'
import { yupResolver } from '@hookform/resolvers/yup'
import partDetailApi from '@modules/maintenance/apis/partDetailApi'
import { IPartDetailCreate } from '@modules/maintenance/datas/partDetail/IPartDetailCreate'
import { Button, Grid2, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { useNotification } from '../common/Notistack'
import DeviceSelect from '../common/select/DeviceSelect'
import PartCategorySelect from '../common/select/PartCategorySelect'
import PartGroupSelect from '../common/select/PartGroupSelect'
import PartSKUSelect from '../common/select/PartSKUSelect'
import PartTypeSelect from '../common/select/PartTypeSelect'
import UsageTypeSelect from '../common/select/UsageTypeSelect'
import SaveIcon from '@mui/icons-material/Save'
import { useNavigate } from 'react-router-dom'

const schema = yup.object({
	name: yup.string().required('Không được bỏ trống'),
	partCategoryId: yup.string().required('Không được bỏ trống'),
	partTypeId: yup.string().required('Không được bỏ trống'),
	partGroupId: yup.string().required('Không được bỏ trống'),
	partSKUId: yup.string().required('Không được bỏ trống'),
	deviceId: yup.string().required('Không được bỏ trống'),
	usageTypeId: yup.string().required('Không được bỏ trống'),
	serialNumber: yup.string().required('Không được bỏ trống'),
	description: yup.string().max(255, 'Giới hạn 255 ký tự'),
	image: yup.string(),
})

interface FormProps {
	id?: string // Chỉ nhận vào id
}

const PartDetailCreateUpdate: React.FC<FormProps> = ({ id }) => {
	const {
		control,
		handleSubmit,
		reset,
		watch,
		formState: { errors },
	} = useForm<IPartDetailCreate>({
		defaultValues: {
			description: '',
			name: '',
			partCategoryId: '',
			partTypeId: '',
			partGroupId: '',
			deviceId: '',
			partSKUId: '',
			serialNumber: '',
			usageTypeId: '',
		},
		resolver: yupResolver(schema),
	})

	const [loading, setLoading] = useState(false)
	const [successMessage, setSuccessMessage] = useState<string | null>(null)
	const { notify } = useNotification()
	const navigate = useNavigate()
	const partCategoryId = watch('partCategoryId')
	const partTypeId = watch('partTypeId')
	const partGroupId = watch('partGroupId')
	// Fetch dữ liệu từ id nếu có
	useEffect(() => {
		if (id) {
			setLoading(true)
			partDetailApi
				.getById(id)
				.then(unwrapObjectReponse)
				.then((res) => {
					reset(res as IPartDetailCreate) // Reset form với dữ liệu từ API
				})
				.catch((err) => {
					const { message } = unwrapError(err)
					notify(message, 'error')
				})
				.finally(() => setLoading(false))
		}
	}, [id, reset])

	const onSubmit = async (data: IPartDetailCreate) => {
		setLoading(true)
		try {
			if (id) {
				const res = await partDetailApi.update(id, data)
				if (res.statusCode === 200) {
					notify('Chỉnh sửa thành công', 'success')
				}
			} else {
				const res = await partDetailApi.post(data)
				if (res.statusCode === 200) {
					notify('Tạo mới thành công', 'success')
					setTimeout(() => {
						navigate('/part-Details')
					}, 2000)
				}
			}
		} catch (err) {
			const { message } = unwrapError(err)
			notify(message, 'error')
		} finally {
			setLoading(false)
		}
	}

	if (loading) {
		return <Typography>Loading...</Typography>
	}

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Grid2 container direction={'row'} mt={2} spacing={1}>
					{/* Image upload */}
					<Grid2 mt={2}>
						<Controller
							name='image'
							control={control}
							render={({ field }) => (
								<ImageUpload
									label='Tải hình lên'
									image={field.value}
									onImageUpload={(binaryImage) => {
										field.onChange(binaryImage)
									}}
								/>
							)}
						/>
						{errors.image && (
							<Typography color='error' variant='caption'>
								{errors.image.message}
							</Typography>
						)}
					</Grid2>
					<Grid2 flex={1} container spacing={2}>
						<Grid2 size={4}>
							<Stack direction='row' spacing={1}>
								<Typography variant='body2' color='primary' fontWeight={'bold'}>
									Seri
								</Typography>
								<Typography color='error'>*</Typography>
							</Stack>
							<Controller
								name='serialNumber'
								control={control}
								render={({ field }) => (
									<TextField
										{...field}
										fullWidth
										size='small'
										error={!!errors.serialNumber}
										helperText={errors.serialNumber?.message}
									/>
								)}
							/>
						</Grid2>
						<Grid2 size={4}>
							<Stack direction='row' spacing={1}>
								<Typography variant='body2' color='primary' fontWeight={'bold'}>
									Tên
								</Typography>
								<Typography color='error'>*</Typography>
							</Stack>
							<Controller
								name='name'
								control={control}
								render={({ field }) => (
									<TextField
										{...field}
										fullWidth
										size='small'
										error={!!errors.name}
										helperText={errors.name?.message}
									/>
								)}
							/>
						</Grid2>
						<Grid2 size={4}>
							<Stack direction='row' spacing={1}>
								<Typography variant='body2' color='primary' fontWeight={'bold'}>
									Danh mục thành phần
								</Typography>
								<Typography color='error'>*</Typography>
							</Stack>
							<Controller
								name='partCategoryId'
								control={control}
								rules={{
									required: 'Please select a device Detail',
								}}
								render={({ field }) => (
									<PartCategorySelect
										id={field?.value}
										onChange={(value) => field.onChange(value?.id)}
									/>
								)}
							/>
							{errors.partCategoryId && (
								<p
									style={{
										color: '#d32f2f',
										fontSize: '12px',
										marginLeft: '14px',
										marginTop: '5px',
									}}
								>
									{errors.partCategoryId.message}
								</p>
							)}
						</Grid2>
						<Grid2 size={4}>
							<Stack direction='row' spacing={1}>
								<Typography variant='body2' color='primary' fontWeight={'bold'}>
									Loại thành phần
								</Typography>
								<Typography color='error'>*</Typography>
							</Stack>
							<Controller
								name='partTypeId'
								control={control}
								rules={{
									required: 'Please select a device Detail',
								}}
								render={({ field }) => (
									<PartTypeSelect
										id={field?.value}
										onChange={(value) => field.onChange(value?.id)}
										partCategoryId={partCategoryId}
										disabled={!partCategoryId}
									/>
								)}
							/>
							{errors.partTypeId && (
								<p
									style={{
										color: '#d32f2f',
										fontSize: '12px',
										marginLeft: '14px',
										marginTop: '5px',
									}}
								>
									{errors.partTypeId.message}
								</p>
							)}
						</Grid2>
						<Grid2 size={4}>
							<Stack direction='row' spacing={1}>
								<Typography variant='body2' color='primary' fontWeight={'bold'}>
									Nhóm thành phần
								</Typography>
								<Typography color='error'>*</Typography>
							</Stack>
							<Controller
								name='partGroupId'
								control={control}
								rules={{
									required: 'Please select a device Detail',
								}}
								render={({ field }) => (
									<PartGroupSelect
										id={field?.value}
										onChange={(value) => field.onChange(value?.id)}
										partTypeId={partTypeId}
										disabled={!partTypeId}
									/>
								)}
							/>
							{errors.partGroupId && (
								<p
									style={{
										color: '#d32f2f',
										fontSize: '12px',
										marginLeft: '14px',
										marginTop: '5px',
									}}
								>
									{errors.partGroupId.message}
								</p>
							)}
						</Grid2>
						<Grid2 size={4}>
							<Stack direction='row' spacing={1}>
								<Typography variant='body2' color='primary' fontWeight={'bold'}>
									SKU thành phần
								</Typography>
								<Typography color='error'>*</Typography>
							</Stack>
							<Controller
								name='partSKUId'
								control={control}
								rules={{
									required: 'Please select a device Detail',
								}}
								render={({ field }) => (
									<PartSKUSelect
										id={field?.value}
										onChange={(value) => field.onChange(value?.id)}
										partGroupId={partGroupId}
										disabled={!partGroupId}
									/>
								)}
							/>
							{errors.partSKUId && (
								<p
									style={{
										color: '#d32f2f',
										fontSize: '12px',
										marginLeft: '14px',
										marginTop: '5px',
									}}
								>
									{errors.partSKUId.message}
								</p>
							)}
						</Grid2>

						<Grid2 size={4}>
							<Stack direction='row' spacing={1}>
								<Typography variant='body2' color='primary' fontWeight={'bold'}>
									Thiết bị
								</Typography>
								<Typography color='error'>*</Typography>
							</Stack>
							<Controller
								name='deviceId'
								control={control}
								rules={{
									required: 'Please select a device Detail',
								}}
								render={({ field }) => (
									<DeviceSelect
										id={field?.value}
										onChange={(value) => field.onChange(value?.id)}
									/>
								)}
							/>
							{errors.deviceId && (
								<p
									style={{
										color: '#d32f2f',
										fontSize: '12px',
										marginLeft: '14px',
										marginTop: '5px',
									}}
								>
									{errors.deviceId.message}
								</p>
							)}
						</Grid2>

						<Grid2 size={4}>
							<Stack direction='row' spacing={1}>
								<Typography variant='body2' color='primary' fontWeight={'bold'}>
									Hình thức sử dụng
								</Typography>
								<Typography color='error'>*</Typography>
							</Stack>
							<Controller
								name='usageTypeId'
								control={control}
								rules={{
									required: 'Please select a device Detail',
								}}
								render={({ field }) => (
									<UsageTypeSelect
										id={field?.value}
										onChange={(value) => field.onChange(value?.id)}
									/>
								)}
							/>
							{errors.usageTypeId && (
								<p
									style={{
										color: '#d32f2f',
										fontSize: '12px',
										marginLeft: '14px',
										marginTop: '5px',
									}}
								>
									{errors.usageTypeId.message}
								</p>
							)}
						</Grid2>

						<Grid2 size={4}>
							<Stack direction='row' spacing={1}>
								<Typography variant='body2' color='primary' fontWeight={'bold'}>
									Mô tả
								</Typography>
								<Typography sx={{ color: '#ffffff' }}>*</Typography>
							</Stack>
							<Controller
								name='description'
								control={control}
								render={({ field }) => (
									<TextField {...field} fullWidth size='small' />
								)}
							/>
						</Grid2>
					</Grid2>
				</Grid2>
				<Grid2 container justifyContent={'center'} mt={2}>
					<Grid2>
						<Button
							role={undefined}
							variant='contained'
							tabIndex={-1}
							startIcon={<SaveIcon />}
							fullWidth
							type='submit'
						>
							Lưu
						</Button>
					</Grid2>
				</Grid2>
			</form>
			{successMessage && (
				<Typography mt={2} color='success.main'>
					{successMessage}
				</Typography>
			)}
		</>
	)
}

export default PartDetailCreateUpdate
