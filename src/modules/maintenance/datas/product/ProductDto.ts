import { TrackingDataDto } from "../comon/TrackingDataDto";
import { DeviceDto } from "../device/DeviceDto";
import { TaskCheckDto } from "../taskCheck/TaskCheckDto";

export interface ProductDto extends TrackingDataDto {
  id: string;
  imageUrl?: string;
  address: string;
  installtionDate?: Date;
  serialNumber: string;
  qrCode: string;
  deviceId: string;
  deviceCode: string;
  device?: DeviceDto;
  imageQR: string;
  lastMaintenanceDate: Date;
  nextMaintenanceReminder: Date;
  reminderAdvanceDays: string;
  taskChecks: TaskCheckDto[];
  supplier: string;
  version: string;
  maintenanceTimes: number;
  maintenanceCycle: number;
  status: string;
}
