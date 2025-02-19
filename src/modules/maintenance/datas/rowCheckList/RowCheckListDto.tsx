import { TemplateCheckListDto } from "../templateCheckList/TemplateCheckListDto";
import { TypeErrorDto } from "../typeError/TypeErrorDto";

export interface RowCheckListDto {
  id: string;
  code: string;
  order?: number;
  content: string;
  description?: string;
  typeErrorId: string;
  typeErrorCode: string;
  typeError?: TypeErrorDto;
  templateCheckId: string;
  templateCheckCode: string;
  templateChecks?: TemplateCheckListDto;
}
