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
import { useNotification } from '../../common/Notistack'
import CustomerSelect from '../../common/select/CustomerSelect'
import { useNavigate } from 'react-router-dom'
import SaveIcon from '@mui/icons-material/Save'
import ManageSearchIcon from '@mui/icons-material/ManageSearch'
import AssignmentIcon from '@mui/icons-material/Assignment'
import useCustomer from '@modules/maintenance/hooks/useCustomer'
import DeviceTypeSelect from '../../common/select/DeviceTypeSelect'
import DeviceGroupSelect from '../../common/select/DeviceGroupSelect'
import DeviceSKUSelect from '../../common/select/DeviceSKUSelect'
import DeviceModelSelect from '../../common/select/DeviceModel'
import UsageTypeSelect from '../../common/select/UsageTypeSelect'
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
import DeviceForm from './DeviceForm'
import DevicePreview from './DevicePreview'

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
					<FrameVMS title='Nhập thông tin thết bị' icon={<AssignmentIcon />}>
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
					<DevicePreview
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
