import { EnumStatusTaskCheck } from '@modules/maintenance/datas/enum/EnumStatusTaskCheck'
import { EnumStatusTicket } from '@modules/maintenance/datas/enum/EnumStatusTicketCheck'
import { Chip } from '@mui/material'
import React from 'react'

interface StatusChipProps {
	status: EnumStatusTicket
	size?: 'small' | 'medium'
}

const ChipTicketStatus: React.FC<StatusChipProps> = ({
	status,
	size = 'medium',
}) => {
	let label: string
	let color: 'info' | 'warning' | 'success' | 'error' | 'default'

	switch (status) {
		case EnumStatusTicket.WAITING:
			label = 'Chờ duyệt'
			color = 'warning'
			break
		case EnumStatusTicket.CREATED:
			label = 'Đang xử lý'
			color = 'info'
			break
		case EnumStatusTicket.CLOSED:
			label = 'Hoàn thành'
			color = 'success'
			break
		case EnumStatusTicket.CANCEL:
			label = 'Đã hủy'
			color = 'error'
			break
		default:
			label = 'Không xác định'
			color = 'default'
			break
	}

	return <Chip label={label} color={color} size={size} />
}

export default ChipTicketStatus
