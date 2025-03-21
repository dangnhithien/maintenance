import { Grid2, Typography } from '@mui/material'
import DEFAULT from '../../../../assets/images/Icon_Default.jpg'
import ChipTaskCheckStatus from '../common/chip/ChipTaskCheckStatus'
import { EnumStatusTaskCheck } from '@modules/maintenance/datas/enum/EnumStatusTaskCheck'
import useTaskCheck from '@modules/maintenance/hooks/useTaskCheck'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'
import { TaskCheckDto } from '@modules/maintenance/datas/taskCheck/TaskCheckDto'
import { useEffect } from 'react'
import SpinnerLoading from '@components/SpinerLoading'
interface Props {
	id?: string
	onSelect?: (taskCheck: TaskCheckDto) => void
}
const TaskCheckDetail: React.FC<Props> = ({ id, onSelect }) => {
	const { getTaskCheckById } = useTaskCheck()
	const { data: taskDetail, isLoading } = getTaskCheckById(id || '', {
		includeProperties: 'Device,Customer,TemplateCheck,MaintenanceHistories',
	})

	useEffect(() => {
		if (taskDetail && onSelect) {
			onSelect(taskDetail)
		}
	}, [taskDetail, onSelect])

	if (isLoading) {
		return <SpinnerLoading />
	}
	return (
		<Grid2 container spacing={3}>
			<Grid2 size={{ xs: 2 }}>
				<img
					src={
						!taskDetail?.device?.deviceType?.imageUrl
							? DEFAULT // Ảnh mặc định nếu null
							: taskDetail?.device?.deviceType?.imageUrl.startsWith('http')
							? encodeURI(taskDetail?.device?.deviceType?.imageUrl) // Nếu đã có "http", chỉ encode URL
							: encodeURI(`http://${taskDetail?.device?.deviceType?.imageUrl}`) // Nếu chưa có, thêm "http://" rồi encode
					}
					style={{
						maxWidth: '100%',
						height: '200px',
						objectFit: 'contain',
					}}
				/>
			</Grid2>
			<Grid2 size={{ xs: 10 }}>
				<Grid2 container spacing={3}>
					<Grid2 size={{ xs: 4 }}>
						<Typography variant='body1' color='primary' fontWeight={600}>
							Tên task
						</Typography>
						<Typography variant='body2'>{taskDetail?.name}</Typography>
					</Grid2>
					<Grid2 size={{ xs: 4 }}>
						<Typography variant='body1' color='primary' fontWeight={600}>
							Tên thiết bị
						</Typography>
						<Typography variant='body2'>{taskDetail?.device?.name}</Typography>
					</Grid2>
					<Grid2 size={{ xs: 4 }}>
						<Typography variant='body1' color='primary' fontWeight={600}>
							Code
						</Typography>
						<Typography variant='body2'>{taskDetail?.code}</Typography>
					</Grid2>
					<Grid2 size={{ xs: 4 }}>
						<Typography variant='body1' color='primary' fontWeight={600}>
							Khách hàng
						</Typography>
						<Typography variant='body2'>
							{taskDetail?.customer?.name}
						</Typography>
					</Grid2>
					<Grid2 size={{ xs: 4 }}>
						<Typography variant='body1' color='primary' fontWeight={600}>
							Người phụ trách
						</Typography>
						<Typography variant='body2'>{taskDetail?.assigneeName}</Typography>
					</Grid2>
					<Grid2 size={{ xs: 4 }}>
						<Typography variant='body1' color='primary' fontWeight={600}>
							Ticket code
						</Typography>
						<Typography variant='body2'>{taskDetail?.caseTaskCode}</Typography>
					</Grid2>
					<Grid2 size={{ xs: 4 }}>
						<Typography variant='body1' color='primary' fontWeight={600}>
							Ngày bắt đầu
						</Typography>
						<Typography variant='body2'>
							{taskDetail?.scheduledTime &&
								format(new Date(taskDetail.scheduledTime), 'dd/MM/yyyy', {
									locale: vi,
								})}
						</Typography>
					</Grid2>
					<Grid2 size={{ xs: 4 }}>
						<Typography variant='body1' color='primary' fontWeight={600}>
							Tình trạng
						</Typography>
						<ChipTaskCheckStatus
							status={
								taskDetail?.taskCheckStatus ?? EnumStatusTaskCheck.DEFAULT
							}
						/>
					</Grid2>
					<Grid2 size={{ xs: 4 }}>
						<Typography variant='body1' color='primary' fontWeight={600}>
							Serial number
						</Typography>
						<Typography variant='body2'>{taskDetail?.serialNumber}</Typography>
					</Grid2>
					<Grid2 size={{ xs: 12 }}>
						<Typography variant='body1' color='primary' fontWeight={600}>
							Ghi chú
						</Typography>
						<Typography variant='body2'>{taskDetail?.note || '-'}</Typography>
					</Grid2>
				</Grid2>
			</Grid2>
		</Grid2>
	)
}

export default TaskCheckDetail
