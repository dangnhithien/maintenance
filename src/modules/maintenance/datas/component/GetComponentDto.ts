import { ApiRequest } from "@datas/comon/ApiRequest";

export interface GetComponentDto extends ApiRequest {
  productId?: string;
}
