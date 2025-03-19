import { Grid2, Typography } from '@mui/material'
import IMG1 from '../../../../assets/images/Icon_may_bang_tai.png'
import ChipTaskCheckStatus from '../common/chip/ChipTaskCheckStatus'
import { EnumStatusTaskCheck } from '@modules/maintenance/datas/enum/EnumStatusTaskCheck'
import useTaskCheck from '@modules/maintenance/hooks/useTaskCheck'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'
interface Props {
	id?: string
}
const TaskCheckDetail: React.FC<Props> = ({ id }) => {
	const { getTaskCheckById } = useTaskCheck()
	const { data: taskDetail, isLoading } = getTaskCheckById(id || '', {
		includeProperties: 'Device,Customer',
	})

	if (isLoading) {
		return (
			<Typography variant='body1' fontWeight={600}>
				Loading
			</Typography>
		)
	}
	return (
		<Grid2 container spacing={1}>
			<Grid2 size={{ xs: 2 }}>
				<img src={IMG1} height={240} width={240} />
			</Grid2>
			<Grid2 size={{ xs: 10 }}>
				<Grid2 container spacing={2}>
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
