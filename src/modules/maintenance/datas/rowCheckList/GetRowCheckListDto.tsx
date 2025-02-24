import { ApiRequest } from "../../../../datas/comon/ApiRequest";

export interface GetRowCheckListDto extends ApiRequest {
  templateCheckId?: string;
}
