import { TemplateCheckListDto } from "../templateCheckList/TemplateCheckListDto";

export interface TaskCheckDto {
  id: string;
  code: string;
  checkTime: string;
  templateCheckListId: string;
  templateCheckListCode: string;
  templateCheckList?: TemplateCheckListDto;
}
