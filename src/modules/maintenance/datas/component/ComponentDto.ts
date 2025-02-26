export interface ComponentDto {
  id?: string;
  name: string;
  productId: string;
  serialNumber?: string;
  installationDate?: Date;
  maintenanceCycle?: number;
  lastMaintenanceDate?: Date;
  maintenanceCount?: number;
  nextMaintenanceDate?: Date;
  reminderAdvanceDays?: number;
}
