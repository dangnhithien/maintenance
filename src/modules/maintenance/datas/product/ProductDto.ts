import { TrackingDataDto } from "../../../../datas/comon/TrackingDataDto";
import { ComponentDto } from "../component/ComponentDto";
import { CustomerDto } from "../customer/CustomerDto";
import { DeviceDto } from "../device/DeviceDto";
import { TaskCheckDto } from "../taskCheck/TaskCheckDto";

export interface ProductDto extends TrackingDataDto {
  id: string;
  image?: string;
  address: string;
  installationDate?: Date;
  serialNumber: string;
  qrCode: string;
  deviceId: string;
  deviceCode: string;
  device?: DeviceDto;
  imageQR: string;
  lastMaintenanceDate: Date;
  nextMaintenanceReminder: Date;
  reminderAdvanceDays: string;
  taskChecks?: TaskCheckDto[];
  supplier: string;
  version: string;
  maintenanceTimes: number;
  maintenanceCycle: number;
  status: string;
  note?: string;
  name: string;
  customerId: string;
  customer?: CustomerDto;
  components: ComponentDto[];
}
