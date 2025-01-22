import { TemplateCheckListDto } from "../templateCheckList/TemplateCheckListDto";

export interface CreateTaskCheckDto {
  code: string;
  checkTime: string;
  productId: string;
  templateCheckListId: string;
  templateCheckList?: TemplateCheckListDto;
}
