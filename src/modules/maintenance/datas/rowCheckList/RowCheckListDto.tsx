import { TemplateCheckListDto } from "../templateCheckList/TemplateCheckListDto";
import { TypeErrorDto } from "../typeError/TypeErrorDto";

export interface RowCheckListDto {
  id: string;
  code: string;
  name: string;
  description?: string;
  typeErrorId: string;
  typeErrorCode: string;
  typeError?: TypeErrorDto;
  templateCheckListId: string;
  templateCheckListCode: string;
  templateCheckList?: TemplateCheckListDto;
}
