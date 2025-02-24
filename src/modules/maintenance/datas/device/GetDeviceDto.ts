import { ApiRequest } from "../../../../datas/comon/ApiRequest";

export interface GetDeviceDto extends ApiRequest {
  deviceTypeId?: string;
  deviceId?: string;
}
