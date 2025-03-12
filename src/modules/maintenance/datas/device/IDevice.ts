import { CustomerDto } from "../customer/CustomerDto";
import { IDeviceGroup } from "../deviceGroup/IDeviceGroup";
import { IDeviceModel } from "../deviceModel/IDeviceModel";
import { IDeviceSKU } from "../deviceSKU/IDeviceSKU";
import { IDeviceType } from "../deviceType/IDeviceType";
import { IUsageType } from "../usageType/IUsageType";

export interface IDevice {
  id: string;
  serialNumber: string;
  name: string;
  note?: string;
  image?: string;
  supplier?: string;
  rfid?: string;
  installationDate?: string;
  address?: string;
  usageTypeId?: string;
  usageType?: IUsageType;
  customerId?: string;
  customerCode?: string;
  customer?: CustomerDto;
  deviceModelId?: string;
  deviceModelCode?: string;
  deviceModel?: IDeviceModel;
  deviceSKUId?: string;
  deviceSKUCode?: string;
  deviceSKU?: IDeviceSKU;
  deviceGroupId?: string;
  deviceGroupCode?: string;
  deviceGroup?: IDeviceGroup;
  deviceTypeId?: string;
  deviceTypeCode?: string;
  deviceType?: IDeviceType;
}
