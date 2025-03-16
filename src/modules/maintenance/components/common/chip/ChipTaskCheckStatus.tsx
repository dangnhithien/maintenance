import { EnumStatusTaskCheck } from '@modules/maintenance/datas/enum/EnumStatusTaskCheck'
import { Chip } from '@mui/material'
import React from 'react'

interface StatusChipProps {
	status: EnumStatusTaskCheck
	size?: 'small' | 'medium'
}

const ChipTaskCheckStatus: React.FC<StatusChipProps> = ({
	status,
	size = 'medium',
}) => {
	let label: string
	let color: 'info' | 'warning' | 'success' | 'error' | 'default'

	switch (status) {
		case EnumStatusTaskCheck.CREATED:
			label = 'Mới tạo'
			color = 'info'
			break
		case EnumStatusTaskCheck.WAITING:
			label = 'Đang chờ'
			color = 'warning'
			break
		case EnumStatusTaskCheck.DONE:
			label = 'Hoàn thành'
			color = 'success'
			break
		case EnumStatusTaskCheck.REJECTED:
			label = 'Bị từ chối'
			color = 'error'
			break
		default:
			label = 'Không xác định'
			color = 'default'
			break
	}

	return <Chip label={label} color={color} size={size} />
}

export default ChipTaskCheckStatus
