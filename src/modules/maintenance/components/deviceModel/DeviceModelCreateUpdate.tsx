import ImageUpload from '@components/ImageUpload'
import { unwrapError, unwrapObjectReponse } from '@datas/comon/ApiResponse'
import { yupResolver } from '@hookform/resolvers/yup'
import deviceModelApi from '@modules/maintenance/apis/deviceModelApi'
import { IDeviceModelCreate } from '@modules/maintenance/datas/deviceModel/IDeviceModelCreate'
import { Button, Grid2, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { useNotification } from '../common/Notistack'
import DeviceGroupSelect from '../common/select/DeviceGroupSelect'
import DeviceSKUSelect from '../common/select/DeviceSKUSelect'
import DeviceTypeSelect from '../common/select/DeviceTypeSelect'
import SaveIcon from '@mui/icons-material/Save'
import { useNavigate } from 'react-router-dom'

// Updated schema: removed validations for note and address
const schema = yup.object({
	name: yup.string().required('Không được bỏ trống'),
	code: yup.string().required('Không được bỏ trống'),
	description: yup.string().max(255, 'Giới hạn 255 ký tự'),
	deviceTypeId: yup.string().required('Không được bỏ trống'),
	deviceGroupId: yup.string().required('Không được bỏ trống'),
	deviceSKUId: yup.string().required('Không được bỏ trống'),
	image: yup.string(),
})

interface FormProps {
	id?: string // Chỉ nhận vào id
}

const DeviceModelCreateUpdate: React.FC<FormProps> = ({ id }) => {
	const {
		control,
		handleSubmit,
		reset,
		watch,
		formState: { errors },
	} = useForm<IDeviceModelCreate>({
		defaultValues: {
			code: '',
			description: '',
			name: '',
			deviceTypeId: '',
			deviceGroupId: '',
			deviceSKUId: '',
		},
		resolver: yupResolver(schema),
	})

	const [loading, setLoading] = useState(false)
	const [successMessage, setSuccessMessage] = useState<string | null>(null)
	const { notify } = useNotification()
	const navigate = useNavigate()
	const deviceTypeId = watch('deviceTypeId')
	const deviceGroupId = watch('deviceGroupId')

	// Fetch dữ liệu từ id nếu có
	useEffect(() => {
		if (id) {
			setLoading(true)
			deviceModelApi
				.getById(id)
				.then(unwrapObjectReponse)
				.then((res) => {
					reset(res as IDeviceModelCreate) // Reset form với dữ liệu từ API
				})
				.catch((err) => {
					const { message } = unwrapError(err)
					notify(message, 'error')
				})
				.finally(() => setLoading(false))
		}
	}, [id, reset])

	const onSubmit = async (data: IDeviceModelCreate) => {
		setLoading(true)
		try {
			if (id) {
				const res = await deviceModelApi.update(id, data)
				if (res.statusCode === 200) {
					notify('Chỉnh sửa thành công', 'success')
				}
			} else {
				// Logic tạo mới (create)
				const res = await deviceModelApi.post(data)
				if (res.statusCode === 200) {
					notify('Tạo mới thành công', 'success')
					navigate('/device-models')
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
									Mã đời thiết bị
								</Typography>
								<Typography color='error'>*</Typography>
							</Stack>
							<Controller
								name='code'
								control={control}
								render={({ field }) => (
									<TextField
										{...field}
										fullWidth
										size='small'
										error={!!errors.code}
										helperText={errors.code?.message}
									/>
								)}
							/>
						</Grid2>
						<Grid2 size={4}>
							<Stack direction='row' spacing={1}>
								<Typography variant='body2' color='primary' fontWeight={'bold'}>
									Tên đời thiết bị
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
									Loại thiết bị
								</Typography>
								<Typography color='error'>*</Typography>
							</Stack>
							<Controller
								name='deviceTypeId'
								control={control}
								rules={{
									required: 'Please select a device type',
								}}
								render={({ field }) => (
									<DeviceTypeSelect
										id={field?.value}
										onChange={(value) => field.onChange(value?.id)}
									/>
								)}
							/>
							{errors.deviceTypeId && (
								<p
									style={{
										color: '#d32f2f',
										fontSize: '12px',
										marginLeft: '14px',
										marginTop: '5px',
									}}
								>
									{errors.deviceTypeId.message}
								</p>
							)}
						</Grid2>
						<Grid2 size={4}>
							<Stack direction='row' spacing={1}>
								<Typography variant='body2' color='primary' fontWeight={'bold'}>
									Nhóm thiết bị
								</Typography>
								<Typography color='error'>*</Typography>
							</Stack>
							<Controller
								name='deviceGroupId'
								control={control}
								rules={{
									required: 'Please select a device type',
								}}
								render={({ field }) => (
									<DeviceGroupSelect
										id={field?.value}
										onChange={(value) => field.onChange(value?.id)}
										deviceTypeId={deviceTypeId}
										disabled={!deviceTypeId}
									/>
								)}
							/>
							{errors.deviceGroupId && (
								<p
									style={{
										color: '#d32f2f',
										fontSize: '12px',
										marginLeft: '14px',
										marginTop: '5px',
									}}
								>
									{errors.deviceGroupId.message}
								</p>
							)}
						</Grid2>
						<Grid2 size={4}>
							<Stack direction='row' spacing={1}>
								<Typography variant='body2' color='primary' fontWeight={'bold'}>
									SKU thiết bị
								</Typography>
								<Typography color='error'>*</Typography>
							</Stack>
							<Controller
								name='deviceSKUId'
								control={control}
								rules={{
									required: 'Please select a device type',
								}}
								render={({ field }) => (
									<DeviceSKUSelect
										id={field?.value}
										onChange={(value) => field.onChange(value?.id)}
										deviceGroupId={deviceGroupId}
										disabled={!deviceGroupId}
									/>
								)}
							/>
							{errors.deviceSKUId && (
								<p
									style={{
										color: '#d32f2f',
										fontSize: '12px',
										marginLeft: '14px',
										marginTop: '5px',
									}}
								>
									{errors.deviceSKUId.message}
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
							loading={loading}
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

export default DeviceModelCreateUpdate
