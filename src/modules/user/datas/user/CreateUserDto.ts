export interface CreateUserDto {
  firstName?: string;
  lastName?: string;
  fullname: string;
  position?: string;
  phoneNumber?: string;
  userName: string;
  email?: string;
  password: string;
  roleId: string;
}
