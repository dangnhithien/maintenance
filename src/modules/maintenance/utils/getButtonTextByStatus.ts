import { EnumStatusTicket } from '../datas/enum/EnumStatusTicketCheck'

export const getStatusButtonText = (status?: string) => {
	switch (status) {
		case EnumStatusTicket.WAITING:
			return 'Phê duyệt'
		case EnumStatusTicket.CREATED:
			return 'Hoàn thành'
		default:
			return 'Chuyển trạng thái'
	}
}
