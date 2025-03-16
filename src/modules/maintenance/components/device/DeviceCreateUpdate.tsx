import ImageUpload from '@components/ImageUpload'
import { unwrapError, unwrapObjectReponse } from '@datas/comon/ApiResponse'
import { yupResolver } from '@hookform/resolvers/yup'
import deviceApi from '@modules/maintenance/apis/deviceApi'
import { IDeviceCreate } from '@modules/maintenance/datas/device/IDeviceCreate'
import SaveIcon from '@mui/icons-material/Save'
import { Button, Grid2, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import { useNotification } from '../common/Notistack'
import CustomerSelect from '../common/select/CustomerSelect'
import DeviceGroupSelect from '../common/select/DeviceGroupSelect'
import DeviceModelSelect from '../common/select/DeviceModel'
import DeviceSKUSelect from '../common/select/DeviceSKUSelect'
import DeviceTypeSelect from '../common/select/DeviceTypeSelect'
import UsageTypeSelect from '../common/select/UsageTypeSelect'

// Updated schema: removed validations for note and address
const schema = yup.object({
	name: yup.string().required('Không được bỏ trống'),
	serialNumber: yup.string().required('Không được bỏ trống'),
	note: yup.string().max(255, 'Giới hạn 255 ký tự'),
	deviceTypeId: yup.string().required('Không được bỏ trống'),
	deviceGroupId: yup.string().required('Không được bỏ trống'),
	deviceSKUId: yup.string().required('Không được bỏ trống'),
	deviceModelId: yup.string().required('Không được bỏ trống'),
	image: yup.string(),
})

interface FormProps {
	id?: string // Chỉ nhận vào id
}

const DeviceCreateUpdate: React.FC<FormProps> = ({ id }) => {
	const {
		control,
		handleSubmit,
		reset,
		watch,
		formState: { errors },
	} = useForm<IDeviceCreate>({
		defaultValues: {
			serialNumber: '',
			note: '',
			name: '',
			deviceTypeId: '',
			deviceGroupId: '',
			deviceSKUId: '',
			deviceModelId: '',
			supplier: '',
			rfid: '',
			installationDate: undefined,
			address: '',
			usageTypeId: '',
			customerId: '',
		},
		resolver: yupResolver(schema),
	})

	const [loading, setLoading] = useState(false)
	const [successMessage, setSuccessMessage] = useState<string | null>(null)
	const { notify } = useNotification()
	const navigate = useNavigate()
	const deviceTypeId = watch('deviceTypeId')
	const deviceGroupId = watch('deviceGroupId')
	const deviceSKUId = watch('deviceSKUId')

	useEffect(() => {
		if (id) {
			setLoading(true)
			deviceApi
				.getById(id)
				.then(unwrapObjectReponse)
				.then((res) => {
					reset(res as IDeviceCreate) // Reset form với dữ liệu từ API
				})
				.catch((err) => {
					const { message } = unwrapError(err)
					notify(message, 'error')
				})
				.finally(() => setLoading(false))
		}
	}, [id, reset])

	const onSubmit = async (data: IDeviceCreate) => {
		setLoading(true)
		try {
			if (id) {
				const res = await deviceApi.update(id, data)
				if (res.statusCode === 200) {
					notify('Chỉnh sửa thành công', 'success')
				}
			} else {
				const res = await deviceApi.post(data)
				if (res.statusCode === 200) {
					notify('Tạo mới thành công', 'success')
					navigate('/devices')
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
									Tên thiết bị
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
										deviceTypeId={deviceTypeId} // Truyền deviceTypeId vào component select
										onChange={(value) => field.onChange(value?.id)}
										disabled={!deviceTypeId} // Vô hiệu hóa nếu chưa chọn loại thiết bị
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
									Đời thiết bị
								</Typography>
								<Typography color='error'>*</Typography>
							</Stack>
							<Controller
								name='deviceModelId'
								control={control}
								rules={{
									required: 'Please select a device type',
								}}
								render={({ field }) => (
									<DeviceModelSelect
										id={field?.value}
										onChange={(value) => field.onChange(value?.id)}
										deviceSKUId={deviceSKUId}
										disabled={!deviceSKUId}
									/>
								)}
							/>
							{errors.deviceModelId && (
								<p
									style={{
										color: '#d32f2f',
										fontSize: '12px',
										marginLeft: '14px',
										marginTop: '5px',
									}}
								>
									{errors.deviceModelId.message}
								</p>
							)}
						</Grid2>
						<Grid2 size={4}>
							<Stack direction='row' spacing={1}>
								<Typography variant='body2' color='primary' fontWeight={'bold'}>
									RFID
								</Typography>
								<Typography sx={{ color: '#ffffff' }}>*</Typography>
							</Stack>
							<Controller
								name='rfid'
								control={control}
								render={({ field }) => (
									<TextField {...field} fullWidth size='small' />
								)}
							/>
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
									required: 'Please select a device type',
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
									Ghi chú
								</Typography>
								<Typography sx={{ color: '#ffffff' }}>*</Typography>
							</Stack>
							<Controller
								name='note'
								control={control}
								render={({ field }) => (
									<TextField {...field} fullWidth size='small' />
								)}
							/>
						</Grid2>
					</Grid2>
				</Grid2>
				{/* Các control còn thiếu */}
				<Grid2 container spacing={2} mt={2}>
					<Grid2 size={4}>
						<Stack direction='row' spacing={1}>
							<Typography variant='body2' color='primary' fontWeight={'bold'}>
								Khách hàng
							</Typography>
							<Typography color='error'>*</Typography>
						</Stack>
						<Controller
							name='customerId'
							control={control}
							rules={{
								required: 'Please select a device type',
							}}
							render={({ field }) => (
								<CustomerSelect
									id={field?.value}
									onChange={(value) => field.onChange(value?.id)}
								/>
							)}
						/>
						{errors.customerId && (
							<p
								style={{
									color: '#d32f2f',
									fontSize: '12px',
									marginLeft: '14px',
									marginTop: '5px',
								}}
							>
								{errors.customerId.message}
							</p>
						)}
					</Grid2>
					{/* <Grid2 size={4}>
            <Stack direction="row" spacing={1}>
              <Typography variant="body2" color="primary" fontWeight={"bold"}>
                Nhà cung cấp
              </Typography>
              <Typography sx={{ color: "#ffffff" }}>*</Typography>
            </Stack>
            <Controller
              name="supplier"
              control={control}
              render={({ field }) => (
                <TextField {...field} fullWidth size="small" />
              )}
            />
          </Grid2> */}
					<Grid2 size={4}>
						<Stack direction='row' spacing={1}>
							<Typography variant='body2' color='primary' fontWeight={'bold'}>
								Địa chỉ
							</Typography>
							<Typography sx={{ color: '#ffffff' }}>*</Typography>
						</Stack>
						<Controller
							name='address'
							control={control}
							render={({ field }) => (
								<TextField {...field} fullWidth size='small' />
							)}
						/>
					</Grid2>
					<Grid2 size={4}>
						<Stack direction='row' spacing={1}>
							<Typography variant='body2' color='primary' fontWeight={'bold'}>
								Ngày lắp đặt
							</Typography>
							<Typography sx={{ color: '#ffffff' }}>*</Typography>
						</Stack>
						<Controller
							name='installationDate'
							control={control}
							render={({ field }) => (
								<TextField
									{...field}
									fullWidth
									size='small'
									type='date'
									InputLabelProps={{ shrink: true }}
								/>
							)}
						/>
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

export default DeviceCreateUpdate
