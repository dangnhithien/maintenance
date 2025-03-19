export interface ICaseCreate extends ITicketCreatePreview {
	name: string
	note?: string
	scheduledTime: string
	customerId: string
	deviceId: string
	assigneeId: string
	caseTypeId: string
	address: string
}

export interface ITicketCreatePreview {
	name: string
	note?: string
	scheduledTime?: string
	customerName?: string
	deviceName?: string
	assigneeName?: string
	caseTypeName?: string
}
