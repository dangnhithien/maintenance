import { ApiRequest } from "../../../../datas/comon/ApiRequest";

export interface GetRowCheckValueDto extends ApiRequest {
  taskCheckId?: string;
}
