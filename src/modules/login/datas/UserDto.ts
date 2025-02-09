export interface UserDto {
  id: string;
  username: string;
  name: string;
  role: string;
  isActive: boolean;
  isDeleted: boolean;
  roleId: string;
  roleName: string;
  // additional fields
  token?: string;
  refreshToken?: string;
  // relations
  // roles?: RoleDto[];
  // devices?: DeviceDto[];
}
