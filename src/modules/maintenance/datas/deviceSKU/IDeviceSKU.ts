import { IDeviceGroup } from "../deviceGroup/IDeviceGroup";
import { IDeviceType } from "../deviceType/IDeviceType";

export interface IDeviceSKU {
  id: string;
  code: string;
  name: string;
  description?: string;
  deviceGroupId: string;
  deviceGroupCode: string;
  deviceGroup?: IDeviceGroup;
  deviceTypeId: string;
  deviceTypeCode: string;
  deviceType?: IDeviceType;
}
