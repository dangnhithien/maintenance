import FrameVMS from '@components/FrameVMS'
import { yupResolver } from '@hookform/resolvers/yup'
import TaskCheckTypeSelect from '@modules/maintenance/components/common/select/TaskCheckTypeSelect'
import TemplateSelect from '@modules/maintenance/components/common/select/TemplateSelect'
import UserSelect from '@modules/maintenance/components/common/select/UserSelect'
import Wrapper from '@modules/maintenance/components/common/Wrapper'
import type { TaskCheckCreateDTO } from '@modules/maintenance/datas/taskCheck/TaskCheckCreateDTO'
import { ManageAccounts } from '@mui/icons-material'
import { Button, Grid2, Stack, TextField, Typography } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import SaveIcon from '@mui/icons-material/Save'
import { useNavigate, useParams } from 'react-router-dom'
import { useNotification } from '@modules/maintenance/components/common/Notistack'
import { useState } from 'react'
import { unwrapError } from '@datas/comon/ApiResponse'
import { CreateTaskCheckDto } from '@modules/maintenance/datas/taskCheck/CreateTaskCheckDto'
import useTaskCheck from '@modules/maintenance/hooks/useTaskCheck'
import DeviceSelect from '@modules/maintenance/components/common/select/DeviceSelect'

const schema = yup.object({
	name: yup.string().required('Không được bỏ trống'),
	assigneeId: yup.string().required('Không được bỏ trống'),
	templateCheckId: yup.string().required('Không được bỏ trống'),
	taskCheckTypeId: yup.string().required('Không được bỏ trống'),
	scheduledTime: yup.string().required('Không được bỏ trống'),
	deviceId: yup.string().required('Không được bỏ trống'),
	caseTaskId: yup.string().required('Không được bỏ trống'),
})
const TaskCheckCreatePage = () => {
	const { id } = useParams()
	const navigate = useNavigate()
	const [loading, setLoading] = useState(false)
	const { notify } = useNotification()
	const { createTaskCheck } = useTaskCheck()
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<TaskCheckCreateDTO>({
		defaultValues: {
			name: '',
			assigneeId: '',
			templateCheckId: '',
			taskCheckTypeId: '',
			scheduledTime: '',
			deviceId: '',
			caseTaskId: id,
		},
		resolver: yupResolver(schema),
	})

	const onSubmit = async (data: CreateTaskCheckDto) => {
		setLoading(true)
		try {
			const res = await createTaskCheck(data)

			if (res.statusCode === 200) {
				notify('Tạo task mới thành công', 'success')
				navigate(`/cases/detail/${id}`)
			}
		} catch (err) {
			const { message } = unwrapError(err)
			notify(message, 'error')
		} finally {
			setLoading(false)
		}
	}

	return (
		<Wrapper>
			<FrameVMS title='Tạo mới task' icon={<ManageAccounts />}>
				<Grid2 container spacing={2}>
					<Grid2 size={{ xs: 4 }}>
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
					<Grid2 size={{ xs: 4 }}>
						<Controller
							name='templateCheckId'
							control={control}
							render={({ field }) => (
								<TemplateSelect
									id={field?.value}
									onChange={(value) => field.onChange(value?.id)}
									error={!!errors.templateCheckId}
								/>
							)}
						/>
						<Typography color='error' fontSize={12} margin={'4px 14px 0'}>
							{errors.templateCheckId?.message}
						</Typography>
					</Grid2>
					<Grid2 size={{ xs: 4 }}>
						<Controller
							name='taskCheckTypeId'
							control={control}
							render={({ field }) => (
								<TaskCheckTypeSelect
									id={field?.value}
									onChange={(value) => field.onChange(value?.id)}
									error={!!errors.taskCheckTypeId}
								/>
							)}
						/>
						<Typography color='error' fontSize={12} margin={'4px 14px 0'}>
							{errors.taskCheckTypeId?.message}
						</Typography>
					</Grid2>
					<Grid2 size={{ xs: 4 }}>
						<Controller
							name='scheduledTime'
							control={control}
							render={({ field }) => (
								<TextField
									type='date'
									fullWidth
									size='small'
									label='Ngày bắt đầu'
									InputLabelProps={{ shrink: true }}
									error={!!errors.scheduledTime}
									helperText={errors.scheduledTime?.message}
									{...field}
								/>
							)}
						/>
					</Grid2>
					<Grid2 size={{ xs: 4 }}>
						<Controller
							name='deviceId'
							control={control}
							render={({ field }) => (
								<DeviceSelect
									id={field?.value}
									onChange={(value) => field.onChange(value?.id)}
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
					<Grid2 size={{ xs: 4 }}>
						<Controller
							name='assigneeId'
							control={control}
							render={({ field }) => (
								<UserSelect
									id={field?.value}
									onChange={(value) => field.onChange(value?.id)}
									error={!!errors.assigneeId}
								/>
							)}
						/>
						<Typography color='error' fontSize={12} margin={'4px 14px 0'}>
							{errors.assigneeId?.message}
						</Typography>
					</Grid2>
					<Grid2 size={{ xs: 12 }}>
						<Controller
							name='note'
							control={control}
							render={({ field }) => (
								<TextField
									label='Ghi chú'
									fullWidth
									multiline
									rows={3}
									size='small'
									error={!!errors.note}
									helperText={errors.note?.message}
									{...field}
								/>
							)}
						/>
					</Grid2>
				</Grid2>
				<Grid2 container justifyContent={'flex-end'} mt={2}>
					<Stack direction={'row'} gap={1}>
						<Button onClick={() => navigate(`/cases/detail/${id}`)}>
							Quay lại
						</Button>
						<Button
							role={undefined}
							variant='contained'
							tabIndex={-1}
							startIcon={<SaveIcon />}
							loading={loading}
							type='submit'
							onClick={handleSubmit(onSubmit)}
						>
							Lưu
						</Button>
					</Stack>
				</Grid2>
			</FrameVMS>
		</Wrapper>
	)
}

export default TaskCheckCreatePage
