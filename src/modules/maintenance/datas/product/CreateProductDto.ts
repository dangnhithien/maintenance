export interface CreateProductDto {
  serialNumber: string;
  note?: string;
  qrCode: string;
  deviceId: string;
  imageQR: string;
}
