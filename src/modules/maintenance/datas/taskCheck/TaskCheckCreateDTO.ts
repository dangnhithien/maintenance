export interface TaskCheckCreateDTO {
	name: string
	assigneeId: string
	templateCheckId: string
	taskCheckTypeId: string
	note?: string
	scheduledTime: string
	caseTaskId: string
	deviceId: string
}
