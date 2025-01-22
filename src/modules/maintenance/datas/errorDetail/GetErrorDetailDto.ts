import { ApiRequest } from "../comon/ApiRequest";

export interface GetErrorDetailDto extends ApiRequest {
  typeErrorId?: string;
}
