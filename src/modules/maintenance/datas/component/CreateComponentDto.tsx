export interface CreateComponentDto {
  name: string;
  productId: string;
  installationDate: Date;
  maintenanceCycle: number;
  lastMaintenanceDate: Date;
  reminderAdvanceDays: number;
}
