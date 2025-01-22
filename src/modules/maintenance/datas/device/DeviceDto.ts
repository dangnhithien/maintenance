import { TypeDeviceDto } from "../typeDevice/TypeDeviceDto";

export interface DeviceDto {
  id: string;
  code: string;
  name: string;
  deviceType: string;
  deviceGroup: string;
  description: string;
  typeDevice: TypeDeviceDto;
  isDeleted: boolean;
  typeDeviceId: string;
}
