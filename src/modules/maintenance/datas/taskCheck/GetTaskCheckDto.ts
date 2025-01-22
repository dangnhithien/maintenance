import { ApiRequest } from "../comon/ApiRequest";

export interface GetTaskCheckDto extends ApiRequest {
  templateCheckListId?: string;
  productId?: string;
}
