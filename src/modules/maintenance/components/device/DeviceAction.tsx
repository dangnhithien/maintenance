import { yupResolver } from '@hookform/resolvers/yup'
import {
	Box,
	Button,
	Grid2,
	IconButton,
	Paper,
	Stack,
	Step,
	StepIconProps,
	StepLabel,
	Stepper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
	Typography,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { useNotification } from '../common/Notistack'
import CustomerSelect from '../common/select/CustomerSelect'
import { useNavigate } from 'react-router-dom'
import SaveIcon from '@mui/icons-material/Save'
import ManageSearchIcon from '@mui/icons-material/ManageSearch'
import AssignmentIcon from '@mui/icons-material/Assignment'
import useCustomer from '@modules/maintenance/hooks/useCustomer'
import DeviceTypeSelect from '../common/select/DeviceTypeSelect'
import DeviceGroupSelect from '../common/select/DeviceGroupSelect'
import DeviceSKUSelect from '../common/select/DeviceSKUSelect'
import DeviceModelSelect from '../common/select/DeviceModel'
import UsageTypeSelect from '../common/select/UsageTypeSelect'
import { IDeviceCreate } from '@modules/maintenance/datas/device/IDeviceCreate'
import deviceApi from '@modules/maintenance/apis/deviceApi'
import { DatePicker } from '@mui/x-date-pickers'
import FrameVMS from '@components/FrameVMS'
import SpinnerLoading from '@components/SpinerLoading'
import DeviceGroupItemsModal from './DeviceGroupItemsModal'
import { Settings } from '@mui/icons-material'
import attributeDeviceValueApi from '@modules/maintenance/apis/attributeDeviceValueApi'
import {
	IAttributeDeviceValue,
	IAttributeDeviceValueCreate,
} from '@modules/maintenance/datas/attributeDeviceValue/IAttributeDeviceValueCreate'
import { de } from 'date-fns/locale'
import { unwrapError } from '@datas/comon/ApiResponse'

const schema = yup.object({
	name: yup.string().required('Vui lòng nhập đầy đủ thông tin'),
	serialNumber: yup.string().required('Vui lòng nhập đầy đủ thông tin'),
	note: yup.string().max(255, 'Giới hạn 255 ký tự'),
	deviceTypeId: yup.string().required('Vui lòng nhập đầy đủ thông tin'),
	deviceGroupId: yup.string().required('Vui lòng nhập đầy đủ thông tin'),
	deviceSKUId: yup.string().required('Vui lòng nhập đầy đủ thông tin'),
	deviceModelId: yup.string().required('Vui lòng nhập đầy đủ thông tin'),
	customerId: yup.string().required('Vui lòng nhập đầy đủ thông tin'),
	address: yup.string().required('Vui lòng nhập đầy đủ thông tin'),
	usageTypeId: yup.string().required('Vui lòng nhập đầy đủ thông tin'),
	rfid: yup.string().required('Vui lòng nhập đầy đủ thông tin'),
	installationDate: yup.date().required('Vui lòng nhập đầy đủ thông tin'),
})

interface FormProps {
	id?: string
}

const DeviceAction: React.FC<FormProps> = ({ id }) => {
	const [activeStep, setActiveStep] = useState(0)
	const [createdDevice, setCreatedDevice] = useState<IDeviceCreate | null>(null)
	const [selectedGroupItems, setSelectedGroupItems] = useState<
		IAttributeDeviceValue[]
	>([])
	const [loading, setLoading] = useState(false)
	const { notify } = useNotification()
	const navigate = useNavigate()
	const {
		control,
		handleSubmit,
		reset,
		watch,
		formState: { errors },
	} = useForm<IDeviceCreate>({
		defaultValues: {
			serialNumber: '',
			name: '',
			deviceTypeId: '',
			deviceGroupId: '',
			deviceSKUId: '',
			deviceModelId: '',
			rfid: '',
			installationDate: new Date(),
			note: '',
			address: '',
			usageTypeId: '',
			customerId: '',
			supplier: '',
			image: '',
		},
		resolver: yupResolver(schema),
	})
	const deviceTypeId = watch('deviceTypeId')
	const deviceGroupId = watch('deviceGroupId')
	const deviceSKUId = watch('deviceSKUId')
	const customerId = watch('customerId')
	const { getCustomerById } = useCustomer()
	const { data: customerData } = getCustomerById(customerId ?? '')

	// useEffect(() => {
	// 	if (id) {
	// 		setLoading(true)
	// 		caseApi
	// 			.getById(id)
	// 			.then(unwrapObjectReponse)
	// 			.then((res) => {
	// 				reset(res as unknown as ICaseCreate)
	// 			})
	// 			.catch((err) => {
	// 				const { message } = unwrapError(err)
	// 				notify(message, 'error')
	// 			})
	// 			.finally(() => setLoading(false))
	// 	}
	// }, [id])

	const updateCreatedDevice = (key: keyof IDeviceCreate, value: string) => {
		setCreatedDevice((prev) => ({
			...(prev ?? {
				serialNumber: '',
				note: '',
				name: '',
				deviceTypeId: '',
				deviceGroupId: '',
				deviceSKUId: '',
				deviceModelId: '',
				rfid: '',
				installationDate: new Date(),
				address: '',
				usageTypeId: '',
				customerId: '',
				supplier: '',
			}),
			[key]: value, // Gán giá trị động
		}))
	}

	const onSubmit = async (data: IDeviceCreate) => {
		setLoading(true)
		try {
			let deviceId: string

			if (id) {
				// Update thiết bị đã có
				const res = await deviceApi.update(id, data)
				deviceId = id
				notify(res.message, 'success')
			} else {
				// Tạo thiết bị mới
				const res = await deviceApi.post(data)
				deviceId = res.result.id
				if (res.statusCode === 200) {
					notify('Tạo mới thành công', 'success')
					if (selectedGroupItems && selectedGroupItems.length > 0) {
						const attributeDeviceValueCommands = selectedGroupItems.map(
							(item) => ({
								deviceId: deviceId, // ID thiết bị cần gắn
								// attributeDeviceGroupId: item.deviceGroupId,
								attributeName: item.attributeName,
								value: item.value || '-',
							}),
						)

						// Gọi API POST để lưu attribute device values
						await attributeDeviceValueApi.post({ attributeDeviceValueCommands })
					}
					navigate('/devices')
				}
			}
		} catch (err) {
			console.log(err)
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
		return <SpinnerLoading />
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
					p: 2,
				}}
			>
				{activeStep === 0 && (
					<FrameVMS title='Nhập thống tin thết bị' icon={<AssignmentIcon />}>
						<DeviceForm
							handleNext={handleNext}
							control={control}
							errors={errors}
							updateCreatedDevice={updateCreatedDevice}
							customerId={customerId}
							createdDevice={createdDevice}
							setSelectedGroupItems={setSelectedGroupItems}
							deviceTypeId={deviceTypeId}
							deviceGroupId={deviceGroupId}
							deviceSKUId={deviceSKUId}
						/>
					</FrameVMS>
				)}
				{activeStep === 1 && (
					<PreviewDevice
						device={createdDevice}
						control={control}
						handleBack={handleBack}
						handleSubmit={handleSubmit(onSubmit)}
						loading={loading}
						selectedGroupItems={selectedGroupItems}
					/>
				)}
			</Box>
		</Stack>
	)
}

