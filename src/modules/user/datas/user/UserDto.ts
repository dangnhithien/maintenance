import { RoleDto } from "../role/RoleDto";

export interface UserDto {
  id: string;
  username: string;
  name: string;

  lastName: string;
  firstName: string;

  role: string;
  isActive: boolean;
  isDeleted: boolean;
  roleId: string;
  roleName: string;
  email: string;
  // additional fields
  token?: string;
  refreshToken?: string;
  // relations
  roles?: RoleDto[];
  // devices?: DeviceDto[];

  fullname: string;
  position?: string;
  phoneNumber?: string;
  userName: string;
}
