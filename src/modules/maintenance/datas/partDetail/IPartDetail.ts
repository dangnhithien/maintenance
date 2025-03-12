import { IDevice } from "../device/IDevice";
import { IPartCategory } from "../partCategory/IPartCategory";
import { IPartGroup } from "../partGroup/IPartGroup";
import { IPartSKU } from "../partSKU/IPartSKU";
import { IPartType } from "../partType/IPartType";
import { IUsageType } from "../usageType/IUsageType";

export interface IPartDetail {
  id: string;
  serialNumber: string;
  name: string;
  description?: string;
  deviceId: string;
  deviceSerialNumber: string;
  device?: IDevice;
  partCategoryId: string;
  partCategoryCode: string;
  partCategory?: IPartCategory;
  partTypeId: string;
  partTypeCode: string;
  partType?: IPartType;
  partGroupId: string;
  partGroupCode: string;
  partGroup?: IPartGroup;
  partSKUId: string;
  partSKUCode: string;
  partSKU?: IPartSKU;
  usageTypeId: string;
  usageType?: IUsageType;
}
