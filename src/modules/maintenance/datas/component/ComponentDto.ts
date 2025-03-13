export interface ComponentDto {
	id?: string
	name: string
	deviceId: string
	serialNumber?: string
	installationDate?: Date
	maintenanceCycle?: number
	lastMaintenanceDate?: Date
	maintenanceCount?: number
	nextMaintenanceDate?: Date
	reminderAdvanceDays?: number
	customerId?: string
}
