import { TrackingDataDto } from "@datas/comon/TrackingDataDto";

export interface RoleDto extends TrackingDataDto {
  id: string;
  name: string;
  normalizedName: string;
  description: string;
  code: string;
  userRoles: null;
  claims: null;
  isDeleted: boolean;
  concurrencyStamp: null;
}
