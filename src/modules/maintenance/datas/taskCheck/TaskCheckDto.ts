import { TrackingDataDto } from "../comon/TrackingDataDto";
import { TemplateCheckListDto } from "../templateCheckList/TemplateCheckListDto";

export interface TaskCheckDto extends TrackingDataDto {
  id: string;
  code: string;
  checkTime: string;
  templateCheckListId: string;
  templateCheckListCode: string;
  templateCheckList?: TemplateCheckListDto;
}
