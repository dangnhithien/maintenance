import { DeviceDto } from "../device/DeviceDto";

export interface ProductDto {
  id: string;
  serialNumber: string;
  qrCode: string;
  deviceId: string;
  deviceCode: string;
  device?: DeviceDto;
  imageQR: string;
}
