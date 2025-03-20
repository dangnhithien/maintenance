import { Grid2, Typography } from '@mui/material'
import type { ICase } from '@modules/maintenance/datas/case/ICase'
import { format, parseISO } from 'date-fns'
import { vi } from 'date-fns/locale'
import ChipTicketStatus from '../common/chip/ChipTicketStatus'
import { EnumStatusTicket } from '@modules/maintenance/datas/enum/EnumStatusTicketCheck'

interface Props {
	data: ICase
}
const CaseDetail: React.FC<Props> = ({ data }) => {
	return (
		<Grid2 container spacing={4}>
			<Grid2 size={{ xs: 4 }}>
				<Typography variant='body1' color='primary' fontWeight={600}>
					Tên Ticket
				</Typography>
				<Typography variant='body2'>{data.name}</Typography>
			</Grid2>
			<Grid2 size={{ xs: 4 }}>
				<Typography variant='body1' color='primary' fontWeight={600}>
					Loại Ticket
				</Typography>
				<Typography variant='body2'>{data.caseType?.name}</Typography>
			</Grid2>
			<Grid2 size={{ xs: 4 }}>
				<Typography variant='body1' color='primary' fontWeight={600}>
					Trạng thái
				</Typography>
				<ChipTicketStatus status={data.caseTaskStatus as EnumStatusTicket} />
			</Grid2>
			<Grid2 size={{ xs: 4 }}>
				<Typography variant='body1' color='primary' fontWeight={600}>
					Tên khách hàng
				</Typography>
				<Typography variant='body2'>{data.customerCode}</Typography>
			</Grid2>
			<Grid2 size={{ xs: 4 }}>
				<Typography variant='body1' color='primary' fontWeight={600}>
					Người phụ trách
				</Typography>
				<Typography variant='body2'>{data.assigneeName}</Typography>
			</Grid2>
			<Grid2 size={{ xs: 4 }}>
				<Typography variant='body1' color='primary' fontWeight={600}>
					Mã
				</Typography>
				<Typography variant='body2'>{data.code}</Typography>
			</Grid2>
			<Grid2 size={{ xs: 4 }}>
				<Typography variant='body1' color='primary' fontWeight={600}>
					Ghi chú
				</Typography>
				<Typography variant='body2'>{data.note || '-'}</Typography>
			</Grid2>
			<Grid2 size={{ xs: 4 }}>
				<Typography variant='body1' color='primary' fontWeight={600}>
					Ngày bắt đầu
				</Typography>
				<Typography variant='body2'>
					{data.scheduledTime
						? format(parseISO(data.scheduledTime), 'dd/MM/yyyy', { locale: vi })
						: '-'}
				</Typography>
			</Grid2>
			<Grid2 size={{ xs: 4 }}>
				<Typography variant='body1' color='primary' fontWeight={600}>
					Địa chỉ
				</Typography>
				<Typography variant='body2'>{data.customer?.address}</Typography>
			</Grid2>
		</Grid2>
	)
}

export default CaseDetail
