import { TemplateCheckListDto } from "../templateCheckList/TemplateCheckListDto";

export interface RowCheckListDto {
  id: string;
  code: string;
  order?: number;
  content: string;
  description?: string;
  typeErrorId: string;
  typeErrorCode: string;
  templateCheckId: string;
  templateCheckCode: string;
  templateChecks?: TemplateCheckListDto;
}