export default DeviceAction

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

interface DeviceFormProps {
	control: any
	errors: any
	handleNext: () => void
	updateCreatedDevice: (key: keyof IDeviceCreate, value: string) => void
	customerId: string | undefined
	createdDevice: IDeviceCreate | null
	setSelectedGroupItems: (items: IAttributeDeviceValue[]) => void
	deviceTypeId: string | undefined
	deviceGroupId: string | undefined
	deviceSKUId: string | undefined
}

const DeviceForm: React.FC<DeviceFormProps> = ({
	control,
	errors,
	handleNext,
	updateCreatedDevice,
	setSelectedGroupItems,
	deviceTypeId,
	deviceGroupId,
	deviceSKUId,
}) => {
	const [modalOpen, setModalOpen] = useState(false)

	return (
		<Grid2 container spacing={4}>
			<Grid2 size={{ xs: 6 }}>
				<Controller
					name='serialNumber'
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							label='Seri'
							fullWidth
							size='small'
							error={!!errors.serialNumber}
							helperText={errors.serialNumber?.message}
						/>
					)}
				/>
			</Grid2>
			<Grid2 size={{ xs: 6 }}>
				<Controller
					name='name'
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							label='Tên thiết bị'
							fullWidth
							size='small'
							error={!!errors.name}
							helperText={errors.name?.message}
						/>
					)}
				/>
			</Grid2>
			<Grid2 size={{ xs: 6 }}>
				<Controller
					name='rfid'
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							label='RFID'
							fullWidth
							size='small'
							error={!!errors.rfid}
							helperText={errors.rfid?.message}
						/>
					)}
				/>
			</Grid2>
			<Grid2 size={{ xs: 6 }}>
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
							onSelect={(value) =>
								updateCreatedDevice('usageTypeId', value?.name)
							}
							error={!!errors.usageTypeId}
						/>
					)}
				/>
				{errors.usageTypeId && (
					<Typography color='error' fontSize={12} margin={'4px 14px 0'}>
						{errors.usageTypeId.message}
					</Typography>
				)}
			</Grid2>
			<Grid2 size={{ xs: 6 }}>
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
							onSelect={(value) =>
								updateCreatedDevice('deviceTypeId', value?.name)
							}
							error={!!errors.deviceTypeId}
						/>
					)}
				/>
				{errors.deviceTypeId && (
					<Typography color='error' fontSize={12} margin={'4px 14px 0'}>
						{errors.deviceTypeId.message}
					</Typography>
				)}
			</Grid2>
			<Grid2 size={{ xs: 6 }}>
				<Stack direction={'row'} alignItems={'center'} gap={1}>
					<Box sx={{ width: '100%' }}>
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
									onSelect={(value) =>
										updateCreatedDevice('deviceGroupId', value?.name)
									}
									error={!!errors.deviceGroupId}
									disabled={!deviceTypeId} // Vô hiệu hóa nếu chưa chọn loại thiết bị
								/>
							)}
						/>
						{errors.deviceGroupId && (
							<Typography color='error' fontSize={12} margin={'4px 14px 0'}>
								{errors.deviceGroupId.message}
							</Typography>
						)}
					</Box>
					<IconButton
						aria-label='config'
						onClick={() => setModalOpen(true)}
						disabled={!control._formValues.deviceGroupId}
						color='primary'
					>
						<Settings />
					</IconButton>
				</Stack>
			</Grid2>
			<Grid2 size={{ xs: 6 }}>
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
							onSelect={(value) =>
								updateCreatedDevice('deviceSKUId', value?.name)
							}
							error={!!errors.deviceSKUId}
						/>
					)}
				/>
				{errors.deviceSKUId && (
					<Typography color='error' fontSize={12} margin={'4px 14px 0'}>
						{errors.deviceSKUId.message}
					</Typography>
				)}
			</Grid2>
			<Grid2 size={{ xs: 6 }}>
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
							onSelect={(value) =>
								updateCreatedDevice('deviceModelId', value?.name)
							}
							error={!!errors.deviceModelId}
						/>
					)}
				/>
				{errors.deviceModelId && (
					<Typography color='error' fontSize={12} margin={'4px 14px 0'}>
						{errors.deviceModelId.message}
					</Typography>
				)}
			</Grid2>
			<Grid2 size={{ xs: 6 }}>
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
							onSelect={(value) =>
								updateCreatedDevice('customerId', value?.name)
							}
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
					name='address'
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							label='Địa chỉ'
							fullWidth
							size='small'
							error={!!errors.rfid}
							helperText={errors.rfid?.message}
						/>
					)}
				/>
			</Grid2>
			<Grid2 size={{ xs: 6 }}>
				<Controller
					name='installationDate'
					control={control}
					render={({ field, fieldState: { error } }) => (
						<DatePicker
							label='Ngày cài đặt'
							format='dd/MM/yyyy' // Định dạng hiển thị
							value={field.value}
							onChange={(newValue) => field.onChange(newValue)}
							slotProps={{
								textField: {
									fullWidth: true,
									size: 'small',
									error: !!error,
									helperText: error ? error.message : null,
								},
							}}
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
			<DeviceGroupItemsModal
				open={modalOpen}
				onClose={() => setModalOpen(false)}
				deviceGroupId={control._formValues.deviceGroupId}
				onSelectionChange={(selectedIds) => {
					setSelectedGroupItems(
						selectedIds.map((id) => ({
							id: id.id,
							deviceId: '',
							attributeName: id.attributeName,
							value: id.value,
						})),
					)
				}}
			/>
		</Grid2>
	)
}

