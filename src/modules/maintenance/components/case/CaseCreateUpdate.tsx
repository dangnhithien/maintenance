import { unwrapError, unwrapObjectReponse } from '@datas/comon/ApiResponse'
import { yupResolver } from '@hookform/resolvers/yup'
import caseApi from '@modules/maintenance/apis/caseApi'
import { ICaseCreate } from '@modules/maintenance/datas/case/ICaseCreate'
import {
	Box,
	Button,
	Grid2,
	Stack,
	Step,
	StepIconProps,
	StepLabel,
	Stepper,
	TextField,
	Typography,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { useNotification } from '../common/Notistack'
import CaseTypeSelect from '../common/select/CaseTypeSelect'
import CustomerSelect from '../common/select/CustomerSelect'
import DeviceSelect from '../common/select/DeviceSelect'
import UserSelect from '../common/select/UserSelect'
import { useNavigate } from 'react-router-dom'
import SaveIcon from '@mui/icons-material/Save'
import ManageSearchIcon from '@mui/icons-material/ManageSearch'
import AssignmentIcon from '@mui/icons-material/Assignment'
import useCustomer from '@modules/maintenance/hooks/useCustomer'

const schema = yup.object({
	name: yup.string().required('Không được bỏ trống'),
	assigneeId: yup.string().required('Không được bỏ trống'),
	caseTypeId: yup.string().required('Không được bỏ trống'),
	customerId: yup.string().required('Không được bỏ trống'),
	deviceId: yup.string().required('Không được bỏ trống'),
	scheduledTime: yup.string().required('Không được bỏ trống'),
	address: yup.string().required('Không được bỏ trống'),
	description: yup.string().max(255, 'Giới hạn 255 ký tự'),
})

interface FormProps {
	id?: string
}

const CaseCreateUpdate: React.FC<FormProps> = ({ id }) => {
	const [activeStep, setActiveStep] = useState(0)
	const [createdTicket, setCreatedTicket] = useState<ICaseCreate | null>(null)
	const [loading, setLoading] = useState(false)
	const { notify } = useNotification()
	const navigate = useNavigate()
	const {
		control,
		handleSubmit,
		reset,
		watch,
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
			address: '',
		},
		resolver: yupResolver(schema),
	})

	useEffect(() => {
		if (id) {
			setLoading(true)
			caseApi
				.getById(id)
				.then(unwrapObjectReponse)
				.then((res) => {
					reset(res as unknown as ICaseCreate)
				})
				.catch((err) => {
					const { message } = unwrapError(err)
					notify(message, 'error')
				})
				.finally(() => setLoading(false))
		}
	}, [id])

	const updateCreatedTicket = (key: keyof ICaseCreate, value: string) => {
		setCreatedTicket((prev) => ({
			...(prev ?? {
				name: '',
				scheduledTime: '',
				customerId: '',
				deviceId: '',
				assigneeId: '',
				caseTypeId: '',
				note: '',
				address: '',
			}),
			[key]: value, // Gán giá trị động
		}))
	}

	const { getCustomerById } = useCustomer()

	const { data: customerData } = getCustomerById(watch('customerId') ?? '')
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

	useEffect(() => {
		if (customerData?.address) {
			reset(
				(prev) => ({
					...prev,
					address: customerData.address || '',
				}),
				{ keepDirtyValues: true },
			)
		}
	}, [customerData, reset])

	const handleNext = handleSubmit(
		() => {
			setActiveStep((prev) => prev + 1)
		},
		(errors) => {
			console.log('Lỗi:', errors) // Nếu có lỗi, không cho chuyển bước
		},
	)

	const handleBack = () => {
		setActiveStep((prev) => prev - 1)
	}

	if (loading) {
		return <Typography>Loading...</Typography>
	}

	return (
		<Stack
			direction={'row'}
			sx={{ width: '100%', mt: 4, margin: 'auto' }}
			justifyContent={'space-between'}
			alignItems={'flex-start'}
			gap={4}
		>
			<Stepper activeStep={activeStep} orientation='vertical'>
				<Step>
					<StepLabel slots={{ stepIcon: StepIcon }}>Nhập thông tin</StepLabel>
				</Step>
				<Step>
					<StepLabel slots={{ stepIcon: StepIcon }}>Xem trước</StepLabel>
				</Step>
			</Stepper>

			<Box
				sx={{
					width: '80%',
					border: '1px solid #E0E0E0',
					borderRadius: 2,
					padding: 2,
				}}
			>
				{activeStep === 0 && (
					<TicketForm
						handleNext={handleNext}
						control={control}
						errors={errors}
						updateCreatedTicket={updateCreatedTicket}
					/>
				)}
				{activeStep === 1 && (
					<PreviewTicket
						ticket={createdTicket}
						control={control}
						handleBack={handleBack}
						handleSubmit={handleSubmit(onSubmit)}
						loading={loading}
					/>
				)}
			</Box>
		</Stack>
	)
}

