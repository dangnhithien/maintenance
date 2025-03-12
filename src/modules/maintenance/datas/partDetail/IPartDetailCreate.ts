export interface IPartDetailCreate {
  serialNumber: string;
  name: string;
  description?: string;
  deviceId: string;
  partCategoryId: string;
  partTypeId: string;
  partGroupId: string;
  partSKUId: string;
  usageTypeId: string;
  image?: string;
}
