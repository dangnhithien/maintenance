import { ApiRequest } from "../comon/ApiRequest";

export interface GetRowCheckValueDto extends ApiRequest {
  taskCheckId?: string;
}