export default CaseCreateUpdate

const StepIcon = (props: StepIconProps) => {
	const { active, completed, icon } = props
	const icons: { [index: string]: React.ReactElement } = {
		1: <AssignmentIcon />,
		2: <ManageSearchIcon />,
	}

	return (
		<Box
			sx={{
				width: 40, // Độ rộng icon
				height: 40, // Độ cao icon
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				borderRadius: '50%',
				backgroundColor: completed ? '#0ABF06' : active ? '#648CC8' : '#E0E0E0',
				color: 'white',
			}}
		>
			{icons[String(icon)]}
		</Box>
	)
}

interface TicketFormProps {
	control: any
	errors: any
	handleNext: () => void
	updateCreatedTicket: (key: keyof ICaseCreate, value: string) => void
}

const TicketForm: React.FC<TicketFormProps> = ({
	control,
	errors,
	handleNext,
	updateCreatedTicket,
}) => {
	return (
		<Grid2 container spacing={4}>
			<Grid2 size={{ xs: 12 }}>
				<Stack
					direction={'row'}
					alignItems={'center'}
					sx={{ border: '1px solid #E0E0E0', borderRadius: 4, padding: 1.2 }}
					gap={1}
				>
					<Box
						sx={{
							backgroundColor: '#EBF1FA',
							borderRadius: 1,
							padding: 0.7,
							width: 24, // Độ rộng icon
							height: 24, // Độ cao icon
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<AssignmentIcon sx={{ color: '#648CC8', fontSize: 18 }} />
					</Box>{' '}
					<Typography variant='body1' color='primary' fontWeight={600}>
						Tạo Ticket
					</Typography>
				</Stack>
			</Grid2>
			<Grid2 size={{ xs: 6 }}>
				<Controller
					name='name'
					control={control}
					render={({ field }) => (
						<TextField
							label='Tên'
							fullWidth
							size='small'
							error={!!errors.name}
							helperText={errors.name?.message}
							{...field}
						/>
					)}
				/>
			</Grid2>
			<Grid2 size={{ xs: 6 }}>
				<Controller
					name='caseTypeId'
					control={control}
					render={({ field }) => (
						<CaseTypeSelect
							id={field.value}
							onChange={(value) => field.onChange(value?.id)}
							onSelect={(item) =>
								updateCreatedTicket('caseTypeName', item.name)
							}
							error={!!errors.caseTypeId}
						/>
					)}
				/>
				{errors.caseTypeId && (
					<Typography color='error' fontSize={12} margin={'4px 14px 0'}>
						{errors.caseTypeId.message}
					</Typography>
				)}
			</Grid2>
			<Grid2 size={{ xs: 6 }}>
				<Controller
					name='customerId'
					control={control}
					render={({ field }) => (
						<CustomerSelect
							id={field.value}
							onChange={(value) => field.onChange(value?.id)}
							onSelect={(item) => {
								updateCreatedTicket('customerId', item.id)
								updateCreatedTicket('customerName', item.name)
							}}
							error={!!errors.customerId}
						/>
					)}
				/>
				{errors.customerId && (
					<Typography color='error' fontSize={12} margin={'4px 14px 0'}>
						{errors.customerId.message}
					</Typography>
				)}
			</Grid2>
			<Grid2 size={{ xs: 6 }}>
				<Controller
					name='deviceId'
					control={control}
					render={({ field }) => (
						<DeviceSelect
							id={field.value}
							onChange={(value) => field.onChange(value?.id)}
							onSelect={(item) => {
								updateCreatedTicket('deviceName', item.name)
							}}
							error={!!errors.deviceId}
						/>
					)}
				/>
				{errors.deviceId && (
					<Typography color='error' fontSize={12} margin={'4px 14px 0'}>
						{errors.deviceId.message}
					</Typography>
				)}
			</Grid2>
			<Grid2 size={{ xs: 6 }}>
				<Controller
					name='assigneeId'
					control={control}
					render={({ field }) => (
						<UserSelect
							id={field.value}
							onChange={(value) => field.onChange(value?.id)}
							onSelect={(item) => {
								updateCreatedTicket('assigneeName', item.name)
							}}
							error={!!errors.assigneeId}
						/>
					)}
				/>
				{errors.assigneeId && (
					<Typography color='error' fontSize={12} margin={'4px 14px 0'}>
						{errors.assigneeId.message}
					</Typography>
				)}
			</Grid2>
			<Grid2 size={{ xs: 6 }}>
				<Controller
					name='scheduledTime'
					control={control}
					render={({ field }) => (
						<TextField
							type='date'
							fullWidth
							size='small'
							label='Ngày lắp đặt'
							InputLabelProps={{ shrink: true }}
							error={!!errors.scheduledTime}
							helperText={errors.scheduledTime?.message}
							{...field}
						/>
					)}
				/>
			</Grid2>
			<Grid2 size={{ xs: 12 }}>
				<Controller
					name='address'
					control={control}
					render={({ field }) => (
						<TextField
							label='Địa chỉ'
							fullWidth
							size='small'
							error={!!errors.address}
							helperText={errors.address?.message}
							{...field}
						/>
					)}
				/>
			</Grid2>
			<Grid2 size={{ xs: 12 }}>
				<Controller
					name='note'
					control={control}
					render={({ field }) => (
						<TextField
							label='Ghi chú'
							multiline
							rows={4}
							fullWidth
							{...field}
						/>
					)}
				/>
			</Grid2>
			<Grid2 container justifyContent={'flex-end'} width={'100%'}>
				<Button variant='contained' onClick={handleNext} sx={{ width: 'auto' }}>
					Tiếp tục
				</Button>
			</Grid2>
		</Grid2>
	)
}

const PreviewTicket = ({
	loading,
	ticket,
	control,
	handleBack,
	handleSubmit,
}: any) => {
	return (
		<Box>
			<Grid2 container spacing={4}>
				<Grid2 size={{ xs: 12 }}>
					<Stack
						direction={'row'}
						alignItems={'center'}
						sx={{ border: '1px solid #E0E0E0', borderRadius: 4, padding: 1.2 }}
						gap={1}
					>
						<Box
							sx={{
								backgroundColor: '#EBF1FA',
								borderRadius: 1,
								padding: 0.7,
								width: 24, // Độ rộng icon
								height: 24, // Độ cao icon
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
							}}
						>
							<ManageSearchIcon sx={{ color: '#648CC8', fontSize: 18 }} />
						</Box>{' '}
						<Typography variant='body1' color='primary' fontWeight={600}>
							Chi tiết
						</Typography>
					</Stack>
				</Grid2>
				<Grid2 size={{ xs: 6 }}>
					<Controller
						name='name'
						control={control}
						render={({ field }) => (
							<>
								<Typography variant='body1' color='primary' fontWeight={600}>
									Tên Ticket
								</Typography>
								<Typography variant='body2'>{field.value || '-'}</Typography>
							</>
						)}
					/>
				</Grid2>
				<Grid2 size={{ xs: 6 }}>
					<Typography variant='body1' color='primary' fontWeight={600}>
						Thiết bị
					</Typography>
					<Typography variant='body2'>{ticket?.deviceName || '-'}</Typography>
				</Grid2>
				<Grid2 size={{ xs: 6 }}>
					<Typography variant='body1' color='primary' fontWeight={600}>
						Loại Ticket
					</Typography>
					<Typography variant='body2'>{ticket?.caseTypeName || '-'}</Typography>
				</Grid2>
				<Grid2 size={{ xs: 6 }}>
					<Controller
						name='address'
						control={control}
						render={({ field }) => (
							<>
								<Typography variant='body1' color='primary' fontWeight={600}>
									Địa chỉ
								</Typography>
								<Typography variant='body2'>{field.value || '-'}</Typography>
							</>
						)}
					/>
				</Grid2>
				<Grid2 size={{ xs: 6 }}>
					<Typography variant='body1' color='primary' fontWeight={600}>
						Tên khách hàng
					</Typography>
					<Typography variant='body2'>{ticket?.customerName || '-'}</Typography>
				</Grid2>
				<Grid2 size={{ xs: 6 }}>
					<Typography variant='body1' color='primary' fontWeight={600}>
						Người phụ trách
					</Typography>
					<Typography variant='body2'>{ticket?.assigneeName || '-'}</Typography>
				</Grid2>
				<Grid2 size={{ xs: 6 }}>
					<Controller
						name='scheduledTime'
						control={control}
						render={({ field }) => (
							<>
								<Typography variant='body1' color='primary' fontWeight={600}>
									Ngày lắp đặt
								</Typography>
								<Typography variant='body2'>{field.value || '-'}</Typography>
							</>
						)}
					/>
				</Grid2>
				<Grid2 size={{ xs: 6 }}>
					<Controller
						name='note'
						control={control}
						render={({ field }) => (
							<>
								<Typography variant='body1' color='primary' fontWeight={600}>
									Ghi chú
								</Typography>
								<Typography variant='body2'>{field.value || '-'}</Typography>
							</>
						)}
					/>
				</Grid2>
				<Grid2 container justifyContent={'flex-end'} width={'100%'}>
					<Stack direction={'row'} gap={1}>
						<Button onClick={handleBack}>Quay lại</Button>
						<Button
							role={undefined}
							variant='contained'
							tabIndex={-1}
							startIcon={<SaveIcon />}
							loading={loading}
							type='submit'
							onClick={handleSubmit}
						>
							Lưu
						</Button>
					</Stack>
				</Grid2>
			</Grid2>
		</Box>
	)
}
