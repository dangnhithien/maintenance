import { yupResolver } from '@hookform/resolvers/yup'
import { useNotification } from '@modules/maintenance/components/common/Notistack'
import {
	Box,
	Button,
	Grid2,
	IconButton,
	InputAdornment,
	Paper,
	TextField,
	Typography,
} from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { LoginDto } from '../datas/LoginDto'
import useAuth from '../hooks/useAuth'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const schema = yup.object().shape({
	userName: yup.string().required('Tên đăng nhập là bắt buộc'),
	password: yup.string().required('Mật khẩu là bắt buộc'),
})

const Login = () => {
	const { notify } = useNotification()
	const [showPassword, setShowPassword] = useState(false)
	const { login, loading } = useAuth()
	const navigate = useNavigate()
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginDto>({
		defaultValues: {
			userName: '',
			password: '',
		},
		resolver: yupResolver(schema),
	})

	const onSubmit = (data: any) => {
		login(data, {
			onSuccess: (data) => {
				notify('success', 'success')
				navigate('/')
			},
		}).catch((error) => {
			notify(error.response.data.message, 'error')
		})
	}

	return (
		<Box
			sx={{
				backgroundColor: '#10428e',
				height: '100vh',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<Paper
				sx={{
					p: 3,
					maxWidth: '444px',
					borderRadius: '30px',
					padding: '70px',
					px: 3,
					position: 'relative',
					zIndex: '1',
				}}
			>
				<Grid2
					container
					direction={'column'}
					justifyContent={'center'}
					alignItems={'center'}
					spacing={2}
				>
					<Grid2 container p={'20px'} justifyContent={'center'}>
						<img
							src='http://report.vmsco.com.vn/assets/logo-vms-Byn70t6I.webp'
							alt='Linx Logo'
							width={300}
							height={100}
							style={{ objectFit: 'cover' }}
						/>
					</Grid2>

					<form onSubmit={handleSubmit(onSubmit)}>
						<Grid2 container direction={'row'} spacing={2}>
							<Grid2 size={12} container spacing={1}>
								<Typography variant='body1'>Tên đăng nhập</Typography>
								<Controller
									name='userName'
									control={control}
									render={({ field }) => (
										<TextField
											{...field}
											fullWidth
											size='small'
											error={!!errors.userName}
											helperText={errors.userName?.message}
										/>
									)}
								/>
							</Grid2>
							<Grid2 size={12} container spacing={1}>
								<Typography variant='body1'>Mật khẩu</Typography>
								<Controller
									name='password'
									control={control}
									render={({ field }) => (
										<TextField
											{...field}
											fullWidth
											type={showPassword ? 'text' : 'password'}
											size='small'
											error={!!errors.password}
											helperText={errors.password?.message}
											InputProps={{
												endAdornment: (
													<InputAdornment position='end'>
														<IconButton
															onClick={() => setShowPassword(!showPassword)}
															edge='end'
														>
															{showPassword ? (
																<VisibilityOff />
															) : (
																<Visibility />
															)}
														</IconButton>
													</InputAdornment>
												),
											}}
										/>
									)}
								/>
							</Grid2>
							<Grid2 size={12} container>
								<Button
									type='submit'
									variant='contained'
									color='primary'
									fullWidth
									disabled={loading}
									loading={loading}
								>
									Đăng nhập
								</Button>
							</Grid2>

							{/* <Grid2 size={12}>
								<Link
									variant='body2'
									component={RouterLink}
									to='/reset-password-with-email'
								>
									Quên mật khẩu
								</Link>
							</Grid2> */}
						</Grid2>
					</form>
				</Grid2>
			</Paper>

			<img
				src='https://varoki.vmspmsdev.vn/src/assets/images/login.svg'
				alt='Login Image'
				width={800}
				style={{
					objectFit: 'cover',
					marginLeft: '-100px',
					position: 'relative',
					zIndex: 0,
					marginTop: 10,
				}}
			/>
		</Box>
	)
}

export default Login
