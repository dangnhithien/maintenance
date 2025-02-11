import { TrackingDataDto } from "../comon/TrackingDataDto";
import { EnumStatusTaskCheck } from "../enum/EnumStatusTaskCheck";
import { TemplateCheckListDto } from "../templateCheckList/TemplateCheckListDto";

export interface TaskCheckDto extends TrackingDataDto {
  id: string;
  code: string;
  checkTime: string;
  templateCheckId: string;
  templateCheckCode: string;
  templateCheck?: TemplateCheckListDto;
  status?: EnumStatusTaskCheck;
  note?: string;
}
