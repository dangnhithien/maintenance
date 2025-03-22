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
	Typography,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { useNotification } from '../../common/Notistack'
import { useNavigate } from 'react-router-dom'
import SaveIcon from '@mui/icons-material/Save'
import ManageSearchIcon from '@mui/icons-material/ManageSearch'
import AssignmentIcon from '@mui/icons-material/Assignment'
import useCustomer from '@modules/maintenance/hooks/useCustomer'
import FrameVMS from '@components/FrameVMS'
import CaseForm from './CaseForm'
import CasePreview from './CasePreview'

const schema = yup.object({
	name: yup.string().required('Vui lòng nhập đầy đủ thông tin'),
	assigneeId: yup.string().required('Vui lòng nhập đầy đủ thông tin'),
	caseTypeId: yup.string().required('Vui lòng nhập đầy đủ thông tin'),
	customerId: yup.string().required('Vui lòng nhập đầy đủ thông tin'),
	deviceId: yup.string().required('Vui lòng nhập đầy đủ thông tin'),
	scheduledTime: yup.string().required('Vui lòng nhập đầy đủ thông tin'),
	address: yup.string().required('Vui lòng nhập đầy đủ thông tin'),
	description: yup.string().max(255, 'Giới hạn 255 ký tự'),
})

interface FormProps {
	id?: string
}

const CaseAction: React.FC<FormProps> = ({ id }) => {
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
	const customerId = watch('customerId')
	const { getCustomerById } = useCustomer()
	const { data: customerData } = getCustomerById(customerId ?? '')
	console.log('createdTicket', createdTicket)

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
			sx={{ width: '100%', margin: 'auto' }}
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
					width: '85%',
				}}
			>
				{activeStep === 0 && (
					<FrameVMS title='Tạo tikcet' icon={<AssignmentIcon />}>
						<CaseForm
							handleNext={handleNext}
							control={control}
							errors={errors}
							updateCreatedTicket={updateCreatedTicket}
							customerId={customerId}
							createdTicket={createdTicket}
						/>
					</FrameVMS>
				)}
				{activeStep === 1 && (
					<CasePreview
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

export default CaseAction

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
