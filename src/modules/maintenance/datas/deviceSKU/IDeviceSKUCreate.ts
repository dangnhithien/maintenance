export interface IDeviceSKUCreate {
  code: string;
  name: string;
  description?: string;
  deviceGroupId: string;
  deviceTypeId: string;
  image?: string;
}
