export interface CreateComponentDto {
	name: string
	deviceId: string
	installationDate: Date
	maintenanceCycle: number
	lastMaintenanceDate: Date
	reminderAdvanceDays: number
}
