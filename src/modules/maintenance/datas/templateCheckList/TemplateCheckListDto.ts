import { DeviceDto } from "../device/DeviceDto";

export interface TemplateCheckListDto {
  id: string;
  code: string;
  name: string;
  description?: string;
  deviceId: string;
  deviceCode: string;
  device: DeviceDto;
}
