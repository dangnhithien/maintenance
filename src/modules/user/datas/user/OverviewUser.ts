import { UserDto } from "./UserDto";

export interface OverviewUser extends UserDto {
  totalTask: number;
}
