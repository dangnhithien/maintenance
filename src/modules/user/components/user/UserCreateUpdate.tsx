import { unwrapError, unwrapObjectReponse } from '@datas/comon/ApiResponse'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNotification } from '@modules/maintenance/components/common/Notistack'
import userApi from '@modules/user/apis/UserApi'
import { CreateUserDto } from '@modules/user/datas/user/CreateUserDto'
import SaveIcon from '@mui/icons-material/Save'
import {
	Avatar,
	Box,
	Button,
	Grid,
	Paper,
	TextField,
	Typography,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import RoleSelect from '../common/RoleSelect'

// Mở rộng CreateUserDto thêm các trường dùng cho form
export type FormInputs = CreateUserDto & { imageFile?: File; image?: string }

interface EmployeeFormProps {
	id?: string // Nếu có id thì là cập nhật (update)
}

const initialData: FormInputs = {
	userName: '',
	fullname: '',
	email: '',
	password: 'Vms@123456',
	roleId: '',
	phoneNumber: '',
	position: '',
	image: 'https://via.placeholder.com/150',
}

const schema = yup.object().shape({
	userName: yup.string().required('User Name là bắt buộc'),
	fullname: yup.string().required('Tên nhân viên là bắt buộc'),
	email: yup.string(),
	password: yup.string().required('Password là bắt buộc'),
	roleId: yup.string().required('Role là bắt buộc'),
	phoneNumber: yup.string(),
	position: yup.string(),
})

const UserCreateUpdate: React.FC<EmployeeFormProps> = ({ id }) => {
	const [imageFile, setImageFile] = useState<File | null>(null)
	const [preview, setPreview] = useState<string>('')
	const { notify } = useNotification()
	const navigate = useNavigate()

	const {
		control,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<FormInputs>({
		resolver: yupResolver(schema),
		defaultValues: initialData,
	})

	useEffect(() => {
		if (id) {
			userApi
				.getById(id)
				.then(unwrapObjectReponse)
				.then((res) => {
					reset({
						...res,
						userName: res.username,
					})
				})
				.catch((err) => {
					const { message } = unwrapError(err)
					notify(message, 'error')
				})
		}
	}, [])

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			const file = e.target.files[0]
			setImageFile(file)
			setPreview(URL.createObjectURL(file))
		}
	}

	const onSubmitForm = async (data: FormInputs) => {
		try {
			if (id) {
				const res = await userApi.update(id, data)
				if (res.statusCode === 200) {
					notify('Chỉnh sửa thành công', 'success')
				}
			} else {
				const res = await userApi.post({
					...data,
					firstName: 'first',
					lastName: '',
				})
				if (res.statusCode === 200) {
					notify('Tạo mới thành công', 'success')
					navigate('/user')
				}
			}
		} catch (err) {
			const { message } = unwrapError(err)
			notify(message, 'error')
		}
	}

	return (
		<Paper variant='outlined' sx={{ padding: 4, maxwidth: '600px' }}>
			<form onSubmit={handleSubmit(onSubmitForm)}>
				<Grid container spacing={2}>
					{/* Cột bên trái: Avatar và nút upload ảnh */}
					<Grid item xs={12} sm={4}>
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								gap: 2,
							}}
						>
							<Avatar src={preview} sx={{ width: 100, height: 100 }} />
							<Button variant='contained' component='label'>
								Tải ảnh lên
								<input
									type='file'
									accept='image/*'
									hidden
									onChange={handleFileChange}
								/>
							</Button>
						</Box>
					</Grid>

					{/* Cột bên phải: Thông tin tài khoản và thông tin chi tiết */}
					<Grid item xs={12} sm={8}>
						<Box sx={{ display: 'flex', flexDirection: 'row', gap: 3 }}>
							{/* Nhóm Thông tin tài khoản */}
							<Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
								<Typography variant='h6' color='primary' fontWeight={600}>
									Thông tin tài khoản
								</Typography>

								<Box
									sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}
								>
									<Typography variant='body2'>
										User Name <span style={{ color: 'red' }}>*</span>
									</Typography>
									<Controller
										name='userName'
										control={control}
										render={({ field }) => (
											<TextField
												{...field}
												size='small'
												error={!!errors.userName}
												helperText={errors.userName?.message}
												required
											/>
										)}
									/>
								</Box>

								<Box
									sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}
								>
									<Typography variant='body2'>Email</Typography>
									<Controller
										name='email'
										control={control}
										render={({ field }) => (
											<TextField
												type='email'
												{...field}
												size='small'
												error={!!errors.email}
												helperText={errors.email?.message}
												required
											/>
										)}
									/>
								</Box>

								<Box
									sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}
								>
									<Typography variant='body2'>
										Password <span style={{ color: 'red' }}>*</span>
									</Typography>
									<Controller
										name='password'
										control={control}
										render={({ field }) => (
											<TextField
												type='text'
												{...field}
												size='small'
												error={!!errors.password}
												helperText={errors.password?.message}
												required
											/>
										)}
									/>
								</Box>

								<Box
									sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}
								>
									<Typography variant='body2'>
										Role <span style={{ color: 'red' }}>*</span>
									</Typography>
									<Controller
										name='roleId'
										control={control}
										rules={{
											required: 'Please select a device type',
										}}
										render={({ field }) => (
											<RoleSelect
												id={field?.value}
												onChange={(value) => field.onChange(value?.id)}
											/>
										)}
									/>
									{errors.roleId && (
										<Typography
											variant='caption'
											sx={{ color: '#d32f2f', ml: 1, mt: 0.5 }}
										>
											{errors.roleId.message}
										</Typography>
									)}
								</Box>
							</Box>

							{/* Nhóm Thông tin chi tiết */}
							<Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
								<Typography variant='h6' color='primary' fontWeight={600}>
									Thông tin nhân viên
								</Typography>

								<Box
									sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}
								>
									<Typography variant='body2'>
										Tên nhân viên <span style={{ color: 'red' }}>*</span>
									</Typography>
									<Controller
										name='fullname'
										control={control}
										render={({ field }) => (
											<TextField
												{...field}
												size='small'
												error={!!errors.fullname}
												helperText={errors.fullname?.message}
												required
											/>
										)}
									/>
								</Box>

								<Box
									sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}
								>
									<Typography variant='body2'>Chức vụ</Typography>
									<Controller
										name='position'
										control={control}
										render={({ field }) => (
											<TextField
												{...field}
												size='small'
												error={!!errors.position}
												helperText={errors.position?.message}
											/>
										)}
									/>
								</Box>

								<Box
									sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}
								>
									<Typography variant='body2'>Số điện thoại</Typography>
									<Controller
										name='phoneNumber'
										control={control}
										render={({ field }) => (
											<TextField
												{...field}
												size='small'
												error={!!errors.phoneNumber}
												helperText={errors.phoneNumber?.message}
											/>
										)}
									/>
								</Box>
							</Box>
						</Box>
						<Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
							<Button
								role={undefined}
								variant='contained'
								tabIndex={-1}
								startIcon={<SaveIcon />}
								type='submit'
							>
								Lưu
							</Button>
						</Box>
					</Grid>
				</Grid>
			</form>
		</Paper>
	)
}

export default UserCreateUpdate
