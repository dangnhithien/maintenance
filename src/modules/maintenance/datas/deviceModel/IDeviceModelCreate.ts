export interface IDeviceModelCreate {
  code: string;
  name: string;
  description?: string;
  deviceGroupId: string;
  deviceTypeId: string;
  deviceSKUId: string;
  image?: string;
}
