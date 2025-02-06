import { EnumStatusTaskCheck } from "../enum/EnumStatusTaskCheck";
import { TemplateCheckListDto } from "../templateCheckList/TemplateCheckListDto";

export interface CreateTaskCheckDto {
  code: string;
  checkTime: string;
  productId: string;
  templateCheckListId: string;
  templateCheckList?: TemplateCheckListDto;
  taskChekStatus?: EnumStatusTaskCheck;
}
export interface UpdateTaskCheckDto {
  taskCheckStatus: EnumStatusTaskCheck;
}
