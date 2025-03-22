import { yupResolver } from '@hookform/resolvers/yup'
import {
	Box,
	Stack,
	Step,
	StepIconProps,
	StepLabel,
	Stepper,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { useNotification } from '../../common/Notistack'
import { useNavigate } from 'react-router-dom'
import ManageSearchIcon from '@mui/icons-material/ManageSearch'
import AssignmentIcon from '@mui/icons-material/Assignment'
import useCustomer from '@modules/maintenance/hooks/useCustomer'
import { IDeviceCreate } from '@modules/maintenance/datas/device/IDeviceCreate'
import deviceApi from '@modules/maintenance/apis/deviceApi'
import FrameVMS from '@components/FrameVMS'
import SpinnerLoading from '@components/SpinerLoading'
import attributeDeviceValueApi from '@modules/maintenance/apis/attributeDeviceValueApi'
import { IAttributeDeviceValue } from '@modules/maintenance/datas/attributeDeviceValue/IAttributeDeviceValueCreate'
import { unwrapError } from '@datas/comon/ApiResponse'
import DeviceForm from './DeviceForm'
import DevicePreview from './DevicePreview'
import { IPartDetailCreate } from '@modules/maintenance/datas/partDetail/IPartDetailCreate'
import partDetailApi from '@modules/maintenance/apis/partDetailApi'

const defaultDevice: IDeviceCreate = {
	serialNumber: '',
	name: '',
	note: '',
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
	image: '',
}

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
	const [partDetailList, setPartDetailList] = useState<IPartDetailCreate[]>([])
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
		defaultValues: defaultDevice,
		resolver: yupResolver(schema),
	})

	const deviceTypeId = watch('deviceTypeId')
	const deviceGroupId = watch('deviceGroupId')
	const deviceSKUId = watch('deviceSKUId')
	const customerId = watch('customerId')
	const { getCustomerById } = useCustomer()
	const { data: customerData } = getCustomerById(customerId ?? '')

	useEffect(() => {
		if (customerData?.address) {
			reset((prev) => ({ ...prev, address: customerData.address || '' }), {
				keepDirtyValues: true,
			})
		}
	}, [customerData, reset])

	const updateCreatedDevice = (key: keyof IDeviceCreate, value: string) => {
		setCreatedDevice((prev) => ({ ...(prev ?? defaultDevice), [key]: value }))
	}

	const postRelatedData = async (deviceId: string) => {
		if (selectedGroupItems.length > 0) {
			const attributeDeviceValueCommands = selectedGroupItems.map((item) => ({
				deviceId,
				attributeName: item.attributeName,
				value: item.value || '-',
			}))
			await attributeDeviceValueApi.post({ attributeDeviceValueCommands })
		}

		if (partDetailList.length > 0) {
			const partDetailCommands = partDetailList.map((item) => ({
				deviceId,
				serialNumber: item.serialNumber,
				name: item.name,
				description: item.description,
				partCategoryId: item.partCategoryId,
				partTypeId: item.partTypeId,
				partGroupId: item.partGroupId,
				partSKUId: item.partSKUId,
				usageTypeId: item.usageTypeId,
			}))
			await partDetailApi.postCommands({ partDetailCommands })
		}
	}

	console.log('partDetailList', partDetailList)

	const onSubmit = async (data: IDeviceCreate) => {
		setLoading(true)
		try {
			let deviceId: string

			if (id) {
				const res = await deviceApi.update(id, data)
				deviceId = id
				notify(res.message, 'success')
			} else {
				const res = await deviceApi.post(data)
				deviceId = res.result.id
				if (res.statusCode === 200) {
					notify('Tạo mới thành công', 'success')
				}
			}

			await postRelatedData(deviceId)
			navigate('/devices')
		} catch (err) {
			console.log(err)
			const { message } = unwrapError(err)
			notify(message, 'error')
		} finally {
			setLoading(false)
		}
	}

	const handleNext = handleSubmit(
		() => setActiveStep((prev) => prev + 1),
		(errors) => console.log('Lỗi:', errors),
	)

	const handleBack = () => setActiveStep((prev) => prev - 1)

	if (loading) return <SpinnerLoading />

	return (
		<Stack
			direction='row'
			sx={{ width: '100%', margin: 'auto' }}
			justifyContent='space-between'
			alignItems='flex-start'
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
			<Box sx={{ width: '85%' }}>
				{activeStep === 0 && (
					<FrameVMS title='Tạo thiết bị' icon={<AssignmentIcon />}>
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
							partDetailList={partDetailList}
							setPartDetailList={setPartDetailList}
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
						partDetailList={partDetailList}
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
				width: 40,
				height: 40,
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
