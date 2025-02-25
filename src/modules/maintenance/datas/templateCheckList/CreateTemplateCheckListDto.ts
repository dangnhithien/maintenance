import { CreateRowCheckListDto } from "../rowCheckList/CreateRowCheckListDto";

export interface CreateTemplateCheckListDto {
  code: string;
  name: string;
  description?: string;
  deviceId: string;
  rowChecks?: CreateRowCheckListDto[];
}
