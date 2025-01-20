import { ApiRequest } from "../comon/ApiRequest";

export interface GetDeviceDto extends ApiRequest {
  deviceTypeId?: string;
}
