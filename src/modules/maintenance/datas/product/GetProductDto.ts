import { ApiRequest } from "../comon/ApiRequest";

export interface GetProductDto extends ApiRequest {
  serialNumber?: string;
}
