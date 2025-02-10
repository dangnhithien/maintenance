export interface CreateProductDto {
  serialNumber: string;
  note?: string;
  qrCode?: string;
  deviceId: string;
  imageQR?: string;
  address?: string;
  installationDate?: Date | null;
  maintenanceCycle?: number;
  supplier?: string;
  version?: string;
  image?: string;
}
