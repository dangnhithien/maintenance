import { ApiRequest } from "../comon/ApiRequest";

export interface GetRowCheckListDto extends ApiRequest {
  templateCheckListId?: string;
}
