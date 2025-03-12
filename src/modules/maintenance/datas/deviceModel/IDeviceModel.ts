import { IDeviceGroup } from "../deviceGroup/IDeviceGroup";
import { IDeviceSKU } from "../deviceSKU/IDeviceSKU";
import { IDeviceType } from "../deviceType/IDeviceType";

export interface IDeviceModel {
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
  deviceSKU?: IDeviceSKU;
  deviceSKUId: string;
  deviceSKUCode: string;
}
