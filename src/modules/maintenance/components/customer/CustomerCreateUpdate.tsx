import ImageUpload from '@components/ImageUpload'
import { unwrapError, unwrapObjectReponse } from '@datas/comon/ApiResponse'
import { yupResolver } from '@hookform/resolvers/yup'
import customerApi from '@modules/maintenance/apis/customerApi'
import { CreateCustomerDto } from '@modules/maintenance/datas/customer/CreateCustomerDto'
import { Button, Grid2, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { useNotification } from '../common/Notistack'
import Wrapper from '../common/Wrapper'
import UserSelect from '../common/select/UserSelect'
import SaveIcon from '@mui/icons-material/Save'
import { useNavigate } from 'react-router-dom'

// Chỉ validate 2 field: code và name
const schema = yup.object({
	code: yup.string().required('Mã khách hàng là bắt buộc'),
	name: yup
		.string()
		.required('Tên khách hàng là bắt buộc')
		.max(255, 'Phải dưới 255 ký tự'),
})

interface FormProps {
	id?: string
}

const CustomerCreateUpdate: React.FC<FormProps> = ({ id }) => {
	const {
		control,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<CreateCustomerDto>({
		defaultValues: {
			code: '',
			image: '',
			name: '',
			address: '',
			phoneNumber: '',
			customerRepresentativeName: '',
			customerRepresentativePhoneNumber: '',
			leadTechnicianId: '',
			description: '',
		},
		resolver: yupResolver(schema),
	})

	const [loading, setLoading] = useState(false)
	const { notify } = useNotification()
	const navigate = useNavigate()

	// Nếu có id => load dữ liệu từ API
	useEffect(() => {
		if (id) {
			setLoading(true)
			customerApi
				.getById(id)
				.then(unwrapObjectReponse)
				.then((res) => {
					reset(res as CreateCustomerDto)
				})
				.catch((err) => {
					const { message } = unwrapError(err)
					notify(message, 'error')
				})
				.finally(() => setLoading(false))
		}
	}, [id])

	const onSubmit = async (data: CreateCustomerDto) => {
		setLoading(true)
		try {
			if (id) {
				const res = await customerApi.update(id, data)
				if (res.statusCode === 200) {
					notify('Chỉnh sửa thành công', 'success')
				}
			} else {
				const res = await customerApi.post(data)
				if (res.statusCode === 200) {
					notify('Tạo mới thành công', 'success')
					setTimeout(() => {
						navigate('/customer')
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
		<Wrapper title='Thông tin khách hàng'>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Grid2 container spacing={2}>
					{/* Image upload */}
					<Grid2>
						<Controller
							name='image'
							control={control}
							render={({ field }) => (
								<ImageUpload
									label='Tải hình lên'
									image={field.value}
									onImageUpload={(binaryImage) => field.onChange(binaryImage)}
								/>
							)}
						/>
					</Grid2>

					<Grid2 flex={1} container spacing={2}>
						{/* Mã khách hàng (validate) */}
						<Grid2 size={{ xs: 12, md: 4, xl: 3 }}>
							<Stack direction='row' spacing={1}>
								<Typography variant='body2' color='primary' fontWeight='bold'>
									Mã khách hàng
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
						{/* Tên khách hàng (validate) */}
						<Grid2 size={{ xs: 12, md: 4, xl: 3 }}>
							<Stack direction='row' spacing={1}>
								<Typography variant='body2' color='primary' fontWeight='bold'>
									Tên khách hàng
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
						{/* Địa chỉ */}
						<Grid2 size={{ xs: 12, md: 4, xl: 3 }}>
							<Stack direction='row' spacing={1}>
								<Typography variant='body2' color='primary' fontWeight='bold'>
									Địa chỉ
								</Typography>
								<Typography sx={{ color: '#fff' }}>*</Typography>
							</Stack>
							<Controller
								name='address'
								control={control}
								render={({ field }) => (
									<TextField {...field} fullWidth size='small' />
								)}
							/>
						</Grid2>
						{/* Số điện thoại */}
						<Grid2 size={{ xs: 12, md: 4, xl: 3 }}>
							<Stack direction='row' spacing={1}>
								<Typography variant='body2' color='primary' fontWeight='bold'>
									Số điện thoại
								</Typography>
								<Typography sx={{ color: '#fff' }}>*</Typography>
							</Stack>
							<Controller
								name='phoneNumber'
								control={control}
								render={({ field }) => (
									<TextField {...field} fullWidth size='small' />
								)}
							/>
						</Grid2>
						{/* Tên đại diện khách hàng */}
						<Grid2 size={{ xs: 12, md: 4, xl: 3 }}>
							<Stack direction='row' spacing={1}>
								<Typography variant='body2' color='primary' fontWeight='bold'>
									Tên đại diện khách hàng
								</Typography>
								<Typography sx={{ color: '#fff' }}>*</Typography>
							</Stack>
							<Controller
								name='customerRepresentativeName'
								control={control}
								render={({ field }) => (
									<TextField {...field} fullWidth size='small' />
								)}
							/>
						</Grid2>
						{/* SĐT đại diện khách hàng */}
						<Grid2 size={{ xs: 12, md: 4, xl: 3 }}>
							<Stack direction='row' spacing={1}>
								<Typography variant='body2' color='primary' fontWeight='bold'>
									SĐT đại diện khách hàng
								</Typography>
								<Typography sx={{ color: '#fff' }}>*</Typography>
							</Stack>
							<Controller
								name='customerRepresentativePhoneNumber'
								control={control}
								render={({ field }) => (
									<TextField {...field} fullWidth size='small' />
								)}
							/>
						</Grid2>
						{/* Kỹ thuật viên chính */}
						<Grid2 size={{ xs: 12, md: 4, xl: 3 }}>
							<Stack direction='row' spacing={1}>
								<Typography variant='body2' color='primary' fontWeight='bold'>
									Kỹ thuật viên chính
								</Typography>
								<Typography sx={{ color: '#fff' }}>*</Typography>
							</Stack>
							<Controller
								name='leadTechnicianId'
								control={control}
								render={({ field }) => (
									<UserSelect
										id={field.value}
										onChange={(value) => field.onChange(value?.id)}
									/>
								)}
							/>
						</Grid2>
						{/* Mô tả */}
						<Grid2 size={{ xs: 12, md: 8, xl: 3 }}>
							<Stack direction='row' spacing={1}>
								<Typography variant='body2' color='primary' fontWeight='bold'>
									Mô tả
								</Typography>
								<Typography sx={{ color: '#fff' }}>*</Typography>
							</Stack>
							<Controller
								name='description'
								control={control}
								render={({ field }) => (
									<TextField {...field} fullWidth multiline size='small' />
								)}
							/>
						</Grid2>
					</Grid2>
				</Grid2>
				<Grid2
					container
					size={{ xs: 12, md: 8, xl: 3 }}
					justifyContent='center'
				>
					<Button
						role={undefined}
						variant='contained'
						tabIndex={-1}
						startIcon={<SaveIcon />}
						type='submit'
					>
						Lưu
					</Button>
				</Grid2>
			</form>
		</Wrapper>
	)
}

export default CustomerCreateUpdate
