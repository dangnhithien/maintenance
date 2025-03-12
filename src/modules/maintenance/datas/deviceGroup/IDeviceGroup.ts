import { IDeviceType } from "../deviceType/IDeviceType";

export interface IDeviceGroup {
  id: string;
  code: string;
  name: string;
  description?: string;
  deviceTypeId: string;
  deviceTypeCode: string;
  deviceType?: IDeviceType;
}
