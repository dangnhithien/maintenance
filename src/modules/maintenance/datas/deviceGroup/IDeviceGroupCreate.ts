export interface IDeviceGroupCreate {
  code: string;
  name: string;
  description?: string;
  deviceTypeId: string;
  image?: string;
}
