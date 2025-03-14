export interface IDeviceCreate {
  name: string;
  deviceGroupId: string;
  deviceTypeId: string;
  deviceSKUId: string;
  deviceModelId: string;
  image?: string;
  serialNumber: string;
  note?: string;
  supplier?: string;
  rfid?: string;
  installationDate?: Date;
  address?: string;
  usageTypeId?: string;
  customerId?: string;
}