const PreviewDevice = ({
	device,
	loading,
	control,
	handleBack,
	handleSubmit,
	selectedGroupItems,
}: {
	device: IDeviceCreate | null
	loading: boolean
	control: any
	handleBack: () => void
	handleSubmit: () => void
	selectedGroupItems: IAttributeDeviceValue[]
}) => {
	return (
		<Box>
			<Grid2 container spacing={4}>
				<Grid2 size={{ xs: 12 }}>
					<Stack
						direction={'row'}
						alignItems={'center'}
						sx={{
							border: '1px solid #E0E0E0',
							borderRadius: 4,
							padding: 1.2,
						}}
						gap={1}
					>
						<Box
							sx={{
								backgroundColor: '#EBF1FA',
								borderRadius: 1,
								padding: 0.7,
								width: 24,
								height: 24,
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
							}}
						>
							<ManageSearchIcon sx={{ color: '#648CC8', fontSize: 18 }} />
						</Box>
						<Typography variant='body1' color='primary' fontWeight={600}>
							Chi tiết thiết bị
						</Typography>
					</Stack>
				</Grid2>
				<Grid2 size={{ xs: 4 }}>
					<Controller
						name='name'
						control={control}
						render={({ field }) => (
							<>
								<Typography variant='body1' color='primary' fontWeight={600}>
									Tên thiết bị
								</Typography>
								<Typography variant='body2'>{field.value || '-'}</Typography>
							</>
						)}
					/>
				</Grid2>
				<Grid2 size={{ xs: 4 }}>
					<Controller
						name='serialNumber'
						control={control}
						render={({ field }) => (
							<>
								<Typography variant='body1' color='primary' fontWeight={600}>
									Seri
								</Typography>
								<Typography variant='body2'>{field.value || '-'}</Typography>
							</>
						)}
					/>
				</Grid2>
				<Grid2 size={{ xs: 4 }}>
					<Controller
						name='rfid'
						control={control}
						render={({ field }) => (
							<>
								<Typography variant='body1' color='primary' fontWeight={600}>
									RFID
								</Typography>
								<Typography variant='body2'>{field.value || '-'}</Typography>
							</>
						)}
					/>
				</Grid2>
				<Grid2 size={{ xs: 4 }}>
					<Typography variant='body1' color='primary' fontWeight={600}>
						Hình thức sử dụng
					</Typography>
					<Typography variant='body2'>{device?.usageTypeId || '-'}</Typography>
				</Grid2>

				{/* Loại thiết bị */}
				<Grid2 size={{ xs: 4 }}>
					<Typography variant='body1' color='primary' fontWeight={600}>
						Loại thiết bị
					</Typography>
					<Typography variant='body2'>{device?.deviceTypeId || '-'}</Typography>
				</Grid2>
				<Grid2 size={{ xs: 4 }}>
					<Typography variant='body1' color='primary' fontWeight={600}>
						Nhóm thiết bị
					</Typography>
					<Typography variant='body2'>
						{device?.deviceGroupId || '-'}
					</Typography>
				</Grid2>
				<Grid2 size={{ xs: 4 }}>
					<Typography variant='body1' color='primary' fontWeight={600}>
						SKU thiết bị
					</Typography>
					<Typography variant='body2'>{device?.deviceSKUId || '-'}</Typography>
				</Grid2>
				<Grid2 size={{ xs: 4 }}>
					<Typography variant='body1' color='primary' fontWeight={600}>
						Model thiết bị
					</Typography>
					<Typography variant='body2'>
						{device?.deviceModelId || '-'}
					</Typography>
				</Grid2>
				<Grid2 size={{ xs: 4 }}>
					<Typography variant='body1' color='primary' fontWeight={600}>
						Khách hàng
					</Typography>
					<Typography variant='body2'>{device?.customerId || '-'}</Typography>
				</Grid2>
				<Grid2 size={{ xs: 4 }}>
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
				<Grid2 size={{ xs: 4 }}>
					<Controller
						name='installationDate'
						control={control}
						render={({ field }) => (
							<>
								<Typography variant='body1' color='primary' fontWeight={600}>
									Ngày cài đặt
								</Typography>
								<Typography variant='body2'>
									{field.value
										? new Date(field.value).toLocaleDateString()
										: '-'}
								</Typography>
							</>
						)}
					/>
				</Grid2>
				<Grid2 size={{ xs: 4 }}>
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
				<Grid2 size={{ xs: 8 }}>
					<Typography variant='body1' color='primary' fontWeight={600}>
						Thông số thiết bị được chọn
					</Typography>

					{selectedGroupItems.length > 0 ? (
						<TableContainer
							component={Paper}
							sx={{ mt: 1, maxHeight: 300, overflow: 'auto' }}
						>
							<Table stickyHeader>
								<TableHead>
									<TableRow>
										<TableCell
											sx={{
												fontWeight: 'bold',
												backgroundColor: '#648CC8',
												color: 'white',
											}}
										>
											STT
										</TableCell>
										<TableCell
											sx={{
												fontWeight: 'bold',
												backgroundColor: '#648CC8',
												color: 'white',
											}}
										>
											Thông số
										</TableCell>
										<TableCell
											sx={{
												fontWeight: 'bold',
												backgroundColor: '#648CC8',
												color: 'white',
											}}
										>
											Giá trị
										</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{selectedGroupItems.map((item, index) => (
										<TableRow key={item.id}>
											<TableCell>{index + 1}</TableCell>
											<TableCell>{item.attributeName}</TableCell>
											<TableCell>{item.value || '-'}</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					) : (
						<Typography variant='body2' sx={{ pl: 1, mt: 1 }}>
							Không có thông số nào được chọn
						</Typography>
					)}
				</Grid2>

				<Grid2 container justifyContent={'flex-end'} width={'100%'}>
					<Stack direction={'row'} gap={1}>
						<Button onClick={handleBack}>Quay lại</Button>
						<Button
							variant='contained'
							type='submit'
							onClick={handleSubmit}
							startIcon={<SaveIcon />}
							loading={loading}
						>
							Lưu
						</Button>
					</Stack>
				</Grid2>
			</Grid2>
		</Box>
	)
}
