import { ApiRequest } from "../../../../datas/comon/ApiRequest";

export interface GetProductDto extends ApiRequest {
  serialNumber?: string;
  customerId?: string;
  isCreated?: boolean;
}
