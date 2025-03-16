import { unwrapError, unwrapObjectReponse } from '@datas/comon/ApiResponse'
import { yupResolver } from '@hookform/resolvers/yup'
import caseApi from '@modules/maintenance/apis/caseApi'
import { ICaseCreate } from '@modules/maintenance/datas/case/ICaseCreate'
import { Button, Grid2, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { useNotification } from '../common/Notistack'
import Wrapper from '../common/Wrapper'
import CaseTypeSelect from '../common/select/CaseTypeSelect'
import CustomerSelect from '../common/select/CustomerSelect'
import DeviceSelect from '../common/select/DeviceSelect'
import UserSelect from '../common/select/UserSelect'
import { useNavigate } from 'react-router-dom'
import SaveIcon from '@mui/icons-material/Save'

const schema = yup.object({
	name: yup.string().required('Không được bỏ trống'),
	assigneeId: yup.string().required('Không được bỏ trống'),
	caseTypeId: yup.string().required('Không được bỏ trống'),
	customerId: yup.string().required('Không được bỏ trống'),
	deviceId: yup.string().required('Không được bỏ trống'),
	scheduledTime: yup.string().required('Không được bỏ trống'),
	description: yup.string().max(255, 'Giới hạn 255 ký tự'),
})

interface FormProps {
	id?: string
}

const CaseCreateUpdate: React.FC<FormProps> = ({ id }) => {
	const {
		control,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<ICaseCreate>({
		defaultValues: {
			assigneeId: '',
			caseTypeId: '',
			customerId: '',
			deviceId: '',
			name: '',
			note: '',
			scheduledTime: '',
		},
		resolver: yupResolver(schema),
	})
	const [loading, setLoading] = useState(false)
	const { notify } = useNotification()
	const navigate = useNavigate()

	useEffect(() => {
		if (id) {
			setLoading(true)
			caseApi
				.getById(id)
				.then(unwrapObjectReponse)
				.then((res) => {
					reset(res as ICaseCreate)
				})
				.catch((err) => {
					const { message } = unwrapError(err)
					notify(message, 'error')
				})
				.finally(() => setLoading(false))
		}
	}, [id])

	const onSubmit = async (data: ICaseCreate) => {
		setLoading(true)
		try {
			if (id) {
				const res = await caseApi.update(id, data)
				notify(res.message, 'success')
			} else {
				const res = await caseApi.post(data)

				if (res.statusCode === 200) {
					notify(res.message, 'success')
					navigate('/cases')
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
		<Wrapper title='Thông tin khách hàng'>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Grid2 flex={1} container spacing={2}>
					{/* Mã khách hàng (validate) */}
					<Grid2 size={{ xs: 12, md: 4, xl: 4 }}>
						<Stack direction='row' spacing={1}>
							<Typography variant='body2' color='primary' fontWeight='bold'>
								Tên case
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
								Ngày tiến hành
							</Typography>
							<Typography color='error'>*</Typography>
						</Stack>
						<Controller
							name='scheduledTime'
							control={control}
							render={({ field }) => (
								<TextField
									{...field}
									type='date'
									fullWidth
									size='small'
									error={!!errors.scheduledTime}
									helperText={errors.scheduledTime?.message}
								/>
							)}
						/>
					</Grid2>
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
								required: 'Please select a device type',
							}}
							render={({ field }) => (
								<DeviceSelect
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

					<Grid2 size={4}>
						<Stack direction='row' spacing={1}>
							<Typography variant='body2' color='primary' fontWeight={'bold'}>
								Kỹ thuật viên
							</Typography>
							<Typography color='error'>*</Typography>
						</Stack>
						<Controller
							name='assigneeId'
							control={control}
							rules={{
								required: 'Please select a device type',
							}}
							render={({ field }) => (
								<UserSelect
									id={field?.value}
									onChange={(value) => field.onChange(value?.id)}
								/>
							)}
						/>
						{errors.assigneeId && (
							<p
								style={{
									color: '#d32f2f',
									fontSize: '12px',
									marginLeft: '14px',
									marginTop: '5px',
								}}
							>
								{errors.assigneeId.message}
							</p>
						)}
					</Grid2>
					<Grid2 size={4}>
						<Stack direction='row' spacing={1}>
							<Typography variant='body2' color='primary' fontWeight={'bold'}>
								Loại case
							</Typography>
							<Typography color='error'>*</Typography>
						</Stack>
						<Controller
							name='caseTypeId'
							control={control}
							rules={{
								required: 'Please select a device type',
							}}
							render={({ field }) => (
								<CaseTypeSelect
									id={field?.value}
									onChange={(value) => field.onChange(value?.id)}
								/>
							)}
						/>
						{errors.caseTypeId && (
							<p
								style={{
									color: '#d32f2f',
									fontSize: '12px',
									marginLeft: '14px',
									marginTop: '5px',
								}}
							>
								{errors.caseTypeId.message}
							</p>
						)}
					</Grid2>
					{/* Mô tả */}
					<Grid2 size={{ xs: 12, md: 8, xl: 4 }}>
						<Stack direction='row' spacing={1}>
							<Typography variant='body2' color='primary' fontWeight='bold'>
								Ghi chú
							</Typography>
							<Typography sx={{ color: '#fff' }}>*</Typography>
						</Stack>
						<Controller
							name='note'
							control={control}
							render={({ field }) => (
								<TextField {...field} fullWidth multiline size='small' />
							)}
						/>
					</Grid2>
				</Grid2>

				<Grid2
					container
					size={{ xs: 12, md: 8, xl: 12 }}
					justifyContent='center'
				>
					<Button
						role={undefined}
						variant='contained'
						tabIndex={-1}
						startIcon={<SaveIcon />}
						loading={loading}
						type='submit'
					>
						Lưu
					</Button>
				</Grid2>
			</form>
		</Wrapper>
	)
}

export default CaseCreateUpdate
