import { ApiRequest } from "../comon/ApiRequest";
import { EnumStatusTaskCheck } from "../enum/EnumStatusTaskCheck";

export interface GetTaskCheckDto extends ApiRequest {
  templateCheckListId?: string;
  productId?: string;
  taskCheckStatus?: EnumStatusTaskCheck;
  deviceId?: string;
}
